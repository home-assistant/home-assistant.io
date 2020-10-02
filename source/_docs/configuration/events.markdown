---
title: "Events"
description: "Describes all there is to know about events in Home Assistant."
---

The core of Home Assistant is the event bus. The event bus allows any integration to fire or listen for events. It is the core of everything. For example, any state change will be announced on the event bus as a `state_changed` event containing the previous and the new state of an entity.

Home Assistant contains a few built-in events that are used to coordinate between various integrations.

## Event `state_changed`

Event `state_changed` is fired when a state changes. Both `old_state` and `new_state` are state objects. [Documentation about state objects.](/topics/state_object/)

| Field       | Description                                                                                         |
| ----------- | --------------------------------------------------------------------------------------------------- |
| `entity_id` | Entity ID of the changed entity. Example: `light.kitchen`                                           |
| `old_state` | The previous state of the entity before it changed. This field is omitted if the entity is new.     |
| `new_state` | The new state of the entity. This field is omitted if the entity is removed from the state machine. |

## Event `time_changed`

Event `time_changed` is fired every second by the timer and contains the current time.

| Field | Description                                                                                                                  |
| ----- | ---------------------------------------------------------------------------------------------------------------------------- |
| `now` | A [datetime object](https://docs.python.org/3.4/library/datetime.html#datetime.datetime) containing the current time in UTC. |

## Event `service_registered`

Event `service_registered` is fired when a new service has been registered within Home Assistant.

| Field     | Description                              |
| --------- | ---------------------------------------- |
| `domain`  | Domain of the service. Example: `light`. |
| `service` | The service to call. Example: `turn_on`  |

## Event `call_service`

Event `call_service` is fired to call a service.

| Field             | Description                                                                    |
| ----------------- | ------------------------------------------------------------------------------ |
| `domain`          | Domain of the service. Example: `light`.                                       |
| `service`         | The service to call. Example: `turn_on`                                        |
| `service_data`    | Dictionary with the service call parameters. Example: `{ 'brightness': 120 }`. |
| `service_call_id` | String with a unique call id. Example: `23123-4`.                              |

## Event `service_executed`

Event `service_executed` is fired by the service handler to indicate the service is done.

| Field             | Description                                                                               |
| ----------------- | ----------------------------------------------------------------------------------------- |
| `service_call_id` | String with the unique call id of the service call that was executed. Example: `23123-4`. |

## Event `automation_reloaded`

Event `automation_reloaded` is fired when automations have been reloaded and thus might have changed.

This event has no additional data.

## Event `scene_reloaded`

Event `scene_reloaded` is fired when scenes have been reloaded and thus might have changed.

This event has no additional data.

## Event `platform_discovered`

Event `platform_discovered` is fired when a new platform has been discovered by the [`discovery`](/integrations/discovery/) component.

| Field        | Description                                                                                      |
| ------------ | ------------------------------------------------------------------------------------------------ |
| `service`    | The platform that is discovered. Example: `zwave`.                                               |
| `discovered` | Dictionary containing discovery information. Example: `{ "host": "192.168.1.10", "port": 8889}`. |

## Event `component_loaded`

Event `component_loaded` is fired when a new integration has been loaded and initialized.

| Field       | Description                                                                 |
| ----------- | --------------------------------------------------------------------------- |
| `component` | Domain of the integration that has just been initialized. Example: `light`. |
