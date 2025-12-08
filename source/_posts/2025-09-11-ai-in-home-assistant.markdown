---
layout: post
title: "Building the AI-powered local smart home"
description: "In the past year, we’ve made significant progress in making AI a powerful tool in the home"
date: 2025-09-11 00:00:01
date_formatted: "September 11, 2025"
author: Paulus Schoutsen
comments: true
categories: Assist AI
og_image: /images/blog/2025-09-ai/art.webp
---

<img src='/images/blog/2025-09-ai/art.webp' style='border: 0;box-shadow: none;' alt="Building the AI-powered local smart home">

Last year, we laid out [our vision for AI in the smart home](/blog/2024/06/07/ai-agents-for-the-smart-home/), which opened up experimentation with AI in Home Assistant. In that update, we made it easier to integrate all sorts of local and cloud AI tools, and provided ways to use them to control and automate your home. A year has passed, a lot has happened in the AI space, and our community has made sure that Home Assistant has stayed at the frontier.

We beat big tech to the punch; we were the first to make AI useful in the home. We did it by giving our community complete control over how and when they use AI, making AI a powerful _tool_ to use in the home. As opposed to something that takes over your home. Our community is taking advantage of AI’s unique abilities (for instance, its image recognition or summarizing skills), while having the ability to exclude it from mission-critical things they’d prefer it not to handle. Best of all, this can all be run locally, without any data leaving your home!

Moreover, if users don’t want AI in their homes, that’s their choice, and they can choose not to enable any of these features. I hope to see big tech take an approach this measured, but judging by their last couple of keynotes, I’m not holding my breath.

Over the past year, we’ve added many new AI features and made them easy to use directly through Home Assistant’s user interface. We have kept up with all the developments in AI land and are using the latest standard to integrate more models and tools than ever before. We’re also continuing to benchmark local and cloud models to give users an idea of what works best. Keep reading to check out everything new, and maybe you can teach your smart home some cool new tricks.

<p class="img">
    <lite-youtube videoid="iZ-JdpxEx3o" videotitle="Multiple commands with Ollama"></lite-youtube>
    Local AI is making the home very natural to control
</p>

