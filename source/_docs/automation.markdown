---
title: "Automating Home Assistant"
description: "Steps to help you get automation setup in Home Assistant."
---

Home Assistant offers a wide range of automation configurations. In this section, we'll try to guide you through all the different possibilities and options. Besides this documentation, there are also a couple of people who have made their automations [publicly available](/cookbook/#example-configurationyaml).

Please see [Automation Integration](/integrations/automation/) for configuration options and services.

### Automation basics

Before you can go ahead and create your own automations, it's important to learn the basics. To explore these, let's have a look at the following example home automation rule:

```text
(trigger)    When Paulus arrives home
(condition)  and it is after sunset:
(action)     Turn the lights in the living room on
```

The example consists of three different parts: a [trigger](/docs/automation/trigger/), a [condition](/docs/automation/condition/) and an [action](/docs/automation/action/).

The first line is the **trigger** of the automation rule. Triggers describe events that should start execution of the automation rule. In this case, it is a person arriving home, which can be observed in Home Assistant by Paulus' **state** going from 'not_home' to 'home'.

The second line is the **condition**. Conditions are optional tests that can limit an automation rule to only work in your specific use cases. A condition will test against the current **state** of an entity in the system. This includes the current time, devices, people and other things like the sun. In the example above, we only want to act when the sun has set.

The third part is the **action**, which will be performed when a rule is triggered and all conditions are met. For example, it can turn a light on, set the temperature on your thermostat or activate a scene. In the example above, we only want to turn lights on in the living room.

<div class='note'>
The difference between a condition and a trigger can be confusing as they are very similar. Triggers look at the actions, while conditions look at the results: turning a light on versus a light being on.
</div>

### Exploring the internal state

Automation rules interact directly with the internal **state** of entities in Home Assistant. These and their current state are exposed via the [developer tools](/docs/tools/dev-tools/), which are available on the sidebar, in the frontend. The [**states** tab](/docs/tools/dev-tools/#states) will show all currently available entities and their states . An entity can be anything, a light, a switch, a person and even the sun. A state consists of the following parts:

| Name | Description | Example |
| ---- | ----- | ---- |
| Entity | Unique identifier for the entity. | `light.kitchen`
| State | The current state of the device. | `home`
| Attributes | Extra data related to the device and/or current state. | `brightness`

State changes can be used as the source of triggers and the current state can be used in conditions.

Actions are all about calling services. To explore the available services go to the [**services** tab](/docs/tools/dev-tools/#services) in developer tool. Services allow to change anything. For example turn on a light, run a script or enable a scene. Each service has a domain and a name,for example the service `light.turn_on` which is capable of turning on any light that is identified as an entity in your system. Services can be passed parameters to, for example, indicate which device to turn on or what color to use.
