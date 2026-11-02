---
description: Instructions on how to integrate Anthropic Claude with Home Assistant
ha_release: 2024.9
ha_domain: anthropic
related:
  - docs: /voice_control/voice_remote_expose_devices/
    title: Exposing entities to Assist
  - docs: /voice_control/assist_create_open_ai_personality/
    title: Create an AI personality
  - url: https://console.anthropic.com/settings/keys
    title: Anthropic API key
  - url: https://www.anthropic.com
    title: Anthropic
  - url: https://claude.ai
    title: Claude
---

The **Anthropic** {% term integrations %} adds conversation agents and AI task entities powered by [Anthropic](https://www.anthropic.com)'s Claude models to Home Assistant.

Controlling Home Assistant is done by providing the AI access to the **Device control** set of tools. You can control what devices and entities it can access from the {% my voice_assistants title="exposed entities page" %}. The AI can provide you information about your devices and control them.

Legal note: Individuals and hobbyists are welcome to use the Anthropic API [for personal use](https://support.anthropic.com/en/articles/8987200-can-i-use-the-claude-api-for-individual-use), however, the use of the API is subject to their [Commercial Terms of Service](https://www.anthropic.com/legal/commercial-terms), regardless of whether you are an individual or representing a company.

## Prerequisites

- This integration requires an API key to use, [which you can generate here](https://console.anthropic.com/settings/keys).
- This is a paid service, we advise you to monitor your costs in the [Anthropic portal](https://console.anthropic.com/settings/cost) closely.

### Generating an API Key

The Anthropic API key is used to authenticate requests to the Anthropic API. To generate an API key, take the following steps:

1. Log in to the [Anthropic portal](https://console.anthropic.com) or sign up for an account.
2. Enable billing with a valid credit card on the [plans page](https://console.anthropic.com/settings/plans).
3. Visit the [API Keys page](https://console.anthropic.com/settings/keys) to retrieve the API key you'll use to configure the integration.

{% include integrations/config_flow.md %}

{% configuration_basic %}
API key:
  description: "API key from Anthropic for authentication."
{% endconfiguration_basic %}

{% include integrations/option_flow.md %}

The integration provides the following types of subentries:

- [Conversation](/integrations/conversation/)
- [AI Task](/integrations/ai_task/)

{% configuration_basic %}
Instructions:
  description: Instructions for the AI on how it should respond to your requests. It is written using [Home Assistant Templating](/docs/templating/).
AI tools:
  description: "**Device control** only accesses the entities you [expose](/voice_control/voice_remote_expose_devices/) to voice assistants. **Home Assistant** accesses everything and only works for administrators, not voice assistant devices."
Recommended settings:
  description: If enabled, the recommended model and settings are chosen.
{% endconfiguration_basic %}

If you choose not to use the recommended settings, you can configure the following options:

{% configuration_basic %}
Model:
  description: The model that will complete your prompt. See [models overview](https://platform.claude.com/docs/en/models/overview) for additional details and options.
Maximum tokens to return in response:
  description: The maximum number of output tokens to generate, including thinking tokens and the final response. Claude may stop before reaching this limit. Leave enough room for both reasoning and the answer when thinking is enabled. The upper limit depends on the selected model; see the [models overview](https://platform.claude.com/docs/en/models/overview) for details.
Caching strategy:
  description: Optimize your API usage by allowing resuming from specific prefixes in your prompts. This significantly reduces processing time and costs in multi-turn conversations, but may increase cost for single-turn conversations. The cache duration is 5 minutes, the cache writes are [billed](https://platform.claude.com/docs/en/build-with-claude/prompt-caching#pricing) at 1.25 times the base input tokens price, and cache read tokens are 0.1 times the base input tokens price. This means that the cache can reduce your costs and latency if you are likely to either call a tool to control your home, which also counts as a multi-turn conversation, or reply to the model with a follow-up. There are 3 caching strategies available, `Disabled` (if you often ask general-knowledge questions without follow-up), `System prompt` (caches system prompt and tools, useful if you often have short conversations like asking time or turning on lights), and `Full` (caches every user message, useful if you often have long conversations).
Thinking type:
  description: Controls when Claude spends additional tokens reasoning through requests or tool results. **Disabled** turns thinking off, **Enabled** uses a thinking budget, and **Adaptive** lets Claude decide when and how much to think. The default is **Adaptive** on models that support it. If the selected model supports only one type, this option is not displayed. See [thinking](https://platform.claude.com/docs/en/build-with-claude/thinking) for details.
Thinking budget:
  description: The tokens available for [extended thinking](https://platform.claude.com/docs/en/build-with-claude/extended-thinking) when **Thinking type** is **Enabled**. The budget must be less than **Maximum Tokens to Return in Response**. Larger budgets can improve reasoning on complex requests but may increase response time and cost. This option is available on models that support manual extended thinking and is unused with other thinking types. To turn thinking off, select **Disabled** under **Thinking type**, if the model supports it.
Effort:
  description: Controls how much work Claude puts into a response, balancing thoroughness, response time, and token usage. Depending on the model, the available levels are **Low**, **Medium**, **High**, **X-High**, and **Max**. The default is **Low**. Effort applies independently of **Thinking type**, including with thinking disabled or with a manual thinking budget on models that support both. Some models require thinking for higher effort levels. See [effort](https://platform.claude.com/docs/en/build-with-claude/effort) for details.
Code execution:
  description: Enable the server-side [Code execution tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/code-execution-tool). With this tool, the model can analyze data, perform complex calculations, run system commands, including writing code, in a secure, sandboxed environment.
Enable web search:
  description: Enable the server-side [Web search tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-search-tool) for direct access to real-time web content, allowing it to answer questions with up-to-date information beyond its knowledge cutoff. Please note that this tool has its own [pricing](https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-search-tool#usage-and-pricing). On models that support [dynamic filtering](https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-search-tool#dynamic-filtering), also enable **Code execution** to filter search results before adding them to the conversation.
Maximum web searches:
  description: Limits the number of web searches that can be performed per user request. Once the limit is reached, no additional searches will be executed during that conversation.
Include home location:
  description: The parameter allows you to localize search results based on the Home Assistant location.
Enable web fetch:
  description: Enable the server-side [Web fetch tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-fetch-tool) to augment Claude's context with live web content. The tool allows Claude to retrieve full content from specified web pages and PDF documents. Note that for security reasons, the web fetch tool can only fetch URLs that have previously appeared in the conversation context. This includes URLs in user messages, URLs in client-side tool results, and URLs from previous web search or web fetch results. This tool has its own [pricing](https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-fetch-tool#usage-and-pricing). On models that support dynamic filtering, also enable **Code execution** to filter fetched content before adding it to the conversation.
Maximum web fetches:
  description: Limits the number of web fetches that can be performed per user request.
Enable tool search tool:
  description: With [this tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-search-tool), instead of loading all tool definitions into the context window upfront, Claude searches the tool catalog and loads only the tools it needs. This may improve performance if you don't need to control devices every time, or if you have a long prompt or many additional tools.
{% endconfiguration_basic %}

## Supported features

### Models

The integration uses the capabilities and token limits reported by Anthropic to offer settings for the selected model. Newly released models may require a Home Assistant update if they introduce backwards-incompatible API changes.

Anthropic [deprecates and retires models](https://platform.claude.com/docs/en/about-claude/model-deprecations) over time. Deprecated models remain usable until retirement, but you should replace them before their retirement date. Retired models are no longer available and cannot be selected in the integration.

When a configured model becomes deprecated or retired, Home Assistant creates a repair issue. Open **Settings** > **System** > **Repairs** and choose an active replacement for each affected conversation or AI task configuration.

### Feature matrix

The following table describes which [API features](https://platform.claude.com/docs/en/build-with-claude/overview) are supported and which are not. In general, we don't support beta features.

#### Model capabilities

| Feature | Description | Status | Notes |
|---|---|---|---|
| [Context windows](https://platform.claude.com/docs/en/build-with-claude/context-windows) | Up to 1M tokens for processing large documents, extensive codebases, and long conversations. | Supported | This is a basic feature, supported by default |
| [Adaptive thinking](https://platform.claude.com/docs/en/build-with-claude/thinking) | Let Claude decide when and how much to think based on the request. | Supported | Select **Adaptive** under **Thinking type**, where available, and use **Effort** to adjust how much work Claude puts into the response |
| [Batch processing](https://platform.claude.com/docs/en/build-with-claude/batch-processing) | Process large volumes of requests asynchronously for cost savings. Send batches with many queries per batch. Batch API calls cost 50% less than standard API calls. | Not supported | This feature does not apply to Home Assistant. There is currently no clear smart home use case for batch processing. |
| [Citations](https://platform.claude.com/docs/en/build-with-claude/citations) | Ground Claude's responses in source documents. With Citations, Claude can provide detailed references to the exact sentences and passages it uses to generate responses, leading to more verifiable, trustworthy outputs. | Not supported | We support receiving the citations but don't currently display them in the interface |
| [Data residency](https://platform.claude.com/docs/en/build-with-claude/data-residency) | Control where model inference runs using geographic controls. Specify `"global"` or `"us"` routing per request via the `inference_geo` parameter. | Not supported | We might add support later, but it is not clear why you would need this in Home Assistant |
| [Effort](https://platform.claude.com/docs/en/build-with-claude/effort) | Control how many tokens Claude uses when responding with the effort parameter, trading off between response thoroughness and token efficiency. | Supported | Use **Effort** on models that support it, including when thinking is disabled |
| [Extended thinking](https://platform.claude.com/docs/en/build-with-claude/extended-thinking) | Enhanced reasoning capabilities for complex tasks, providing transparency into Claude's step-by-step thought process before delivering its final answer. | Supported | Select **Enabled** under **Thinking type** and set **Thinking budget**, where supported. The thinking summaries are displayed in the Assist interface |
| [PDF support](https://platform.claude.com/docs/en/build-with-claude/pdf-support) | Process and analyze text and visual content from PDF documents. | Supported | Use `ai_task.generate_data` action with attachments to use this feature |
| [Search results](https://platform.claude.com/docs/en/build-with-claude/search-results) | Enable natural citations for RAG applications by providing search results with proper source attribution. Achieve web search-quality citations for custom knowledge bases and tools. | Not supported | We receive the citations but they are not currently displayed in the interface. The response text itself usually provides sufficient information. |
| [Structured outputs](https://platform.claude.com/docs/en/build-with-claude/structured-outputs) | Guarantee schema conformance with two approaches: JSON outputs for structured data responses, and strict tool use for validated tool inputs. | Supported | Use `ai_task.generate_data` action with response schema to use this feature |

#### Tools

| Feature | Description | Status | Notes |
|---|---|---|---|
| [Code execution](https://platform.claude.com/docs/en/agents-and-tools/tool-use/code-execution-tool) | Run code in a sandboxed environment for advanced data analysis, calculations, and file processing. | Supported | Use the **Code execution** parameter to enable |
| [Web fetch](https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-fetch-tool) | Retrieve full content from specified web pages and PDF documents for in-depth analysis. | Supported | Use the **Enable web fetch** parameter to enable |
| [Web search](https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-search-tool) | Augment Claude's comprehensive knowledge with current, real-world data from across the web. | Supported | Use the **Enable web search** parameter to enable |
| [Bash](https://platform.claude.com/docs/en/agents-and-tools/tool-use/bash-tool) | Execute bash commands and scripts to interact with the system shell and perform command-line operations. | Not supported | This is a client-side tool, the bash is implied to be on the Home Assistant side, this could compromise the security and provides no real benefit over Code execution feature that uses a sandboxed environment instead. |
| [Computer use](https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool) | Control computer interfaces by taking screenshots and issuing mouse and keyboard commands. | Not supported | This is probably not applicable to Home Assistant use cases |
| [Memory](https://platform.claude.com/docs/en/agents-and-tools/tool-use/memory-tool) | Enable Claude to store and retrieve information across conversations. Build knowledge bases over time, maintain project context, and learn from past interactions. | Not supported | This is more like an SDK feature rather than an API feature. As such, it can be implemented as a third-party LLM API. |
| [Text editor](https://platform.claude.com/docs/en/agents-and-tools/tool-use/text-editor-tool) | Create and edit text files with a built-in text editor interface for file manipulation tasks. | Not supported | This is probably not applicable to Home Assistant use cases |
| [Agent Skills](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview) | Extend Claude's capabilities with Skills. Use pre-built Skills (PowerPoint, Excel, Word, PDF) or create custom Skills with instructions and scripts. Skills use progressive disclosure to efficiently manage context. | Not supported | This feature is still in beta |
| [MCP connector](https://platform.claude.com/docs/en/agents-and-tools/mcp-connector) | Connect to remote MCP servers directly from the Messages API without a separate MCP client. | Not supported | This feature is still in beta |
| [Tool search](https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-search-tool) | Scale to thousands of tools by dynamically discovering and loading tools on-demand using regex-based search, optimizing context usage and improving tool selection accuracy. | Supported | Use the **Enable tool search tool** parameter to use this feature |
| [Files API](https://platform.claude.com/docs/en/build-with-claude/files) | Upload and manage files to use with Claude without re-uploading content with each request. Supports PDFs, images, and text files. | Not supported | This feature is still in beta |

#### Context management

| Feature | Description | Status | Notes |
|---|---|---|---|
| [Compaction](https://platform.claude.com/docs/en/build-with-claude/compaction) | Server-side context summarization for long-running conversations. When context approaches the window limit, the API automatically summarizes earlier parts of the conversation. | Not supported | This feature is still in beta |
| [Context editing](https://platform.claude.com/docs/en/build-with-claude/context-editing) | Automatically manage conversation context with configurable strategies. Supports clearing tool results when approaching token limits and managing thinking blocks in extended thinking conversations. | Not supported | This feature is still in beta |
| [Automatic prompt caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching#automatic-caching) | Simplify prompt caching to a single API parameter. The system automatically caches the last cacheable block in your request, moving the cache point forward as conversations grow. | Supported | Set **Caching strategy** to **Full** to use this feature |
| [Prompt caching (5m)](https://platform.claude.com/docs/en/build-with-claude/prompt-caching) | Provide Claude with more background knowledge and example outputs to reduce costs and latency. | Supported | Set **Caching strategy** to **System prompt** to enable caching for the system prompt and tools, but not for individual conversation messages, to keep Anthropic API costs low for typical Home Assistant smart home use cases |
| [Prompt caching (1hr)](https://platform.claude.com/docs/en/build-with-claude/prompt-caching#1-hour-cache-duration) | Extended 1-hour cache duration for less frequently accessed but important context, complementing the standard 5-minute cache. | Not supported | This is a more expensive version of prompt caching; it is probably not worth it for a smart home, but we might add this option in the future. Also, the chat session in Home Assistant expires in 5 minutes |
| [Token counting](https://platform.claude.com/docs/en/api/messages-count-tokens) | Token counting enables you to determine the number of tokens in a message before sending it to Claude, helping you make informed decisions about your prompts and usage. | Not supported | This is probably not applicable to Home Assistant use cases |

### Availability

On start, the integration verifies the connection and validity of the API key, a config entry will not be loaded until this connectivity test succeeds. Additionally, there are periodic connectivity checks after startup. When the connection is considered to be broken, the `conversation` and `ai_task` entities will be shown as `Unavailable` until the connection is successful again. This does not prevent execution of the actions.

## Use cases

The integration provides `conversation` and `ai_task` entities powered by Anthropic API. Please refer to the corresponding integrations for more details and examples:

- [Conversation](/integrations/conversation/)
- [AI Task](/integrations/ai_task/)

A few examples:

### Assist pipeline

Set up and configure Claude as a conversation agent in an [Assist pipeline](/integrations/assist_pipeline/) as described in the [voice guide](/voice_control/assist_create_open_ai_personality/). You can then use this pipeline to chat through the Home Assistant web interface, on [Android](/voice_control/android/) or [Apple](/voice_control/apple/) devices using the [Home Assistant Companion App](https://companion.home-assistant.io/docs/getting_started/), or by voice using an [Assist satellite](/integrations/assist_satellite/).

[Expose entities](/voice_control/voice_remote_expose_devices/) and configure aliases for the entities you want the model to control.

### Home Assistant interface

You can set the Claude AI Task entity as the default AI Task entity. To do this, go to {% my config_ai title="**Settings** > **System** > **AI**" %} and select the Claude AI Task entity. This makes the Claude AI Task entity the default for blueprints, and for the **Suggest with AI** button in various places in the interface.

### Automation

You can use `conversation.process` and `ai_task.generate_data` actions in your scripts and automations.
Here is a simple automation that implements a Claude Telegram chatbot using [Telegram bot integration](/integrations/telegram_bot):


```yaml
triggers:
  - trigger: state
    entity_id:
      - event.bot_update_event # Replace with your Telegram bot event entity
conditions: "{{ trigger.to_state.attributes.event_type == 'telegram_text' }}"
actions:
  - action: conversation.process
    data:
      agent_id: conversation.claude_conversation # Replace with your Claude conversation entity
      conversation_id: "telegram_{{ trigger.to_state.attributes.chat_id }}"
      text: "{{ trigger.to_state.attributes.text }}"
    response_variable: response
  - action: telegram_bot.send_message
    data:
      chat_id: "{{ trigger.to_state.attributes.chat_id }}"
      message: "{{ response.response.speech.plain.speech }}"
      parse_mode: plain_text
      config_entry_id: "{{ trigger.to_state.attributes.bot.config_entry_id }}"
```


## Troubleshooting

### The response is truncated mid-sentence, or the model said it would do an action to control a device but didn't do it

This may happen when the **Maximum Tokens to Return in Response** integration option value is too small. A small conservative limit is good to keep the cost lower, but it may be suboptimal in certain cases.

### Integration fails to set up, the logs show ImportError or AttributeError

This may happen if the Python anthropic client had failed to upgrade to the correct version. If you know how to log into the Home Assistant container and manually reinstall the client, try that. Otherwise, downgrading and re-upgrading Home Assistant should help.

## Known limitations

This integration does not integrate with [sentence triggers](/triggers/conversation/).

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
