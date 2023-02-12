---
title: UPnP/IGD
description: Internet Gateway Device (IGD) Protocol for Home Assistant.
ha_category:
  - Binary Sensor
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

The `upnp` integration enables you to collect network statistics from your router such as bytes in/out and packets in/out, uptime, WAN IP address, and WAN connectivity status. This information is provided by the [UPnP](https://en.wikipedia.org/wiki/Universal_Plug_and_Play)/[Internet Gateway Device (IGD) Protocol](https://en.wikipedia.org/wiki/Internet_Gateway_Device_Protocol) if enabled on your router.

There is currently support for the following device types within Home Assistant:

- **Binary Sensor** - If router is connected to the WAN.
- **Sensor** - Allows to get the network statistics from your router such as bytes in/out and packets in/out, uptime, status, and IP. Sensor for uptime will only be there if supported by the router.

Please note that UPnP or NAT-PMP needs to be enabled on your router for this integration to work.

{% include integrations/config_flow.md %}

## Debugging integration

If you have problems with this integration you can add debug prints to the log.

```yaml
logger:
  default: info
  logs:
    homeassistant.components.upnp: debug
    async_upnp_client: debug
    async_upnp_client.traffic: error
```

When creating an issue, please include the (relevant) logging with the issue. Any sensitive information such as IPs can be obfuscated.

## Warnings statistics sensors

Some devices do not follow the UPnP/IGD standard or are simply broken and provide invalid values when the router's traffic counters are read. According to the standard, the traffic counters should provide an increasing value between 0 bytes and 4.294.967.294 bytes. After the maximum value is reached, the counter should roll over to 0 and restart counting.

There are several devices which do not adhere to this standard causing the traffic counters to be unusable. As a result, the traffic sensors might not be working properly, or Home Assistant might even given a warning such `Entity sensor.fritz_box_upload_summe from integration upnp has state class total_increasing, but its state is not strictly increasing. Triggered by state .... Please create a bug report at ...`. This is something the integration can nothing do about.

Devices/brands with **known** defects (incomplete list!):
* Fritz!
* Compal Broadband Networks, Inc CH7465LG

When this message is seen, the sensors regarding traffic should be disabled.
