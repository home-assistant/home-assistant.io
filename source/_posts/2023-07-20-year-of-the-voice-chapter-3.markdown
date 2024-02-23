---
layout: post
title: "Year of the Voice - Chapter 3: Ready when you are"
description: "The full power of Assist on all of your Android devices."
date: 2023-07-20 00:00:00
date_formatted: "July 20, 2023"
author: Mike Hansen
comments: true
categories: Assist
og_image: /images/blog/2023-07-20-year-of-the-voice-chapter-3/social.png
---

<p><img src='/images/blog/2023-07-20-year-of-the-voice-chapter-3/social.png' class='no-shadow' /></p>

This year is Home Assistant’s [Year of the Voice]. It is our goal for 2023 to let users control Home Assistant in their own language. Today we’re presenting our third milestone for the year: Chapter 3.

In [Chapter 1], we focused on intents – what the user wants to do. The Home Assistant community has now translated common smart home commands and responses into [50 languages], coming even closer to the 62 languages that Home Assistant supports.

In [Chapter 2], we introduced speech-to-text and text-to-speech. This allows users to talk and listen to their smart homes through the browser, [ESPHome], and even [analog phones].

For Chapter 3, we bring the full power of [Assist] to the million active Android devices running the Home Assistant Companion app. Got an Android phone, tablet, or watch? Set Assist as your default digital assistant and talk to your Home Assistant with one push!

<lite-youtube videoid="8TsutVHj7LQ" videotitle="Use Home Assistant from anywhere on Android"></lite-youtube>

<lite-youtube videoid="5b7nqGZyeVU" videotitle="Use Assist natively on your Android watch"></lite-youtube>

_To watch the video presentation of this blog post, including live demos, check [the recording of our live stream.][live-stream]_

[Year of the Voice]: https://www.home-assistant.io/blog/2022/12/20/year-of-voice/
[Chapter 1]: https://www.home-assistant.io/blog/2023/01/26/year-of-the-voice-chapter-1/
[Chapter 2]: https://www.home-assistant.io/blog/2023/04/27/year-of-the-voice-chapter-2/
[50 languages]: https://home-assistant.github.io/intents/
[live-stream]: https://youtube.com/live/sXzItFksYFA?feature=share
[Assist]: /voice_control/
[ESPHome]: /voice_control/thirteen-usd-voice-remote/
[analog phones]: /voice_control/worlds-most-private-voice-assistant/

<!--more-->

## Native Assist on Android

Starting in Chapter 3, Assist is now natively supported through the [Home Assistant Companion App]. With this update, the full power of Assist is available to over a million Android devices using Home Assistant. Access the Assist button in the app, and talk to your smart home from your phone:

<p class='img'>
<img src="/images/blog/2023-07-20-year-of-the-voice-chapter-3/phone-ha.jpg" alt="Screenshot of Assist in HA Companion app" style="max-height: 550px;" />
Assist on Android is built-in to the Android app and uses the speech-to-text from Home Assistant
</p>

Have a [Home Assistant Cloud subscription]? You can now control your smart home via voice from anywhere in the world without giving up your privacy. [Multiple Home Assistant servers are supported], so you can just as easily talk to your parent's house:

<p class='img'>
<img src="/images/blog/2023-07-20-year-of-the-voice-chapter-3/multi-server.png" alt="Screenshot of Assist picking a voice assistant" style="max-height: 550px;" />
Select a voice assistant from any of your configured Home Assistant instances
</p>

[Multiple Home Assistant servers are supported]: /voice_control/android/#using-assist-with-multiple-home-assistant-servers

### Default digital assistant

Why open an app if you don't have to? Set Home Assistant as your [default digital assistant app]! Now, holding the home or power button will instantly bring up Assist:

<p class='img'>
<img src="/images/blog/2023-07-20-year-of-the-voice-chapter-3/phone.jpg" alt="Screenshot of Assist activated on the home screen" style="max-height: 550px;" />
Launch Assist from anywhere on Android without having to open the Home Assistant app
</p>

It's even possible to activate Assist directly from the lock screen:

<lite-youtube videoid="8TsutVHj7LQ" videotitle="Use Home Assistant from anywhere on Android"></lite-youtube>

You can find the settings on Android: **Settings** > **Apps** > **Default apps** or tap on the tip in the Home Assistant Companion settings.

[Home Assistant Companion App]: https://companion.home-assistant.io/
[Home Assistant Cloud subscription]: https://www.nabucasa.com/
[default digital assistant app]: /voice_control/android/#setting-up-home-assistant-assist-as-default-assistant-app-on-an-android-phone

## Native Assist on Wear OS

We didn't leave out watches! Wear OS devices can now natively [use Assist] as well:

<lite-youtube videoid="5b7nqGZyeVU" videotitle="Use Assist natively on your Android watch"></lite-youtube>

Text-to-speech responses are spoken directly from the watch, allowing you to listen instead of looking for confirmation.

