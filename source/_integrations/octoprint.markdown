---
title: OctoPrint
description: Integration between OctoPrint and Home Assistant.
ha_category:
  - Binary Sensor
  - Button
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
  - button
  - sensor
ha_integration_type: integration
---

[OctoPrint](https://octoprint.org/) is a web interface for your 3D printer. This is the main integration to integrate OctoPrint sensors.

{% include integrations/config_flow.md %}

{% configuration_basic %}
username:
  description: Username for the server.
  required: true
  type: string
host:
  description: Address of the server, e.g., 192.168.1.32.
  required: true
  type: string
port:
  description:  Port of the server.
  required: false
  type: string
  default: 80
path:
  description: URL path of the server
  required: false
  type: string
  default: /
ssl:
  description: Whether to use SSL or not when communicating.
  required: false
  type: boolean
  default: false
verify ssl:
  description: Should the SSL certificate be validated.
  required: false
  type: boolean
  default: false
{% endconfiguration_basic %}

### API Key
For the integration to work, please check that the plugin Discovery is enabled. note: make sure to enable pop-ups in the settings -> printer notifications menu.
The Octoprint integration will attempt to register itself via the [application keys plugin](https://docs.octoprint.org/en/master/bundledplugins/appkeys.html). After submitting the configuration UI in Home Assistant, open the Octoprint UI and click allow on the prompt. 

## Binary Sensor

The OctoPrint integration provides the following binary sensors:

- Printing
- Print Error

## Sensor

The OctoPrint integration lets you monitor various states of your 3D printer and its print jobs.
Supported sensors:

- Current Printer State
- Job Completed Percentage
- Estimated Finish Time
- Estimated Start Time

## Camera

If the OctoPrint host is equipped with a web camera it is possible to add this as well using the [`MJPEG IP Camera`](/integrations/mjpeg) integration. Use `http://YOUR_OCTOPRINT_HOST_IP/webcam/?action=stream` for the MJPEG URL and `http://YOUR_OCTOPRINT_HOST_IP/webcam/?action=snapshot` as the still image URL.

{% my config_flow_start badge domain="mjpeg" %}

## Buttons

The OctoPrint integration provides the following buttons.

- Pause Job
- Resume Job
- Stop Job
