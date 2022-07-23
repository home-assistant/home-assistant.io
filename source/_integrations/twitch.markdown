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

Set the OAuth Redirect URL to: `https://my.home-assistant.io/redirect/oauth`

{% details "I have manually disabled My Home Assistant" %}

If you don't have [My Home Assistant](/integrations/my) on your installation,
you can use `<HOME_ASSISTANT_URL>/auth/external/callback` as the redirect URI
instead.

The `<HOME_ASSISTANT_URL>` must be the same as used during the configuration/
authentication process.

Internal examples: `http://192.168.0.2:8123/auth/external/callback`, `http://homeassistant.local:8123/auth/external/callback`." 

{% enddetails %}

{% include integrations/config_flow.md %}

The integration configuration will ask for the *Client ID* and *Client Secret* created above. See [Application Credentials](/integrations/application_credentials) for more details.
