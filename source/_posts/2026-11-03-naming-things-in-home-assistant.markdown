---
layout: post
title: "Naming things in Home Assistant, shaped by your feedback"
description: "We’re making naming in Home Assistant simpler. Your entity IDs and automations will keep working – find out what’s changing, why, and what to check."
date: 2026-11-03 00:00:01
date_formatted: "November 3, 2026"
author: Artur Pragacz
comments: true
categories:
  - Announcements
og_image: /images/blog/2026-11-naming-things-in-home-assistant/art.webp
---

<img src="/images/blog/2026-11-naming-things-in-home-assistant/art.webp" alt="Naming things in Home Assistant, shaped by your feedback" style="border: 0;box-shadow: none;">

Just before the [2026.4 release](/blog/2026/04/01/release-20264/), we pulled a change to entity naming in Home Assistant. You’d tested it in beta, told us what you didn’t like, and we listened. It took a few extra months, but we believe it’s now in a better place.

We’ve filled the gaps you found, including screens that didn’t show enough context. We’ve also added child devices, which give each part of a device – like sockets on a power strip – its own name and area.

Crucially, your entity IDs, automations, scripts, scenes, and dashboards will keep working.

<!--more-->

What *is* changing from tomorrow’s 2026.11 release is that naming in Home Assistant will be simpler: you’ll name each device and entity for what it actually is, and Home Assistant will add the context around it.

The first place you’ll likely notice this is on your dashboards and other screens. They will build each name from its parts, such as the area, device, and entity name, which means some names will include more context than before.

We know many of you spend hours getting your names just right. Most will carry over the way you expect. Some will look different: particularly any entity names that don’t currently start with their device name. Further down, we explain why, and how to tidy them up quickly.

But before we go on, one thing we heard a lot during beta was that the naming terminology was confusing. Device name, entity name, friendly name, entity ID: what’s the difference? Here’s a quick guide.

## What’s in a name?

Let’s say a smart plug powers your coffee machine, and sits in your kitchen.

- **Area:** the room/space the smart plug is in. *Kitchen.*
- **Device:** the physical object. *Smart plug 3*, or a name you give it, like *Coffee machine.*
- **Entity:** a thing a device can do or measure. The smart plug has three entities: a *switch*, a *power sensor* and an *energy sensor*.

Each entity has its own name, ID, and friendly name. So for the smart plug’s power sensor:

- **Entity name:** the name of that one thing. *Power.*
- **Entity ID:** the fixed ID your automations use. *sensor.kitchen_smart_plug_3_power.*
- **Friendly name:** a state attribute that combines the device name and entity name. Older cards and templates still use this, but we are moving away from it. *Smart plug 3 Power.*

## Where naming comes from

How did we end up with so many names? It all started simply enough…

In the early days, Home Assistant only knew entities. There were no devices, areas, or floors, so an entity’s name had to carry all its context. To tell power sensors apart, you would name one “Kitchen coffee machine power.” The community wrote whole naming strategy guides to keep them consistent.

From 2018 on, Home Assistant started adding structure around entities. Entities belonging to one physical object were grouped together as a device. Areas, floors, and labels were added to describe the layout of your home. But this structure also introduced repetition, so if you moved the coffee machine to another room, every one of its entity names was wrong.

To fix this, integrations started naming each entity on its own, without the device name. An integration named an entity for what it was, such as “Power,” and Home Assistant put the device name in front to show “Smart plug 3 Power.”

One gap remained: renaming an entity removed its device name. If you renamed a smart plug’s switch to “Coffee machine,” the device’s other entities might still be displayed as “Smart plug 3 Power” and “Smart plug 3 Energy.” As a result, many of you had to rename every entity manually to stay consistent.

### At a glance:

| Year | What arrived                     | What it meant for names                                                  |
| ---- | -------------------------------- | ------------------------------------------------------------------------ |
| 2013 | Entities, configured in YAML     | One name per entity, carrying all the context                            |
| 2018 | Entity registry and devices      | Entities renamed in the UI; devices group entities                       |
| 2019 | Areas                            | The area is known, but often still typed into names                      |
| 2022 | Entity naming for integrations   | Integrations name entities standalone; the device name is added in front |
| 2024 | Floors and labels                | More context available, still repeated in names                          |
| 2026 | Child devices and this migration | Every name stands on its own, renamed or not                             |

Each of these steps made sense at the time, but together they left us with rules that didn’t always agree. We’ve been untangling them for several years, and this release is the next step.

## Where we’re heading

From now on, a consistent set of rules applies everywhere in Home Assistant, from the dashboard to the settings pages. You name each thing once, for what it is: your floor is “Ground floor,” your area “Kitchen,” your device “Coffee machine,” and its entities “Power” and “Energy.” No name repeats another.

Home Assistant will then show context as required:

- On the Kitchen’s area page, the area is already clear, so the device is listed as just “Coffee machine,” not “Kitchen coffee machine.”
- On the Coffee machine’s device page, the header already names the device and its area, so the entities are listed as just “Power” and “Energy.”
- In an entity picker that lists every power sensor in the house, each row also shows the device and area, so you can tell them apart.
- On a dashboard card, you pick which parts to show: entity, device, parent device, area, or floor, in the order you like.

