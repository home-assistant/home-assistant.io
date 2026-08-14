---
title: SpaceXAI
description: Instructions on how to integrate SpaceXAI (Grok) as a conversation agent
ha_category:
  - AI
  - Voice
ha_iot_class: Cloud Polling
ha_release: 2026.9
ha_config_flow: true
ha_codeowners:
  - "@jeffglousher"
ha_domain: spacexai
ha_integration_type: service
ha_platforms:
  - conversation
  - diagnostics
ha_quality_scale: silver
related:
  - docs: /voice_control/voice_remote_expose_devices/
    title: Exposing entities to Assist
  - docs: /voice_control/assist_create_open_ai_personality/
    title: Create an AI personality
  - docs: /integrations/application_credentials/
    title: Application credentials
  - url: https://console.x.ai/
    title: SpaceXAI console
  - url: https://x.ai/
    title: SpaceXAI
---

The **SpaceXAI** {% term integration %} adds a [conversation](/integrations/conversation/)
agent powered by [Grok](https://x.ai/).

You sign in with your SpaceXAI account. The integration does not use an API key,
and Home Assistant never sees your password.

To let the agent control Home Assistant, give it a Home Assistant LLM API. Limit
what it can see and control on the
{% my voice_assistants title="exposed entities page" %}.

This integration does not integrate with [sentence triggers](/docs/automation/trigger/#sentence-trigger).

## Prerequisites

- A SpaceXAI account that can use Grok with Home Assistant.
- [Application credentials](/integrations/application_credentials/) for SpaceXAI.
  Add the SpaceXAI OAuth client under
  **{% my application_credentials title="Settings > Devices & services > Application credentials" %}**.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Application credentials:
  description: "The SpaceXAI OAuth client stored under application credentials. Setup opens SpaceXAI so you can sign in."
{% endconfiguration_basic %}

Setup creates one conversation agent. You can add more later from the
{% my integrations title="SpaceXAI integration page" %}.

## Configuration options

Conversation agents can be added or changed from the integration page.

{% configuration_basic %}
Model:
  description: "The Grok model this agent uses. The list comes from the signed-in account."
Control Home Assistant:
  description: "Which Home Assistant LLM APIs the agent may use. It can only control or provide information about entities that are [exposed](/voice_control/voice_remote_expose_devices/) to it."
Instructions:
  description: "Instructions for how the agent should respond. Written using [Home Assistant Templating](/docs/templating/)."
Maximum response tokens:
  description: "Upper limit for one response. Short answers stay short. The default is 2048."
{% endconfiguration_basic %}

## Supported functionality

Use the conversation agent in an [Assist](/voice_control/) pipeline, or talk to
it from the Assist dialog.

Set it as the conversation agent for a voice assistant under
**{% my voice_assistants title="Settings → Voice assistants" %}**. You can also
follow the [AI personality](/voice_control/assist_create_open_ai_personality/)
guide.

## Data updates

SpaceXAI is contacted when you ask it something. There is no polling and no
background update interval.

## Known limitations

- The signed-in account must be allowed to use Grok this way. If it is not,
  Home Assistant shows a repair and the conversation agents stay unavailable
  until the account can.
- Conversation history stays in Home Assistant. Requests are sent without
  SpaceXAI storing the conversation.
- If SpaceXAI removes a selected model, Home Assistant shows a repair so you
  can pick another model your account can still use.

## Troubleshooting

### The integration asks me to sign in again

Your session expired or was revoked. Sign in again from
**{% my integrations title="Settings > Devices & services" %}**.

### Setup fails with an account or quota message

The SpaceXAI account cannot use Grok this way, or it has reached a usage
limit. Check the plan and usage in the [SpaceXAI console](https://console.x.ai/),
then reload the integration or sign in again.

### The configured model disappeared

If SpaceXAI removes a model, Home Assistant shows a repair. Open the
conversation agent and pick a model that is still available.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

When you delete the configuration entry, Home Assistant revokes the SpaceXAI
authorization so it no longer appears on your account.
