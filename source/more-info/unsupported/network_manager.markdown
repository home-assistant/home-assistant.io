---
title: "Network Manager"
description: "More information on why the Network Manager marks the installation as unsupported."
---

## The issue

The Supervisor utilizes the Network Manager on the host to offer network information
to add-ons and to give you the option to manage the network interfaces using the UI
or via the command-line.

This requires NetworkManager to be installed, active
and in control of at least one network interface on the host.

The current minimum supported version of NetworkManager is: 1.14.6.

## The solution

If you have not already, install or update Network Manager on the host.

When it is installed, you need to make sure it manages at least one interface
[see the documentation for the network manager](https://wiki.debian.org/NetworkManager).

Here are some example files that can be used to make the Network Manager control all
physical interfaces.

`/etc/NetworkManager/NetworkManager.conf`:

```txt
[main]
dns=default
plugins=keyfile
autoconnect-retries-default=0
rc-manager=file

[keyfile]
unmanaged-devices=type:bridge;type:tun;driver:veth

[logging]
backend=journal
```

`/etc/NetworkManager/system-connections/default`:

```txt
[connection]
id=Supervisor default
uuid=b653440a-544a-4e4f-aef5-6c443171c4f8
type=802-3-ethernet
llmnr=2
mdns=2

[ipv4]
method=auto

[ipv6]
addr-gen-mode=stable-privacy
method=auto
```

`/etc/network/interfaces`:

```txt
source /etc/network/interfaces.d/*

auto lo
iface lo inet loopback
```

You can also just re-run our
[convenience installation script](https://github.com/home-assistant/supervised-installer).

If you haven't done anything manually with the network on the host, you should just
re-run the convenience installation script.

When you have changed your network configuration manually or with the script,
you should restart the host so the change will be populated to all services that
needs it.
