---
title: AWS Bedrock
description: Instructions on how to integrate AWS Bedrock foundation models as a conversation agent and AI task
ha_category:
  - AI
  - Voice
ha_release: 2026.2.0
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - "@jflatten"
ha_domain: aws_bedrock
ha_integration_type: service
ha_platforms:
  - conversation
  - ai_task
related:
  - docs: /voice_control/voice_remote_expose_devices/
    title: Exposing entities to Assist
  - docs: /voice_control/assist_create_open_ai_personality/
    title: Create an AI personality
  - url: https://aws.amazon.com/bedrock/
    title: AWS Bedrock
  - url: https://docs.aws.amazon.com/bedrock/
    title: AWS Bedrock documentation
  - url: https://console.aws.amazon.com/bedrock/
    title: AWS Bedrock console
---

The **AWS Bedrock** {% term integration %} adds conversation agents and AI task entities powered by [Amazon Bedrock](https://aws.amazon.com/bedrock/) foundation models in Home Assistant. This integration currently supports Amazon Nova models (Pro, Lite, and Micro) for natural language interaction and home control.

Controlling Home Assistant is done by providing the AI access to the Assist <abbr title="Application Programming Interface">API</abbr> of Home Assistant. You can control what devices and entities it can access from the {% my voice_assistants title="exposed entities page" %}. The AI can provide you information about your devices and control them.

This integration does not integrate with [sentence triggers](/docs/automation/trigger/#sentence-trigger).

This integration requires AWS credentials and model access to use. This is a paid service, and we advise you to monitor your costs in the [AWS Billing Console](https://console.aws.amazon.com/billing/) closely. Set up billing alerts in the AWS console to avoid unexpected costs.

## Prerequisites

Before setting up this integration, you need:

### AWS account requirements

1. An active AWS account. If you don't have one, [sign up for AWS](https://portal.aws.amazon.com/billing/signup).
2. An <abbr title="Identity and Access Management">IAM</abbr> user with programmatic access (Access Key ID and Secret Access Key) or temporary credentials.
3. IAM permissions for AWS Bedrock and AWS Marketplace.

### IAM permissions

Your IAM user or role needs the following permissions for Amazon Bedrock:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "bedrock:InvokeModel",
        "bedrock:Converse",
        "bedrock:ListFoundationModels"
      ],
      "Resource": "*"
    }
  ]
}
```

Alternatively, you can use the AWS managed policy `AmazonBedrockFullAccess`, which includes all necessary permissions.

### Model access

Amazon Nova models that are supported by this integration are available by default in your AWS account. No additional model access configuration is required.

### Supported AWS regions

AWS Bedrock is available in multiple regions worldwide. The integration supports the following regions:

- `us-east-1` (US East - N. Virginia)
- `us-west-2` (US West - Oregon)
- `eu-west-1` (Europe - Ireland)
- `eu-central-1` (Europe - Frankfurt)
- `ap-southeast-1` (Asia Pacific - Singapore)
- `ap-northeast-1` (Asia Pacific - Tokyo)

## Setup

{% include integrations/config_flow.md %}

{% configuration_basic %}
AWS Access Key ID:
    description: Your AWS IAM user access key ID. This is a 20-character alphanumeric string (for example, `AKIAIOSFODNN7EXAMPLE`).
AWS Secret Access Key:
    description: Your AWS IAM user secret access key. This is a 40-character string that should be kept secure.
AWS Region:
    description: The AWS region where you want to use Bedrock services. Choose a region based on your location and the models you want to access. For example, `us-east-1` for US East (N. Virginia) or `eu-central-1` for Europe (Frankfurt).
{% endconfiguration_basic %}

{% tip %}
To create AWS access keys, sign in to the AWS console, go to IAM > Users, select your user, then select the **Security credentials** tab and create an access key for **Application running outside AWS**.
{% endtip %}

The integration validates your credentials by attempting to list available foundation models in the specified region. Upon successful setup, the integration automatically creates two default entries:

- **AWS Bedrock conversation** - A conversation agent for natural language interaction
- **AWS Bedrock AI Task** - An AI task entity for generating structured data

## Configuration options

After adding the integration, you can configure conversation agents and AI task entities.

{% include integrations/option_flow.md %}

### Conversation agent configuration

{% configuration_basic %}
Name:
    description: Custom name for the conversation agent.
Instructions:
    description: Instructions for the AI on how it should respond to your requests. It is written using [Home Assistant Templating](/docs/configuration/templating/).
Model:
    description: The Amazon Nova model to use for generating responses. Choose from Nova Pro (default), Nova Lite, or Nova Micro.
Maximum Tokens to Return in Response:
    description: The maximum number of tokens to generate in the response. Default is 3000, which is recommended for tool use with home control.
Temperature:
    description: Controls randomness in responses. Use values closer to `0` for more deterministic responses and closer to `1` for more creative responses. When tool use is enabled, temperature is automatically set to `0` for Amazon Nova models for optimal performance.
{% endconfiguration_basic %}

### AI task configuration

AI task entities support the same configuration options as conversation agents but are optimized for generating structured data following specific schemas.

## Available models

This integration currently supports the following Amazon Nova models:

- **Amazon Nova Pro** (`amazon.nova-pro-v1:0`) - Balanced performance and cost, supports multimodal inputs (text, images, video). This is the default model.
- **Amazon Nova Lite** (`amazon.nova-lite-v1:0`) - Fast and affordable, supports multimodal inputs (text, images, video).
- **Amazon Nova Micro** (`amazon.nova-micro-v1:0`) - Fastest and most cost-effective, text-only model.

All supported Nova models work with tool calling for home control and can handle natural language conversations. For optimal tool use performance, the integration automatically sets temperature to 0 when tools are available.

## Using the conversation agent

Once configured, you can interact with the conversation agent through:

- **Voice assistants**: Set the conversation agent as your preferred assistant in {% my voice_assistants title="voice assistant settings" %}
- **Conversation panel**: Use the conversation interface in Home Assistant
- **Automations**: Include AI conversations in your automations
- **Scripts**: Add AI interactions to your scripts

### Example automation

```yaml
automation:
  - alias: "Get climate advice"
    triggers:
      - trigger: numeric_state
        entity_id: sensor.outdoor_temperature
        above: 30
    actions:
      - action: conversation.process
        data:
          agent_id: conversation.aws_bedrock_conversation
          text: "It's hot outside. What should I do with my home climate?"
