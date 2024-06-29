---
title: Electric Kiwi
description: Instructions on how to set up the Electric Kiwi service in Home Assistant.
ha_category:
  - Energy
ha_release: '2023.8'
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@mikey0000'
ha_domain: electric_kiwi
ha_config_flow: true
ha_platforms:
  - select
  - sensor
ha_integration_type: hub
---

[Electric Kiwi](https://www.electrickiwi.co.nz/) is an independent power and broadband company in New Zealand, offering variable rates for peak, shoulder, and off-peak pricing with a selectable hour of free power. 

This integration uses the official [Electric Kiwi API](https://developer.electrickiwi.co.nz) to provide account information, including balances and savings, and to show and select your hour of free power.

{% include integrations/config_flow.md %}

{% note %}
The configuration uses `client_id` and `client_secret` provided to Home Assistant, so all you need to do is install the integration and authenticate using your account credentials. 
{% endnote %}
