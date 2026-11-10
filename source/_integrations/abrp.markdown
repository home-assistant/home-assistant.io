---
title: A Better Routeplanner (ABRP)
description: Instructions on how to integrate A Better Routeplanner with Home Assistant.
ha_categories:
  - vehicles_transport.cars_evs
ha_release: 2026.11
ha_iot_class: Cloud Push
ha_config_flow: true
ha_codeowners:
  - '@mtandersson'
ha_domain: abrp
ha_platforms:
  - device_tracker
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

## Prerequisites

- An [A Better Routeplanner](https://abetterrouteplanner.com/) account.
- At least one vehicle in your ABRP garage.
- The [Home Assistant Cloud](/integrations/cloud/) integration loaded. It is included in `default_config:`, which is enabled by default. If you removed `default_config:` from your {% term "configuration.yaml" %}, add `cloud:` instead.

{% include integrations/config_flow.md %}

During setup, you sign in to ABRP and every vehicle in your ABRP garage is added to Home Assistant. Sign-in uses account linking provided by Home Assistant Cloud. This service is free and does not require a Home Assistant Cloud subscription, so you do not need API credentials or a developer app.

To monitor vehicles from more than one ABRP account, add the integration once for each account.

## Supported functionality

Each vehicle in your ABRP garage is added as one Home Assistant device.

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

### Device tracker

- **Location**: The last known GPS location of the vehicle. It is added when the vehicle first reports a position and is listed under **Diagnostic** on the device page.

### Controls

This is a read-only integration. It does not provide vehicle control actions like start charging, stop charging, climate control, or lock and unlock.

## A Better Routeplanner automation examples

With your vehicle's battery data in Home Assistant, you can react to charge levels in your automations. Here are a few ideas to get you started.

{% include docs/paste_yaml_tip.md %}

### Automation: Notify when the battery drops below 20%

Get a notification on your phone when your vehicle's battery level drops below 20%, so you remember to charge it.

- **Trigger**: Numeric state crossed threshold
  - **Entity**: The SoC sensor of your vehicle
  - **Below**: `20` 
- **Action**: Send a notification message
  - **Target**: My phone

{% details "YAML example for a low battery notification" %}

{% example %}
automation: |
  alias: "Notify low battery"
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
{% endexample %}

{% enddetails %}

### Automation: Turn off a charging outlet above 80%

Stop charging once your vehicle's battery level goes above 80% by turning off the smart outlet or switch that powers your charger. The automation runs when the **SoC** value rises past 80, so a reading of exactly 80% does not turn off the outlet.

- **Trigger**: Numeric state crossed threshold
  - **Entity**: The SoC sensor of your vehicle
  - **Above**: `80`
- **Action**: Turn off switch
  - **Target**: The switch for your charging outlet

{% details "YAML example for turning off a charging outlet above 80%" %}

{% example %}
automation: |
  alias: "Stop charging above 80%"
  triggers:
    - trigger: numeric_state
      entity_id: sensor.my_ev_soc
      above: 80
  actions:
    - action: switch.turn_off
      target:
        entity_id: switch.garage_ev_outlet
{% endexample %}

{% enddetails %}

## Data updates

Telemetry is pushed from ABRP in near real time when ABRP receives vehicle updates. If the live stream connection drops, the integration reconnects automatically.

Each sensor shows the newest value ABRP has for your vehicle. Some telemetry, like power and voltage, only changes while your vehicle is actively reporting, usually while driving or charging.

The device tracker updates when ABRP receives a new position for your vehicle.

The integration also checks your ABRP garage every hour. New vehicles, including vehicles shared with you, are added automatically, and their sensors appear when the vehicle first reports data. If you rename a vehicle in ABRP, its device name updates too, unless you renamed the device in Home Assistant. Vehicles that leave your garage are removed automatically. For details, see [Removing a vehicle](#removing-a-vehicle).

## Known limitations

### Vehicle controls

The integration is read-only and does not control your vehicle. To send commands to your vehicle, use the manufacturer integration for your vehicle, such as [Tesla Fleet](/integrations/tesla_fleet/), [Volvo](/integrations/volvo/), [Renault](/integrations/renault/), [Nissan Leaf](/integrations/nissan_leaf/), or [Subaru](/integrations/subaru/). The available commands, like charging, climate control, or locking, depend on the manufacturer integration and your vehicle.

### Telemetry availability

Data freshness depends on ABRP and your vehicle manufacturer data source. Some entities appear only after the first value is received.

### Vehicle location

The location is shown as ABRP reports it. For vehicles without a direct connection to ABRP, the position can come from the ABRP phone app, so the device tracker shows your phone's location instead.

### Vehicle make and model

If ABRP cannot provide the make and model for a vehicle, its device shows ABRP's raw vehicle type code instead. The hourly garage check updates the device when the make and model become available.

### Route planning

Route planning details, like destinations and charging stops, are not exposed.

## Troubleshooting

### A sensor is missing for one of my vehicles

If a sensor is missing, ABRP has usually not received that metric yet.

To resolve this issue:

1. Drive the vehicle or start charging.
2. Wait for ABRP to receive fresh telemetry.
3. Check Home Assistant again. New entities are added automatically.

### Authentication errors

If ABRP no longer accepts your sign-in, the entities become unavailable and Home Assistant asks you to sign in again.

To resolve this issue:

1. Confirm you can log in to your account at the [A Better Routeplanner](https://abetterrouteplanner.com/) website.
2. Go to {% my integrations title="**Settings** > **Devices & services**" %}.
3. Under **Attention required**, select **Reconfigure** on the **A Better Routeplanner** card, then confirm.
4. Sign in with the same ABRP account. If you sign in with a different account, re-authentication stops. To try again, select the three dots {% icon "mdi:dots-vertical" %} menu next to the entry, select **Reload**, then select **Reconfigure** again.

After you sign in, the integration reloads and your entities update again.

### Setup stops with a message about default_config

If setup stops and asks you to run Home Assistant with `default_config` enabled, the [Home Assistant Cloud](/integrations/cloud/) integration is not loaded. Add `default_config:` or `cloud:` to your {% term "configuration.yaml" %}, restart Home Assistant, and add the integration again.

### Sensor states appear stale

This is expected when a vehicle is parked and not reporting data. Each sensor keeps showing the newest value ABRP has.

Home Assistant shows the same data as the A Better Routeplanner app and website, so you can compare them. If the value looks just as old in ABRP, your vehicle has not sent fresh telemetry yet and there is nothing to fix in Home Assistant.

### Entities show as unavailable

Entities become unavailable when the integration can no longer authenticate with ABRP. To fix this, follow the steps in [Authentication errors](#authentication-errors). If ABRP cannot be reached when Home Assistant starts, entities stay unavailable until the integration connects. It retries automatically. During an ordinary connection interruption, entities keep their latest values while the integration reconnects.

If the issue continues, enable [debug logging](/docs/configuration/troubleshooting/#debug-logs-and-diagnostics), reproduce the issue, and include the logs in your issue report.

## Community notes

If you need help, use the [Home Assistant Community forums](https://community.home-assistant.io/) and share debug logs and details when possible.

## Removing the integration

This integration follows the standard integration removal process.

{% include integrations/remove_device_service.md %}

### Removing a vehicle

When a vehicle leaves your ABRP garage, Home Assistant removes its device and entities automatically. This happens when you remove the vehicle from your garage, or when the owner stops sharing it with you.

To avoid removing a vehicle by mistake, Home Assistant waits until the vehicle is missing from two hourly garage checks in a row, so removal can take up to about two hours. If ABRP cannot be reached during a check, nothing is removed.

If you removed all vehicles from your ABRP garage, Home Assistant does not remove them automatically. In that case, remove the integration entry for that ABRP account.

If you set up more than one ABRP account and a vehicle is shared with several of them, the vehicle is only removed from the account whose garage it left.

If the vehicle comes back to your garage, it is added again at the next garage check. Home Assistant restores your earlier customizations, such as names and areas.

You can also delete a vehicle yourself from its device page, but only after it has left your ABRP garage. A vehicle that is still in your garage cannot be deleted, because it would be added again at the next garage check.