Some entities need no name of their own. The plug’s switch is what turns the coffee machine on and off, so will be shown with the device name alone: “Coffee machine.” We call it the main entity of the device, and you’ll be able to turn this on for any entity with the “Main entity of the device” switch in its settings. This is why renaming the device, rather than the switch, gives most people the result they want.

A device made of several parts will now get a separate child device for each one. For example, a power strip with four sockets becomes one device with four child devices, one for each socket. Each socket can have its own name, such as “Kettle,” and its own area, instead of entities called “Socket 3,” etc. Put a socket in another area, such as a lamp in the dining room, and it will just show as “Lamp” there, without the power strip’s name.

Our goal is for you to no longer need a naming scheme to keep things tidy. The defaults should be right, and if you do want to rename something you’ll only need to do it once, in one place, because no name holds a copy of another. You can still name things however you like. If an area isn’t specific enough, because you have two spotlights in one kitchen for example, you can keep that detail in the device name: “Cabinet spotlight” and “Countertop spotlight.”

New entity IDs are built from these parts too: since 2026.8, they include the area, and if you really want, you can choose which parts go into them. So two “TV” devices in different rooms get clear IDs, without the _2.

## What this means for you

From the 2026.11 release, the change will show up in four main ways.

### Dashboards show the new names

Cards, badges, and rows without a manually set name will show the new default entity name together with its context, instead of the friendly name. When you set a name on a card, the name picker lets you pick the parts you want. You can always revert to the default with one click. Names you have already set on a card stay exactly as they are. The rest of Home Assistant follows the same rules: settings pages, the activity log, automation descriptions, voice assistant settings, the tools pages, and the map – as well as the Home Assistant apps for Android and iOS.

### Renaming an entity only names the entity

When you rename an entity, you’ll only need to provide a name for the entity part, such as “Power usage,” nothing else. Home Assistant will keep that name just as you typed it, and add the context, such as the device or area name, where it is needed. If what you really want to change is the device name, you will need to rename the device instead.

### Complex devices are split into child devices

From this release, Z-Wave, MQTT, and ESPHome will support the child devices described above, as will some Tuya devices and a few other integrations. Support for Matter and ZHA is in progress, with more integrations to follow. As a result the original parent device will remain, but its structural elements – like multiple outlets on a power strip – will be split into child devices that are organized separately from one another.

### The friendly name is on its way out

Many custom cards and templates still use the friendly name. We’ll keep it for backward compatibility for now, but plan to deprecate the friendly name and eventually remove it. We’ll announce any removal ahead of time, so card authors and template users can update first.

## Things to check after updating

What to expect after the update, and some things you may want to look out for.

### Entity IDs, automations, and dashboards will keep working

Existing entity IDs will not change. Automations, scripts, scenes, and dashboards refer to entities by their ID, so they’ll keep finding the right entity. Only the names you see may change, as described below.

### Your existing names will be migrated

On update, Home Assistant will migrate the names of entities you renamed in the past. As we mentioned at the start, most should come through as you’d expect, but some may look different. It depends on how the name starts:

1. If an entity name already starts with its device name, such as “Coffee machine power usage” on a coffee machine, the device part will be removed – so the entity will now be named “Power usage,” and show as “Coffee machine Power usage,” much as before.
2. If it does not already start with its device name, nothing changes except Home Assistant will add the right context where needed – so a switch you renamed “Coffee machine” on the device “Smart plug 3” will show as “Smart plug 3 Coffee machine.”

If that second case looks odd, it’s quick to fix. Rename the device (in this case the smart plug) to “Coffee machine” and turn on “Main entity of the device” for the switch. Then it will show as just “Coffee machine” everywhere. If you have time, it might also be a good moment to take area names out of your entity and device names. Home Assistant will display the right content where needed.

For entities you expose to [Assist](/voice_control/), Alexa, or Google Assistant, the old name will also be added as an alias, so voice commands keep working.

Our [naming documentation](/docs/configuration/customizing-entities/#recommendations-on-entity-naming-and-related-elements) explains how naming works, and what you may want to rename, in more detail.

### Some custom cards may show different names

Built-in cards will let you compose the name from parts: drag entity, device, parent device, area, and floor into the order you want, or type your own custom name. Some custom cards may still read the friendly name, so might show a different name than the built-in cards, and that name will change once you rename the entity or its device. Set the name on the card to fix it, or update the card once its author supports the new naming.

### Templates using friendly names may need changing

If your templates still use friendly names, for example to show entity names in notifications, those names may differ from what Home Assistant shows, and change once you rename the entity or its device. To pick only the parts you need, use entity_name(), device_name() and area_name() instead.

## What’s next?

We know naming is personal, and this change touches every installation – even if for many users it won’t be noticeable. It won’t be perfect for every setup, but we’re confident it’s a change for the better. Over the coming releases, we’ll keep moving more integrations to child devices and helping custom card authors adopt the new naming.

To everyone who tested the 2026.4 beta, reported issues, and told us honestly what you thought: thank you. You made this change better.

One more ask: if something looks off after updating, tell us. As always, you’ll find us on the <a href="https://community.home-assistant.io" target="_blank" rel="noopener">community forums</a> or on <a href="https://discord.gg/home-assistant" target="_blank" rel="noopener">Discord</a>.
