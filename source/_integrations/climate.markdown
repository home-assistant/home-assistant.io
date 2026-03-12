---
title: Climate
description: Instructions on how to setup climate control devices within Home Assistant.
ha_category:
  - Climate
ha_release: 0.19
ha_quality_scale: internal
ha_domain: climate
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: entity
---

The **Climate** {% term integration %} allows you to control and monitor HVAC (heating, ventilating, and air conditioning) devices and thermostats.

{% include integrations/building_block_integration.md %}

## The state of an HVAC entity

An HVAC entity can have the following states, depending on the specific climate device and its capabilities.

- **Off**: The device is turned off.
- **Heat**: The device is set to heat to a target temperature.
- **Cool**: The device is set to cool to a target temperature.
- **Heat/Cool**: The device is set to heat/cool to a target temperature range.
- **Auto**: The device is set to a schedule, learned behavior, AI.
- **Dry**: The device is set to dry/humidity mode.
- **Fan only**: The device only has the fan on. No heating or cooling is taking place.
- **Unavailable**: The entity is currently unavailable.
- **Unknown**: The state is not yet known.

## Actions

### Climate control actions

Available actions: `climate.set_aux_heat`, `climate.set_preset_mode`, `climate.set_temperature`, `climate.set_humidity`, `climate.set_fan_mode`, `climate.set_hvac_mode`, `climate.set_swing_mode`, `climate.set_swing_horizontal_mode`, `climate.turn_on`, `climate.turn_off`, `climate.toggle`

{% tip %}
Not all climate {% term actions %}  may be available for your platform. You can check which climate action are available under {% my developer_call_service title="**Settings** > **Developer tools** > **Actions**" %}.
{% endtip %}

### Action: Set auxiliary heat

The `climate.set_aux_heat` action allows you to turn the auxiliary heater on/off for the climate device.

| Data attribute | Required | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | No | String or list of strings that define the entity ID(s) of climate device(s) to control. To target all climate devices, use `all`.
| `aux_heat` | Yes | New value of auxiliary heater.

#### Automation example

```yaml
automation:
  triggers:
    - trigger: time
      at: "07:15:00"
  actions:
    - action: climate.set_aux_heat
      target:
        entity_id: climate.kitchen
      data:
        aux_heat: true
```

### Action: Set preset mode

The `climate.set_preset_mode` action allows you to set the preset mode for climate device. Away mode changes the target temperature permanently to a temperature
reflecting a situation where the climate device is set to save energy. For example, this may be used to emulate a
"vacation mode."

| Data attribute | Required | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | No | String or list of strings that define the entity ID(s) of climate device(s) to control. To target all climate devices, use `all`.
| `preset_mode` | Yes | New value of preset mode.

#### Automation example

```yaml
automation:
  triggers:
    - trigger: time
      at: "07:15:00"
  actions:
    - action: climate.set_preset_mode
      target:
        entity_id: climate.kitchen
      data:
        preset_mode: "eco"
```

### Action: Set temperature

The `climate.set_temperature` action allows you to set the target temperature of a climate device.

| Data attribute | Required | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | No | String or list of strings that define the entity ID(s) of climate device(s) to control. To target all climate devices, use `all`.
| `temperature` | No | New target temperature for climate device (commonly referred to as a *setpoint*). Do not use if `hvac_mode` is `heat_cool`.
| `target_temp_high` | No | The highest temperature that the climate device will allow. Required if `hvac_mode` is `heat_cool`. Required together with `target_temp_low`.
| `target_temp_low` | No | The lowest temperature that the climate device will allow. Required if `hvac_mode` is `heat_cool`.  Required together with `target_temp_high`.
| `hvac_mode` | No | HVAC mode to set the climate device to. This defaults to current HVAC mode if not set, or set incorrectly.

#### Automation examples

```yaml
### Set temperature to 24 in heat mode
automation:
  triggers:
    - trigger: time
      at: "07:15:00"
  actions:
    - action: climate.set_temperature
      target:
        entity_id: climate.kitchen
      data:
        temperature: 24
        hvac_mode: heat
```

```yaml
### Set temperature range to 20 to 24 in heat_cool mode
automation:
  triggers:
    - trigger: time
      at: "07:15:00"
  actions:
    - action: climate.set_temperature
      target:
        entity_id: climate.kitchen
      data:
        target_temp_high: 24
        target_temp_low: 20
        hvac_mode: heat_cool
```

### Action: Set humidity

The `climate.set_humidity` action allows you to set the target humidity of a climate device.

