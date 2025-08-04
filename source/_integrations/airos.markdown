---
title: Ubiquiti UISP airOS
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
  - sensor
ha_integration_type: device
ha_quality_scale: bronze
---

Ubiquiti's [UISP](https://techspecs.ui.com/uisp/wireless) (Ubiquity Internet Service Provider) product line offers a comprehensive suite of devices specifically designed for interconnecting various locations. Even their most cost-effective NanoStations achieve up to 450 Mbps real TCP/IP throughput and maintain reliable links up 10km range!

A common use-case is establishing wireless point-to-point (PtP) or multi-point-to-point (PtMP) links between buildings, remote sites or even neighbours. This is highly advantageous when traditional fiber-optic or Ethernet is either impractical or distance is too much for copper cabling. With line-of-sight (LOS) between airOS devices, a stable and high-bandwidth "beam" can be established, eliminating any need for additional infrastructure. While regular WiFi Access Points can be used, e.g. with meshing, for extending the network range, this also reduces capacity and performance of you WiFi network.

There is currently support for the following plaforms within Home Assistant:

- [Sensor](#sensor)

This integration allows users to pull network metrics and statuses directly into their Home Assistant dashboards, enabling advanced automation, notifications, and comprehensive network oversight within their smart home ecosystem.

{% note %}
Ubiquiti UISP products cannot be managed from their popular [UniFi](/integrations/unifi/) software. They are typically configured using a web browser, the UISP Mobile App, or the UISP Cloud/Self-Hosted platform.
{% endnote %}

## Prerequisites

This integration only supports devices running airOS 8 and already configured using your browser or the UISP app.

{% include integrations/config_flow.md %}

## Supported devices

### airOS 8

While there is no known limitation to which devices running airOS 8 are supported, success has been reported on:

- PowerBeam 5AC gen2
- Nanostation 5AC (LOCO5AC) 

## Sensor

This integration exposes the following sensor entities for your airOS devices:

### Network Role

Indicates the role of the device in your network, either 'bridge' or 'router'.

### Wireless Frequency

The base frequency set for this device.

### Wireless SSID

The SSID (wireless network name) used by this device.

### Download capacity & Upload capacity

Indicates the estimated maximum link capacity (bandwidth) for download and upload between devices.

### Throughput receive and throughput transmit.

These sensors show the actual data transfer rate (receive and transmit) for this device.

### Antenna gain

Performance in decibels of the devices antenna. See [Gain](https://en.wikipedia.org/wiki/Gain_(antenna)) on Wikipedia.

## Data updates

Data is polled from devices every 60 seconds.

## Examples

### Detect link degradation

As both stations need to maintain line-of-sight (LOS) between each other, the greater their distance, the more likely something will occasionally obstruct the path. A construction site crane might be in the way, or your local window cleaners might have slightly tapped your Access Point, causing its antenna to become misaligned. While the link might still be operational, it will definitely not be providing the capacity it had before. This automation example will notify you of an unexpected change in your link's capacity bandwidth.

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

The above currently caters for a 25% degradation of 450 Mbit/s. If you want to consider your actual capacity dynamically we suggest looking into the [Statistics](/integrations/statistics/) integration.

## Troubleshooting

### Accessing the local device

If you need to configure the device directly, you can find the link to your device by:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}, and select your integration and device.
2. On the device entry, select the link provided for the configuration URL (usually found next to the {% icon "mdi:dots-vertical" %} icon).
3. Follow the instructions on your device's web interface or consult the [airOS 8 Manual (PDF)](https://dl.ubnt.com/guides/airOS/airOS_UG_V80.pdf).

### Adjusting the update interval

Please note that the [default intervals](#data-updates) are considered best practice. Updating too frequently may induce considerable load on your bridge(s) resulting in unexpected results or missing data.

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
