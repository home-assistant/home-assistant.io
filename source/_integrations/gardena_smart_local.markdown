---
title: GARDENA smart local
description: Instructions on how to integrate GARDENA smart Gateway devices within Home Assistant using local communication.
ha_category:
  - Valve
ha_release: '2026.10'
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@cloudless-garden'
ha_domain: gardena_smart_local
ha_platforms:
  - valve
ha_integration_type: hub
ha_quality_scale: bronze
---

The **GARDENA smart local** {% term integration %} connects to a [GARDENA](https://www.gardena.com) smart Gateway over your local network, without going through the GARDENA cloud. GARDENA is a brand of Husqvarna Group that makes garden watering, irrigation, and lawn care products, including smart devices such as water controls, irrigation valves, sensors, pumps, and robotic lawn mowers (SILENO).

Communication happens entirely over your local network via a WebSocket connection to the gateway, so the integration keeps working even if the GARDENA cloud is unreachable, and device state changes are pushed to Home Assistant in real time.

## Prerequisites

- A GARDENA smart Gateway on the same local network as Home Assistant.
- The gateway's WebSocket service enabled. It's disabled by default and needs to be turned on once through the gateway's web interface:
  1. Open `https://<gateway-hostname>.local` in a browser (the hostname is printed on the gateway, or can be found under **Garden Profile** in the GARDENA smart system app), and accept the certificate warning.
  2. Log in with the password: the first block of the gateway ID printed on the back of the device, for example ID `1234abcd-996c-48f7-83dc-d2d1bac08e7e` → password `1234abcd`.
  3. Open the advanced options (the small gray arrow at the bottom of the page) and enable the WebSocket service.

## Installation

{% include integrations/config_flow.md %}

The gateway is discovered automatically on the local network via Zeroconf; look for a discovery notification in Home Assistant. If it isn't discovered, add it manually with its IP address or hostname and the password described above.

## Supported devices

This integration currently exposes valve entities. Other device types the gateway supports (sensors, pumps, lawn mowers, and more) will be added in future updates.

| Device | Article no. |
| ------ | ------------ |
| GARDENA smart Water Control | 19031-20 |
| GARDENA smart Water Control | 19033-20 |
| GARDENA smart Dual Water Control | 19034-20 |
| GARDENA smart Pipeline Water Control | 19050-20 |
| GARDENA smart Irrigation Control | 19032-20 |
| GARDENA smart Irrigation Control | 19035-20 |

### Adding devices to an existing gateway

New devices are paired locally with the gateway, independently of the GARDENA app:

1. Put the device into inclusion mode (refer to the device's manual if unsure how).
2. On the gateway's integration entry, add a device: go to **Settings** > **Devices & services**, select the **GARDENA smart local** entry, and choose **Include a device**.
3. Select the discovered device from the list.

{% important %}
Devices included through Home Assistant are paired locally with the gateway and don't show up in the GARDENA smart system app. If you want to keep using the app for a device, include it through the app instead.
{% endimportant %}

### Not supported

The **GARDENA smart SILENO sense** (19941-20, 19942-20) can't be supported, as it doesn't use the GARDENA smart Gateway. Use the [Husqvarna Automower BLE](/integrations/husqvarna_automower_ble/) integration instead.

## Actions

Valve entities support the standard [valve](/integrations/valve/#actions) actions. Opening a valve with `valve.open_valve` keeps it open for 30 minutes, then the valve closes automatically.

The integration also provides the following action.

### Action `gardena_smart_local.open_valve`

Opens a valve for a set time. The valve closes automatically after that time.

| Data attribute | Optional | Description                                                                            |
| -------------- | -------- | -------------------------------------------------------------------------------------- |
| `entity_id`    | no       | The valve entity to open.                                                              |
| `duration`     | yes      | How long to keep the valve open, in seconds, from 60 to 10800. Defaults to 30 minutes. |

```yaml
action: gardena_smart_local.open_valve
target:
  entity_id: valve.garden_water_control
data:
  duration: 900
```

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
