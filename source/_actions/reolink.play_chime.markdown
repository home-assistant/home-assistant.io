---
title: "Play chime"
action: reolink.play_chime
domain: reolink
description: "Plays a ringtone on a Reolink Chime."
related_actions:
  - reolink.ptz_move
---

Use this action to play a ringtone on one or more Reolink Chime devices, for example from an automation when motion is detected.

{% include actions/ui_header.md %}

To play a ringtone from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Reolink: Play chime**.
6. Choose the **Target chime** and the **Ringtone** you want to play.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label. You select the chime through the **Target chime** option instead.

### Options in the UI

{% options_ui %}
Target chime:
  description: The Reolink Chime to play the ringtone on.
Ringtone:
  description: The ringtone to play.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `reolink.play_chime`. A basic example looks like this:

{% example %}
action: |
  action: reolink.play_chime
  data:
    device_id:
      - 12a34b56c7d8ef9ghijklm0n1op2345q
    ringtone: operetta
{% endexample %}

This plays the `operetta` ringtone on the selected Reolink Chime.

### Options in YAML

{% options_yaml %}
device_id:
  description: The list of device IDs of the Reolink Chimes to play the ringtone on.
  required: true
  type: list
ringtone:
  description: "The ringtone to play. One of: `citybird`, `originaltune`, `pianokey`, `loop`, `attraction`, `hophop`, `goodday`, `operetta`, `moonlight`, or `waybackhome`."
  required: true
  type: string
{% endoptions_yaml %}

## Good to know

- This action only works with Reolink Chime devices. Other Reolink devices are not shown as a target.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
