import { useCallback, useEffect, useState } from 'react';
import { useQRConfig } from './hooks/useQRConfig';
import { Header } from './components/layout/Header';
import { SplitWorkspace } from './components/layout/SplitWorkspace';
import { PayloadTabs } from './components/controls/PayloadTabs';
import { StyleCustomizer } from './components/controls/StyleCustomizer';
import { LogoUploader } from './components/controls/LogoUploader';
import { TechnicalSettings } from './components/controls/TechnicalSettings';
import { QRCanvasCard } from './components/preview/QRCanvasCard';
import { ContrastWarning } from './components/preview/ContrastWarning';
import { ExportActions } from './components/preview/ExportActions';
import { LocalHistoryDrawer } from './components/history/LocalHistoryDrawer';
import type { QRConfiguration } from './types/qr.types';

export default function App() {
  const {
    config,
    setConfig,
    empty,
    effectiveData,
    history,
    setRawInput,
    saveToHistory,
    removeFromHistory,
  } = useQRConfig();

  const [historyOpen, setHistoryOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  // Sinkronkan class tema ke <html> agar Tailwind dark mode & DESIGN.md tokens aktif.
  useEffect(() => {
    const el = document.documentElement;
    if (theme === 'dark') el.classList.add('dark');
    else el.classList.remove('dark');
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  const setRaw = (payloadType: typeof config.payloadType, input: Record<string, string | boolean>) => {
    setRawInput(payloadType, input);
  };

  const onStyleChange = useCallback(
    (partial: Partial<QRConfiguration['style']>) => {
      setConfig((c) => ({ ...c, style: { ...c.style, ...partial } }));
    },
    [setConfig],
  );

  const onLogoChange = useCallback(
    (patch: Partial<QRConfiguration['logo']> & { dataUrl?: string }) => {
      setConfig((c) => {
        const next = { ...c };
        const logo = c.logo ? { ...c.logo } : { sizeRatio: 0.2, margin: 4, hideBackgroundDots: true, dataUrl: null };
        if (patch.dataUrl !== undefined) logo.dataUrl = patch.dataUrl;
        if (patch.sizeRatio !== undefined) logo.sizeRatio = patch.sizeRatio;
        if (patch.margin !== undefined) logo.margin = patch.margin;
        if (patch.hideBackgroundDots !== undefined) logo.hideBackgroundDots = patch.hideBackgroundDots;
        next.logo = c.logo || patch.dataUrl !== undefined ? logo : undefined;
        // Saat logo diunggah, naikkan error correction ke Q agar QR tetap dapat discan (guardrail AGENTS.md §4).
        if (patch.dataUrl && next.style.errorCorrectionLevel !== 'Q' && next.style.errorCorrectionLevel !== 'H') {
          next.style.errorCorrectionLevel = 'Q';
        }
        return next;
      });
    },
    [setConfig],
  );

  const onRemoveLogo = () => setConfig((c) => ({ ...c, logo: undefined }));

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'qrstudio-config.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const importJson = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result)) as Partial<QRConfiguration>;
        if (parsed.payloadType) {
          const next: QRConfiguration = {
            id: crypto.randomUUID(),
            name: parsed.name ?? 'Impor',
            createdAt: new Date().toISOString(),
            payloadType: parsed.payloadType,
            rawInput: parsed.rawInput ?? {},
            compiledData: parsed.compiledData ?? '',
            style: parsed.style ?? config.style,
            logo: parsed.logo,
          };
          setConfig(next);
          saveToHistory(next);
        }
      } catch {
        // Gagal mengimpor berkas JSON — diabaikan agar tidak ganggu alur pengguna.
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-bg-app text-text-primary">
      <Header
        onThemeToggle={toggleTheme}
        onExportJson={exportJson}
        onOpenHistory={() => setHistoryOpen(true)}
      />
      <SplitWorkspace
        sidebar={
          <div className="space-y-5">
            <PayloadTabs
              payloadType={config.payloadType}
              rawInput={config.rawInput}
              onChange={setRaw}
              empty={empty}
            />
            <StyleCustomizer config={config} onStyleChange={onStyleChange} />
            <LogoUploader
              logo={config.logo ?? undefined}
              onLogoChange={onLogoChange}
              onRemove={onRemoveLogo}
            />
            <TechnicalSettings
              config={config}
              onStyleChange={onStyleChange}
              hasLogo={Boolean(config.logo?.dataUrl)}
            />
          </div>
        }
        preview={
          <div className="space-y-4">
            <QRCanvasCard
              config={{
                compiledData: effectiveData,
                style: config.style,
                logo: config.logo ?? undefined,
              }}
              empty={empty}
            />
            <ContrastWarning fgColor={config.style.fgColor} bgColor={config.style.bgColor} />
            <div className="flex items-center justify-between">
              <div className="text-sm text-text-muted flex items-center gap-1">
                Resolusi: {config.style.size} × {config.style.size} px
              </div>
              <ExportActions config={config} data={effectiveData} empty={empty} />
            </div>
            <button
              onClick={() => {
                saveToHistory({ ...config, compiledData: effectiveData });
                setHistoryOpen(true);
              }}
              className="w-full rounded border border-border-subtle px-3 py-2 text-sm text-text-primary hover:bg-bg-canvas-well transition"
            >
              Simpan ke Riwayat Lokal
            </button>
          </div>
        }
      />
      <LocalHistoryDrawer
        open={historyOpen}
        onClose={() => setHistoryOpen(false)}
        history={history}
        onLoad={(cfg) => setConfig(cfg)}
        onRemove={removeFromHistory}
        onExportJson={exportJson}
        onImportJson={importJson}
      />
    </div>
  );
}
