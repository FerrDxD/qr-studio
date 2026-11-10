import { Sun, Moon, Upload, Clock } from '../ui/icons';

export function Header({ onThemeToggle, onExportJson, onOpenHistory }: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between px-4 py-3 border-b border-border-subtle bg-bg-app/80 backdrop-blur-sm text-text-primary">
      <div className="flex items-center gap-2">
        <span className="font-semibold tracking-tight">QRStudio</span>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onOpenHistory}
          className="flex items-center gap-2 px-3 py-1.5 rounded border border-border-subtle text-sm text-text-primary hover:bg-bg-canvas-well transition"
          title="Riwayat Lokal"
        >
          <Clock size={16} /> Riwayat
        </button>
        <button
          onClick={onExportJson}
          className="flex items-center gap-2 px-3 py-1.5 rounded border border-border-subtle text-sm text-text-primary hover:bg-bg-canvas-well transition"
          title="Ekspor konfigurasi JSON"
        >
          <Upload size={16} /> JSON
        </button>
        <button
          onClick={onThemeToggle}
          className="rounded border border-border-subtle p-1.5 text-text-muted hover:bg-bg-canvas-well transition"
          title="Ganti tema"
          aria-label="Ganti tema gelap/terang"
        >
          {document.documentElement.classList.contains('dark') ? (
            <Sun size={16} />
          ) : (
            <Moon size={16} />
          )}
        </button>
      </div>
    </header>
  );
}

interface HeaderProps {
  onThemeToggle: () => void;
  onExportJson: () => void;
  onOpenHistory: () => void;
}
