---
layout: post
title: "Modernizing encryption of Home Assistant backups"
description: "We're bringing your Home Assistant backups fully up to date. Rolling out with release 2026.4, SecureTar v3 has independently audited, best-in-class encryption."
date: 2026-03-26 00:00:00
date_formatted: "March 26, 2026"
author:
  - Erik Montnémery
  - Stefan Agner
comments: true
categories: Announcements
og_image: /images/blog/2026-03-modernizing-encryption-of-home-assistant-backups/art.webp
---

<img src="/images/blog/2026-03-modernizing-encryption-of-home-assistant-backups/art.webp" alt="Modernizing encryption of Home Assistant backups" style="border: 0;box-shadow: none;">

Backups are one of those quiet, powerful features: when they work, you don't notice them, but when you need them, they're everything. We've evolved Home Assistant's built-in backup format over the years to keep it safe and secure, especially when backing up to remote locations. As modern cryptography has advanced, we needed to build a system to match. SecureTar v3 is a purpose-built library for creating and reading password-protected Home Assistant backups with modern cryptography and safer, stronger defaults.

To help us get this right, we commissioned <a href="https://trailofbits.com/" target="_blank" rel="noopener">Trail of Bits</a>, a leading security engineering firm, to independently audit our work. Their review found that SecureTar v3 follows best-in-class practices for core security algorithms, such as hashing and encryption. They also identified three areas for improvement, which they confirmed were resolved in their follow-up review. This audit was paid for by the <a href="https://www.openhomefoundation.org/" target="_blank" rel="noopener">Open Home Foundation</a> so we could invest in improvements that protect users' privacy, security, and control.

Your backups will start using this new encryption automatically, beginning with the release of version 2026.4 on April 1, 2026. Please note old backups will still work and be readable after this change (see Recommended next steps below). For more technical details, please read on...

<!--more-->

## A bit of history

Home Assistant backups have always been encrypted by default, and use a high entropy key, to help ensure your data is safe. When we introduced backups, early formats (v1 and v2) used the same AES-128 encryption variant, along with a simple key derivation (the code that turns your passphrase into the actual key used for encryption). <a href="https://github.com/samrocketman" target="_blank" rel="noopener">Sam Gleske</a> brought to our attention that the key-derivation step was no longer up to modern standards.

It's worth stressing an important point: Home Assistant's passphrase generator already produces long, high-entropy passphrases. This means that backups created previously were difficult to break if using this feature. To demonstrate this, we calculated that a brute force passphrase attack (where attackers try many passwords rapidly) on the backups would take more time than the average lifespan of a person to be successful.

Still, because it was possible to manually generate an insecure passphrase for advanced users, and the library's internal cryptographic primitives could be improved, we decided to overhaul SecureTar to use best-in-class algorithms, and to have that work validated by an external audit.

## What we changed and why

The goals were simple: choose modern, well-studied algorithms, avoid design mistakes that could weaken confidentiality or integrity, and make v3 the secure default.

Highlights of the SecureTar v3 design:

- **Modern key derivation:** SecureTar v3 uses Argon2id for password-based key derivation. Argon2id is a memory-hard algorithm that makes brute-force attacks much more costly.
- **Modern encryption and authentication:** Encryption is provided by the libsodium secretstream API (exposed in Python via PyNaCl), which implements a robust streaming authenticated-encryption construction using XChaCha20-Poly1305. That combination gives both confidentiality (nobody can read your data) and integrity/authentication (nobody can tamper with it without detection).
- **Safer defaults and parsing:** We set safer defaults so new backups use v3, and we fixed parsing logic to avoid silently treating corrupt data as valid legacy backups.

We made these choices to ensure that SecureTar is resilient to modern attacks and easier to reason about from a security perspective.

## Independent audit by Trail of Bits

After implementing SecureTar v3, we commissioned Trail of Bits to perform the focused security assessment and fix review. Here is what the review found:

1. **Timing side-channel in a validation comparison (informational):** The audit pointed out a minor coding issue in how we checked a validation key. It wasn't a security risk (the value is stored openly in the file header), but we updated the check to a safer form so security tools stop flagging it.
2. **Insecure fallback to legacy protocol version (informational):** Header parsing logic could be confused by corrupted data; we updated the logic so corrupted headers raise an error instead of silently falling back.
3. **Supply-chain risk in GitHub Actions workflow (medium):** Workflow steps were not pinned to specific commit hashes and used broad permissions, opening the build process to possible supply-chain attacks. We pinned actions to specific commit hashes and tightened permissions.

Crucially, Trail of Bits' post-fix review confirmed all three findings were resolved. This shows we have not only adopted modern cryptography, but also closed the gaps the audit exposed.

You can read more about the audit and the fixes in the <a href="https://github.com/trailofbits/publications/blob/master/reviews/2026-03-open-home-foundation-securetar-v3-securityreview.pdf" target="_blank" rel="noopener">Trail of Bits report</a>.

## How you help support this work

Security work (especially external audits and specialist engineering) costs money. The Open Home Foundation provides the structure and finances that let us do this work. That money comes, in part, from people who buy official Home Assistant or ESPHome products from the foundation's <a href="https://www.openhomefoundation.org/structure/" target="_blank" rel="noopener">commercial partners</a>, and merchandise from the <a href="https://store.openhomefoundation.org/" target="_blank" rel="noopener">Open Home Foundation Store</a>: we really appreciate your support!

Because of this, we were able to commission experts, invest engineering time, and validate the fixes. That investment protects users' backups (which often contain configurations, passwords and API keys, integrations, and automations) and keeps Home Assistant a trustworthy, secure platform for everyone.

## Recommended next steps

- Ensure Home Assistant is updated to the latest version. The 2026.4 release includes SecureTar v3.
- Any encrypted backup created after updating to 2026.4 will use v3's improved format.
- Existing backups are still secure, as Home Assistant's generated passphrase is strong. That said, for extra security, you can regenerate the encryption key in your backup settings (use the **Change encryption key** option at the bottom of the backup settings page).
- If you use the `ha backup` CLI command, or the `hassio.backup_full` or `hassio.backup_partial` actions to create backups, and you've used a short/low entropy password, you should choose a new password.

## For the curious: technical summary

- Key derivation: Argon2id (memory-hard), using separate sub-keys for each backup part.
- Encryption / AEAD: XChaCha20-Poly1305 via libsodium secretstream (PyNaCl) with 256-bit key size. AEAD means your data is not only encrypted, but also authenticated (validating the data is unchanged/not tampered with).
- Audit: Trail of Bits: 3 findings (2 informational, 1 medium), all resolved.
- Build hardening: GitHub Actions pinned to commit SHAs and narrower permissions to reduce supply-chain risk.

Looking for more? Check out the <a href="https://github.com/home-assistant-libs/securetar" target="_blank" rel="noopener">SecureTar repository on GitHub</a>.

## Final note

Security is iterative, and this latest work has helped build a stronger foundation for Home Assistant backups, and a clearer path forward for maintaining that security over time.

If you want to read about similar past efforts, see some of our other posts:

- [One of our past security audits](/blog/2023/10/19/security-audits-of-home-assistant/)
- The upcoming release notes for Home Assistant 2026.4

By keeping Home Assistant secure, we make the platform safer, more trusted, and more enjoyable for the whole community. Thank you.
