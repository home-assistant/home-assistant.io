---
title: UPnP/IGD
description: Internet Gateway Device (IGD) Protocol for Home Assistant.
ha_category:
  - Binary sensor
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
  - binary_sensor
  - sensor
ha_integration_type: device
---

The **UPnP/IGD** {% term integration %} enables you to collect network statistics from your router such as bytes in/out and packets in/out, uptime, WAN IP address, and WAN connectivity status. This information is provided by the [UPnP](https://en.wikipedia.org/wiki/Universal_Plug_and_Play)/[Internet Gateway Device (IGD) Protocol](https://en.wikipedia.org/wiki/Internet_Gateway_Device_Protocol) if enabled on your router.

There is currently support for the following device types within Home Assistant:

- **Binary Sensor** - If router is connected to the WAN.
- **Sensor** - Allows to get the network statistics from your router such as bytes in/out and packets in/out, uptime, status, and IP. Sensor for uptime will only be there if supported by the router.

Please note that UPnP or NAT-PMP needs to be enabled on your router for this {% term integration %} to work.

{% include integrations/config_flow.md %}

## Enforcing polling of data

Some UPnP/IGD devices have a broken UPnP implementation and will provide invalid data or no data at all. A configuration option is provided to fall back to polling of all data for the sensors. Please try this when you feel not all sensors which should be working are working.

## Debugging integration

If you have problems with this {% term integration %} you can add debug prints to the log.

```yaml
logger:
  default: info
  logs:
    homeassistant.components.upnp: debug
    async_upnp_client: debug
    async_upnp_client.traffic: error
```

When creating an issue, please include the (relevant) logging with the issue. Any sensitive information such as IPs can be obfuscated.
