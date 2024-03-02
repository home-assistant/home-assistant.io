---
title: Amazon Bedrock Integration
description: Instructions on how to integrate Amazon Bedrock with Home Assistant.
ha_category:
  - Notifications
ha_iot_class: Cloud Push
ha_config_flow: true
ha_release: '2024.2'
ha_domain: bedrock_agent
ha_codeowners:
  - '@paul-enno'
ha_integration_type: service
---

The `bedrock_agent` integration makes it possible to add conversation agents powered by leading foundation models to Home Assistant through [Amazon Bedrock](https://aws.amazon.com/bedrock).

With this integration, you can bring the latest advances in conversational AI into your smart home environment and leverage models from providers like AI21 Labs, Anthropic, Cohere, Meta, Mistral AI, Stability AI, and Amazon.

To enable this functionality, valid AWS credentials are required. The integration will access AI providers' models through Amazon Bedrock, an AWS service that provides unified access to foundations models from multiple vendors.

## Setup

Your IAM user needs to have permission to list and invoke models on Amazon Bedrock. See the [Amazon Bedrock Documentation](https://docs.aws.amazon.com/bedrock/latest/userguide/security-iam.html) for detailed description.

Configure Region, AWS secret and key, and the model to be used. After successful integration setup, you can select Bedrock as conversation agent in Settings > Voice Assistant > Home Assistant > Conversation Agent.

{% configuration %}
region:
  description: The AWS region to be used. For example `us-west-2`
  required: true
  type: string
key_id:
  description: Your AWS Access Key ID.
  required: true
  type: string
key_secret:
  description: Your AWS Secret Access Key.
  required: true
  type: string
model_id:
  description: The model_id to be used. See a list of them here [Model IDs](https://docs.aws.amazon.com/bedrock/latest/userguide/model-ids.html#model-ids-arns)
  required: false
  type: string
{% endconfiguration %}
