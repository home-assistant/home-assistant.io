---
title: Nmap Tracker
description: Instructions on how to integrate Nmap into Home Assistant.
ha_category:
  - Presence detection
ha_release: 0.7
ha_iot_class: Local Polling
ha_domain: nmap_tracker
ha_platforms:
  - device_tracker
ha_config_flow: true
ha_integration_type: integration
---

As an alternative to the router-based device tracking, it is possible to directly scan the network for devices by using Nmap. The IP addresses to scan can be specified in any format that Nmap understands, including the network-prefix notation (`192.168.1.1/24`) and the range notation (`192.168.1.1-255`).

{% note %}
  Please keep in mind that modern smart phones will usually turn off WiFi when they are idle. Simple trackers like this may not be reliable on their own.
{% endnote %}

{% note %}
If you are running Home Assistant Core in a Python virtual environment, you might have to install the packages for `arp` and `nmap`.
On Debian based hosts (for example Raspbian) do so by running `sudo apt-get install net-tools nmap`.
On a Fedora host run `sudo dnf -y install nmap`.
{% endnote %}

{% include integrations/config_flow.md %}

An example of how the Nmap scanner can be customized:
![nmap customization example](/images/integrations/nmap/nmap_customization_example.png)

{% configuration_basic %}
Network addresses to scan:
  description: Network range to scan using [CIDR notation](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing). In the example above it will scan addresses from `192.168.1.1` to `192.168.1.254`.
Minimum number of minutes between scans of active devices:
  description: Frequency of the scans. The lower the number, the quicker it will detect devices connected and disconnected usually at the cost of the devices battery life. The example above will scan every minute.
Network addresses to exclude from scanning:
  description: A comma-separated list of IP addresses not to scan. The above example will skip `192.168.1.8`.
Raw configurable scan options for Nmap:
  description: Nmap command line parameters which can be used to configure how Nmap scans the network. For more details see [Nmap reference guide](https://nmap.org/book/man.html).
{% endconfiguration_basic %}

See the [device tracker integration page](/integrations/device_tracker/) for instructions how to configure the people to be tracked.