| Data attribute | Required | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | No | String or list of strings that define the entity ID(s) of climate device(s) to control. To target all climate devices, use `all`.
| `humidity` | Yes | New target humidity for climate device

#### Automation example

```yaml
automation:
  triggers:
    - trigger: time
      at: "07:15:00"
  actions:
    - action: climate.set_humidity
      target:
        entity_id: climate.kitchen
      data:
        humidity: 60
```

### Action: Set fan mode

The `climate.set_fan_mode` action allows you to set the fan operation for a climate device.

| Data attribute | Required | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | No | String or list of strings that define the entity ID(s) of climate device(s) to control. To target all climate devices, use `all`.
| `fan_mode` | Yes | New value of fan mode

#### Automation example

```yaml
automation:
  triggers:
    - trigger: time
      at: "07:15:00"
  actions:
    - action: climate.set_fan_mode
      target:
        entity_id: climate.kitchen
      data:
        fan_mode: "low"
```

### Action: Set HVAC mode

The `climate.set_hvac_mode` action allows you to set the climate device's HVAC mode.

| Data attribute | Required | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | No | String or list of strings that define the entity ID(s) of climate device(s) to control. To target all climate devices, use `all`.
| `hvac_mode` | Yes | New value of HVAC mode

#### Automation example

```yaml
automation:
  triggers:
    - trigger: time
      at: "07:15:00"
  actions:
    - action: climate.set_hvac_mode
      target:
        entity_id: climate.kitchen
      data:
        hvac_mode: heat
```

### Action: Set swing mode

The `climate.set_swing_mode` action allows you to set the swing operation mode for a climate device.

| Data attribute | Required | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | No | String or list of strings that define the entity ID(s) of climate device(s) to control. To target all climate devices, use `all`.
| `swing_mode` | Yes | New value of swing mode: `off`, `horizontal`, `vertical` or `both`.

#### Automation example

```yaml
automation:
  triggers:
    - trigger: time
      at: "07:15:00"
  actions:
    - action: climate.set_swing_mode
      target:
        entity_id: climate.kitchen
      data:
        swing_mode: both
```

### Action: Set swing horizontal mode

The `climate.set_swing_horizontal_mode` action allows you to set the horizontal swing operation mode for the climate device.

| Data attribute          | Required | Description                                                                                                                       |
| ----------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `entity_id`             | No      | String or list of strings that define the entity ID(s) of climate device(s) to control. To target all climate devices, use `all`. |
| `swing_horizontal_mode` | Yes       | New value of horizontal swing mode.                                                                                               |

#### Automation example

```yaml
automation:
  trigger:
    platform: time
    at: "07:15:00"
  action:
    - action: climate.set_swing_horizontal_mode
      target:
        entity_id: climate.kitchen
      data:
        swing_horizontal_mode: on
```

### Action: Turn on

The `climate.turn_on` action allows you to turn the climate device on. This is only supported if the climate device supports being turned off.

| Data attribute | Required | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | No | String or list of strings that define the entity ID(s) of climate device(s) to control. To target all climate devices, use `all`.

### Action: Turn off

The `climate.turn_off` action allows you to turn the climate device off. This is supported only if the climate device is in HVAC mode `off`.

| Data attribute | Required | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | No | String or list of strings that define the entity ID(s) of climate device(s) to control. To target all climate devices, use `all`.

### Action: Toggle

The `climate.toggle` action allows you to toggle the climate device. This is only supported if the climate device supports being turned on and off.

| Data attribute | Required | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | No | String or list of strings that define the entity ID(s) of climate device(s) to control. To target all climate devices, use `all`.

## Attributes

The climate entity has extra attributes to represent the state of the thermostat.

| Name | Description |
| ---- | ----------- |
| `hvac_action` | Current state: `heating` / `cooling` / `idle`.
| `fan_mode` | If the fan is currently on or off: `on` / `off`.

It depends on the thermostat you are using which states are available.

## Triggers

