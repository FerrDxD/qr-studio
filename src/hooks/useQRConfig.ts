import { useCallback, useEffect, useState } from 'react';
import { compilePayload, isPayloadEmpty } from '../core/payloadFormatters';
import type { PayloadType, QRConfiguration } from '../types/qr.types';

const ACTIVE_KEY = 'qrstudio_active_state';
const HISTORY_KEY = 'qrstudio_history';
const MAX_HISTORY = 20;
const FALLBACK_DATA = 'https://example.com';

function defaultConfig(): QRConfiguration {
  return {
    id: crypto.randomUUID(),
    name: 'Untitled',
    createdAt: new Date().toISOString(),
    payloadType: 'url',
    rawInput: { url: 'https://example.com' },
    compiledData: 'https://example.com',
    style: {
      size: 1024,
      margin: 16,
      fgColor: '#0F172A',
      bgColor: '#FFFFFF',
      transparentBg: false,
      dotStyle: 'rounded',
      cornerSquareStyle: 'extra-rounded',
      errorCorrectionLevel: 'M',
    },
  };
}

function loadActive(): QRConfiguration {
  try {
    const raw = localStorage.getItem(ACTIVE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return defaultConfig();
}

function loadHistory(): QRConfiguration[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

export function useQRConfig() {
  const [config, setConfig] = useState<QRConfiguration>(loadActive);
  const [history, setHistory] = useState<QRConfiguration[]>(loadHistory);

  // Persist active config.
  useEffect(() => {
    localStorage.setItem(ACTIVE_KEY, JSON.stringify(config));
  }, [config]);

  // Persist history.
  useEffect(() => {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  }, [history]);

  // Derived during render (no effect): live compiled payload + empty-state fallback.
  const liveCompiled = compilePayload(config.payloadType, config.rawInput);
  const empty = isPayloadEmpty(config.payloadType, config.rawInput);
  const effectiveData = empty ? FALLBACK_DATA : liveCompiled;

  const setRawInput = useCallback(
    (payloadType: PayloadType, input: Record<string, string | boolean>) => {
      setConfig((c) => ({ ...c, payloadType, rawInput: input }));
    },
    [],
  );

  const saveToHistory = useCallback(
    (cfg: QRConfiguration) => {
      setHistory((prev) => {
        const next = [cfg, ...prev.filter((h) => h.id !== cfg.id)].slice(0, MAX_HISTORY);
        return next;
      });
    },
    [],
  );

  const loadFromHistory = useCallback(
    (id: string) => {
      setConfig(history.find((h) => h.id === id) || config);
    },
    [history, config],
  );

  const removeFromHistory = useCallback(
    (id: string) => {
      setHistory((prev) => prev.filter((h) => h.id !== id));
    },
    [],
  );

  return {
    config,
    setConfig,
    empty,
    effectiveData,
    liveCompiled,
    history,
    setRawInput,
    saveToHistory,
    loadFromHistory,
    removeFromHistory,
  };
}
