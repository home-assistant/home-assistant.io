---
title: "Concepts and terminology"
description: "User explanation of Home Assistant basics"
---
Now you're in Home Assistant, let's go over important parts of Home Assistant and what they do.

## Dashboards

Customizable pages to display information connected to and available in Home Assistant. By default there are two Dashboards, Overview and Energy. The Overview dashboard is the first thing you see after the [onboarding process](/getting-started/onboarding). More details can be found [here](/dashboards).

![Dashboard](/images/getting-started/lovelace.png)
## Integrations

Software that allows Home Assistant to connect to other software and platforms. For example, a product by Philips called Hue would use the Philips Hue integration and allow Home Assistant to talk to the hardware controller Hue Bridge. Any connected and Home Assistant compatible devices to the Hue Bridge would appear in Home Assistant as [devices](#devices--entities).

![Integrations](/images/getting-started/integrations.png)

A full list of compatible integrations can be found [here](/integrations).

Once an integration has been added, the hardware and/or data are represented in Home Assistant as [devices and entities](#devices--entities).

## Devices & Entities

Devices are a logical grouping for one or more entities. A device may represent a physical device and the device may have one or more sensors which appear as entities associated to the device. For example, a motion sensor is represented as a device and the motion may provide motion detection, temperature and light levels as entities. Entities have states such as on when motion is detected and off when there is no motion.

Devices and entities are used throughout Home Assistant. To name a few examples:
* [Dashboards](#dashboards) can show a state of an entity like if a light bulb is on or off as well as buttons that interact with devices like turning a light bulb on or off.
* An [automation](#automations) can be triggered from a state change on an entity e.g. a light turning on and control another device or entity.
* A predefined setting for light device saved as a [scene](#scenes).

![Home Assistant Device](/images/getting-started/home-assistant-device.png)

## Automations

A set of repeatable actions that can be set up to run automatically. Automations are made of three key components:
1. Triggers - event(s) that start an automation like when the sun sets.
2. Conditions - optional tests that must be met before continuing to running actions. For example, if someone is home.
3. Actions - interact with devices such as turn on a light.

More details can be found [here](/docs/automation/basics/) or try creating an [automation](/getting-started/automation).

![Automations](/images/getting-started/automation-editor.png)

## Scripts

Similar to automations, repeatable actions that can be run. The difference between scripts and automations is that scripts do not have triggers like automations. This means that scripts cannot automatically run unless they are used in an automation. Scripts are particularly useful if you perform the same actions in different automations or trigger them from a dashboard. More details can be found [here](/integrations/script/).

## Scenes

Scenes allow you to create predefined settings for your devices. Likened to driving mode on phones, driver profiles in cars, it can change an environment to suit you. For example, your environment for watching films may have dimmer lighting, TV is switched on and higher volume. This can be saved as a scene and used without having to set individual devices every time.

Further details can be found [here](/integrations/scene/).

## Add-ons

Depending on your [installation type](/installation), you may have the ability to install third party add-ons. Add-ons are usually apps that can be run with Home Assistant but provide a quick and easy way to install, configure, and run within Home Assistant. Add-ons provide additional functionality whereas integrations connect Home Assistant to other apps.

![Add-ons](/images/getting-started/add-ons.png)

{% include getting-started/next_step.html step="Adding Integrations In Home Assistant" link="/getting-started/integration/" %}
