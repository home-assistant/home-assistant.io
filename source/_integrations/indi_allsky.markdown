---
title: INDI Allsky
description: Instructions on how to integrate INDI Allsky with Home Assistant.
ha_category:
  - Camera
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

- **Camera**: Provides the latest image from your INDI Allsky server.

### Sensors

- **Exposure time**: Exposure duration of the latest capture in seconds.
- **Sky quality**: Sky quality meter (SQM) measurement for sky darkness.
- **Stars**: Count of detected stars in the latest exposure.
- **Temperature**: Camera / sensor temperature reading in °C.

#### Diagnostic sensors

The following sensors are disabled by default and can be enabled via the {% term entity %} settings:

- **Bin mode**: Sensor pixel binning mode.
- **Filename**: Filename of the captured image.
- **Gain**: Camera sensor gain setting.

## Data updates

The integration maintains a WebSocket connection to the INDI Allsky web server to receive real-time exposure completion pushes. Live camera images are fetched on-demand when requested by Home Assistant.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
