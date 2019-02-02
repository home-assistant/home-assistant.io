---
layout: page
title: "Speedtest.net Sensor"
description: "How to integrate Speedtest.net Sensor within Home Assistant."
date: 2016-02-12 9:06
sidebar: true
comments: false
sharing: true
footer: true
logo: speedtest.png
ha_category: System Monitor
featured: false
ha_release: 0.13
ha_iot_class: "Cloud Polling"
redirect_from: /components/sensor.speedtest/
---

The `speedtestdotnet` sensor uses the [Speedtest.net](https://speedtest.net/) web service to measure network bandwidth performance.

<p class='note'>
You must have the [Speedtest.net component](/components/speedtestdotnet/) configured to use this sensor.
</p>

## {% linkable_title Examples %}

In this section, you find some real-life examples of how to use this sensor.

### {% linkable_title Using as a trigger in an automation %}

{% raw %}
```yaml
# Example configuration.yaml entry
automation:
  - alias: "Internet Speed Glow Connect Great"
    trigger:
      - platform: template
        value_template: "{{ states('sensor.speedtest_download')|float > 10 }}"
    action:
      - service: shell_command.green

  - alias: "Internet Speed Glow Connect Poor"
    trigger:
      - platform: template
        value_template: "{{ states('sensor.speedtest_download')|float < 10 }}"
    action:
      - service: shell_command.red
```
{% endraw %}
