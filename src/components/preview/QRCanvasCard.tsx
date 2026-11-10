import { useEffect, useRef } from 'react';
import { createQRInstance, updateQR, type QREngineConfig } from '../../core/qrEngine';

interface QRCanvasCardProps {
  config: {
    compiledData: string;
    style: QREngineConfig['style'];
    logo: QREngineConfig['logo'];
  };
  empty: boolean;
}

const PREVIEW_SIZE = 300;

export function QRCanvasCard({ config, empty }: QRCanvasCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<ReturnType<typeof createQRInstance> | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const engineConfig: QREngineConfig = {
      compiledData: config.compiledData,
      style: {
        size: PREVIEW_SIZE,
        margin: config.style.margin,
        fgColor: config.style.fgColor,
        bgColor: config.style.bgColor,
        transparentBg: config.style.transparentBg,
        dotStyle: config.style.dotStyle,
        cornerSquareStyle: config.style.cornerSquareStyle,
        errorCorrectionLevel: config.style.errorCorrectionLevel,
      },
      logo: config.logo,
    };
    if (!instanceRef.current) {
      instanceRef.current = createQRInstance(engineConfig, containerRef.current);
    } else {
      updateQR(instanceRef.current, engineConfig);
    }
  }, [config]);

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className={`rounded border border-border-subtle bg-bg-canvas-well flex items-center justify-center transition-opacity duration-200 ${
          empty ? 'opacity-60 animate-pulse' : 'opacity-100'
        }`}
      >
        <div ref={containerRef} className="w-[300px] h-[300px] shrink-0" />
      </div>
      {empty && (
        <p className="text-xs text-text-muted">Kosong — menampilkan pratinjau placeholder.</p>
      )}
    </div>
  );
}
