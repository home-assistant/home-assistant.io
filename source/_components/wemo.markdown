---
layout: page
title: "Belkin WeMo"
description: "Instructions on how to integrate Belkin WeMo devices into Home Assistant."
date: 2018-11-01 01:53
sidebar: true
comments: false
sharing: true
footer: true
logo: belkin_wemo.png
ha_category: Hub
featured: true
ha_release: pre 0.7
---

The `wemo` component is the main component to integrate various [Belkin WeMo](http://www.belkin.com/us/Products/home-automation/c/wemo-home-automation/) devices with Home Assistant.

## {% linkable_title Configuration %}

{% configuration %}
  discovery:
    description: Setting this value to false will prevent the automatic discovery of WeMo devices by the wemo platform and the discovery platform (static devices will still be discovered)
    required: false
    type: boolean
    default: true
  static:
    description: One or more static IP adresses for WeMo to use
    required: false
    type: list
{% endconfiguration %}

Supported devices will be automatically discovered if the optional `discovery` configuration item is omitted or set to true or if the `discovery` component is enabled. If the `discovery` configuration item is set to false, then automatic discovery of WeMo devices is disabled both for the `wemo` component and for the `discovery` component. Loading the `wemo` component with the `discovery` configuration item omitted or set to true will scan the local network for WeMo devices, even if you are not using the `discovery` component.

```yaml
# Example configuration.yaml entry with automatic discovery enabled (by omitting the discovery configuration item)
wemo:

# Example configuration.yaml entry with automatic discovery enabled (by explicitly setting the discovery configuration item)
wemo:
  discovery: true
```

Alternately, WeMo devices that are not discoverable can be statically configured. If you have WeMo devices on subnets other than where Home Assistant is running, or devices in a remote location reachable over a VPN, you will need to configure them manually. Statically configured devices may be used with or without automatic discovery enabled. Example static configuration:

```yaml
# Example configuration.yaml entry with automatic discovery disabled, and 2 statically configured devices
wemo:
  discovery: false
  static:
    - 192.168.1.23
    - 192.168.52.172
```

Note that if you use static device entries, you may want to set up your router (or whatever runs your DHCP server) to force your WeMo devices to use a static IP address. Check the DHCP section of your router configuration for this ability.

If the device doesn't seem to work and all you see is the state "unavailable" on your dashboard, check that your firewall doesn't block incoming requests on port 8989, since this is the port to which the WeMo devices send their updates.

## {% linkable_title Emulated devices %}

Various software that emulate WeMo devices often use alternative ports. Static configuration should include the port value:

```yaml
# Example configuration.yaml entry with static device entries that include non-standard port numbers
wemo:
  static:
    - 192.168.1.23:52001
    - 192.168.52.172:52002
```
