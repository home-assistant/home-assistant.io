---
layout: page
title: "Huawei LTE Router Sensor"
description: "Instructions on how to integrate Huawei LTE router sensors into Home Assistant."
date: 2018-09-08 20:00
sidebar: true
comments: false
sharing: true
footer: true
logo: huawei.svg
ha_category: Network
ha_iot_class: "Local Polling"
ha_release: 0.79
---

The `huawei_lte` sensor platform allows you to monitor Huawei LTE routers.

## {% linkable_title Configuration %}

This platform requires you to have set up the [Huawei LTE component](/components/huawei_lte/).

The names for the item you want to monitor are dot separated paths to information returned by the router. The data set varies by router model. To see what your router provides, set logging level to debug and watch `homeassistant.components.huawei_lte` debug entries. The configuration variable description contains a few example paths just to illustrate the syntax. These may not be available on all routers or their semantics may differ, and there are quite likely many more that are not listed here.

## {% linkable_title Configuration %}

To enable the sensor, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: huawei_lte
    monitored_conditions:
      - device_information.SoftwareVersion
      - device_signal.rssi
      - traffic_statistics.CurrentDownloadRate
      - traffic_statistics.TotalConnectTime
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
    traffic_statistics.CurrentDownloadRate:
      description: Current download rate, bytes/sec.
    traffic_statistics.CurrentUploadRate:
      description: Current upload rate, bytes/sec.
    traffic_statistics.TotalUpload:
      description: Total bytes uploaded since last reset.
    traffic_statistics.TotalDownload:
      description: Total bytes downloaded since last reset.
    traffic_statistics.TotalConnectTime:
      description: Total time connected since last reset.
{% endconfiguration %}
