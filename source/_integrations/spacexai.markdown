---
title: SpaceXAI
description: Instructions on how to integrate SpaceXAI (Grok) conversation, AI Task, speech, and Imagine media
ha_category:
  - AI
  - Speech-to-text
  - Text-to-speech
  - Voice
ha_iot_class: Cloud Polling
ha_release: 2026.9
ha_config_flow: true
ha_codeowners:
  - "@jeffglousher"
ha_domain: spacexai
ha_integration_type: service
ha_platforms:
  - ai_task
  - conversation
  - diagnostics
  - stt
  - tts
related:
  - docs: /voice_control/voice_remote_expose_devices/
    title: Exposing entities to Assist
  - docs: /voice_control/assist_create_open_ai_personality/
    title: Create an AI personality
  - docs: /integrations/ai_task/
    title: AI Task
  - docs: /integrations/application_credentials/
    title: Application credentials
  - url: https://console.x.ai/
    title: SpaceXAI console
  - url: https://docs.x.ai/
    title: xAI documentation
  - url: https://x.ai/
    title: SpaceXAI
---

The **SpaceXAI** {% term integration %} adds [Grok](https://x.ai/) to Home Assistant.

Setup creates:

- A [conversation](/integrations/conversation/) agent for Assist and the Assist dialog
- An [AI Task](/integrations/ai_task/) entity for text and Imagine stills
- [Speech-to-text](/integrations/stt/) and [text-to-speech](/integrations/tts/) entities
- Actions that generate Imagine video and copy stills into `/local` for Companion notifications

You sign in with your SpaceXAI account. The integration does not use an API key,
and Home Assistant never sees your password.

To let the conversation agent control Home Assistant, give it a Home Assistant
LLM API. Limit what it can see and control on the
{% my voice_assistants title="exposed entities page" %}.

This integration does not integrate with [sentence triggers](/docs/automation/trigger/#sentence-trigger).

## Prerequisites

- A SpaceXAI account that can use Grok with Home Assistant.
- [Application credentials](/integrations/application_credentials/) for SpaceXAI.
  Add the SpaceXAI OAuth client under
  **{% my application_credentials title="Settings > Devices & services > Application credentials" %}**.

Recommended setup uses **device code** sign-in. That path works on phones and
does not need a Home Assistant redirect URI. Browser sign-in needs an OAuth
client that registers the Home Assistant redirect.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Application credentials:
  description: "The SpaceXAI OAuth client stored under application credentials. Setup opens SpaceXAI so you can sign in."
{% endconfiguration_basic %}

Recommended setup creates a conversation agent, AI Task, speech-to-text, and
text-to-speech with Assist control and Grok 4.6. You can add more agents later
from the {% my integrations title="SpaceXAI integration page" %}.

## Configuration options

The integration provides the following types of subentries:

- [Conversation](/integrations/conversation/)
- [AI Task](/integrations/ai_task/)
- [Speech-to-text (STT)](/integrations/stt/)
- [Text-to-speech (TTS)](/integrations/tts/)

{% configuration_basic %}
Recommended settings:
  description: "If enabled, the recommended chat model and Assist settings are chosen."
Control Home Assistant:
  description: "Which Home Assistant LLM APIs the agent may use. It can only control or provide information about entities that are [exposed](/voice_control/voice_remote_expose_devices/) to it."
Instructions:
  description: "Instructions for how Grok should respond. Written using [Home Assistant Templating](/docs/templating/)."
{% endconfiguration_basic %}

If you turn off recommended settings, you can configure the following options.

{% configuration_basic %}
Model:
  description: "The Grok chat model this agent uses. The list comes from the signed-in account. Grok 4.6 is recommended."
Custom model ID:
  description: "Exact model id, such as grok-4.3, when the account has a model that is not in the picker."
Maximum response tokens:
  description: "Upper limit for one response. Short answers stay short. The conversation default is 3000. AI Task defaults to 8192."
Temperature:
  description: "Sampling temperature (0–2). The default is 1.0."
Top P:
  description: "Nucleus sampling limit (0–1). The default is 1.0."
Processing speed:
  description: "Priority asks SpaceXAI to schedule the request faster. Conversation defaults to Priority. AI Task defaults to Standard."
Store responses on SpaceXAI:
  description: "When enabled, SpaceXAI may keep responses. Leave this off unless you need that history. Home Assistant still stores the Assist chat log either way."
Enable web search:
  description: "Allow Grok to use SpaceXAI server-side web search before answering."
Enable X search:
  description: "Allow Grok to search public posts on X before answering."
Enable code interpreter:
  description: "Allow Grok to run Python on SpaceXAI servers to calculate, analyze, and transform data."
Enable image generation:
  description: "Allow the conversation agent to generate or edit images with Imagine during chat. Off by default. When this is on and Home Assistant control stays on, you must also enable **Allow Home Assistant control with provider tools**."
Image generation action:
  description: "How Grok should use the in-chat image tool. Auto lets the model choose."
Image model:
  description: "Imagine model for in-chat image generation. Imagine 2 is the default. AI Task has its own image model, aspect ratio, and resolution pickers."
Allow Home Assistant control with provider tools:
  description: "Required when Home Assistant control and SpaceXAI provider tools (web search, X search, code interpreter, or image generation) are enabled together."
{% endconfiguration_basic %}

AI Task also has these image options:

{% configuration_basic %}
Image model:
  description: "Imagine model used when an AI Task generates or edits a still. Imagine 2 is the default."
Image aspect ratio:
  description: "Aspect ratio used for AI Task stills."
Image resolution:
  description: "Resolution used for AI Task stills."
{% endconfiguration_basic %}

Text-to-speech subentries have these options:

{% configuration_basic %}
Voice:
  description: "Built-in Grok voice used for synthesis."
Speech speed:
  description: "Playback speed multiplier for synthesized speech."
{% endconfiguration_basic %}

## Supported functionality

Use the conversation agent in an [Assist](/voice_control/) pipeline, or talk to
it from the Assist dialog.

Set it as the conversation agent for a voice assistant under
**{% my voice_assistants title="Settings → Voice assistants" %}**. You can also
follow the [AI personality](/voice_control/assist_create_open_ai_personality/)
guide.

Use the AI Task entity from automations and scripts to generate text or Imagine
stills. Generated stills are stored as Home Assistant media. Provider video URLs
expire, so **Generate video** downloads the finished file into `/local/spacexai`
before that happens.

## Actions

### Action `spacexai.generate_video`

Generate a video with Imagine Video 1.5 and save a local copy under
`/local/spacexai` before the provider URL expires.

{% configuration_basic %}
Config entry:
  description: "The SpaceXAI account to use."
Prompt:
  description: "The text prompt used to generate the video."
Model:
  description: "The Imagine video model. Imagine Video 1.5 is the default."
Image:
  description: "Optional still for image-to-video. Accepts a public https URL, a `/local/` path, or a media-source id from an AI Task image. Home Assistant paths are sent to Imagine as image data."
Duration:
  description: "Requested video duration in seconds (1–15)."
Aspect ratio:
  description: "Optional output aspect ratio. Image-to-video defaults to the still's ratio unless this is set."
Resolution:
  description: "Optional output resolution. 1080p is available on Imagine Video 1.5."
{% endconfiguration_basic %}

The action returns the local filename, path, Companion URL, model, and the
temporary provider URL.

### Action `spacexai.publish_media`

Copy an AI Task still into `/local/spacexai` so a Companion notification can
fetch it. If the filename already exists, a timestamp is appended so earlier
notifications keep their image.

{% configuration_basic %}
Media source:
  description: "Media source id returned by AI Task generate image, such as `media-source://ai_task/image/example.jpg`."
Filename:
  description: "Optional filename under `/local/spacexai`. Defaults to the source name."
{% endconfiguration_basic %}

## Examples

### Send an Imagine still to a phone

```yaml
action: ai_task.generate_image
data:
  task_name: porch still
  instructions: A quiet porch at dawn
  entity_id: ai_task.grok_ai_task
response_variable: still
```

```yaml
action: spacexai.publish_media
data:
  media_source_id: "{{ still.media_source_id }}"
  filename: porch.jpg
response_variable: published
```

```yaml
action: notify.mobile_app_your_phone
data:
  message: Porch still
  data:
    image: "{{ published.path }}"
```

### Generate a short video from a still

```yaml
action: spacexai.generate_video
data:
  config_entry: YOUR_SPACEXAI_ENTRY_ID
  prompt: Slow morning light across the porch
  image_url: "{{ still.media_source_id }}"
  duration: 5
  aspect_ratio: "16:9"
  resolution: 720p
response_variable: video
```

The local file is `{{ video.path }}`. The provider URL in `{{ video.provider_url }}`
is only valid for a short time.

## Data updates

SpaceXAI is contacted when you ask it something, generate media, or synthesize
speech. There is no polling and no background update interval.

## Known limitations

- The signed-in account must be allowed to use Grok this way. If it is not,
  Home Assistant shows a repair and the conversation agents stay unavailable
  until the account can.
- Conversation history stays in Home Assistant. The sign-in requests
  `conversations:read` and `conversations:write`, but this integration does not
  resume provider-side threads.
- If SpaceXAI removes a selected model, Home Assistant shows a repair so you
  can pick another model your account can still use.
- Imagine provider URLs expire. **Generate video** saves a local copy under
  `/local/spacexai`. In-chat image generation does not publish a Companion
  `/local` file by itself; use **Publish media** for phone notifications.
- In-chat image generation is off by default. Turning it on while Assist
  control stays on also requires **Allow Home Assistant control with provider
  tools**.
- Conversation and AI Task each have their own Imagine model picker. Changing
  one does not change the other.
- This integration does not provide realtime speech-to-speech, video edit,
  video extend, or reference-to-video.

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

### A generated video URL stopped working

Use the local path returned by **Generate video** (`/local/spacexai/...`).
The SpaceXAI URL is temporary.

### Image generation is unavailable in chat

Open the conversation agent, turn off recommended settings, enable **Enable
image generation**, and enable **Allow Home Assistant control with provider
tools** if Assist control is also on.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

When you delete the configuration entry, Home Assistant revokes the SpaceXAI
authorization so it no longer appears on your account.
