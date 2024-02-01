---
title: Fujitsu HVAC (based on Ayla IOT platform)
description: Control your Fujitsu heat pump based on Ayla IoT platform (if you're using the FGLair app, this is for you)
ha_category:
  - Climate
ha_release: 2024.2.8
ha_domain: fujitsu_hvac
ha_integration_type: integration
ha_codeowners:
  - '@crevetor'
ha_config_flow: true
ha_platforms:
  - climate
ha_iot_class: "Cloud Polling"
---

The {{ page.title }} {% term integration %} provides support for Fujitsu heat pumps that use the Ayla IoT platform (if you are using the FGLair mobile application to control your heat pump, this integration is for you).
You can check [this link](https://www.fujitsu-general.com/global/support/faq/airstage-mobile/0127.html) to know which app to use for your heat pump.

## Prerequisite

You need to first setup your device in the FGLair app before you can use this integration.
In order to configure this integration you will need the credentials (login and password) that you used to connect to the FGLair application.

{% include integrations/config_flow.md %}
