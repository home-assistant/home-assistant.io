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

Configuration variables:

**monitored_conditions** array (*Optional*): Defines the data to monitor as sensors. Defaults to a few generally available data items expected to be available on most boxes. The names here are dot separated paths to information returned by the router. The data set varies by router model; to see what your router provides, set logging level to debug and watch homeassistant.components.huawei_lte debug entries. The following list contains a few example paths just to illustrate the syntax; these may not be available on all routers or their semantics may differ, and there are quite likely many more that are not listed here.

  - **device_information.SoftwareVersion**: Software version.
  - **device_information.WanIPAddress**: WAN interface IP address.
  - **device_information.WanIPv6Address**: WAN interface IP address.
  - **device_signal.rsrq**: The signal RSRQ value.
  - **device_signal.rsrp**: The signal RSRP value.
  - **device_signal.rssi**: The signal RSSI value.
  - **device_signal.sinr**: The signal SINR value.
  - **traffic_statistics.CurrentDownloadRate**: Current download rate, bytes/sec.
  - **traffic_statistics.CurrentUploadRate**: Current upload rate, bytes/sec.
  - **traffic_statistics.TotalUpload**: Total bytes uploaded since last reset.
  - **traffic_statistics.TotalDownload**: Total bytes downloaded since last reset.
  - **traffic_statistics.TotalConnectTime**: Total time connected since last reset.
