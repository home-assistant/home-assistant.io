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

Covers include garage doors and gates, so Home Assistant exposes them automatically too. If you don't want to open them by voice, stop exposing them. For the steps, refer to [Exposing your devices to Assist](#exposing-your-devices-to-assist).

Home Assistant never exposes other entities automatically. For example, locks, alarm control panels, and scripts stay unexposed until you expose them yourself. Configuration entities, diagnostic entities, and hidden entities are never exposed automatically either.

After an entity is added, it keeps its setting until you change it. You can expose or stop exposing any entity at any time.

The **Alexa** and **Google Assistant** cards have their own **Expose new entities** setting. It's turned off by default.

## Exposing your devices to Assist

1. Go to **Settings** > **Voice assistants**.
2. Open the **Expose** tab.
   ![Expose entities tab](/images/assist/assistant-expose-01.png)
3. To control the settings for a specific entity, select the entity from the list.
   - In the pop-up, select all assistants to which the entity should be exposed to: Assist, Google Assistant, and/or Alexa.
    ![Expose entities tab](/images/assist/assistant-expose-10.png)
4. To expose multiple entities at once, to all the assistants, select the **Expose entities** button.

5. Select all entities you want to be able to control by voice.
   ![Expose entities tab](/images/assist/assistant-expose-02.png)

## Turning off Expose new entities

If you want to decide on every entity yourself, turn off **Expose new entities**. Entities that are already exposed stay exposed.

1. Go to {% my voice_assistants title="**Settings** > **Voice assistants**" %}.
2. On the **Assist** card, turn off **Expose new entities**.
   - Result: Home Assistant no longer exposes new entities to Assist. To expose an entity, follow the steps in [Exposing your devices to Assist](#exposing-your-devices-to-assist).
3. To stop exposing entities that are already exposed, open the **Expose** tab.
4. Select the entities, and then select **Unexpose**.
