import { AlertTriangle, CheckCircle2 } from '../ui/icons';
import { contrastRatio } from '../../core/contrastChecker';

interface ContrastWarningProps {
  fgColor: string;
  bgColor: string;
}

export function ContrastWarning({ fgColor, bgColor }: ContrastWarningProps) {
  const ratio = contrastRatio(fgColor, bgColor);
  const low = ratio < 3;

  return (
    <div className="flex items-center gap-2 rounded border px-3 py-2 text-xs font-medium">
      {low ? (
        <>
          <AlertTriangle size={14} className="text-status-warn" />
          <span className="text-status-warn">Kontras rendah — QR mungkin sulit dipindai kamera.</span>
          <span className="ml-auto text-status-warn/70">{ratio.toFixed(2)}:1</span>
        </>
      ) : (
        <>
          <CheckCircle2 size={14} className="text-accent-primary" />
          <span className="text-text-muted">Kontras baik</span>
          <span className="ml-auto text-text-muted/70">{ratio.toFixed(2)}:1</span>
        </>
      )}
    </div>
  );
}
