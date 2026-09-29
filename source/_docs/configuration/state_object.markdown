---
title: "State and state object"
description: "Every entity in Home Assistant has a state, such as on, off, or a temperature reading. This page covers what the state object contains and how to use it."
related:
  - docs: /docs/configuration/entities_domains/
    title: Entities and domains
  - docs: /docs/configuration/events/
    title: Events
  - docs: /triggers/state/
    title: State trigger
---

Every {% term entity %} in Home Assistant has a state. The state tells you what the entity is doing right now, for example, whether a light is on or what the current temperature is. An entity can also have attributes with more details, such as the brightness and color of a light. Home Assistant keeps the state and the attributes together in a _state object_.

You see states on your dashboards, and you can use them to start automations or to check conditions. To see the state and attributes of all your entities, go to {% my developer_states title="**Settings** > **Tools** > **States**" %}.

<p class='img'>
  <img src='/images/integrations/light/state_light.png' alt='Screenshot of the States tab showing a light with the state on and its attributes, such as brightness and color'>
  A light in the <b>States</b> tab. Its state is <code>on</code>, and its attributes include its brightness and color.
</p>

## State

The state holds the main piece of information about an entity. For example, `on` or `off` for a light, `21.5` for a temperature sensor, or `home` for a person. Each entity has exactly one state, and the state holds only one value at a time.

Two states have a special meaning:

- `unavailable`: Home Assistant cannot reach the device or service.
- `unknown`: The entity has no value for its state.

## Attributes

Attributes hold extra information about an entity. For example, the state of a light is `on`, and its attributes include its current brightness and color. An entity has only one state, but it can have many attributes.

Some attributes describe the entity itself rather than its current state, such as its name or icon. Each integration adds its own attributes, for example, brightness and color for lights. Which attributes an entity has depends on the integration, and an attribute can be empty (`null`).

These common attributes may be present, depending on the entity domain:

- `friendly_name`: Name of the entity. Example: `Kitchen ceiling`.
- `icon`: Icon to use for the entity in the frontend. Example: `mdi:home`.
- `entity_picture`: URL to a picture that is shown instead of the domain icon. Example: `http://example.com/picture.jpg`.
- `assumed_state`: `true` if the current state is an assumption. For more information, refer to [classifying the Internet of Things](/blog/2016/02/12/classifying-the-internet-of-things/#classifiers).
- `unit_of_measurement`: The unit the state is expressed in. Used for grouping graphs or understanding the entity. Example: `°C`.
- `attribution`: The provider of the data. Example: `Data provided by openSenseMap`.
- `device_class`: The type of device that an entity represents. Used to show device-specific information in the UI.
- `supported_features`: A number that stands for the features the entity supports. For covers, for example, these features include opening, closing, stopping, and setting a position. For media players, they include play, pause, stop, and volume control.

In templates, you can read an attribute by its name, for example, `state.attributes.assumed_state`. When an attribute name contains spaces, use the [`state_attr`](/template-functions/state_attr/) function: `state_attr('sensor.livingroom', 'Battery numeric')`.

## Using states in automations

- To start an automation when the state or an attribute of an entity changes, use the [**State**](/triggers/state/) trigger.
- To check the current state before an automation continues, use the [state condition](/docs/scripts/conditions/#state-condition).

Behind the scenes, every change to a state or its attributes fires a [`state_changed` event](/docs/configuration/events/#state_changed).

## State object

The state object holds everything Home Assistant knows about an entity at a specific moment: the state, the attributes, the entity ID, the timestamps of the last changes, and the context. Templates, automations, and the frontend all read the state object.

In templates, the `state` prefix shows that a field belongs to the state object. For example, `state.state` is the state of the entity, and `state.attributes` are its attributes.

- `state.state`: The current state of the entity, as text. Example: `off`.
- `state.entity_id`: Entity ID. Format: `<domain>.<object_id>`. Example: `light.kitchen`.
- `state.domain`: Domain of the entity. Example: `light`.
- `state.object_id`: Object ID of the entity. Example: `kitchen`.
- `state.name`: Name of the entity. This is the `friendly_name` attribute. If the entity has no `friendly_name`, it is the object ID with underscores replaced by spaces. Example: `Kitchen ceiling`.
- `state.last_changed`: When the state last changed, in UTC. Not updated when only the attributes change. Example: `2013-09-17 07:32:51.715874+00:00`.
- `state.last_updated`: When the state or the attributes last changed, in UTC. Not updated when neither the state nor the attributes changed. Example: `2013-09-17 07:32:51.715874+00:00`.
- `state.last_reported`: When the entity last reported its state, in UTC. Updated even when neither the state nor the attributes changed. Example: `2013-09-17 07:32:51.715874+00:00`.
- `state.attributes`: A dictionary with the [attributes](#attributes) of the entity.
- `state.context`: A dictionary with the [context](#context) of the state.

## Context

The context links states and {% term events %} that belong together. When you or an {% term automation %} make something happen, Home Assistant creates a new context. Every event and state change that results from it carries the same context. This way, you can tell what caused a change, for example, whether a person or an automation turned on a light.

- `id`: Unique identifier for the context.
- `user_id`: Identifier of the user who started the change. `None` if no user started it, for example, when an automation did.
- `parent_id`: Identifier of the context that caused this one, if there is one. For example, when an automation is triggered, the context of the trigger becomes its parent.

## Examples

These templates read fields from the state object of a switch.

- The time the state of the switch last changed:

  ```jinja
  {{ states.switch.my_switch.last_changed }}
  ```

  Result: a datetime, for example, `2025-11-11 12:56:10.244125+00:00`.

- The ID of the context of the switch:

  ```jinja
  {{ states.switch.my_switch.context.id }}
  ```

  Result: a text string, for example, `01K9SF2R36KRV5N4PTC38S6KJ2`.

- The ID of the user who last changed the switch:

  ```jinja
  {{ states.switch.my_switch.context.user_id }}
  ```

  Result: a text string, for example, `e5407786bcf34c84b04e6c02e11391db`. `None` if no user changed the switch.
