---
title: EyeOnWater
description: Instructions on how to integrate EyeOnWater into Home Assistant.
ha_category:
  - Environment
  - Sensor
ha_release: '2023.09'
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@disforw'
ha_domain: eyeonwater
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: integration
---

Integrates EyeOnWater meters into Home Assistant.

[EyeOnWater](https://www.eyeonwater.com/) provides a sensor for measuring water flow usage for each meter attached to your account.

Requires a compatible smart meter and an EyeOnWater Dashboard login.

{% include integrations/config_flow.md %}
