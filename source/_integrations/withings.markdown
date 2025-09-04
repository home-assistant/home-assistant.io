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
ha_dhcp: true
---

The **Withings** {% term integration %} consumes data from various health products produced by [Withings](https://www.withings.com).

## Prerequisites

- Withings account
- Withings app installed
- Withings device setup in the app
- [Withings developer account](#creating-a-withings-developer-account) to get a *ClientID* and *Secret* to connect to be able to get the data from the Withings cloud API

### Creating a Withings developer account

You must have a developer account to distribute the data.

{% note %}
  You only need one developer account. The same account and credentials are used for each Withings configuration.
{% endnote %}

1. [Create a free developer account](https://account.withings.com/partner/add_oauth2).
2. Make sure to select **Withings public cloud** (and not Withings US medical cloud or similar).
3. Select **Create an application**.
4. Under **Application creation**, select **Public API integration**.
   - Read and accept the terms and select **Next**.
5. Under **Information**:
   - **Target environment**: *Development*
   - **Application name**: [any name]
   - **Application description**: [any description]
   - **Registered URLs**: `https://my.home-assistant.io/redirect/oauth`
     - Do not test this URL. It won't work at this stage. It will be setup once you install the integration in Home Assistant.
   - **Change logo**: Optional
6. **Save** your changes.
   - Once saved, the *ClientID* and *Secret* fields will be populated.
   - Copy and store them in a save place. You will need these in the next step.

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

{% include integrations/config_flow.md %}

## Data updates

The {% term integration %} automatically detects if you can use webhooks. This enables the {% term integration %} only to update when there is new data.
The binary sensor for sleep will only work if the {% term integration %} can establish webhooks with Withings.

## Available data

The {% term integration %} provides several entities, some of which are dynamically enabled if data is available.

For example, measurement sensors like weight only work when data has been registered in the last 14 days. So if you start using a new device, for example, to measure your temperature or you manually update a value in the app, the sensor automatically appears.

Sleep sensors are only created if the {% term integration %} can find sleep data for you within the last day.

Workout calendar and the workout and activity sensors show if the latest available data point is no older than 14 days.
