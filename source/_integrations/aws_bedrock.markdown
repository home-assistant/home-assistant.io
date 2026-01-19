---
title: AWS Bedrock
description: Instructions on how to integrate AWS Bedrock foundation models as a conversation agent and AI task
ha_category:
  - AI
  - Voice
ha_release: 2026.1.2
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@jflatten'
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

The **AWS Bedrock** {% term integration %} adds conversation agents and AI task entities powered by [Amazon Bedrock](https://aws.amazon.com/bedrock/) foundation models in Home Assistant. AWS Bedrock provides access to multiple AI models from providers including Anthropic Claude, Amazon Nova, Meta Llama, Mistral, and more.  You can use this to control your lights using natural voice commands powered by Claude or Nova models

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

Your IAM user or role needs the following permissions:

#### Amazon Bedrock permissions

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "bedrock:InvokeModel",
        "bedrock:InvokeModelWithResponseStream",
        "bedrock:Converse",
        "bedrock:ConverseStream",
        "bedrock:ListFoundationModels"
      ],
      "Resource": "*"
    }
  ]
}
```

#### AWS Marketplace permissions

AWS Marketplace permissions are required for initial model access. Once a model is enabled in your account, these permissions are no longer needed for using the model.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "aws-marketplace:ViewSubscriptions",
        "aws-marketplace:Subscribe"
      ],
      "Resource": "*"
    }
  ]
}
```

Alternatively, you can use the AWS managed policy `AmazonBedrockFullAccess`, which includes all necessary permissions.

### Model access

As of June 15, 2025, access to all Amazon Bedrock foundation models is enabled by default with the correct AWS Marketplace permissions in all commercial AWS regions. The integration will automatically enable model access when you first use a model.

{% note %}
For Anthropic Claude models, first-time users may need to submit use case details before accessing the model. This is a one-time requirement per AWS account or organization. The integration will guide you through this process if needed.
{% endnote %}

### Supported AWS regions

AWS Bedrock is available in multiple regions worldwide. The most commonly used regions with broad model support include:

- `us-east-1` (US East - N. Virginia) - Widest model selection
- `us-west-2` (US West - Oregon) - Comprehensive model support
- `eu-west-1` (Europe - Ireland)
- `eu-central-1` (Europe - Frankfurt)
- `ap-northeast-1` (Asia Pacific - Tokyo)
- `ap-southeast-1` (Asia Pacific - Singapore)
- `ap-southeast-2` (Asia Pacific - Sydney)

Model availability varies by region. For example:

- Amazon Nova Pro and Nova Lite are available in most regions through cross-region inference profiles
- Anthropic Claude models are available in `us-east-1`, `us-west-2`, `eu-central-1`, and other major regions
- Some specialized models are only available in specific regions

For the most current list of regions and model availability, see the [AWS Bedrock regions and models documentation](https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html).

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
Control Home Assistant:
  description: If the model is allowed to interact with Home Assistant. It can only control or provide information about entities that are [exposed](/voice_control/voice_remote_expose_devices/) to it.
Recommended settings:
  description: If enabled, the recommended model and settings are chosen.
{% endconfiguration_basic %}

If you choose not to use the recommended settings, you can configure the following options:

{% configuration_basic %}
Model:
  description: The foundation model to use for generating responses. Available models depend on your region and enabled model access. The default is `amazon.nova-pro-v1:0`.
Maximum Tokens to Return in Response:
  description: The maximum number of tokens to generate in the response. Different models have different maximum values. For tool use, a minimum of 3000 tokens is recommended and automatically enforced by the integration.
Temperature:
  description: Controls randomness in responses. Use values closer to `0` for more deterministic responses and closer to `1` for more creative responses. For Amazon Nova models with tool use enabled, temperature is automatically set to `0` for optimal performance.
Enable web search:
  description: If enabled, the AI can search Google for current information beyond its training data. Requires Google Custom Search API credentials.
Google API Key:
  description: Your Google Custom Search API key. Required if web search is enabled.
Google Custom Search Engine ID:
  description: Your Google Custom Search Engine ID. Required if web search is enabled.
{% endconfiguration_basic %}

### AI task configuration

AI task entities support the same configuration options as conversation agents but are optimized for generating structured data following specific schemas.

## Available models

The integration automatically fetches available models from your AWS Bedrock account based on your region and model access. Only models that support the Converse API with tool use (function calling) are displayed in the integration's configuration options.

### Supported model families

The following model families support tool use and work with this integration:

#### Amazon Nova models

Amazon Nova is a family of multimodal models built by Amazon:

- **Nova Micro** (`amazon.nova-micro-v1:0`) - Fastest, most cost-effective, text-only
- **Nova Lite** (`amazon.nova-lite-v1:0`) - Fast and affordable, supports text, image, and video understanding
- **Nova Pro** (`amazon.nova-pro-v1:0`) - Balanced performance and cost, supports text, image, and video understanding
- **Nova Premier** (`amazon.nova-premier-v1:0`) - Most capable, supports text, image, and video understanding

