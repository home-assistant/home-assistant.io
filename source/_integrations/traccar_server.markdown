---
title: Traccar Server
description: Documentation for the Traccar Server integration.
ha_release: 2024.2
ha_category:
  - Car
  - Presence detection
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@ludeeus'
ha_domain: traccar_server
ha_platforms:
  - binary_sensor
  - device_tracker
  - diagnostics
  - sensor
ha_integration_type: integration
---

Traccar uses GPS for tracking and has support for over 1500 different types of devices. You can use the Traccar Server integration to communicate with your own [Traccar Server](https://www.traccar.org/server/), which is also available as [Home Assistant add-on](https://my.home-assistant.io/redirect/supervisor_addon/?addon=a0d7b954_traccar).

{% tip %}
Looking for documentation on how to setup the Traccar Client with webhooks in Home Assistant? See the [Traccar Client](/integrations/traccar/) integration documentation.
{% endtip %}

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

These device representations in Home Assistant will have [entities](#entities) associated with them, which you can use in [automations](/docs/automation), [scripts](/docs/scripts), and display on your [dashboard](/dashboards).

## Entities

The traccar server integration will create entities in with the following domains:

- [Binary Sensor](/integrations/binary_sensor)
- [Device Tracker](/integrations/device_tracker)
- [Sensor](/integrations/sensor)

For more details about each of these, see the sections below.

### Binary Sensor - Motion

The Traccar Server integration will create a [binary_sensor](/integrations/binary_sensor) entity for each device registered in Traccar Server to show the motion reported by the Traccar Server.

This entity is disabled by default.

{% configuration_basic %}
Name:
  description: The name of the sensor will be set to what you have named it in Traccar Server, followed by the term "Motion". If your device is named "Millennium Falcon", this will be "Millennium Falcon Motion".
Entity ID:
  description: This will be a slugified version of the name.
Unique ID:
  description: This will be the unique ID of the device tracker in Traccar Server followed by `position_attributes_motion`.
State:
  description: This will be `Moving` if the Traccar Server reports that the device is moving, if not this will be `Stopped`.
{% endconfiguration_basic %}

This entity does not have any attributes.

### Binary Sensor - Status

The Traccar Server integration will create a [binary_sensor](/integrations/binary_sensor) entity for each device registered in Traccar Server to show the status reported by the Traccar Server.

This entity is disabled by default.

{% configuration_basic %}
Name:
  description: The name of the sensor will be set to what you have named it in Traccar Server followed by the term "Status". If your device is named "Millennium Falcon", this will be "Millennium Falcon Status".
Entity ID:
  description: This will be a slugified version of the name.
Unique ID:
  description: This will be the unique ID of the device tracker in Traccar Server followed by `device_status`.
State:
  description: This will be `Online` if the Traccar Server reports that the device is online. This will be `Offline` if it reports it being offline, or `Unknown` if it is not sure.
{% endconfiguration_basic %}

This entity does not have any attributes.

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
Category:
  description: The category of the device in Traccar if defined.
Traccar ID:
  description: The ID of the device in Traccar.
Tracker:
  description: Just a string that says `traccar_server`.
{% endconfiguration_basic %}

{% enddetails %}

### Sensor - Address

The Traccar Server integration will create a [sensor](/integrations/sensor) entity for each device registered in Traccar Server to show the address reported by the Traccar Server.

This entity is disabled by default.

{% configuration_basic %}
Name:
  description: The name of the sensor will be set to what you have named it in Traccar Server followed by Address. If your device is named "Millennium Falcon", this will be "Millennium Falcon Address".
Entity ID:
  description: This will be a slugified version of the name.
Unique ID:
  description: This will be the unique ID of the device tracker in Traccar Server followed by `position_address`.
State:
  description: This will be the address reported by the Traccar Server, if geo detection is not configured this will be unknown`.
{% endconfiguration_basic %}

This entity does not have any attributes.

### Sensor - Altitude

The Traccar Server integration will create a [sensor](/integrations/sensor) entity for each device registered in Traccar Server to show the altitude reported by the Traccar Server.

This entity is disabled by default.

{% configuration_basic %}
Name:
  description: The name of the sensor will be set to what you have named it in Traccar Server followed by Altitude. If your device is named "Millennium Falcon", this will be "Millennium Falcon Altitude".
Entity ID:
  description: This will be a slugified version of the name.
Unique ID:
  description: This will be the unique ID of the device tracker in Traccar Server followed by `position_altitude`.
State:
  description: This will be the altitude in meters. You can select a different unit in the entity options if you want.
{% endconfiguration_basic %}

This entity does not have any attributes.

### Sensor - Battery

The Traccar Server integration will create a [sensor](/integrations/sensor) entity for each device registered in Traccar Server to show the remaining battery percentage reported by the Traccar Server.

This entity is disabled by default.

{% configuration_basic %}
Name:
  description: The name of the sensor will be set to what you have named it in Traccar Server followed by Battery. If your device is named "Millennium Falcon", this will be "Millennium Falcon Battery".
Entity ID:
  description: This will be a slugified version of the name.
Unique ID:
  description: This will be the unique ID of the device tracker in Traccar Server followed by `position_attributes.batteryLevel`.
State:
  description: This will be the battery percentage (level) as reported by the tracked device, if the device does not have a battery this will be unknown.
{% endconfiguration_basic %}

This entity does not have any attributes.

### Sensor - Geofence

The Traccar Server integration will create a [sensor](/integrations/sensor) entity for each device registered in Traccar Server to show the geofence reported by the Traccar Server.

This entity is disabled by default.

{% configuration_basic %}
Name:
  description: The name of the sensor will be set to what you have named it in Traccar Server followed by Geofence. If your device is named "Millennium Falcon", this will be "Millennium Falcon Geofence".
Entity ID:
  description: This will be a slugified version of the name.
Unique ID:
  description: This will be the unique ID of the device tracker in Traccar Server followed by `geofence_geofence`.
State:
  description: This will be geofence that the device is in, if you have overlapping geofences it will show the first one as reported by the Traccar Server.
{% endconfiguration_basic %}

This entity does not have any attributes.

### Sensor - Speed

The Traccar Server integration will create a [sensor](/integrations/sensor) entity for each device registered in Traccar Server to show the speed reported by the Traccar Server.

This entity is disabled by default.

{% configuration_basic %}
Name:
  description: The name of the sensor will be set to what you have named it in Traccar Server followed by Speed. If your device is named "Millennium Falcon", this will be "Millennium Falcon Speed".
Entity ID:
  description: This will be a slugified version of the name.
Unique ID:
  description: This will be the unique ID of the device tracker in Traccar Server followed by `position_speed`.
State:
  description: This will be the speed of the device in knots. You can select a different unit in the entity options if you want.
{% endconfiguration_basic %}

This entity does not have any attributes.

## Examples

So you set up the integration and it pulled in all your devices. Now what? Below are some examples of what you can do with the data provided by Traccar Server integration.

### Automations

In this section you will find some example automations that you can use to get started with the Traccar Server integration.

#### Do something when a device enters a geofence

The allows you to do something when the device "Millennium Falcon" enters the defined geofence.

{% my blueprint_import badge blueprint_url="https://www.home-assistant.io/blueprints/integrations/traccar_server_device_enter_geofence.yaml" %}

{% details "Show me the YAML!" %}

```yaml
triggers:
  - trigger: state
    entity_id: sensor.millennium_falcon_geofence
    to: 'Tatooine'
actions:
  ...
```

{% enddetails %}

#### Do something when a device are speeding

The allows you to do something when the device "Millennium Falcon" exceeds a defined speed.

{% my blueprint_import badge blueprint_url="https://www.home-assistant.io/blueprints/integrations/traccar_server_device_speed_limit.yaml" %}

{% details "Show me the YAML!" %}

```yaml
triggers:
  - trigger: numeric_state
    entity_id: sensor.millennium_falcon_speed
    above: 1337
actions:
  ...
```

If you want to include the speed in a notification, you can use the `{{ trigger.to_state.state }}` template.

Partial example:

```yaml
triggers:
  ...
actions:
  - action: notify.notify
    data:
      message: "The current speed of the Millennium falcon is {{ trigger.to_state.state }}!"
```

{% enddetails %}
