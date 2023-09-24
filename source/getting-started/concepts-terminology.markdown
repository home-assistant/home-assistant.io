---
title: "Concepts and terminology"
description: "User explanation of Home Assistant basics"
---
Now you're in Home Assistant, let's go over important parts of Home Assistant and what they do.

## Dashboards

Dashboards are customizable pages to display information in Home Assistant. By default there are two Dashboards: **Overview** and **Energy**. The **Overview** dashboard is the first thing you see after the [onboarding process](/getting-started/onboarding). The image below shows a customized example of the **Overview** dashboard. If you just onboarded, yours will be nearly empty. To learn how to customize your dashboards, refer to the [dashboard](/dashboards) documentation.

![Dashboard](/images/getting-started/lovelace.png)

## Integrations

Integrations are pieces of software that allow Home Assistant to connect to other software and platforms. For example, a product by Philips called Hue would use the Philips Hue integration and allow Home Assistant to talk to the hardware controller Hue Bridge. Any Home Assistant compatible devices connected to the Hue Bridge would appear in Home Assistant as [devices](#devices--entities).

![Integrations](/images/getting-started/integrations-new.png)

For a full list of compatible integrations, refer to the [integrations](/integrations) documentation.

Once an integration has been added, the hardware and/or data are represented in Home Assistant as [devices and entities](#devices--entities).

## Devices & entities

Devices are a logical grouping for one or more entities. A {% term device %} may represent a physical device which can have one or more sensors. The sensors appear as entities associated to the device. For example, a motion sensor is represented as a device. It may provide motion detection, temperature, and light levels as entities. Entities have states such as *detected* when motion is detected and *clear* when there is no motion.

![Home Assistant Device](/images/getting-started/home-assistant-device_01.png)

Devices and entities are used throughout Home Assistant. To name a few examples:

- [Dashboards](#dashboards) can show a state of an entity. For example, if a light is on or off.
- An [automation](#automations) can be triggered from a state change on an entity. For example, a motion sensor detects motion and triggers a light to turn on.
- A predefined color and brightness setting for a light saved as a [scene](#scenes).

![Home Assistant Device](/images/getting-started/home-assistant-device_02.png)

## Automations

A set of repeatable actions that can be set up to run automatically. Automations are made of three key components:
1. Triggers - event(s) that start an automation like when the sun sets.
2. Conditions - optional tests that must be met before continuing to running actions. For example, if someone is home.
3. Actions - interact with devices such as turn on a light.

To learn the basics about automations, refer to the [automation basics](/docs/automation/basics/) page or try [creating an automation](/getting-started/automation) yourself.

![Automations](/images/getting-started/automation-editor.png)

## Scripts

Similar to automations, repeatable actions that can be run. The difference between scripts and automations is that scripts do not have triggers like automations. This means that scripts cannot automatically run unless they are used in an automation. Scripts are particularly useful if you perform the same actions in different automations or trigger them from a dashboard. For information on how to create scripts, refer to the [scripts](/integrations/script/) documentation.

![Scripts](/images/getting-started/script_01.png)

## Scenes

Scenes allow you to create predefined settings for your devices. Similar to a driving mode on phones, or driver profiles in cars, it can change an environment to suit you. For example, your *watching films* scene may dim the lighting, switch on the TV and increase its volume. This can be saved as a scene and used without having to set individual devices every time.

To learn how to use scenes, refer to the [scene](/integrations/scene/) documentation.

![Scenes](/images/getting-started/scene_02.png)

## Add-ons

Depending on your [installation type](/installation), you can install third party add-ons. Add-ons are usually apps that can be run with Home Assistant but provide a quick and easy way to install, configure, and run within Home Assistant. Add-ons provide additional functionality whereas integrations connect Home Assistant to other apps.

![Add-ons](/images/getting-started/add-ons.png)

{% include getting-started/next_step.html step="Adding Integrations In Home Assistant" link="/getting-started/integration/" %}
