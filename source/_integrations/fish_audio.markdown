---
title: Fish Audio
description: Instructions on how to setup Fish Audio integration with Home Assistant.
ha_category:
  - Text-to-speech
  - Speech-to-text
ha_release: 2025.9
ha_iot_class: Cloud Polling
ha_domain: fish_audio
ha_platforms:
  - tts
  - stt
ha_config_flow: true
ha_integration_type: service
ha_codeowners:
  - '@noambav'
---

The **Fish Audio** integration brings high-quality voice cloning and a wide variety of public voices to Home Assistant. It provides both text-to-speech (TTS) and speech-to-text (STT) services, allowing you to create expressive, human-like speech and use voice commands with Assist pipelines.

Fish Audio is positioned as a leading voice cloning service. It features the advanced `s1` model series, which supports emotional and tone markers for more natural-sounding speech.

## Prerequisites

- A [Fish Audio](https://fish.audio/?fpr=homeassistant) account is required.
- You will need an API key, which you can create from your [Fish Audio API keys dashboard](https://fish.audio/app/api-keys/).
- Your Home Assistant instance must have internet access to reach the Fish Audio API.

{% include integrations/config_flow.md %}

The setup process is completed in stages:

1. **API Key**: First, you will be asked to enter your Fish Audio API key.
2. **Voice Filtering**: Next, you can choose whether to see only your private, cloned voices or the recommended public voices offered by Fish Audio.
3. **Final Configuration**: On the final screen, you can set the following options:
    - **Voice Selection**: Based on your previous selection, you will see a dropdown list of available voices. You can also choose to enter a custom voice ID, which can be obtained from the Fish Audio website.
    - **Default Model**: Choose a default backend model. `s1` is the latest and most advanced model. Both `s1` and `v1.6` models support [emotional markers](#using-with-large-language-models-llms).

After setup, one TTS entity and one STT entity will be created. These can be used in automations, scripts, or assigned to Assist pipelines. You can change the default options at any time from the integration's **Options** menu.

### Language and Accents

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

## Text-to-speech (TTS)

The `tts.speak` service allows you to use Fish Audio voices in your automations and scripts. Select the `tts.fish_audio` entity, choose a media player, and enter your message.

Example of a `tts.speak` service call in YAML:

```yaml
action:
  - service: tts.speak
    target:
      entity_id: tts.fish_audio
    data:
      media_player_entity_id: media_player.living_room_speaker
      message: "Hello, this is a test of my new voice!"
      options:
        voice_id: "802e3bc2b27e49c2995d23ef70e6ac89"
        backend: "s1"
```

### Using in Assist Pipelines

The `tts.fish_audio` entity can also be set as the voice for your Assist pipelines. This allows your voice assistant to respond using the high-quality Fish Audio voices.

To configure this:

1. Go to **Settings** > **Voice assistants**.
2. Select the assistant you want to configure.
3. In the **Text-to-speech** section, choose `tts.fish_audio` from the dropdown menu.

Your assistant will now use the default voice and model you configured for the Fish Audio integration for its spoken responses.

### Using with Large Language Models (LLMs)

The `s1` and `v1.6` models are capable of highly expressive speech by using special markers for emotion and tone. To leverage this with a Large Language Model (LLM), you can add instructions to your prompt that guide the LLM to generate these markers in its response. For a complete list of available markers and more advanced examples, you can refer to the [blog post on the s1 model](https://openaudio.com/blogs/s1) to help you craft the perfect prompt for your needs.

For example, you could combine your main request with a set of instructions for the LLM like this:

**Prompt:**
> Announce that the house is now in movie mode. The lights are dimmed and the blinds are closed.

**Instructions for the LLM:**

```text
Apply emotion control by inserting markers before text.

- Use Emotion Markers: (angry), (sad), (excited), (surprised), (sarcastic), (joyful), (empathetic)
- Use Tone Markers: (in a hurry tone), (shouting), (screaming), (whispering), (soft tone)
- Use Special Markers: (laughing), (chuckling), (sobbing), (sighing), (panting), (crowd laughing)
- Optionally add onomatopoeia with markers, e.g. "Ha,ha,ha" for laughter.
- Place markers immediately before the dialogue they modify.
- Default to neutral if no marker is specified.
```

The LLM might then generate a response like this:

`(soft tone) Movie mode has been activated. The lights are dimmed, and the blinds are closed. (empathetic) Enjoy the show.`

## Speech-to-text (STT)

The STT entity provided by the Fish Audio integration can be used with [Assist pipelines](/docs/assist/) to process voice commands.

To use it as the speech-to-text engine for your voice assistant:

1. Go to **Settings** > **Voice assistants**.
2. Select the assistant you want to configure.
3. In the **Speech-to-text** section, choose `stt.fish_audio` from the dropdown menu.

Your assistant will now use Fish Audio to transcribe your voice commands.

## Troubleshooting

- **No Private Voices Appear**: If you have enabled the "Private models only" option but your cloned voices do not appear, ensure that you have created them in your Fish Audio account. It may take a few minutes for new voices to become available via the API.
  