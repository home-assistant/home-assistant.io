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

## Creating an assistant with an AI personality

Use this procedure to create an {% term assistant %} that answers as a character. For example, Super Mario. You set up a {% term "conversation agent" %} that uses AI, describe the character in its instructions, and create an assistant that uses this conversation agent.

Prerequisites:

- An administrator account in Home Assistant.
- An [AI integration](/integrations/category/ai_voice/ai_models/) that is set up, with a conversation agent. For example, [Google Gemini](/integrations/google_generative_ai_conversation/). It has a free-of-charge plan. For the steps, refer to the documentation of your AI integration.
  - Most AI integrations add a conversation agent when you set them up. For example, OpenAI adds **OpenAI Conversation**.
  - For a model that runs on your own hardware, set up [Ollama](/integrations/ollama/). Ollama doesn't add a conversation agent by itself. On its integration page, select **Add conversation agent**, and select a model.
  - The character settings belong to the conversation agent. Every assistant that uses this conversation agent answers as the character. If another assistant already uses it, add a separate conversation agent for the character: on the page of your AI integration, select **Add conversation agent**.
- To let the character control your devices: {% term entities %} that are exposed to {% term Assist %}. For the steps, refer to [Exposing entities to Assist](/voice_control/voice_remote_expose_devices/).

To create an assistant with an AI personality:

1. Go to {% my voice_assistants title="**Settings** > **Voice assistants**" %}, and select **Add assistant**.
2. Under **Configuration**, enter a **Name** for the assistant, and select the **Language**.
   - For example, enter `Super Mario`.
3. Under **Conversation agent**, select the conversation agent of your AI integration.
4. Next to it, select **Agent settings** {% icon "mdi:cog" %}, and describe the character.
   - In the **Instructions** field, describe how the character should answer. For example, enter `You are Super Mario from Mario Bros. Be funny.`
   - Under **AI tools**, select **Device control** to let the character control your devices. For example, it can turn on the lights. To only talk to the character, clear all sets of {% term "AI tools" %}.
     - **Device control** can only control {% term entities %} that are [exposed](/voice_control/voice_remote_expose_devices/) to Assist.
   - To see more options, clear **Recommended model settings**. For example, for the options of OpenAI, refer to [Model](/integrations/openai_conversation/#model).
   - Select **Submit**. If the dialog shows more options, select **Submit** again.
5. Decide whether to keep **Prefer handling commands locally** turned on. It's turned on by default.

   ![Prefer handling commands locally toggle](/images/assist/fallback-assist-toggle.png)

   - If you keep it turned on, the built-in **Home Assistant** conversation agent handles each command first. If it understands the command, it carries it out and answers right away. For example, it turns on the lights. The answer is fast, but it doesn't have the personality. Commands that it doesn't understand go to your AI conversation agent. Keep it turned on if you want fast answers, and you don't mind that the character doesn't always answer.
   - If you turn it off, every command goes to your AI conversation agent. The answer takes longer, but the character always answers. For example, turn it off if your personality is Santa Claus and should never break character.
6. To talk to the character by voice, under **Speech-to-text** and **Text-to-speech**, select the engines that turn your voice into text and the answer into speech.
   - Your AI conversation agent doesn't turn speech into text or text into speech. The engines that you select here do that. For example, if you have a Home Assistant Cloud subscription, select **Home Assistant Cloud**.
   - Under **Text-to-speech**, you can select a voice that fits the character.
7. Select **Create**.
8. To test the assistant, on the **Assist** card, select the three dots {% icon "mdi:dots-vertical" %} menu of the new assistant, and then select **Start conversation**.
9. Ask the character something. For example, ask `Who are you?`
   - Result: The character answers in its own style.

If the conversation agent doesn't answer, refer to the troubleshooting section of your AI integration. For example, refer to [OpenAI troubleshooting](/integrations/openai_conversation/#troubleshooting).

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
