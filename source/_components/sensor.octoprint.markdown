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

[OctoPrint](http://octoprint.org/) is a web interface for your 3D printer.

The `octoprint` sensor platform let you monitor various states of your 3D printer and its print jobs.

To get started with the OctoPrint API, please follow the directions on their [site](http://docs.octoprint.org/en/master/api/general.html). Once OctoPrint is configured you will need to add your API key and host to your `configuration.yaml`. 

To set it up, add the following information to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: octoprint
    name: OctoPrint
    host: YOUR_OCTOPRINT_HOST
    api_key: YOUR_API_KEY
    bed: false
    number_of_tools: 1
    monitored_conditions:
      - Current State
      - Temperatures
      - Job Percentage
      - Time Elapsed
      - Time Remaining
```

Configuration variables:

- **host** (*Required*): IP address or hostname of Octoprint host.
- **api_key** (*Required*): The retrieved api key.
- **name** (*Optional*): The name of the sensor. Default is 'OctoPrint'.
- **bed** (*Optional*): If the printer has a heated bed.
- **number_of_tools** (*Optional*): Number of temperature adjustable tools. i.e. nozzle.
- **monitored_conditions** array (*Required*): States to monitor.
  - **Current State**: Text of current state.
  - **Temperatures**:  Temperatures of all available tools, eg. `print`, `head`, `print bed`, etc. These will be displayed as `tool0`, `tool1`, or `toolN` please refer to your OctoPrint frontend to associate the tool number with an actual device.
  - **Job Percentage**: Percentage of the job.
  - **Time Elapsed**: Time elapsed on current print job, in seconds.
  - **Time Remaining**: Time remaining on current print job, in seconds.

<p class='note'>
If you are tracking temperature it is recommended to set `bed` and/or `number_of_tools` in your octoprint configuration. This will allow the octoprint sensors to load if the printer is offline during Home Assistant startup.
</p>
