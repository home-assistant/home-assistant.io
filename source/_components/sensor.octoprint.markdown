---
layout: page
title: "OctoPrint Sensor"
description: "Instructions how to integrate OctoPrint sensors within Home Assistant."
date: 2016-05-05 08:00
sidebar: true
comments: false
sharing: true
footer: true
logo: octoprint.png
ha_category: Sensor
ha_release: 0.19
ha_iot_class: "Local Polling"
---


The `octoprint` sensor platform let you monitor various states of your 3D printer and its print jobs.

<p class='note'>
You must have the [OctoPrint component](/components/octoprint/) configured to use this sensor.
</p>

To set it up, add the following information to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: octoprint
    name: OctoPrint
    monitored_conditions:
      - Current State
      - Temperatures
      - Job Percentage
```

Configuration variables:

- **name** (*Optional*): The name of the sensor. Default is 'OctoPrint'.
- **monitored_conditions** array (*Required*): States to monitor.
  - **Current State**: Text of current state)
  - **Temperatures**:  Temperatures of all available tools, eg. `print`, `head`, `print bed`, etc. These will be displayed as `tool0`, `tool1`, or `toolN` please refer to your OctoPrint frontend to associate the tool number with an actual device.
  - **Job Percentage**: Percentage of the job.


<p class='note'>
If you are tracking temperature it is recommended to set `bed` and/or `number_of_tools` in your octoprint configuration. This will allow the octoprint sensors to load if the printer is offline during Home Assistant startup.
</p>
