---
title: "Create a personality with AI"
related:
  - docs: /voice_control/voice_remote_cloud_assistant/
    title: Cloud assistant pipeline
  - docs: /voice_control/voice_remote_local_assistant/
    title: Local assistant pipeline
  - url: https://www.nabucasa.com
    title: Home Assistant Cloud
  - docs: /integrations/google_generative_ai_conversation/
    title: Google Generative AI integration
  - docs: /integrations/openai_conversation/
    title: OpenAI Conversation integration
  - docs: /voice_control/voice_remote_expose_devices/
    title: Exposing entities to Assist
    
---

You can give your voice assistant personality by using an AI conversation agent. Currently, this works with the **OpenAI Conversation** or the **Google Generative AI** integration.

For this tutorial, we will work with OpenAI. This requires an OpenAI account. For what we do here, the free trial option is sufficient.

## Demos

### Interview with an AI Mario personality

<lite-youtube videoid="eLx8_NAqptk" videotitle="Give your voice assistant personality using the OpenAI integration"></lite-youtube>

### Using Assist with AI to control your smart home

An 1-minute clip showing how Assist is using AI to control a smart home.

<lite-youtube videoid="KXoIpwKsekY" videotitle="Demo of using Assist with an AI to control your smart home!"></lite-youtube>

## Prerequisites

This tutorial assumes you have a few things set up already:

- [Home Assistant Cloud](https://www.nabucasa.com) or a manually configured [Assist Pipeline](/integrations/assist_pipeline)

### Creating an OpenAI voice assistant personality

Using OpenAI requires an OpenAI account. For this tutorial, the free trial option is sufficient. No need to leave your credit card information.

1. [Set up an OpenAI account and install the OpenAI conversation](/integrations/openai_conversation/) integration.
2. Create a Mario personality.
   - Once you installed the **OpenAI Conversation** integration, go to {% my integrations title="**Settings** > **Devices & Services**" %}. In the **OpenAI Conversation integration**, select **Configure**.
  
      ![Configure the OpenAI integration](/images/assist/assistant-openai-mario-config.png)
   - In the **Prompt template** field, enter the following text:
  
       `You are Super Mario from Mario Bros. Be funny.`

   - Define if the OpenAI voice assistant is allowed to control the devices in your home.
     - **No control**: you can talk to Mario, but it cannot control devices.
     - **Assist**: you can talk to it and it can control devices. For example, it could turn on the lights.
       - Assist can only control {% term entities %} that are [exposed](/voice_control/voice_remote_expose_devices/) to it.
   - Define the **Model**:
     - If you have a paid OpenAI subscription that supports GPT4.0, you can select **Submit**.
     - If you use the free trial version, deselect the **Recommended model settings** checkbox and select **Submit**.
     - Then, under **Model**, enter `gpt-3.5-turbo` and select **Submit**.
  
      ![Add prompt for Mario personality](/images/assist/assistant-openai-mario-09.png)
  
3. Give your personality a name:
   - Select **Rename** and change the name to `OpenAI Mario`.
  
      ![Give your Mario personality a name](/images/assist/mario_rename.png)
4. Create a Mario assistant:
   - Under {% my voice_assistants title="**Settings** > **Voice assistants**" %}, select **Add assistant**.
   - Give it a name, select a language, and under **Conversation agent**, select the Mario OpenAI Conversation integration.
   ![Add a new assistant](/images/assist/assistant-openai-mario-04.png)
   - Leave the other settings unchanged and select **Create**.
5. You can repeat this with other OpenAI personalities. You can add as many OpenAI Conversation integrations as you would like.
   - To add a new personality, you need to create a new API key. Then, add a new OpenAI Conversation integration with that API key.

## Tutorial: Setting up Assist with OpenAI

Step-by-step tutorial with some background information, from the Home Assistant Release Party 2024.6 live stream.

<lite-youtube videoid="xMFC8yaVtpI" videoStartAt="176" videotitle="Home Assistant Release Party 2024.6"></lite-youtube>

## Using the AI voice assistant on your devices

To learn how to use the AI assistant with your devices, refer to one of the following tutorials, depending on the hardware you want to use to interact with it:

- [ESP32-S3-BOX voice assistant](/voice_control/s3_box_voice_assistant/)
- [$13 voice assistant using ATOM Echo](/voice_control/thirteen-usd-voice-remote/)
- [Assist on Android](/voice_control/android/)
- [Assist on Apple](/voice_control/apple/)