```

## Using AI task entities

AI task entities generate structured data following specific schemas. This is useful for extracting information or generating formatted responses.

### Example: Generate structured data

```yaml
action: ai_task.generate_data
target:
  entity_id: ai_task.aws_bedrock_ai_task
data:
  task_name: "analyze_energy"
  data: "Living room: 150W, Kitchen: 320W, Bedroom: 80W"
  structure:
    type: object
    properties:
      total_watts:
        type: number
      highest_consumer:
        type: string
      recommendations:
        type: array
        items:
          type: string
```

## Tool use and home control

When conversation agents are configured and entities are exposed, the conversation agent can:

- Control lights, switches, and other devices
- Query sensor states and history
- Execute actions
- Read and modify schedules
- Manage shopping lists and to-do items

The AI automatically calls the appropriate tools to fulfill your requests. Tool execution is limited to 10 iterations per conversation turn to prevent infinite loops.

## Cost considerations

AWS Bedrock is a paid service with costs varying by:

- **Model used**: Different models have different pricing
- **Token count**: Charges based on input and output tokens
- **Region**: Pricing may vary by AWS region

### Cost management recommendations

- Monitor usage through the [AWS Cost Explorer](https://console.aws.amazon.com/cost-management/home)
- Set up billing alerts in the AWS console
- Start with lighter models (Nova-Lite, Nova-Micro) for testing
- Use appropriate max_tokens values to control costs
- Only enable web search when necessary (adds latency and cost)

For current pricing information, see the [AWS Bedrock pricing page](https://aws.amazon.com/bedrock/pricing/).

## Model selection guidance

Choose models based on your specific use case, balancing performance, cost, and capabilities.

### Recommended: Amazon Nova Pro

- **Best for**: Most home automation tasks, voice control, natural conversation
- **Strengths**: Multimodal support (text, images, video), fast responses, cost-effective
- **Use when**: You need reliable tool use and balanced performance
- **Model ID**: `amazon.nova-pro-v1:0`

### Budget-friendly: Amazon Nova Lite or Nova Micro

- **Nova Lite**: Good for multimodal understanding (images, video) with lower costs
- **Nova Micro**: Best for text-only interactions, fastest and most affordable
- **Use when**: You have simple queries, want to minimize costs, or don't need multimodal capabilities
- **Model IDs**: `amazon.nova-lite-v1:0`, `amazon.nova-micro-v1:0`

### Performance considerations

- **Speed**: Nova Micro > Nova Lite > Nova Pro
- **Cost**: Nova Micro < Nova Lite < Nova Pro
- **Capabilities**: All models support tool use for home control; Pro and Lite support images and video

### Use case examples

**Simple voice commands**: Use Nova Micro for cost-effective, fast responses to basic commands like "turn on the lights" or "what's the temperature?"

**General home automation**: Use Nova Pro as your default for balanced performance across all tasks.

**Budget-conscious deployment**: Use Nova Micro for most queries, with Nova Pro available for complex requests.

### Testing recommendations

1. Start with **Nova Pro** as your default - it offers the best balance
2. Test with **Nova Micro** for simple queries to evaluate cost savings
3. Monitor token usage and costs in the AWS Billing Console
4. Adjust based on your specific needs and budget

## Adding additional agents

To add more conversation agents or AI task entities:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}.
2. Find the **AWS Bedrock** integration.
3. Select the integration entry.
4. Select **Add Conversation Agent** or **Add AI Task**.
5. Configure the new entity.
6. Select **Submit**.

## Troubleshooting

### Invalid authentication

**Symptom**: "Invalid AWS credentials" error or authentication failure during setup

**Solution**:

- Verify your Access Key ID and Secret Access Key are correctly entered without extra spaces
- Ensure your IAM user or role has the required Amazon Bedrock permissions (`bedrock:InvokeModel`, `bedrock:Converse`, `bedrock:ListFoundationModels`)
- Check that the credentials are active and haven't been deleted or deactivated in the IAM console
- If using temporary credentials, ensure they haven't expired
- Confirm the IAM user has programmatic access enabled (not just console access)
- Try using the AWS managed policy `AmazonBedrockFullAccess` for troubleshooting

To verify your credentials are working, you can test them using the AWS <abbr title="Command Line Interface">CLI</abbr>:

```bash
aws bedrock list-foundation-models --region us-east-1
```

### Model access denied

**Symptom**: Model-specific access errors such as "AccessDeniedException" or "ResourceNotFoundException" when trying to use a model

**Solution**:

- Verify the model is available in your selected AWS region by checking the [supported models documentation](https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html)
- Ensure your IAM user has the required Bedrock permissions (`bedrock:InvokeModel`, `bedrock:Converse`)
- Check that you're using the correct model ID format (for example, `amazon.nova-pro-v1:0`)
- Try a major region like `us-east-1` or `us-west-2` which have the broadest model support

### Cannot connect to AWS Bedrock

**Symptom**: Connection timeouts, network errors, or "Unable to reach AWS Bedrock" messages

**Solution**:

- Verify your internet connection is working and can reach AWS services
- Check that your firewall or network security groups allow outbound HTTPS (port 443) connections to AWS
- Ensure AWS Bedrock is available in your selected region (check the [regions documentation](https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html))
- Try switching to a major region with broad model support:
  - `us-east-1` (US East - N. Virginia)
  - `us-west-2` (US West - Oregon)
  - `eu-central-1` (Europe - Frankfurt)
- If running Home Assistant in a container or isolated environment, ensure it can access external networks
- Check AWS service health at the [AWS Service Health Dashboard](https://health.aws.amazon.com/health/status)
- Verify your <abbr title="Domain Name System">DNS</abbr> can resolve `*.amazonaws.com` domains

### Tool use issues

**Symptom**: Model not using tools correctly or not controlling devices

**Solution**:

- Ensure you're using a supported Amazon Nova model (all three support tool use)
- Verify entities are [exposed](/voice_control/voice_remote_expose_devices/) to the conversation agent
- Check that max_tokens is at least 3000 (automatically enforced by the integration for tool use)
- The integration automatically sets temperature to 0 for Nova models when tools are available for optimal performance

### Debug logging

To enable debug logging for troubleshooting, add to your {% term "`configuration.yaml`" %} file:

```yaml
logger:
  default: info
  logs:
    homeassistant.components.aws_bedrock: debug
