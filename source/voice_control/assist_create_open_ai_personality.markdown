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

## What can I do in Assist with AI exactly?

- Pick the LLM provider of your choice, either local or cloud, as long as it has a conversational agent.
- Select a personality based on a prompt.
- Get replies with the character's personality you defined.
- Perform Home Assistant intents (turn on-off lights, etc), as long as Assist is correctly configured as per our [best practices](/voice_control/best_practices).

Check this 1-minute clip showing how Assist is using AI to control a smart home.

<lite-youtube videoid="KXoIpwKsekY" videotitle="Demo of using Assist with an AI to control your smart home!"></lite-youtube>

## What LLM providers are available?

LLM-based agents are evolving constantly, and Home Assistant supports most of them. If you'd like to get a deeper knowledge on how to pick the best choice for your setup, [here](https://github.com/allenporter/home-assistant-datasets/tree/main/reports) is a comparison study you can check.

There are cloud agents provided by [Open AI](/integrations/openai_conversation/) or [Anthropic](/integrations/anthropic/) and local ones provided by [Ollama](/integrations/ollama), and both cases are supported by Home Assistant.

## Prerequisites

- Home Assistant and Assist is configured following our [best practices](/voice_control/best_practices).
- An account in the conversational agent of the LLM provider of your choice. If you want to test the process, you can create a free account on Open AI.
- In case of a local LLM solution, you need to have the model installed.

### Creating a voice assistant personality with an LLM-based conversation agent

1. Go to {% my integrations title="**Settings** > **Devices & Services**" %} **Add Integration**, find your LLM provider and set it up with your API key. 
   - In case of a provider of local agents like Ollama, you need to configure the local URL where the agent is installed. Follow the specific [integration recommendations](/integrations/ollama) in this case.
 
2. Go to **Settings > Voice Assistants > Add Assistant**. Give it a name and pick a conversation agent from your AI's option. In this example we are using Antropic and the agent picked is Claude.

    ![Add Claude agent to Assist](/images/assist/add-claude-to-assist.png)

3. Be mindful of your Text-to-speech and Speech-to-text configurations. These are not handled by the IA and should stay as you want them configured for Assist.
   
4. Configure the agent (gear icon next to the agent's name).
  
   - In the **Prompt template** field, enter a text that will prompt the AI to become the character. For example::
       `You are Super Mario from Mario Bros. Be funny.`
   - Define if the voice assistant is allowed to control the devices in your home.
     - **No control**: you can talk to the agent, but it cannot control devices.
     - **Assist**: you can talk to the agent and it can control devices. For example, it could turn on the lights.
       - Assist can only control {% term entities %} that are [exposed](/voice_control/voice_remote_expose_devices/) to it.
             ![Agent with recommended model settings](/images/assist/agent-recommended-model-settings.png)

   - Once your Assist agent has been created, you can go to **Voice assistants** and the three dots menu of your personality, and define if you want Home Assistant's model to be the priority response, and therefore Assist would prefer to handling commands locally .
             ![Fallback toggle](/images/assist/fallback-assist-toggle.png)

      - If you keep this option selected, if the intent can be answered by Home Assistant it will. It will not have the personality, but the response will be fast and efficient (since it doesn't require to go through the LLM). This is recommended in cases where you can accept not having the IA character reply sometimes and would rather your lights are turned on faster.
      - If you deselect the option, all the intents will go through the agent. This is recommended when efficiency is not an issue and you need the agent never to break character (for example if your Assist personality is Santa Claus).


5. You can uncheck Recommended model settings, hit Submit and it will unblock extra customization. In the specific example of OpenAI, [here](/integrations/openai_conversation/#model) a brief summary of the other settings.
6. You can test the agent directly from the Voice assistants panel, selecting Start a conversation from the agent's menu. It will control your Home Assistant and reply exactly as it will do with any voice hardware.

7. In case you need troubleshooting with your LLM provider, check any specifics from your IA in our [integrations documentation](/integrations)

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
