---
title: Nmap Tracker
description: Instructions on how to integrate Nmap into Home Assistant.
ha_category:
  - Presence Detection
ha_release: 0.7
ha_iot_class: Local Polling
ha_domain: nmap_tracker
ha_platforms:
  - device_tracker
ha_config_flow: true
---

As an alternative to the router-based device tracking, it is possible to directly scan the network for devices by using Nmap. The IP addresses to scan can be specified in any format that Nmap understands, including the network-prefix notation (`192.168.1.1/24`) and the range notation (`192.168.1.1-255`).

<div class='note'>
  Please keep in mind that modern smart phones will usually turn off WiFi when they are idle. Simple trackers like this may not be reliable on their own.
</div>

<div class='note'>

If you are running Home Assistant Core in a Python virtual environment, you might have to install the packages for `arp` and `nmap`.
On Debian based hosts (for example Raspbian) do so by running `sudo apt-get install net-tools nmap`.
On a Fedora host run `sudo dnf -y install nmap`.

</div>

{% include integrations/config_flow.md %}

An example of how the Nmap scanner can be customized:

### Linux capabilities

On Linux systems (such as Hass.io) you can extend the functionality of Nmap, without having to run it as root, by using *Linux capabilities*. Be sure to specify the full path to wherever you installed Nmap:

```bash
sudo setcap cap_net_raw,cap_net_admin,cap_net_bind_service+eip /usr/bin/nmap
```

And you can set up the device tracker scan options with `--privileged -sn`

See the [device tracker integration page](/integrations/device_tracker/) for instructions how to configure the people to be tracked.
