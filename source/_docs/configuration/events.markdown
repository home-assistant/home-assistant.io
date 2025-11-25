---
title: "Events"
description: "Describes all there is to know about events in Home Assistant."
related:
  - docs: /docs/automation/trigger/#event-trigger
    title: Event triggers
  - docs: /integrations/event/
    title: Event integration
---

The core of Home Assistant is the event bus. The event bus allows any integration to fire or listen for events.

## Events and state changes

All {% term entities %} produce state change events. Every time a {% term state %} changes, a state change event is produced. State change events are just one type of event on the event bus, but there are other kinds of events, such as the [built-in events](#built-in-events-core) that are used to coordinate between various integrations.

### State change events versus event entity

State change events are not to be confused with the [event entity](/integrations/event/). The event entity is a specific type of entity that itself produces event state changes, just like all other entities.

Any state change will be announced on the event bus as a `state_changed` event, containing the previous and the new state of an entity.

## Common fields

All events share these basic fields.

| Field        | Description                                                                                                                                  |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `event_type` | Type of the event. Example: `call_service`.                                                                                                  |
| `origin`     | Origin of the event. `REMOTE` (coming in from the API, e.g. a webhook) or `LOCAL` (everything else).                                         |
| `time_fired` | When the event was fired. Example: `2022-01-28T12:19:53.736380+00:00`.                                                                       |
| `context`    | Dictionary with the [context](https://data.home-assistant.io/docs/context/). Example: `{ 'id': '123', "parent_id": null, 'user_id': 'abc'}`. |

In addition, all events contain a `data` dictionary with event-specific information. These are described below.

## Built-in Events (core)

### `call_service`

This event is fired when an service action is performed

| Field             | Description                                                            |
| ----------------- | ---------------------------------------------------------------------- |
| `domain`          | Domain of the action. Example: `light`.                                |
| `service`         | The service action that is performed. Example: `turn_on`               |
| `service_data`    | Dictionary with the call parameters. Example: `{ 'brightness': 120 }`. |
| `service_call_id` | String with a unique call id. Example: `23123-4`.                      |

### `component_loaded`

This event is fired when a new integration has been loaded and initialized.

Please note that while this event is fired for each loaded integration during Home Assistant startup, the automation engine of Home Assistant is started last. Thus this event can not be used to run automations during startup as it would have missed these events.

| Field       | Description                                                                 |
| ----------- | --------------------------------------------------------------------------- |
| `component` | Domain of the integration that has just been initialized. Example: `light`. |

### `core_config_updated`

This event is fired when the core configuration is updated, for example when the location has been changed.

It contains no additional data.

### `data_entry_flow_progressed`

This event is fired when a data entry flow has changed and is used by the frontend to reload the flow state.

| Field     | Description                 |
| --------- | --------------------------- |
| `handler` | The flow handler.           |
| `flow_id` | Identification of the flow. |

### `homeassistant_start`, `homeassistant_started`

These events are fired during the startup of Home Assistant, in the following order:

1. `homeassistant_start`
2. `homeassistant_started`

These events contain no additional data.

If you want to trigger automation on a Home Assistant start event, we recommend using the special [Home Assistant trigger](/docs/automation/trigger/#home-assistant-trigger) instead of listening to these events.

### `homeassistant_stop`, `homeassistant_final_write`, `homeassistant_close`

These events are fired during the shutdown of Home Assistant, in the following order:

1. `homeassistant_stop`
2. `homeassistant_final_write`
3. `homeassistant_close`

These events contain no additional data.

Please note that `homeassistant_final_write` and `homeassistant_close`, cannot be used with automations, as the automation engine would already have been stopped when those are fired.

If you want to trigger automation on a Home Assistant stop event, we recommend using the special [Home Assistant trigger](/docs/automation/trigger/#home-assistant-trigger) instead of listening to these events.

### `logbook_entry`

| Field       | Description                                         |
| ----------- | --------------------------------------------------- |
| `name`      | Name of the entity. Example: `Kitchen light`.       |
| `message`   | Message. Example: `was turned on`                   |
| `domain`    | Optional, domain of the entry. Example: `light`     |
| `entity_id` | Optional, identifier of the entity that was logged. |

### `service_registered`

This event is fired when a new service action has been registered within Home Assistant.

| Field     | Description                                                              |
| --------- | ------------------------------------------------------------------------ |
| `domain`  | The domain of the integration that offers this action. Example: `light`. |
| `service` | The name of the service action. Example: `turn_on`                       |

### `service_removed`

This event is fired when a service action has been removed from Home Assistant.

| Field     | Description                                                              |
| --------- | ------------------------------------------------------------------------ |
| `domain`  | The domain of the integration that offers this action. Example: `light`. |
| `service` | The name of the service action. Example: `turn_on`                       |

### `state_changed`

This event is fired when a state has changed. It contains the entity identifier and both the `new_state` and `old_state` of the entity as [state objects](/topics/state_object/).

| Field       | Description                                                                                         |
| ----------- | --------------------------------------------------------------------------------------------------- |
| `entity_id` | Identifier of the entity that has changed. Example: `light.kitchen`                                 |
| `old_state` | The previous state of the entity before it changed. Omitted if the state is set for the first time. |
| `new_state` | The new state of the entity. Omitted if the state has been removed.                                 |

### `themes_updated`

This event is fired after a theme has been set or reloaded. It contains no additional data.

### `user_added`

This event is fired when a user has been added.

| Field     | Description                     |
| --------- | ------------------------------- |
| `user_id` | Identification of the new user. |

### `user_removed`

This event is fired when a user has been removed.

| Field     | Description                         |
| --------- | ----------------------------------- |
| `user_id` | Identification of the removed user. |

## Built-in events (default integrations)

### `automation_reloaded`

Integration: [`automation`](/integrations/automation/)

This event is fired when automations have been reloaded and thus might have changed.

This event contains no additional data.

### `automation_triggered`

Integration: [`automation`](/integrations/automation/)

This event is fired when an automation is triggered.

| Field       | Description                       |
| ----------- | --------------------------------- |
| `name`      | The name of the automation.       |
| `entity_id` | The identifier of the automation. |

### `scene_reloaded`

Integration: [`homeassistant`](/integrations/homeassistant/)

This event is fired when scenes have been reloaded and thus might have changed.

This event contains no additional data.

### `script_started`

Integration: [`script`](/integrations/script/)

This event is fired when a script is run. A script can be invoked by a user or triggered by an automation. The resulting changes can be tracked because all related events will share the same context as this event.

| Field       | Description                            |
| ----------- | -------------------------------------- |
| `name`      | Name of the script that was run.       |
| `entity_id` | Identifier of the script that was run. |
