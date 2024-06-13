---
title: Withings
description: Instructions on how to integrate Withings health products within Home Assistant.
ha_category:
  - Health
  - Sensor
ha_release: 0.99
ha_iot_class: Cloud Push
ha_config_flow: true
ha_codeowners:
  - '@joostlek'
ha_domain: withings
ha_platforms:
  - binary_sensor
  - calendar
  - diagnostics
  - sensor
ha_integration_type: integration
ha_quality_scale: platinum
---

The **Withings** {% term integration %} consumes data from various health products produced by [Withings](https://www.withings.com).

## Create a Withings developer account

You must have a developer account to distribute the data. [Create a free developer account](https://account.withings.com/partner/add_oauth2).

Create an application:
1. Ensure you have selected *Withings public cloud* (instead of Withings US medical cloud)
2. Create an application
3. Application creation: Public API integration
  - Read and accept the terms if you're happy by pressing **Next**
4. Information:
  - Target environment: *Development*
  - Application name: [any name]
  - Application description: [any description]
  - Registered URLs: `https://my.home-assistant.io/redirect/oauth`
  - Change logo: Optional.

Once saved, the *ClientID* and *Secret* fields will be populated. You will need these in the next step.

{% details "I have manually disabled My Home Assistant" %}

If you don't have [My Home Assistant](/integrations/my) on your installation,
you can use `<HOME_ASSISTANT_URL>/auth/external/callback` as the redirect URI
instead.

The `<HOME_ASSISTANT_URL>` must be the same as used during the configuration/
authentication process.

Withings will validate (with HTTP HEAD) these requirements each time you save your Withings developer account. When these checks fail, the Withings UI is not always clear about why.

- Home Assistant (For create/update of Withings developer account):
    - Publicly accessible.
    - Running on a fully qualified domain name.
    - Running over HTTPS signed by a globally recognized Certificate Authority. Let's Encrypt will work.

{% enddetails %}

Note: You will only need one developer account; the same account and credentials are used for each Withings configuration.

{% include integrations/config_flow.md %}

## Data updates

The {% term integration %} automatically detects if you can use webhooks. This enables the {% term integration %} only to update when there is new data.
The binary sensor for sleep will only work if the {% term integration %} can establish webhooks with Withings.

## Available data

The {% term integration %} provides several entities, some of which are dynamically enabled if data is available.

For example, measurement sensors like weight only work when data has been registered in the last 14 days. So if you start using a new device, for example, to measure your temperature or you manually update a value in the app, the sensor automatically appears.

Sleep sensors are only created if the {% term integration %} can find sleep data for you within the last day.

Workout calendar and the workout and activity sensors show if the latest available data point is no older than 14 days.
