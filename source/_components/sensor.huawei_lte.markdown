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

This requires you to have set up the [Huawei LTE component](/components/huawei_lte/).

## {% linkable_title Configuration %}

To enable the sensor, add the following lines to your
`configuration.yaml` file:

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
  description: Defines the data to monitor as sensors. The names here are dot-separated paths to information returned by the router. The dataset varies by router model; to see what your router provides, [set logging level](/components/logger/) of the `homeassistant.components.huawei_lte` component to debug and watch its log entries. The following list of values contains a few example paths just to illustrate the syntax; these may not be available on all routers, or their semantics may differ, and there are quite likely many more that are not listed here.
  type: list
  required: false
  default:
    - device_information.WanIPAddress
    - device_signal.rsrq
    - device_signal.rsrp
    - device_signal.rssi
    - device_signal.sinr
  keys:
    device_information.SoftwareVersion:
      description: Software version
    device_information.WanIPAddress:
      description: WAN interface IP address
    device_information.WanIPv6Address:
      description: WAN interface IP address
    device_signal.rsrq:
      description: The signal RSRQ value
    device_signal.rsrp:
      description: The signal RSRP value
    device_signal.rssi:
      description: The signal RSSI value
    device_signal.sinr:
      description: The signal SINR value
    traffic_statistics.CurrentDownloadRate:
      description: Current download rate, bytes/sec
    traffic_statistics.CurrentUploadRate:
      description: Current upload rate, bytes/sec
    traffic_statistics.TotalUpload:
      description: Total bytes uploaded since last reset
    traffic_statistics.TotalDownload:
      description: Total bytes downloaded since last reset
    traffic_statistics.TotalConnectTime:
      description: Total time connected since last reset
{% endconfiguration %}
