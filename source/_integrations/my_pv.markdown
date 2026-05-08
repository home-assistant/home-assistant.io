---
title: my-PV
description: Instructions on how to integrate my-PV devices into Home Assistant.
ha_category:
  - Water heater
ha_release: 2026.6
ha_iot_class: Local Polling
ha_codeowners:
  - '@my-PV'
  - '@rrooggiieerr'
ha_domain: my_pv
ha_platforms:
  - water_heater
ha_integration_type: integration
ha_config_flow: true
ha_dhcp: true
ha_zeroconf: true
ha_quality_scale: bronze
---

The **my-PV** {% term integration %} is used to integrate with the devices of [my-PV](https://www.my-pv.com/). my-PV produces functional and innovative solutions for housing technology powered by solar electricity.

## Supported devices

The following devices are supported by this integration:
- AC ELWA 2
- AC•THOR range
- HEA•THOR IoT
- SOL•THOR

## Unsupported devices

The following devices are not supported by the integration:
- ELWA immersion heater
- WiFi Meter


The my-PV integration supports both the local API and the my-PV cloud API.

{% include integrations/config_flow.md %}

### Login to my-PV (Local API)

Using the local API is the preferred way to connect to your my-PV device.

{% configuration_basic %}
Host:
  description: "The IP address of your my-PV device. You can find it in your router or in the device's web interface."
Password:
  description: "Password or device key of your my-PV device."
{% endconfiguration_basic %}

Older firmware versions of the my-PV hardware do not require a password, this will be added by upcoming firmware updates. When no custom password is set you have to use the **devicekey** which can be found under the ⓘ info menu of your my-PV device. For the HEA•THOR IoT you can find the **devicekey** on the device label.

You can update the password through the web interface of your my-PV device.

### Login to my-PV (Cloud API)

{% configuration_basic %}
Serial number:
  description: "The serial number of your my-PV device."
Token:
  description: "The API token"
{% endconfiguration_basic %}

To generate an API token go to your [my-PV Cloud](https://live.my-pv.com/) and navigate to ⚙️ > **Device Setup**. Enable **Advanced Settings**, navigate to **API** and **Generate API Access Token**. Use this when setting up the my-PV integration.

## Data updates

The **my-PV** integration {% term polling polls %} data from the Local API every 5 seconds and my-PV Cloud every 30 seconds to ensure timely updates.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
