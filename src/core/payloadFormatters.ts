export function escapeWifi(str: string): string {
  return str.replace(/[\\;,:"']/g, (m) => '\\' + m);
}

export function formatWifi(ssid: string, security: string, password: string, hidden: boolean): string {
  return `WIFI:T:${security};S:${escapeWifi(ssid)};P:${escapeWifi(password)};H:${hidden ? 'true' : 'false'};;`;
}

export function formatVCard(name: string, phone: string, email: string, org: string, url: string): string {
  return `BEGIN:VCARD\nVERSION:3.0\nFN:${name}\nTEL:${phone}\nEMAIL:${email}\nORG:${org}\nURL:${url}\nEND:VCARD`;
}

export function formatWhatsApp(phone: string, message: string): string {
  const num = phone.replace(/\D/g, '');
  return `https://wa.me/${num}?text=${encodeURIComponent(message)}`;
}

export function isPayloadEmpty(type: string, input: Record<string, string | boolean>): boolean {
  switch (type) {
    case 'url':
      return !String(input.url ?? '').trim();
    case 'text':
      return !String(input.text ?? '').trim();
    case 'wifi':
      return !String(input.ssid ?? '').trim();
    case 'vcard':
      return !String(input.name ?? '').trim();
    case 'whatsapp':
      return !String(input.phone ?? '').trim();
    default:
      return true;
  }
}

export function compilePayload(type: string, input: Record<string, string | boolean>): string {
  switch (type) {
    case 'url':
      return String(input.url ?? '');
    case 'text':
      return String(input.text ?? '');
    case 'wifi':
      return formatWifi(String(input.ssid ?? ''), String(input.security ?? 'WPA'), String(input.password ?? ''), Boolean(input.hidden));
    case 'vcard':
      return formatVCard(String(input.name ?? ''), String(input.phone ?? ''), String(input.email ?? ''), String(input.org ?? ''), String(input.url ?? ''));
    case 'whatsapp':
      return formatWhatsApp(String(input.phone ?? ''), String(input.message ?? ''));
    default:
      return '';
  }
}