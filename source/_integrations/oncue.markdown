---
title: Oncue by Kohler
description: Documentation about the oncue sensors.
ha_category:
  - Binary Sensor
  - Sensor
ha_iot_class: Cloud Polling
ha_release: 2022.2
ha_config_flow: true
ha_codeowners:
  - '@bdraco'
  - '@peterager'
ha_dhcp: true
ha_domain: oncue
ha_platforms:
  - binary_sensor
  - sensor
ha_integration_type: integration
---

The Oncue by Kohler integration will allow you to monitor the state of your [Oncue enabled Kohler generator](https://api.kohler.com/oncueplus/#/auth).

## Tested Devices

- 20RESA
- [24RCL](https://kohlerpower.com/en/residential/generators/product/24rcl)
- [38RCLB](https://kohlerpower.com/en/residential/generators/product/38rclb)
- [48RCLB](https://kohlerpower.com/en/residential/generators/product/48rclb)
- [60RCLA](https://kohlerpower.com/en/residential/generators/product/60rcla)
- [KG80R](https://kohlerpower.com/en/residential/generators/product/kg80r)

{% include integrations/config_flow.md %}

## Non-functional and Incorrect Entities

Different generators appear to support a different set of entities.  Examples for the 20RESA, without the engine heater option:  the engine coolant temperature sensor does not appear to actually exist, and it will show as 0C (32F), rather than e.g. `unavailable`.  Similarly, 0-ish values are shown for engine compartment temperature, current, all related (power) entities.   The total generated power entry shows an apparently fixed value that does not seem credible (18,285,792 kWh in one case, which is 18000 months of typical household usage!).   Similar behavior is seen for most of these entities on the official app.  With the engine heater option, at least some of these have useful values.

## Polling Considerations

Currently, the integration polls every 10 minutes.   Polling faster would have fresher data, use more resources and may increase the risk of Kohler blocking access to the API.  At one point a report of someone being banned (unknown if permanent) for polling too often (unknown how fast), but it is not currently known what faster rates are safe.

It is possible to fetch new values by calling the update service on the entities.  An example might be an automation that fires an update request once a minute while the generator is running; there is a report of this being ok.
