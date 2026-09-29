---
title: "Announce on satellite"
action: assist_satellite.announce
domain: assist_satellite
description: "Announces a message on an Assist satellite."
related_actions:
  - assist_satellite.start_conversation
  - assist_satellite.ask_question
---

Use this action to announce a message on an Assist satellite, for example to let the house know dinner is ready.

If you provide text, the satellite converts it to audio using the [text-to-speech](/integrations/tts/) system of its configured [pipeline](/voice_control/voice_remote_local_assistant/). You can also provide a media ID to play your own audio instead.

{% include actions/ui_header.md %}

To make an announcement from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the satellite you want to announce on.
6. From the actions shown for that target, select **Announce on satellite**.
7. Set the **Message** you want to announce, or a **Media ID**, and any other options.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Message:
  description: The message to announce. The satellite reads it out using text-to-speech.
  required: false
Media ID:
  description: A media ID to announce instead of using text-to-speech.
  required: false
Preannounce:
  description: Play a sound before the announcement. Turned on by default.
  required: false
Preannounce media ID:
  description: A custom media ID to play before the announcement instead of the default chime.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `assist_satellite.announce`. A basic example looks like this:

{% example %}
action: |
  action: assist_satellite.announce
  target:
    entity_id: assist_satellite.kitchen
  data:
    message: Dinner is ready!
{% endexample %}

This announces a message on `assist_satellite.kitchen`.

### Options in YAML

{% options_yaml %}
message:
  description: The message to announce. The satellite reads it out using text-to-speech.
  required: false
  type: string
media_id:
  description: A media ID to announce instead of using text-to-speech.
  required: false
  type: string
preannounce:
  description: Play a sound before the announcement.
  required: false
  type: boolean
  default: true
preannounce_media_id:
  description: A custom media ID to play before the announcement instead of the default chime.
  required: false
  type: string
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- Provide either a message or a media ID. A message is read out with text-to-speech, while a media ID plays your own audio.
- A chime plays before the announcement by default. To use your own sound, set a preannounce media ID. To turn the chime off, set preannounce to `false`.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: announce when the laundry is done

When the washing machine finishes, announce it on the kitchen satellite.

- **Trigger**: Washing machine power drops to idle
- **Action**: Announce on satellite
  - **Target**: Kitchen satellite
  - **Message**: The laundry is done

{% details "Show example YAML" %}

{% example %}
automation: |
  alias: "Announce when the laundry is done"
  triggers:
    - trigger: state
      entity_id: sensor.washing_machine_status
      to: idle
  actions:
    - action: assist_satellite.announce
      target:
        entity_id: assist_satellite.kitchen
      data:
        message: The laundry is done
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
