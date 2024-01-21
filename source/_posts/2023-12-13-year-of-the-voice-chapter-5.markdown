---
layout: post
title: "Year of the Voice - Chapter 5"
description: "More hardware options and intents"
date: 2023-12-13 00:00:00
date_formatted: "December 13, 2023"
author: Michael Hansen
comments: true
categories: Assist
og_image: /images/blog/2023-12-13-year-of-the-voice-chapter-5/social.png
---

<p><img src='/images/blog/2023-12-13-year-of-the-voice-chapter-5/social.png' class='no-shadow' /></p>

We've reached the end of Home Assistant’s [Year of the Voice]! It was our goal for 2023 to let users control Home Assistant by speaking in their own language.

At the start of 2023, Home Assistant had basic text-based control for some devices in English only. As the year closes, users can now control and ask questions of their smart homes with voice in over 50 languages across a variety of devices, including:

- Any [ESPHome] device with a microphone
- Android phones, tablets, and smart watches
- Old school analog phones ([with an adapter][phone-tutorial])

Home Assistant users can now create multiple voice assistants by mixing and matching components of a voice "pipeline". Home Assistant Cloud subscribers automatically gain access to high-quality voice components in over 130 languages and dialects. Fully local components are available as well, such as our [Piper] text-to-speech system, allowing for 100% offline voice control.

In [Chapter 4], we added wake word processing directly into Home Assistant by leveraging the [openWakeWord] project. This allowed tiny voice satellites such as the [M5 ATOM Echo Development Kit][m5-tutorial] to offload wake word detection by streaming audio to a Home Assistant server. The community has been hard at work training a variety of [custom wake words][community-wake-words] that everyone can use to make their voice experience unique.

For the final chapter of 2023, we have expanded the available types of voice commands to include weather, temperature, and to-do lists. Voice satellites are now aware of which area they're in, and more hardware/software options are available too.

Happy holidays!

<p class='img'>
<lite-youtube videoid="erf7HqTwCGs" videotitle="ESP32-S3-Box running Assist"></lite-youtube>
Assist running on the ESP32-S3-BOX.
</p>

<!--more-->

## The S3-BOX-3

Espressif recently released the [ESP32-S3-BOX-3], an update of the discontinued ESP32-S3-BOX (and "lite" variant). This "AIoT" development kit contains an ESP32-S3 chip, dual microphones, a small speaker, and a screen. Several docks are available in the box, which expose a USB-C power connector and GPIO pins for expanding the device.

<p class='img'>
<lite-youtube videoid="73QhFefsbbc" videotitle="Assist on the ESP32-S3-Box with custom artwork"></lite-youtube>
Assist running on the ESP32-S3-BOX with custom artwork.
</p>

The [ESPHome] team has been hard at work adding support for the S3-BOX-3, including the ability to customize the display! Check out the [S3-BOX-3 tutorial][s3-box-tutorial] to get started.

<p class='img'>
<lite-youtube videoid="HQQfaXTbhvc" videotitle="The Frenck-en Box-3"></lite-youtube>
Spend the holidays with Frenck as your voice assistant.
</p>

## More voice commands

Starting all the way back in [Chapter 1], we added voice commands for:

- Turning lights and other devices on and off
- Opening and closing doors, windows, etc.
- Setting the brightness and color of lights
- Adding items to a shopping list
- Asking questions, such as which windows are open in an area

For Chapter 5, we've extended this list to include:

- Adding items to a **to-do list** - *"add take out the garbage to my task list"*
- Getting the **inside temperature** - *"what's the temperature?"*
- Getting the current **weather** condition - *"what's the weather like?"*
- **Canceling** a satellite wake-up - *"never mind"*

Make sure you've [exposed] the devices you want [Assist] to have access to, and that they are named properly. You can always add an [alias] when you'd like to refer to a device by something more convenient for voice. For example, adding an alias "Berlin" to a weather entity would allow you to say *"what's the weather like in Berlin?"*.


## Area awareness

