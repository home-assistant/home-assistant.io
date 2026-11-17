---
title: "Exposing entities to voice assistants"
description: Step-by-step instructions on exposing entities to Assist, Alexa, and Google Assistant.
related:
  - docs: /voice_control/voice_remote_cloud_assistant/
    title: Creating a Cloud assistant
  - docs: /voice_control/voice_remote_local_assistant/
    title: Creating a local assistant
  - docs: /voice_control/best_practices/
    title: Best practices with Assist
---

Assist can only see and control the {% term entities %} that you expose to it. This way, you decide which devices you can control by voice. There's one exception: a {% term "conversation agent" %} with the **Home Assistant** set of {% term "AI tools" %} selected can reach all entities. This includes entities that you never exposed or stopped exposing. For details, refer to [Sets of AI tools](/integrations/llm/#sets-of-ai-tools).

## Entities that are exposed automatically

Home Assistant exposes common {% term devices %} to {% term Assist %} as you add them. This is the **Expose new entities** setting on the **Assist** card, under {% my voice_assistants title="**Settings** > **Voice assistants**" %}. It's turned on by default.

When **Expose new entities** is turned on, Home Assistant exposes each new {% term entity %} of the following kinds to Assist:

- Lights, switches, fans, covers, climate devices, humidifiers, water heaters, vacuums, media players, scenes, and to-do lists.
- Binary sensors for doors, garage doors, windows, locks, and other openings, and binary sensors that detect motion or presence. These sensors only report a state. Assist can tell you if a door is open, but it can't open or unlock anything with them.
- Sensors that measure temperature, humidity, carbon monoxide, carbon dioxide, PM2.5, PM10, volatile organic compounds, or the air quality index.

{% term Covers %} include garage doors and gates, so Home Assistant exposes them automatically too. If you don't want to open them by voice, stop exposing them. For the steps, refer to [Exposing your devices to Assist](#exposing-your-devices-to-assist).

Home Assistant never exposes other entities automatically. For example, locks, alarm control panels, and {% term scripts %} stay unexposed until you expose them yourself. Configuration entities, diagnostic entities, and hidden entities are never exposed automatically either.

After an entity is added, it keeps its setting until you change it. You can expose or stop exposing any entity at any time.

The **Alexa** and **Google Assistant** cards have their own **Expose new entities** setting. It's turned off by default.

## Alexa and Google Assistant

With [Home Assistant Cloud](/integrations/cloud/), you can also control your {% term entities %} with Alexa or Google Assistant. Each of them has its own card on the **Voice assistants** page, with its own exposure settings. You expose entities to them the same way as to {% term Assist %}.

To use Alexa or Google Assistant this way, you need the following:

- You're signed in to Home Assistant Cloud.
- Alexa or Google Assistant is connected to Home Assistant Cloud:
  - For Alexa, the Home Assistant skill is enabled in the Alexa app. For the steps, refer to [Alexa](https://support.nabucasa.com/hc/articles/25619363899677) in the Home Assistant Cloud documentation.
  - For Google Assistant, the **Home Assistant Cloud by Nabu Casa** service is added in the Google Home app. For the steps, refer to [Google Assistant](https://support.nabucasa.com/hc/articles/25619376817053) in the Home Assistant Cloud documentation.
- Alexa or Google Assistant is turned on in its card under {% my voice_assistants title="**Settings** > **Voice assistants**" %}.

If you set up Alexa or Google Assistant without Home Assistant Cloud, you choose the entities in {% term YAML %} instead. For details, refer to [Configure filter](/integrations/alexa.smart_home/#configure-filter) for Alexa and to the [Google Assistant](/integrations/google_assistant/) {% term integration %}.

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
