---
title: Nextcloud
description: Instructions on how to integrate Nextcloud monitor api data into Home Assistant.
ha_category:
  - Binary sensor
  - Sensor
  - Update
ha_iot_class: Cloud Polling
ha_release: 0.108
ha_domain: nextcloud
ha_config_flow: true
ha_codeowners:
  - '@mib1185'
ha_platforms:
  - binary_sensor
  - sensor
  - update
ha_integration_type: integration
---

The `nextcloud` integration pulls summary [Nextcloud](https://nextcloud.com/) information into Home Assistant.

The integration provides sensors and binary sensors for most of the data points that the built-in Nextcloud [serverinfo app](https://github.com/nextcloud/serverinfo) provides.

To see which datapoints your nextcloud instance exposes, browse to this url: `https://<your_nextcloud_url>/ocs/v2.php/apps/serverinfo/api/v1/info?format=json&skipUpdate=false`.

![Nextcloud Example Sensor](/images/screenshots/nextcloud-sample-sensor.png)

## Configuration

This integration has the following Nextcloud Server prerequisites:

- The user must be in the Nextcloud `admin` group (__*Nextcloud*__ > __*Users*__)
- The Nextcloud 'Monitoring' app must be installed (__*Nextcloud*__ > __*Apps*__ > 🔍(Search Icon) > __*Monitoring*__ > __*Enable*__)
- (Recommended) A Nextcloud App password should be generated for use in Home Assistant (__*Nextcloud*__ > __*Settings*__ > __*Personal*__ > __*Security*__ > __*Devices & sessions*__ > __*Create new app password*__)

{% include integrations/config_flow.md %}
