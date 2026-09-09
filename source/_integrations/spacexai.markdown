---
title: SpaceXAI
description: Instructions on how to add Grok as a conversation agent using SpaceXAI
ha_category:
  - AI
  - Voice
ha_release: '2026.10'
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@jeffglousher'
ha_domain: spacexai
ha_integration_type: service
ha_platforms:
  - conversation
ha_quality_scale: bronze
related:
  - docs: /voice_control/voice_remote_expose_devices/
    title: Exposing entities to Assist
  - docs: /voice_control/assist_create_open_ai_personality/
    title: Create an AI personality
  - url: https://x.ai/
    title: xAI
---

The **SpaceXAI** {% term integration %} adds a Grok-powered conversation agent from [xAI](https://x.ai/) to Home Assistant. You sign in to your xAI account in a browser by using a one-time code. The integration does not accept an API key.

This is a community-maintained integration, not an official xAI product.

The Assist API is selected by default during setup. It lets Grok provide information about or control only the entities that you [expose to Assist](/voice_control/voice_remote_expose_devices/).

This integration does not integrate with [sentence triggers](/docs/automation/trigger/#sentence-trigger).

## Prerequisites

- An xAI account with an eligible subscription that allows access to the Grok subscription API through browser sign-in.
- A device with a web browser to complete sign-in.

{% include integrations/config_flow.md %}

During setup, you can configure the following settings:

{% configuration_basic %}
Model:
  description: "The Grok model used by the conversation agent. The available models come from your signed-in account."
Instructions:
  description: "Instructions for how Grok should respond. You can use a [Home Assistant template](/docs/configuration/templating/)."
Control Home Assistant:
  description: "The Home Assistant language model APIs that Grok can use. Assist is selected by default. Clear this selection to disable Home Assistant tools."
{% endconfiguration_basic %}

## Supported functionality

The integration creates one Grok conversation agent. You can use it in the Assist dialog or select it as the conversation agent for a [voice assistant](/voice_control/).

Grok can answer in any language supported by the selected model. If you allow it to use the Assist API, it can also get information from Home Assistant and control exposed entities.

## Data updates

SpaceXAI is contacted when you send a conversation request. The integration does not poll in the background.

### Data sent to the provider

Each conversation request sends your message, conversation history, and configured instructions to xAI. If you enable Assist access, requests can also include the names and states of exposed entities and the results of Home Assistant actions. Template instructions can include other information you choose to put in the template.

Review your account's privacy controls, [xAI privacy information](https://x.ai/legal/privacy-policy), and [service terms](https://x.ai/legal/terms-of-service) before sending personal information. Data handling, retention, usage limits, and any charges depend on the provider's terms for your account. Removing the integration does not delete data already sent to xAI.

## Known limitations

- The integration supports one Grok conversation agent for each signed-in account.
- Conversation attachments are not supported.
- The models available during setup depend on the signed-in account.

## Troubleshooting

### The sign-in code expired

If the code expires before you finish signing in, select **Submit** to request a new code.

### Grok rejects the sign-in

If your authorization expired or was revoked, remove the SpaceXAI integration and add it again to complete a new browser sign-in.

### Grok cannot access an entity

Make sure you selected the Assist API during setup and [exposed the entity to Assist](/voice_control/voice_remote_expose_devices/).

### The account is not allowed to use the service

If xAI rejects a request because your account does not have access, check the account's subscription and access to the selected model. Signing in again does not grant additional permissions. Try again after access is restored.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
