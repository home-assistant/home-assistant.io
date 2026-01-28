---
title: Prana recuperators
description: Integration to control Prana recuperators.
ha_release: 2026.2
ha_iot_class: Local Polling
ha_codeowners:
  - @prana-dev-official
ha_domain: prana
ha_integration_type: integration
related:
  - url: https://prana.ua
    title: Prana
---

The **Prana recuperators** {% term integration %} lets you control your Prana recuperator. You can manage motors and their operating modes, and monitor a range of sensors provided by the device.

Use case: If you have a Prana recuperator and want to automate ventilation, monitor filter status, or integrate the recuperator with other Home Assistant automations, this integration helps you do that.

## Supported devices

- Devices with Wi‑Fi control and firmware version 47 or newer

## Unsupported devices

- Models without a local network interface
- Devices with firmware version 46 or below

## Prerequisites

1. Connect the Prana recuperator to the same local network as Home Assistant.

## Configuration

This integration is installed via a **config flow** and uses mDNS to discover devices on your local network. Setup is two clicks: select the discovered device and confirm to add it.

### Discovery

This integration is discovered automatically over mDNS. There is no user input step. Select the discovered device and confirm to add it.

## Supported functionality

### Entities

The integration exposes the following entities.

#### Switches

- **Auto**
  - Description: Enable automatic control
- **Auto+**
  - Description: Enhanced automatic mode with quieter operation
- **Winter**
  - Description: Winter mode for defrosting behavior
- **Heater**
  - Description: Turn on heater (if available)
- **Bound**
  - Description: Bind or synchronize both fans and related parameters



## Actions

The Prana integration supports standard Home Assistant switch actions and can be used in automations and scripts.

### Supported actions

The following actions are supported for all Prana switch entities:

- `switch.turn_on`
- `switch.turn_off`

### Example automation

Turn on Prana recuperator auto mode for weekend:

```yaml
description: "Turn on Prana recuperator auto mode for weekend"
mode: single
triggers:
  - trigger: time
    at: "00:00:00"
    weekday:
      - sat
      - sun
conditions: []
actions:
  - type: turn_on
    device_id: cd68b39c80e151000d12d7474d944ba1
    entity_id: 28014e751edb9977fa03eb3ecee02cbe
    domain: switch
```

## Data updates

The integration uses local polling. By default, Home Assistant polls the device every 10 seconds. If the device stops responding, entities are marked as *unavailable* until communication is restored.

## Known limitations

- No official support for some older Prana models
- Some indicators or device-specific details may only be available in the manufacturer's app
- This integration does not provide cloud or remote control

## Troubleshooting

### Device is not discovered

1. Make sure Home Assistant and the Prana device are on the same local network
2. Restart the device and Home Assistant
3. Check whether mDNS/LLMNR is allowed by your router

### Entities show as unavailable

- Check the device network connection
- Ensure the device is powered on and reachable; entities become available automatically when communication is restored

## Community notes

- If you have a model that does not work as expected, add a note in the repository or community and include the model and firmware version

## Removing the integration

This integration follows standard integration removal in Home Assistant. After you remove the integration from Home Assistant, we recommend checking the device settings in the Prana Online 2.0 app.
