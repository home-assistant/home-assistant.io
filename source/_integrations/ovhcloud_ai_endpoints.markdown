---
title: OVHcloud AI Endpoints
description: Instructions on how to integrate OVHcloud AI Endpoints as a conversation agent in Home Assistant.
ha_category:
  - AI
  - Voice
ha_release: 2026.6
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@Crocmagnon'
ha_domain: ovhcloud_ai_endpoints
ha_integration_type: service
ha_platforms:
  - conversation
ha_quality_scale: bronze
related:
  - docs: /voice_control/voice_remote_expose_devices/
    title: Exposing entities to Assist
  - docs: /voice_control/assist_create_open_ai_personality/
    title: Create an AI personality
---

The **OVHcloud AI Endpoints** {% term integration %} adds a conversation agent powered by [OVHcloud AI Endpoints](https://endpoints.ai.cloud.ovh.net/) to Home Assistant. OVHcloud AI Endpoints is a serverless inference platform that gives you access to a curated catalog of open-weight large language models hosted in Europe.

Controlling Home Assistant is done by providing the AI access to the Assist API of Home Assistant. You can control what devices and entities it can access from the {% my voice_assistants title="exposed entities page" %}. The AI can provide you with information about your devices and control them.

This integration is useful if you want to keep your conversation data within a European cloud provider, or if you want to use a specific open-weight model from the OVHcloud AI Endpoints catalog.

## Prerequisites

- You need an [OVHcloud account](https://www.ovhcloud.com/) with access to the AI Endpoints product.
- This is a paid service. Monitor your usage and costs in the [OVHcloud Control Panel](https://manager.eu.ovhcloud.com/) to avoid unwanted charges.

### Generating an API key

The API key is used to authenticate requests to OVHcloud AI Endpoints. To generate an API key, follow the [official guide](https://docs.ovhcloud.com/en/guides/public-cloud/ai-machine-learning/ai-endpoints-getting-started).

The guide includes the following steps:

1. Log in to the [OVHcloud Control Panel](https://manager.eu.ovhcloud.com/#/hub/).
2. Go to the **Public Cloud** section and select your project or create a new one.
3. In the left menu, under **AI & Machine Learning**, select **AI Endpoints**.
4. Open the **API keys** tab and create a new API key.
5. Copy the generated key. You'll use it to configure the integration.

{% include integrations/config_flow.md %}

{% configuration_basic %}
API key:
  description: "API key from OVHcloud AI Endpoints used to authenticate requests."
{% endconfiguration_basic %}

{% include integrations/option_flow.md %}

The integration supports adding one or more conversation agents as subentries. Each conversation agent is bound to a model from the OVHcloud AI Endpoints catalog. To add a conversation agent, go to {% my integrations title="**Settings** > **Devices & services**" %}, open the **OVHcloud AI Endpoints** integration, and select **Add conversation agent**.

A conversation agent has the following configuration options:

{% configuration_basic %}
Model:
  description: "The model used for the conversation agent. The list of available models is fetched directly from the OVHcloud AI Endpoints catalog. Refer to the [OVHcloud AI Endpoints documentation](https://endpoints.ai.cloud.ovh.net/) for details about each model."
Instructions:
  description: "Instructions for the AI on how it should respond to your requests. It is written using [Home Assistant Templating](/docs/templating/)."
Control Home Assistant:
  description: "If the model is allowed to interact with Home Assistant. It can only control or provide information about entities that are [exposed](/voice_control/voice_remote_expose_devices/) to it."
{% endconfiguration_basic %}

## Supported functionality

The integration provides a [conversation](/integrations/conversation/) entity for each configured conversation agent. You can use this entity to:

- Chat with the model through the Home Assistant interface.
- Use the model as a conversation agent in an [Assist pipeline](/integrations/assist_pipeline/).
- Trigger the model from automations and scripts with the `conversation.process` action.

### Assist pipeline

You can set up your OVHcloud AI Endpoints conversation agent in an [Assist pipeline](/integrations/assist_pipeline/), as described in the [voice guide](/voice_control/assist_create_open_ai_personality/). You can then chat through the Home Assistant web interface, or on [Android](/voice_control/android/) or [Apple](/voice_control/apple/) devices using the [Home Assistant Companion App](https://companion.home-assistant.io/docs/getting_started/), or by voice using an [Assist satellite](/integrations/assist_satellite/).

[Expose entities](/voice_control/voice_remote_expose_devices/) and configure aliases for the entities you want the model to control.

## Known limitations

- Only models that support the OpenAI-compatible chat completions API of OVHcloud AI Endpoints can be used.
- Tool calling is required for the **Control Home Assistant** option to work. If the selected model does not support tool calling, the agent will still answer questions but won't be able to control your devices.
- This integration does not integrate with [sentence triggers](/docs/automation/trigger/#sentence-trigger).

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
