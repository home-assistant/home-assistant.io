---
title: "Automating Home Assistant"
description: "Steps to help you get automation setup in Home Assistant."
---

Home Assistant offers a wide range of automation configurations. In this section, we'll try to guide you through all the different possibilities and options. Besides this documentation, there are also a couple of people who have made their automations [publicly available](/cookbook/#example-configurationyaml).

### Automation basics

Before you can go ahead and create your own automations, it's important to learn the basics. To explore these, let's have a look at the following example home automation rule:

```text
{annotation} An example automation
(trigger)    When Paulus arrives home
(condition)  and it is after sunset:
(action)     Turn the lights in the living room on
```

The example consists of three mandatory parts: a [trigger](/docs/automation/trigger/), a [condition](/docs/automation/condition/) and an [action](/docs/automation/action/).

The first line is the **trigger** of the automation rule. Triggers describe events that should trigger the automation rule. In this case, it is a person arriving home, which can be observed in Home Assistant by observing the state of Paulus changing from 'not_home' to 'home'.

The second line is the **condition**. Conditions are optional tests that can limit an automation rule to only work in your specific use cases. A condition will test against the current state of the system. This includes the current time, devices, people and other things like the sun. In this case, we only want to act when the sun has set.

The third part is the **action**, which will be performed when a rule is triggered and all conditions are met. For example, it can turn a light on, set the temperature on your thermostat or activate a scene.

<div class='note'>
The difference between a condition and a trigger can be confusing as they are very similar. Triggers look at the actions, while conditions look at the results: turning a light on versus a light being on.
</div>

{% configuration %}
id:
  description: Unique ID of automation.
  required: false
  default: automatically generated?
  type: string

alias:
  description: Alias of automation.
  required: false
  default: N/A?
  type: string
  
annotation:
  description: A brief description that can be seen in Automation Editor.
  required: false
  default: none
  type: string

initial_state:
  description: Enables/disables automation (see note below).
  required: false
  type: boolean
  default: true

hide_entity:
  description: Any idea?
  required: false
  type: boolean
  default: ?
  
trigger:
  description: List of triggers.
  required: true
  type: list
  keys:
    platform:
      description: ?.
      required: true
      type: ?

condition:
  description: List of conditions.
  required: true
  type: list
  keys:
    conditions:
      description: ?.
      required: true
      type: ?

action:
  description: List of actions.
  required: true
  type: list
  keys:
    ?:
      description: ?.
      required: true
      type: ?

{% endconfiguration %}

### Exploring the internal state

Automation rules interact directly with the internal state of Home Assistant, so you'll need to familiarize yourself with it. Home Assistant exposes its current state via the developer tools. These are available at the bottom of the sidebar in the frontend. The <img src='/images/screenshots/developer-tool-states-icon.png' class='no-shadow' height='38' /> icon will show all currently available states. An entity can be anything. A light, a switch, a person and even the sun. A state consists of the following parts:

| Name | Description | Example |
| ---- | ----- | ---- |
| Entity ID | Unique identifier for the entity. | `light.kitchen`
| State | The current state of the device. | `home`
| Attributes | Extra data related to the device and/or current state. | `brightness`

State changes can be used as the source of triggers and the current state can be used in conditions.

Actions are all about calling services. To explore the available services open the <img src='/images/screenshots/developer-tool-services-icon.png' class='no-shadow' height='38' /> Services developer tool. Services allow to change anything. For example turn on a light, run a script or enable a scene. Each service has a domain and a name. For example the service `light.turn_on` is capable of turning on any light in your system. Services can be passed parameters to for example tell which device to turn on or what color to use.

### Automation initial state

When you create a new automation, it will be enabled unless you explicitly add `initial_state: false` to it or turn it off manually via UI/another automation/developer tools. In case automations need to be always enabled or disabled when Home Assistant starts, then you can set the `initial_state` in your automations. Otherwise, the previous state will be restored.

Please note that if for some reason Home Assistant cannot restore the previous state, it will result in the automation being enabled.

```text
automation:
- alias: Automation Name
  initial_state: false
  trigger:
  ...
```
