---
title: OctoPrint
description: Integration between OctoPrint and Home Assistant.
ha_category:
  - 3D printing
  - Binary sensor
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
  - camera
  - sensor
ha_integration_type: integration
---

[OctoPrint](https://octoprint.org/) is a web interface for your 3D printer. This is the main integration to integrate OctoPrint sensors.

{% include integrations/config_flow.md %}

{% configuration_basic %}
username:
  description: Username for the server.
host:
  description: Address of the server, e.g., `192.168.1.32`.
port:
  description:  Port of the server.
path:
  description: URL path of the server
ssl:
  description: Whether to use SSL or not when communicating.
verify ssl:
  description: Should the SSL certificate be validated.
{% endconfiguration_basic %}

### API key

For the integration to work, please check that in Octoprint, the [Discovery Plugin](https://docs.octoprint.org/en/master/bundledplugins/discovery.html) is enabled and in the **Settings** -> **Printer Notifications** menu that **Enable popups** is checked.
The Octoprint integration will attempt to register itself via the [Application Keys Plugin](https://docs.octoprint.org/en/master/bundledplugins/appkeys.html). After submitting the configuration UI in Home Assistant, log in to Octoprint as the user whose credentials you just entered in Home Assistant, and select **Allow** on the prompt.

NOTE: You *must* be logged into Octoprint as the user which you are adding to Home Assistant. If you log in to Octoprint as any other user, you will not see the prompt to allow access.

## Binary sensor

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

The OctoPrint integration provides a camera feed if one is configured in OctoPrint.

## Buttons

The OctoPrint integration provides the following buttons:

- Pause Job
- Resume Job
- Stop Job
- Shutdown System
- Reboot System
- Restart Octoprint

## Troubleshooting

### Device is already configured for a second instance

This is typically caused by copying/backup/restoring part of the config files between OctoPrint instances.

1. SSH into the OctoPrint instance that is being added.
2. Edit the `config.yaml` for the instance (Typically `/home/pi/.octoprint`)
3. Under `plugins/discovery`, change the value of `upnpUuid` to have a different uuid.
4. Restart the OctoPrint service
5. Attempt to add the instance once again.
