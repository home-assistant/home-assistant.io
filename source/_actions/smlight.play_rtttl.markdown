---
title: "Play RTTTL tone"
action: smlight.play_rtttl
domain: smlight
description: "Play a Ring Tone Text Transfer Language (RTTTL) tone on the built-in buzzer of a SMLIGHT Ultima device."
since: "2026.6"
---

With this action, you can play a melody on the built-in buzzer of SMLIGHT Ultima devices using <abbr title="Ring Tone Text Transfer Language">RTTTL</abbr> — a compact text format for encoding simple tunes. If you want to learn more about the format, refer to [Ring Tone Text Transfer Language](https://en.wikipedia.org/wiki/Ring_Tone_Text_Transfer_Language). You can find and preview example tones using the [RTTTL Player](https://1j01.github.io/rtttl.js/).

Use it to add audible notifications to your automations, like a chime when someone arrives or an alert when a sensor triggers.

If your source tone is a full RTTTL string like `Doorbell:d=4,o=5,b=100:e,c`, split it across the action fields as follows: set `duration` to `4`, `octave` to `5`, `bpm` to `100`, and `notes` to `"e,c"`.

{% include actions/ui_header.md %}

To play a tone from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **SMLIGHT SLZB: Play RTTTL tone**.
6. Select the SMLIGHT Ultima device to play the tone on.
7. Set the **Notes** field to the note sequence you want to play.
8. _Optional_: adjust the **Duration**, **Octave**, and **BPM** to control the default note length, pitch, and tempo.
9. Select **Save**.

### Options in the UI

{% options_ui %}
Device:
  description: The SMLIGHT Ultima device to play the tone on. Supported models include the SLZB-Ultima3 and SLZB-Ultima4.
Duration:
  description: Default note duration shared across all notes that don't specify their own. Valid values are 1, 2, 4, 8, 16, and 32.
  required: false
Octave:
  description: Default octave for notes that don't specify their own. Valid values are 4 to 7.
BPM:
  description: Tempo of the tone in beats per minute.
  required: false
Notes:
  description: The note sequence in RTTTL format, for example `8d,8d#,8e,c6`. A leading number sets the duration for that note individually.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `smlight.play_rtttl`. A basic example looks like this:

{% example %}
action: |
  action: smlight.play_rtttl
  data:
    device_id: 1234567890abcdef1234567890abcdef
    octave: 5
    notes: "8e,c"
{% endexample %}

This plays a short two-note tone on the SMLIGHT Ultima device with the given ID.

### Options in YAML

{% options_yaml %}
device_id:
  description: >
    The ID of the SMLIGHT Ultima device to play the tone on. Supported models include the SLZB-Ultima3 and SLZB-Ultima4.
  required: true
  type: string
duration:
  description: >
    Default note duration applied to all notes that don't specify their own duration. Valid values are `1`, `2`, `4`, `8`, `16`, and `32`.
  required: false
  type: integer
  default: 4
octave:
  description: >
    Default octave for notes that don't specify their own. Valid values are `4` to `7`.
  required: true
  type: integer
bpm:
  description: >
    Tempo of the tone in beats per minute.
  required: false
  type: integer
  default: 63
notes:
  description: >
    The note sequence in RTTTL format, for example `8d,8d#,8e,c6`. A leading number sets an individual note duration, so `8d` is an eighth note. Notes without a leading number use the value set in `duration`.
  required: true
  type: string
{% endoptions_yaml %}

## Good to know

- Only SMLIGHT Ultima devices (for example, the SLZB-Ultima3 and SLZB-Ultima4) have a built-in buzzer. This action has no effect on other SLZB models.
- You can preview RTTTL tones before using them in an automation with the [RTTTL Player](https://1j01.github.io/rtttl.js/).

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: play a chime when the front door opens

Play a ding-dong doorbell chime whenever the front door sensor detects the door opening.

- **Trigger**: State: Front door sensor changes to _on_
- **Action**: SMLIGHT SLZB: Play RTTTL tone
  - **Device**: SLZB-Ultima3
  - **Octave**: 5
  - **BPM**: 100
  - **Notes**: `8e,c`

{% details "YAML example for a doorbell chime on door open" %}

{% example %}
automation: |
  alias: "Play chime when front door opens"
  triggers:
    - trigger: state
      entity_id: binary_sensor.front_door
      to: "on"
  actions:
    - action: smlight.play_rtttl
      data:
        device_id: 1234567890abcdef1234567890abcdef
        duration: 4
        octave: 5
        bpm: 100
        notes: "8e,c"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
