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

Host detection is done via Nmap's "fast scan" (`-F`) of the most frequently used 100 ports, with a host timeout of 5 seconds.

To use this device tracker in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: nmap_tracker
    hosts: 192.168.1.0/24
```

{% configuration %}
hosts:
  description: The network address to scan (in any supported Nmap format). Mixing subnets and IPs is possible.
  required: true
  type: string
home_interval:
  description: The number of minutes Nmap will not scan this device, assuming it is home, in order to preserve the device battery.
  required: false
  type: integer
exclude:
  description: Hosts not to include in Nmap scanning. Scanning the host where Home Assistant is running can cause problems (websocket error and authentication failures), so excluding that host is a good idea.
  required: false
  type: list
scan_options:
  description: Configurable scan options for Nmap.
  required: false
  default: -F --host-timeout 5s
  type: string
{% endconfiguration %}

## Examples

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

### Linux capabilities

On Linux systems (such as Hass.io) you can extend the functionality of Nmap, without having to run it as root, by using *Linux capabilities*. Be sure to specify the full path to wherever you installed Nmap:

```bash
sudo setcap cap_net_raw,cap_net_admin,cap_net_bind_service+eip /usr/bin/nmap
```

And you can set up the device tracker as

```yaml
- platform: nmap_tracker
  hosts: 192.168.1.1-25
  scan_options: " --privileged -sn "
```

See the [device tracker integration page](/integrations/device_tracker/) for instructions how to configure the people to be tracked.
