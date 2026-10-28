---
title: Chef iQ
description: Instructions on how to integrate Chef iQ wireless probes with Home Assistant.
ha_categories:
  - appliances_cleaning.cooking
ha_release: 2026.7
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@Invader444'
ha_domain: chef_iq
ha_integration_type: device
ha_platforms:
  - sensor
ha_bluetooth: true
ha_quality_scale: bronze
---

The **Chef iQ** {% term integration %} lets you read the temperatures from Chef iQ wireless cooking probes directly over Bluetooth Low Energy. No cloud account, base station, or hub is required: the probe broadcasts its readings and Home Assistant listens passively.

## Supported devices

The following Chef iQ wireless probes are supported:

- Chef iQ Smart Wireless Meat Thermometer (CQ60)
- Chef iQ Smart Wireless Meat Thermometer (CQ50)

The **iQ Sense** base station broadcasts under the same Bluetooth identifier, but it is a Wi-Fi appliance rather than a passive probe and is not supported by this integration.

## Prerequisites

This integration requires a working [Bluetooth](/integrations/bluetooth/) setup, either a local Bluetooth adapter or an [ESPHome Bluetooth proxy](/integrations/esphome/). The probe is battery-powered and only broadcasts while it is awake, so make sure it is awake (for example, by taking it off its charging dock) before adding it.

{% include integrations/config_flow.md %}

## Supported functionality

The **Chef iQ** {% term integration %} provides the following {% term entities %}.

### Sensors

A probe exposes the following sensors:

- **Food temperature**: the food (internal) temperature at the probe tip.
- **Ambient temperature**: the ambient (cooking environment) temperature.
- **Probe tip 1 through 4 temperatures**: the temperatures measured along the probe shaft ([disabled by default](/docs/configuration/customizing-entities/#disabling-or-enabling-an-entity)).
- **Battery**: the probe battery percentage.
- **SoC temperature**: the temperature of the probe's system-on-chip (SoC), its internal electronics (diagnostic, disabled by default).
- **Signal strength**: the Bluetooth signal strength (diagnostic, disabled by default).

## Use cases

- Follow a long cook from anywhere in the house: put the food and ambient temperatures on a dashboard and let Home Assistant tell you when the roast reaches its target, instead of walking back to the grill or keeping your phone awake.
- Catch a dying fire or a runaway smoker: get a notification when the ambient temperature drifts out of the range you want, even when you are nowhere near the probe.
- Keep a record of your cooks: the temperature history shows how the food and the cooking environment progressed, which helps to repeat a good cook or fix a bad one.
- Know when to charge: get a reminder when the probe battery runs low, so it is ready for the next cook.

## Examples

{% include docs/paste_yaml_tip.md %}

The entity IDs below belong to a probe named `CQ60 079A`; replace them with the ones of your probe.

### Automation: Notify when the food is done

Waiting next to the grill is no fun. Send a notification when the food core temperature reaches the target, 63 °C for a roast in this example.

- **Trigger**: Numeric state
  - **Entity**: Food temperature (`sensor.cq60_079a_food_temperature`)
  - **Above**: `63`
- **Action**: Send a notification
  - **Target**: My phone (`notify.mobile_app_phone`)
  - **Message**: The current food temperature

{% details "YAML example for notifying when the food is done" %}

{% example %}
automation: |
  alias: "Roast is done"
  triggers:
    - trigger: numeric_state
      entity_id: sensor.cq60_079a_food_temperature
      above: 63
  actions:
    - action: notify.mobile_app_phone
      data:
        message: >
          Roast is at {{ states('sensor.cq60_079a_food_temperature') }} °C.
          Time to take it out.
{% endexample %}

{% enddetails %}

### Automation: Warn when the smoker drifts out of range

A fire that dies down or runs away ruins a long cook. Send a notification when the ambient temperature stays below or above your smoking range for five minutes.

- **Trigger**: Numeric state
  - **Entity**: Ambient temperature (`sensor.cq60_079a_ambient_temperature`)
  - **Below**: `100`
  - **For**: 5 minutes
- **Trigger**: Numeric state
  - **Entity**: Ambient temperature (`sensor.cq60_079a_ambient_temperature`)
  - **Above**: `135`
  - **For**: 5 minutes
- **Action**: Send a notification
  - **Target**: My phone (`notify.mobile_app_phone`)
  - **Message**: `The smoker is out of range. Check the fire.`

{% details "YAML example for warning when the smoker drifts out of range" %}

{% example %}
automation: |
  alias: "Smoker temperature out of range"
  triggers:
    - trigger: numeric_state
      entity_id: sensor.cq60_079a_ambient_temperature
      below: 100
      for: "00:05:00"
    - trigger: numeric_state
      entity_id: sensor.cq60_079a_ambient_temperature
      above: 135
      for: "00:05:00"
  actions:
    - action: notify.mobile_app_phone
      data:
        message: "The smoker is out of range. Check the fire."
{% endexample %}

{% enddetails %}

### Automation: Remind yourself to charge the probe

A flat probe on cook day is annoying. Send a notification when the battery drops below 20%.

- **Trigger**: Numeric state
  - **Entity**: Battery (`sensor.cq60_079a_battery`)
  - **Below**: `20`
- **Action**: Send a notification
  - **Target**: My phone (`notify.mobile_app_phone`)
  - **Message**: `The meat probe battery is below 20%. Put it back on its dock.`

{% details "YAML example for reminding yourself to charge the probe" %}

{% example %}
automation: |
  alias: "Charge the meat probe"
  triggers:
    - trigger: numeric_state
      entity_id: sensor.cq60_079a_battery
      below: 20
  actions:
    - action: notify.mobile_app_phone
      data:
        message: >
          The meat probe battery is below 20%. Put it back on its dock.
{% endexample %}

{% enddetails %}

## Data updates

The integration is passive: it never polls or connects to the probe. Entities update whenever Home Assistant receives one of the probe's Bluetooth advertisements, which the probe broadcasts while it is awake. The battery level and <abbr title="system-on-chip">SoC</abbr> temperature are sent in a separate advertisement from the cooking temperatures (food, ambient, and probe tip), so they may appear a few seconds later after setup. When the probe stops broadcasting, for example once it is docked and asleep, the entities keep their last readings and are flagged as assumed state until the probe is seen again.

## Known limitations

The integration is passive and read-only. It reports the probe's broadcast readings, but cannot start cooks, set target temperatures, or change probe settings. Those features require the Chef iQ app.

## Troubleshooting

If the device is not discovered, try the following:

1. Make sure that the probe is awake and broadcasting (take it off its dock).
2. Make sure your Bluetooth adapter or proxy is in range of the probe.
3. Make sure the [Bluetooth](/integrations/bluetooth/) integration is set up and working.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
