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

## {% linkable_title Checklist %}

Here's the summary of what you *must* do to secure your Home Assistant system:

&#9744; Configured [secrets](/topics/secrets/)  
&#9744; Set [a password](/getting-started/basic/#password-protecting-the-web-interface)  
&#9744; Regularly keep the system up to date  
&#9744; For remote access to the UI, use a [VPN](http://www.pivpn.io/) or [Tor](/docs/ecosystem/tor/)  
&#9744; For remote access for components, use a [TLS/SSL](/docs/ecosystem/certificates/lets_encrypt/) certificate  

## {% linkable_title All installs %}

Regardless of whether you plan on only accessing Home Assistant from inside your network or not, you **must**:

- Keep your [secrets](/topics/secrets/) safe (but do remember to back them up)
- Protect your web interface [with a password](/getting-started/basic/#password-protecting-the-web-interface)
- If you're manually installing Home Assistant don't run Home Assistant as root – consider the Principle of Least Privilege
- Keep your system regularly updated

### {% You should %}

As well as the above we advise that you consider the following to improve security:

- For systems that use SSH set `PermitRootLogin no` in your sshd config (usually `/etc/ssh/sshd_config`) and to use SSH keys for authentication instead of passwords 
- Lock down the host following good practice guidance, for example:
  * [Securing Debian Manual](https://www.debian.org/doc/manuals/securing-debian-howto/index.en.html) (this also applies to Raspbian)
  * [Red Hat Enterprise Linux 7 Security Guide](https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/7/pdf/Security_Guide/Red_Hat_Enterprise_Linux-7-Security_Guide-en-US.pdf), [CIS Red Hat Enterprise Linux 7 Benchmark](https://benchmarks.cisecurity.org/tools2/linux/CIS_Red_Hat_Enterprise_Linux_7_Benchmark_v1.0.0.pdf)

## {% linkable_title Remote access %}

If you're only wanting to use components supported by [Home Assistant cloud](/cloud/) then you don't need to enable remote access. This is obviously the most secure option, but does mean that you're relying on a cloud service for that functionality.

<p class='note warning'>
  If you've forwarded *any* ports to your Home Assistant system from the Internet then it *will* be found by others. Whether through services like Shodan, or direct port scanning, all systems on the Internet are routinely probed for accessible services. If you fail to set a password then it is simply a matter of time before somebody finds your system and starts abusing it - potentially as little as a few hours.
</p>

### {% linkable_title Remote access for just the UI %}

If you're only wanting remote access for access to the web UI then we advise that you follow the **All installs** section, then set up one of:

- A VPN such as [PiVPN](http://www.pivpn.io/) or [ZeroTier](https://www.zerotier.com/), which will give you access to your whole home network
- [Tor](/docs/ecosystem/tor/), which also avoids the need for port forwarding
- An [SSH tunnel](/blog/2017/11/02/secure-shell-tunnel/) to connect to your frontend

### {% linkable_title Remote access for components %}

For remote access for a component, for example a device tracker, you have to enable access to the API by:

1. Following the steps in **All installs**, then
2. Forwarding a port and protect your communication with one of:
  * A [TLS/SSL](/docs/ecosystem/certificates/lets_encrypt/) certificate (you can use one from Let's Encrypt, or any commercial SSL certificate vendor)
  * A [self-signed certificate](/cookbook/tls_self_signed_certificate/) - be warned though, some services will refuse to work with self-signed certificates
3. Optionally use a proxy like [nginx](/docs/ecosystem/nginx/), [apache](/cookbook/apache_configuration/), or another. These allow you to provide finer grained access. You could use this to limit access to specific parts of the API (for example, only `/api/owntracks/`)
4. Install [fail2ban](https://www.fail2ban.org/wiki/index.php/Main_Page) to [monitor your Home Assistant](https://www.home-assistant.io/cookbook/fail2ban/) or proxy logs for failed authentication
