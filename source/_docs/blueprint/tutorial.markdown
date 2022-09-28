---
title: "Automation blueprint tutorial"
description: "Tutorial on creating an automation blueprint."
---

<div class='note'>

While the tutorial only shows how to create an automation blueprint, scripts also support blueprints in the same way.

</div>

In this tutorial, we're going to create an automation blueprint that controls a light based on a motion sensor. We will do this by taking an existing automation and converting it to a blueprint.

For this tutorial, we use a simple automation. The process for converting a complex automation is not any different.

## Our automation

To create a blueprint, we first need to have a working automation. The automation we're going to use in this tutorial, which controls a light based on a motion sensor, looks like this:

{% raw %}

```yaml
trigger:
  platform: state
  entity_id: binary_sensor.motion_kitchen

action:
  service: >
    {% if trigger.to_state.state == "on" %}
      light.turn_on
    {% else %}
      light.turn_off
    {% endif %}
  target:
    entity_id: light.kitchen
```

{% endraw %}

## Create the blueprint file

Automation blueprints are YAML files (with the `.yaml` extension) and live in the `<config>/blueprints/automation/` folder. You can create as many subdirectories in this folder as you want.

To get started with our blueprint, we're going to copy the above automation YAML and save it in that directory with the name `motion_light_tutorial.yaml`.

## Add basic blueprint metadata

Home Assistant needs to know about the blueprint. This is achieved by adding a `blueprint:` section. It should contain the `domain` of the integration it is for (`automation`) and `name`, the name of your blueprint. Optionally, you can also include a `description` for your blueprint.

Add this to the top of the file:

```yaml
blueprint:
  name: Motion Light Tutorial
  description: Turn a light on based on detected motion
  domain: automation
```

## Define the configurable parts as inputs

Now we have to decide what steps we want to make configurable. We want to make it as re-usable as possible, without losing its original intent of turning on a light-based on a motion sensor.

Configurable parts in blueprints are called [inputs](/docs/blueprint/schema/#blueprint-inputs). To make the motion sensor entity configurable, we're replacing the entity ID with a custom YAML tag `!input`. This YAML tag has to be combined with the name of the input:

```yaml
trigger:
  platform: state
  entity_id: !input motion_sensor
```

For the light, we can offer some more flexibility. We want to allow the user to be able to define any device or area as the target. The `target` property in the service action can contain references to areas, devices and/or entities, so that's what we will use.

Inputs are not limited to strings. They can contain complex objects too. So in this case, we're going to mark the whole `target` as input:

{% raw %}

```yaml
action:
  service: >
    {% if trigger.to_state.state == "on" %}
      light.turn_on
    {% else %}
      light.turn_off
    {% endif %}
  target: !input target_light
```

{% endraw %}

## Add the inputs to the metadata

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

## Use it via `configuration.yaml`

With the bare minimum metadata added, your blueprint is ready to use.

Open your `configuration.yaml` and add the following:

```yaml
automation tutorial:
  use_blueprint:
    path: motion_light_tutorial.yaml
    input:
      motion_sensor: binary_sensor.kitchen
      target_light:
        entity_id: light.kitchen
```

Reload automations and your new automation should popup. Because we configured the exact values as the original automation, they should work exactly the same.

## Adding user friendly names to the inputs

Blueprints are easier to use if it's easy to see what each field is used for. We can improve this experience by adding names and descriptions to our inputs:

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

## Describing the inputs

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
          domain: binary_sensor
          device_class: motion
    target_light:
      name: Lights
      description: The lights to keep in sync.
      selector:
        target:
          entity:
            domain: light
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
          domain: binary_sensor
          device_class: motion
    target_light:
      name: Lights
      description: The lights to keep in sync.
      selector:
        target:
          entity:
            domain: light

trigger:
  - platform: state
    entity_id: !input motion_sensor

action:
  - service: >
      {% if trigger.to_state.state == "on" %}
        light.turn_on
      {% else %}
        light.turn_off
      {% endif %}
    target: !input target_light
```

{% endraw %}

## Use it via the UI

To configure it via the UI, go to **{% my config %}** and then **{% my blueprints %}**. Find the "Motion Light Tutorial" blueprint and click on "Create Automation".

<div class='note'>
Don't forget to reload automations after you make changes to your blueprint to have the UI and the automation integration pick up the latest blueprint changes.
</div>

![Screenshot of the blueprint UI](/images/blueprints/tutorial-ui.png)

## Share the love

The final step is to share this blueprint with others. For this tutorial we're going to share it on GitHub Gists.

### Informal Sharing

For this tutorial, we're going to share it on GitHub Gists. This is a good option if you don't want to publish your blueprint to a larger audience.

- Go to [GitHub Gists](https://gist.github.com/)
- Gist description: blueprint tutorial
- Filename including extension: `motion_light_tutorial.yaml`
- Content is the content of the blueprint file.
- Click the "Create Gist" button

You can now copy the URL of your new Gist and share it with other people. They can import it by going to **Settings** -> **Automations & Scenes** -> **Blueprints** and clicking on the blue "Import Blueprint" button.

### Share on the Blueprint Exchange

If you follow the [Rules and format for posting](/get-blueprints), you can share your blueprint on the Home Assistant Blueprint Exchange forum. This option is accessible to the general Home Assistant community but recommended only for your original blueprints. Please don't post this tutorial to the Blueprint Exchange, but instead, remember this as an option for releasing your real blueprints.
