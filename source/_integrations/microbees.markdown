---
title: microBees
description: Instructions on how to integrate microBees devices into Home Assistant.
ha_category:
  - Switch
ha_release: 0.1.0
ha_codeowners:
  - '@microBeesTech'
ha_config_flow: true
ha_domain: microbees
ha_iot_class: Cloud Polling
ha_platforms:
  - light
  - switch
ha_integration_type: integration
---

The `microbees` integration allows you to control your [microBees devices](https://www.microbees.com/) such as plugs, wall switches and bulbs.
To use this integration you need OAuth2 Client ID and Client Secret and your user credentials.

To retrieve the OAuth2 Client ID and Client Secret go to [microBees Developer Dashboard](https://developers.microbees.com/dashboard), login with your microBees account and [create a new app](https://developers.microbees.com/dashboard/?p=wizard), choose a Label, select WebApplication and input https://my.home-assistant.io as Website URL.

There is currently support for the following device types within Home Assistant:

- **Switch**

{% include integrations/config_flow.md %}
