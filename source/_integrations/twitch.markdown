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
ha_codeowners:
  - '@joostlek'
ha_config_flow: true
---

The Twitch integration will allow you to monitor [Twitch](https://www.twitch.tv/) channel status from within Home Assistant and setup automation based on the information.

## Get Twitch application credentials

Create a new app at **Register Your Application** in the [Twitch developer portal](https://dev.twitch.tv/console/apps):

- Enter a **Name** for your app. Note that it needs to be unique all over Twitch.
- Enter `https://my.home-assistant.io/redirect/oauth` in the **OAuth Redirect URL** field. 
- Get the **Client ID** and **Client secret** from the new application, you need them to complete the integration setup in Home Assistant. 

{% include integrations/config_flow.md %}
