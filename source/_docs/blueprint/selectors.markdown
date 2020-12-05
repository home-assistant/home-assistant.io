---
title: "Selectors"
description: "Documentation on available selectors."
---

Selectors can be used to specify what values are accepted for an input.

## Entity Selector

Pick an entity. The chosen value will be an entity ID.

```yaml
entity:
  # All fields are optional
  integration: zha
  domain: binary_sensor
  device_class: motion
```

## Device Selector

Pick a device. The chosen value will be a device ID.

```yaml
device:
  # All fields are optional
  integration: zha
  manufacturer: Philips
  model: Remote X1
  entity: <see entity selector>
```

The `entity` option will limit devices that have an entity matching the entity selector.


## Target Selector

Pick a target for service calls. Will be a dictionary containing optionally `entity_id`, `device_id` or `area_id` keys with the picked values.

Meant to be specified as the `target` property in a call service step in a script sequence.

```yaml
target:
  # All fields are optional
  entity:
    integration: zha
    domain: binary_sensor
    device_class: motion

  device:
    integration: zha
    manufacturer: Philips
    model: Remote X1
```

## Number Selector

Pick a number.

```yaml
number:
  # Required
  min: 0
  max: 100
  # Optional
  step: 5
  unit_of_measurement: seconds
  mode: slider  # other valid value 'box'
```

## Boolean Selector

Pick true or false.

```yaml
boolean:
```

## Time Selector

Pick a time.

```yaml
time:
```

## Action Selector

Enter a script action. Will be a list of action steps.

Meant to be specified as the `action` of an automation or any syntax that accepts actions, like `choose`.

```yaml
action:
```


## Area Selector

Pick an area. The chosen value will be an area ID.

```yaml
area:
  # All fields are optional
  entity:
    integration: zha
    domain: binary_sensor
    device_class: motion

  device:
    integration: zha
    manufacturer: Philips
    model: Remote X1
```
