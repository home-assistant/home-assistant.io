---
layout: page
title: "Open Hardware Monitor Sensor"
description: "Instructions how to integrate Open Hardware Monitor within Home Assistant."
date: 2017-06-16 00:00:00
sidebar: true
comments: false
sharing: true
footer: true
logo: openhardwaremonitor.png
ha_category: Sensor
ha_release: 0.48
ha_iot_class: "Local Polling"
---


The `openhardwaremonitor` platform uses your [Open Hardware Monitor](http://openhardwaremonitor.org/) installation as a source for sensors that will display system information.

To add Open Hardware Monitor to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: openhardwaremonitor
    host: IP_ADDRESS
```

Configuration variables:

- **host** (*Required*): The IP address or hostname of your Open Hardware Monitor.
- **port** (*Optional*): The port of your Open Hardware Monitor API. Default to 8085.

<p class='note'>
OpenHardwareMonitor must be running on the host, with "Remote web server" active.
You also need to open an inbound port for (TPC 8085) in the advanced firewall settings.
</p>
