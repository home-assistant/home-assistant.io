---
title: Fujitsu FGLair
description: Control your Fujitsu heat pump or air conditioner that uses the FGLair app
ha_category:
  - Climate
ha_release: 2024.9.2
ha_domain: fujitsu_fglair
ha_integration_type: integration
ha_codeowners:
  - '@crevetor'
ha_config_flow: true
ha_platforms:
  - climate
ha_iot_class: "Cloud Polling"
---

The {{ page.title }} {% term integration %} provides support for Fujitsu heat pumps and air conditioners that use the FGLair app.
You can check [this link](https://www.fujitsu-general.com/global/support/faq/airstage-mobile/0127.html) to know which app to use for your heat pump.

## Prerequisite

First, set up your device in the FGLair app before using this integration.
To configure this integration, you will need the credentials (login and password) used to connect to the FGLair application.

{% include integrations/config_flow.md %}
