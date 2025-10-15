---
title: Ubiquiti airOS
description: Ubiquiti UISP airOS integration.
ha_category:
  - Sensor
ha_iot_class: Local Polling
ha_release: 2025.8
ha_codeowners:
  - '@CoMPaTech'
ha_config_flow: true
ha_domain: airos
ha_platforms:
  - binary_sensor
  - diagnostics
  - sensor
ha_integration_type: integration
ha_quality_scale: bronze
---

Ubiquiti <abbr title="Ubiquity Internet Service Provider">UISP</abbr>-range of [wireless](https://techspecs.ui.com/uisp/wireless) products offer a comprehensive suite of devices specifically designed for interconnecting various locations. As long as these airOS devices can 'see' each other without any (or limited) obstructions like buildings or trees, a stable and high-bandwidth "beam" can be established. Even their most cost-effective devices can achieve up to 450 Mbps real TCP/IP throughput and maintain reliable links up 10km range!

A common use-case is establishing wireless <abbr title="Point-to-Point">PtP</abbr> or <abbr title="Point-to-Multi-Point">PtMP</abbr> links between buildings, remote sites, neighbours or even your shed. This is highly advantageous when traditional fiber-optic or copper network cabling is either impractical or the distance is too far for copper cabling. With <abbr title="Line-of-sight">LoS</abbr> between airOS devices, a stable and high-bandwidth "beam" can be established, eliminating any need for additional infrastructure. This can be an improvement over extending your WiFi coverage using meshing of Access Points, as meshing potentially reduces the capacity and performance of your WiFi network.

There is currently support for the following platforms within Home Assistant:

- [Binary sensor](#binary-sensor)
- [Sensor](#sensor)

This integration allows users to pull network metrics and statuses directly into their Home Assistant dashboards, enabling advanced automation, notifications, and comprehensive network oversight within their smart home ecosystem.

{% note %}
Ubiquiti UISP products cannot be managed from their popular [UniFi](/integrations/unifi/) software. They are typically configured using a web browser, the UISP Mobile App, or the UISP platform (either Cloud or [Self-Hosted](https://help.uisp.com/hc/en-us/articles/22591008678039-UISP-First-Time-Setup-Installation).
{% endnote %}

## Prerequisites

This integration only supports devices running airOS 8 and already configured using your browser or the UISP app.

{% include integrations/config_flow.md %}

## Supported devices

### airOS firmware 8

While there is no known limitation to which devices running airOS firmware version 8 are supported, success has been reported on:

- NanoBeam 5AC (NBE-5AC-Gen2)
- NanoStation 5AC Loco (Loco5AC)
- PowerBeam 5AC: 620 (PBE-5AC-620) and Gen2 (PBE-5AC-Gen2)

Do you have a device that works? We’d love to hear [your experience](#feedback_section) so we can add it to this list!

## Operating roles

Depending on the device's placement, it will be configured as either an 'Access Point' (AP) acting as the central device or a 'Station' connecting as a client. An AP can have multiple stations connected to it, whereas a station typically connects to only a single AP.

For stations in particular, they can operate in either a 'Bridge' or 'Router' role:

- In 'Bridge' mode, the default and most common configuration

  - The airOS device simply bridges the wireless and wired connections. In simplistic terms, it functions as a transparent network cable, making it invisible to the devices on both the station and <abbr title="Access Point">AP</abbr> sides.
  - This mode is ideal for extending a network's reach without introducing new subnets or managing additional routing.

- In 'Router' mode, the airOS device

  - Acts as a small router, performing <abbr title="Network Address Translation">NAT</abbr> as well as providing <abbr title="Dynamic Host Configuration Protocol">DHCP</abbr> services for devices connected to its <abbr title="Local Area Network">LAN</abbr> port.
  - Can also be configured as a <abbr title="Point-to-Point Protocol over Ethernet">PPPoE</abbr> client, authenticating with a central <abbr title="Point-to-Point Protocol over Ethernet">PPPoE</abbr> server to receive its IP address, gateway, and other network settings.

The choice between Bridge and Router mode depends on the network architecture and whether the device is intended to extend an existing network (Bridge) or create a new subnet (Router).

## Sensor

### Network Role

Indicates the role of the device in your network, either 'bridge' or 'router' (see [operating roles](#operating-roles) for more information.

### Wireless Frequency

The base frequency set for this device.

### Wireless SSID

The <abbr title="Service Set Identifier">SSID</abbr> (i.e. the wireless network name) used by this device.

### Download capacity & Upload capacity

Indicates the estimated maximum link capacity (bandwidth) for download and upload between devices.

### Throughput receive and throughput transmit.

These sensors show the actual data transfer rate (receive and transmit) for this device.

### Antenna gain

Performance in <abbr title="decibels">dB</abbr> for the device antenna. See [Gain](https://en.wikipedia.org/wiki/Gain_(antenna)) on Wikipedia.

## Data updates

Data is polled from devices every 60 seconds.

## Examples

### Detect link degradation

As both stations need to maintain <abbr title="Line-of-Sight">LoS</abbr> between each other, the greater their distance, the more likely something will occasionally obstruct the path. A construction site crane might be in the way, or your local window cleaners might have slightly tapped your Access Point, causing its antenna to become misaligned. While the link might still be operational, it will definitely not be providing the capacity it had before. This automation example will notify you of an unexpected change in your link's capacity bandwidth.

This automation triggers when either the download or upload capacity reported by your NanoStation drops significantly below its expected performance level.

```yaml
automation:
  alias: 'UISP NanoStation Link Capacity Warning'
  triggers:
  - trigger: numeric_state
    entity_id:
      - sensor.nanostation_5ac_access_point_download_capacity
      - sensor.nanostation_5ac_access_point_upload_capacity
    for:
      hours: 0
      minutes: 5
      seconds: 0
    above: 360000
  conditions: []
  actions:
    - action: notify.send_message
      metadata: {}
      data:
        message: "Point-to-Point capacity loss, please check your wireless links"
      target:
        entity_id: notify.notifier
```

The above currently caters for a 25% degradation of 450 Mbit/s. If you want to consider your actual capacity in a dynamic approach, we suggest looking into the [Statistics](/integrations/statistics/) integration.

## Troubleshooting

### Accessing the local device

If you need to configure the device directly, you can find the link to your device by:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}, and select your integration and device.
2. On the device entry, select the link provided for the configuration URL (usually found next to the {% icon "mdi:dots-vertical" %} icon).
3. Follow the instructions on your device's web interface or consult the [airOS 8 Manual (PDF)](https://dl.ubnt.com/guides/airOS/airOS_UG_V80.pdf).

### Adjusting the update interval

Please note that the [default interval](#data-updates) is considered best practice. Updating too frequently may induce considerable load on your bridge(s) resulting in unexpected results or missing data.

{% include common-tasks/define_custom_polling.md %}

### Diagnostic data

If you need to create an issue to report a bug or want to inspect diagnostic data, use the below method to retrieve diagnostics:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}, and select your integration and device.
2. On the integration entry, select the {% icon "mdi:dots-vertical" %}.
   - Then, select **Download diagnostics** and a JSON file will be downloaded.
3. You can inspect the downloaded file or, when requested, upload it to your issue report.

## Removing the integration

This integration follows standard integration removal. No extra steps are required within Home Assistant or on your devices running airOS.

{% include integrations/remove_device_service.md %}
