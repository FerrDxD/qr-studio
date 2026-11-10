import { useCallback } from 'react';
import { Link, Mail, Smartphone, Users, Wifi } from '../ui/icons';
import type { PayloadType } from '../../types/qr.types';

interface PayloadTabsProps {
  payloadType: PayloadType;
  rawInput: Record<string, string | boolean>;
  onChange: (payloadType: PayloadType, input: Record<string, string | boolean>) => void;
  empty: boolean;
}

const TABS: { id: PayloadType; label: string; icon: React.ElementType }[] = [
  { id: 'url', label: 'URL', icon: Link },
  { id: 'text', label: 'Teks', icon: Mail },
  { id: 'wifi', label: 'Wi-Fi', icon: Wifi },
  { id: 'vcard', label: 'vCard', icon: Users },
  { id: 'whatsapp', label: 'WhatsApp', icon: Smartphone },
];

export function PayloadTabs({ payloadType, rawInput, onChange, empty }: PayloadTabsProps) {
  const setField = useCallback(
    (key: string, value: string | boolean) =>
      onChange(payloadType, { ...rawInput, [key]: value }),
    [payloadType, rawInput, onChange],
  );

  return (
    <div className="space-y-3">
      <div className="flex gap-1 border-b border-border-subtle pb-1">
        {TABS.map((t) => {
          const Icon = t.icon;
          const active = payloadType === t.id;
          return (
            <button
              key={t.id}
              onClick={() => onChange(t.id, rawInput)}
              className={`flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors ${
                active
                  ? 'bg-accent-primary/10 text-accent-primary border-b-2 border-accent-primary'
                  : 'text-text-muted hover:text-text-primary'
              }`}
            >
              <Icon size={16} />
              {t.label}
            </button>
          );
        })}
      </div>

      {payloadType === 'url' && (
        <section className="space-y-2">
          <label className="block text-xs font-medium text-text-muted">Tautan situs web</label>
          <input
            className="w-full rounded border border-border-subtle bg-bg-panel p-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary"
            placeholder="https://example.com"
            value={String(rawInput.url ?? '')}
            onChange={(e) => setField('url', e.target.value)}
          />
          {empty && <p className="text-xs text-status-warn">Masukkan tautan agar QR dapat dihasilkan.</p>}
        </section>
      )}

      {payloadType === 'text' && (
        <section className="space-y-2">
          <label className="block text-xs font-medium text-text-muted">Teks bebas</label>
          <textarea
            className="w-full rounded border border-border-subtle bg-bg-panel p-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary"
            rows={3}
            placeholder="Ketik teks atau kode unik..."
            value={String(rawInput.text ?? '')}
            onChange={(e) => setField('text', e.target.value)}
          />
          {empty && <p className="text-xs text-status-warn">Masukkan teks agar QR dapat dihasilkan.</p>}
        </section>
      )}

      {payloadType === 'wifi' && (
        <section className="space-y-2">
          <label className="block text-xs font-medium text-text-muted">Nama jaringan (SSID)</label>
          <input
            className="w-full rounded border border-border-subtle bg-bg-panel p-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary"
            placeholder="KelasRuangan12"
            value={String(rawInput.ssid ?? '')}
            onChange={(e) => setField('ssid', e.target.value)}
          />
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-2">
              <label className="block text-xs font-medium text-text-muted">Tipe keamanan</label>
              <select
                className="w-full rounded border border-border-subtle bg-bg-panel p-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary"
                value={String(rawInput.security ?? 'WPA')}
                onChange={(e) => setField('security', e.target.value)}
              >
                <option value="WPA">WPA / WPA2</option>
                <option value="WEP">WEP</option>
                <option value="none">Tanpa sandi</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-medium text-text-muted">&nbsp;</label>
              <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={Boolean(rawInput.hidden)}
                  onChange={(e) => setField('hidden', e.target.checked)}
                  className="rounded border-border-subtle text-accent-primary focus:ring-accent-primary"
                />
                Jaringan tersembunyi
              </label>
            </div>
          </div>
          <div className="space-y-2">
            <label className="block text-xs font-medium text-text-muted">Sandi Wi-Fi</label>
            <input
              className="w-full rounded border border-border-subtle bg-bg-panel p-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary"
              placeholder="••••••••"
              value={String(rawInput.password ?? '')}
              onChange={(e) => setField('password', e.target.value)}
            />
          </div>
          {empty && <p className="text-xs text-status-warn">Masukkan SSID agar QR Wi-Fi dapat dihasilkan.</p>}
        </section>
      )}

      {payloadType === 'vcard' && (
        <section className="space-y-2">
          <label className="block text-xs font-medium text-text-muted">Nama lengkap</label>
          <input
            className="w-full rounded border border-border-subtle bg-bg-panel p-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary"
            placeholder="Nama Anda"
            value={String(rawInput.name ?? '')}
            onChange={(e) => setField('name', e.target.value)}
          />
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-2">
              <label className="block text-xs font-medium text-text-muted">Nomor telepon</label>
              <input
                className="w-full rounded border border-border-subtle bg-bg-panel p-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary"
                placeholder="+62 812..."
                value={String(rawInput.phone ?? '')}
                onChange={(e) => setField('phone', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-medium text-text-muted">Email</label>
              <input
                className="w-full rounded border border-border-subtle bg-bg-panel p-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary"
                placeholder="nama@contoh.com"
                value={String(rawInput.email ?? '')}
                onChange={(e) => setField('email', e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-2">
              <label className="block text-xs font-medium text-text-muted">Organisasi</label>
              <input
                className="w-full rounded border border-border-subtle bg-bg-panel p-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary"
                placeholder="Sekolah / Perusahaan"
                value={String(rawInput.org ?? '')}
                onChange={(e) => setField('org', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-medium text-text-muted">Situs web</label>
              <input
                className="w-full rounded border border-border-subtle bg-bg-panel p-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary"
                placeholder="https://..."
                value={String(rawInput.url ?? '')}
                onChange={(e) => setField('url', e.target.value)}
              />
            </div>
          </div>
          {empty && <p className="text-xs text-status-warn">Masukkan nama agar vCard dapat dihasilkan.</p>}
        </section>
      )}

      {payloadType === 'whatsapp' && (
        <section className="space-y-2">
          <label className="block text-xs font-medium text-text-muted">Nomor telepon (kode negara)</label>
          <input
            className="w-full rounded border border-border-subtle bg-bg-panel p-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary"
            placeholder="+62 8123456789"
            value={String(rawInput.phone ?? '')}
            onChange={(e) => setField('phone', e.target.value)}
          />
          <label className="block text-xs font-medium text-text-muted mt-2">Pesan awal (opsional)</label>
          <textarea
            className="w-full rounded border border-border-subtle bg-bg-panel p-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary"
            rows={2}
            placeholder="Halo, saya ingin bertanya..."
            value={String(rawInput.message ?? '')}
            onChange={(e) => setField('message', e.target.value)}
          />
          {empty && <p className="text-xs text-status-warn">Masukkan nomor telepon agar tautan WhatsApp dapat dihasilkan.</p>}
        </section>
      )}
    </div>
  );
}
