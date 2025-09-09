---
title: Vitrea
description: Instructions on how to integrate Vitrea home automation devices with Home Assistant.
ha_category:
  - Cover
  - Switch
  - Number
ha_release: 2025.9
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - "@solangek"
ha_domain: vitrea
ha_platforms:
  - cover
  - number
  - switch
ha_integration_type: hub
---

The **Vitrea** {% term integration %} allows you to control Vitrea home automation devices through Home Assistant. This integration supports switches, covers (blinds), and timer (boiler) controls for your Vitrea system.

## Prerequisites

- A Vitrea hub connected to your local network
- The Vitrea hub must be accessible via TCP/IP
- Default connection uses port 11502

{% include integrations/config_flow.md %}

The integration will automatically discover and add all available devices connected to your Vitrea hub. The process can take a couple minutes depending on the number of devices.

## Supported devices

The Vitrea integration supports the following device types:

### Switches

- Standard on/off switches
- Timer-enabled switches with configurable duration (0-120 minutes)

### Covers (Blinds)

- Open, close, and stop controls
- Position control (0-100%)
- Current position feedback

### Number entities (timers)

- Timer controls for switches that support timed operation
- Range: 0-120 minutes
- Used to set default timer duration for associated switches

## Services

### Timer Service

The integration provides a `vitrea.set_timer` service for switches with timer functionality:

```yaml
service: vitrea.set_timer
target:
  entity_id: switch.vitrea_switch_01_01
data:
  minutes: 30
```

## Device Management

All Vitrea devices are automatically grouped under their respective hub device in the device registry. The integration supports:

- **Automatic device discovery**: New devices are detected automatically
- **Real-time updates**: Device states are updated in real-time via the Vitrea hub
- **Assumed state**: Entities use assumed state for reliable operation

## Troubleshooting

### Connection Issues

- Ensure your Vitrea hub is powered on and connected to the network.
- Verify the IP address and port are correct.
- Check that no firewall is blocking communication on the specified port

### Device Not Appearing

- Wait a few moments for automatic discovery to complete
- Restart the Vitrea hub if devices are not detected
- Check the Vitrea hub's device configuration

### Timer Functions Not Working

- Ensure the switch supports timer functionality
- Verify the timer range is within 0-120 minutes
- Check that the associated timer number entity is properly configured

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
