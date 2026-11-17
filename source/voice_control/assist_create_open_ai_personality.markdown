---
title: "Create a personality with AI"
related:
  - docs: /voice_control/voice_remote_cloud_assistant/
    title: Cloud Assistant pipeline
  - docs: /voice_control/voice_remote_local_assistant/
    title: Local Assistant pipeline
  - url: https://www.nabucasa.com
    title: Home Assistant Cloud
  - docs: /integrations/google_generative_ai_conversation/
    title: Google Generative AI integration
  - docs: /integrations/openai_conversation/
    title: OpenAI Conversation integration
  - docs: /voice_control/voice_remote_expose_devices/
    title: Exposing entities to Assist
    
---

You can give your voice assistant personality by using an AI conversation agent.

## What can I do in Assist with AI?

With a {% term "conversation agent" %} that uses AI, your {% term assistant %} can do the following:

- Answer in the style of a character that you describe in the **Instructions** of the conversation agent. For example, Super Mario.
- Understand requests that you word freely, not only the built-in sentences.
- Control the {% term entities %} that you expose to Assist, run your exposed {% term scripts %}, and answer questions about them. For example, it can turn on the lights or tell you the temperature in the living room. For this, the conversation agent needs the **Device control** set of {% term "AI tools" %}. A new conversation agent has it selected by default. In Ollama, you select it yourself. The Ollama model must also support tools. For details, refer to the [Ollama integration](/integrations/ollama/#controlling-home-assistant).

For the best results, follow the [best practices](/voice_control/best_practices/). For example, give your areas and entities names that are easy to say.

Watch this 1-minute clip showing how Assist is using AI to control a smart home.

<lite-youtube videoid="KXoIpwKsekY" videotitle="Demo of using Assist with an AI to control your smart home!"></lite-youtube>

## What AI integrations are available?

Many AI integrations add conversation agents that use AI. Some of them use a service in the cloud. For example, [OpenAI](/integrations/openai_conversation/), [Anthropic](/integrations/anthropic/), and [Google Gemini](/integrations/google_generative_ai_conversation/). Others run a model on your own hardware. For example, [Ollama](/integrations/ollama/). For the full list of AI integrations, refer to [AI integrations](/integrations/category/ai_voice/ai_models/).

AI models change often. To compare how well different models work with Home Assistant, refer to the [Home Assistant datasets reports](https://github.com/allenporter/home-assistant-datasets/tree/main/reports). For example, they show how well each model controls devices and answers questions.

## Prerequisites

- Home Assistant and Assist is configured following our [best practices](/voice_control/best_practices).
- An account in the conversational agent of the LLM provider of your choice. If you want to test the process, you can create a free account on Open AI.
- In case of a local LLM solution, you need to have the model installed.

### Creating a voice assistant personality with an LLM-based conversation agent

1. Go to {% my integrations title="**Settings** > **Devices & services**" %} **Add Integration**, find your LLM provider and set it up with your API key. 
   - In case of a provider of local agents like Ollama, you need to configure the local URL where the agent is installed. Follow the specific [integration recommendations](/integrations/ollama) in this case. 
2. Go to **Settings > Voice Assistants > Add Assistant**. Give it a name and pick a conversation agent from your AI's option. In this example we are using Antropic and the agent picked is Claude.

    ![Add Claude agent to Assist](/images/assist/add-claude-to-assist.png)

3. Be mindful of your Text-to-speech and Speech-to-text configurations. These are not handled by the AI and should stay as you want them configured for Assist.
4. Configure the agent (gear icon next to the agent's name).
  
   - In the **Prompt template** field, enter a text that will prompt the AI to become the character. For example::
       `You are Super Mario from Mario Bros. Be funny.`
   - Under **AI tools**, select **Device control** to let the agent control your devices. For example, it could turn on the lights. Leave it empty if you only want to talk to the agent.
     - **Device control** can only control {% term entities %} that are [exposed](/voice_control/voice_remote_expose_devices/) to Assist.
             ![Agent with recommended model settings](/images/assist/agent-recommended-model-settings.png)

   - Once your Assist agent has been created, you can go to **Voice assistants** and the three dots menu of your personality, and define if you want Home Assistant's model to be the priority response, and therefore Assist would prefer to handling commands locally .
             ![Fallback toggle](/images/assist/fallback-assist-toggle.png)

      - If you keep this option selected, if the intent can be answered by Home Assistant it will. It will not have the personality, but the response will be fast and efficient (since it doesn't require to go through the LLM). This is recommended in cases where you can accept not having the AI character reply sometimes and would rather your lights are turned on faster.
      - If you deselect the option, all the intents will go through the agent. This is recommended when efficiency is not an issue and you need the agent never to break character (for example if your Assist personality is Santa Claus).
5. You can uncheck Recommended model settings, hit Submit and it will unblock extra customization. In the specific example of OpenAI, [here](/integrations/openai_conversation/#model) a brief summary of the other settings.
6. You can test the agent directly from the Voice assistants panel, selecting Start a conversation from the agent's menu. It will control your Home Assistant and reply exactly as it will do with any voice hardware.

7. In case you need troubleshooting with your LLM provider, check any specifics from your AI in our [integrations documentation](/integrations)

## Tutorial: Setting up Assist with OpenAI

Step-by-step tutorial with some background information, from the Home Assistant Release Party 2024.6 live stream.

<lite-youtube videoid="xMFC8yaVtpI" videoStartAt="176" videotitle="Home Assistant Release Party 2024.6"></lite-youtube>

## Using the AI voice assistant on your devices

To learn how to use the AI assistant with your devices, refer to one of the following tutorials, depending on the hardware you want to use to interact with it:

- [ESP32-S3-BOX voice assistant](/voice_control/s3_box_voice_assistant/)
- [$13 voice assistant using ATOM Echo](/voice_control/thirteen-usd-voice-remote/)
- [Assist on Android](/voice_control/android/)
- [Assist on Apple](/voice_control/apple/)

## Demos

Check this interview with an AI Mario personality

<lite-youtube videoid="eLx8_NAqptk" videotitle="Give your voice assistant personality using the OpenAI integration"></lite-youtube>