Big thanks to our AI community contributor team:<br>
[@AllenPorter](https://github.com/allenporter), [@shulyaka](https://github.com/shulyaka), [@tronikos](https://github.com/tronikos), [@IvanLH](https://github.com/IvanLH), [@Joostlek](https://github.com/Joostlek)!

<!--more-->

## Supercharging voice control with AI

We were doing voice assistants before AI was cool. In 2023, we kicked off our [Year of the Voice](/blog/2022/12/20/year-of-voice/). Since then, we’ve worked towards our goal of building all the parts needed for a local, open, and private voice assistant. When AI became the rage, we were quick to integrate it.

Today, users can chat with any large language model (LLM) that is integrated into Home Assistant, whether that’s in the cloud or run locally via a service like [Ollama](/integrations/ollama/). Where [Assist](/voice_control/), our home-grown (non-AI) voice assistant agent, is focused on a predetermined list of mostly home control commands, AI allows you to ask more open-ended questions. Summarize what’s happening across the smart home sensors you’ve [exposed to Assist](/voice_control/voice_remote_expose_devices/), or get answers to trivia questions. You can even [give your LLM a personality](/voice_control/assist_create_open_ai_personality/)!

Users can also leverage the power of AI to speak the way _they speak_, as LLMs are much better at understanding the intent behind the words. By default, Assist will handle commands first. Only questions or commands it can’t understand will be sent to the AI you’ve set up. For instance, _“Turn on the kitchen light”_ can be handled by Assist, while _“It's dark in the kitchen, can you help?”_ could be processed by an AI. This speeds up response times for simple commands and makes for a more sustainable voice assistant.

Another powerful addition from the past year is context sharing between agents. So your Assist agent can share the most recent commands with your chosen AI agent. This shared context lets you say something like _“Add milk to my shopping list,”_ which Assist will act on, and to add more items, just say _“Add rice.”_ The AI agent understands that these commands are connected and can act accordingly.

<p class="img">
    <lite-youtube videoid="mLtFUG4YG1A" videotitle="Current state of conversational AI - September 2025"></lite-youtube>
    Here is an excellent walkthrough video of JLo's AI-powered home, showing many of these new features in action
</p>

Another helpful addition keeps the conversation going; if the LLM asks you a question, your Assist hardware will listen for your reply. If you say something like “It’s dark”, it might ask whether you’d like to turn on some lights, and you could tell it to proceed. We have taken this even further than other voice assistants, as you can now have Home Assistant initiate conversations. For example, you could set up an automation that detects when the garage door is open and asks if you’d like to close it (though this can also be done without AI with a very clever [Blueprint](https://my.home-assistant.io/redirect/blueprint_import?blueprint_url=https%3A%2F%2Fwww.home-assistant.io%2Fblueprints%2Fblog%2F2025-07%2Fask_yes_no_question.yaml)).

AI pushed us to completely revamp our Text-to-Speech (TTS) system to take advantage of streaming responses from LLMs. While local AI models can be slow, we use a simple trick to make the delay almost unnoticeable. Now, both [Piper](https://github.com/OHF-Voice/piper1-gpl) (our local TTS) and [Home Assistant Cloud](/cloud/) TTS can begin generating audio as soon as the LLM produces the first few words, improving the speed of the spoken response by a factor of ten.

**Prompt: "Tell me a long story about a frog"**

| **Setup**            | **Time to start speaking** |
| -------------------- | -------------------------- |
| Cloud, non-streaming | 6.62 sec                   |
| Cloud, streaming     | 0.51 sec (13x faster)      |
| Piper, non-streaming | 5.31 sec                   |
| Piper, streaming     | 0.56 sec (9.5x faster)     |

*Ollama gemma3:4b on an RTX 3090, and Piper on an i5*

## Great hardware to work with AI

People built some really cool voice hardware, from landline telephones to little talking robots, but the fact that it was so DIY was always a barrier to entry. To make our voice assistant available to everyone, we released the [Home Assistant Voice Preview Edition](/blog/2024/12/19/voice-preview-edition-the-era-of-open-voice/). This is an easy and affordable way to try Home Assistant Voice. It has some seriously powerful audio processing hardware inside its sleek package. If you were on the fence about trying out voice, it really is [the best way to get started](/voice-pe/).

<p class="img">
    <img src="/images/blog/2025-09-ai/voice-pe.webp" style='border: 0;box-shadow: none;' alt="Home Assistant Voice Preview Edition">
    Voice Preview Edition is not only open and powerful, but it looks and feels great too!
</p>

It’s now easier than ever to set up your Assist hardware to work with LLMs with our [Voice Assistants](https://my.home-assistant.io/redirect/voice_assistants/) settings page, and you can even assign a different LLM to each device. The LLM can recognize the room it’s in and the devices within it, making its responses more relevant. Assist was built to be a great way to control devices in your home, but with AI, it becomes so much more.

## AI-powered suggestions

[Last month](/blog/2025/08/06/release-20258/), Home Assistant launched a new opt-in feature to leverage the power of AI when automating with Home Assistant. The goal is to shorten the journey from a blank slate to your finished idea.

When saving an automation or script, users can now leverage the new Suggest button: <img src="/images/blog/2025-09-ai/suggest.webp" style='border: 0;box-shadow: none;'> When clicked, it will send your automation configuration along with the titles of your existing automations and labels to AI to suggest a name, description, category, and labels for your new automation. Over the coming months, we’re going to explore what other features can benefit from AI suggestions.

<div class="contain nb">
    <img src="/images/blog/2025-09-ai/suggest-button.webp" alt="A rename modal open with the new Suggest button top right">
</div>

To opt-in to this feature, you need to take two steps. First, you need to configure an integration that provides an [_AI Tasks_ entity](/integrations/?cat=ai). For local AI, you can configure Ollama, or you can also leverage cloud-based AI like Google, OpenAI, or Anthropic. Once configured, you need to go to the new [AI Task preferences pane](https://my.home-assistant.io/redirect/config_ai_task/) under **_System -> General_** and pick the AI Task entity to power suggestions in the UI. If you don't configure an AI Tasks entity, the Suggest button will not be visible.

<div class="contain nb">
    <img src="/images/blog/2025-09-ai/ai-suggestions.webp" alt="The AI Suggestions setting within Home Assistant">
</div>

## AI Tasks gets the job done

Enabling [AI Tasks](/integrations/ai_task/) does more than quickly label and summarize your automations; its true superpower is making AI easy to use in templates, scripts, and automations. AI Tasks allow other code to leverage AI to generate data, including options to attach files and define how you want that data output (for instance, a JSON schema).

We have all seen those incredible community creations, where a user leverages AI image recognition and analysis to [detect available parking spots](https://www.reddit.com/r/homeassistant/comments/1lytyv9/parking_spot_detection/) or [count the number of chickens in the chicken coop](https://houndhillhomestead.com/google-gemini-powered-goose-coop-door/). It’s likely that AI Tasks can now help you easily do this in Home Assistant, without the need for complex scripts, extra add-ons, or HACS integrations.

Below is a template entity that counts chickens in a video feed, all via a short and simple set of instructions.

{% raw %}

```yaml
template:
 - triggers:
     - trigger: homeassistant
       event: start
     - trigger: time_pattern
       minutes: "/5"
   actions:
     - action: ai_task.generate_data
       data:
         task_name: Count chickens
         instructions: >-
           This is the inside of my coop. How many birds (chickens, geese, and
           ducks) are inside the coop?
         structure:
           birds:
             selector:
               number:
         attachments:
           media_content_id: media-source://camera/camera.chicken_coop
           media_content_type: image/jpeg
       response_variable: result
   sensor:
     - name: "Chickens"
       state: "{{ result.data.birds }}"
       state_class: total
```

{% endraw %}

This template sends a snapshot of the camera to the AI, asking it to analyze what is going on. It defines that the output should always be a number, since we want to use that information in Home Assistant. All of this is embedded in a template entity that automatically updates every 5 minutes. An AI Task could also be embedded in an automation, a script, or any other place that can execute actions.

<div class="contain">
    <img src="/images/blog/2025-09-ai/activity.webp" alt="Activity view in Home Assistant of the doorbell image analyzed by AI Tasks">
    An automation triggers an AI Task to identify what caused motion on a camera.
</div>

Lastly, users can set a default AI Task entity. This allows users to skip picking an entity ID when creating AI automations. It also lets you migrate everything that uses AI Tasks to the latest model with a single click. This also makes it easy to share blueprints that leverage AI Tasks, like this blueprint that analyzes a camera snapshot when motion is detected:

{% my blueprint_import badge blueprint_url="https://community.home-assistant.io/t/ai-camera-analysis/911634" %}

## MCP opens a whole new world

[Model Context Protocol](/integrations/mcp/) (MCP) is a thin layer allowing LLMs to integrate _anything_. When the specification was announced, we quickly jumped on it and integrated it into Home Assistant. Effectively, these servers give Home Assistant’s Assist conversation agent access to all sorts of new tools. You could connect MCP servers that give Assist access to the latest news stories, your to-do lists, or a server that catalogues your vinyl collection, allowing you to have richer conversations (_“Okay Nabu, which Replacements albums do I have, and which aren’t on my Vinyl-to-Purchase list?”_).

On the flip side, you can also [turn Home Assistant into an MCP server](/integrations/mcp_server/), allowing an AI system to access information about your home. For instance, you could create a local AI that's great at making Home Assistant automations, and it could include all your entity names or available actions. MCP keeps gaining more support, and there are some great cloud and self-hosted solutions available.

## How to pick a model

There are a lot of models available, it's hard to know where to start. Luckily, Home Assistant’s resident AI guru [@AllenPorter](https://github.com/allenporter) is here to help. He has put together an incredibly useful [Home LLM Leaderboard](https://github.com/allenporter/home-assistant-datasets/tree/main/reports). This dataset includes his extensive tests of cloud and local LLM options, and even has tests that give small local LLMs a fighting chance (see [assist-mini](https://github.com/allenporter/home-assistant-datasets/tree/main/reports#assist-mini)).

Currently, the charts show the big cloud players' most recent models ranking pretty close to each other, while recent local models that use 8GB or more of VRAM are nearly keeping up. In the past, there was a big disparity between most models, but now it's hard to go wrong.

This is especially helpful as the options for LLMs in Home Assistant have just grown exponentially with the addition of [OpenRouter](/integrations/open_router), a unified interface for LLMs. With OpenRouter, users can access over 400 new models in Home Assistant, and it supports AI Tasks right from day one. We really are spoiled for choice.

## The future is Open, and Open Source

Home Assistant is open. We believe that you should be in control of your data, and your smart home. All of it. Local LLMs and the way we have architected Home Assistant extends this choice to the AI space, all while maintaining your privacy.

Most crucially, we’ve made all of this open source. We are community-driven and work on this together with our community. The Open Home Foundation has no investors and is not beholden to anyone but our users. Our work is funded through hardware purchases and [Home Assistant Cloud](/cloud/) subscriptions, allowing us to make all the technology we build free and open.
