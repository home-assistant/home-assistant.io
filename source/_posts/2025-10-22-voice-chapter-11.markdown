---
layout: post
title: "Voice Chapter 11: multilingual assistants are here"
description: "Our assistant can now control more things and in multiple languages at the same time."
date: 2025-10-22 00:00:01
date_formatted: "October 22, 2025"
author: Mike Hansen
comments: true
categories: Assist
og_image: /images/blog/2025-10-voice-chapter-11/art.webp
---

<img src='/images/blog/2025-10-voice-chapter-11/art.webp' style='border: 0;box-shadow: none;' alt="Voice Chapter 11: multilingual assistants are here">

Welcome to Voice Chapter 11 🎉, our [long-running series](/blog/categories/assist/) where we share all the key developments in Open Voice. In this chapter, we will tell you how our assistant can now control more things in the home, in multiple languages at the same time, all while not talking your ear off. What’s more, our list of supported languages has grown again with several languages that big tech’s voice assistants won’t support. Join us for a deeper look at this voice chapter in our [livestream](https://www.youtube.com/watch?v=sIkguv0NEQI) on Wednesday, October 29. It’s been a couple of months, we’ve been building up our voice, and now have a lot to say, so let’s get to it!<!--more-->

## Multilingual assistants

Our original goal for the [Year of Voice back in 2023](/blog/2022/12/20/year-of-voice/) was to “let users control Home Assistant in their own language”. We’ve come a long way towards that goal, and really broadened our language support. We’ve also provided options that allow users to customize voice assistant pipelines with the services that best support their language, whether run locally or in the cloud of their choice. But what if you speak two languages within your home?

For some time, users have been able to create [Assist](/voice_control/) voice assistant pipelines for different languages in Home Assistant, but interacting with the different pipelines has either required multiple voice satellite devices (one per language) or some kind of automation [trigger to switch languages](https://www.youtube.com/live/ZgoaoTpIhm8?t=3902).

Since even the tiniest voice satellite hardware we support is capable of running [multiple wake words](/blog/2024/06/26/voice-chapter-7/#3x-wake-words-and-2x-accuracy) now, we’ve added support in 2025.10 for configuring **up to two wake words** and voice assistant pipelines on each Assist satellite! This makes it straightforward to support dual language households by assigning different wake words to different languages. For example, “Okay Nabu” could run an English voice assistant pipeline while “Hey Jarvis” is used for French.

Multiple wake words and pipelines can be used for other purposes as well. Want to keep your local and cloud-based voice assistants separate? Easy! Assign a wake word like “Okay Nabu” to a fully local pipeline using our own [Speech-to-Phrase](/blog/2025/02/13/voice-chapter-9-speech-to-phrase/) and [Piper](https://github.com/home-assistant/addons/blob/master/piper/DOCS.md). This pipeline would be limited to basic voice commands, but would not require anything to run outside of your Home Assistant server. Alongside this, “Hey Jarvis” could be assigned to a different pipeline that uses external services like Home Assistant Cloud and an LLM to answer questions or perform complex actions.

We’d love to hear feedback on how you plan to use multiple wake words and voice assistants in your home!

## Voice without AI

The whole world is engulfed in hype about AI and adding it to all the things — [we’re not exactly quiet about the cool stuff we’re doing with AI.](/blog/2025/09/11/ai-in-home-assistant/) While powering your voice assistants with AI/LLMs makes them much more flexible and powerful, it comes at a cost: paying to use cloud-based services like OpenAI and Google, or pricey hardware and energy to run local models via systems like Ollama. We started building our voice assistant before AI was a thing, and thus it was designed without requiring it. We continue to make great progress towards delivering a solid voice experience to users who want to keep their home AI free — keeping [AI opt-in only and not required](https://newsletter.openhomefoundation.org/ai-is-optional-privacy-isnt/) are guidelines we follow.

[Assist](/voice_control/), our built-in voice assistant, can do a lot of cool things without the need for AI! This includes [a ton of voice commands in dozens of languages](/voice_control/builtin_sentences/) for:

* Turning lights and other devices on/off  
* Opening/closing and locking/unlocking doors, windows, shades, etc  
* Adjusting the brightness and color of lights  
* Running scripts and activating scenes  
* Controlling media players and adjusting their volume  
* Playing music on supported media players via [Music Assistant](/integrations/music_assistant/)  
* Starting/stopping/pausing multiple timers, optionally with names  
* Adding/completing items on to-do lists  
* Delaying a command for later (“turn off lights in 5 minutes”)...  
* …and more!

Want to include your own voice commands? You can quickly add [custom sentences](/voice_control/custom_sentences/) to an automation, allowing you to take any action and tailor the response.

The easiest way to get started is with [Home Assistant Voice Preview Edition](/voice-pe/), our small and easy-to-start with Voice Assistant hardware. This, combined with a [Home Assistant Cloud subscription](/cloud/), allows any Home Assistant system to quickly handle voice commands, as our privacy-focused cloud processes the speech-to-text (turning your voice into text for Home Assistant) and text-to-speech (turning Home Assistant’s response back into voice). This is all without the use of LLMs, and supports the development of Home Assistant 😎.

For users wanting to keep all voice processing local, we offer add-ons for both speech-to-text and text-to-speech:

* [Whisper](https://github.com/home-assistant/addons/blob/master/whisper/DOCS.md) is a powerful speech-to-text system that comes in [different sizes with varying hardware requirements](https://github.com/openai/whisper#available-models-and-languages)  
* [Speech-to-Phrase](/blog/2025/02/13/voice-chapter-9-speech-to-phrase/) is our speech-to-text system that trades flexibility for speed  
* [Piper](https://github.com/home-assistant/addons/blob/master/piper/DOCS.md) is our fast neural text-to-speech system with [broad language support](https://rhasspy.github.io/piper-samples/)

All of this together shows just how much can be done without needing to include AI, even though it can do [some pretty amazing things](https://youtu.be/mLtFUG4YG1A). And we’re continuing to close the gap with the features highlighted in this blog post, including multilingual assistants, improved sentence matching, and the ability to ask questions from automations.

### More intents

Intents are what connect a voice command to the right actions in Home Assistant to get something done. While the end result is often simple, such as turning on a light, intents are designed as a “do what I mean” layer above the level of basic actions. In the previous section, we listed the sorts of voice commands that intents enable, from turning on lights to adding items to your to-do list. Over the last three years, we’ve been progressively adding new and more complex intents.

Recently, we’ve added three new intents to make Assist even better. To control media players, you can now set the **relative** volume with voice commands like “turn up the volume” or “decrease TV volume by 25%”. This adds to the existing volume intent, which allows you to set the absolute volume level like “set TV volume to 50%”.

Next, it’s now possible to set the speed of a fan by percentage. For example, “set desk fan speed to 50%” or even “set fans to 50%” to target all fans in the current area. Make sure you [expose](/voice_control/voice_remote_expose_devices/) the fans you want Assist to be able to control.

Lastly, you can now tell the kids to “get off your lawn” because your robot is going to mow it! Making use of the [lawn_mower](/integrations/lawn_mower) integration, your voice assistant can now understand commands like “mow the lawn” and “stop the mower”. Paired with the existing smart vacuum commands, you may never need to lift a finger again to keep things clean and tidy.

### Ask question

*Picture this:* you come home from work and, as you enter the living room, your voice assistant asks what type of music you’d like to hear while preparing dinner. As the music starts to play, it mentions you left the garage door open and wants to know if you’d like it closed. After dinner, as you’re hanging out on the couch, your voice assistant informs you that the temperature outside is lower than your AC setting and asks for confirmation to turn it off and open the windows.

*Surely you’d need a powerful LLM to perform such wizardry, right?* With the [Ask Question action](/integrations/assist_satellite/#action-assist_satelliteask_question), this can all be done locally using Assist and a few automations!

<div class="contain">
    <img src="/images/blog/2025-10-voice-chapter-11/automation.webp" alt="Ask Question LLM in action" style="width:100%;max-width:unset;">
</div>

Within an automation, the [Ask Question](/blog/2025/07/02/release-20257/#let-assist-ask-the-questions) action allows you to announce a message on a voice satellite, match the response against a list of possible answers, and take an action depending on the user’s answer. While answers can be open-ended, such as a musical artist or genre, limiting the possible answers allows you to use the fully local [Speech-to-Phrase](/blog/2025/02/13/voice-chapter-9-speech-to-phrase/) for recognizing speech without an internet connection.

## Improved sentence matching

Assist was designed to run fast and fully offline on hardware like the Raspberry Pi 4 for many different languages. It works by matching the text of your voice commands against sentence templates, such as “turn on the {name}” or “turn off lights in the {area}”. While this is very fast and straightforward to [translate to many languages](https://github.com/home-assistant/intents/), it can also be inflexible, resulting in the dreaded “Sorry, I couldn’t understand that” or other errors.

<div class="contain">
    <img src="/images/blog/2025-10-voice-chapter-11/sentence-matching.webp" alt="Conversation with sentence matching" style="width:100%;max-width:420px;">
</div>

Starting in [Home Assistant 2025.9](/blog/2025/09/03/release-20259/), we’ve included an improved “fuzzy matcher” that is much better at handling extra words or alternative phrasings of our supported voice commands.

<div class="contain">
    <img src="/images/blog/2025-10-voice-chapter-11/fuzzy-matching.webp" alt="Conversation with fuzzy matcher" style="width:100%;max-width:420px;">
</div>

The fuzzy matcher is pre-trained on the existing sentence templates, so we will be able to use it for all of our supported languages. However, this is initially only available for the English language and we’re working to determine the best way to enable this for other languages.

## Non-verbal confirmations

After a voice command, Assist responds with a short confirmation like “Turned on the lights” or “Brightness set”. This lets you know it understood your command and took the appropriate actions. However, if you’re in the same room as the voice assistant, this confirmation is redundant; you can see or hear that appropriate actions were taken.

Starting with [Home Assistant 2025.10](/blog/2025/10/01/release-202510/), Assist will detect if the voice command’s actions all took place within the same area as the satellite device. If so, a short confirmation “beep” will be played instead of the full verbal response. Besides being less verbose, this also serves as a reminder that your voice command only affected the current area.

Non-verbal confirmations will not be used in voice assistant pipelines with LLMs, since the user may have specific instructions in their prompt, such as “respond like a pirate”, and we wouldn’t want to deprive you of a fun response, me mateys 🏴‍☠️.

## Text-to-speech streaming

Large language models (LLMs) can be especially verbose in their responses, and we quickly realized that this exposed a weakness in Home Assistant’s text-to-speech (TTS)  implementation. For most of its life, TTS in Home Assistant has required the full response to be generated before any audio can be played. This meant a lot of waiting for multi-paragraph LLM responses, especially with local TTS systems like Piper.

Fixing this required an overhaul of the TTS architecture to allow for **streaming**. Instead of waiting for the entire audio message to be synthesized before playing, we enabled TTS services within Home Assistant to work with chunks of text (input) and audio (output). As chunks of text are streamed in from an LLM, the TTS service can synthesize audio chunks and send them out to be played immediately.

To demonstrate the benefit of streaming, we asked an LLM to “[tell me a long story about a frog](/blog/2025/09/11/ai-in-home-assistant/#:~:text=Prompt%3A%20%E2%80%9CTell%20me%20a%20long%20story%20about%20a%20frog%E2%80%9D)” and timed how long it took to start speaking the (multi-paragraph) response. Without streaming, both Home Assistant Cloud and Piper took more than five seconds to respond! This is long enough to make you wonder if your voice assistant heard you 😄 With streaming enabled, both TTS services took about half a second to start talking back. A 10x improvement in latency!

## New Piper voices

Piper, our homegrown text-to-speech tool, continues to grow with support for several new languages! These new voices were trained from publicly available voice datasets, and are available now in the [Piper add-on](https://my.home-assistant.io/redirect/supervisor_addon/?addon=core_piper):

* Daniela (Argentinian Spanish)  
* Pratham, Priyamvada, Rohan (Hindi)  
* News TTS (Indonesian)  
* Maya, Padmavathi, Venkatesh (Telugu)

Want to know what the new voices sound like? You can [listen to samples](https://rhasspy.github.io/piper-samples/) of every available Piper voice or even [run Piper entirely within your web browser](https://rhasspy.github.io/piper-samples/demo.html) for free.

If your language is missing from Piper, or you don’t like the existing voices for your language, we’re always looking for volunteers to contribute their voices! Please contact us at [voice@openhomefoundation.org](mailto:voice@openhomefoundation.org)

## Conclusion

In the past three years, we’ve made great strides with Home Assistant Voice on both the hardware and software fronts. Users today have a wide variety of choices when it comes to voice: from fully local to using the latest and greatest AI to power their smart homes. The great thing about our experimentation with AI is that there are no investors looking for returns, fake money, or “rug-pulls”. We do everything for you, our community. We’re in this for the long haul, and want this all to be your choice, keeping you in full control of whether you want to use this technology or avoid the hype completely.

Much of the advanced work done on voice is only possible with the support of our community, especially those who subscribe to [Home Assistant Cloud](/cloud/) or anyone who has purchased our [Home Assistant Voice Preview Edition](/voice-pe/) (both great ways to get started with voice).
