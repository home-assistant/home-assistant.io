---
title: CoolBot Pro
description: Instructions on how to integrate CoolBot Pro walk-in cooler controllers within Home Assistant.
ha_category:
  - Sensor
ha_release: 2026.9
ha_iot_class: Cloud Push
ha_config_flow: true
ha_codeowners:
  - '@strulock'
ha_domain: coolbot
ha_platforms:
  - diagnostics
  - sensor
ha_integration_type: hub
ha_quality_scale: bronze
---

The **CoolBot Pro** {% term integration %} brings [CoolBot Pro](https://www.storeitcold.com/) walk-in cooler controllers by Store It Cold into Home Assistant. Sign in with your CoolBot app account, and every cooler on the account appears as a device with temperature, set point, and signal sensors.

The integration is read-only: it cannot change the set point or any other setting on your CoolBot.

## Prerequisites

You need a CoolBot Pro account (the account used in the CoolBot mobile app) with at least one CoolBot Pro that has connected to Wi-Fi at least once.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Email:
  description: The email address of your CoolBot Pro account — the same one you use in the CoolBot app.
Password:
  description: The password of your CoolBot Pro account.
{% endconfiguration_basic %}

Credentials are verified against the CoolBot service before the entry is created. To change them later, use **Reconfigure** on the integration entry; if the password stops working, Home Assistant prompts for a new one automatically.

## Supported functionality

Each CoolBot Pro on the account becomes a device with the following sensors:

- **Room temperature**: The walk-in cooler's air temperature, at full precision (for example, `57.2 °F` where the app shows `57`).
- **Fin temperature**: The evaporator fin probe temperature.
- **Set point**: The configured target temperature.
- **Wi-Fi signal**: Signal strength in dBm (diagnostic, disabled by default).
- **Hardware status**: The CoolBot's own health string, normally `OK` (diagnostic).

The hardware reports temperatures in Fahrenheit; Home Assistant converts them to your configured unit system automatically. The °F/°C toggle in the CoolBot app is a local display setting and has no effect here.

## Data updates

The integration holds one connection open per account, and the CoolBot service pushes new readings every 12–15 seconds; the service is not polled.

If a CoolBot loses its connection, the cloud keeps serving its last known reading, so a stale value can look current. To avoid charting a temperature that has quietly stopped moving, measurement sensors become unavailable after two minutes without a new push. The set point sensor is exempt, since a configured target stays meaningful while the cooler is offline.

## Examples

{% include docs/paste_yaml_tip.md %}

### Automation: Alert when the walk-in cooler is too warm

Notifies you when the cooler stays above its safe temperature. This is worth setting up because the CoolBot app only notifies you while it has a connection to the cooler.

The threshold uses the temperature unit configured in Home Assistant, so `45` means 45 °F on a system set to Fahrenheit and 45 °C on a system set to Celsius. Adjust the value to suit your unit and your cooler: 45 °F is about 7 °C.

```yaml
automation:
  - alias: "Walk-in cooler too warm"
    triggers:
      - trigger: numeric_state
        entity_id: sensor.walk_in_cooler_room_temperature
        above: 45
        for: "00:15:00"
    actions:
      - action: notify.send_message
        target:
          entity_id: notify.my_device
        data:
          message: >-
            The walk-in cooler has been too warm for 15 minutes (currently
            {{ states('sensor.walk_in_cooler_room_temperature') }}
            {{ state_attr('sensor.walk_in_cooler_room_temperature', 'unit_of_measurement') }}).
```

### Automation: Alert when the walk-in cooler stops reporting

Notifies you when readings stop arriving, which is how a dead Wi-Fi link or an unplugged CoolBot shows up. A cooler that is no longer reporting cannot warn you that it is warming up.

```yaml
automation:
  - alias: "Walk-in cooler stopped reporting"
    triggers:
      - trigger: state
        entity_id: sensor.walk_in_cooler_room_temperature
        to: "unavailable"
        for: "00:05:00"
    actions:
      - action: notify.send_message
        target:
          entity_id: notify.my_device
        data:
          message: >-
            The walk-in cooler has stopped reporting. Check that it is powered
            on and still connected to Wi-Fi.
```

## Known limitations

- The integration is read-only. Changing the set point or other settings must be done in the CoolBot app.
- The CoolBot service has no documented API, so the service can change without warning. If that happens, the integration fails loudly rather than reporting wrong numbers.
- A cooler that has never connected to the CoolBot service gets no entities.

## Troubleshooting

If sensors stay unavailable, check the **Wi-Fi signal** sensor (disabled by default). Below about −80 dBm, expect dropouts; the CoolBot app warns below 15% on its own scale.

The integration supports downloading [diagnostics](/docs/configuration/troubleshooting/#download-diagnostics) from the device page. The download includes each cooler's data age, whether its readings are considered fresh, and the last disconnect time, with credentials and identifiers redacted.

## Removing the integration

This integration follows standard integration removal. No extra steps are required, and nothing on the CoolBot account is modified.

{% include integrations/remove_device_service.md %}

If a cooler is removed from your CoolBot account, its device can be deleted from the device page in Home Assistant once it stops being reported.
