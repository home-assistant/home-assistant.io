---
title: "Creating an automation blueprint"
description: "Tutorial on creating an automation blueprint."
related:
  - docs: /docs/configuration/
    title: "Editing the configuration file"
  - docs: /docs/configuration/yaml/
  - docs: /docs/automation/yaml/
    title: "YAML used in automations"
  - docs: /docs/scripts/
    title: Scripts
  - docs: /docs/blueprint/selectors/
    title: Blueprint selectors
  - docs: /docs/blueprint/schema/
    title: Blueprint schema
  - docs: /docs/blueprint/
    title: About blueprints
  - docs: /docs/automation/using_blueprints/
    title: Using automation blueprints
---

{% tip %}
While the tutorial only shows how to create an automation blueprint, {% term scripts %} also support blueprints in the same way.
{% endtip %}

## Creating an automation blueprint

In this tutorial, we're going to create an automation blueprint that controls a light based on a motion sensor. We will do this by taking an existing automation and converting it to a blueprint.

### Prerequisites

- This tutorial assumes knowledge in the following topics:
  - [Editing the configuration file](/docs/configuration/)
  - [YAML](/docs/configuration/yaml/), and specifically, [YAML used in automations](/docs/automation/yaml/)
  - [Scripts](/docs/scripts/)

### Creating an automation

To create a blueprint, we first need to have a working automation.
For this tutorial, we use a simple automation. The process for converting a complex automation is no different.

The automation we're going to use in this tutorial controls a light based on a motion sensor:

{% raw %}

```yaml
triggers:
  - trigger: state
    entity_id: binary_sensor.motion_kitchen

actions:
  - action: >
      {% if trigger.to_state.state == "on" %}
        light.turn_on
      {% else %}
        light.turn_off
      {% endif %}
    target:
      entity_id: light.kitchen
```

{% endraw %}

