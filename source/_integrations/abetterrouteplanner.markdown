---
title: A Better Routeplanner (ABRP)
description: Instructions on how to integrate A Better Routeplanner with Home Assistant.
ha_category:
  - Car
  - Sensor
ha_release: 2026.6
ha_iot_class: Cloud Push
ha_config_flow: true
ha_codeowners:
  - '@mtandersson'
ha_domain: abetterrouteplanner
ha_platforms:
  - sensor
ha_integration_type: hub
ha_quality_scale: bronze
related:
  - docs: /integrations/tesla_fleet/
    title: Tesla Fleet
  - docs: /integrations/volvo/
    title: Volvo
  - docs: /integrations/renault/
    title: Renault
  - docs: /integrations/nissan_leaf/
    title: Nissan Leaf
  - docs: /integrations/subaru/
    title: Subaru
---

The **A Better Routeplanner (ABRP)** {% term integration %} connects your ABRP account to Home Assistant, so you can monitor your electric vehicles in one place.

## Use cases

Use this integration to track battery level and range, then use that data in dashboards and automations.

## Supported devices

This integration works with electric vehicles supported by the [A Better Routeplanner](https://abetterrouteplanner.com/) cloud service and added to your ABRP garage.

ABRP supports many models across brands like Tesla, Rivian, Hyundai, Kia, BMW, Audi, Mercedes-Benz, Ford, Volkswagen, Polestar, and Volvo.

The integration does not connect to your vehicle directly. It uses the telemetry ABRP already has for your vehicle.

## Unsupported devices

- Non-electric vehicles.
- Vehicles that are not added to your ABRP garage.
- Vehicles that are in your ABRP garage but have not sent telemetry yet.

## Prerequisites

- An [A Better Routeplanner](https://abetterrouteplanner.com/) account.
- At least one vehicle in your ABRP garage.

{% include integrations/config_flow.md %}

During setup, you sign in to ABRP and select which vehicles you want to add to Home Assistant. Home Assistant handles authentication for you, so you do not need API credentials or a developer app.

To monitor vehicles from more than one ABRP account, add the integration once for each account.

## Supported functionality

Each selected vehicle is added as one Home Assistant device.

Telemetry entities are added as data becomes available. If ABRP has not received a specific metric yet, that entity appears after the first update.

### Device card model name

The device card shows a human-friendly vehicle name when ABRP has a catalog match. If no match is available, Home Assistant falls back to ABRP's raw type code identifier.

### Sensors

- **SoC**: Battery charge percentage.
- **SoE**: Estimated battery energy.
- **Range**: Estimated remaining driving range.
- **Power**: Current charging or discharging power.
- **Charging state**: Whether the vehicle is charging and how. Possible states are:

    - **Charging (AC)**
    - **Charging (DC)**
    - **Charging**: The vehicle is charging, but the charging type is unknown.
    - **Plugged in**
    - **Not charging**
- **Voltage**: Battery pack voltage.
- **Battery temperature**: Battery pack temperature.
- **Odometer**: Total distance driven.
- **Calibrated ref cons**: ABRP's calibrated [reference consumption](https://abrp.featurebase.app/articles/3305478-reference-consumption) for the vehicle, in energy per distance. A steady-state baseline tuned from live data, not real-time consumption.
- **State of health**: Estimated battery health percentage.
- **Battery capacity**: Estimated usable battery capacity.

### Update behavior

Some telemetry, like power and voltage, updates only while your vehicle is actively reporting data, usually while driving or charging.

When your vehicle is parked and not reporting, Home Assistant keeps the last known value instead of marking the entity unavailable.

For troubleshooting, entity attributes include `last_reported_at` and `provider`, so you can verify how recent the value is and where ABRP received it from.

### Controls

This is a read-only integration. It does not provide vehicle control actions like start charging, stop charging, climate control, or lock and unlock.

## Examples

You can use ABRP entities in automations created from the automation editor.

### Notify when the battery drops below 20% (UI)

To create this automation from the Home Assistant interface:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Select **Create automation**, then select **Create new automation**.
3. Under **When**, select **Add trigger**, then **Entity** > **Numeric state**.
4. Set **Entity** to the **SoC** sensor for your vehicle.
5. Set **Below** to `20`.
6. Under **Then do**, select **Add action**, then select **Send a notification message**.
7. Under **Targets**, select **Add target** and choose your phone.
8. In the **Message** field, enter a message such as `Battery low: {{ states('sensor.my_ev_soc') }}% remaining.`
9. Save the automation.

### Notify when the battery drops below 20% (YAML)

```yaml
automation:
  - alias: "Notify low battery"
    triggers:
      - trigger: numeric_state
        entity_id: sensor.my_ev_soc
        below: 20
    actions:
      - action: notify.send_message
        target:
          entity_id: notify.my_phone
        data:
          message: "Battery low: {{ states('sensor.my_ev_soc') }}% remaining."
```

### Turn off a charging outlet at 80%

```yaml
automation:
  - alias: "Stop charging at 80%"
    triggers:
      - trigger: numeric_state
        entity_id: sensor.my_ev_soc
        above: 80
    conditions:
      - condition: numeric_state
        entity_id: sensor.my_ev_power
        above: 1000
    actions:
      - action: switch.turn_off
        target:
          entity_id: switch.garage_ev_outlet
```

## Data updates

Telemetry is pushed from ABRP in near real time when ABRP receives vehicle updates. If the live stream connection drops, the integration reconnects automatically.

Your ABRP garage list is read when you set up the integration. To pick up vehicles you add, remove, or rename in ABRP, reload the integration.

## Known limitations

- The integration is read-only and does not control your vehicle.
- Data freshness depends on ABRP and your vehicle manufacturer data source.
- Some entities appear only after the first value is received.
- Route planning details, like destinations and charging stops, are not exposed.

## Related integrations

This integration is telemetry-only. To send commands to your vehicle (start or stop charging, climate control, lock or unlock), use the manufacturer or service integration for your vehicle:

- [Tesla Fleet](/integrations/tesla_fleet/)
- [Volvo](/integrations/volvo/)
- [Renault](/integrations/renault/)
- [Nissan Leaf](/integrations/nissan_leaf/)
- [Subaru](/integrations/subaru/)

A Better Routeplanner pairs well with these integrations: keep ABRP for multi-brand telemetry, and use the manufacturer integration for vehicle controls.

## Troubleshooting

### A sensor is missing for one of my vehicles

If a sensor is missing, ABRP has usually not received that metric yet.

To resolve this issue:

1. Drive the vehicle or start charging.
2. Wait for ABRP to receive fresh telemetry.
3. Check Home Assistant again. New entities are added automatically.

### Authentication errors during setup

If your ABRP session expires, Home Assistant shows a notification asking you to reauthenticate. Select it and sign in to ABRP again to restore the connection.

If reauthentication fails repeatedly:

1. Confirm you can log in to your account at the [A Better Routeplanner](https://abetterrouteplanner.com/) website.
2. Remove the integration and add it again.

### Sensor states appear stale

This is expected when a vehicle is parked and not reporting data.

To check when ABRP last received telemetry, open the sensor and look at its `last_reported_at` attribute.

### The integration shows as unavailable

This can happen if internet connectivity is interrupted, ABRP is temporarily unavailable, or authentication failed.

If the issue continues, enable [debug logging](/docs/configuration/troubleshooting/#debug-logs-and-diagnostics), reproduce the issue, and include the logs in your issue report.

## Community notes

If you need help, use the [Home Assistant Community forums](https://community.home-assistant.io/) and share debug logs and details when possible.

## Removing the integration

This integration follows the standard integration removal process.

{% include integrations/remove_device_service.md %}