Nova models are optimized for conversational AI and support streaming responses. They handle multimodal inputs including text, images, and video.

#### Anthropic Claude models

Anthropic Claude models excel at complex reasoning and analysis:

- **Claude 3.5 Sonnet** (`anthropic.claude-3-5-sonnet-*`) - Best balance of intelligence and speed
- **Claude 3 Opus** (`anthropic.claude-3-opus-*`) - Most capable for complex tasks
- **Claude 3 Sonnet** (`anthropic.claude-3-sonnet-*`) - Strong performance, faster responses
- **Claude 3 Haiku** (`anthropic.claude-3-haiku-*`) - Fast and cost-effective

Claude models support <abbr title="Extensible Markup Language">XML</abbr> tags for structured prompts and can process PDF documents with citations. They support both text and image inputs (vision).

#### Other supported models

Additional model families that support tool use:

- **AI21 Jamba** - Jamba 1.5 Large and Jamba 1.5 Mini
- **Cohere Command R** - Command R and Command R+
- **Meta Llama** - Llama 3.1+, Llama 3.2 (11B, 90B), Llama 4+
- **Mistral AI** - Mistral Large, Small, Mixtral, Pixtral Large
- **Writer Palmyra** - x4, x5 variants

{% note %}
Model availability varies by AWS region. For the complete list of models available in your region, see the [AWS Bedrock models documentation](https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html).
{% endnote %}

The integration automatically configures cross-region inference profiles for models when available in your region, providing improved availability and throughput.

## Web search capability

When web search is enabled, the AI can:

- Search Google for current information
- Fetch and analyze web page content
- Access information beyond its training data cutoff

### Prerequisites for web search

To enable web search, you need:

1. **Google Cloud account** with billing enabled
2. **Custom Search API** enabled in Google Cloud Console
3. **API key** from Google Cloud Console
4. **Programmable Search Engine** configured to search the entire web

To create a Programmable Search Engine:

