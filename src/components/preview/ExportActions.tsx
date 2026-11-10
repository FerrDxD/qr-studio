import QRCodeStyling from 'qr-code-styling';
import { Download, Clipboard, Save } from '../ui/icons';
import type { QRConfiguration } from '../../types/qr.types';
import { buildOptions } from '../../core/qrEngine';
import type { FileExtension } from 'qr-code-styling';

interface ExportActionsProps {
  config: QRConfiguration;
  data: string;
  empty: boolean;
}

export function ExportActions({ config, data, empty }: ExportActionsProps) {
  const buildExportInstance = () => {
    const instance = new QRCodeStyling({
      ...buildOptions(config),
      data: empty ? 'https://example.com' : data,
    });
    return instance;
  };

  const download = async (ext: FileExtension) => {
    const instance = buildExportInstance();
    const blob = await instance.getRawData(ext);
    if (!(blob instanceof Blob)) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `qrstudio.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copy = async () => {
    const instance = buildExportInstance();
    const blob = await instance.getRawData('png');
    if (!(blob instanceof Blob)) return;
    await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => download('png')}
          disabled={empty}
          className="flex items-center gap-2 w-full lg:w-auto px-3 py-2 rounded border border-border-subtle bg-bg-panel text-text-primary font-medium hover:bg-bg-canvas-well transition disabled:opacity-50 disabled:cursor-not-allowed"
          title={empty ? 'Isi data terlebih dahulu' : 'Unduh QR dalam format PNG'}
        >
          <Download size={16} /> Unduh PNG
        </button>
        <button
          onClick={() => download('svg')}
          disabled={empty}
          className="flex items-center gap-2 w-full lg:w-auto px-3 py-2 rounded border border-border-subtle bg-bg-panel text-text-primary font-medium hover:bg-bg-canvas-well transition disabled:opacity-50 disabled:cursor-not-allowed"
          title={empty ? 'Isi data terlebih dahulu' : 'Unduh QR dalam format SVG'}
        >
          <Save size={16} /> Unduh SVG
        </button>
        <button
          onClick={() => download('webp')}
          disabled={empty}
          className="flex items-center gap-2 w-full lg:w-auto px-3 py-2 rounded border border-border-subtle bg-bg-panel text-text-primary font-medium hover:bg-bg-canvas-well transition disabled:opacity-50 disabled:cursor-not-allowed"
          title={empty ? 'Isi data terlebih dahulu' : 'Unduh QR dalam format WebP'}
        >
          <Download size={16} /> Unduh WebP
        </button>
        <button
          onClick={copy}
          disabled={empty}
          className="flex items-center gap-2 w-full lg:w-auto px-3 py-2 rounded border border-border-subtle bg-bg-panel text-text-primary font-medium hover:bg-bg-canvas-well transition disabled:opacity-50 disabled:cursor-not-allowed"
          title={empty ? 'Isi data terlebih dahulu' : 'Salin gambar QR ke clipboard'}
        >
          <Clipboard size={16} /> Salin ke Clipboard
        </button>
      </div>
    </div>
  );
}
