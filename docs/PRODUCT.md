# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: students & schools — creating QR codes on the spot for event/class registration forms, class or event Wi-Fi access, and links to learning materials. Confirmed secondary audiences: creators & developers (portfolio links, repos, web projects) and local SMBs (digital menus, WhatsApp contact, business location with centered brand logo).

## Product Purpose

QRStudio lets anyone create, customize, and export high-quality QR codes instantly in the browser, with no backend, no account, no subscription, and no third-party tracking. All processing runs client-side for 100% privacy and sub-50 ms debounced preview updates. Output covers raster (PNG/WebP up to 2048×2048 px) and vector (SVG) export, plus copy to clipboard.

## Positioning

Pure client-side static QR codes: no expiring redirect links, no scan analytics, no user authentication, no server storage of input (including Wi-Fi passwords), and local-first history kept on the user's device. Differentiates from free web generators that insert paid redirects, cap resolution at blurry PNGs, or track input server-side.

## Operating Context

Browser-based static SPA / offline-capable PWA (manifest.json in public/). A specific static deploy host constrains the build, but its name has not been confirmed — do not invent a deployment claim. Used on desktop and mobile browsers, typically in one-off creation sessions rather than repeated log-in workflows.

## Capabilities and Constraints

Capabilities:
- Payload types: URL (http/https validation), plain text, Wi-Fi (WPA/WPA2/WEP/None, hidden network, `WIFI:T:...` standard format), vCard (name, phone, email, org, website), WhatsApp (`wa.me`) and email (`mailto:`) quick links.
- Visual customization: foreground/background colors including transparent background, linear/radial gradients, module styles (square/rounded/dots), finder-pattern corner styles, centered logo upload (PNG/JPG/SVG) with size and auto-margin controls.
- Technical QR settings: error correction L/M/Q/H (auto-promoted to Q or H when a logo is uploaded), quiet zone margin.
- Export: PNG, SVG, WebP; custom resolution 256×256–2048×2048 px; copy image to clipboard.
- Local history: up to 20 recent QR configs in localStorage; JSON config import/export.

Constraints:
- Zero external network for QR rendering (no api.qrserver.com / chart.googleapis.com); local `qr-code-styling` or `qrcode` only.
- No dynamic QR/shortlink, no scan analytics, no login (out of scope v1.0).
- Memory-leak guard: revoke temporary object URLs on repeated logo uploads; cap uploads at 2 MB before Base64 conversion.
- Empty payload fallback: canvas stays visible (opacity-60) with a temporary fallback value instead of crashing.
- High-DPI export: preview locked to card size; download regenerates at chosen resolution.
- Scannability guard: visual warning on low contrast ratio or oversized logo below Q/H correction.

## Brand Commitments

Name: QRStudio. Binding voice: Indonesian (all product copy and docs). Visual identity: "Tactile Studio" aesthetic (thin 1px borders, no decorative noise, split-screen ergonomics, dark mode as default studio) per DESIGN.md — treated as incumbent design authority, not product truth to reopen here.

## Evidence on Hand

- PRD.md — product requirements and scope
- ARCHITECT.md — tech stack and directory structure
- DESIGN.md — design tokens and wireframe
- AGENTS.md — agent coding rules and guardrails
- package.json — Vite + TypeScript + React + Tailwind + qr-code-styling + lucide-react + zod
- Partial implementation: src/core/, src/hooks/, src/types/ exist per ARCHITECT.md plan; src/components/ not yet built

## Product Principles

1. Privacy first: nothing the user types leaves their device.
2. Local-first: state and history live in the browser, exportable as JSON.
3. No silent failures: empty input, bad contrast, and oversized logos are surfaced as guards, not crashes.
4. Print-ready output: vector SVG and high-resolution raster export at user-chosen resolution.
5. One job, done instantly: sub-50 ms preview, no accounts, no subscriptions.

## Accessibility & Inclusion

Contrast-ratio scannability guard is a required product-specific standard (PRD §5). Dark mode default with light-mode variant per DESIGN.md tokens.
