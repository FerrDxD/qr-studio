import { Clock, Trash2, Download, Mail } from '../ui/icons';
import type { QRConfiguration } from '../../types/qr.types';

interface LocalHistoryDrawerProps {
  open: boolean;
  onClose: () => void;
  history: QRConfiguration[];
  onLoad: (cfg: QRConfiguration) => void;
  onRemove: (id: string) => void;
  onExportJson: () => void;
  onImportJson: (file: File) => void;
}

export function LocalHistoryDrawer({
  open,
  onClose,
  history,
  onLoad,
  onRemove,
  onExportJson,
  onImportJson,
}: LocalHistoryDrawerProps) {

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-2xl mx-4 bg-bg-panel border border-border-subtle rounded-lg p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text-primary">Riwayat Lokal</h2>
          <button
            onClick={onClose}
            className="rounded p-1.5 text-text-muted hover:bg-bg-canvas-well transition"
            aria-label="Tutup riwayat"
          >
            <Trash2 size={18} />
          </button>
        </div>

        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-text-muted">
            <Clock size={32} className="mb-2 opacity-50" />
            <p>Belum ada riwayat. Buat QR code pertama Anda.</p>
          </div>
        ) : (
          <div className="overflow-y-auto max-h-[60vh]">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-border-subtle">
                  <th className="pb-2 text-text-muted font-medium">Konfigurasi</th>
                  <th className="pb-2 text-text-muted font-medium">Tipe</th>
                  <th className="pb-2 text-text-muted font-medium">Tanggal</th>
                  <th className="pb-2 text-right text-text-muted font-medium">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {history.map((item) => (
                  <tr key={item.id} className="border-b border-border-subtle/50 hover:bg-bg-canvas-well/50 transition">
                    <td className="py-3 text-text-primary">
                      <div className="font-medium truncate">{item.name}</div>
                      <div className="text-xs text-text-muted truncate max-w-[200px]">
                        {item.compiledData.slice(0, 80)}{item.compiledData.length > 80 ? '…' : ''}
                      </div>
                    </td>
                    <td className="py-3 text-text-muted">{item.payloadType}</td>
                    <td className="py-3 text-text-muted">
                      {new Date(item.createdAt).toLocaleString('id-ID', {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                      })}
                    </td>
                    <td className="py-3 text-right">
                      <button
                        onClick={() => {
                          onLoad(item);
                          onClose();
                        }}
                        className="flex items-center gap-1 text-accent-primary text-xs font-medium hover:underline"
                        title="Muat konfigurasi ini"
                      >
                        <Download size={14} /> Muat
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemove(item.id);
                        }}
                        className="ml-3 flex items-center gap-1 text-text-muted text-xs font-medium hover:underline"
                        title="Hapus dari riwayat"
                      >
                        <Trash2 size={14} /> Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-3 items-center border-t border-border-subtle pt-4">
          <button
            onClick={onExportJson}
            className="flex items-center gap-2 rounded border border-border-subtle px-3 py-1.5 text-sm text-text-primary hover:bg-bg-canvas-well transition"
          >
            <Download size={16} /> Ekspor JSON
          </button>
          <label className="flex items-center gap-2 rounded border border-border-subtle px-3 py-1.5 text-sm text-text-primary hover:bg-bg-canvas-well transition cursor-pointer">
            <Mail size={16} /> Impor JSON
            <input
              type="file"
              accept=".json"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  onImportJson(file);
                }
              }}
            />
          </label>
          <button
            onClick={onClose}
            className="ml-auto rounded border border-border-subtle px-3 py-1.5 text-sm text-text-primary hover:bg-bg-canvas-well transition"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
