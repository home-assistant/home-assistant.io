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
ha_quality_scale: bronze
---

[Electric Kiwi](https://www.electrickiwi.co.nz/) is an independent power and broadband company in New Zealand, offering variable rates for peak, shoulder, and off-peak pricing with a selectable hour of free power. 

This integration uses the official [Electric Kiwi API](https://developer.electrickiwi.co.nz) to provide account information, including balances and savings, and to show and select your hour of free power.

{% include integrations/config_flow.md %}

{% note %}
The configuration uses `client_id` and `client_secret` provided to Home Assistant, so all you need to do is install the integration and authenticate using your account credentials. 
{% endnote %}


## Supported functionality

The integration provides `sensor` entities with account balances, billing, and hour of free power start and end time. It also provides a `select` entity to change the hour of free power.

## Use cases

This integration can be used as part of an automation, for example, to turn on/off appliances automatically.

## Example automations

{% details "Run the heat pump during the hour of free power" %}

{% raw %}

```yaml
alias: "Turn on expensive heat pump"
description: "Turn on the heat pump when the hour of free power starts"
triggers:
  - at: sensor.hour_of_free_power_start
    trigger: time
actions:
  - action: climate.turn_on
    target:
      entity_id: climate.heat_pump
    data: {}
```

```yaml
alias: "Turn off expensive heat pump"
description: "Turn off the heat pump when the hour of free power ends"
triggers:
  - at: sensor.hour_of_free_power_end
    trigger: time
actions:
  - action: climate.turn_off
    target:
      entity_id: climate.heat_pump
    data: {}
```

{% endraw %}
{% enddetails %}

## Remove integration

This integration follows standard integration removal, no extra steps are required.

{% include integrations/remove_device_service.md %}
