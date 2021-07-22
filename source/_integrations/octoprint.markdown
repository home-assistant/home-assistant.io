---
title: OctoPrint
description: Instructions on how to setup the OctoPrint in Home Assistant.
ha_category:
  - Hub
  - Binary Sensor
  - Sensor
ha_release: 0.19
ha_iot_class: Local Polling
ha_domain: octoprint
ha_platforms:
  - binary_sensor
  - sensor
---

[OctoPrint](https://octoprint.org/) is a web interface for your 3D printer. This is the main integration to integrate OctoPrint sensors.

There is currently support for the following device types within Home Assistant:

- [Binary Sensor](#binary-sensor)
- [Sensor](#sensor)

## Configuration

To get started with the OctoPrint API, please follow the directions on their [site](https://docs.octoprint.org/en/master/api/general.html). Once OctoPrint is configured you will need to add your API key and host to your `configuration.yaml`.

```yaml
octoprint:
  host: YOUR_OCTOPRINT_HOST
  api_key: YOUR_API_KEY
```

{% configuration %}
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
  default: 0
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
          description: Temperatures of all available tools, e.g., `print`, `head`, `print bed`, etc. These will be displayed as `tool0`, `tool1`, or `toolN` please refer to your OctoPrint frontend to associate the tool number with an actual device.
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

<div class='note'>

If you are tracking temperature it is recommended to set `bed` and/or `number_of_tools` in your octoprint configuration. This will allow the octoprint sensors to load if the printer is offline during Home Assistant startup.

</div>

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

## Binary Sensor

The `octoprint` binary sensor platform let you monitor if your 3D printer is printing or if there was a printing error.

To set it up, add the following information to your `configuration.yaml` file:

```yaml
binary_sensor:
  - platform: octoprint
    monitored_conditions:
      - Printing
      - Printing Error
```

{% configuration %}
monitored_conditions:
  description: States to monitor.
  required: true
  type: list
  keys:
    printing:
      description: State of the printer.
    printing error:
      description: Error while printing.
name:
  description: The name of the sensor.
  required: false
  type: string
  default: OctoPrint
{% endconfiguration %}

## Sensor

The `octoprint` sensor platform let you monitor various states of your 3D printer and its print jobs.
