---
title: Send sound
action: alexa_devices.send_sound
domain: alexa_devices
description: "Plays one of the built-in Alexa sounds on a device."
related_actions:
  - action: alexa_devices.send_text_command
  - action: alexa_devices.send_info_skill
---

With this action, you can play one of the built-in Alexa sounds on a device, such as a doorbell chime, a barking dog, or a trumpet. It is a quick way to add an audible alert to your automations.

The available sounds come from Amazon's sound library. In the UI, you can pick one from a list. If you need more sounds or richer audio, use the {% term notify %} entities with [advanced markup](/integrations/alexa_devices/#notifications) instead.

{% include actions/ui_header.md %}

To use this action in an automation or script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Alexa Devices: Send sound**.
6. Select the device that should play the sound.
7. In the **Alexa Skill sound file** field, choose the sound you want to play.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Device:
  description: The Alexa device that should play the sound.
Alexa Skill sound file:
  description: The sound to play, chosen from the list of built-in Alexa sounds.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `alexa_devices.send_sound`. A basic example looks like this:

{% example %}
action: |
  action: alexa_devices.send_sound
  data:
    device_id: 037d79c1af96c67ba57ebcae560fb18e
    sound: amzn_sfx_doorbell_chime_01
{% endexample %}

This plays a doorbell chime on the selected Alexa device.

### Options in YAML

{% options_yaml %}
device_id:
  description: The ID of the Alexa device that should play the sound.
  required: true
  type: string
sound:
  description: >
    The identifier of the sound to play, for example `amzn_sfx_doorbell_chime_01`. The UI lists the available sounds with friendly names.
  required: true
  type: string
{% endoptions_yaml %}

## Good to know

- Only the sounds from Amazon's built-in library are supported. For other audio or speech, use the {% term notify %} entities with [advanced markup](/integrations/alexa_devices/#notifications).

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: play a doorbell sound when motion is detected

Play a doorbell chime on an Alexa device when a camera detects motion at your front door.

- **Trigger**: State: Front door motion sensor changes to _on_
- **Action**: Alexa Devices: Send sound

{% details "YAML example for a doorbell sound on motion" %}

{% example %}
automation: |
  alias: "Doorbell sound on front door motion"
  triggers:
    - trigger: state
      entity_id: binary_sensor.front_door_motion
      to: "on"
  actions:
    - action: alexa_devices.send_sound
      data:
        device_id: 037d79c1af96c67ba57ebcae560fb18e
        sound: amzn_sfx_doorbell_chime_01
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
