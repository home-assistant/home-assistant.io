---
title: Water heater
description: Instructions on how to set up water heater devices within Home Assistant.
ha_release: 0.81
ha_domain: water_heater
ha_quality_scale: internal
ha_category: []
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: entity
---

The **Water heater** {% term integration %} lets you monitor and control supported hot water heaters in Home Assistant. You can use it to check whether a water heater is on or off, adjust the target temperature, change the operation mode, and build automations around those changes.

To enable this {% term integration %}, pick one of the platforms, and add it to your {% term "`configuration.yaml`" %}:

```yaml
# Example configuration.yaml entry
water_heater:
  platform: demo
```

{% warning %}

 Misconfiguring Water Heater automations may allow water temperatures to drop into ranges between 25°C to 45°C (77°F and 113°F) which allows for Legionella bacteria growth. This can pose serious health risks, including death from Legionnaires' disease. Maintain water temperature ≥ 60°C (140°F) for bacterial safety.

{% endwarning %}

## The state of a water heater entity

A water heater entity state reflects the current operation of the device. Common states include:

- **On**: The water heater is on.
- **Off**: The water heater is off.
- **Eco**: Energy efficient mode, provides energy savings and fast heating.
- **Electric**: Electric only mode. This mode uses the most energy.
- **Performance**: High performance mode.
- **High demand**: Meet high demands when the water heater is undersized.
- **Heat pump**: Heat pump is the slowest to heat, but it uses less energy.
- **Gas**: Gas only mode. This mode uses the most energy.

The exact states depend on the platform and the water heater model.

In addition, the entity can have the following states:

- **Unavailable**: The entity is currently unavailable.
- **Unknown**: The state is not yet known.

{% include integrations/triggers.md %}

{% include integrations/conditions.md %}

## Actions

### Water heater control actions

Available actions: `water_heater.set_temperature`, `water_heater.set_operation_mode`, `water_heater.set_away_mode`, `water_heater.turn_on`, `water_heater.turn_off`

{% tip %}
Not all water heater actions may be available for your platform. Be sure to check the available actions Home Assistant has enabled by checking {% my developer_services title="**Settings** > **Developer tools** > **Actions**" %}.
{% endtip %}

### Action: Set temperature

The `water_heater.set_temperature` action sets the target temperature of the water heater device.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `target` | yes | A target selector for the water heater device or devices to control. You can target entities, devices, areas, floors, or labels. |
| `temperature` | no | New target temperature for water heater |
| `operation_mode` | yes | Operation mode to use while setting the target temperature. For a list of possible modes, refer to the {% term integration %} documentation. |

#### Automation example

```yaml
automation:
  triggers:
    - trigger: time
      at: "07:15:00"
  actions:
    - action: water_heater.set_temperature
      target:
        entity_id: water_heater.demo
      data:
        temperature: 24
        operation_mode: eco
```

### Action: Set operation mode

The `water_heater.set_operation_mode` action sets the operation mode for the water heater device.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `target` | yes | A target selector for the water heater device or devices to control. You can target entities, devices, areas, floors, or labels. |
| `operation_mode` | no | New value of operation mode. For a list of possible modes, refer to the integration documentation. |

#### Automation example

```yaml
automation:
  triggers:
    - trigger: time
      at: "07:15:00"
  actions:
    - action: water_heater.set_operation_mode
      target:
        entity_id: water_heater.demo
      data:
        operation_mode: eco
```

### Action: Set away mode

The `water_heater.set_away_mode` action turns away mode on or off for the water heater device.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `target` | yes | A target selector for the water heater device or devices to control. You can target entities, devices, areas, floors, or labels. |
| `away_mode` | no | New value of away mode. Use `true` to enable away mode or `false` to disable it. |

#### Automation example

```yaml
automation:
  triggers:
    - trigger: time
      at: "07:15:00"
  actions:
    - action: water_heater.set_away_mode
      target:
        entity_id: water_heater.demo
      data:
        away_mode: true
```

### Action: Turn on

The `water_heater.turn_on` action turns the water heater device on.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `target` | yes | A target selector for the water heater device or devices to control. You can target entities, devices, areas, floors, or labels. |

### Action: Turn off

The `water_heater.turn_off` action turns the water heater device off.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `target` | yes | A target selector for the water heater device or devices to control. You can target entities, devices, areas, floors, or labels. |

## Water heater automation examples

You can use water heater triggers and conditions in automations to keep hot water ready when you need it, while still using less energy the rest of the day.

{% include docs/paste_yaml_tip.md %}

### Automation: lower the recirculation pump when the water heater enters Eco mode

When the water heater changes to **Eco** mode, lower the recirculation pump speed to match the lower-demand schedule.

- **Trigger**: Water heater operation mode changed
  - **Target**: Utility room water heater
  - **Operation mode**: Eco
- **Action**: Turn on switch

{% details "YAML example for lowering the recirculation pump in Eco mode" %}

{% example %}
automation: |
  alias: "Lower recirculation pump in Eco mode"
  triggers:
    - trigger: water_heater.operation_mode_changed
      target:
        entity_id: water_heater.utility_room
      options:
        operation_mode: eco
  actions:
    - action: switch.turn_on
      target:
        entity_id: switch.recirculation_pump_low_speed
{% endexample %}

{% enddetails %}

### Automation: enable away mode only when the target temperature is already low

When everybody leaves home, enable away mode only if the target temperature is already below your normal daytime setting.

- **Trigger**: State: Person changes to not_home
- **Condition**: Water heater target temperature
  - **Target**: Utility room water heater
  - **Threshold type**: Below (50°C)
- **Action**: Set water heater away mode

{% details "YAML example for enabling away mode from a lower setpoint" %}

{% example %}
automation: |
  alias: "Enable away mode when the setpoint is already low"
  triggers:
    - trigger: state
      entity_id: person.alex
      to: "not_home"
  conditions:
    - condition: water_heater.is_target_temperature
      target:
        entity_id: water_heater.utility_room
      options:
        threshold:
          type: below
          value:
            number: 50
            unit_of_measurement: "°C"
  actions:
    - action: water_heater.set_away_mode
      target:
        entity_id: water_heater.utility_room
      data:
        away_mode: true
{% endexample %}

{% enddetails %}
