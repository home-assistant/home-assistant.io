---
title: ASUSWRT
description: Instructions on how to integrate ASUSWRT into Home Assistant.
ha_category:
  - Hub
  - Presence Detection
  - Sensor
ha_release: 0.83
ha_config_flow: true
ha_iot_class: Local Polling
ha_codeowners:
  - '@kennedyshead'
  - '@ollo69'
ha_domain: asuswrt
ha_platforms:
  - device_tracker
  - diagnostics
  - sensor
ha_integration_type: integration
---

The ASUSWRT integration can connect Home Assistant to a ASUS router that runs on ASUSWRT firmware.

There is currently support for the following device types within Home Assistant:

- **Presence Detection** - The ASUSWRT platform offers presence detection by looking at connected devices to a ASUSWRT based router.
- **Sensor** - The ASUSWRT sensors platform allows you to get information from your ASUS router within Home Assistant.

{% include integrations/config_flow.md %}

<div class='note warning'>

You need to enable telnet on your router if you choose to use `protocol: telnet`.

</div>

### Sensors Configuration

These sensors are automatically created and associated to the router device:

- Connected devices sensor
- Download sensor (unit_of_measurement: Gigabyte - *Daily accumulation*)
- Download Speed sensor (unit_of_measurement: Mbit/s)
- Upload sensor (unit_of_measurement: Gigabyte - *Daily accumulation*)
- Upload Speed sensor (unit_of_measurement: Mbit/s)
- Load average sensors (1min, 5min, 15min)
- Temperature sensors (2ghz, 5ghz, cpu). NB: only temperature sensors available on your router will be created

Only `Connected devices sensor` is created in status **enabled**, all other sensors are created in status **disabled**. To use them, simply **enable** on the devices page.

{% include integrations/option_flow.md %}
{% configuration_basic %}
Consider home:
  description: Number of seconds that must elapse before considering a disconnected device `not at home`.
Track unknown:
  description: Enable this option to track also devices that do not have a name. Name will be replaced by mac address.
Interface:
  description: The interface that you want statistics from (e.g. eth0,eth1 etc).
Dnsmasq:
  description: The location in the router of the `dnsmasq.leases` file.
Require IP:
  description: If devices must have IP (this option is available only for access point mode).
{% endconfiguration_basic %}

<div class='note'>

If you don't want to automatically track new detected device, disable the integration system option `Enable new added entities`

</div>

## Padavan custom firmware (The rt-n56u project)

The [rt-n56u project](https://bitbucket.org/padavan/rt-n56u) does not store `dnsmasq.leases` which is used to track devices at `/var/lib/misc/` as `asuswrt` do. However this integration can still be used for the rt-n56u project by changing the dnsmasq location using the `dnsmasq` variable to `dnsmasq: '/tmp'`
Also, to get the statistics for the `WAN` port, specify `interface: 'eth3'` as this is the interface used in the rt-n56u project
