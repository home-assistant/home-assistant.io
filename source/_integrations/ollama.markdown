---
description: Instructions on how to integrate Ollama
ha_release: 2024.4
ha_domain: ollama
related:
  - docs: /docs/templating/
    title: Home Assistant Templating
  - docs: /voice_control/voice_remote_expose_devices/
    title: Exposing entities to voice assistants
  - docs: /triggers/conversation/
    title: Sentence trigger
---

The **Ollama** {% term integration %} lets you run AI locally, on your own hardware. [Ollama](https://ollama.com/) is a server that runs AI models on a computer in your home, instead of in a cloud service. The integration connects Home Assistant to your Ollama server and adds {% term "conversation agents" %} and AI tasks that use its models.

- A conversation agent lets you talk to the model with {% term Assist %}. With the **Device control** set of {% term "AI tools" %}, it can also give you information about your devices and control them. It can only reach the {% term entities %} that you [expose](/voice_control/voice_remote_expose_devices/) to Assist.
- An [AI task](/integrations/ai_task/) lets your automations and scripts use the model to generate data. For example, it can return the data in a structure that you define. If your model supports images, it can also describe a camera image. AI tasks only accept images as attachments.

When you talk to an Ollama conversation agent through an {% term assistant %}, Home Assistant first checks your [sentence triggers](/triggers/conversation/). If one of them matches, the sentence trigger answers, and the conversation agent doesn't get the sentence. Sentence triggers don't run when you call the conversation agent directly, for example with the `conversation.process` action. They also don't run when you answer a follow-up question from the conversation agent.

## Prerequisites

1. Install the Ollama server on a computer in your network. This computer runs the AI models. Ollama is available for macOS, Linux, and Windows. For the steps, refer to the [Ollama download instructions](https://ollama.com/download).
2. Make the Ollama server accessible over your network, so that Home Assistant can reach it. For the steps, refer to [How can I expose Ollama on my network?](https://github.com/ollama/ollama/blob/main/docs/faq.mdx#how-can-i-expose-ollama-on-my-network) in the Ollama FAQ.

{% include integrations/config_flow.md %}

{% configuration_basic %}
URL:
  description: The URL of your Ollama server, such as `http://192.168.1.10:11434`.
API key:
  description: The API key for your Ollama server. Leave it empty if your Ollama server doesn't require authentication.
{% endconfiguration_basic %}

## Configuration options

The integration adds {% term "conversation agents" %} and AI tasks as separate entries on the integration page. When you set up the integration, it doesn't add any of them yet.

- To add one, go to {% my integrations title="**Settings** > **Devices & services**" %}, select **Ollama**, and then select **Add conversation agent** or **Add AI task**.
- To change one later, select **Reconfigure conversation agent** or **Reconfigure AI task** {% icon "mdi:cog-outline" %} in its row.

If the model isn't on your Ollama server yet, Home Assistant downloads it when you save the conversation agent or AI task. The **Downloading model** screen shows that the download is in progress. Depending on the size of the model, this can take a long time.

Conversation agents and AI tasks have the following options. **Instructions** and **AI tools** are only available for conversation agents.

{% configuration_basic %}
Name:
  description: The name of the conversation agent or AI task. You set it when you add it. To change it later, select the three dots {% icon "mdi:dots-vertical" %} menu in its row, and then select **Rename**. The default is `Ollama Conversation` for a conversation agent and `Ollama AI Task` for an AI task.
Model:
  description: The [Ollama model](https://ollama.com/library) to use. The list shows the models that are already on your Ollama server first, marked **(downloaded)**, followed by other models from the Ollama library. You can also enter the name and tag of any other model. The default is `qwen3:4b-instruct`.
Instructions:
  description: Instructions for the AI on how it should respond to your requests. It is written using [Home Assistant Templating](/docs/templating/). Only available for conversation agents.
AI tools:
  description: "**Device control** only reaches the entities that you [expose](/voice_control/voice_remote_expose_devices/) to Assist. **Home Assistant** reaches everything, and it only works for administrators, not for voice satellites. For details, refer to [Sets of AI tools](/integrations/llm/#sets-of-ai-tools). Only models that support tools can use AI tools. For details, refer to [Controlling Home Assistant](#controlling-home-assistant). Only available for conversation agents."
Context window size:
  description: The number of tokens that the model can take as input. For a conversation agent with **Device control**, this includes your exposed entities. The default is 8192, and the minimum is 2048. A larger value supports homes with more exposed entities. A smaller value uses less memory on your Ollama server. Choose a value that your model supports.
Max history messages:
  description: The maximum number of messages to keep for each conversation. Older messages are dropped. The default is 20. Enter 0 to keep all messages.
Keep alive:
  description: The number of seconds that Ollama keeps the model in memory after a message. Enter -1 to keep it in memory, or 0 to unload it right away. The default is -1.
Think before responding:
  description: If turned on, the model thinks about its answer before it responds. This takes longer, but it can give better answers. Not all models support thinking. For a conversation agent, select **Show details** in the Assist dialog to see what the model thought. Turned off by default.
{% endconfiguration_basic %}

## Controlling Home Assistant

If you want to experiment with local LLMs using Home Assistant, we recommend exposing fewer than 25 entities. Note that smaller models are more likely to make mistakes than larger models.

Only models that support [Tools](https://ollama.com/search?c=tools) may control Home Assistant.

Smaller models may not [reliably maintain a conversation](https://llama.meta.com/docs/model-cards-and-prompt-formats/llama3_1/#llama-3.1-instruct) when a set of tools
is selected in **AI tools**. However, you may use multiple Ollama configurations that
share the same model, but use different prompts:

- Add the Ollama integration without selecting anything in **AI tools**. You can use
  this conversation agent to have a conversation.
- Add an additional Ollama integration, using the same model, and select a set of tools in **AI tools**.
  You can use this conversation agent to control Home Assistant.