The climate {% term integration %} provides purpose-specific [automation triggers](/docs/automation/trigger/#entity-triggers). These are available when the **Purpose-specific triggers and conditions** feature in {% my labs title="**Settings** > **System** > **Labs**" %} is enabled.

These triggers only fire when the entity transitions from a known, valid state. If a device goes offline and reconnects (transitioning from `unavailable` or `unknown` back to an active state), the trigger does not fire for that recovery.

### Trigger: Climate-control device turned on

{% include integrations/labs_entity_triggers_note.md %}

The `climate.turned_on` trigger fires when the climate device is turned on.

The following example triggers the automation as soon as the first of the two targeted climate devices turns on:

```yaml
automation:
  triggers:
    - trigger: climate.turned_on
      target:
        entity_id:
          - climate.living_room
          - climate.bedroom
      options:
        behavior: first
```

- **`target`**
  - **Description**: The `climate` entity to monitor.
  - **Optional**: No
- **`options`**
  - **`behavior`**
    - **Description**: Controls which events trigger the automation when multiple climate devices are targeted. Options: `any` (fires every time any targeted climate device turns on), `first` (fires only when the first targeted climate device turns on), `last` (fires only after the last targeted climate device has turned on).
    - **Optional**: Yes

### Trigger: Climate-control device turned off

{% include integrations/labs_entity_triggers_note.md %}

The `climate.turned_off` trigger fires when the climate device is turned off.

The following example triggers the automation only after both targeted climate devices have turned off:

```yaml
automation:
  triggers:
    - trigger: climate.turned_off
      target:
        entity_id:
          - climate.living_room
          - climate.bedroom
      options:
        behavior: last
```

- **`target`**
  - **Description**: The `climate` entity to monitor.
  - **Optional**: No
- **`options`**
  - **`behavior`**
    - **Description**: Controls which events trigger the automation when multiple climate devices are targeted. Options: `any` (fires every time any targeted climate device turns off), `first` (fires only when the first targeted climate device turns off), `last` (fires only after the last targeted climate device has turned off).
    - **Optional**: Yes

### Trigger: Climate-control device started cooling

{% include integrations/labs_entity_triggers_note.md %}

The `climate.started_cooling` trigger fires when the climate device begins cooling.

The following example triggers the automation as soon as the first of the two targeted climate devices starts cooling:

```yaml
automation:
  triggers:
    - trigger: climate.started_cooling
      target:
        entity_id:
          - climate.living_room
          - climate.bedroom
      options:
        behavior: first
```

- **`target`**
  - **Description**: The `climate` entity to monitor.
  - **Optional**: No
- **`options`**
  - **`behavior`**
    - **Description**: Controls which events trigger the automation when multiple climate devices are targeted. Options: `any` (fires every time any targeted climate device starts cooling), `first` (fires only when the first targeted climate device starts cooling), `last` (fires only after the last targeted climate device has started cooling).
    - **Optional**: Yes

### Trigger: Climate-control device started drying

{% include integrations/labs_entity_triggers_note.md %}

The `climate.started_drying` trigger fires when the climate device begins operating in dry mode.

The following example triggers the automation as soon as the first of the two targeted climate devices starts drying:

```yaml
automation:
  triggers:
    - trigger: climate.started_drying
      target:
        entity_id:
          - climate.living_room
          - climate.bedroom
      options:
        behavior: first
```

- **`target`**
  - **Description**: The `climate` entity to monitor.
  - **Optional**: No
- **`options`**
  - **`behavior`**
    - **Description**: Controls which events trigger the automation when multiple climate devices are targeted. Options: `any` (fires every time any targeted climate device starts drying), `first` (fires only when the first targeted climate device starts drying), `last` (fires only after the last targeted climate device has started drying).
    - **Optional**: Yes

### Trigger: Climate-control device started heating

{% include integrations/labs_entity_triggers_note.md %}

The `climate.started_heating` trigger fires when the climate device begins operating in heating mode.

The following example triggers the automation as soon as the first of the two targeted climate devices starts heating:

```yaml
automation:
  triggers:
    - trigger: climate.started_heating
      target:
        entity_id:
          - climate.living_room
          - climate.bedroom
      options:
        behavior: first
```

- **`target`**
  - **Description**: The `climate` entity to monitor.
  - **Optional**: No
- **`options`**
  - **`behavior`**
    - **Description**: Controls which events trigger the automation when multiple climate devices are targeted. Options: `any` (fires every time any targeted climate device starts heating), `first` (fires only when the first targeted climate device starts heating), `last` (fires only after the last targeted climate device has started heating).
    - **Optional**: Yes

### Trigger: Climate-control device mode changed

{% include integrations/labs_entity_triggers_note.md %}

The `climate.hvac_mode_changed` trigger fires when the HVAC mode changes.

The following example triggers the automation whenever the HVAC mode of the living room climate device changes:

```yaml
automation:
  triggers:
    - trigger: climate.hvac_mode_changed
      target:
        entity_id: climate.living_room
      options:
        hvac_mode: heat
```

- **`target`**
  - **Description**: The `climate` entity to monitor.
  - **Optional**: No
- **`options`**
  - **`hvac_mode`**
    - **Description**: Only trigger when the HVAC mode changes to one of these values. Types: `heat`, `cool`, `heat_cool`, `auto`, `dry`, `fan_only`, `off`.
    - **Optional**: No

### Trigger: Climate-control device target temperature changed

{% include integrations/labs_entity_triggers_note.md %}

The `climate.target_temperature_changed` trigger fires when the target temperature setpoint changes.

The following example triggers the automation whenever the target temperature of the living room changes, but only when the new value is between 20 °C and 25 °C:

```yaml
automation:
  triggers:
    - trigger: climate.target_temperature_changed
      target:
        entity_id: climate.living_room
      options:
        above: 20
        below: 25
```

- **`target`**
  - **Description**: The `climate` entity to monitor.
  - **Optional**: No
- **`options`**
  - **`above`**
    - **Description**: Only trigger if the new target temperature is above this value.
    - **Optional**: Yes
  - **`below`**
    - **Description**: Only trigger if the new target temperature is below this value.
    - **Optional**: Yes

### Trigger: Climate-control device target temperature crossed threshold

{% include integrations/labs_entity_triggers_note.md %}

The `climate.target_temperature_crossed_threshold` trigger fires when the target temperature setpoint crosses a defined threshold.

The following example triggers the automation when the target temperature of the living room crosses above the 21 °C threshold:

```yaml
automation:
  triggers:
    - trigger: climate.target_temperature_crossed_threshold
      target:
        entity_id: climate.living_room
      options:
        threshold_type: above
        lower_limit: 21
```

- **`target`**
  - **Description**: The `climate` entity to monitor.
  - **Optional**: No
- **`options`**
  - **`threshold_type`**
    - **Description**: How the threshold is defined. Types: `above`, `below`, `between`, `outside`.
    - **Optional**: No
  - **`lower_limit`**
    - **Description**: The lower threshold value.
    - **Optional**: Required when threshold type is `above`, `between`, or `outside`.
  - **`upper_limit`**
    - **Description**: The upper threshold value.
    - **Optional**: Required when threshold type is `below`, `between`, or `outside`.
  - **`behavior`**
    - **Description**: Controls which crossings trigger the automation when multiple climate devices are targeted. Options: `any` (fires every time any targeted climate device crosses the threshold), `first` (fires only when the first targeted climate device crosses the threshold), `last` (fires only after the last targeted climate device has crossed the threshold).
    - **Optional**: Yes

### Trigger: Climate-control device target humidity changed

{% include integrations/labs_entity_triggers_note.md %}

The `climate.target_humidity_changed` trigger fires when the target humidity setpoint changes.

The following example triggers the automation whenever the target humidity of the living room changes, but only when the new value is between 40% and 60%:

```yaml
automation:
  triggers:
    - trigger: climate.target_humidity_changed
      target:
        entity_id: climate.living_room
      options:
        above: 40
        below: 60
```

- **`target`**
  - **Description**: The `climate` entity to monitor.
  - **Optional**: No
- **`options`**
  - **`above`**
    - **Description**: Only trigger if the new target humidity is above this percentage (0–100).
    - **Optional**: Yes
  - **`below`**
    - **Description**: Only trigger if the new target humidity is below this percentage (0–100).
    - **Optional**: Yes

### Trigger: Climate-control device target humidity crossed threshold

{% include integrations/labs_entity_triggers_note.md %}

The `climate.target_humidity_crossed_threshold` trigger fires when the target humidity setpoint crosses a defined threshold.

The following example triggers the automation when the target humidity of the living room crosses above the 50% threshold:

```yaml
automation:
  triggers:
    - trigger: climate.target_humidity_crossed_threshold
      target:
        entity_id: climate.living_room
      options:
        threshold_type: above
        lower_limit: 50
```

- **`target`**
  - **Description**: The `climate` entity to monitor.
  - **Optional**: No
- **`options`**
  - **`threshold_type`**
    - **Description**: How the threshold is defined. Types: `above`, `below`, `between`, `outside`.
    - **Optional**: No
  - **`lower_limit`**
    - **Description**: The lower threshold value.
    - **Optional**: Required when threshold type is `above`, `between`, or `outside`.
  - **`upper_limit`**
    - **Description**: The upper threshold value.
    - **Optional**: Required when threshold type is `below`, `between`, or `outside`.
  - **`behavior`**
    - **Description**: Controls which crossings trigger the automation when multiple climate devices are targeted. Options: `any` (fires every time any targeted climate device crosses the threshold), `first` (fires only when the first targeted climate device crosses the threshold), `last` (fires only after the last targeted climate device has crossed the threshold).
    - **Optional**: Yes

## Conditions

The climate {% term integration %} provides purpose-specific [automation conditions](/docs/automation/condition/#entity-conditions). These are available when the **Purpose-specific triggers and conditions** feature in {% my labs title="**Settings** > **System** > **Labs**" %} is enabled.

Entities that are `unavailable` or `unknown` are excluded from the check. With `behavior: any` (the default), the condition fails if all targeted entities are `unavailable` or `unknown`. With `behavior: all`, the condition passes if all targeted entities are `unavailable` or `unknown`.

### Condition: Climate-control device is on

{% include integrations/labs_entity_triggers_note.md %}

The `climate.is_on` condition passes when the climate device is on.

The following example passes only when both the living room and bedroom climate devices are on:

```yaml
automation:
  conditions:
    - condition: climate.is_on
      target:
        entity_id:
          - climate.living_room
          - climate.bedroom
      options:
        behavior: all
```

- **`target`**
  - **Description**: The `climate` entity to check.
  - **Optional**: No
- **`options`**
  - **`behavior`**
    - **Description**: How to evaluate when multiple climate devices are targeted. Defaults to `any` if not specified. Options: `any` (passes if at least one climate device is on), `all` (passes only if all targeted climate devices are on).
    - **Optional**: Yes

### Condition: Climate-control device is off

{% include integrations/labs_entity_triggers_note.md %}

The `climate.is_off` condition passes when the climate device is off.

The following example passes only when both the living room and bedroom climate devices are off:

```yaml
automation:
  conditions:
    - condition: climate.is_off
      target:
        entity_id:
          - climate.living_room
          - climate.bedroom
      options:
        behavior: all
```

- **`target`**
  - **Description**: The `climate` entity to check.
  - **Optional**: No
- **`options`**
  - **`behavior`**
    - **Description**: How to evaluate when multiple climate devices are targeted. Defaults to `any` if not specified. Options: `any` (passes if at least one climate device is off), `all` (passes only if all targeted climate devices are off).
    - **Optional**: Yes

### Condition: Climate-control device is cooling

{% include integrations/labs_entity_triggers_note.md %}

The `climate.is_cooling` condition passes when the climate device is actively cooling.

The following example passes only when both the living room and bedroom climate devices are actively cooling:

```yaml
automation:
  conditions:
    - condition: climate.is_cooling
      target:
        entity_id:
          - climate.living_room
          - climate.bedroom
      options:
        behavior: all
```

- **`target`**
  - **Description**: The `climate` entity to check.
  - **Optional**: No
- **`options`**
  - **`behavior`**
    - **Description**: How to evaluate when multiple climate devices are targeted. Defaults to `any` if not specified. Options: `any` (passes if at least one climate device is actively cooling), `all` (passes only if all targeted climate devices are actively cooling).
    - **Optional**: Yes

### Condition: Climate-control device is heating

{% include integrations/labs_entity_triggers_note.md %}

The `climate.is_heating` condition passes when the climate device is actively heating.

The following example passes only when both the living room and bedroom climate devices are actively heating:

```yaml
automation:
  conditions:
    - condition: climate.is_heating
      target:
        entity_id:
          - climate.living_room
          - climate.bedroom
      options:
        behavior: all
```

- **`target`**
  - **Description**: The `climate` entity to check.
  - **Optional**: No
- **`options`**
  - **`behavior`**
    - **Description**: How to evaluate when multiple climate devices are targeted. Defaults to `any` if not specified. Options: `any` (passes if at least one climate device is actively heating), `all` (passes only if all targeted climate devices are actively heating).
    - **Optional**: Yes

### Condition: Climate-control device is drying

{% include integrations/labs_entity_triggers_note.md %}

The `climate.is_drying` condition passes when the climate device is actively operating in dry mode.

The following example passes only when both the living room and bedroom climate devices are operating in dry mode:

```yaml
automation:
  conditions:
    - condition: climate.is_drying
      target:
        entity_id:
          - climate.living_room
          - climate.bedroom
      options:
        behavior: all
```

- **`target`**
  - **Description**: The `climate` entity to check.
  - **Optional**: No
- **`options`**
  - **`behavior`**
    - **Description**: How to evaluate when multiple climate devices are targeted. Defaults to `any` if not specified. Options: `any` (passes if at least one climate device is operating in dry mode), `all` (passes only if all targeted climate devices are operating in dry mode).
    - **Optional**: Yes
