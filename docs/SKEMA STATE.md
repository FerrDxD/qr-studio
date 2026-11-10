src/types/qr.types.ts

export type PayloadType = 'url' | 'text' | 'wifi' | 'vcard' | 'whatsapp';
export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';
export type DotStyle = 'square' | 'dots' | 'rounded' | 'classy' | 'classy-rounded' | 'extra-rounded';
export type CornerSquareStyle = 'square' | 'dot' | 'extra-rounded';

export interface QRConfiguration {
  id: string;
  name: string;
  createdAt: string;
  payloadType: PayloadType;
  rawInput: Record<string, string | boolean>;
  compiledData: string;
  style: {
    size: number;              // Default: 1024 (untuk ekspor), ditampilkan responsif di UI
    margin: number;            // Default: 16 (Quiet zone dalam piksel)
    fgColor: string;           // Default: "#0F172A"
    bgColor: string;           // Default: "#FFFFFF"
    transparentBg: boolean;    // Default: false
    dotStyle: DotStyle;        // Default: "rounded"
    cornerSquareStyle: CornerSquareStyle;
    errorCorrectionLevel: ErrorCorrectionLevel; // Default: "M" ("H" otomatis jika logo aktif)
  };
  logo?: {
    dataUrl: string | null;    // Base64 string dari FileReader lokal
    sizeRatio: number;         // 0.1 hingga 0.3 (Maksimal 30% agar tetap bisa di-scan)
    margin: number;            // Default: 4
    hideBackgroundDots: boolean;
  };
}