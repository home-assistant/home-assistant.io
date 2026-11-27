---
title: "AI in Home Assistant"
description: "Learn how to use AI in Home Assistant to control your home in your own words, add AI to your automations, and set up and fix your system."
related:
  - docs: /voice_control/
    title: Assist
  - docs: /integrations/category/ai_voice/ai_models/
    title: AI integrations
  - docs: /integrations/llm/
    title: LLM
  - docs: /integrations/ai_task/
    title: AI Task
  - docs: /integrations/mcp_server/
    title: Model Context Protocol
  - docs: /common-tasks/general/setting-up-with-ai/
    title: Setting up and organizing with AI
---

AI can help you use Home Assistant in several ways. You can talk to your home in your own words, let your automations use AI for a single job, and ask AI to help you set up, organize, and fix Home Assistant.

AI is optional. You decide if and where you use it, and which AI provider you use.

## Ways to use AI in Home Assistant

AI works in two directions in Home Assistant. With {% term "AI tools" %}, a {% term "conversation agent" %} or an {% term "AI app" %} uses Home Assistant to read and control your home. With an AI task, Home Assistant uses an AI model for a single job, such as describing a camera image.

### Voice and text control

{% term Assist %} is the voice assistant that is built into Home Assistant. You can talk or type to it in the Assist dialog of Home Assistant or of the {% term "Home Assistant Companion app" %}, or talk to it with a {% term "voice satellite" %}.

Assist works without AI. Its built-in conversation agent runs on your own hardware, and understands the built-in sentences and your own custom sentences. A conversation agent that uses AI also understands requests that you word freely, and answers questions about your home. For example, you can ask:

- "What's on my calendar today?"
- "Which windows are open?"
- "Turn off the lights in the living room in 5 minutes."

An AI conversation agent controls the entities that you [expose to Assist](/voice_control/voice_remote_expose_devices/). To get started, add an AI integration that provides a conversation agent, and choose it in your assistant. For the steps, refer to [Assist](/voice_control/).

### AI in automations and scripts

With the [AI Task](/integrations/ai_task/) integration, an {% term automation %} or a {% term script %} can send a single job to an AI model and use the result. There is no conversation, and an AI task can't control your devices. Here are some examples from the documentation:

