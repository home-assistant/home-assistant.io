---
title: WiLight
description: Instructions on how to integrate WiLight devices into Home Assistant.
ha_category:
  - Light
ha_release: 0.111
ha_config_flow: true
ha_codeowners:
  - '@leofig-rj'
ha_domain: wilight
---

The `wilight` integration is the main integration to integrate [WiLight](http://www.wilight.com.br) devices with Home Assistant.

There is currently support for the following device types within Home Assistant:

- Light (WiLight model I-100 and I-102)

## Configuration

{% configuration %}
  discovery:
    description: Setting this value to false will prevent the automatic discovery of WiLight devices by the WiLight platform and the discovery platform (static devices will still be discovered)
    required: false
    type: boolean
    default: true
  static:
    description: One or more static IP addresses for WiLight to use
    required: false
    type: list
{% endconfiguration %}

Supported devices will be automatically discovered if the optional `discovery` configuration item is omitted or set to true or if the `discovery` integration is enabled. If the `discovery` configuration item is set to false, then automatic discovery of WeMo devices is disabled both for the `wilight` integration and for the `discovery` component. Loading the `wilight` integration with the `discovery` configuration item omitted or set to true will scan the local network for WeMo devices, even if you are not using the `discovery` component.

```yaml
# Example configuration.yaml entry with automatic discovery enabled (by omitting the discovery configuration item)
wilight:

# Example configuration.yaml entry with automatic discovery enabled (by explicitly setting the discovery configuration item)
wilight:
  discovery: true
```

Alternately, WiLight devices that are not discoverable can be statically configured. If you have WiLight devices on subnets other than where Home Assistant is running, or devices in a remote location reachable over a VPN, you will need to configure them manually. Statically configured devices may be used with or without automatic discovery enabled. Example static configuration:

```yaml
# Example configuration.yaml entry with automatic discovery disabled, and 2 statically configured devices
wilight:
  discovery: false
  static:
    - 192.168.1.23
    - 192.168.52.172
```

Note that if you use static device entries, you may want to set up your router (or whatever runs your DHCP server) to force your WiLight devices to use a static IP address. Check the DHCP section of your router configuration for this ability.
