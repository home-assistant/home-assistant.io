---
title: AiDot
description: Instructions on integrating AiDot Wi-Fi lights with Home Assistant.
ha_category:
  - Light
ha_release: 2025.5
ha_iot_class: local_polling
ha_config_flow: true
ha_codeowners:
  - '@s1eedz'
ha_domain: aidot
ha_platforms:
  - light
ha_integration_type: hub
---

The [AiDot](https://www.aidot.com/) {% term integration %} allows you to control Wi-Fi lights with Home Assistant.

## Prerequisites

- Your devices need to be added to your account using the official AiDot app first.
- Only login with username and password is supported.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Country:
  description: "The country you use to log into the AiDot app."
Username:
  description: "The username you use to log into the AiDot app."
Password:
  description: "The password you use to log into the AiDot app."
{% endconfiguration_basic %}

## Data updates

- After you sign in successfully, the integration retrieves the device list from AiDot Cloud.
- After the initial device list is retrieved, the integration checks the cloud every 6 hours and processes any additions or deletions.
- The integration updates its lights by polling the AiDot Bridge every five seconds for new values.

## Supported devices

- A19
- BR30

## Troubleshooting

There are no commonly known issues with this integration.

## Remove integration

{% include integrations/remove_device_service.md %}
