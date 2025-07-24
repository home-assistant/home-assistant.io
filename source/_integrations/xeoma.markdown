---
title: Xeoma
description: Instructions on how to integrate camera video feeds from a Xeoma server in Home Assistant
ha_category:
  - Camera
ha_iot_class: Local Polling
ha_release: 0.62
ha_domain: xeoma
ha_platforms:
  - camera
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `Xeoma` camera {% term integration %} allows you to view the video feeds from a [Xeoma](https://felenasoft.com/xeoma) video surveillance server.

## Configuration

To enable Xeoma camera feeds, add the following lines to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
camera:
  - platform: xeoma
    host: http://localhost:10090
```

{% configuration %}
host:
  description: The URL of the Xeoma server's web interface.
  required: true
  type: string
username:
  description: The username used to access the Xeoma server's web interface.
  required: false
  type: string
password:
  description: The password used to access the Xeoma server's web interface.
  required: false
  type: string
new_version:
  description: Set to false if the Xeoma server version is 17.5 or earlier.
  required: false
  type: boolean
  default: true
cameras:
  description: List of customizations for individual Xeoma cameras.
  required: false
  type: list
  keys:
    image_name:
      description: The name of the JPEG image for this camera as configured in Xeoma (without .jpg extension).
      required: true
      type: string
    name:
      description: The name to display in the frontend for this camera.
      required: false
      type: string
      default: The `image_name` for this camera.
    hide:
      description: Don't show this camera in Home Assistant.
      required: false
      type: boolean
      default: false
{% endconfiguration %}

## Full example

```yaml
# Example configuration.yaml entry
camera:
  - platform: xeoma
    host: http://localhost:10090
    username: user
    password: secretpassword
    new_version: false
    cameras:
      - image_name: front_porch
        name: Front Porch
      - image_name: back_patio
        hide: true
```

To use this platform, you must have the Xeoma Web Server module enabled in at least one of your camera chains.

This platform will parse the Xeoma web interface to find all enabled cameras and add them all to Home Assistant. You can hide individual cameras using the platform configuration.

The `image_name` configuration value for each camera should match the name supplied to the Xeoma Web Server configuration (under _Path to access images_) with the _.jpg_ extension removed.
