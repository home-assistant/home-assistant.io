---
title: SpaceXAI
description: Instructions on how to integrate SpaceXAI (Grok) as a conversation agent
ha_category:
  - Conversation
ha_iot_class: Cloud Polling
ha_release: "TBD"
ha_config_flow: true
ha_codeowners:
  - "@jeffglousher"
ha_domain: spacexai
ha_integration_type: service
ha_platforms:
  - conversation
ha_quality_scale: silver
related:
  - docs: /voice_control/voice_remote_expose_devices/
    title: Exposing entities to Assist
  - docs: /integrations/application_credentials/
    title: Application credentials
---

The **SpaceXAI** {% term integration %} adds a [conversation](/integrations/conversation/)
agent powered by Grok.

You sign in with a SpaceXAI subscription. The integration does not accept API keys, and
Home Assistant never sees your password — only the OAuth tokens returned by SpaceXAI.

Controlling Home Assistant is done by giving the agent a Home Assistant LLM API. You can
control which devices and entities it can access from the
{% my voice_assistants title="exposed entities page" %}.

This integration does not integrate with [sentence triggers](/docs/automation/trigger/#sentence-trigger).

## Prerequisites

- A SpaceXAI account with a subscription that includes API access.
- [Application credentials](/integrations/application_credentials/) for SpaceXAI. Add the
  SpaceXAI OAuth client ID under
  **{% my application_credentials title="Settings > Devices & services > Application credentials" %}**.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Application credentials:
  description: "The SpaceXAI OAuth client registered under application credentials. Setup uses Authorization Code with PKCE through [My Home Assistant](/integrations/my/)."
{% endconfiguration_basic %}

Setup signs in with your SpaceXAI account and creates one conversation agent. You can add
more conversation agents later from the integration's subentry flows.

## Configuration options

Conversation agents can be added or reconfigured from the integration.

{% configuration_basic %}
Model:
  description: "The Grok model used for this agent. The list is discovered from the signed-in subscription."
Control Home Assistant:
  description: "Which Home Assistant LLM APIs the agent may use. It can only control or provide information about entities that are [exposed](/voice_control/voice_remote_expose_devices/) to it."
Instructions:
  description: "Instructions for the AI on how it should respond. Written using [Home Assistant Templating](/docs/templating/)."
Maximum response tokens:
  description: "Maximum number of tokens Grok may generate for one response (default 2048)."
{% endconfiguration_basic %}

## Supported functionality

Use the conversation agent as an [Assist](/voice_control/) pipeline agent, or talk to it
from the Assist dialog.

## Data updates

SpaceXAI is queried only when you ask it something. There is no polling and no background
update interval.

## Examples

Ask Grok about exposed entities from Assist, or use it as the conversation agent in a
voice assistant pipeline under
**{% my voice_assistants title="Settings → Voice assistants" %}**.

## Known limitations

- Access depends on your SpaceXAI subscription. If the signed-in account is not eligible
  for subscription-backed Grok access, Home Assistant raises a repair and the conversation
  agents stay unavailable until the account is eligible.
- Conversation history is kept by Home Assistant. Requests are sent with storage disabled,
  so SpaceXAI does not retain the conversation.
- If SpaceXAI withdraws a configured model, Home Assistant raises a repair. Choose a
  currently entitled model to make that agent available again.

## Troubleshooting

### The integration asks me to sign in again

Your refresh token was revoked or expired. Reauthenticate from
**{% my integrations title="Settings > Devices & services" %}**.

### Setup fails with a subscription or quota message

Your SpaceXAI account is not currently eligible for API access, or you have reached a
usage limit. Check your plan and usage with SpaceXAI, then reload the integration or sign
in again.

### The configured model disappeared

If SpaceXAI withdraws a model, Home Assistant raises a repair issue. Reconfigure the
conversation agent and pick a model that is still available.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

When you delete the configuration entry, Home Assistant revokes the refresh token with
SpaceXAI so the authorization no longer appears in your account.
