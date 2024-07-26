---
title: myUplink
description: Instructions on how to set up the myUplink integration within Home Assistant.
ha_category:
  - Binary sensor
  - Number
  - Select
  - Sensor
  - Switch
  - Update
ha_iot_class: Cloud Polling
ha_release: '2024.2'
ha_domain: myuplink
ha_codeowners:
  - '@pajzo'
  - '@astrandb'
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - diagnostics
  - number
  - select
  - sensor
  - switch
  - update
ha_integration_type: integration
---

The myUplink integration lets you get information about the devices supporting myUplink using the [official cloud API](https://dev.myuplink.com).

Depending on the type of devices in your system, one or more entities are added to Home Assistant. Currently, there is support for reading sensor states. There is also support for switch, select and number entities if suitable data points are discovered in the system. Note that you may need a valid subscription with MyUplink to control your equipment with switch, select, and number entities.

## Prerequisites

1. Visit [https://myuplink.com/register](https://myuplink.com/register) and sign up for a user account.
2. Go to [**Applications**](https://dev.myuplink.com/apps), and register a new App:

- **Application ID**: Home Assistant (or whatever name makes sense to you)
- **OAuth Flow**: Authorization Code Grant Flow
- **Redirect URI**: `https://my.home-assistant.io/redirect/oauth`

{% details "I have manually disabled My Home Assistant" %}

If you don't have [My Home Assistant](/integrations/my) on your installation,
you can use `<HOME_ASSISTANT_URL>/auth/external/callback` as the redirect URI
instead.

The `<HOME_ASSISTANT_URL>` must be the same as used during the configuration/
authentication process.

Internal examples: `http://192.168.0.2:8123/auth/external/callback`, `http://homeassistant.local:8123/auth/external/callback`."

{% enddetails %}

{% include integrations/config_flow.md %}

The integration configuration will require the **Client ID** and **Client Secret** created above. See [Application Credentials](/integrations/application_credentials) for more details.
