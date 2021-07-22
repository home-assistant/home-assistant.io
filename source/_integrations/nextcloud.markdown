---
title: Nextcloud
description: Instructions on how to integrate Nextcloud monitor api data into Home Assistant.
ha_category:
  - Sensor
  - Binary Sensor
ha_iot_class: Cloud Polling
ha_release: 0.108
ha_domain: nextcloud
ha_codeowners:
  - '@meichthys'
ha_platforms:
  - binary_sensor
  - sensor
---

The `nextcloud` integration pulls summary [Nextcloud](https://nextcloud.com/) information into Home Assistant.

![Nextcloud Example Sensor](/images/screenshots/nextcloud-sample-sensor.png)

## Configuration

This integration has the following Nextcloud Server prerequisites:

- The user must be in the Nextcloud `admin` group (__*Nextcloud*__ > __*Users*__)
- The Nextcloud 'Monitoring' app must be installed (__*Nextcloud*__ > __*Apps*__ > 🔍(Search Icon) > __*Monitoring*__ > __*Enable*__)
- (Recommended) A Nextcloud App password should be generated for use in Home Assistant (__*Nextcloud*__ > __*Settings*__ > __*Personal*__ > __*Security*__ > __*Devices & sessions*__ > __*Create new app password*__)

To enable the Nextcloud integration, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
nextcloud:
  url: https://YOUR_NEXTCLOUD_URL
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
