---
title: Twitch
description: Instructions on how to integrate Twitch sensors into Home Assistant.
ha_category:
  - Social
ha_release: '0.10'
ha_iot_class: Cloud Polling
ha_domain: twitch
ha_platforms:
  - sensor
ha_integration_type: integration
---

The `twitch` platform will allow you to monitor [Twitch](https://www.twitch.tv/) channel status from within Home Assistant and setup automation based on the information.

## Setup

Create a new app at "Register Your Application" in the [Twitch developer portal](https://dev.twitch.tv/console/apps). Then get the __Client ID__ and __Client Secret__ for the new application.

## Configuration

You can then add the integration in the frontend via the steps below.

{% include integrations/config_flow.md %}

The integration configuration will ask for the *Client ID* and *Client Secret* created above. See [Application Credentials](/integrations/application_credentials) for more details.

