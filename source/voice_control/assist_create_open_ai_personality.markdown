---
title: "Create a personality with OpenAI"
---

You can give your voice assistant personality by using OpenAI. This requires an OpenAI account. For what we do in this tutorial, the free trial option is sufficient. No need to leave your credit card information.

<lite-youtube videoid="eLx8_NAqptk" videotitle="Give your voice assistant personality using the OpenAI integration"></lite-youtube>

## Prerequisites

This tutorial assumes you have a few things set up already:

- [Home Assistant Cloud](https://www.nabucasa.com) or a manually configured [Assist Pipeline](/integrations/assist_pipeline)

### Creating an OpenAI voice assistant personality

Using OpenAI requires an OpenAI account. For this tutorial, the free trial option is sufficient. No need to leave your credit card information.

1. [Set up an OpenAI account and install the OpenAI conversation](/integrations/openai_conversation/) integration.
2. Create a Mario personality.
   - Once you installed the OpenAI Conversation integration, go to {% my integrations title="**Settings** > **Devices & Services**" %}. In the OpenAI Conversation integration, select **Configure**.
  
      ![Configure the OpenAI integration](/images/assist/assistant-openai-mario-config.png)
   - In the **Prompt template** field, enter the following text: 
  
       `You are Super Mario from Mario Bros. Be funny.` and select **Submit**.
  
      ![Add prompt for Mario personality](/images/assist/assistant-openai-mario-02.png)

   - Give your personality a name. Select the three-dots menu, select **Rename** and change the name to `OpenAI Mario`.
  
3. Create a Mario assistant:
   - Under {% my voice_assistants title="**Settings** > **Voice assistants**" %}, select **Add assistant**.
   - Give it a name, select a language, and under **Conversation agent**, select the Mario OpenAI Conversation integration.
   ![Add a new assistant](/images/assist/assistant-openai-mario-04.png)
   - Leave the other settings unchanged and select **Create**.
4. You can repeat this with other OpenAI personalities. You can add as many OpenAI Conversation integrations as you would like.
   - To add a new personality, you need to create a new API key. Then, add a new OpenAI Conversation integration with that API key.

## Related topics

- [Home Assistant Cloud](https://www.nabucasa.com)
- [Cloud assistant pipeline](/voice_control/voice_remote_cloud_assistant/)
- [Local assistant pipeline](/voice_control/voice_remote_local_assistant/)
