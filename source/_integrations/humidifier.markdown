---
title: Humidifier
description: Instructions on how to set up humidity control devices within Home Assistant.
ha_category:
  - Humidifier
ha_release: '0.112'
ha_domain: humidifier
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
  - '@Shulyaka'
ha_integration_type: entity
related:
  - docs: /docs/configuration/customizing-devices/
    title: Customizing devices
  - docs: /dashboards/
    title: Dashboard
---

The **Humidifier** {% term integration %} is built for the controlling and monitoring of humidifiers, dehumidifiers, and hygrostat devices.

{% include integrations/building_block_integration.md %}

## The state of a humidifier entity

The state of a humidifier entity can be either **On** or **Off**.

In addition, the entity can have the following states:

- **Unavailable**: The entity is currently unavailable.
- **Unknown**: The state is not yet known.

## Device class

{% include integrations/device_class_intro.md %}

The screenshot shows different text and UI for different device classes for humidifiers:

<p class='img'>
<img src='/images/screenshots/humidifier_device_class.png' />
Humidifier device classes.
</p>

The following device classes are supported for humidifiers:

- **Humidifier**: Adds humidity to the air around it.
- **Dehumidifier**: Removes humidity from the air around it.

## Actions

### Humidifier actions

Available actions: `humidifier.set_mode`, `humidifier.set_humidity`, `humidifier.turn_on`, `humidifier.turn_off`, `humidifier.toggle`

{% tip %}
Not all humidifier actions may be available for your platform. Be sure to check the available actions Home Assistant has enabled by checking the **Actions** page in the [Developer Tools](/docs/tools/dev-tools/).
{% endtip %}

### Action `humidifier.set_mode`

Set mode for the humidifier device. This action is only available if the device supports operating in several working modes. The list of available modes and the device functionality in every mode depend on the device itself.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of humidifier devices to control.
| `mode` | no  | New mode.

#### Automation example

```yaml
automation:
  triggers:
    - trigger: time
      at: "07:15:00"
  actions:
    - action: humidifier.set_mode
      target:
        entity_id: humidifier.bedroom
      data:
        mode: "eco"
```

### Action `humidifier.set_humidity`

Set target humidity of the humidifier device

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of humidifier devices to control.
| `humidity` | no  | New target humidity for humidifier device

#### Automation example

```yaml
automation:
  triggers:
    - trigger: time
      at: "07:15:00"
  actions:
    - action: humidifier.set_humidity
      target:
        entity_id: humidifier.bedroom
      data:
        humidity: 60
```

### Action `humidifier.turn_on`

Turn the humidifier device on.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of humidifier devices to control.

### Action `humidifier.turn_off`

Turn the humidifier device off.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of humidifier devices to control.

### Action `humidifier.toggle`

Toggle the humidifier device on/off.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of humidifier devices to control.
