---
title: "Set sound setting"
action: songpal.set_sound_setting
domain: songpal
description: "Changes a sound setting on a Sony Songpal device."
---

Use this action to change a sound setting on a Sony Songpal device, such as turning night mode on or off. You provide the name of the setting and the value you want to set.

This is handy in an automation to switch on night mode on your soundbar in the evening so late-night viewing stays quiet, for example.

{% include actions/ui_header.md %}

To change a sound setting from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Songpal device you want to change.
6. From the actions shown for that target, select **Set sound setting**.
7. Enter the **Name** of the setting and the **Value** to set.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Name:
  description: The name of the setting to change.
  required: true
Value:
  description: The value to set.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `songpal.set_sound_setting`. A basic example looks like this:

{% example %}
action: |
  action: songpal.set_sound_setting
  target:
    entity_id: media_player.soundbar
  data:
    name: "nightMode"
    value: "on"
{% endexample %}

This turns on night mode on `media_player.soundbar`.

### Options in YAML

{% options_yaml %}
name:
  description: >
    The name of the setting to change.
  required: true
  type: string
value:
  description: >
    The value to set.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/targets.md domain="media_player" %}

## Good to know

- To list the available settings and their possible values, use the [`songpal sound`](https://github.com/rytilahti/python-songpal#sound-settings) command from the python-songpal library.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: turn on night mode in the evening

In the evening, switch on night mode on your soundbar so late-night viewing stays quiet.

- **Trigger**: Every day at 22:00
- **Action**: Set sound setting
  - **Target**: Soundbar
  - **Name**: nightMode
  - **Value**: on

{% details "YAML example for turning on night mode" %}

{% example %}
automation: |
  alias: "Turn on Songpal night mode"
  triggers:
    - trigger: time
      at: "22:00:00"
  actions:
    - action: songpal.set_sound_setting
      target:
        entity_id: media_player.soundbar
      data:
        name: "nightMode"
        value: "on"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
