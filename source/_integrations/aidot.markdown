---
title: AiDot
description: Instructions on integrating AiDot home security with Home Assistant.
ha_category:
  - Light
ha_release: 2024.6
ha_iot_class: cloud_polling
ha_config_flow: true
ha_codeowners:
  - '@s1eedz'
ha_domain: aidot
ha_homekit: true
ha_platforms:
  - light
ha_integration_type: integration
---

The [AiDot](https://www.aidot.com/) {% term integration %} allows you to control the Wi-Fi lights with Home Assistant.

## Prerequisites
- To be able to configure your machine in Home Assistant, your machine needs to be added to your account using the official AiDot app first.
- Only login with username & password is supported. 
{% include integrations/config_flow.md %}

{% configuration_basic %}
Country:
  description: "Your country you use to log into the AiDot app."
Username:
  description: "Your username you use to log into the AiDot app."
Password:
  description: "Password you use to log into the AiDot app."
{% endconfiguration_basic %}

## Data updates
- After successful login, the device list will be pulled from AiDot Cloud first
- After pulling the list, the integration will pull the latest list from the cloud every 6 hours and process additions and deletions
- The integration will update its lights by polling the AiDot Bridge every five seconds for new values.

## Supported devices

- A19
- BR30


## Troubleshooting

There are no commonly known issues with this integration.

## Remove integration

{% include integrations/remove_device_service.md %}
