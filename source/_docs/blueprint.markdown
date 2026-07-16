---
title: "About blueprints"
description: "Blueprints are ready-made automations, scripts, and template entities that you can install with a few clicks and customize for your own home, no coding required."
related:
  - docs: /docs/blueprint/schema/
    title: About the blueprint schema
  - docs: /docs/blueprint/selectors/
    title: About the blueprint selectors
  - docs: /docs/automation/using_blueprints/
    title: Using blueprints in automations
  - docs: /docs/blueprint/tutorial/
    title: "Tutorial: Create an automation blueprint"
  - title: "Blueprint community forum"
    url: /get-blueprints
---

Blueprints are the easiest way to add automations, scripts, or template entities to your Home Assistant. Someone in the community has already done the work of writing the configuration, and you fill in the bits that are specific to your home, like which sensor to watch and which light to control.

You can find a blueprint for almost any common use case in the [community blueprint forum][blueprint-forums]: motion-activated lights, low-battery notifications, holiday lighting, presence-based heating, and many more.

This page is a high-level introduction. If you want to create your own blueprint to share, see [About the blueprint schema](/docs/blueprint/schema/).

## What is a blueprint?

A blueprint is a {% term script %}, {% term automation %}, or [template entity](/integrations/template/) configuration where some parts have been left blank, ready for you to fill in. That way, the same blueprint can be reused over and over with different devices and settings.

Imagine you want to turn on a light when motion is detected. A blueprint provides the generic automation, while letting you select _which_ motion sensor and _which_ light. You can use that same blueprint twice, once for the hallway and once for the bathroom, and end up with two completely independent automations that each behave the way you configured them.

Automations inherit from the blueprint they were built on, so if the blueprint is updated, all automations using it pick up the change the next time Home Assistant reloads them. To reload manually, go to {% my server_controls title="**Settings** > **Developer tools** > **YAML**" %} and reload the automations.

Blueprints are shared by the community in the [blueprint community forum][blueprint-forums].

[blueprint-forums]: /get-blueprints
