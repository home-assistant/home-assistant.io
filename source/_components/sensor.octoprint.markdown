---
layout: page
title: "OctoPrint Sensor"
description: "Instructions on how to integrate OctoPrint sensors within Home Assistant."
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
      - Time Elapsed
      - Time Remaining
```

{% configuration %}
name:
  description: The name of the sensor.
  required: false
  default: OctoPrint
  type: string
monitored_conditions:
  description: States to monitor.
  required: true
  type: list
  keys:
    current state:
      description: Text of current state.
    temperatures:
      description: Temperatures of all available tools, e.g., `print`, `head`, `print bed`, etc. These will be displayed as `tool0`, `tool1`, or `toolN` please refer to your OctoPrint frontend to associate the tool number with an actual device.
    job percentage:
      description: Percentage of the job.
    time elapsed:
      description: Time elapsed on current print job, in seconds.
    time remaining:
      description: Time remaining on current print job, in seconds.
{% endconfiguration %}

<p class='note'>
If you are tracking temperature it is recommended to set `bed` and/or `number_of_tools` in your octoprint configuration. This will allow the octoprint sensors to load if the printer is offline during Home Assistant startup.
</p>
