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

{% term Covers %} include garage doors and gates, so Home Assistant exposes them automatically too. If you don't want to open them by voice, stop exposing them. For the steps, refer to [Unexposing entities](#unexposing-entities).

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

## Exposing entities to a voice assistant

You can expose several {% term entities %} at once from the **Expose** tab, or a single entity from its settings. Both work for {% term Assist %}, Alexa, and Google Assistant.

### Exposing entities from the Expose tab

Use the **Expose** tab to expose several {% term entities %} at once, or entities that Home Assistant doesn't expose automatically. For example, you added a smart lock, and you want to lock the front door with {% term Assist %}. Or you just connected Alexa, and you want to ask it to turn on the living room lights. The tab also shows which entities a voice assistant can use.

Prerequisites:

- An administrator account.
- For Alexa or Google Assistant: the requirements in [Alexa and Google Assistant](#alexa-and-google-assistant).

To expose entities from the Expose tab:

1. Go to {% my voice_assistants title="**Settings** > **Voice assistants**" %}.
2. At the bottom of the card of the voice assistant, select the text that shows the number of exposed entities.
   - Result: The **Expose** tab opens. It only lists the entities that are exposed to that voice assistant.
   - For example, at the bottom of the **Assist** card, the text shows **12 entities exposed**.
   - If the **Alexa** or **Google Assistant** card shows **Show entities** instead, you configured entity filters in your {% term "`configuration.yaml`" %} file. In that case, you can't change the exposed entities in the UI.
3. In the lower-right corner, select **Expose entities** {% icon "mdi:plus" %}.
4. Select the entities that you want to expose.
   - To find an entity, use the search field.
5. Select **Expose** followed by the number of entities.
   - Result: The voice assistant can use these entities.
   - For example, the button shows **Expose 3 entities**.

### Exposing a single entity from its settings

Use the settings of an {% term entity %} when you're already working with that entity. For example, you just set up a new ceiling light and opened it from its {% term device %} page. You can expose it right there, without going to the **Expose** tab. In the same dialog, you can also add [aliases](/voice_control/aliases/), the other names that voice assistants understand for the entity.

Prerequisites:

- An administrator account.
- The entity has a [unique ID](/faq/unique_id/). Entities without a unique ID have no voice assistant settings. To expose them, use the [Expose tab](#exposing-entities-from-the-expose-tab).
- For Alexa or Google Assistant: the requirements in [Alexa and Google Assistant](#alexa-and-google-assistant).

To expose a single entity from its settings:

1. Open the entity.
   - For example, select it under {% my entities title="**Settings** > **Devices & services** > **Entities**" %}.
   - If the entity is already listed on the **Expose** tab, you can also select it there, and continue with step 4.
2. Select **Settings** {% icon "mdi:cog-outline" %}.
3. Select **Voice assistants**.
4. Under **Expose**, turn on the voice assistant you want to use. If you only see the main **Expose** switch, use the [Expose tab](#exposing-entities-from-the-expose-tab) to choose a single assistant. The main switch exposes the entity to all supported assistants managed in the UI.
   - Result: The change takes effect right away.
   - For example, turn on **Assist**.
   - If a voice assistant shows **Unsupported**, it can't control this kind of entity.
   - For doors, garage doors, and locks, Google Assistant also shows **Ask for PIN**. If you turn it on, Google Assistant asks for the PIN that you set under **Security devices** on the **Google Assistant** card.

## Unexposing entities

Unexpose an {% term entity %} when you no longer want to control it by voice. For example, Home Assistant exposed a new garage door to {% term Assist %} automatically, and you don't want to open it by voice. Only the voice assistant that you choose stops using the entity. Unexposing doesn't remove the entity from Home Assistant.

Prerequisites:

- An administrator account.
- For Alexa or Google Assistant: the requirements in [Alexa and Google Assistant](#alexa-and-google-assistant).

To unexpose entities:

1. Go to {% my voice_assistants title="**Settings** > **Voice assistants**" %}.
2. At the bottom of the card of the voice assistant, select the text that shows the number of exposed entities.
   - Result: The **Expose** tab opens. It only lists the entities that are exposed to that voice assistant.
3. Select **Enter selection mode** {% icon "mdi:format-list-checks" %}.
4. Select the entities.
5. Select **Unexpose**, then select **Unexpose** again in the confirmation dialog.
   - Result: The voice assistant can no longer use these entities.
   - A {% term "conversation agent" %} with the **Home Assistant** set of {% term "AI tools" %} can still reach them. For details, refer to [Sets of AI tools](/integrations/llm/#sets-of-ai-tools).
   - To unexpose a single entity, you can also turn off the voice assistant in the settings of the entity, as described in [Exposing a single entity from its settings](#exposing-a-single-entity-from-its-settings).

## Changing Expose new entities

**Expose new entities** decides whether Home Assistant exposes new {% term entities %} to a voice assistant as you add them. Each voice assistant has its own setting:

- For {% term Assist %}, it's turned on by default. If you want to decide on every entity yourself, turn it off. For example, you don't want a new garage door to be exposed before you decide. For the kinds of entities that it exposes, refer to [Entities that are exposed automatically](#entities-that-are-exposed-automatically).
- For Alexa and Google Assistant, it's turned off by default. If you want to control each new entity with them, turn it on. For example, you often add new lights and switches, and you want to control each one with Alexa without exposing it yourself. Home Assistant uses the same [automatic exposure rules](#entities-that-are-exposed-automatically) as for Assist.

Prerequisites:

- An administrator account.
- For Alexa or Google Assistant: the requirements in [Alexa and Google Assistant](#alexa-and-google-assistant).

To change Expose new entities:

1. Go to {% my voice_assistants title="**Settings** > **Voice assistants**" %}.
2. On the card of the voice assistant, turn **Expose new entities** on or off.
   - Result: The setting applies to the entities that you add from now on. Entities that you added before stay as they are.
   - To stop exposing entities that are already exposed, refer to [Unexposing entities](#unexposing-entities).
