---
title: Belkin WeMo
description: Instructions on how to integrate Belkin WeMo devices into Home Assistant.
ha_category:
  - Binary Sensor
  - Fan
  - Hub
  - Light
  - Switch
ha_release: pre 0.7
ha_iot_class: Local Push
ha_config_flow: true
ha_domain: wemo
ha_ssdp: true
ha_homekit: true
ha_platforms:
  - binary_sensor
  - fan
  - light
  - sensor
  - switch
ha_codeowners:
  - '@esev'
ha_integration_type: integration
---

The `wemo` integration is the main integration to integrate various [Belkin WeMo](https://www.belkin.com/us/c/wemo/) devices with Home Assistant.

There is currently support for the following device types within Home Assistant:

- Binary Sensor
- Fan (Belkin WeMo (Holmes) Smart Humidifier)
- Light (Belkin WeMo LED lights and Smart Dimmer Switch)
- Switch ([Belkin WeMo Switches](https://www.belkin.com/us/smart-home/c/wemo/) and includes support for WeMo enabled [Mr. Coffee](https://www.mrcoffee.com/) smart coffee makers.)

## Configuration

{% configuration %}
  discovery:
    description: Setting this value to false will prevent the automatic discovery of WeMo devices by the WeMo platform and the discovery platform (static devices will still be discovered)
    required: false
    type: boolean
    default: true
  static:
    description: One or more static IP addresses for WeMo to use
    required: false
    type: list
{% endconfiguration %}

Supported devices will be automatically discovered if the optional `discovery` configuration item is omitted or set to true or if the `discovery` integration is enabled. If the `discovery` configuration item is set to false, then automatic discovery of WeMo devices is disabled both for the `wemo` integration and for the `discovery` component. Loading the `wemo` integration with the `discovery` configuration item omitted or set to true will scan the local network for WeMo devices, even if you are not using the `discovery` component.

```yaml
# Example configuration.yaml entry with automatic discovery enabled (by omitting the discovery configuration item)
wemo:

# Example configuration.yaml entry with automatic discovery enabled (by explicitly setting the discovery configuration item)
wemo:
  discovery: true
```

Alternately, WeMo devices that are not discoverable can be statically configured. If you have WeMo devices on subnets other than where Home Assistant is running, or devices in a remote location reachable over a VPN, you will need to configure them manually. Statically configured devices may be used with or without automatic discovery enabled. Example static configuration:

```yaml
# Example configuration.yaml entry with automatic discovery disabled, and 2 statically configured devices
wemo:
  discovery: false
  static:
    - 192.168.1.23
    - 192.168.52.172
```

Note that if you use static device entries, you may want to set up your router (or whatever runs your DHCP server) to force your WeMo devices to use a static IP address. Check the DHCP section of your router configuration for this ability.

If the device doesn't seem to work and all you see is the state "unavailable" on your dashboard, check that your firewall doesn't block incoming requests on port 8989, since this is the port to which the WeMo devices send their updates.

## Emulated devices

Various software that emulate WeMo devices often use alternative ports. Static configuration should include the port value:

```yaml
# Example configuration.yaml entry with static device entries that include non-standard port numbers
wemo:
  static:
    - 192.168.1.23:52001
    - 192.168.52.172:52002
```

## Fan

The `wemo` platform allows you to control your Belkin WeMo humidifiers from within Home Assistant. This includes support for the Holmes Smart Humidifier.

WeMo devices are automatically discovered if the `discovery` integration is enabled.

### Attributes

There are several attributes which can be used for automations and templates:

| Attribute | Description |
| --------- | ----------- |
| `current_humidity` | An integer that indicates the current relative humidity percentage of the room, as determined by the device's onboard humidity sensor.
| `fan_mode` | String that indicates the current fan speed setting, as reported by the WeMo humidifier.
| `filter_expired` | A boolean that indicates whether the filter has expired and needs to be replaced.
| `filter_life` | The used life of the filter (as a percentage).
| `target_humidity` | An integer that indicates the desired relative humidity percentage (this is constrained to the humidity settings of the device, which are 45, 50, 55, 60, and 100).
| `water level` | String that indicates whether the water level is Good, Low, or Empty.

### Services

There are several services which can be used for automations and control of the humidifier:

| Service | Description |
| --------- | ----------- |
| `set_speed` | Calling this service sets the fan speed (entity_id and speed are required parameters, and speed must be one of the following: off, low, medium, or high). When selecting low for the speed, this will map to the WeMo humidifier speed of minimum. When selecting high for the speed, this will map to the WeMo humidifier speed of maximum. The WeMo humidifier speeds of low and high are unused due to constraints on which fan speeds Home Assistant supports.
| `toggle` | Calling this service will toggle the humidifier between on and off states.
| `turn_off` | Calling this service will turn the humidifier off (entity_id is required).
| `turn_on` | Calling this service will turn the humidifier on and set the speed to the last used speed (defaults to medium, entity_id is required).
| `wemo.set_humidity` | Calling this service will set the desired relative humidity setting on the device (entity_id is a required list of 1 or more entities to set humidity on, and target_humidity is a required float value between 0 and 100 (this value will be rounded down and mapped to one of the valid desired humidity settings of 45, 50, 55, 60, or 100 that are supported by the WeMo humidifier)).
| `wemo.reset_filter_life` | Calling this service will reset the humdifier's filter life back to 100% (entity_id is a required list of 1 or more entities to reset the filter life on). Call this service when you change the filter on your humidifier.

## Long Press Events and Triggers

For WeMo Light Switches and Dimmers, pressing the button on the device for two seconds will activate a long press event. The long-press can trigger an automation
either by using an `event` trigger or a `device` trigger. For an `event` trigger the `event_type` will be `wemo_subscription_event`. The event data will have a `type` parameter
set to the value `LongPress` and a `name` parameter indicating the dimmer or light switch that was triggered.

The following is an example implementation of an automation:

```yaml
# Example automation
- id: long_press_living_room
  alias: "Toggle amplifier power"
  trigger:
  - platform: event
    event_type: wemo_subscription_event
    event_data:
      type: LongPress
      name: Living Room
  action:
    - service: media_player.toggle
      target:
        entity_id: media_player.amplifier
```

A `device` automation can also be used through the automation editor. Look for the `Wemo button was pressed for 2 seconds` trigger for the dimmer or light switch device.

Note: Due to the way that long press events are received by Home Assistant, modifying any of the Rules through the WeMo app can cause long press events to stop working until Home Assistant is restarted. Home Assistant modifies the local device's rules database to enable long press event support. This local modification is not synchronized with the cloud service. Any rule changes from the cloud service (via the app) will likely overwrite the local changes made by Home Assistant.