1. Visit [programmablesearchengine.google.com](https://programmablesearchengine.google.com).
2. Create a new search engine.
3. Configure it to **Search the entire web**.
4. Copy the Search Engine ID.

### How web search works

When you ask a question that requires current information:

1. The AI searches Google with relevant keywords.
2. It reviews search results to identify the most relevant sources.
3. It fetches detailed content from selected web pages.
4. It synthesizes the information to answer your question.

Web content is limited to 8000 characters per page for processing.

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

When configured with the Home Assistant Assist API and entities are exposed, the conversation agent can:

- Control lights, switches, and other devices
- Query sensor states and history
- Execute actions
- Read and modify schedules
- Manage shopping lists and to-do items

The AI automatically calls the appropriate tools to fulfill your requests. Tool execution is limited to 10 iterations per conversation turn to prevent infinite loops.

## Attachment support

Vision-enabled models can process:

- **Images**: JPEG, PNG, GIF, WebP formats
- **PDF documents**: Full <abbr title="Portable Document Format">PDF</abbr> document analysis

Attachments are automatically converted to the format required by AWS Bedrock.

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

### For home automation and voice assistants

#### Recommended: Amazon Nova Pro

- **Best for**: Most home automation tasks, voice control, natural conversation
- **Strengths**: Multimodal support (text, images, video), fast responses, cost-effective
- **Use when**: You need reliable tool use, image understanding (for camera feeds), and balanced performance
- **Model ID**: `amazon.nova-pro-v1:0`

#### Budget-friendly: Amazon Nova Lite or Nova Micro

- **Nova Lite**: Good for image understanding with lower costs
- **Nova Micro**: Best for text-only interactions, fastest and most affordable
- **Use when**: You have simple queries, want to minimize costs, or don't need vision capabilities
- **Model IDs**: `amazon.nova-lite-v1:0`, `amazon.nova-micro-v1:0`

#### Advanced reasoning: Claude 3.5 Sonnet

- **Best for**: Complex home automation logic, multi-step reasoning, detailed analysis
- **Strengths**: Superior reasoning, nuanced understanding, excellent at following complex instructions
- **Use when**: You need sophisticated decision-making or natural language understanding
- **Model ID**: `anthropic.claude-3-5-sonnet-20241022-v2:0`

### Key selection factors

#### Performance considerations

- **Speed**: Nova Micro > Nova Lite > Nova Pro > Claude Haiku > Claude Sonnet > Claude Opus
- **Intelligence**: Claude Opus > Claude Sonnet > Nova Premier > Nova Pro > Nova Lite > Nova Micro
- **Cost**: Nova Micro < Nova Lite < Nova Pro < Claude Haiku < Claude Sonnet < Claude Opus

#### Capability differences

**Multimodal support (vision)**:

- **Nova Pro, Nova Lite, Nova Premier**: Support text, images, and video
- **Claude 3.5 Sonnet, Claude 3 Opus/Sonnet/Haiku**: Support text and images
- **Nova Micro**: Text only

**Best for tool use**:

- Amazon Nova models are optimized for tool calling with temperature automatically set to 0
- Claude models require manual temperature adjustment for optimal tool use

**Context window**:

- Nova models: Up to 300K tokens input
- Claude 3.5 Sonnet: Up to 200K tokens input
- Larger context windows allow processing more conversation history or longer documents

### Use case examples

**Simple voice commands**: Use Nova Micro or Nova Lite for cost-effective, fast responses to basic commands like "turn on the lights" or "what's the temperature?"

**Camera analysis**: Use Nova Pro or Nova Lite for analyzing camera feeds, detecting people or objects, or answering questions about images.

**Complex automation**: Use Claude 3.5 Sonnet or Nova Pro when creating sophisticated automations that require multi-step reasoning or understanding complex scenarios.

**Budget-conscious deployment**: Use Nova Micro for most queries, with Nova Pro or Claude Sonnet available for complex requests.

**Enterprise/production**: Use Nova Pro as the default with Nova Premier for critical or complex tasks.

### Testing recommendations

1. Start with **Nova Pro** as your default - it offers the best balance
2. Test with **Nova Micro** for simple queries to evaluate cost savings
3. Try **Claude 3.5 Sonnet** for complex scenarios requiring advanced reasoning
4. Monitor token usage and costs in the AWS Billing Console
5. Adjust based on your specific needs and budget

For detailed model specifications and current pricing, see:

- [AWS Bedrock models documentation](https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html)
- [AWS Bedrock pricing](https://aws.amazon.com/bedrock/pricing/)
- [Amazon Nova models guide](https://docs.aws.amazon.com/nova/latest/userguide/what-is-nova.html)
- [Anthropic Claude documentation](https://docs.anthropic.com/en/docs/welcome)

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
- Verify your IAM user or role has AWS Marketplace permissions (`aws-marketplace:ViewSubscriptions`, `aws-marketplace:Subscribe`)
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
- For Anthropic Claude models, you may need to submit use case details through the AWS Bedrock console on first use. This is a one-time requirement that provides immediate access after submission.
- Ensure your IAM user has the `aws-marketplace:Subscribe` permission for first-time model access
- If you previously denied marketplace permissions, someone with those permissions must enable the model once for your account
- Check that you're using the correct model ID format (for example, `amazon.nova-pro-v1:0` or `anthropic.claude-3-5-sonnet-20241022-v2:0`)
- Some models may have regional restrictions - try a major region like `us-east-1` or `us-west-2`

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

### Web search not working

**Symptom**: "Google API error" or no search results

**Solution**:

- Verify your Google API Key is valid and active
- Ensure the Custom Search API is enabled in Google Cloud Console
- Check that the Custom Search Engine ID is correct
- Confirm the search engine is configured to search the entire web
- Check that you haven't exceeded Google API usage quotas

### Tool use issues

**Symptom**: Model not using tools correctly or not controlling devices

**Solution**:

- Ensure you're using a model that supports tool use
- Verify entities are [exposed](/voice_control/voice_remote_expose_devices/) to the conversation agent
- Check that max_tokens is at least 3000 (automatically enforced by the integration)
- For Nova models, the integration automatically sets temperature to 0 for optimal tool performance

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
- **Web search**: When enabled, search queries and web content are sent to Google's Custom Search API
- **Third-party services**: This integration only transmits data to AWS and Google (if web search is enabled)

Check AWS Bedrock documentation for current data retention and privacy policies.

## Best practices

### Prompt engineering

- Customize the instruction template for your specific use case
- Be specific about desired response formats
- Include relevant context about your home setup
- Test prompts with simple queries before complex ones

### Model selection

- Use Nova-Micro or Nova-Lite for simple queries to reduce costs
- Use Nova-Pro or Claude-Sonnet for complex reasoning
- Reserve Claude-Opus for the most demanding tasks
- Consider both capability and cost when choosing models

### Web search usage

- Only enable when you need current information
- Be specific in queries that require web search
- Monitor Google API usage to stay within quotas
- Disable when not needed to reduce latency and costs

### Security

- Regularly rotate AWS credentials
- Use IAM policies to limit Bedrock access to specific models
- Monitor AWS CloudTrail for API usage
- Keep Google API keys secure and restricted
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
- Affect any Google Custom Search API keys or configuration

If you want to fully discontinue using AWS Bedrock:

1. Delete or deactivate the IAM access keys in the [AWS IAM console](https://console.aws.amazon.com/iam/)
2. Review and adjust IAM policies to remove Bedrock permissions if no longer needed
3. Monitor your [AWS Billing Console](https://console.aws.amazon.com/billing/) to ensure no further charges occur
4. If you enabled Google Custom Search API solely for this integration, you may want to disable it in the [Google Cloud Console](https://console.cloud.google.com/)
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
