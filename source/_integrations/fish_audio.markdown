---
title: Fish Audio
description: Instructions on how to setup Fish Audio integration with Home Assistant.
ha_category:
  - Text-to-speech
ha_release: 2026.1
ha_iot_class: Cloud Polling
ha_domain: fish_audio
ha_platforms:
  - tts
ha_config_flow: true
ha_integration_type: service
ha_codeowners:
  - '@noambav'
---

The **Fish Audio** {% term integration %} brings high-quality voice cloning and a wide variety of public voices to Home Assistant. It provides a text-to-speech (<abbr title="text-to-speech">TTS</abbr>) service, allowing you to create expressive, human-like speech.

Fish Audio is positioned as a leading voice cloning service. It features the advanced `s1` model series, which supports emotional and tone markers for more natural-sounding speech.

## Prerequisites

- A [Fish Audio](https://fish.audio) account is required.
- You will need an API key, which you can create from your [Fish Audio API keys dashboard](https://fish.audio/app/api-keys).
- Your Home Assistant instance must have internet access to reach the Fish Audio API.

{% include integrations/config_flow.md %}

The setup is a two-step process. First, you configure the integration with your API key, and then you can add one or more voices.

### Initial setup

You will be asked for your [Fish Audio](https://fish.audio) API key. After you provide it, the integration will be added.

### Adding a voice

To add a text-to-speech (TTS) voice, select the **Add TTS voice** button on the integration card. You can repeat this process to add multiple voices.

The process for adding a voice involves two steps:

1. Voice filtering:
   - First, you'll choose whether to see only your private, cloned voices or also the recommended public voices from Fish Audio.
2. Voice configuration:
   - Based on your filter selection, you will then be presented with the following options on the next screen:
      - **Voice**: Select a voice from the dropdown list of available voices. You can also enter a custom voice ID from the Fish Audio website.
      - **AI voice model**: Choose a default backend model. `s1` is the latest and most advanced model. Both `s1` and `v1.6` models support [emotional markers](#using-with-large-language-models-llms).
      - **Latency mode**: Choose between `normal` (better quality) or `balanced` (faster speed).
      - **Name**: Set the name for the TTS entity that will be created.

Each voice you add creates a new TTS entity.

### Language and accents

Fish Audio determines the spoken language based on the input text, not a fixed language setting for the voice. This means you can give English text to a Spanish voice, and it will speak English with a Spanish accent. Similarly, providing Spanish text to an English voice will result in Spanish spoken with an English accent.

Currently supported languages include:

- Arabic
- Chinese
- English
- French
- German
- Japanese
- Korean
- Spanish
- Any: Selecting **Any** allows Fish Audio to automatically determine the spoken language based on the input text, enabling the cross-language accent behavior described above.

## Text-to-speech (TTS)

The `tts.speak` service allows you to use Fish Audio voices in your automations and scripts. Select the `tts.fish_audio` entity, choose a media player, and enter your message.

Example of a `tts.speak` service call in YAML:

```yaml
actions:
  - action: tts.speak
    target:
      entity_id: tts.fish_audio
    data:
      media_player_entity_id: media_player.living_room_speaker
      message: "Hello, this is a test of my new voice!"
      options:
        voice_id: "802e3bc2b27e49c2995d23ef70e6ac89"
        backend: "s1"
        latency: "normal"
```

### Using in Assist pipelines

The TTS entities you create can be set as the voice for your Assist pipelines. This allows your voice assistant to respond using the high-quality Fish Audio voices.

To configure this:

1. Go to {% my voice_assistants title="**Settings** > **Voice assistants**" %}.
2. Select the assistant you want to configure.
3. In the **Text-to-speech** section, choose one of your created voices from the dropdown menu.

Your assistant will now use the default voice and model you configured for the Fish Audio integration for its spoken responses.

### Using with Large Language Models (LLMs)

The `s1` and `v1.6` models are capable of highly expressive speech by using special markers for emotion and tone. To leverage this with a Large Language Model (LLM), you can add instructions to your prompt that guide the LLM to generate these markers in its response. For a complete list of available markers and more advanced examples, you can refer to the [emotion control documentation](https://docs.fish.audio/developer-guide/core-features/emotions) to help you craft the perfect prompt for your needs.

For example, you could combine your main request with a set of instructions for the LLM like this:

**Prompt:**
> Announce that the house is now in movie mode. The lights are dimmed and the blinds are closed.

**Instructions for the LLM:**

```text
Apply emotion control by inserting markers before text.

- Use emotion markers: (angry), (sad), (excited), (surprised), (sarcastic), (joyful), (empathetic)
- Use tone markers: (in a hurry tone), (shouting), (screaming), (whispering), (soft tone)
- Use special markers: (laughing), (chuckling), (sobbing), (sighing), (panting), (crowd laughing)
- Optionally add onomatopoeia with markers, for example: "Ha,ha,ha" for laughter.
- Place markers immediately before the dialogue they modify.
- Default to neutral if no marker is specified.
```

The LLM might then generate a response like this:

`(soft tone) Movie mode has been activated. The lights are dimmed, and the blinds are closed. (empathetic) Enjoy the show.`

## Troubleshooting

### No private voices appear

#### Symptom: "No private voices available"

When trying to add a voice with the "Private models only" option enabled, your cloned voices do not appear in the voice selection list.

#### Description

This means the private voices you created in your Fish Audio account are not yet available via the API, or they haven't been created yet.

#### Resolution

To resolve this issue, try the following steps:

1. Make sure you have created cloned voices in your [Fish Audio account](https://fish.audio/app/my-voices/).
2. Make sure the voices are fully processed and ready to use.
3. Wait a few minutes for new voices to become available via the API after creation.

### TTS entity shows up as double named

If a TTS entity is named "Adam", it might show up as "Adam Adam" in the interface. This is currently a known issue.
  
## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
