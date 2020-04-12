---
title: Nextcloud
description: Instructions on how to integrate Nextcloud monitor api data into Home Assistant.
ha_category:
  - Sensor
ha_iot_class: Cloud Polling
ha_release: 0.108
ha_domain: nextcloud
ha_codeowners:
  - '@meichthys'
---

The `nextcloud` integration pulls summary [Nextcloud](https://nextcloud.com/) information into Home Assistant.

![Nextcloud Example Sensor](/images/screenshots/nextcloud-sample-sensor.png)

## Configuration

This integration requires access to the monitor API of a Nextcloud instance  Therefore, the account on where you should generate an App password from the Nextcloud web UI, must have `Administrator` privileges. 

To create the needed App password follow this path on your Nextcloud instance: **Settings** > **Security** > **Devices & sessions** > **Create new app password**.

Once you have generated the App password, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
nextcloud:
  url: Https://YOUR_NEXTCLOUD_URL
  username: YOUR_USERNAME
  password: YOUR_APP_PASSWORD

```

{% configuration %}
url:
  description: The full URL to your Nextcloud instance.
  required: true
  type: string
username:
  description: The username of a Nextcloud user that has access to the Nextcloud monitor API.
  required: true
  type: string
password:
  description: The app password generated from the Nextcloud security settings page.
  required: true
  type: string
{% endconfiguration %}
