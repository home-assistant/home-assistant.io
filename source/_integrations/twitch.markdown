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
---

The `twitch` platform will allow you to monitor [Twitch](https://www.twitch.tv/) channel status from within Home Assistant and setup automation based on the information.

## Setup Client ID

Create a new app at "Register Your Application" in the [Twitch developer portal](https://dev.twitch.tv/console/apps). Then get the __Client ID__ for the new application.

## Setup OAuth Token

To enable the follow and subscription attributes, the OAuth token is needed to get the right permissions on the Twitch API.
If you don't need those, ignore the configuration setting: `token`.

To get the OAuth token, visit the [OAuth Token Generator](https://twitchapps.com/tokengen/#), insert your __Client ID__ and `user_read user_subscriptions` inside __scopes__.

Before clicking Summit (the broken image below the form), visit the [Twitch dev console](https://dev.twitch.tv/console) and add a new application.

As __OAuth Redirect URLs__ add `https://twitchapps.com/tokengen/` and click __Create__
.
Back at the Token Generator, click the __Summit__ button, accept the consent screen and get your __OAuth Token__.

## Configuration

To use Twitch with your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  platform: twitch
  client_id: YOUR_TWITCH_CLIENT_ID
  channels:
    - channel1
    - channel2
```

{% configuration %}
client_id:
  description: Your Twitch client ID.
  required: true
  type: string
token:
  description: Your Twitch OAuth Token.
  required: false
  type: string
channels:
  description: List of channels names
  required: true
  type: list
{% endconfiguration %}
