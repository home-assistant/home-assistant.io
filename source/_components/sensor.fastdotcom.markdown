---
layout: page
title: "Fast.com"
description: "How to integrate Fast.com within Home Assistant."
date: 2016-08-10 17:30
sidebar: true
comments: false
sharing: true
footer: true
logo: fastdotcom.png
ha_category: System Monitor
featured: false
ha_release: 0.26
ha_iot_class: "Cloud Polling"
---

The `fastdotcom` sensor component uses the [Fast.com](https://fast.com/) web service to measure network bandwidth performance.

<p class='note'>
Currently fast.com only supports measuring download bandwidth. If you want to measure bandwidth metrics other then download such as ping and upload, utilize the [speedtest](/components/sensor.speedtest) component.
</p>

By default, it will run every hour. The user can change the update frequency in the configuration by defining the minute and hour for a speedtest to run.

## {% linkable_title Configuration %}

To add a Fast.com sensor to your installation, add the following to your `configuration.yaml` file:

Once per hour, on the hour (default):

```yaml
sensor:
  - platform: fastdotcom
```

Every half hour of every day:

```yaml
sensor:
  - platform: fastdotcom
    minute:
      - 0
      - 30
```

{% configuration %}
second:
  description: Specify the second(s) of the hour to schedule the speedtest. Use a list for multiple entries.
  required: false
  default: 0
  type: list
minute:
  description: Specify the minute(s) of the hour to schedule the speedtest. Use a list for multiple entries.
  required: false
  default: 0
  type: list
hour:
  description: Specify the hour(s) of the day to schedule the speedtest. Use a list for multiple entries.
  required: false
  type: list
manual:
  description: True or False to turn manual mode on or off. Manual mode will disable scheduled speedtests.
  required: false
  default: false
  type: boolean
{% endconfiguration %}

There is also a service named `sensor.update_fastdotcom` that you can use to run a fast.com speedtest on demand.  You can turn on manual mode to disable the scheduled speedtests.

## {% linkable_title Notes %}

- When running on Raspberry Pi, just note that the maximum speed is limited by its 100 Mbit/s LAN adapter.
- This entity will return the maximum measured speed during an 15 second test.
