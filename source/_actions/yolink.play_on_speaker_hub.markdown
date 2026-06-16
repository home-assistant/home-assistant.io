---
title: "Play on SpeakerHub"
action: yolink.play_on_speaker_hub
domain: yolink
description: "Converts text to speech for playback on a YoLink SpeakerHub."
---

The **Play on SpeakerHub** action converts a text message to speech and plays it on a YoLink SpeakerHub. You can optionally play a tone first, set the volume for this message, and repeat the message.

{% include actions/ui_header.md %}

To play a message from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **YoLink: Play on SpeakerHub**.
6. Select the **SpeakerHub device** to play the message on.
7. Enter the **Text message** to play.
8. Optionally, set a **Tone**, **Volume**, and **Repeat** count.
9. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label. You select the SpeakerHub through the **SpeakerHub device** option instead.

### Options in the UI

{% options_ui %}
SpeakerHub device:
  description: The SpeakerHub device to play the message on.
  required: true
Text message:
  description: The text message to play.
  required: true
Tone:
  description: The tone to play before the message.
  required: false
Volume:
  description: The volume for this message only, between 0 and 15.
  required: false
Repeat:
  description: The number of times to repeat the message, between 0 and 10.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `yolink.play_on_speaker_hub`:

{% example %}
action: |
  action: yolink.play_on_speaker_hub
  data:
    target_device: 12a34b56c7d8ef9ghijklm0n1op2345q
    message: "The front door is open"
    tone: "alert"
    volume: 8
    repeat: 1
{% endexample %}

This plays an alert tone followed by the message on the selected SpeakerHub.

### Options in YAML

{% options_yaml %}
target_device:
  description: The device ID of the SpeakerHub to play the message on.
  required: true
  type: string
message:
  description: The text message to play.
  required: true
  type: string
tone:
  description: >
    The tone to play before the message. One of `emergency`, `alert`, `warn`,
    or `tip`.
  required: false
  type: string
  default: tip
volume:
  description: The volume for this message only, between 0 and 15.
  required: false
  type: integer
  default: 8
repeat:
  description: The number of times to repeat the message, between 0 and 10.
  required: false
  type: integer
  default: 0
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: Announce when a door is left open

This automation plays a spoken alert on your YoLink SpeakerHub when the front door stays open for more than two minutes.

- Trigger: the front door sensor stays open for 2 minutes
- Action: play a message on the SpeakerHub
  - SpeakerHub device: your SpeakerHub
  - Text message: "The front door is open"
  - Tone: `alert`

{% details "Show example YAML" %}

{% example %}
automation: |
  alias: "Announce front door left open"
  triggers:
    - trigger: state
      entity_id: binary_sensor.front_door
      to: "on"
      for:
        minutes: 2
  actions:
    - action: yolink.play_on_speaker_hub
      data:
        target_device: 12a34b56c7d8ef9ghijklm0n1op2345q
        message: "The front door is open"
        tone: "alert"
        volume: 8
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
