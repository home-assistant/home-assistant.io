---
title: Ubiquiti UniFi Video
description: Instructions on how to integrate UVC cameras within Home Assistant.
ha_category:
  - Camera
ha_release: 0.13
ha_iot_class: Local Polling
ha_domain: uvc
ha_platforms:
  - camera
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `uvc` camera {% term integration %} allows you to integrate [UniFi Video Camera (UVC)](https://www.ui.com/products/#unifivideo) into Home Assistant.

The platform connects to the [UniFi NVR software](https://www.ui.com/download/unifi-video) and automatically discovers/adds any camera connected to the NVR.

### Setup

It is recommended that you create a new user for this {% term integration %} in the NVR software and only give the user the permissions it need to operate.

- The API key is found in `User` -> `My account` -> `API Access` in the NVR software.
- The camera password is found in `Settings` -> `Camera Settings` -> `Camera Password` in the NVR software.

### Configuration

To use the {% term integration %} in your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
camera:
  - platform: uvc
    nvr: IP_ADDRESS
    key: API_KEY
```

{% configuration %}
nvr:
  description: The IP or hostname of the NVR (Network Video Recorder) server.
  required: true
  type: string
port:
  description: The port number to use for accessing the NVR.
  required: false
  type: integer
  default: 7080
key:
  description: The API key available from the NVR web interface.
  required: true
  type: string
password:
  description: The camera password.
  required: false
  type: string
  default: ubnt
ssl:
  description: Should use SSL/TLS to connect to the NVR.
  required: false
  type: boolean
  default: false
{% endconfiguration %}

{% important %}
When using an API_KEY to access cameras controlled by Ubiquiti's NVR Software, the associated user account MUST have at least Administrator privileges within the NVR Software in order for new cameras to be added into Home Assistant. Once the entities have been created in Home Assistant, privileges for the user account can be lowered.
{% endimportant %}
