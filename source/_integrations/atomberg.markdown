---
title: Atomberg
description: Instructions on how to integrate Atomberg fans with Home Assistant.
ha_categories:
  - climate.fans_ventilation
ha_release: 2026.12
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@ratulbmg'
ha_domain: atomberg
ha_platforms:
  - fan
ha_integration_type: hub
ha_quality_scale: bronze
related:
  - url: https://developer.atomberg-iot.com/
    title: Atomberg developer portal
  - url: https://github.com/home-assistant/core/issues?q=label%3A%22integration%3A+atomberg%22
    title: Issues list for the Atomberg integration
---

The **Atomberg** {% term integration %} connects Home Assistant to your [Atomberg](https://atomberg.com/) smart fans through the Atomberg cloud. You can turn your fans on and off and set their speed from Home Assistant, and use them in your automations.

## Supported devices

The integration supports Atomberg smart fans that work with the [Atomberg public API](https://developer.atomberg-iot.com/).

## Prerequisites

You need an API key and a refresh token from your Atomberg account.

1. Install the **Atomberg Home** app and add your devices to it.
2. In the app, enable developer mode.
3. Generate your API key and refresh token. See the [Atomberg developer portal](https://developer.atomberg-iot.com/) for the current steps.

Keep your API key and refresh token private. Anyone who has them can control your devices.

{% include integrations/config_flow.md %}

{% configuration_basic %}
API key:
  description: "The API key you generated in the Atomberg Home app."
Refresh token:
  description: "The refresh token you generated in the Atomberg Home app."
{% endconfiguration_basic %}

After you enter your credentials, Home Assistant adds all fans on your account.

## Supported functionality

The **Atomberg** integration provides the following entities for each fan on your account.

### Fans

- **Fan**
  - **Description**: Turn the fan on and off, and set its speed (6 speeds).
  - **Available for**: Atomberg smart fans.

## Data updates

The **Atomberg** integration {% term polling polls %} the Atomberg cloud every 30 minutes. One request returns the state of all your fans.

When you change something in Home Assistant, the integration shows the new value right away. It does not request an update again.

Atomberg limits the public API to 100 requests per day for your account. The Atomberg Home app and other tools that use the same account count toward this limit. Because of this, changes you make outside Home Assistant, for example with the app or a remote, can take up to 30 minutes to show up.

## Known limitations

- The integration needs an internet connection. The Atomberg public API does not offer local control.
- State changes made outside Home Assistant can take up to 30 minutes to appear. See [Data updates](#data-updates).

## Troubleshooting

{% details "Can't set up the integration" %}

### Symptom: "Invalid authentication"

When you set up the integration, the form shows the message "Invalid authentication".

#### Description

The API key or refresh token isn't valid. They might be mistyped, expired, or from a different account.

#### Resolution

1. Generate a new API key and refresh token in the Atomberg Home app.
2. Enter them again, copying them carefully.

{% enddetails %}

{% details "Home Assistant asks me to re-authenticate" %}

### Symptom: A repair or notification asks you to sign in again

#### Description

Atomberg rejected your credentials. This can happen when the refresh token is replaced or expires.

#### Resolution

1. Generate a new API key and refresh token in the Atomberg Home app.
2. Go to {% my integrations title="**Settings** > **Devices & services**" %} and select the **Atomberg** integration.
3. Follow the prompt to re-authenticate. Use credentials from the same Atomberg account.

{% enddetails %}

{% details "Values are slow to update or commands fail" %}

### Symptom: Values don't update, or commands stop working

#### Description

The Atomberg public API allows 100 requests per day. If other tools or the Atomberg Home app use the same account, you can reach this limit.

#### Resolution

Wait until the limit resets, and avoid other tools that use the same API key.

{% enddetails %}

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

After deleting the integration, you can also revoke or regenerate your API key and refresh token in the Atomberg Home app.
