---
title: "Core Concepts"
description: "How Home Assistant works."
---

Home Assistant, like all home automation software, allows you to control smart devices in your home. This page will explain the parts of Home Assistant and how they relate.

## Devices

In Home Assistant, a **device** is a physical object in your connected home. This would be something like a smart lightbulb or a Chromecast.

Home Assistant has a **discovery** feature, which scans for new devices constantly and adds them to your Home Assistant automatically.

**Device trackers** are devices that track the position of something or someone, like a person or a cellphone.

## Entities

Because many devices do more than one thing, things in Home Assistant are controlled using **entities**. An entity is a single function or property of a device, like a single sensor, light, or switch.

A device can provide multiple entities. For example, a device called “Sam’s Phone” might have entities like location, battery level, and step count. Some devices like lightbulbs only have a single entity, and devices like hubs may have no entities at all.

Some entities are useful for controlling things in your home:

- **Switches** let you check if something is switched on or off
- **Sensors** can be a wide range of things that watch for changes in the environment, like motion sensors and temperature sensors
- **Binary sensors** detect something that is either on or off
- **[Scripts](/docs/scripts)** are special entities that run custom code when they’re triggered

Other entities are there to respond to Home Assistant:

- **Lights** can turn on and off, and sometimes dim and change color
- **Covers** are things that can move up and down, like garage doors and smart blinds

Some entities are part of a **domain**, or a built-in category of entities that are managed in a similar way. For example, there is a “lights” domain in Home Assistant.

Entities can be grouped into **areas**, which roughly represent a room in your house. Common areas are “kitchen”, “office”, “basement” and “yard”.

You can reference multiple entities at one time by putting them into a **[group](/integrations/group)**

## Automation

**[Automations](/docs/automation)** let you go father by telling Home Assistant to automatically do things without you having to hit a button yourself. For example, you could write an automation that says “turn on the lights when it gets dark if I’m home”.

An automation has three main parts:

- **[Triggers](/docs/automation/trigger)** - something that starts the automation, like the sun going down or a motion sensor noticing movement
- **[Conditions](/docs/automation/condition)** - let you decide whether to complete the automation. For example: "only if someone is home".
- **[Action](/docs/automation/action)** - what the automation does, like "turn on lights"

**[Templates](/docs/automation/templating)** let advanced users use variables and logic in their automations

## Events and state

Entities in Home Assistant are controlled by sending **[events](/docs/configuration/events)**.

Home Assistant remembers the **[state](/docs/configuration/state_object)** of each entity. The state means what *mode* or *condition* the entity is in this moment. For example, a light could have two states: ‘on’ and ‘off’, and a garage door could be in one of two states: ‘open’ or ‘closed’.

A **[scene](/docs/scene)** is a list of entities along with the state you want them each to be in. When you trigger that scene, Home Assistant will figure out the right events to get each of those entities into that state.

For example, let’s imagine you have a scene called “welcome home” that says “lights on, door unlocked”. If you turn on that scene, Home Assistant will check if your lights are on and turn them on if they’re off. Then it will check if your door is unlocked, and unlock it if it’s locked.

## More concepts

- **Zones** are geographical areas on earth. You can check if a device tracker is inside a zone as a trigger or condition in an automation. For example, “turn on the lights when Sam’s Phone comes into the ‘home’ zone”.

## Integrations

Home Assistant is set up to work with devices and services from lots of different companies, including voice assistants, smart devices, cameras, and other home automation software. You can make Home Assistant work with these services by installing **[integrations](/integrations)**.

Once installed, integrations can make new entities available, add panels to Lovelace, and more.

_Formerly known as components; not to be confused with add-ons._

## The Home Assistant software

So now you know what Home Assistant is. But how do you start using it?

You probably want to [install Home Assistant](/getting-started/) using a disk image, which contains everything you need to run Home Assistant and keep it updated.

If you’re feeling adventurous, you can also install parts of Home Assistant separately:

- **Core** - the main "engine" of Home Assistant that handles reading data, controlling devices, and running automations
- **Supervisor** makes sure everything is up to date, installs add-ons, runs backups, and more

Learn more about [different installation methods here](https://community.home-assistant.io/t/home-assistant-installation-methods/207703).

Most people control Home Assistant with its built-in frontend, **Lovelace**. Lovelace is the user interface in your browser and the mobile apps.

Lovelace is organized like this:

- **Panels** are top-level pages in Lovelace. Examples are your Dashboard, the Map, the History panel and the Configuration page.
- **[Dashboard](/lovelace/dashboards-and-views)** panels are the main way to see and control your home. You can add multiple custom dashboards in addition to the one that comes by default.
- **[Views](/lovelace/dashboards-and-views)** are just tabs inside of dashboards. You can easily toggle between views on the same dashboard. You can customize the name and an icon for each view.
- **Cards** are smaller pieces of UI inside a view. You can generally see multiple cards at once. Home Assistant comes with built in cards, but you can also write your own.
