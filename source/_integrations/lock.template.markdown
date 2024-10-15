---
title: "Template Lock"
description: "Instructions on how to integrate Template Locks into Home Assistant."
ha_category:
  - Lock
  - Helper
ha_release: 0.81
ha_iot_class: Local Push
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: template
ha_platforms:
  - lock
ha_integration_type: helper
related:
  - docs: /docs/configuration/
    title: Configuration file
  - docs: /integrations/template/
    title: Template entities
---

The `template` platform creates locks that combines components.

For example, if you have a garage door with a toggle switch that operates the motor and a sensor that allows you know whether the door is open or closed, you can combine these into a lock that knows whether the garage door is open or closed.

This can simplify the GUI and make it easier to write automations.

In optimistic mode, the lock will immediately change state after every command. Otherwise, the lock will wait for state confirmation from the template. Try to enable it, if experiencing incorrect lock operation.

## Configuration

{% include integrations/config_flow.md %}

{% important %}
To be able to add **{% my helpers title="Helpers" %}** via the user interface, you should have `default_config:` in your {% term "`configuration.yaml`" %}. It should already be there by default unless you removed it.
{% endimportant %}

## YAML configuration

To enable Template Locks in your installation, add the following to your {% term "`configuration.yaml`" %} file:

{% raw %}

```yaml
# Example configuration.yaml entry
template:
  - lock:
    - name: Garage door
      value_template: "{{ is_state('sensor.door', 'on') }}"
      lock:
        action: switch.turn_on
        target:
          entity_id: switch.door
      unlock:
        action: switch.turn_off
        target:
          entity_id: switch.door
```

{% endraw %}

{% configuration %}
name:
  description: Name to use in the frontend.
  required: false
  type: string
  default: Template Lock
unique_id:
  description: An ID that uniquely identifies this lock. Set this to a unique value to allow customization through the UI.
  required: false
  type: string
state:
  description: Defines a template to set the state of the lock.
  required: true
  type: template
availability:
  description: >-
    Defines a template to get the `available` state of the entity. If the template either fails to render or returns `True`, `"1"`, `"true"`, `"yes"`, `"on"`, `"enable"`, or a non-zero number, the entity will be `available`. If the template returns any other value, the entity will be `unavailable`. If not configured, the entity will always be `available`. Note that the string comparison not case sensitive; `"TrUe"` and `"yEs"` are allowed.
  required: false
  type: template
  default: true
code_format:
  description: >-
    Defines a template to get the `code_format` attribute of the entity. This template must evaluate to a valid [Python regular expression](https://docs.python.org/3/library/re.html#regular-expression-syntax) or `None`. If it evaluates to a not-`None` value, the user is prompted to enter a code when interacting with the lock. The code will be matched against the regular expression, and only if it matches, the lock/unlock actions will be executed. The actual _validity_ of the entered code must be verified within these actions. If there's a syntax error in the template, the entity will be unavailable. If the template fails to render for other reasons or if the regular expression is invalid, no code will be accepted and the lock/unlock actions will never be invoked.
  required: false
  type: template
  default: None
lock:
  description: Defines an action to run when the lock is locked.
  required: true
  type: action
unlock:
  description: Defines an action to run when the lock is unlocked.
  required: true
  type: action
optimistic:
  description: Flag that defines if lock works in optimistic mode.
  required: false
  type: boolean
  default: false
{% endconfiguration %}

### Template and action variables

State-based template entities have the special template variable `this` available in their templates and actions. The `this` variable aids [self-referencing](/integrations/template#self-referencing) of an entity's state and attribute in templates and actions.

## Considerations

If you are using the state of a platform that takes extra time to load, the Template Lock may get an `unknown` state during startup. This results in error messages in your log file until that platform has completed loading. If you use `is_state()` function in your template, you can avoid this situation. For example, you would replace {% raw %}`{{ state('switch.source') == 'on') }}`{% endraw %} with this equivalent that returns `true`/`false` and never gives an unknown result: {% raw %}`{{ is_state('switch.source', 'on') }}`{% endraw %}

## Examples

In this section, you find some real-life examples of how to use this lock.

### Lock from Switch

This example shows a lock that copies data from a switch.

{% raw %}

```yaml
template:
  - lock:
    - name: Garage Door
      state: "{{ is_state('switch.source', 'on') }}"
      lock:
        action: switch.turn_on
        target:
          entity_id: switch.source
      unlock:
        action: switch.turn_off
        target:
          entity_id: switch.source
```

{% endraw %}

### Optimistic mode

This example shows a lock in optimistic mode. This lock will immediately change state after command and will not wait for state update from the sensor.

{% raw %}

```yaml
template:
  - lock:
      - name: Garage Door
        state: "{{ is_state('sensor.skylight.state', 'on') }}"
        optimistic: true
        lock:
          action: switch.turn_on
          target:
            entity_id: switch.source
        unlock:
          action: switch.turn_off
          target:
            entity_id: switch.source
```

{% endraw %}

### Sensor and Two Switches

This example shows a lock that takes its state from a sensor, and uses two momentary switches to control a device.

{% raw %}

```yaml
template:
  - lock:
      - name: Garage Door
        state: "{{ is_state('sensor.skylight.state', 'on') }}"
        lock:
          action: switch.turn_on
          target:
            entity_id: switch.skylight_open
        unlock:
          action: switch.turn_on
          target:
            entity_id: switch.skylight_close
```

{% endraw %}

### Lock from switch with dynamic code

This example shows a lock that copies data from a switch. It needs a PIN code defined as a [secret](/docs/configuration/secrets) to unlock and no code to lock. Note that the actual validity check of the code is part of the `unlock` action and should always happen there or in scripts called from these actions. In this way, you can not only perform code checks against static values, but also dynamic ones (for instance, TOTPs).

{% raw %}

```yaml
template:
  - lock:
      - name: Garage Door
        state: "{{ is_state('switch.source', 'on') }}"
        code_format: "{{ '\\d{4}' if is_state('switch.source', 'on') else None }}"
        lock:
          - action: switch.turn_on
            target:
              entity_id: switch.source
        unlock:
          - variables:
              pin: !secret garage_door_pin
          - condition: "{{ code == pin }}"
          - action: switch.turn_off
            target:
              entity_id: switch.source
```

{% endraw %}

In `secrets.yaml`:

{% raw %}

```yaml
garage_door_pin: "1234"
```

{% endraw %}
