---
title: "Huawei LTE Routers"
description: "Instructions on how to integrate Huawei LTE routers with Home Assistant."
logo: huawei.svg
ha_category:
  - Network
  - Presence Detection
  - Notifications
  - Sensor
ha_release: 0.79
ha_iot_class: Local Polling
---

The Huawei LTE router integration for Home Assistant allows you to observe and control [Huawei LTE routers](https://consumer.huawei.com/en/smart-home/).

There is currently support for the following device types within Home Assistant:

- [Presence Detection](#presence-detection) - a device tracker for connected devices
- [Notifications](#notifications)
- [Sensor](#sensor) - with device, signal, and traffic information

All platform requires you to have set up the [Huawei LTE component](#configuration).

## Configuration

To enable the component, add the following lines to your
`configuration.yaml` file:

```yaml
# Example configuration.yaml entry
huawei_lte:
  - url: http://192.168.100.1/
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
```

{% configuration %}
url:
  description: URL of the router web interface.
  required: true
  type: string
username:
  description: The username used for the router web interface.
  required: true
  type: string
password:
  description: The password used for the router web interface.
  required: true
  type: string
{% endconfiguration %}

### Tested routers

Routers we know to be working with this integration based on the documentation of used libraries and reports by users:

- Huawei B310s-22
- Huawei B525s-23a
- Huawei E5186s-22a
- Huawei B618

This is not a complete list. The integration can probably connect to other Huawei LTE routers running similar firmware.

## Presence Detection

This platform offers presence detection by looking at connected devices to a [Huawei LTE router](https://consumer.huawei.com/en/smart-home/).

To enable the sensor, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: huawei_lte
```

See the [device tracker integration page](/integrations/device_tracker/) for instructions how to configure the people to be tracked.

## Notifications

The `huawei_lte` platform allows you to use a Huawei LTE router for notifications from Home Assistant. The messages will be sent as SMS text messages.

```yaml
# Example configuration.yaml entry
notify:
  - platform: huawei_lte
    recipient: "+15105550123"
```

{% configuration %}
recipient:
  description: The phone number of a default recipient or a list with multiple recipients.
  required: true
  type: [string, list]
name:
  description: Setting the optional parameter `name` allows multiple notifiers to be created. The notifier will bind to the service `notify.NOTIFIER_NAME`.
  required: false
  default: notify
  type: string
url:
  description: The router to use. Not needed if you only have one.
  required: false
  type: string
{% endconfiguration %}

To use notifications, please see the [getting started with automation page](/getting-started/automation/).

## Sensor

The `huawei_lte` sensor platform allows you to monitor Huawei LTE routers.

The names for the item you want to monitor are dot separated paths to information returned by the router. The data set varies by router model. To see what your router provides, set logging level to debug and watch `homeassistant.components.huawei_lte` debug entries. The configuration variable description contains a few example paths just to illustrate the syntax. These may not be available on all routers or their semantics may differ, and there are quite likely many more that are not listed here.

To enable the sensor, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: huawei_lte
    monitored_conditions:
      - device_information.SoftwareVersion
      - device_signal.rssi
      - monitoring_traffic_statistics.CurrentDownloadRate
      - monitoring_traffic_statistics.TotalConnectTime
```

{% configuration %}
monitored_conditions:
  description: Defines the data to monitor as sensors. Defaults to a few generally available data items expected to be available on most boxes.
  required: false
  default: Below is indicated which conditions are the default.
  type: list
  keys:
    device_information.SoftwareVersion:
      description: Software version.
    device_information.WanIPAddress:
      description: WAN interface IPv4 address.
      default: default
    device_information.WanIPv6Address:
      description: WAN interface IPv6 address.
    device_signal.rsrq:
      description: The signal RSRQ value.
      default: default
    device_signal.rsrp:
      description: The signal RSRP value.
      default: default
    device_signal.rssi:
      description: The signal RSSI value.
      default: default
    device_signal.sinr:
      description: The signal SINR value.
      default: default
    monitoring_traffic_statistics.CurrentDownloadRate:
      description: Current download rate, bytes/sec.
    monitoring_traffic_statistics.CurrentUploadRate:
      description: Current upload rate, bytes/sec.
    monitoring_traffic_statistics.TotalUpload:
      description: Total bytes uploaded since last reset.
    monitoring_traffic_statistics.TotalDownload:
      description: Total bytes downloaded since last reset.
    monitoring_traffic_statistics.TotalConnectTime:
      description: Total time connected since last reset.
{% endconfiguration %}
