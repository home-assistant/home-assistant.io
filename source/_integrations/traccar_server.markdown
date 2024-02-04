---
title: Traccar Server
description: Documentation for the Traccar Server integration.
ha_release: 2024.2
ha_category:
  - Car
  - Presence detection
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@ludeeus'
ha_domain: traccar_server
ha_platforms:
  - device_tracker
ha_integration_type: integration
---

Traccar uses GPS for tracking and has support for over 1500 different types of devices. You can use the Traccar Server integration to communicate with your own [Traccar Server](https://www.traccar.org/server/), which is also available as [Home Assistant add-on](https://my.home-assistant.io/redirect/supervisor_addon/?addon=a0d7b954_traccar).

<div class="note">

  Looking for documentation on how to setup the Traccar Client with webhooks in Home Assistant? See the [Traccar Client](/integrations/traccar/) integration documentation.

</div>

{% include integrations/config_flow.md %}

## Events

The Traccar Server integration options allow you to define a list of events you want to listen for. These events will be sent to Home Assistant as [events](/docs/configuration/events/).

All events will be prefixed with `traccar_` followed by a snake_cased version of the event name.
Examples:

- The `deviceMoving` will be fired in Home Assistant as `traccar_device_moving`.
- The `geofenceExit` will be fired in Home Assistant as `traccar_geofence_exit`.
- The `alarm` will be fired in Home Assistant as `traccar_alarm`.

All events will also have the following data:

{% configuration_basic %}

Device ID:
  description: (`device_traccar_id`) This will be the device ID that the event is related to.
Device name:
  description: (`device_name`) This will be the name of the device that the event is related to.
Type:
  description: (`type`) This will be the type of the event.
Server time:
  description: (`serverTime`) This will be the time the event was received by the Traccar Server.
Attributes:
  description: (`attributes`) This will be a dictionary of attributes related to the event.

{% endconfiguration_basic %}

{% details "Example" %}

```json
{
    "device_traccar_id": 24,
    "device_name": "My Device",
    "type": "alarm",
    "serverTime": "1970-01-01T00:00:00.000Z",
    "attributes": {
      "custom_attribute": "value"
    },
}
```

{% enddetails %}

## Devices

The Traccar Server integration will create devices for each device registered in the Traccar Server with at least one position update.

These device representations in Home Assistant will have [entities](#entities) associated with them, which you can use in [automations](/docs/automation), [scripts](/docs/script), and display on your [dashboard](/docs/dashboard).

## Entities

The traccar server integration will create entities in with the following domains:

- [Device Tracker](/integrations/device_tracker)

For more details about each of these, see the sections below.

### Device Tracker

The Traccar Server integration will create a [device tracker](/integrations/device_tracker) entity for each device registered in Traccar Server.

{% configuration_basic %}
Name:
  description: The name of the device tracker will be set to what you have named it in Traccar Server.
Entity ID:
  description: This will be a slugified version of the name of the device tracker.
Unique ID:
  description: This will be the unique ID of the device tracker in Traccar Server.
State:
  description: As a device tracker, the state will be `home` or `not_home`.
{% endconfiguration_basic %}

{% details "Attributes" %}

In addition to the custom attributes you can define in the Traccar Server integration options, the device tracker entity will have the following attributes:

{% configuration_basic %}
Address:
  description: If a position update has an address associated with it, this will be the address.
Altitude:
  description: The altitude of the position update.
Battery Level:
  description: The battery level of the device if defined.
Category:
  description: The category of the device in Traccar if defined.
Geofence:
  description: The name of the geofence the device is located in.
Motion:
  description: If the device is moving or not.
Speed:
  description: The speed of the device.
Status:
  description: The status of the device in Traccar.
Traccar ID:
  description: The ID of the device in Traccar.
Tracker:
  description: Just a string that says `traccar_server`.
{% endconfiguration_basic %}

{% enddetails %}

## Examples

So you set up the integration and it pulled in all your devices. Now what? Below are some examples of what you can do with the data provided by Traccar Server integration.

### Automations

In this section you will find some example automations that you can use to get started with the Traccar Server integration.

#### Do something when a device enters a geofence

The allows you to do something when the device `device_tracker.millennium_falcon` enters the defined geofence.

{% my blueprint_import badge blueprint_url="https://www.home-assistant.io/blueprints/integrations/traccar_server_device_enter_geofence.yaml" %}

{% details "Show me the YAML!" %}

```yaml
trigger:
  - platform: state
    entity_id: device_tracker.millennium_falcon
    attribute: geofence
    to: 'Tatooine'
action:
  ...
```

{% enddetails %}

#### Do something when a device are speeding

The allows you to do something when the device `device_tracker.millennium_falcon` exceeds a defined speed.

{% my blueprint_import badge blueprint_url="https://www.home-assistant.io/blueprints/integrations/traccar_server_device_speed_limit.yaml" %}

{% details "Show me the YAML!" %}

```yaml
trigger:
  - platform: numeric_state
    entity_id: device_tracker.millennium_falcon
    attribute: speed
    above: 1337
action:
  ...
```

If you want to include the speed in a notification, you can use the `{{ trigger.to_state.attributes.speed }}` template.

Partial example:

```yaml
trigger:
  ...
action:
  - service: notify.notify
    data:
      message: "The current speed of the Millennium falcon is {{ trigger.to_state.attributes.speed }}!"
```

{% enddetails %}
