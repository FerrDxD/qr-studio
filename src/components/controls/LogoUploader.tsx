import { useCallback, useRef, useState } from 'react';
import { Image, Plus, Trash2, AlertTriangle } from '../ui/icons';
import type { QRConfiguration } from '../../types/qr.types';

const MAX_UPLOAD_BYTES = 2 * 1024 * 1024; // 2 MB

type Logo = QRConfiguration['logo'];

interface LogoUploaderProps {
  logo: Logo;
  onLogoChange: (patch: Partial<Logo> & { dataUrl?: string }) => void;
  onRemove: () => void;
}

export function LogoUploader({ logo, onLogoChange, onRemove }: LogoUploaderProps) {
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (file: File) => {
      setError(null);
      if (file.size > MAX_UPLOAD_BYTES) {
        setError('Gambar terlalu besar. Maksimal 2 MB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = typeof reader.result === 'string' ? reader.result : '';
        onLogoChange({ dataUrl });
      };
      reader.onerror = () => setError('Gagal membaca berkas gambar.');
      reader.readAsDataURL(file);
    },
    [onLogoChange],
  );

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-text-muted">
          <Image size={14} /> Logo Tengah (Opsional)
        </div>
        {logo?.dataUrl ? (
          <div className="flex items-center gap-2 rounded border border-border-subtle bg-bg-canvas-well p-2">
            <img src={logo.dataUrl} alt="Logo" className="w-8 h-8 rounded object-cover" />
            <button
              onClick={onRemove}
              className="ml-auto p-1 rounded text-text-muted hover:bg-bg-panel hover:text-text-primary transition"
              title="Hapus logo"
              aria-label="Hapus logo"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => inputRef.current?.click()}
            className="flex items-center justify-center gap-2 w-full rounded border-2 border-dashed border-border-subtle bg-bg-panel px-4 py-3 text-sm text-text-muted hover:border-accent-primary hover:text-accent-primary hover:bg-accent-primary/5 transition"
          >
            <Plus size={18} /> Unggah gambar (PNG/JPG/SVG)
            <input
              ref={inputRef}
              type="file"
              accept="image/png,image/jpeg,image/svg+xml"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFile(file);
              }}
            />
          </button>
        )}
        {error && (
          <p className="flex items-center gap-1.5 text-xs text-status-warn">
            <AlertTriangle size={14} /> {error}
          </p>
        )}
      </div>
      {logo?.dataUrl && (
        <div className="space-y-1">
          <label className="text-xs font-medium text-text-muted">Ukuran logo</label>
          <input
            type="range"
            min="0.1"
            max="0.3"
            step="0.05"
            value={logo.sizeRatio ?? 0.2}
            onChange={(e) => onLogoChange({ sizeRatio: parseFloat(e.target.value) })}
            className="w-full accent-accent-primary"
          />
          <div className="flex items-center gap-2 mt-1">
            <input
              id="hide-bg-dots"
              type="checkbox"
              checked={logo.hideBackgroundDots ?? true}
              onChange={(e) => onLogoChange({ hideBackgroundDots: e.target.checked })}
              className="rounded border-border-subtle text-accent-primary focus:ring-accent-primary"
            />
            <label htmlFor="hide-bg-dots" className="text-sm text-text-muted cursor-pointer select-none">
              Sembunyikan titik di balik logo
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
