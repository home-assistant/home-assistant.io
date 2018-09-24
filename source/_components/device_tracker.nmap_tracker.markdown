---
layout: page
title: "Nmap"
description: "Instructions on how to integrate Nmap into Home Assistant."
date: 2018-09-21 18:59
sidebar: true
comments: false
sharing: true
footer: true
logo: nmap.png
ha_category: Presence Detection
featured: false
---


As an alternative to the router-based device tracking, it is possible to directly scan the network for devices by using Nmap. The IP addresses to scan can be specified in any format that Nmap understands, including the network-prefix notation (`192.168.1.1/24`) and the range notation (`192.168.1.1-255`).

<p class='note'>
  Please keep in mind that modern smart phones will usually turn off WiFi when they are idle. Simple trackers like this may not be reliable on their own.
</p>

You might have to install the packages for `arp` and `nmap`. On Debian based hosts (for example Hassbian and Raspbian) do so by running `$ sudo apt-get install net-tools nmap`. On a Fedora host run `$ sudo dnf -y install nmap`. 

<p class='note'>
If you are using [Hass.io](/hassio/) then just move forward to the configuration as all requirements are already fulfilled.
</p>

Host detection is done via Nmap's "fast scan" (`-F`) of the most frequently used 100 ports, with a host timeout of 5 seconds.

To use this device tracker in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: nmap_tracker
    hosts: 192.168.1.0/24
```

Configuration variables:

- **hosts** (*Required*): The network address to scan (in any supported Nmap format). Mixing subnets and IPs is possible.
- **home_interval** (*Optional*): The number of minutes Nmap will not scan this device, assuming it is home, in order to preserve the device battery.
- **exclude** (*Optional*): Hosts not to include in Nmap scanning. Scanning the host where Home Assistant is running can cause problems (websocket error), so excluding that host is a good idea.
- **scan_options** (*Optional*): Configurable scan options for Nmap. Default to `-F --host-timeout 5s`

## {% linkable_title Examples %}

A full example for the `nmap` tracker could look like the following sample:

```yaml
# Example configuration.yaml entry for Nmap
# One whole subnet, and skipping two specific IPs.
device_tracker:
  - platform: nmap_tracker
    hosts: 192.168.1.0/24
    home_interval: 10
    exclude:
     - 192.168.1.12
     - 192.168.1.13
```

```yaml
# Example configuration.yaml for Nmap
# One subnet, and two specific IPs in another subnet.
device_tracker:
  - platform: nmap_tracker
    hosts:
      - 192.168.1.0/24
      - 10.0.0.2
      - 10.0.0.15
```
In the above example, Nmap will be call with the process:
`nmap -oX - 192.168.1.1/24 10.0.0.2 10.0.0.15 -F --host-timeout 5s`

An example of how the Nmap scanner can be customized:

### {% linkable_title Linux capabilities %}

On Linux systems you can extend the functionality of Nmap, without having to run it as root, by using *Linux capabilities*. Be sure to specify the full path to wherever you installed Nmap:

```bash
$ sudo setcap cap_net_raw,cap_net_admin,cap_net_bind_service+eip /usr/bin/nmap
```

And you can set up the device tracker as
```yaml
- platform: nmap_tracker
  hosts: 192.168.1.1-25
  scan_options: " --privileged -sP "
```

See the [device tracker component page](/components/device_tracker/) for instructions how to configure the people to be tracked.
