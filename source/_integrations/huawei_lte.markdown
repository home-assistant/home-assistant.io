---
title: Huawei LTE
description: Instructions on how to integrate Huawei LTE router and modem devices with Home Assistant.
ha_category:
  - Binary Sensor
  - Network
  - Notifications
  - Presence Detection
  - Sensor
  - Switch
ha_release: 0.79
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@scop'
  - '@fphammerle'
ha_domain: huawei_lte
ha_ssdp: true
ha_platforms:
  - binary_sensor
  - device_tracker
  - notify
  - sensor
  - switch
ha_integration_type: integration
---

The Huawei LTE router and modem integration for Home Assistant allows you to observe and control [Huawei LTE devices](https://consumer.huawei.com/en/smart-home/).

There is currently support for the following platforms within Home Assistant:

- Presence detection - device tracker for connected devices
- Notifications - via SMS
- Sensors - device, network, signal, SMS count, traffic, and battery information
- Switch - mobile data on/off, Wi-Fi guest network on/off
- Binary sensor - mobile and Wi-Fi connection status, SMS storage full/not

## Setup

The integration can be enabled using the frontend, see below for details.
Additionally, if the [SSDP integration](/integrations/ssdp) is
enabled in Home Assistant, automatically discovered Huawei LTE devices
which support and have UPnP enabled are made available for further
optional configuration in the frontend.

The integration requires authentication using router credentials at
initial configure time, but after that, it can be run with or without
authentication. Authenticated mode enables all available integration
features and entities, but may interfere with accessing the device web
interface from another source such as a browser while the integration
is active or vice versa. The exact list of features requiring
authentication to work varies by device and firmware version. The
integration will try to use all configured ones and fail gracefully if
it detects one requiring authentication in unauthenticated mode.

Only a subset of the entities provided by the target device are
enabled by default:

- WAN IP address sensor
- LTE signal sensors RSRQ, RSRP, RSSI, and SINR
- mobile data and Wi-Fi guest network switches
- mobile connection binary sensor
- device tracker entries

The rest are added to the entity registry, but disabled by default.

Support for different categories of information and thus available
entities varies by device model and firmware version.

{% include integrations/config_flow.md %}

Unauthenticated mode and default list of notification recipient phone
numbers can be set using the integration's configuration options.

## Services

The following router action services are available. When invoked by a user, administrator access is required.

### Service `huawei_lte.clear_traffic_statistics`

Clear traffic statistics.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `url`                  | yes, if only one router configured | Router URL. |

### Service `huawei_lte.reboot`

Reboot router.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `url`                  | yes, if only one router configured | Router URL. |

### Service `huawei_lte.suspend_integration`

Suspend integration. Suspending logs the integration out from the router, and stops accessing it.
Useful e.g.,  if accessing the router web interface from another source such as a web browser is temporarily required.
Invoke the `huawei_lte.resume_integration` service to resume.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `url`                  | yes, if only one router configured | Router URL. |

### Service `huawei_lte.resume_integration`

Resume suspended integration.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `url`                  | yes, if only one router configured | Router URL. |

## Tested devices

Devices we know to be working with this integration based on the [documentation of used libraries](https://github.com/Salamek/huawei-lte-api/#huawei-lte-api) and reports by users:

- Huawei B310s-22
- Huawei B525s-23a
- Huawei E5186s-22a
- Huawei B618
- Huawei B529s-23a
- Huawei B535s

This is not a complete list. The integration can probably connect to other Huawei LTE devices running similar firmware.
