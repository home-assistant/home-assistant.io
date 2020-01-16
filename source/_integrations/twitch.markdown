---
title: Twitch
description: Instructions on how to integrate Twitch sensors into Home Assistant.
logo: twitch.png
ha_category:
  - Social
ha_release: '0.10'
ha_iot_class: Cloud Polling
---

The `twitch` platform will allow you to monitor [Twitch](https://www.twitch.tv/) channel status from within Home Assistant and setup automation based on the information.

## Setup

Create a new app at "Register Your Application" in the [Twitch developer portal](https://glass.twitch.tv/console/apps). Then get the **Client ID** for the new app.

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
channels:
  description: List of channels names
  required: true
  type: list
{% endconfiguration %}
