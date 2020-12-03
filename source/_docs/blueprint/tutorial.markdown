---
title: "Blueprint Tutorial"
description: "Tutorial on creating a blueprint."
---

In this tutorial we're going to create a blueprint that contorls a light based on a motion sensor. We will do this by taking an existing automation and converting it to a blueprint.

For this tutorial we use a simple automation. The process for converting a complex automation is not any different.

## Our automation

To create a blueprint, we first need to have a working automation with hardcoded values.

The automation for this tutorial that controls a light based off a motion sensor looks like this:

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

All automation blueprints live in the `<config>/blueprints/automation/` folder and are defined as YAML files (with the `.yaml` extension). You can create as many subdirectories in this folder as you want.

To get started with our blueprint, we're giong to copy the above automation YAML and save it as the file `<config>/blueprints/automation/motion_light_tutorial.yaml`.

## Add basic blueprint metadata

Home Assistant needs to know what your blueprint is about. This is done by adding a `blueprint:` section. It should contain the `domain` of the integration it is for (`automation`) and `name`, the name of your blueprint.

Add this to the top of the file:

```yaml
blueprint:
  name: Motion Light Tutorial
  domain: automation
```

## Define the configurable parts

Now we have to decide what steps we want to make configurable. We want to make it as re-usable as possible, without losing it's original intent of turning on a light based on a motion sensor.

By limiting our blueprint to working with lights and motion sensors, we can later on tell the UI to suggest lights and motion sensors to the user, instead of all their entities.

First we're going to make the motion sensor entity configurable. We do this by replacing the entity ID with a special YAML tag `!input`. This YAML tag has to be combined with the name of the configurable part:

```yaml
trigger:
  platform: state
  entity_id: !input motion_sensor
```

For the motion sensor we just made the entity configurable. But for the light, we could offer some more flexibility. We want to allow the user to supply an area or individual lights.

To do this, we will use the `target` property in the service action. This property can contain references to areas, devices and/or entities.

Configurable parts are not limited to strings. They can contain complex objects too. So in this case, we're going to mark the whole `target` as configurable:

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

## Add the configurable parts to the metadata

All parts that are marked as configurable need to added to the metadata. The bare minimum is that we add their names:

```yaml
blueprint:
  name: Motion Light Tutorial
  domain: automation
  input:
    motion_sensor:
    target_light:
```

## Use it via configuration.yaml

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

## Naming the configurable parts

You can use blueprints for yourself to make reusable automations. But a great aspect of blueprints is also the possibility to share it with others.

It is possible to describe the configurable parts of the blueprint. This allows Home Assistant to automatically create a UI for it.

The first step is to add a name and description to the fields to help identify the fields.

```yaml
blueprint:
  name: Motion Light Tutorial
  domain: automation
  input:
    motion_sensor:
      name: Motion Sensor
      description: This sensor will be synchronized with the light.
    target_light:
      name: Lights
      description: The lights to keep in sync.
```

## Describing the configurable parts

Our blueprint doesn't currently describe what the configurable part should contain. Without this information Home Assistant will offer the user an empty text box.

To do this, we will use selectors. Selectors describe a type and can be used to help the user pick a value.

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

## The final blueprint

After we have added all the steps, our blueprint will look like this:

{% raw %}
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

trigger:
  platform: state
  entity_id: !input motion_sensor

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

## Use it via the UI

To configure it via the UI, go to **Configuration** and then **Blueprints**.

<p class='note'>
Don't forget to reload automations after you make changes to your blueprint to have the UI and the automation intgration pick up the latest blueprint changes.
</p>

![Screenshot of the blueprint  UI](/images/blueprints/tutorial-ui.png)

## Share the love

The final step is to share this blueprint with others. For this tutorial we're going to share it on GitHub Gists.

- Go to [GitHub Gists](https://gist.github.com/)
- Gist description: blueprint tutorial
- Filename including extension: `motion_light_tutorial.yaml`
- Content is the content of the blueprint file.
- Click the "Create Gist" button

You can now copy the URL of your new Gist and share it with other people. They can import it by going to **Configuration**, **Blueprints** and clicking on the blue "Import Blueprint" button.