Voice satellites can be placed all around the house, and it's important to keep their area in mind when interpreting commands like *"turn on the lights"*. This command will now turn on all of the lights in the satellite's area, and *"turn off the lights"* will do the opposite. You can still target the lights in a different area, of course, by specifying: *"turn on the lights in the bedroom"*.

<p class='img'>
<lite-youtube videoid="pvEe0kVWFNE" videotitle="Area Awareness"></lite-youtube>
Voice satellites make use of the area they're in.
</p>

This is a small start to satellites being aware of their *context*, and adjusting behavior accordingly.


## Improved Raspberry Pi satellites

To date, Raspberry Pi-based voice satellites have used Home Assistant's websocket API. This had several limitations, such as requiring an API token, not knowing which area the satellite was in, and not being able to configure it in Home Assistant's UI.

We've extended the [Wyoming integration][wyoming] to communicate directly with [remote satellites][wyoming-satellite]. These satellites are automatically discovered, and can be configured much like ESPHome-based satellites with the ability to set an area and voice pipeline.

Several satellite modes are supported, including:

- **Always-on streaming** - satellite streams all audio to Home Assistant
- **Stream on speech** - only stream audio once speech is detected
- **Local wake word** - only stream audio when a wake word is detected locally

Audio clean up, such as automatic gain control and noise suppression, may be done in Home Assistant or on the satellite. A [Raspberry Pi Zero 2 W][rpi-zero-2w] has more than enough power to do local audio clean up and wake word detection, allowing you to have many satellites without straining your Home Assistant server. Reuse your old Raspberry Pi's, and start your journey with smart home voice control!

<p class='img'>
<img src='/images/blog/2023-12-13-year-of-the-voice-chapter-5/raspberry_pi_zero2w.png'>
Raspberry Pi Zero 2 W (MSRP: $15 USD).
</p>


## Stay tuned

Although the Year of Voice is coming to a close, voice in Home Assistant is just getting started! I, Mike "The Voice" Hansen, will continue at Nabu Casa to improve and extend the voice and natural language capabilities of Home Assistant.

On the roadmap for next year, we're planning things like local wake word detection on the S3-BOX-3, and integration with large language models (LLMs) like GPT. We're also still on the hunt for the perfect voice satellite hardware: inexpensive with great audio, but also capable of running open source wake word models locally.


## Thank you

Thank you to the Home Assistant community for subscribing to [Home Assistant Cloud][nabucasa] to support Year of the Voice and development of Home Assistant, ESPHome and other projects in general.

Thanks to our language leaders for extending the sentence support to all the various languages.

<p class='img'>
<img src='/images/blog/2023-12-13-year-of-the-voice-chapter-5/ha-support.png' alt="Thank you for supporting the Home Assistant project">
</p>

[Year of the Voice]: /blog/2022/12/20/year-of-voice/
[Chapter 1]: /blog/2023/01/26/year-of-the-voice-chapter-1/
[Chapter 4]: /blog/2023/10/20/year-of-the-voice-chapter-4/
[Assist]: /voice_control/
[exposed]: /voice_control/voice_remote_expose_devices/
[alias]: /voice_control/aliases
[wyoming]: https://github.com/rhasspy/wyoming
[openWakeWord]: https://github.com/dscripka/openWakeWord
[Piper]: https://github.com/rhasspy/piper/
[community-wake-words]: https://github.com/fwartner/home-assistant-wakewords-collection
[ESP32-S3-BOX-3]: https://www.espressif.com/en/news/ESP32-S3-BOX-3
[wyoming]: /integrations/wyoming
[wyoming-satellite]: https://github.com/rhasspy/wyoming-satellite
[rpi-zero-2w]: https://www.raspberrypi.com/products/raspberry-pi-zero-2-w/
[s3-box-tutorial]: /voice_control/s3_box_voice_assistant/
[ESPHome]: https://esphome.io
[nabucasa]: https://www.nabucasa.com
[phone-tutorial]: https://www.home-assistant.io/voice_control/worlds-most-private-voice-assistant/
[m5-tutorial]: /voice_control/thirteen-usd-voice-remote/
