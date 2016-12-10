---
layout: page
title: "Nmap"
description: "Instructions how to integrate Nmap into Home Assistant."
date: 2015-03-23 19:59
sidebar: true
comments: false
sharing: true
footer: true
logo: nmap.png
ha_category: Presence Detection
featured: false
---


As an alternative to the router-based device tracking, it is possible to directly scan the network for devices by using Nmap. The IP addresses to scan can be specified in any format that Nmap understands, including the network-prefix notation (`192.168.1.1/24`) and the range notation (`192.168.1.1-255`).

If you're on Debian or Ubuntu, you might have to install the packages for `arp` and `nmap`. Do so by running `$ sudo apt-get install net-tools nmap`. On a Fedora host run `$ sudo dnf -y install nmap`. 

Host detection is done via Nmap's "fast scan" (`-F`) of the most frequently used 100 ports, with a host timeout of 5 seconds.

To use this device tracker in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: nmap_tracker
    hosts: 192.168.1.1/24
```

Configuration variables:

- **hosts** (*Required*): The network address to scan (in any supported NMap format). Mixing subnets and IPs is possible.
- **home_interval** (*Optional*): The number of minutes nmap will not scan this device, assuming it is home, in order to preserve the device battery.
- **exclude** (*Optional*): Hosts not to include in nmap scanning.
- **scan_options** (*Optional*): Configurable scan options for nmap. Default to `-F --host-timeout 5s`


A full example for the `nmap` tracker could look like the following sample:

```yaml
# Example configuration.yaml entry for nmap
# One whole subnet, and skipping two specific IPs.
device_tracker:
  - platform: nmap_tracker
    hosts: 192.168.1.1/24
    home_interval: 10
    exclude:
     - 192.168.1.12
     - 192.168.1.13
```

```yaml
# Example configuration.yaml for nmap
# One subnet, and two specific IPs in another subnet.
device_tracker:
  - platform: nmap_tracker
    hosts:
      - 192.168.1.1/24
      - 10.0.0.2
      - 10.0.0.15
```

An example of how the Nmap scanner can be customized:

Add the capabilities to Nmap. Be sure to specify the full path to wherever you installed Nmap:

`sudo setcap cap_net_raw,cap_net_admin,cap_net_bind_service+eip /usr/bin/nmap
`

And you can set up the device tracker as
```yaml
- platform: nmap_tracker
  hosts: 192.168.1.1-25
  scan_options: " --privileged -sP "
```


See the [device tracker component page](/components/device_tracker/) for instructions how to configure the people to be tracked.