Like the phones, it is possible to set Home Assistant to be your [watch's default digital assistant]. Pressing the crown or holding the button on your watch now brings up Assist!

<p class='img'>
<img src="/images/blog/2023-07-20-year-of-the-voice-chapter-3/watch.png" alt="Screenshot of native Assist on Wear OS" style="max-height: 250px;" />
Native Assist on Wear OS
</p>

[use Assist]: /voice_control/android/#assist-on-wear-os
[watch's default digital assistant]: /voice_control/android/#setting-up-home-assistant-assist-as-default-assistant-app-on-a-wear-os-watch

## Sentence triggers

While [custom sentences] were already part of Assist, they required manually editing YAML. With the new [sentence trigger], you can now add custom sentences directly in the UI:

<p class='img'>
<img src="/images/blog/2023-07-20-year-of-the-voice-chapter-3/sentence-trigger.png" alt="Screenshot of sentence trigger creation" />
Configure your own sentences to trigger any action in the automation editor
</p>

These sentences take priority over the built-in commands, and work anywhere that Assist does. Some basic [template syntax] is available, such as marking parts of the sentence as optional.

[custom sentences]: /voice_control/custom_sentences/
[sentence trigger]: /voice_control/custom_sentences/#adding-a-custom-sentence-to-trigger-an-automation
[template syntax]: https://developers.home-assistant.io/docs/voice/intent-recognition/template-sentence-syntax

## Assist debug tool

The Home Assistant community is hard at work translating [common smart home commands]. To help contributors, we've added an ["Assist" developer tool] that lets you test out sentences without actually executing the commands:

<p class='img'>
<img src="/images/blog/2023-07-20-year-of-the-voice-chapter-3/sentence-debug.png" alt="Screenshot of Assist developer tool" />
Test sentence understanding with the Assist developer tool
</p>

For each test command or query, you can find out:

- Which [intent] would be triggered with its slot values
- Which entities would be targeted
- Whether or not each targeted entity matched (queries only)

[common smart home commands]: https://github.com/home-assistant/intents/
[intent]: https://developers.home-assistant.io/docs/intent_builtin
["Assist" developer tool]: /voice_control/troubleshooting/#test-a-sentence-per-assistant-without-voice-while-executing-the-commands

## Piper community voices

[Piper] is a text-to-speech system created by Nabu Casa, designed to run locally on the Raspberry Pi 4. Since its introduction in Chapter 2, Piper has [grown rapidly] with adoption in the open source community as well as [academia].

<p class='img'>
<img style='width: 80%' src='/images/assist/piper-logo.svg' alt='Piper logo' class='no-shadow'>
</p>

The upcoming release of the [Piper add-on] for Home Assistant 2023.8 will support 23 languages and over 70 different voices. This will include voices from 7 brand new [voice datasets] contributed by the Home Assistant community. These datasets have been collected and donated to the public domain by Nabu Casa for the benefit of text-to-speech research now and in the future.

You can use [Piper in automations] to make text-to-speech announcements, or use it as your voice to [setup a fully local assistant].

[Piper]: https://github.com/rhasspy/piper/
[grown rapidly]: https://building.open-home.io/piper-is-our-new-voice-for-the-open-home/
[Piper add-on]: https://github.com/home-assistant/addons/blob/master/piper/README.md
[academia]: https://www.techrxiv.org/articles/preprint/Image_Captioning_for_the_Visually_Impaired_and_Blind_A_Recipe_for_Low-Resource_Languages/22133894
[voice datasets]: https://github.com/NabuCasa/voice-datasets/
[Piper in automations]: /voice_control/using_tts_in_automation/
[setup a fully local assistant]: /voice_control/voice_remote_local_assistant/

## New ESPHome voice modes

<a href="https://shop.m5stack.com/products/atom-echo-smart-speaker-dev-kit?ref=NabuCasa"><img src="/images/blog/2023-07-20-year-of-the-voice-chapter-3/atom_echo.png" alt="ATOM Echo Smart Speaker from M5Stack" style='width:96px;float:right;margin-left:8px;'/></a>

With hardware like the $13 [ATOM Echo], it was possible in Chapter 2 to [create a push-to-talk voice Assistant using ESPHome].

Using the latest ESPHome, you can push a button to start speaking and let Home Assistant detect the end of the voice command. Continuous mode is also available, allowing multiple conversation turns with Assist similar to an analog phone.

```yaml
voice_assistant:
  microphone: ...
  speaker: ...

binary_sensor:
  - platform: gpio
    pin: ...
    on_click:
      - if:
          condition: voice_assistant.is_running
          then:
            - voice_assistant.stop:
          else:
            - voice_assistant.start_continuous:
```

[ESPHome Voice Assistant documentation](https://esphome.io/components/voice_assistant.html#click-to-converse)

### Silence detection

ESPHome's new voice modes use Home Assistant to detect the end of each voice command. In your device's configuration, you can now adjust how much silence is needed with "Finished speaking detection":

<p class='img'>
<img src="/images/blog/2023-07-20-year-of-the-voice-chapter-3/esphome_config.png" alt="Configure silence detection for your ESPHome voice assistant" />
ESPHome Voice Assistant have two config entities to automate it's behavior in Home Assistant
</p>

[ATOM Echo]: https://shop.m5stack.com/products/atom-echo-smart-speaker-dev-kit?ref=NabuCasa
[create a push-to-talk voice Assistant using ESPHome]: /voice_control/thirteen-usd-voice-remote/

## Until next time

That does it for Chapter 3! A big thanks to [Joris Pelgröm] for his work on the Android app, and to the many Assist contributors.
And as always, thank you to [Nabu Casa](https://www.nabucasa.com) and all of the Home Assistant Cloud subscribers for making this possible.

If you want to help fund our work on voice and further development of Home Assistant, ESPHome, Z-Wave JS and other related projects? Subscribe to [Home Assistant Cloud](https://www.nabucasa.com).

### Where is wake word?

After three chapters in the Year of Voice, the message from Home Assistant users and creators is loud and clear: we want a wake word for Assist!

In Chapter 4, our focus will be on delivering the foundation for wake word detection. As a part of the [Open Home], this foundation will keep in line with our values: privacy, choice, and sustainability. Stay tuned!

[Joris Pelgröm]: https://github.com/jpelgrom
[Open Home]: https://www.home-assistant.io/blog/2021/12/23/the-open-home/?ref=building.open-home.io

_Some links on this page are affiliate links and purchases using these links support the Home Assistant project._
