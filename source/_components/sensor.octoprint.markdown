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
---


The `OctoPrint` sensor platform let you monitor various states of your 3D printer and its print jobs.

To set it up, add the following information to your `configuration.yaml` file:

```yaml
sensor:
  platform: octoprint
  monitored_conditions:
    - Current State
    - Temperatures
    - Job Percentage
```

Configuration variables:

- **monitored_conditions** array (*Required*): States to monitor.
  - Current State (Text of current state)
  - Temperatures (Temperatures of all available tools)(print head, print bed, ...) These will be displayed as tool0, tool1, ... please refer to your OctoPrint frontend to associate tool number with actual device.
  - Job Percentage

<p class='note'>You must have the [OctoPrint component](/components/octoprint/) configured to use this sensor.</p>
