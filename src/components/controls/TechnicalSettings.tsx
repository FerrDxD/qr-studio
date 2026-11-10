import { useCallback } from 'react';
import { ShieldAlert, ArrowUpDown } from '../ui/icons';
import type { QRConfiguration } from '../../types/qr.types';

interface TechnicalSettingsProps {
  config: QRConfiguration;
  onStyleChange: (partial: Partial<QRConfiguration['style']>) => void;
  hasLogo: boolean;
}

const EC_LEVELS: { id: 'L' | 'M' | 'Q' | 'H'; label: string; pct: string }[] = [
  { id: 'L', label: 'L', pct: '~7%' },
  { id: 'M', label: 'M', pct: '~15%' },
  { id: 'Q', label: 'Q', pct: '~25%' },
  { id: 'H', label: 'H', pct: '~30%' },
];

export function TechnicalSettings({ config, onStyleChange, hasLogo }: TechnicalSettingsProps) {
  const setStyle = useCallback(
    (partial: Partial<QRConfiguration['style']>) =>
      onStyleChange({ ...config.style, ...partial }),
    [config.style, onStyleChange],
  );

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-text-muted">
          <ShieldAlert size={14} /> Pengaturan Teknis
        </div>
        <div className="flex gap-2 flex-wrap">
          {EC_LEVELS.map((lvl) => {
            const active = config.style.errorCorrectionLevel === lvl.id;
            const disabled = hasLogo && lvl.id === 'L';
            return (
              <button
                key={lvl.id}
                onClick={() => setStyle({ errorCorrectionLevel: lvl.id })}
                disabled={disabled}
                className={`rounded border px-2.5 py-1.5 text-xs font-medium transition-colors ${
                  active
                    ? 'border-accent-primary bg-accent-primary/10 text-accent-primary'
                    : disabled
                    ? 'border-border-subtle/50 text-text-muted/50 cursor-not-allowed'
                    : 'border-border-subtle text-text-muted hover:border-text-primary hover:text-text-primary hover:bg-bg-canvas-well'
                }`}
                title={disabled ? 'Dengan logo, gunakan Q atau H agar tetap dapat discan' : undefined}
              >
                {lvl.label} <span className="text-text-muted/70">{lvl.pct}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-2">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="flex items-center gap-2 text-sm text-text-primary">
              <ArrowUpDown size={16} className="mr-1.5" /> Margin tepi
            </label>
            <input
              type="number"
              min="0"
              max="40"
              value={config.style.margin}
              onChange={(e) => setStyle({ margin: Math.max(0, Math.min(40, Number(e.target.value) || 0)) })}
              className="w-full rounded border border-border-subtle bg-bg-panel p-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary"
            />
          </div>
          <div className="space-y-1.5">
            <label className="flex items-center gap-2 text-sm text-text-primary">
              Resolusi ekspor
            </label>
            <input
              type="number"
              min="256"
              max="2048"
              step="256"
              value={config.style.size}
              onChange={(e) => setStyle({ size: Math.max(256, Math.min(2048, Number(e.target.value) || 256)) })}
              className="w-full rounded border border-border-subtle bg-bg-panel p-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary"
            />
          </div>
        </div>
        {hasLogo && config.style.errorCorrectionLevel === 'L' && (
          <p className="flex items-center gap-1 text-xs text-status-warn">
            <ShieldAlert size={12} /> Disarankan naikkan ke Q atau H karena logo terpasang.
          </p>
        )}
      </div>
    </div>
  );
}
