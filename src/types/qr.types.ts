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
    size: number;
    margin: number;
    fgColor: string;
    bgColor: string;
    transparentBg: boolean;
    dotStyle: DotStyle;
    cornerSquareStyle: CornerSquareStyle;
    errorCorrectionLevel: ErrorCorrectionLevel;
  };
  logo?: {
    dataUrl: string | null;
    sizeRatio: number;
    margin: number;
    hideBackgroundDots: boolean;
  };
}