```

{% include integrations/restart_ha_after_config_inclusion.md %}

## Privacy and security

- **Credentials**: AWS credentials are stored securely in Home Assistant's encrypted storage
- **Data transmission**: All API calls use <abbr title="Hypertext Transfer Protocol Secure">HTTPS</abbr> to communicate with AWS Bedrock
- **Model processing**: Your data is processed according to [AWS Bedrock's data privacy policies](https://aws.amazon.com/bedrock/data-privacy/)
- **Third-party services**: This integration only transmits data to AWS Bedrock

Check AWS Bedrock documentation for current data retention and privacy policies.

## Best practices

### Prompt engineering

- Customize the instruction template for your specific use case
- Be specific about desired response formats
- Include relevant context about your home setup
- Test prompts with simple queries before complex ones

### Model selection

- Use Nova Micro for simple queries to reduce costs
- Use Nova Pro for balanced performance across most tasks
- Consider both capability and cost when choosing models

### Security

- Regularly rotate AWS credentials
- Use IAM policies to limit Bedrock access to specific models if needed
- Monitor AWS CloudTrail for API usage
- Don't share your configuration files containing credentials

## Removing the integration

To remove the AWS Bedrock integration from Home Assistant:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}.
2. Find the **AWS Bedrock** integration card.
3. Select the three-dot menu {% icon "mdi:dots-vertical" %} on the integration card.
4. Select **Delete**.
5. Confirm the deletion when prompted.

This will:

- Remove all conversation agents and AI task entities created by the integration
- Delete the stored AWS credentials from Home Assistant
- Remove all integration configuration data

{% important %}
Removing the integration does not:

- Delete or disable your AWS IAM credentials (they remain active in AWS)
- Remove any AWS Bedrock model access permissions
- Cancel any AWS Bedrock charges or subscriptions

If you want to fully discontinue using AWS Bedrock:

1. Delete or deactivate the IAM access keys in the [AWS IAM console](https://console.aws.amazon.com/iam/)
2. Review and adjust IAM policies to remove Bedrock permissions if no longer needed
3. Monitor your [AWS Billing Console](https://console.aws.amazon.com/billing/) to ensure no further charges occur
   {% endimportant %}

### Re-adding the integration

If you remove the integration and later want to add it back:

1. Your AWS credentials remain valid (unless you deleted them in AWS)
2. You'll need to re-enter your AWS Access Key ID, Secret Access Key, and Region
3. All previous conversation agents and AI task entities will need to be reconfigured
4. Conversation history is not preserved

## Related topics

- [Exposing entities to Assist](/voice_control/voice_remote_expose_devices/)
- [Creating an AI personality](/voice_control/assist_create_open_ai_personality/)
- [AWS Bedrock](https://aws.amazon.com/bedrock/)
- [AWS Bedrock documentation](https://docs.aws.amazon.com/bedrock/)
