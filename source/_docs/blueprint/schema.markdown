---
title: "Blueprint schema"
description: "The schema for a valid blueprint."
---

The configuration schema of a blueprint consists of 2 parts:

- The blueprint high-level metadata, like its name and a description and
  the input the blueprint needs from the user.
- The schema of the thing the blueprint describes.

The first part is referred to as the blueprint schema and contains mainly the
blueprint's metadata. The second part depends on what the blueprint is for.

For example, in the case of creating a blueprint for an automation, the full
schema for an [automation](/docs/automation/yaml/) applies.

This page is mainly set up to describe the configuration schema of the
blueprint metadata. Try our [blueprint tutorial](/docs/blueprint/tutorial/)
in case you are interested in creating your first blueprint.

## The blueprint schema

The only requirement for a blueprint is a name. In its most basic form,
a blueprint would look like:

```yaml
blueprint:
  name: Example blueprint
  domain: automation
```

And this is already a valid blueprint. But typically, one would need
more. For example, user inputs or a description to describe the blueprint's
functionality.

This is the full blueprint schema:

{% configuration %}
name:
  description: The name of the blueprint. Keep this short and descriptive.
  type: string
  required: true
description:
  description: >
    The description of the blueprint. While optional, this field is highly
    recommended. For example, to describe what the blueprint does, or tell more
    about the options inputs of the blueprint provide. The description can
    include [Markdown](https://commonmark.org/help/).
  type: string
  required: false
domain:
  description: >
    The domain name this blueprint provides a blueprint for. Currently, only
    `automation` is supported.
  type: string
  required: true
input:
  description: >
    A dictionary of defined user inputs. These are the input fields that the
    consumer of your blueprint can provide using YAML definition, or via
    a configuration form in the UI.
  type: map
  required: false
  keys:
    name:
      description: The name of the input field.
      type: string
      required: false
    description:
      description: >
        A short description of the input field. Keep this short and descriptive.
      type: string
      required: false
    selector:
      description: >
        The [selector](/docs/blueprint/selectors/) to use for this input. A
        selector defines how the input is displayed in the frontend UI.
      type: selector
      required: false
    default:
      description: >
        The default value of this input, in case the input is not provided
        by the user of this blueprint.
      type: any
      required: false
{% endconfiguration %}

## Blueprint inputs

As written in the above schema, a blueprint can accept one (or multiple)
inputs from the blueprint consumer.

These inputs can be of any type (string, boolean, list, dictionary), can have
a default value and also provide a [selector](/docs/blueprint/selectors/) that
ensures a matching input field in the user interface.

Each input field can be referred to, outside of the blueprint metadata, using
the `!input` custom YAML tag.

The following example shows a minimal blueprint with a single input:

```yaml
blueprint:
  name: Example blueprint
  description: Example showing an input
  input:
    my_input:
      name: Example input
```

In the above example, `my_input` is the identifier of the input, that can be
referred to later on using the `!input my_input` custom tag.

In this example, no `selector` was provided. In this case, if this blueprint
was used in the user interface, a text input field would be shown to the user.

A blueprint can have as many inputs as you like.

### Blueprint inputs in templates

The inputs are available as custom YAML tags, but not as template variables.
To use a blueprint input in a template, it first needs to be exposed as either
a [script level variable](/integrations/script/#-configuration-variables) or in 
a [variable script step](/docs/scripts/#variables).

```yaml
variables:
  # Make input my_input available as a script level variable
  my_input: !input my_input
```

## Example blueprints

The [built-in blueprints][blueprint-built-in]
are great examples to get a bit of a feeling of how blueprints work.

Here is the built-in motion light automation blueprint:

```yaml
blueprint:
  name: Motion-activated Light
  description: Turn on a light when motion is detected.
  domain: automation
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
  - platform: state
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

Additional examples, provided by the community, can be found on the
[community forum][blueprint-forums].

[blueprint-built-in]: https://github.com/home-assistant/core/tree/dev/homeassistant/components/automation/blueprints
[blueprint-forums]: /get-blueprints
