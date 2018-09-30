---
layout: page
title: "Securing"
description: "Instructions on how to secure your Home Assistant installation."
date: 2016-10-06 06:00
sidebar: true
comments: false
sharing: true
footer: true
redirect_from: /getting-started/securing/
---

One major advantage of Home Assistant is that it's not dependent on cloud services. Even if you're only using Home Assistant on a local network, you should take steps to secure your instance.

### {% linkable_title Checklist %}

- [Choose a strong password](/docs/authentication/).
- Secure your host. Sources could be [Red Hat Enterprise Linux 7 Security Guide](https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/7/pdf/Security_Guide/Red_Hat_Enterprise_Linux-7-Security_Guide-en-US.pdf), [CIS Red Hat Enterprise Linux 7 Benchmark](https://benchmarks.cisecurity.org/tools2/linux/CIS_Red_Hat_Enterprise_Linux_7_Benchmark_v1.0.0.pdf), or the [Securing Debian Manual](https://www.debian.org/doc/manuals/securing-debian-howto/index.en.html).
- Restrict network access to your devices. Set `PermitRootLogin no` in your sshd config (usually `/etc/ssh/sshd_config`) and to use SSH keys for authentication instead of passwords.
- Don't run Home Assistant as root – consider the Principle of Least Privilege.
- Keep your [secrets](/topics/secrets/) safe.

If you want to allow remote access, consider these additional points:

- Protect your communication with [TLS/SSL](/docs/ecosystem/certificates/lets_encrypt/).
- Enable IP Filtering and configure a low [Login Attempts Threshold](/components/http/)
- Protect your communication with [Tor](/cookbook/tor_configuration/).
- Protect your communication with a [self-signed certificate](/cookbook/tls_self_signed_certificate/).
- Use a [proxy](/cookbook/apache_configuration/).
- Set up a VPN
- Use a [SSH tunnel](/blog/2017/11/02/secure-shell-tunnel/) to connect to your frontend.

<p class='note warning'>
  If you've forwarded any ports to your Home Assistant system from the Internet then it *will* be found by others. Whether through services like Shodan, or direct port scanning, all systems on the Internet are routinely probed for accessible services. If you fail to set a password then it is simply a matter of time before somebody finds your system - potentially as little as a few hours.
</p>