- [Count the chickens in a coop](/integrations/ai_task/#template-sensor-count-chickens-in-the-coop) from a camera image.
- [Check a camera image for a delivery driver](/integrations/ai_task/#automation-thank-a-delivery-driver-at-the-front-door), and thank them.
- [Write a funny reminder](/integrations/ai_task/#automation-notify-when-the-garage-door-is-left-open) when the garage door is left open.

The **Suggest** button in the Home Assistant interface also uses an AI task. For example, when you save an automation, it suggests a name, a description, a category, and labels. To choose which AI task it uses, refer to [Choosing the preferred AI task entities](/integrations/ai_task/#choosing-the-preferred-ai-task-entities).

Your automations can also send text to a conversation agent. For an example, refer to the [Daily summary by Assist](/voice_control/assist_daily_summary/) tutorial.

### Help with setting up and fixing Home Assistant

With the **Home Assistant** [set of AI tools](/integrations/llm/#sets-of-ai-tools), a conversation agent or an AI app can look into Home Assistant itself. It can read your logs, the status of your integrations, and your automations. It can also change settings. For example, it can organize your areas and devices, or set up the Energy dashboard. Only administrators can use this set.

For what you can ask, and the steps, refer to [Setting up and organizing with AI](/common-tasks/general/setting-up-with-ai/). To find a problem with AI, refer to [Troubleshooting with AI](/docs/configuration/troubleshooting/#troubleshooting-with-ai).

### AI apps and other services

AI apps outside Home Assistant can use Home Assistant too. The [Model Context Protocol](/integrations/mcp_server/) integration lets an AI app, such as Claude or ChatGPT, read and control your home with the same AI tools.

In the other direction, the [Model Context Protocol Client](/integrations/mcp/) integration gives your conversation agent AI tools from other services. For example, it can search the web.

## Cloud services and local models

Conversation agents and AI tasks need an AI model. [AI integrations](/integrations/category/ai_voice/ai_models/) connect Home Assistant to a model, and add conversation agents, AI tasks, or both. AI apps use their own model, so you don't need an AI integration for them.

A cloud service runs the model on the servers of a provider. You don't need powerful hardware, but your requests go to the provider, and most providers charge for usage.

- [Anthropic](/integrations/anthropic/): Claude models
- [Google Gemini](/integrations/google_generative_ai_conversation/): Gemini models
- [OpenAI](/integrations/openai_conversation/): OpenAI models
- [OpenRouter](/integrations/open_router/): Many models from different providers, billed by OpenRouter
- [OVHcloud AI Endpoints](/integrations/ovhcloud_ai_endpoints/): Open-weight models that are hosted in Europe
- [LiteLLM](/integrations/litellm/): Many models through a LiteLLM proxy. Where your requests go depends on the models behind the proxy.

A local model runs on a computer in your own network, so your requests don't leave your home. It needs a powerful computer. On a less powerful computer, answers are slow, and the model makes more mistakes.

- [Ollama](/integrations/ollama/): Models that run on an Ollama server in your home
- [llama.cpp](/integrations/llama_cpp/): Self-hosted models on servers with an OpenAI-compatible API, such as llama.cpp or vLLM

## Privacy, cost, and accuracy

Before you use AI, think about the following:

- Privacy: With a cloud service, your AI provider receives what you say, and the information about your home that the AI reads. An AI conversation agent only sees the entities that you [expose to voice assistants](/voice_control/voice_remote_expose_devices/). The **Home Assistant** set of AI tools is the exception: it reaches everything.
- Cost: Most cloud providers charge for the amount of text that they process. The more entities you expose, the larger each request gets. An automation that uses AI every time it runs adds to the cost too. Check the pricing of your provider, and set usage limits if it offers them.
- Accuracy: AI can misunderstand a request or give a wrong answer. To keep common commands on your own hardware, turn on **Prefer handling commands locally** in your assistant. Then only the commands that the built-in conversation agent doesn't understand go to AI.

## AI documentation by topic

### AI integrations and tools

- [AI integrations](/integrations/category/ai_voice/ai_models/): All integrations that add AI models
- [LLM integration](/integrations/llm/): The AI tools, the sets of AI tools, and the list of every tool
- [AI Task](/integrations/ai_task/): AI for a single job in automations, scripts, and the **Suggest** button
- [Model Context Protocol](/integrations/mcp_server/): Connecting AI apps to Home Assistant
- [Model Context Protocol Client](/integrations/mcp/): Extra tools from other services for your conversation agent

### Voice and Assist

- [Assist](/voice_control/): How assistants and conversation agents work
- [Talking to Assist - Sentences starter pack](/voice_control/builtin_sentences/): What the built-in conversation agent understands without AI
- [Exposing entities to voice assistants](/voice_control/voice_remote_expose_devices/): What your assistant can see and control
- [Best practices with Assist](/voice_control/best_practices/): Exposing fewer entities, checking names, and letting AI run your scripts
- [Aliases](/voice_control/aliases/): Names for entities, areas, and floors that are easy to say
- [Create a personality with AI](/voice_control/assist_create_open_ai_personality/)
- [Exposing scripts to conversation agents that use AI](/voice_control/exposing_scripts_to_llms/)
- [Adding a custom sentence to trigger an automation](/voice_control/custom_sentences/)
- [Troubleshooting Assist](/voice_control/troubleshooting/)

### Automations, scripts, and templates

- [AI Task examples](/integrations/ai_task/#examples): Camera, weather, and notification examples
- AI Task actions: [Generate data](/actions/ai_task.generate_data/), [Generate image](/actions/ai_task.generate_image/), [Evaluate](/actions/ai_task.evaluate/), and [Clear images](/actions/ai_task.clear_images/)
- [Process conversation](/actions/conversation.process/): Sending text to a conversation agent
- [Start conversation on satellite](/actions/assist_satellite.start_conversation/): Letting a voice satellite speak first
- [Sentence trigger](/triggers/conversation/): Checked before an AI conversation agent
- [Daily summary by Assist](/voice_control/assist_daily_summary/)
- [Debugging templates](/docs/templating/debugging/), [Troubleshooting template errors](/docs/templating/errors/), and [Common template patterns](/docs/templating/patterns/)
- [Testing automations](/docs/automation/testing/): Traces that the AI tools can read
- [Troubleshooting automations](/docs/automation/troubleshooting/)

### Setup, organization, and troubleshooting

- [Setting up and organizing with AI](/common-tasks/general/setting-up-with-ai/)
- [Troubleshooting with AI](/docs/configuration/troubleshooting/#troubleshooting-with-ai)
- [Troubleshooting your configuration](/docs/configuration/troubleshooting/)
- Organizing your home: [Areas](/docs/organizing/areas/), [floors](/docs/organizing/floors/), and [labels](/docs/organizing/labels/)
- [Home energy management](/docs/energy/): Setting up the Energy dashboard
- [Repairs](/integrations/repairs/)
- [Viewing and downloading logs](/common-tasks/general/logs/)
- [Backups](/common-tasks/general/backups/)
- [Action history](/docs/tools/dev-tools/#action-history-tab): Which actions were performed, and by what

### Background

- [Building the AI-powered local smart home](/blog/2025/09/11/ai-in-home-assistant/): The AI features of Home Assistant and how to pick a model
- [AI agents for the smart home](/blog/2024/06/07/ai-agents-for-the-smart-home/): The vision for AI in the smart home
