---
title: Gaposa
description: Instructions on how to integrate Gaposa motorized blinds and shades into Home Assistant.
ha_category:
  - Cover
ha_release: 2024.5
ha_domain: gaposa
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@mwatson2'  # Replace with your GitHub username
ha_platforms:
  - cover
  - sensor
ha_integration_type: integration
---

This Gaposa integration support control of [Gaposa](https://www.gaposa.it/eng) blinds and shades.

The integration communicates with the blinds via the same cloud service and account as the [Gaposa RollApp mobile application](https://www.gaposa.it/eng/news/rollapp/). You will need the mobile application and the [LinkIt hub](https://www.gaposa.it/eng/prod/?residential/electronics/control-units/home-automation/linkit).

There is currently support for the following device types within Home Assistant:

- Cover (blinds/shades)

{% include integrations/config_flow.md %}

## Prerequisites

- Gaposa Hub configured and connected to your local network
- Gaposa API key for cloud service access
- Gaposa account (same as used for RollApp application)

## Features

The integration supports the following features:

- Open/Close/Stop operations
- Position and motion reporting (inferred)

## Supported Devices

This integration supports Gaposa motors.

## Configuration

The integration can be configured through the UI by going to **Settings** > **Devices & Services** > **Add Integration** and searching for "Gaposa".

During setup you will need to provide:

1. Gaposa API key for cloud service access
2. Your username and password for ther RollApp app

Use the RollApp app first to set up and name your devices. The Home Assistant integration will pull the device list and names from the app. If you make changes to the device list or device names in the mobile application you will need to restart the Gaposa integration to pick these up.

## Troubleshooting

### Connection Issues

If you experience connection issues:

1. Connect your phone to the same network as Home Assistant, disable cellular
2. Verify that you can log in to the RollApp application on your phone and control the blinds from there
- If not, follow troubleshooting instructions for RollApp

## Example Automations

### Close Blinds at Sunset

```yaml
alias: "Close Blinds at Sunset"
trigger:
  - platform: sun
    event: sunset
action:
  - service: cover.close_cover
    target:
      entity_id: cover.gaposa_living_room
```

### Open Blinds in the Morning

```yaml
alias: "Morning Blinds"
trigger:
  - platform: time
    at: "07:00:00"
condition:
  - condition: time
    weekday:
      - mon
      - tue
      - wed
      - thu
      - fri
action:
  - service: cover.open_cover
    target:
      entity_id: cover.gaposa_bedroom
```