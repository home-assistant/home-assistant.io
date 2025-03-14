---
title: "State and state object"
description: "Describes all there is to know about state and the state object in Home Assistant."
related:
  - docs: /docs/configuration/entities_domains/
    title: Entities and domains
---

Devices are represented in Home Assistant as {% term entities %}. The state of an entity (for example, if a light is on, at 50% brightness in orange) can be shown on the dashboard or be used in automations. This page looks at the concepts _state_, _state object_, and _entity state attribute_.

## State versus state object

In Home Assistant, the state object is the current representation of the {% term entity %} with all its attributes at a given moment in time. This state is recorded as a _state object_. Entities constantly keep track of their state and write it into a state object, so that other entities/templates/frontend can access it. In the example&mdash;the light is on, at 50% brightness in orange&mdash;_on_ is the actual state of the light. 50% brightness and the color are entity state attributes.

### About the state object

The state object represents the state of an entity with its attributes at a specific point in time. All state objects will always have an entity id, a state, and timestamps when last updated, last changed, and last reported.
The `state` prefix indicates that this information is part of the state object (which is related to the entity). For example, `state.state` is the state of the entity at a given time.

| Field                 | Description                                                                                                                                                                                     |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `state.state`         | String representation of the current state of the entity. Example `off`.                                                                                                                        |
| `state.entity_id`     | Entity ID. Format: `<domain>.<object_id>`. Example: `light.kitchen`.                                                                                                                            |
| `state.domain`        | Domain of the entity. Example: `light`.                                                                                                                                                         |
| `state.object_id`     | Object ID of entity. Example: `kitchen`.                                                                                                                                                        |
| `state.name`          | Name of the entity. Based on `friendly_name` attribute with fall back to object ID. Example: `Kitchen ceiling`.                                                                                 |
| `state.last_changed`  | Time the state changed in the state machine in UTC time. This is not updated if only state attributes change. Example: `2013-09-17 07:32:51.715874+00:00`.                                      |
| `state.last_reported` | Time the state was written to the state machine in UTC time. This timestamp is updated regardless of any changes to the state or state attributes. Example: `2013-09-17 07:32:51.715874+00:00`. |
| `state.last_updated`  | Time the state or state attributes changed in the state machine in UTC time. This is not updated if neither state nor state attributes changed. Example: `2013-09-17 07:32:51.715874+00:00`.    |
| `state.attributes`    | A dictionary with extra attributes related to the current state.                                                                                                                                |
| `state.context`       | A dictionary with extra attributes related to the context of the state.                                                                                                                         |

### About the state

The screenshot shows three lights in different states (the `state.state`): `on`, `off`, and `unavailable`. Each light comes with its own entity state attributes such as `supported_color_modes`, `supported_features`. These attributes have their own state: the state of the `supported_color_modes` attribute is `color_temp` and `hs`, the state of the `supported_features` attribute is `4`.

<p class='img'>
  <img src='/images/integrations/light/state_light.png' alt='Screenshot showing three lights with different states: `on`, `off`, or `unavailable`'>
  Three lights with different states: `on`, `off`, or `unavailable`.
</p>

The `state.state` is the heart of the [state object](#about-the-state-object). State holds the information of interest of an entity. For example, if a
light is on or off, the current temperature, or the amount of energy used. The state object stores 3
timestamps related to the state: `last_updated`, `last_changed`, and `last_reported`. Each
entity has exactly one state, and the state only holds one value at a time.

### About entity state attributes

The state only holds one value at a time. However, entities can store related entity state attributes in the state object. For example,
the state of a light is _on_, and the related attributes could be its
current brightness and color values. [State change events](/docs/configuration/events/#events-and-state-changes) can be used as triggers.
The current state can be used in [conditions](/docs/automation/condition/). The example below shows three lights with different entity state attributes.

<p class='img'>
  <img src='/images/integrations/light/state_light.png' alt='Screenshot showing three lights with different states and attributes'>
  Example showing three lights with different entity state attributes.
</p>

Entities have some attributes that are not related to its state, such as `friendly_name`. A few attributes are available on all entities, such as `friendly_name` or `icon`. In addition to those, each integration has its own attributes to represent extra state data about the entity. For example, the light integration has attributes for the current brightness and color of the light. When an attribute is not available, Home Assistant will not write it to the state. Entity attributes are optional.

When using templates, attributes will be available by their name. For example `state.attributes.assumed_state`.

The table lists common state attributes that may be present, depending on the entity domain.

| Attribute             | Description                                                                                                                                                                                                  |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `friendly_name`       | Name of the entity. Example: `Kitchen Ceiling`.                                                                                                                                                              |
| `icon`                | Icon to use for the entity in the frontend. Example: `mdi:home`.                                                                                                                                             |
| `entity_picture`      | URL to a picture that should be used instead of showing the domain icon. Example: `http://example.com/picture.jpg`.                                                                                          |
| `assumed_state`       | Boolean if the current state is an assumption. [More info](/blog/2016/02/12/classifying-the-internet-of-things/#classifiers) Example: `True`.                                                                |
| `unit_of_measurement` | The unit of measurement the state is expressed in. Used for grouping graphs or understanding the entity. Example: `°C`.                                                                                      |
| `attribution`         | The provider of the data. For example, "Data provided by rejseplanen.dk", "Data provided by openSenseMap"                                                                                                    |
| `device_class`        | The type of device that an entity represents. Used to display device specific information in the UI.                                                                                                         |
| `supported_features`  | The features an entity supports. For covers, for example, it might list `opening`, `closing`, `stopping`, `setting position`. For media players, it might list `play`, `pause`, `stop`, and `volume control` |

When an attribute contains spaces, you can retrieve it like this: `state_attr('sensor.livingroom', 'Battery numeric')`.

## Context

Context is a property used in state objects and events. It ties {% term events %} and {% term states %} together in Home Assistant. Whenever an {% term automation %} or user interaction causes a state to change, a new context is assigned in the state object. This context will be attached to all events and states that happen as a result of the change.

| Field        | Description                                                                                                                                                                  |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `context_id` | Unique identifier for the context.                                                                                                                                           |
| `user_id`    | Unique identifier of the user that started the change. Will be `None` if the action was not started by a user (for example, started by an automation).                       |
| `parent_id`  | Unique identifier of the parent context that started the change, if available. For example, if an automation is triggered, the context of the trigger will be set as parent. |
