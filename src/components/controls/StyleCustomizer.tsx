import { useCallback } from 'react';
import { Palette, Layers, EyeOff } from '../ui/icons';
import type { QRConfiguration } from '../../types/qr.types';
import type { DotStyle } from '../../types/qr.types';

interface StyleCustomizerProps {
  config: QRConfiguration;
  onStyleChange: (partial: Partial<QRConfiguration['style']>) => void;
}

const DOT_STYLES: { id: DotStyle; label: string }[] = [
  { id: 'square', label: 'Kotak' },
  { id: 'rounded', label: 'Membulat' },
  { id: 'dots', label: 'Titik' },
  { id: 'classy', label: 'Klasik' },
  { id: 'classy-rounded', label: 'Klasik Bulat' },
  { id: 'extra-rounded', label: 'Extra Bulat' },
];

export function StyleCustomizer({ config, onStyleChange }: StyleCustomizerProps) {
  const setStyle = useCallback(
    (partial: Partial<QRConfiguration['style']>) =>
      onStyleChange({ ...config.style, ...partial }),
    [config.style, onStyleChange],
  );

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-text-muted">
          <Palette size={14} /> Gaya & Warna
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="flex items-center gap-2 text-sm text-text-primary cursor-pointer select-none">
              <span className="w-3 h-3 rounded border border-border-subtle" style={{ backgroundColor: config.style.fgColor }} />
              Warna titik
            </label>
            <input
              type="color"
              value={config.style.fgColor}
              onChange={(e) => setStyle({ fgColor: e.target.value })}
              className="w-full h-9 rounded border-0 bg-transparent cursor-pointer"
              title="Warna titik QR"
            />
          </div>
          <div className="space-y-1.5">
            <label className="flex items-center gap-2 text-sm text-text-primary cursor-pointer select-none">
              <span className="w-3 h-3 rounded border border-border-subtle" style={{ backgroundColor: config.style.bgColor }} />
              Latar belakang
            </label>
            <input
              type="color"
              value={config.style.bgColor}
              onChange={(e) => setStyle({ bgColor: e.target.value })}
              className="w-full h-9 rounded border-0 bg-transparent cursor-pointer"
              title="Warna latar belakang QR"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <input
            id="transparent-bg"
            type="checkbox"
            checked={config.style.transparentBg}
            onChange={(e) => setStyle({ transparentBg: e.target.checked })}
            className="rounded border-border-subtle text-accent-primary focus:ring-accent-primary"
          />
          <label htmlFor="transparent-bg" className="text-sm text-text-primary cursor-pointer select-none">
            <EyeOff size={16} className="mr-1.5" /> Latar transparan
          </label>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-text-muted">
          <Layers size={14} /> Bentuk titik
        </div>
        <div className="flex gap-2 flex-wrap">
          {DOT_STYLES.map((s) => {
            const active = config.style.dotStyle === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setStyle({ dotStyle: s.id })}
                className={`rounded border px-2.5 py-1.5 text-xs font-medium transition-colors ${
                  active
                    ? 'border-accent-primary bg-accent-primary/10 text-accent-primary'
                    : 'border-border-subtle text-text-muted hover:border-text-primary hover:text-text-primary hover:bg-bg-canvas-well'
                }`}
              >
                {s.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
