---
title: UPnP/IGD
description: Internet Gateway Device (IGD) Protocol for Home Assistant.
ha_category:
  - Network
  - Sensor
ha_release: 0.18
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@StevenLooman'
ha_domain: upnp
ha_ssdp: true
ha_platforms:
  - sensor
---

The `upnp` integration enables you to collect network statistics from your router such as bytes in/out and packets in/out. This information is provided by the [UPnP](https://en.wikipedia.org/wiki/Universal_Plug_and_Play)/[Internet Gateway Device (IGD) Protocol](https://en.wikipedia.org/wiki/Internet_Gateway_Device_Protocol) if enabled on your router.

There is currently support for the following device types within Home Assistant:

- **Sensor** - Allows to get the network statistics from your router such as bytes in/out and packets in/out.

Please note that UPnP or NAT-PMP needs to be enabled on your router for this integration to work.

{% include integrations/config_flow.md %}

## Manual configuration 

Alternatively, you can use YAML by adding the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
upnp:
```

{% configuration %}
local_ip:
  description: The local IP address of the computer running Home Assistant.
  required: false
  type: string
  default: Try to auto-detect IP of host.
{% endconfiguration %}

## Troubleshooting

If Home Assistant is not able to discover the UPnP device, it may be because the local IP address of the computer running Home Assistant was not auto-detected correctly. To prevent this, you may add the `local_ip` option to your UPnP configuration:

```yaml
# Example configuration.yaml with local_ip set
upnp:
  local_ip: 192.168.1.2
```
