---
title: "Events"
description: "Events are how integrations and parts of Home Assistant tell each other that something has happened, and how you can trigger automations based on them."
related:
  - docs: /triggers/event/
    title: Manual event received trigger
  - docs: /integrations/event/
    title: Event integration
---

Events are how Home Assistant announces that something has happened. For example, a light turned on, an automation ran, or Home Assistant finished starting. Integrations and other parts of Home Assistant fire these events on the event bus, and any part of Home Assistant can listen for them.

You can use events in two ways:

- To start an automation when a specific event happens, use the [**Manual event received**](/triggers/event/) trigger. For many common events, a more specific trigger is easier to set up. For example, use the [**State changed**](/triggers/state/) trigger when a light turns on, or the [**Home Assistant**](/triggers/homeassistant/) trigger when Home Assistant starts.
- To watch events as they happen, or to fire an event yourself, go to {% my developer_events title="**Settings** > **Tools** > **Events**" %}. For details, refer to the [Events tab](/docs/tools/dev-tools/#events-tab).

## Events and actions

An event tells you that something happened, such as a light that turned on. An {% term action %} makes something happen, such as turning on a light.

In an automation, an event can be the {% term trigger %}, but not a {% term condition %}. A condition checks whether something is true right now, and an event is over the moment it happens. An automation that starts from an event runs in this order:

1. Trigger: An event happens.
2. Condition (optional): The automation checks whether it should continue, for example, based on the data in the event.
3. Action: The automation makes something happen.

Actions can create events of their own. When an action such as `light.turn_on` is performed, Home Assistant fires a `call_service` event. If the light then turns on, a `state_changed` event follows. Other steps in an automation, such as a delay or a condition, do not fire these events. To fire an event from an automation or script, use the [**Fire manual event**](/docs/scripts/#fire-an-event) action.

Most triggers in the automation editor are built on events. For example, the [**State changed**](/triggers/state/) trigger listens for `state_changed` events for the entities you select. When something has a state, such as a light, a door sensor, or the location of a person, use the **State changed** trigger. It is easier to set up than listening for the event yourself.

Use the [**Manual event received**](/triggers/event/) trigger when there is no state to watch:

- Something happens that doesn't change a state, such as a button press. Many integrations represent these as [event entities](#event-entities), but some fire an event on the event bus instead. For an example, refer to [deCONZ events](/integrations/deconz/#finding-your-events).
- A script or automation fires your own event with the **Fire manual event** action, and another automation reacts to it.
- Something changes in Home Assistant itself, such as a user being added or an integration finishing loading.

## State change events

Every time the {% term state %} or the attributes of an {% term entity %} change, Home Assistant fires a `state_changed` event. This event contains the previous and the new state of the entity.

State change events are only one type of event on the event bus. Other types, such as the [core events](#core-events), help integrations work together.

### Event entities

State change events are not the same as the [event entity](/integrations/event/). The event entity is a type of entity that represents something that happened, such as a button press. Just like all other entities, it produces state change events.

Each has its own trigger:

- To start an automation from an event on the event bus, use the [**Manual event received**](/triggers/event/) trigger.
- To start an automation when an event entity, such as a doorbell, detects a specific type of event, use the [**Event received**](/triggers/event.received/) trigger.

## Fields in every event

All events share these basic fields:

- `event_type`: Type of the event. Example: `call_service`.
- `origin`: Origin of the event. `REMOTE` (coming in from the API, such as a webhook) or `LOCAL` (everything else).
- `time_fired`: When the event was fired. Example: `2022-01-28T12:19:53.736380+00:00`.
- `context`: Dictionary with the [context](https://data.home-assistant.io/docs/context/). Example: `{"id": "123", "parent_id": null, "user_id": "abc"}`.

In addition, all events contain a `data` dictionary with event-specific information. These are described below.

## Core events

### `area_registry_updated`

This event is fired when an area is created, updated, or removed, or when areas are reordered.

- `action`: What changed. `create`, `update`, `remove`, or `reorder`.
- `area_id`: Identifier of the area. `null` when areas are reordered.

### `call_service`

This event is fired when a service action is performed.

- `domain`: Domain of the action. Example: `light`.
- `service`: The service action that is performed. Example: `turn_on`.
- `service_data`: Dictionary with the call parameters. Example: `{"brightness": 120}`.

### `category_registry_updated`

This event is fired when a category is created, updated, or removed.

- `action`: What changed. `create`, `update`, or `remove`.
- `scope`: Where the category is used. Example: `automation`.
- `category_id`: Identifier of the category.

### `component_loaded`

This event is fired when a new integration has been loaded and initialized.

This event is fired for each integration that loads during Home Assistant startup, but the automation engine starts last. This means you cannot use this event to run automations during startup, because the automation engine misses these events.

- `component`: Domain of the integration that has just been initialized. Example: `light`.

### `core_config_updated`

This event is fired when the core configuration is updated, for example, when the location has been changed. It is also fired while Home Assistant starts.

When you change the configuration, the event data contains the settings that changed, such as `latitude` and `longitude`. When the event is fired during startup, it contains no additional data.

### `data_entry_flow_progressed`

This event is fired when a data entry flow has changed. The frontend uses it to reload the flow state.

- `handler`: The flow handler.
- `flow_id`: Identification of the flow.
- `refresh`: Always `true`. Tells the frontend to reload the flow.

### `device_registry_updated`

This event is fired when a device is added, updated, or removed.

- `action`: What changed. `create`, `update`, or `remove`.
- `device_id`: Identifier of the device.
- `changes`: Only for `update`. Dictionary with the previous values of the fields that changed.
- `device`: Only for `remove`. Dictionary with the data of the removed device.

### `entity_registry_updated`

This event is fired when an entity is added to, updated in, or removed from the entity registry.

- `action`: What changed. `create`, `update`, or `remove`.
- `entity_id`: Identifier of the entity. Example: `light.kitchen`.
- `changes`: Only for `update`. Dictionary with the previous values of the fields that changed.
- `old_entity_id`: Only for `update`, and only when the entity ID has changed. The previous entity ID.

### `floor_registry_updated`

This event is fired when a floor is created, updated, or removed, or when floors are reordered.

- `action`: What changed. `create`, `update`, `remove`, or `reorder`.
- `floor_id`: Identifier of the floor. Not included when floors are reordered.

### `homeassistant_start`, `homeassistant_started`

These events are fired during the startup of Home Assistant, in the following order:

1. `homeassistant_start`
2. `homeassistant_started`

These events contain no additional data.

To trigger an automation when Home Assistant starts, use the [Home Assistant trigger](/triggers/homeassistant/) instead of listening to these events.

### `homeassistant_stop`, `homeassistant_final_write`, `homeassistant_close`

These events are fired during the shutdown of Home Assistant, in the following order:

1. `homeassistant_stop`
2. `homeassistant_final_write`
3. `homeassistant_close`

These events contain no additional data.

You cannot use `homeassistant_final_write` and `homeassistant_close` in automations, because the automation engine has already stopped when they are fired.

To trigger an automation when Home Assistant stops, use the [Home Assistant trigger](/triggers/homeassistant/) instead of listening to these events.

### `label_registry_updated`

This event is fired when a label is created, updated, or removed.

- `action`: What changed. `create`, `update`, or `remove`.
- `label_id`: Identifier of the label.

### `logbook_entry`

This event is fired when an entry is added to the logbook.

- `name`: Name of the entity. Example: `Kitchen light`.
- `message`: Message. Example: `was turned on`.
- `domain`: Optional, domain of the entry. Example: `light`.
- `entity_id`: Optional, identifier of the entity that was logged.

### `repairs_issue_registry_updated`

This event is fired when a repair issue is created, updated, or removed.

- `action`: What changed. `create`, `update`, or `remove`.
- `domain`: Domain of the integration that created the issue. Example: `homeassistant`.
- `issue_id`: Identifier of the issue.

### `service_registered`

This event is fired when a new service action has been registered within Home Assistant.

- `domain`: The domain of the integration that offers this action. Example: `light`.
- `service`: The name of the service action. Example: `turn_on`.

### `service_removed`

This event is fired when a service action has been removed from Home Assistant.

- `domain`: The domain of the integration that offers this action. Example: `light`.
- `service`: The name of the service action. Example: `turn_on`.

### `state_changed`

This event is fired when the state or the attributes of an entity have changed. It contains the entity identifier and both the `new_state` and `old_state` of the entity as [state objects](/topics/state_object/).

- `entity_id`: Identifier of the entity that has changed. Example: `light.kitchen`.
- `old_state`: The previous state of the entity before it changed. `null` if the state is set for the first time.
- `new_state`: The new state of the entity. `null` if the state has been removed.

### `state_reported`

This event is fired when an entity reports its state again, but neither the state nor its attributes have changed. For example, a sensor sends the same temperature as before.

- `entity_id`: Identifier of the entity. Example: `sensor.outdoor_temperature`.
- `new_state`: The current state of the entity, as a [state object](/topics/state_object/).
- `last_reported`: When the state was reported.
- `old_last_reported`: When the state was reported before this.

You cannot use this event in the **Manual event received** trigger. To start an automation when a state changes, use `state_changed` instead.

### `themes_updated`

This event is fired after a theme has been set or reloaded. It contains no additional data.

### `user_added`

This event is fired when a user has been added.

- `user_id`: Identification of the new user.

### `user_updated`

This event is fired when a user has been updated.

- `user_id`: Identification of the updated user.

### `user_removed`

This event is fired when a user has been removed.

- `user_id`: Identification of the removed user.

## Automation, script, and scene events

### `automation_reloaded`

Integration: [`automation`](/integrations/automation/)

This event is fired when automations have been reloaded and thus might have changed.

This event contains no additional data.

### `automation_triggered`

Integration: [`automation`](/integrations/automation/)

This event is fired when an automation is triggered.

- `name`: The name of the automation.
- `entity_id`: The identifier of the automation.
- `source`: Optional, description of the trigger that started the automation.

### `scene_reloaded`

Integration: [`homeassistant`](/integrations/homeassistant/)

This event is fired when scenes have been reloaded and thus might have changed.

This event contains no additional data.

### `script_started`

Integration: [`script`](/integrations/script/)

This event is fired when a script is run. A script can be invoked by a user or triggered by an automation. The resulting changes can be tracked because all related events will share the same context as this event.

- `name`: Name of the script that was run.
- `entity_id`: Identifier of the script that was run.