The options that can be used with the `trigger` object are listed under [automation trigger variables](/docs/automation/templating/#available-trigger-data).
In this example, a [state trigger](/docs/automation/templating/#state) is used.
`turn_on` and `turn_off` are [`homeassistant` actions](/docs/scripts/perform-actions/#homeassistant-actions). They are not tied to a specific domain. You can use them on lights, switches, and other domains.

### Creating the blueprint file

Automation blueprints are YAML files (with the `.yaml` extension) and live in the `<config>/blueprints/automation/` folder. You can create as many subdirectories in this folder as you want.

To get started with our blueprint, we're going to copy the above automation YAML and save it in that directory with the name `motion_light_tutorial.yaml`.

#### Add basic blueprint metadata

Home Assistant needs to know about the blueprint. This is achieved by adding a `blueprint:` section. It should contain the `domain` of the integration it is for (`automation`) and `name`, the name of your blueprint. Optionally, you can also include a `description` for your blueprint.

Add this to the top of the file:

```yaml
blueprint:
  name: Motion Light Tutorial
  description: Turn a light on based on detected motion
  domain: automation
```

#### Define the configurable parts as inputs

Now we have to decide what steps we want to make configurable. We want to make it as re-usable as possible, without losing its original intent of turning on a light-based on a motion sensor.

Configurable parts in blueprints are called [inputs](/docs/blueprint/schema/#blueprint-inputs). To make the motion sensor entity configurable, we're replacing the entity ID with a custom YAML tag `!input`. This YAML tag has to be combined with the name of the input:

```yaml
triggers:
  - trigger: state
    entity_id: !input motion_sensor
```

For the light, we can offer some more flexibility. We want to allow the user to be able to define any device or area as the target. The `target` property in the action can contain references to areas, devices, and/or entities, so that's what we will use.

Inputs are not limited to strings. They can contain complex objects too. So in this case, we're going to mark the whole `target` as input:

{% raw %}

```yaml
actions:
  - action: >
      {% if trigger.to_state.state == "on" %}
        light.turn_on
      {% else %}
        light.turn_off
      {% endif %}
    target: !input target_light
```

{% endraw %}

#### Add the inputs to the metadata

All parts that are marked as inputs need to be added to the metadata. The minimum is that we add their names as used in the automation:

```yaml
blueprint:
  name: Motion Light Tutorial
  description: Turn a light on based on detected motion
  domain: automation
  input:
    motion_sensor:
    target_light:
```

For more information on blueprint inputs, refer to the documentation of the [blueprint schema](/docs/blueprint/schema/#input)

## Using your blueprint via `configuration.yaml`

With the bare minimum metadata added, your blueprint is ready to use.

Open your {% term "`configuration.yaml`" %} and add the following:

```yaml
automation tutorial:
  use_blueprint:
    path: motion_light_tutorial.yaml
    input:
      motion_sensor: binary_sensor.kitchen
      target_light:
        entity_id: light.kitchen
```

Reload automations and your new automation should pop up. Because we configured the exact values as the original automation, they should work exactly the same.

## Improving the inputs

Blueprints are easier to use if it's easy to see what each field is used for. 

### Add a user friendly names to the inputs

We can improve this experience by adding names and descriptions to our inputs:

```yaml
blueprint:
  name: Motion Light Tutorial
  description: Turn a light on based on detected motion
  domain: automation
  input:
    motion_sensor:
      name: Motion Sensor
      description: This sensor will be synchronized with the light.
    target_light:
      name: Lights
      description: The lights to keep in sync.
```

### Describe the inputs

Our blueprint doesn't currently describe what the inputs should contain. Without this information, Home Assistant will offer the user an empty text box.

To instead allow Home Assistant to offer more assistance, we will use [selectors](/docs/blueprint/selectors/). Selectors describe a type and can be used to help the user pick a matching value.

The selector for the motion sensor entity should describe that we want entities from the binary sensor domain that have the device class `motion`.

The selector for the target light should describe that we want to target light entities.

```yaml
blueprint:
  name: Motion Light Tutorial
  domain: automation
  input:
    motion_sensor:
      name: Motion Sensor
      description: This sensor will be synchronized with the light.
      selector:
        entity:
          filter:
            - domain: binary_sensor
              device_class: motion
    target_light:
      name: Lights
      description: The lights to keep in sync.
      selector:
        target:
          entity:
            - domain: light
```

By limiting our blueprint to working with lights and motion sensors, we unlock a couple of benefits: the UI will be able to limit suggested values to lights and motion sensors instead of all devices. It will also allow the user to pick an area to control the lights in.

## The final blueprint

After we have added all the steps, our blueprint will look like this:

{% raw %}

```yaml
blueprint:
  name: Motion Light Tutorial
  description: Turn a light on based on detected motion
  domain: automation
  input:
    motion_sensor:
      name: Motion Sensor
      description: This sensor will be synchronized with the light.
      selector:
        entity:
          filter:
            - domain: binary_sensor
              device_class: motion
    target_light:
      name: Lights
      description: The lights to keep in sync.
      selector:
        target:
          entity:
            - domain: light

triggers:
  - trigger: state
    entity_id: !input motion_sensor

actions:
  - action: >
      {% if trigger.to_state.state == "on" %}
        light.turn_on
      {% else %}
        light.turn_off
      {% endif %}
    target: !input target_light
```

{% endraw %}

## Using the blueprint via the UI

1. To configure your blueprint via the UI, go to {% my blueprints title="**Settings** > **Automations & Scenes** > **Blueprints**" %}.
2. Find the **Motion Light Tutorial** blueprint and select **Create Automation**.

{% important %}
Don't forget to reload automations after you make changes to your blueprint to have the UI and the automation integration pick up the latest blueprint changes.
{% endimportant %}

![Screenshot of the blueprint UI](/images/blueprints/tutorial-ui.png)

## Video tutorial

This video tutorial explains how to create a blueprint that toggles a light on motion when the lux value is below a certain threshold.

<lite-youtube videoid="ZxxxZ9Vci3I" videotitle="Blueprints in Home Assistant - Tutorial" posterquality="maxresdefault"></lite-youtube>

## Share the love

The final step is to share this blueprint with others. For this tutorial we're going to share it on GitHub Gists.

### Share informally

For this tutorial, we're going to share it on GitHub Gists. This is a good option if you don't want to publish your blueprint to a larger audience.

1. Go to [GitHub Gists](https://gist.github.com/)
   - **Gist description**: blueprint tutorial
   - **Filename including extension**: `motion_light_tutorial.yaml`
   - **Content** is the content of the blueprint file.
2. Select **Create Gist**.
3. To share your blueprint with other people, copy the URL of your new Gist. They can import it by going to {% my blueprint_import title="**Settings** > **Automations & Scenes** > **Blueprints**" %} and select **Import blueprint**.
4. Celebrate! Cheers to you. You created your first blueprint and helped someone in the community.

### Share on the Blueprint Exchange

If you follow the [Rules and format for posting](/get-blueprints), you can share your blueprint on the Home Assistant Blueprint Exchange forum. This option is accessible to the general Home Assistant community but recommended only for your original blueprints. Please don't post this tutorial to the Blueprint Exchange, but instead, remember this as an option for releasing your real blueprints.
