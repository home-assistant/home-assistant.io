---
title: "Blueprint schema"
description: "The schema for a valid blueprint."
---

Schema of the blueprint metadata:

```ts
interface BlueprintInput {
  name?: string;
  description?: string;
  selector?: Selector;
  default?: any;
}

interface Blueprint {
  blueprint: {
    domain: string;
    name: string;
    input?: Record<string, BlueprintInput | null>;
    description?: string;
    source_url?: string;
  }
}
```

The [built-in blueprints](https://github.com/home-assistant/core/tree/dev/homeassistant/components/automation/blueprints) are great examples.

Here is the built-in motion light blueprint:

```yaml
blueprint:
  name: Motion-activated Light
  description: Turn on a light when motion is detected.
  domain: automation
  source_url: https://github.com/home-assistant/core/blob/dev/homeassistant/components/automation/blueprints/motion_light.yaml
  input:
    motion_entity:
      name: Motion Sensor
      selector:
        entity:
          domain: binary_sensor
          device_class: motion
    light_target:
      name: Light
      selector:
        target:
          entity:
            domain: light
    no_motion_wait:
      name: Wait time
      description: Time to leave the light on after last motion is detected.
      default: 120
      selector:
        number:
          min: 0
          max: 3600
          unit_of_measurement: seconds

# If motion is detected within the delay,
# we restart the script.
mode: restart
max_exceeded: silent

trigger:
  platform: state
  entity_id: !input motion_entity
  from: "off"
  to: "on"

action:
  - service: light.turn_on
    target: !input light_target
  - wait_for_trigger:
      platform: state
      entity_id: !input motion_entity
      from: "on"
      to: "off"
  - delay: !input no_motion_wait
  - service: light.turn_off
    target: !input light_target

```
