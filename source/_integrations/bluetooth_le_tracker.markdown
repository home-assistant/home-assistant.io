---
title: Bluetooth LE Tracker
description: Instructions for integrating bluetooth low-energy tracking within Home Assistant.
ha_category:
  - Presence detection
ha_iot_class: Local Push
ha_release: 0.27
ha_domain: bluetooth_le_tracker
ha_platforms:
  - device_tracker
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

This tracker discovers new devices on boot and in regular intervals and tracks Bluetooth low-energy devices periodically based on interval_seconds value. It is not required to pair the devices with each other.

Devices discovered are stored with 'BLE_' as the prefix for device mac addresses in `known_devices.yaml`.

## Setup

This {% term integration %} requires the [Bluetooth](/integrations/bluetooth) integration to be enabled and functional.

## Configuration

To use the Bluetooth tracker in your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: bluetooth_le_tracker
```

{% configuration %}
track_new_devices:
  description: If new discovered devices are tracked by default.
  required: false
  default: false
  type: boolean
track_battery:
  description: Whether the integration should try to read the battery status for tracked devices.
  required: false
  default: false
  type: boolean
track_battery_interval:
  description: Minimum interval to ask the device for its battery status. The battery status will be checked at most once every interval. If `track_battery` is false, this will be ignored.
  required: false
  default: 1 day
  type: time
interval_seconds:
  description: Seconds between each scan for new devices.
  required: false
  default: 12
  type: integer
{% endconfiguration %}

As some BT LE devices change their MAC address regularly, a new device is only discovered when it has been seen 5 times.
Some BTLE devices (e.g., fitness trackers) are only visible to the devices that they are paired with. In this case, the BTLE tracker won't see this device.

Enabling the battery tracking might slightly decrease the duration of the battery, but since this is only done at most once a day, this shouldn't be noticeable. Not all devices offer battery status information; if the information is not available, the integration will only try once at startup.

For additional configuration variables check the [Device tracker page](/integrations/device_tracker/).
