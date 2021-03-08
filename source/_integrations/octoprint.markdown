---
title: OctoPrint
description: Integration between OctoPrint and Home Assistant.
ha_category:
  - Binary Sensor
  - Sensor
ha_config_flow: true
ha_release: 0.19
ha_codeowners:
  - '@rfleming71'
ha_iot_class: Local Polling
ha_domain: octoprint
ha_zeroconf: true
ha_ssdp: true
ha_platforms:
  - binary_sensor
  - sensor
---

[OctoPrint](https://octoprint.org/) is a web interface for your 3D printer. This is the main integration to integrate OctoPrint sensors.

{% include integrations/config_flow.md %}

### API Key

The Octoprint integration will attempt to register itself via the [application keys plugin](https://docs.octoprint.org/en/master/bundledplugins/appkeys.html). After submitting the configuration UI in Home Assistant, open the Octoprint UI and click allow on the prompt.

## Binary Sensor

The `octoprint` binary sensor platform let you monitor:

- Printing
- Print Error

## Sensor

The `octoprint` sensor platform let you monitor various states of your 3D printer and its print jobs.
Supported sensors:

- Current Printer State
- Job Completed Percentage
- Estimated Finish Time
- Estimated Start Time

## Camera

If the OctoPrint host is equipped with a web camera it is possible to add this as well.

```yaml
camera:
  - platform: mjpeg
    name: OctoPrint
    still_image_url: http://YOUR_OCTOPRINT_HOST_IP/webcam/?action=snapshot
    mjpeg_url: http://YOUR_OCTOPRINT_HOST_IP/webcam/?action=stream
```
