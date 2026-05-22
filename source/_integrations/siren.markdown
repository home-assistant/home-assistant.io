---
title: Siren
description: Instructions on how to set up siren devices within Home Assistant.
ha_category:
  - Siren
ha_release: '2021.8'
ha_domain: siren
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
  - '@raman325'
ha_integration_type: entity
---

The **Siren** {% term integration %} lets you control siren and chime devices and build automations around when they turn on or off.

{% include integrations/building_block_integration.md %}

## The state of a siren entity

The state of a siren entity can be either **On** or **Off**.

In addition, the entity can have the following states:

- **Unavailable**: The entity is currently unavailable.
- **Unknown**: The state is not yet known.

{% include integrations/triggers.md %}

{% include integrations/conditions.md %}

## Actions

### Siren actions

Available {% term actions %}: `siren.turn_on`, `siren.turn_off`, `siren.toggle`

### Action: Turn on

The `siren.turn_on` action turns the siren on.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of sirens to control.

There are three optional input parameters that can be passed into the action depending on whether or not your device supports them. Check the device's integration documentation for more details.

| Parameter Name  | Input Type              | Notes                                                                               |
|---------------- |-------------------------|-------------------------------------------------------------------------------------|
| `tone`          | `string` or `integer`   | When the `available_tones` property is a map, either the key or value can be used.  |
| `duration`      | `integer`               |                                                                                     |
| `volume_level`  | `float` between 0 and 1 |                                                                                     |

### Action: Turn off

The `siren.turn_off` action turns the siren off.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of sirens to control.

### Action: Toggle

The `siren.toggle` action toggles the siren on or off.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of sirens to control.

## Siren automation examples

You can use siren triggers and conditions in automations to stay informed, light a path, or silence a siren at the right time.

{% include docs/paste_yaml_tip.md %}

### Automation: get a phone alert when the siren starts

If a siren turns on while you are in another part of the building, you may want a notification right away. This automation sends a message to your phone as soon as the entry siren starts.

- **Trigger**: Siren turned on
  - **Target**: Entry siren
  - **Trigger when**: Each
  - **For at least**: 00:00:00
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a siren start notification" %}

{% example %}
automation: |
  alias: "Notify when the siren turns on"
  triggers:
    - trigger: siren.turned_on
      target:
        entity_id: siren.entry
      options:
        behavior: any
        for: "00:00:00"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "Siren started"
        message: >
          The entry siren just turned on.
{% endexample %}

{% enddetails %}

### Automation: turn off a siren after it has been on for 5 minutes

If you want a siren to stop after a set time, you can check whether it is still on before turning it off. This automation checks every minute and turns off the patio siren after it has stayed on for 5 minutes.

- **Trigger**: Time pattern: Every minute
- **Condition**: Siren is on
  - **Target**: Patio siren
  - **Condition passes if**: Any
  - **For at least**: 00:05:00
- **Action**: Turn off siren

{% details "YAML example for turning off a siren after 5 minutes" %}

{% example %}
automation: |
  alias: "Turn off the patio siren after 5 minutes"
  triggers:
    - trigger: time_pattern
      minutes: "/1"
  conditions:
    - condition: siren.is_on
      target:
        entity_id: siren.patio
      options:
        behavior: any
        for: "00:05:00"
  actions:
    - action: siren.turn_off
      target:
        entity_id: siren.patio
{% endexample %}

{% enddetails %}
