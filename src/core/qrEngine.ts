import QRCodeStyling from 'qr-code-styling';
import type { Options, FileExtension } from 'qr-code-styling';
import type { DotStyle, CornerSquareStyle } from '../types/qr.types';

export interface QREngineConfig {
  compiledData: string;
  style: {
    size: number;
    margin: number;
    fgColor: string;
    bgColor: string;
    transparentBg: boolean;
    dotStyle: DotStyle;
    cornerSquareStyle: CornerSquareStyle;
    errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
  };
  logo?: {
    dataUrl: string | null;
    sizeRatio: number;
    margin: number;
    hideBackgroundDots: boolean;
  } | null;
}

export function buildOptions(config: QREngineConfig): Options {
  return {
    width: config.style.size,
    height: config.style.size,
    data: config.compiledData || 'https://example.com',
    margin: config.style.margin,
    dotsOptions: {
      color: config.style.fgColor,
      type: config.style.dotStyle,
    },
    cornersSquareOptions: {
      type: config.style.cornerSquareStyle,
    },
    backgroundOptions: {
      color: config.style.transparentBg ? 'transparent' : config.style.bgColor,
    },
    image: config.logo?.dataUrl ?? undefined,
    imageOptions: {
      imageSize: config.logo?.sizeRatio ?? 0.2,
      margin: config.logo?.margin ?? 4,
      hideBackgroundDots: config.logo?.hideBackgroundDots ?? true,
    },
    qrOptions: {
      errorCorrectionLevel: config.style.errorCorrectionLevel,
    },
  };
}

export function createQRInstance(config: QREngineConfig, container?: HTMLElement | null) {
  const instance = new QRCodeStyling(buildOptions(config));
  if (container) instance.append(container);
  return instance;
}

export function updateQR(instance: QRCodeStyling, config: QREngineConfig) {
  instance.update(buildOptions(config));
}

export async function exportQR(instance: QRCodeStyling, ext: FileExtension): Promise<Blob | null> {
  const data = await instance.getRawData(ext);
  return data instanceof Blob ? data : null;
}
