---
title: Assist - Talking to Home Assistant
related:
  - docs: /voice_control/android
    title: Assist on Android
  - docs: /voice_control/android/#assist-on-wear-os
    title: Assist on Wear OS 
  - docs: /voice_control/apple
    title: Siri and Assist shortcuts
  - docs: /voice_control/start_assist_from_dashboard/
    title: Assist dashboard button
  - docs: /voice_control/thirteen-usd-voice-remote/
    title: Build a 13$ voice remote using an ESPHome device
  - docs: /voice_control/install_wake_word_add_on
    title: Enable a wake word
  - docs: /voice_control/create_wake_word/
    title: Create your own wake words
  - docs: /voice_control/builtin_sentences
    title: Sentences starter kit
  - url: https://www.nabucasa.com/config/
    title: Home Assistant Cloud
---

<img src='/images/assist/assist-logo.png' class='no-shadow' alt='Assist logo' style='width: 150px; float: right'>

Assist allows you to control Home Assistant using natural language. It is built on top of an open voice foundation and powered by knowledge provided by our community.

Assist is available to use on most platforms that can interface with Home Assistant. Look for the Assist icon <img src='/images/assist/assist-icon.svg' alt='Assist icon' style='height: 32px' class='no-shadow'>:

<lite-youtube videoid="XF53wUbeLxA" videotitle="Voice at Home Assistant"></lite-youtube>

_Want to use Home Assistant with Google Assistant or Amazon Alexa? Get started with [Home Assistant Cloud](https://www.nabucasa.com/config/)._

## Assist on your phone

The easiest way to get started with Assist is by using it on your phone.

- Inside the Home Assistant app in the top-right corner, select the Assist icon.
- On Apple devices via [Siri and Assist shortcuts](/voice_control/apple).
- On Android phones as the default [digital assistant or home screen shortcut](/voice_control/android).
- On a tablet in kiosk mode, you can use a [dashboard button](/voice_control/start_assist_from_dashboard/) to start Assist.

## Voice assistant devices using Assist

Voice assistant devices allow you to add Assist to a room and respond to wake words. Follow our tutorial to [create your own for just $13.](/voice_control/thirteen-usd-voice-remote/)

You can use [ESPHome](https://www.esphome.io/components/voice_assistant.html) to create your own awesome voice assistant, like [@piitaya](https://github.com/piitaya) did with his 3D printed R5 droid:

<lite-youtube videoid="vQ7Hmeume9g" videotitle="Wake word demonstration on ESPHome-based 3D printed droid in Home Assistant"></lite-youtube>

## Assist on your watch

Assist is available on watches. On Wear OS watches you can set Assist as the default digital assistant or add the [Assist tile or complication](/voice_control/android/#assist-on-wear-os/).

<lite-youtube videoid="Dr_ZCbt8w5k" videotitle="Assist on Wear OS"></lite-youtube>

## Assist on your analog phone

If you are interested in a voice assistant that is not always listening, consider using Assist on an analog phone. It will only listen when you pick up the horn, and the responses are for your ears only. Follow our tutorial to create your own [analog phone voice assistant](/voice_control/worlds-most-private-voice-assistant/).

<lite-youtube videoid="0YJzLIMrnGk" videotitle="Using an analog phone to control Home Assistant"></lite-youtube>

## Custom wake words

Wake words allow you to activate Assist by saying an activation phrase instead of pressing a button. [Learn how to configure a wake word.](/voice_control/install_wake_word_add_on). There are predefined wake words, such as "OK Nabu", but you can also [define your own wake word](/voice_control/create_wake_word/)

<lite-youtube videoid="ziebKt4XLZQ" videotitle="Wake word demonstration on $13 ATOM Echo in Home Assistant"></lite-youtube>

## Create an assistant with an OpenAI personality

Want to talk to Super Mario? Or another figure? If you want Assist to respond in a fun way, you can create an assistant with an [OpenAI personality](/voice_control/assist_create_open_ai_personality/).

<lite-youtube videoid="eLx8_NAqptk" videotitle="Give your voice assistant personality using the OpenAI integration"></lite-youtube>

## Supported languages and sentences

Assist already supports a wide range of [languages](https://developers.home-assistant.io/docs/voice/intent-recognition/supported-languages).

Use the [built-in sentences](/voice_control/builtin_sentences) to control entities and areas, or [create your own sentences](/voice_control/custom_sentences/).

Did Assist not understand your sentence? [Contribute them](https://developers.home-assistant.io/docs/voice/intent-recognition/).

_Assist was introduced in Home Assistant 2023.2._
