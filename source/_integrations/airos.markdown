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
  - sensor
ha_integration_type: integration
ha_quality_scale: bronze
---

Ubiquiti's [UISP](https://techspecs.ui.com/uisp/wireless) (Ubiquity Internet Service Provider) product line includes various devices designed for interconnecting locations. This integration provides monitoring capabilities for devices running the airOS opearting system.

There is currently support for the following device types within Home Assistant:

- [Sensor](#sensor)

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

### Wireless Mode

ndicates the device's role in the wireless link, typically 'ap-ptp' (Access Point Point-to-Point) or 'sta-ptp' (Station Point-to-Point).

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

## Troubleshooting

### Accessing the local device

If you need to configure the device directly, you can find the link to your device by:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}, and select your integration and device.
2. On the device entry, select the link provided for the configuration URL (usually found next to the {% icon "mdi:dots-vertical" %} icon).
3. Follow the instructions on your device's web interface or consult the [airOS 8 Manual (PDF)](https://dl.ubnt.com/guides/airOS/airOS_UG_V80.pdf).

### Adjusting the update interval

Please note that the [default intervals](#data-updates) are considered best practice. Updating too frequently may induce considerable load on your bridge(s) resulting in unexpected results or missing data.

{% include common-tasks/define_custom_polling.md %}
