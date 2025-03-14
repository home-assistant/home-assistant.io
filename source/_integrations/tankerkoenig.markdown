---
title: Tankerkoenig
description: Instructions on how to integrate Tankerkoenig sensors within Home Assistant.
ha_category:
  - Energy
  - Sensor
ha_release: 0.107
ha_iot_class: Cloud Polling
ha_domain: tankerkoenig
ha_codeowners:
  - '@guillempages'
  - '@mib1185'
  - '@jpbede'
ha_platforms:
  - binary_sensor
  - diagnostics
  - sensor
ha_config_flow: true
ha_integration_type: integration
---

The `tankerkoenig` platform allows you to monitor the fuel prices with [tankerkoenig.de](https://www.tankerkoenig.de/) from within Home Assistant and setup automations based on the information.
To use this sensor you need an API key from tankerkoenig. Go to [tankerkoenig API](https://creativecommons.tankerkoenig.de) and click on API-KEY in the top right, fill out the form and request a key. The API is free, but requests should be limited to less than once every 5 minutes.

{% include integrations/config_flow.md %}

{% important %}
The Terms & Conditions of tankerkoenig.de specify that the API is not meant for massive data fetching, but it does not explicitly mention a limit. Having a maximum of 10 monitored fuel stations is recommended, and a warning will be issued otherwise.
{% endimportant %}
