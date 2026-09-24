---
title: INDI Allsky
description: Instructions on how to integrate INDI Allsky with Home Assistant.
ha_category:
  - Camera
  - Image
  - Sensor
ha_release: "2026.10"
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@TN-1'
ha_domain: indi_allsky
ha_integration_type: service
ha_platforms:
  - camera
  - image
  - sensor
ha_quality_scale: bronze
---

The **INDI Allsky** {% term integration %} connects Home Assistant with your [INDI Allsky](https://github.com/aaronwmorris/indi-allsky) camera server. INDI Allsky is an allsky camera system designed for astrophotography, night sky capture, cloud cover monitoring, and atmospheric monitoring.

## Prerequisites

You need the connection details of your INDI Allsky web server instance, including the hostname or IP address and port number (defaults to port `443` with SSL enabled).

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "The hostname or IP address of your INDI Allsky web server (for example, `allsky.local` or `192.168.1.100`)."
Port:
  description: "The web server port number for INDI Allsky (default: `443`)."
SSL:
  description: "Whether to connect using HTTPS/SSL (default: `true`)."
Verify SSL:
  description: "Whether to verify the SSL certificate of the INDI Allsky web server (default: `true`)."
{% endconfiguration_basic %}

## Supported functionality

The **INDI Allsky** {% term integration %} provides the following entities:

### Camera

- **Latest capture**: Provides the latest image from your INDI Allsky server.

### Image

- **Latest keogram**: Displays the most recently generated keogram image composite.
- **Latest star trail**: Displays the most recently generated star trail image composite.

### Sensors

- **Exposure time**: The exposure duration of the latest capture (in seconds).
- **Sky quality**: Sky Quality Meter (SQM) reading.
- **Stars**: The number of stars detected in the latest image.
- **Temperature**: Sensor temperature (in °C).
- **Binning mode** (disabled by default): The binning mode used for capture.
- **Filename** (disabled by default): The filename of the latest captured image.
- **Gain** (disabled by default): The camera gain setting.

## Data updates

The camera entity fetches the latest image on-demand from the INDI Allsky server whenever requested by Home Assistant. Sensor data is pushed in real time via a persistent local WebSocket connection.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

