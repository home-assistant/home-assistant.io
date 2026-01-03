---
title: "Concepts and terminology"
description: "Explaining some Home Assistant basics"
---
Now you're in Home Assistant, let's look at the most important concepts.

## Integrations

Integrations are pieces of software that allow Home Assistant to connect to other software and platforms. For example, a product by Philips called Hue would use the Philips Hue {% term integration %} and allow Home Assistant to talk to the hardware controller Hue Bridge. Any Home Assistant compatible {% term devices %} connected to the Hue Bridge would appear in Home Assistant as [devices](#devices).

![Integrations](/images/getting-started/integrations.png)

Some integration cards show an icon:

- The cloud icon <img height="28px" src="/images/getting-started/cloud-icon.png" alt="Cloud icon"/> indicates that this integration depends on the cloud.
- The file icon <img height="28px" src="/images/getting-started/config-file_icon.png" alt="Configuration file icon"/> indicates that this integration was not set up via the UI. You have either set it up in your {% term "`configuration.yaml`" %} file, or it is a dependency set up by another integration. If you want to configure it, you will need to do so in your {% term "`configuration.yaml`" %} file.
- The custom icon <img height="28px" src="/images/getting-started/custom-icon.png" alt="Custom icon"/> indicates that this is not an official Home Assistant integration but that it was custom made. It could be imported from another source, for example downloaded from HACS.

For a full list of compatible {% term integrations %}, refer to the [integrations](/integrations) documentation.

Once an {% term integration %} has been added, the hardware and/or data are represented in Home Assistant as [devices and entities](#devices).

## Devices

Devices are a logical grouping for one or more {% term entities %}. A {% term device %} may represent a physical {% term device %}, which can have one or more sensors. The sensors appear as entities associated with the {% term device %}. For example, a motion sensor is represented as a {% term device %}. It may provide motion detection, temperature, and light levels as {% term entities %}. Entities have states such as *detected* when motion is detected and *clear* when there is no motion.

![Home Assistant device](/images/getting-started/home-assistant-device_01.png)

Devices and entities are used throughout Home Assistant. To name a few examples:

- [Dashboards](/getting-started/onboarding_dashboard/) can show a state of an {% term entity %}. For example, if a light is on or off.
- An [automation](#automations) can be triggered from a state change on an {% term entity %}. For example, a motion sensor entity detects motion and triggers a light to turn on.
- A predefined color and brightness setting for a light saved as a [scene](#scenes).

![Home Assistant device](/images/getting-started/home-assistant-device_02.png)

## Entities

Entities are the basic building blocks to hold data in Home Assistant. An {% term entity %} represents a {% term sensor %}, actor, or function in Home Assistant. Entities are used to monitor physical properties or to control other {% term entities %}. An {% term entity %} is usually part of a {% term device %} or a {% term service %}. Entities have {% term states %}.

<p class='img'><img src='/images/getting-started/entities.png' style='border: 0;box-shadow: none;' alt="Screenshot showing the Entities table">Screenshot of the Entities table. Each line represents an entity.</p>

## Areas

An area in Home Assistant is a logical grouping of {% term devices %} and {% term entities %} that are meant to match areas (or rooms) in the physical world: your home. For example, the `living room` area groups devices and entities in your living room. Areas allow you to target service calls at an entire group of devices. For example, turning off all the lights in the living room.
Locations within your home such as living room, dance floor, etc. Areas can be assigned to {% term floors %}.
Areas can also be used for automatically generated cards, such as the [Area card](/dashboards/area/).

## Automations

A set of repeatable {% term actions %} that can be set up to run automatically. Automations are made of three key components:

1. Triggers - events that start an {% term automation %}. For example, when the sun sets or a motion sensor is activated.
2. Conditions - optional tests that must be met before an {% term action %} can be run. For example, if someone is home.
3. Actions - interact with {% term devices %} such as turn on a light.

To learn the basics about {% term automations %}, refer to the [automation basics](/docs/automation/basics/) page or try [creating an automation](/getting-started/automation) yourself.

![Automations](/images/getting-started/automation-editor.png)

## Scripts

Similar to {% term automations %}, scripts are repeatable {% term actions %} that can be run. The difference between {% term scripts %} and {% term automations %} is that {% term scripts %} do not have triggers. This means that {% term scripts %} cannot automatically run unless they are used in an {% term automations %}. Scripts are particularly useful if you perform the same {% term actions %} in different {% term automations %} or trigger them from a dashboard. For information on how to create {% term scripts %}, refer to the [scripts](/integrations/script/) documentation.

![Scripts](/images/getting-started/script_01.png)

## Scenes

Scenes allow you to create predefined settings for your {% term devices %}. Similar to a driving mode on phones, or driver profiles in cars, it can change an environment to suit you. For example, your *watching films* {% term scene %} may dim the lighting, switch on the TV and increase its volume. This can be saved as a {% term scene %} and used without having to set individual {% term devices %} every time.

To learn how to use {% term scenes %}, refer to the [scene](/integrations/scene/) documentation.

![Scenes](/images/getting-started/scene_02.png)

## Add-ons

Add-ons are third-party applications that provide additional functionality in Home Assistant. Add-ons run directly alongside Home Assistant, whereas {% term integrations %} connect Home Assistant to other apps. Add-ons are only supported by the {% term "Home Assistant Operating System" %} and {% term "Home Assistant Supervised" %} [installation type](/installation).

Add-ons are installed from the add-on store under {% my supervisor title="**Settings** > **Add-ons**" %}. If you are curious now and feel like installing every add-on that looks interesting: beware that add-ons can use quite a bit of resources in terms of disk space, memory, and additional load on the processor.

Among the most used add-ons are the ones that provide [file access and edit files](/docs/configuration/#to-set-up-access-to-the-files-and-prepare-an-editor) in Home Assistant.

<p class='img'><img src='/images/getting-started/add-ons.png' style='border: 0;box-shadow: none;' alt="Screenshot of the add-on page">Screenshot of the add-on page, showing all the installed add-ons on a test system.</p>

{% include getting-started/next_step.html step="Edit the dashboard" link="/getting-started/onboarding_dashboard/" %}
