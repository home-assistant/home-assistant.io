---
title: "About the blueprint schema"
description: "Introduction to the blueprint schema."
related:
  - docs: /docs/blueprint/
    title: About blueprints
  - docs: /docs/blueprint/selectors/
    title: Blueprint selectors
  - docs: /docs/automation/using_blueprints/
    title: Using blueprints in automations
  - docs: /docs/blueprint/tutorial/
    title: "Tutorial: Create an automation blueprint"
  - title: "Blueprint community forum"
    url: /get-blueprints
---

## The blueprint schema

The configuration schema of a blueprint consists of 2 parts:

1. The blueprint's high-level metadata: name, description, the input required from the user.
2. The schema of the thing the blueprint describes.

The first part is referred to as the *blueprint schema*. It contains the
blueprint's metadata.

The only requirement for a blueprint is a name. In its most basic form,
a blueprint would look like:

```yaml
blueprint:
  name: Example blueprint
  domain: automation
```

Although this is a valid blueprint, it is not very useful.

The second part depends on the use case of the blueprint. For example, if you create a blueprint for an automation, the full
schema for an [automation](/docs/automation/yaml/) applies.

You can add a description of the blueprint's use case and user inputs.

This is the full blueprint schema:

{% configuration %}
name:
  description: The name of the blueprint. Keep this short and descriptive.
  type: string
  required: true
description:
  description: >
    The description of the blueprint. While optional, this field is highly
    recommended. Describe what the blueprint does and describe the inputs the blueprint provide. The description can
    include [Markdown](https://commonmark.org/help/).
  type: string
  required: false
domain:
  description: >
    The domain in which this blueprint is used. Currently, only
    [`automation`](/docs/automation/yaml/), `script` and [`template`](/integrations/template/#using-blueprints) are supported.
  type: string
  required: true
author:
  description: The name of the blueprint author.
  type: string
  required: false
homeassistant:
  description: >
    Home Assistant requirements to be able to use the blueprint successfully.
  type: map
  required: false
  keys:
    min_version:
      description: >
        Minimum required version of Home Assistant to use the blueprint in the format of
        *major*.*minor*.*patch* (all parts are required). For example, `2022.4.0`. It is
        important to set this if the blueprint uses any features introduced in recent
        releases to head off issues.
      type: string
      required: false
input:
  description: >
    A dictionary of defined user inputs or sections. These are the input fields that the
    consumer of your blueprint can provide using YAML definition, or via
    a configuration form in the UI. Sections provide a way to visually group a set of 
    related inputs (see below).
  type: map
  required: false
{% endconfiguration %}

### Blueprint inputs

As described above, a blueprint can accept one (or multiple)
inputs from the blueprint user.

These inputs can be of any type (string, boolean, list, dictionary). They can have
a default value and also provide a [selector](/docs/blueprint/selectors/) that
ensures a matching input field in the user interface.

A blueprint input has the following configuration:

{% configuration %}
  name:
    description: The name of the input field.
    type: string
    required: false
  description:
    description: >
      A short description of the input field. Keep this short and descriptive.
      The description can include [Markdown](https://commonmark.org/help/).
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

In the above example, `my_input` is the identifier of the input. It can be
referenced by using the `!input my_input` custom tag.

In this example, no [`selector`](/docs/blueprint/selectors/) was provided. In the user interface, a text input field would be shown to the user.
It is then up to the user to find out what to enter there. Blueprints that come with [selectors](/docs/blueprint/selectors/) are easier to use.

A blueprint can have as many inputs as you like.

### Blueprint input sections

One or more input sections can be added under the main `input` key. Each section visually groups the inputs in that section, 
allows an optional description, and optionally allows for collapsing those inputs. Note that the section only impacts how 
inputs are displayed to the user when they fill in the blueprint. Inputs must have unique names and be referenced directly
by their name; not by section and name.

A section is differentiated from an input by the presence of an additional `input` key within that section. 

{% caution %}
Input sections are a new feature in version 2024.6.0. Set the `min_version` for the blueprint to at least this version if using input sections. Otherwise, the blueprint will generate errors on older versions. See [this section](/docs/blueprint/schema/#min_version) for more details.
{% endcaution %}

The full configuration for a section is below:

{% configuration %}

name:
  description: A name for the section. If omitted the key of the section is used.
  type: string
  required: false
icon:
  description: An icon to display next to the name of the section.
  type: string
  required: false
description:
  description: >
    An optional description of this section, which will be displayed at the top of the section.
    The description can include [Markdown](https://commonmark.org/help/).
  type: string
  required: false
collapsed:
  description: If `true`, the section will be collapsed by default. Useful for optional or less important inputs. All collapsed inputs must also have a defined `default` before they can be hidden.
  type: boolean
  default: false
  required: false
input:
  description: >
    A dictionary of defined user inputs within this section.
  type: map
  required: true

{% endconfiguration %}



The following example shows a blueprint with some inputs in a section:

```yaml
blueprint:
  name: Example sections blueprint
  description: Example showing a section
  input:
    base_input:
      name: An input not in the section
    my_section:
      name: My Section
      icon: mdi:cog
      description: These options control a specific feature of this blueprint
      input:
        my_input:
          name: Example input
        my_input_2:
          name: 2nd example input
```

### Blueprint inputs in templates

The inputs are available as custom YAML tags, but not as template variables.
To use a blueprint input in a template, it first needs to be exposed as either
a [script level variable](/integrations/script/#configuration-variables) or in
a [variable script step](/docs/scripts/#variables).

```yaml
variables:
  # Make input my_input available as a script level variable
  my_input: !input my_input
```

### Example blueprints

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
          filter:
            device_class: motion
            domain: binary_sensor
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

triggers:
  - trigger: state
    entity_id: !input motion_entity
    from: "off"
    to: "on"

actions:
  - action: light.turn_on
    target: !input light_target
  - wait_for_trigger:
      - trigger: state
        entity_id: !input motion_entity
        from: "on"
        to: "off"
  - delay: !input no_motion_wait
  - action: light.turn_off
    target: !input light_target
```

[blueprint-built-in]: https://github.com/home-assistant/core/tree/dev/homeassistant/components/automation/blueprints
