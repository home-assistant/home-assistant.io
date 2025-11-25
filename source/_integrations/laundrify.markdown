---
title: laundrify
description: Instructions on how to integrate laundrify within Home Assistant.
ha_category:
  - Binary sensor
ha_release: 2022.6
ha_iot_class: Cloud Polling
ha_domain: laundrify
ha_platforms:
  - binary_sensor
  - sensor
ha_codeowners:
  - '@xLarry'
ha_config_flow: true
ha_integration_type: integration
---

Monitor the status of your washing machine or dryer within Home Assistant using a [laundrify](https://laundrify.de/) WiFi power plug.

The following platforms/entities are currently supported by the integration:

- Binary sensor
  - Wash Cycle (_running_/_not running_)
- Sensor
  - Power (latest measurement in _Watts_)
  - Energy (total consumption in _kWh_)

## Generate an Auth Code

*Please note that the laundrify App v1.12.0 is required to activate the Home Assistant integration.*

The integration requires an Auth Code to complete the account linking. Open the laundrify App and tap on `Home Assistant -> Integration aktivieren` to generate your code.

<p class='img'>
  <img src='/images/integrations/laundrify/generate-code.png' alt='Screenshot: generate an Auth Code in the laundrify App'>
</p>

Your code will expire within 60 minutes after activation. Make sure to configure your integration in time.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Code:
  description: "Auth Code that can be obtained in the laundrify App (see above), e.g., `123-456`."
{% endconfiguration_basic %}
