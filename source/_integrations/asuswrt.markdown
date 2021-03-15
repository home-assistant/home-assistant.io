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
ha_domain: asuswrt
ha_platforms:
  - device_tracker
  - sensor
---

The ASUSWRT integration can connect Home Assistant to a ASUS router that runs on ASUSWRT firmware.

There is currently support for the following device types within Home Assistant:

- **Presence Detection** - The ASUSWRT platform offers presence detection by looking at connected devices to a ASUSWRT based router.
- **Sensor** - The ASUSWRT sensor platform allows you to get upload and download data from your ASUSWRT within Home Assistant.

## Configuration

To add your ASUSWRT devices into your Home Assistant installation, go to:

**Configuration** -> **Integrations** in the UI, click the button with `+` sign and from the list of integrations select **ASUSWRT**.

<div class='note warning'>

You need to enable telnet on your router if you choose to use `protocol: telnet`.

</div>

### Sensor Configuration

These sensors are automatically created in status **disabled** and associated to the router device:

- Connected devices sensor
- Download sensor (unit_of_measurement: Gigabyte - *Daily accumulation*)
- Download Speed sensor (unit_of_measurement: Mbit/s)
- Upload sensor (unit_of_measurement: Gigabyte - *Daily accumulation*)
- Upload Speed sensor (unit_of_measurement: Mbit/s)

To use ASUSWRT sensors, simply **enable** them in the devices page.

## Integration Options

It is possible to change some behaviors through the integration options. These can be changed at **ASUSWRT** -> **Options** on the Integrations page.

- **Consider home**: Number of seconds that must elapse before considering a disconnected device "not at home"
- **Track unknown**: Enable this option to track also devices that do not have a name. Name will be replaced by mac address.
- **Interface**: The interface that you want statistics from (e.g. eth0,eth1 etc)
- **Dnsmasq**: The location in the router of the dnsmasq.leases files
- **Require IP**: If devices must have IP (this option is available only for access point mode)

**Note**: if you don't want to automatically track new detected device, disable the integration system option `Enable new added entities`

## Padavan custom firmware (The rt-n56u project)

The [rt-n56u project](https://bitbucket.org/padavan/rt-n56u) does not store `dnsmasq.leases` which is used to track devices at `/var/lib/misc/` as `asuswrt` do. However this integration can still be used for the rt-n56u project by changing the dnsmasq location using the `dnsmasq` variable to `dnsmasq: '/tmp'`
Also, to get the statistics for the `WAN` port, specify `interface: 'eth3'` as this is the interface used in the rt-n56u project
