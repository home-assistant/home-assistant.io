---
layout: page
title: "Netdata"
description: "Instructions on how to integrate Netdata within Home Assistant."
date: 2016-12-05 07:00
sidebar: true
comments: false
sharing: true
footer: true
logo: netdata.png
ha_category: System Monitor
ha_release: 0.35
ha_iot_class: "Local Polling"
---


The `netdata` sensor platform allows you to display information collected by [Netdata](http://my-netdata.io/).

## {% linkable_title Setup %}

Getting the details to configure the sensors is a bit tricky as Netdata uses different name for the `element:` value that is required. To get the value for the `data_group:` use Netdata's web interface. `1.` marks the name for the `data_group:`. `2.` are the names for the element to show in Home Assistant. The name that is shown can be different than the name under which the metrics are available.

<p class='img'>
  <img src='{{site_root}}/images/components/netdata/details.png' />
</p>

To check if the `element:` name matches the name in the Netdata frontend, use `curl` with the IP address of your Netdata instance, its port and the `data_group`:

```bash
$ curl -X GET "http://[Netdata_Instance]:19999/api/v1/data?chart=[data_group]&points=2&options=jsonwrap"
{
   "api": 1,
   "id": "system.ipv4",
   "name": "system.ipv4",
[...]
   "dimension_names": ["received", "sent"],
   "dimension_ids": ["InOctets", "OutOctets"],
[...]
```

- `dimension_names`: Names shown in the frontend.
- `dimension_ids`: Names to use for `element`.


## {% linkable_title Configuration %}

To add this platform to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: netdata
    resources:
      load:
        data_group: system.load
        element: load15
      cpu:
        data_group: system.cpu
        element: system
```

{% configuration %}
host:
  description: The IP address or hostname of your Netdata instance.
  required: false
  type: string
  default: localhost
port:
  description: The port that the Netdata instance is running on.
  required: false
  type: int
  default: 19999
name:
  description: Name of the monitored Netdata instance.
  required: false
  type: number
  default: Netdata
resources:
  description: List of details to monitor.
  required: true
  type: map
  keys:
    name:
      description: Name to use for the sensor in the frontend.
      required: true
      type: string
      keys:
        data_group:
          description: "Name of the data group to monitor, e.g., `system.cpu`." 
          required: true
          type: string
        element:
          description: The element of the group to monitor.
          required: true
          type: string
        icon:
          description: Icon to use for the sensor.
          required: false
          type: string
          default: "mdi:desktop-classic"
{% endconfiguration %}

