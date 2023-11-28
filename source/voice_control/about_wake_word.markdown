---
title: "About wake words"
---

Wake words are special words or phrases that tell a voice assistant that a command is about to be spoken. The device then switches from passive to active listening. Examples are: *Hey Google*, *Hey Siri*, or *Alexa*. Home Assistant supports its own wake words, such as *Hey Nabu*.

## About the openWakeWord add-on

Home Assistant’s wake words are leveraging a new project called [openWakeWord] by David Scripka. This project has real-world accuracy, runs on commodity hardware and anyone can [train a basic model of their own wake word][own-wake-word].

### The challenge

openWakeWord is created with 4 goals in mind:

- Be fast enough for real-world usage.
- Be accurate enough for real-world usage.
- Have a simple model architecture and inference process.
- Require little to no manual data collection to train new models.

### Training the model

openWakeWord is built around an open source audio embedding model trained by Google and fine-tuned using the text-to-speech system [Piper]. Piper generates many thousands of audio clips for each wake word, creating variations of different speakers. These audio clips are then augmented to sound as if they were spoken in multiple kinds of rooms, at specific distances from a microphone, and with varying speeds. Finally, the clips are mixed with background noise like music, environmental sounds, and conversation before being fed into the training process to generate the wake word model.

<p class='img'>
<img src='/images/blog/2023-10-12-year-of-the-voice-chapter-4/open-wake-word-architecture.png'>
Overview of the openWakeWord training pipeline.
</p>

### Supported languages

OpenWakeWord currently only works for English wake words. This is because there is still a lack of models in other languages with many different speakers. Similar models for other languages can be trained as more multi-speaker models per language become available.

### openWakeWord in Docker

If you’re not running Home Assistant OS, openWakeWord is also available as [a Docker container](https://github.com/rhasspy/wyoming-openwakeword#docker-image). Once the container is running, you will need to add the Wyoming integration and point it at its IP address and port (typically 10400).

## Other wake word engines

Home Assistant ships with defaults but allows users to configure each part of their voice assistants. This also applies to wake words.

You can add other wake word engines as an integration or run them as a standalone program that communicates with Home Assistant via the [Wyoming protocol](https://github.com/rhasspy/wyoming).

<p class='img'>
<img src='/images/blog/2023-10-12-year-of-the-voice-chapter-4/wake-word-integration.png'>
How wake words integrate into Home Assistant
</p>

As an example, we’re also making the **Porcupine (v1)** wake word engine available. It supports 29 wake words across English, French, Spanish, and German. The wake words include *Computer*, *Framboise*, *Manzana*, and *Stachelschwein*.

## Try it!

To try wake words today, follow the guide to the [$13 voice assistant][13-tutorial].

## Related topics

- [Create a $13 voice assistant](/voice_control/thirteen-usd-voice-remote/)
- [Enable wake words](/voice_control/install_wake_word_add_on/)
- [Create your own wake words](/voice_control/create_wake_word/)
- [Create a cloud assistant](/voice_control/voice_remote_cloud_assistant/)

[13-tutorial]: /voice_control/thirteen-usd-voice-remote/
[openWakeWord]: https://github.com/dscripka/openWakeWord
[own-wake-word]: /voice_control/create_wake_word/
[Piper]: https://github.com/rhasspy/piper/