---
title: Nextcloud Sensor
description: Instructions on how to integrate Nextcloud monitor api data into home-assistant.
logo: nextcloud.png
ha_category:
  - Sensor
ha_iot_class: Cloud Polling
ha_release: 0.104
---

The `nextcloud` platform pulls summary [Nextcloud](https://nextcloud.com/) information into home-assistant.

![Nextcloud Example Sensor]('/images/screenshots/nextcloud-sample-sensor.png')

## Configuration

This integration requires access to the monitor api of a Nextcloud instance (This is generally an admin user).

You should also generate an App password from the nextcloud web ui. `Settings > Security > Devices & sessions > Create new app password`

Once you have generated the App password, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: nextcloud
    url: Https://YOUR_NEXTCLOUD_URL
    username: YOUR_USERNAME
    password: YOUR_APP_PASSWORD

```

{% configuration %}
url:
  description: The full url to your nextcloud instance.
  required: true
  type: string
username:
  description: The username of a nextcloud user that has access to the nextcloud monitor api.
  required: true
  type: string
password:
  description: The app password generated from the Nextcloud security settings page.
  required: true
  type: string
scan_interval:
  description: API polling interval in seconds.
  required: false
  type: integer
  default: 60
{% endconfiguration %}
