---
title: Talking with Home Assistant - get your system up & running
related:
  - docs: /voice_control/android
    title: Assist on Android
  - docs: /voice_control/apple
    title: Assist on Apple
  - docs: /voice_control/thirteen-usd-voice-remote/
    title: Build a 13$ voice remote using an ESPHome device
  - docs: /voice_control/best_practices/
    title: Best practices with Assist
  - url: https://www.nabucasa.com/config/
    title: Home Assistant Cloud
---

This section will help you set up Assist, which is Home Assistant voice assistant. 

Assist allows you to control Home Assistant using natural language. It is built on top of an open voice foundation and powered by knowledge provided by our community.

Assist is available to use on most platforms that can interface with Home Assistant. Look for the Assist icon <img src='/images/assist/assist-icon.svg' alt='Assist icon' style='height: 32px' class='no-shadow'>:

As for the rest of Home Assistant core functionalities, Assist can be personalized and extended to fit your needs.
- It can work locally or leverage the greatest LLMs of the moment.
- It can work on your phone or tablet or other custom voice devices.

<lite-youtube videoid="XF53wUbeLxA" videotitle="Voice at Home Assistant"></lite-youtube>

Although adding voice to your smart home configuration is exciting, it will require you to check your existing setup of Home Assistant, especially if you made a lot of customization. But we have prepared a guide of steps and best practices to help you out, as well as our [Troubleshooting](/voice_source/troubleshooting/) guides.

Ready? Now let's get started 

- [I plan to use a local speech-to-text/text-to-speech setup](/voice_control/voice_remote_local_assistant/)
- [I plan to use Home Assistant Cloud](/voice_control/voice_remote_cloud_assistant/) (recommended as it is the simplest)

## Expand and Experiment

Once your setup is up and running and you follow the [best practices](/voice_control/best_practices), check all the possibilities we found for [Expanding your Assist setup](/voice_control/expanding_assist), and further experiment with different setups like [wake words](/voice_control/about_wake_word/). Do you want to talk to Super Mario? Or another figure? If you want Assist to respond in a fun way, you can create an assistant with an [OpenAI personality](/voice_control/assist_create_open_ai_personality/).

Another things you can do to further push your setup:

- Voice assistant devices allow you to add Assist to a room and respond to wake words. Follow our tutorial to [create your own for just $13.](/voice_control/thirteen-usd-voice-remote/)

- You can use [ESPHome](https://www.esphome.io/components/voice_assistant.html) to create your own awesome voice assistant, like [@piitaya](https://github.com/piitaya) did with his 3D printed R5 droid:

- If you are interested in a voice assistant that is not always listening, consider using Assist on an analog phone. It will only listen when you pick up the horn, and the responses are for your ears only. Follow our tutorial to create your own [analog phone voice assistant](/voice_control/worlds-most-private-voice-assistant/).


## Supported languages and sentences

Assist already supports a wide range of [languages](https://developers.home-assistant.io/docs/voice/intent-recognition/supported-languages). Use the [built-in sentences](/voice_control/builtin_sentences) to control entities and areas, or [create your own sentences](/voice_control/custom_sentences/).



Did Assist not understand your sentence? [Contribute them](https://developers.home-assistant.io/docs/voice/intent-recognition/).

_Assist was introduced in Home Assistant 2023.2._
