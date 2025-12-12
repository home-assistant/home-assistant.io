---
title: "Home Assistant and SSH"
description: "Accessing Home Assistant through a secure shell tunnel."
date: 2017-11-02 10:00:00 +0200
date_formatted: "November 02, 2017"
author: Fabian Affolter
author_twitter: fabaff
categories: How-To
og_image: /images/blog/2017-11-ssh/social.png
---

Most system engineers are very familiar with [SSH (Secure shell)](https://en.wikipedia.org/wiki/Secure_Shell). This tool which contains a server part and a client part is used to access a remote system in a secure way. It can also help you if your are running Home Assistant but don't want to expose it to the public. On a Linux system SSH is often available by default. If you are using a Windows installation additional steps are required which are not covered here.

In this blog post we are going to use the tunneling option of SSH to create a secure connection and forward the Home Assistant frontend to a local system.

<!--more-->

The involved parties are:

- **Remote system**: Where Home Assistant is running, usually in your home network.
- **Local system**: Where you want to see the frontend.

The prerequirements are that you need to allow the forwarding of port 22 from your router to the system where Home Assistant is running in your network. It might also be needed that you enable the SSH daemon by `$ sudo systemctl start sshd` on the remote system and to adjust the host firewall. If you are running [Hass.io](/hassio/) then enable the [SSH Server add-on](/addons/ssh/). You must also have a public IP address or hostname which can be provided by dynamic DNS (e.g., [NO-IP](https://www.noip.com/) or [DuckDNS](https://www.duckdns.org/)).
On your local system you need only a SSH client and you need to be in a network where SSH is allowed.

First let's have a look at the command we are going to use. Use `man ssh` to get more information.

```bash
$ ssh -L 8000:localhost:8123 user@[IP_ADDRESS_REMOTE]
      |  |    |         |    |    |
      |  |    |         |    |    |_ IP address or hostname of your router.
      |  |    |         |    |_ Username on the remote system.
      |  |    |         |_ Port where the application is running.
      |  |    |_ We want the frontend on this system.
      |  |_ The port on our local system to use (above 1024).
      |_ We want to do local port forwarding.
```

A possible example could look like the command below.

```bash
ssh -L 8000:localhost:8123 ha@192.168.0.11
```

The first time you establish the connection you need to accept the fingerprint.

```bash
The authenticity of host '192.168.0.11 (192.168.0.11)' can't be established.
ECDSA key fingerprint is SHA256:asdf2faasd4gk45454fadr78wfadfasdfeg4vvvsae33.
ECDSA key fingerprint is MD5:44:d4:f7:44:d4:aa:b8:de:ef:09:3e:0d:4e:12:11:09.
Are you sure you want to continue connecting (yes/no)?
Warning: Permanently added '192.168.0.162' (ECDSA) to the list of known hosts.
ha@192.168.0.11's password:
Last login: Fri Oct 27 17:50:09 2017
[ha@home-assistant ~]$
```

Now you are able to use your frontend on your local system: `http://localhost:8000`

Things to keep in mind:

- You need a public IP address or hostname (Dynamic DNS will work) if you want to use it from the internet.
- You need to setup port forwarding on your router.
- Don't allow `root` to use SSH. Set `PermitRootLogin no` on the remote system.
- Your local port must be above 1024. Only `root` is allowed to forward privileged ports which are below 1024.
- Use [SSH keys for authentication](http://docs.fedoraproject.org//en-US/Fedora/14/html/Deployment_Guide/s2-ssh-configuration-keypairs.html) instead of passwords to avoid bruteforce attacks.
