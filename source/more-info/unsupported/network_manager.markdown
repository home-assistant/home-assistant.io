---
title: "Network Manager"
description: "More information on why network manager marks the installation as unsupported."
---

## The issue

The Supervisor utilizes Network Manager on the host to offer this information
to add-ons and to give you the option to manage the network interfaces with CLI/UI.

For it to be able to do this, you need to have Network Manager installed, active
and in control of at least one network interface on the host.

## The solution

If you have not already, install Network Manager on the host.

When it is installed, you need to make sure it manages at least one interface
[see the documentation for the network manager](https://wiki.debian.org/NetworkManager).

Here are some example files that can be used to make network manager control all
physical interfaces.

`/etc/NetworkManager/NetworkManager.conf`:

```txt
[main]
dns=default
plugins=keyfile
autoconnect-retries-default=0
rc-manager=file

[keyfile]
unmanaged-devices=type:bridge;type:tun;type:veth

[logging]
backend=journal
```

`/etc/NetworkManager/system-connections/default`:

```txt
[ipv4]
method=auto

[ipv6]
addr-gen-mode=stable-privacy
method=auto
```

In addition to these two files you also need to adjust `/etc/network/interfaces`

You can also just re-run our
[convenience installation script](https://github.com/home-assistant/supervised-installer).

If you have not done anything with the network on the host manually, you should just
re-run the convenience installation script.
