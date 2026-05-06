---
title: my-PV
description: Instructions on how to integrate my-PV devices into Home Assistant.
ha_category:
  - Binary sensor
  - Sensor
  - Water heater
ha_release: 2026.6
ha_iot_class: Local Polling
ha_codeowners:
  - '@my-PV'
  - '@rrooggiieerr'
ha_domain: my_pv
ha_platforms:
  - binary_sensor
  - sensor
  - number
  - water_heater
ha_integration_type: integration
ha_config_flow: true
ha_dhcp: true
ha_zeroconf: true
ha_quality_scale: bronze
---

This {% term integration %} links Home Assistant with your my-PV device.
The integration uses the [my-PV](https://pypi.org/project/my-PV/) library.

### Supported devices

The following devices are supported by this integration:

- AC ELWA 2
- AC•THOR range
- SOL•THOR

{% important %}

The ELWA immersion heater and my-PV WiFi Meter are not supported by this integration.

{% endimportant %}

The my-PV integration supports both the local API and the my-PV cloud API.

{% include integrations/config_flow.md %}

### Login to my-PV (Local API)

Using the local API is the preferred way to connect to your my-PV device.

{% configuration_basic %}
Password:
  description: "Password for your my-PV device."
{% endconfiguration_basic %}

Older versions of the my-PV hardware do not require a password, this will be added by upcomming firmware updates. You can find the initial password on the ... menu of your my-PV device. For the HEA•THOR IoT you can find the initial password on the device label. You can update the password trought the web interface of your my-PV device.

### Login to my-PV (Cloud API)

{% configuration_basic %}
Serial number:
  description: "The serial number of your my-PV device."
Token:
  description: "The API token"
{% endconfiguration_basic %}

To generate an API token go to your [my-PV Cloud](https://live.my-pv.com/) and navigate to **Device Setup** > ***API***. Then generate a token and use this when setting up the my-PV integration.

## Data updates

This integration retrieves data from the Local API every 5 seconds and my-PV Cloud every 30 seconds to ensure timely updates.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
