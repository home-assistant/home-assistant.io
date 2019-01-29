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

&#9744; Configure [secrets](/topics/secrets/) (but do remember to back them up)  
&#9744; Regularly keep the system up to date  

If you only want to use components supported by [Home Assistant cloud](/cloud/) then you don't need to enable remote access. This is obviously the most secure option, but does mean that you're relying on a cloud service for that functionality.

&#9744; For remote access to the UI, use a [VPN](http://www.pivpn.io/), [Tor](/docs/ecosystem/tor/), or an [SSH tunnel](/blog/2017/11/02/secure-shell-tunnel/)  
&#9744; For remote access for components, use a [TLS/SSL](/docs/ecosystem/certificates/lets_encrypt/) certificate  

### {% linkable_title You should %}

As well as the above we advise that you consider the following to improve security:

- For systems that use SSH set `PermitRootLogin no` in your sshd config (usually `/etc/ssh/sshd_config`) and to use SSH keys for authentication instead of passwords. This is particularly important if you enable remote access to your SSH services.   
- Lock down the host following good practice guidance, for example:
  * [Securing Debian Manual](https://www.debian.org/doc/manuals/securing-debian-howto/index.en.html) (this also applies to Raspbian)
  * [Red Hat Enterprise Linux 7 Security Guide](https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/7/pdf/Security_Guide/Red_Hat_Enterprise_Linux-7-Security_Guide-en-US.pdf), [CIS Red Hat Enterprise Linux 7 Benchmark](https://benchmarks.cisecurity.org/tools2/linux/CIS_Red_Hat_Enterprise_Linux_7_Benchmark_v1.0.0.pdf)

<p class='note warning'>
  If you've forwarded *any* ports to your Home Assistant system from the Internet, then it *will* be found by others. Whether through services like Shodan, or direct port scanning, all systems on the Internet are routinely probed for accessible services. If you fail to set a password then it is simply a matter of time before somebody finds your system and starts abusing it - potentially as little as a few hours.
</p>

### {% linkable_title Remote access for just the UI %}

If you only want remote access for access to the web UI then we advise that you follow the **All installs** section, then set up one of:

- A VPN such as [PiVPN](http://www.pivpn.io/) or [ZeroTier](https://www.zerotier.com/), which will give you access to your whole home network
- [Tor](/docs/ecosystem/tor/), which also avoids the need for port forwarding
- An [SSH tunnel](/blog/2017/11/02/secure-shell-tunnel/) to connect to your frontend

### {% linkable_title Remote access for components %}

For remote access for a component, for example, a device tracker, you have to enable access to the API by:

1. Following the steps in **All installs**, then
2. Forwarding a port and protect your communication with one of:
  * A [TLS/SSL](/docs/ecosystem/certificates/lets_encrypt/) certificate (you can use one from Let's Encrypt, or any commercial SSL certificate vendor)
  * A [self-signed certificate](/cookbook/tls_self_signed_certificate/) - be warned though, some services will refuse to work with self-signed certificates
3. Optionally use a proxy like [NGINX](/docs/ecosystem/nginx/), [Apache](/cookbook/apache_configuration/), or another. These allow you to provide finer-grained access. You could use this to limit access to specific parts of the API (for example, only `/api/owntracks/`)
4. Enable IP Filtering and configure a low [Login Attempts Threshold](/components/http/)
5. If you use a proxy then install [fail2ban](https://www.fail2ban.org/wiki/index.php/Main_Page) to [monitor your proxy logs](/cookbook/fail2ban/) (or Home Assistant logs) for failed authentication
