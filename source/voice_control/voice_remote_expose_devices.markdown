---
title: "Exposing entities to Assist"
description: Step-by-step instructions on exposing entities to an assistant such as Assist, Google Assistant, or Alexa.
related:
  - docs: /voice_control/voice_remote_cloud_assistant/
    title: Creating a Cloud assistant
  - docs: /voice_control/voice_remote_local_assistant/
    title: Creating a local assistant
  - docs: /voice_control/best_practices/
    title: Best practices with Assist
---

Assist can only see and control the {% term entities %} that you expose to it. This way, you decide which devices you can control by voice.

## Entities that are exposed automatically

Home Assistant exposes common devices to Assist as you add them. This is the **Expose new entities** setting on the **Assist** card, under {% my voice_assistants title="**Settings** > **Voice assistants**" %}. It's turned on by default.

When **Expose new entities** is turned on, Home Assistant exposes each new entity of the following kinds to Assist:

- Lights, switches, fans, covers, climate devices, humidifiers, water heaters, vacuums, media players, scenes, and to-do lists.
- Binary sensors for doors, garage doors, windows, locks, and other openings, and binary sensors that detect motion or presence. These sensors only report a state. Assist can tell you if a door is open, but it can't open or unlock anything with them.
- Sensors that measure temperature, humidity, carbon monoxide, carbon dioxide, PM2.5, PM10, volatile organic compounds, or the air quality index.

Covers include garage doors and gates, so Home Assistant exposes them automatically too. If you don't want to open them by voice, stop exposing them. For the steps, refer to [Exposing entities to Assist](#exposing-entities-to-assist).

Home Assistant never exposes other entities automatically. For example, locks, alarm control panels, and scripts stay unexposed until you expose them yourself. Configuration entities, diagnostic entities, and hidden entities are never exposed automatically either.

After an entity is added, it keeps its setting until you change it. You can expose or stop exposing any entity at any time.

The **Alexa** and **Google Assistant** cards have their own **Expose new entities** setting. It's turned off by default.

## Exposing entities to Assist

You can expose several entities at once from the **Expose** tab. To expose a single entity, you can also use the settings of that entity.

### Exposing entities from the Expose tab

1. Go to {% my voice_assistants title="**Settings** > **Voice assistants**" %}.
2. On the **Assist** card, select the button that shows the number of exposed entities.
   - Result: The **Expose** tab opens. It lists the entities that are exposed to Assist.
   - For example, the button shows **12 entities exposed**.
3. Select **Expose entities**.
4. Select the entities that you want to expose.
   - To find an entity, use the search field.
5. Select **Expose** followed by the number of entities.
   - Result: Assist can use these entities.
   - For example, the button shows **Expose 3 entities**.

If you open the **Expose** tab directly, instead of from the **Assist** card, **Expose entities** exposes the entities to all your voice assistants. If you use Home Assistant Cloud, this includes Alexa and Google Assistant.

### Exposing a single entity from its settings

1. Open the entity.
   - For example, select it under {% my entities title="**Settings** > **Devices & services** > **Entities**" %}.
   - If the entity is already listed on the **Expose** tab, you can also select it there, and continue with step 4.
2. Select **Settings** {% icon "mdi:cog-outline" %}.
3. Select **Voice assistants**.
4. Under **Expose**, turn on **Assist**.
   - Result: The change takes effect right away.

## Turning off Expose new entities

If you want to decide on every entity yourself, turn off **Expose new entities**. Entities that are already exposed stay exposed.

1. Go to {% my voice_assistants title="**Settings** > **Voice assistants**" %}.
2. On the **Assist** card, turn off **Expose new entities**.
   - Result: Home Assistant no longer exposes new entities to Assist. To expose an entity, follow the steps in [Exposing entities to Assist](#exposing-entities-to-assist).
3. To stop exposing entities that are already exposed, on the **Assist** card, select the button that shows the number of exposed entities.
   - Result: The **Expose** tab opens. It lists the entities that are exposed to Assist.
4. Select **Enter selection mode** {% icon "mdi:format-list-checks" %}.
5. Select the entities.
6. Select **Unexpose**.
