---
layout: page
title: "Securing"
description: "Instructions how to secure your Home Assistant installation."
date: 2016-10-06 06:00
sidebar: true
comments: false
sharing: true
footer: true
---

One of the reasons to use Home Assistant is that it's not depending on cloud services. Even if you are only using Home Assistant in your local network, you should consider securing your instance.

### {% linkable_title Checklist %}

- [Protect your web interface with a password](https://home-assistant.io/getting-started/basic/#password-protecting-the-web-interface)
- Secure your host. Sources could be [Red Hat Enterprise Linux 7 Security Guide](https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/7/pdf/Security_Guide/Red_Hat_Enterprise_Linux-7-Security_Guide-en-US.pdf), [CIS Red Hat Enterprise Linux 7 Benchmark](https://benchmarks.cisecurity.org/tools2/linux/CIS_Red_Hat_Enterprise_Linux_7_Benchmark_v1.0.0.pdf), or the [Securing Debian Manual](https://www.debian.org/doc/manuals/securing-debian-howto/index.en.html).
- Restrict network access to your device. Set `PermitRootLogin no` in your sshd config (usually `/etc/ssh/sshd_config`) and to use keys for authentication instead of passwords.
- Don't run Home Assistant as root. 
- Keep your [secrets](/topics/secrets/) safe.

Additional points if you want to allow remote access:

- Protect your communication with [TLS](/blog/2015/12/13/setup-encryption-using-lets-encrypt/)
- Protect your communication with [Tor](/cookbook/tor_configuration/)
- Protect your communication with a [self-signed certificate](/cookbook/tls_self_signed_certificate/)
- Use a [proxy](/cookbook/apache_configuration/)


