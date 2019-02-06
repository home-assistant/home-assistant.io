---
layout: page
title: "OctoPrint"
description: "Instructions on how to setup the OctoPrint in Home Assistant."
date: 2015-01-20 22:36
sidebar: true
comments: false
sharing: true
footer: true
logo: octoprint.png
ha_category: Hub
featured: false
ha_release: 0.19
ha_iot_class: "Local Polling"
---

[OctoPrint](http://octoprint.org/) is a web interface for your 3D printer. This is the main component to integrate OctoPrint sensors.

## {% linkable_title Configuration %}

To get started with the OctoPrint API, please follow the directions on their [site](http://docs.octoprint.org/en/master/api/general.html). Once OctoPrint is configured you will need to add your API key and host to your `configuration.yaml`.

```yaml
octoprint:
  host: YOUR_OCTOPRINT_HOST
  api_key: YOUR_API_KEY
```

{% configuration %}
octoprint:
  type: list
  required: true
  keys:
    host:
      description: IP address or hostname of Octoprint host.
      required: true
      type: string
    api_key:
      description: The retrieved API key.
      required: true
      type: string
    name:
      description: The name for this printer, must be unique if multiple printers are defined.
      required: false
      type: string
      default: OctoPrint
    port:
      description: The port of the Octoprint server.
      required: false
      type: integer
      default: 80
    path:
      description: The URL path of the Octoprint instance.
      required: false
      type: string
      default: /
    ssl:
      description: Enable or disable SSL/TLS.
      required: false
      type: boolean
      default: false
    bed:
      description: If the printer has a heated bed.
      required: false
      type: boolean
      default: false
    number_of_tools:
      description: Number of temperature adjustable tools, e.g., nozzle.
      required: false
      type: integer
      default: 1
    sensors:
      description: Configuration for the sensors.
      required: false
      type: map
      keys:
        monitored_conditions:
          description: The sensors to activate.
          type: list
          default: all (`Current State`, `Temperatures`, `Job Percentage`, `Time Elapsed`, `Time Remaining`)
          keys:
            "Current State":
              description: Text of current state.
            "Temperatures":
              description: Temperatures of all available tools, eg. `print`, `head`, `print bed`, etc. These will be displayed as `tool0`, `tool1`, or `toolN` please refer to your OctoPrint frontend to associate the tool number with an actual device.
            "Job Percentage":
              description: Percentage of the job.
            "Time Elapsed":
              description: Time elapsed on current print job, in seconds.
            "Time Remaining":
              description: Time remaining on current print job, in seconds.
    binary_sensors:
      description: Configuration for the binary sensors.
      required: false
      type: map
      keys:
        monitored_conditions:
          description: The sensors to activate.
          type: list
          default: all (`Printing`, `Printing Error`)
          keys:
            "Printing":
              description: State of the printer.
            "Printing Error":
              description: Error while printing.
{% endconfiguration %}

<p class='note'>
If you are tracking temperature it is recommended to set `bed` and/or `number_of_tools` in your octoprint configuration. This will allow the octoprint sensors to load if the printer is offline during Home Assistant startup.
</p>

Example with multiple printers:

```yaml
octoprint:
  - host: YOUR_OCTOPRINT_HOST
    api_key: YOUR_API_KEY
    name: PRINTER_NAME_1
    number_of_tools: 2
    sensors:
      monitored_conditions:
        - 'Current State'
        - 'Job Percentage'
  - host: YOUR_OCTOPRINT_HOST
    api_key: YOUR_API_KEY
    name: PRINTER_NAME_2
    number_of_tools: 1
```

If the OctoPrint host is equipped with a web camera it is possible to add this as well.

```yaml
camera:
  - platform: mjpeg
    name: OctoPrint
    still_image_url: http://YOUR_OCTOPRINT_HOST_IP/webcam/?action=snapshot
    mjpeg_url: http://YOUR_OCTOPRINT_HOST_IP/webcam/?action=stream
```
