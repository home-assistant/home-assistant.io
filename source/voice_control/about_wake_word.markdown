---
title: "The Home Assistant approach to wake words "
related:
  - docs: /voice_control/thirteen-usd-voice-remote/
    title: Create a $13 voice assistant
  - docs: /voice_control/create_wake_word/
    title: Create your own wake words
  - docs: /voice_control/voice_remote_cloud_assistant/)
    title: Create a cloud assistant
  - docs: /voice_control/voice_remote_local_assistant/)
    title: Create a local assistant
  - docs: /voice_control/best_practices/)
    title: Best practices with Assist
---
## The challenge

- The wake words have to be processed extremely fast: You can’t have a voice assistant start listening 5 seconds after a wake word is spoken.
- There is little room for false positives.
- Wake word processing is based on compute-intensive AI models.
- Voice satellite hardware generally does not have a lot of computing power, so wake word engines need hardware experts to optimize the models to run smoothly.

## The approach

To avoid being limited to specific hardware, the wake word detection is done inside Home Assistant. Voice satellite devices constantly sample current audio in your room for voice. When it detects voice, the satellite sends audio to Home Assistant where it checks if the wake word was said and handle the command that followed it.

This means any device that streams audio can be turned into a voice satellite, even if it isn't powerful enough to run wake word detection locally. It also allows our developer community to experiment with wake word models without having to shrink the model to run on a low-powered voice satellite device.

<p class='img'>
<img src='/images/blog/2023-10-12-year-of-the-voice-chapter-4/wake-word-architecture.png'>
Overview of the wake word architecture
</p>

### Drawbacks of this approach

1. The quality of the captured audio differs between devices. A speakerphone with multiple microphones and audio processing chips captures voice very cleanly. A device with a single microphone and no post-processing? Not so much. We compensate for poor audio quality with audio post-processing inside Home Assistant and users can use better speech-to-text models to improve accuracy like the one included with Home Assistant Cloud.

2. Each satellite requires ongoing resources inside Home Assistant while it’s streaming audio. Currently, users can have 5 voice satellites streaming audio at the same time without overwhelming a Raspberry Pi 4. To scale up, we’ve updated [the Wyoming protocol][wyoming] to allow users to run wake word detection on an external server.

## About the openWakeWord add-on

Home Assistant’s wake words are leveraging a new project called [openWakeWord] by David Scripka. This project has real-world accuracy, runs on commodity hardware and anyone can [train a basic model of their own wake word][own-wake-word].

<p class='img'>
<img src='/images/blog/2023-10-12-year-of-the-voice-chapter-4/pick-wake-word.png'>
Users can pick per configured voice assistant what wake word to listen for
</p>

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

## About on-device wake word processing (microWakeWord)

The [microWakeWord](https://github.com/kahrendt/microWakeWord) created by [Kevin Ahrendt](https://www.kevinahrendt.com/) enables ESPHome to detect wake words on devices like the ESP32-S3-BOX-3.

Because openWakeWord is too large to run on low-power devices like the S3-BOX-3, openWakeWord runs wake word detection on the Home Assistant server.

Doing wake word detection on Home Assistant allows low-power devices like the [M5 ATOM Echo Development Kit](/voice_control/thirteen-usd-voice-remote/) to simply stream audio and let all of the processing happen elsewhere.
The downside is that adding more voice assistants requires more CPU usage in Home Assistant as well as more network traffic.

Enter *microWakeWord*; a more light-weight model based on [Google's Inception neural network](https://towardsdatascience.com/a-simple-guide-to-the-versions-of-the-inception-network-7fc52b863202). Because his new model is not as large, it can be run on low-power devices with an ESP32 chip, such as the ESP32-S3 chip inside the S3-BOX-3! _(It also works on the, now discontinued, S3-BOX and S3-BOX-Lite)_.

Currently, there are [three models](https://github.com/esphome/micro-wake-word-models/tree/main/models) trained for microWakeWord:

- *okay nabu*
- *hey jarvis*
- *alexa*

## Try it!

Right now, there are two easy options to get started with wake words:
- Follow the guide to the [$13 voice assistant][13-tutorial]. This tutorial is using the tiny ATOM Echo, detecting wake words with openWakeWord.
- Follow the guide to set up an [ESP32-S3-BOX-3 voice assistant](/voice_control/s3_box_voice_assistant/). This tutorial is using the bigger S3-BOX-3 device which features a display. It can detect wake words using openWakeWord. But it can also do on-device wake word detection using microWakeWord.

[13-tutorial]: /voice_control/thirteen-usd-voice-remote/
[openWakeWord]: https://github.com/dscripka/openWakeWord
[own-wake-word]: /voice_control/create_wake_word/
[Piper]: https://github.com/rhasspy/piper/
[wyoming]: https://github.com/rhasspy/wyoming