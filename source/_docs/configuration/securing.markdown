---
title: "Securing your Home Assistant"
description: "Recommended settings and best practices for keeping your Home Assistant secure, from strong passwords to safe remote access."

related:
  - docs: /docs/configuration/
  - docs: /docs/configuration/secrets/
    title: Secrets.yaml file
  - docs: /cloud/
    title: Home Assistant Cloud
  - url: https://nabucasa.com/config/
    title: Nabu Casa
---

Home Assistant runs on your own hardware and does not depend on any cloud service to work, which already removes a large category of risks that come with internet-connected smart home platforms. Even so, there are a few simple steps you should take to keep your Home Assistant secure, especially if you plan to access it from outside your home network.

## Checklist

The most important things to do to keep your Home Assistant secure:

- Centralize sensitive data in [secrets](/docs/configuration/secrets/) (and remember to back them up).
  - **Note**: Storing secrets in `secrets.yaml` does not encrypt them.
- Keep your system up to date with each monthly release.

## Remote access

If you want secure remote access, the easiest option is to use [Home Assistant Cloud](/cloud/) by which you also support the [Open Home Foundation](https://www.openhomefoundation.org), which develops Home Assistant, ESPHome and much more.

Another option is to use TLS/SSL via the app [Duck DNS](/integrations/duckdns/) integrating Let's Encrypt.

To expose your instance to the internet, use a [VPN](https://pivpn.io), or an [SSH tunnel](/blog/2017/11/02/secure-shell-tunnel/). Make sure to expose the used port in your router.

### Extras for manual installations

Besides the above, we advise that you consider the following to improve security:

- For systems that use SSH, set `PermitRootLogin no` in your sshd configuration (usually `/etc/ssh/sshd_config`) and use SSH keys for authentication instead of passwords. This is particularly important if you enable remote access to your SSH services.
- Lock down the host following good practice guidance, for example:
  - [Securing Debian Manual](https://www.debian.org/doc/manuals/securing-debian-manual/index.en.html) (this also applies to Raspberry Pi OS)
  - [Red Hat Enterprise Linux 7 Security Guide](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/7/html/security_guide/index), [CIS Red Hat Enterprise Linux 7 Benchmark](https://www.cisecurity.org/cis-benchmarks/)
