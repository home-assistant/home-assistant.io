---
title: Withings
description: Instructions on how to integrate Withings health products within Home Assistant.
ha_category:
  - Health
  - Sensor
ha_release: 0.99
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@vangorra'
  - '@joostlek'
ha_domain: withings
ha_platforms:
  - binary_sensor
  - sensor
  - calendar
ha_integration_type: integration
---

The Withings integration consumes data from various health products produced by [Withings](https://www.withings.com).

## Create a Withings developer account

You must have a developer account to distribute the data. [Create a free developer account](https://account.withings.com/partner/add_oauth2).

Values for your account:

- Logo: Any reasonable picture will do.
- Description: Personal app for collecting my data.
- Contact Email: Your email address
- Callback Uri: `https://my.home-assistant.io/redirect/oauth`.
- Company: Home Assistant

Once saved, the "Client Id" and "Consumer Secret" fields will be populated. You will need these in the next step.

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

The integration will automatically detect if you can use webhooks. This will enable the integration only to update when there is new data.
The binary sensor for sleep will only work if the integration can establish webhooks with Withings.

## Available data

The integration provides several entities, some of which dynamically enabled based on the data present.

For example, measurement senors like weight will only work when there has been data registered for it in the last 14 days. So if you start using a new device, for example something to measure your temperature or you manually update a value in the app, the sensor will automatically appear.

Sleep sensors will only be created if the integration can find sleep data for you in the last day.

For the workout calendar and the workout and activity sensors, it's the same, but 14 days.

