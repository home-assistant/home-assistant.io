---
title: "Tag"
trigger: tag
domain: tag
description: "Triggers when a tag is scanned."
related_triggers:
  - event
---

The **Tag** trigger fires when a tag is scanned. Use it to start an automation from an NFC tag, a tag reader, or another integration that fires a tag scan in Home Assistant.

{% include triggers/ui_header.md %}

To create an automation from a tag:

1. Go to **Settings** > **Tags**.
2. Open the actions menu for the tag you want to use.
3. Select **Create automation**.

To use this trigger in the automation editor:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select the type of trigger to add.
5. Select **Tag**.
6. In **Tag**, select the tag that should start the automation.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Tag:
  description: The tag that starts the automation when scanned.
  required: true
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, use `trigger: tag`. A basic example looks like this:

{% example %}
trigger: |
  trigger: tag
  tag_id: "A7-6B-90-5F"
{% endexample %}

This runs when the tag with the ID `A7-6B-90-5F` is scanned.

To only trigger when the tag is scanned by a specific device or scanner, add `device_id`.

{% example %}
trigger: |
  trigger: tag
  tag_id: "A7-6B-90-5F"
  device_id: 0e19cd3cf2b311ea88f469a7512c307d
{% endexample %}

You can also provide multiple tag IDs or device IDs.

{% example %}
trigger: |
  trigger: tag
  tag_id:
    - "A7-6B-90-5F"
    - "04-B1-C6-62-2F-64-80"
  device_id:
    - 0e19cd3cf2b311ea88f469a7512c307d
    - 1234567890abcdef1234567890abcdef
{% endexample %}

### Options in YAML

{% options_yaml %}
trigger:
  description: The trigger type. For this trigger, use `tag`.
  required: true
  type: string
tag_id:
  description: The ID of the tag to watch. You can use one tag ID or a list of tag IDs.
  required: true
  type: [string, list]
device_id:
  description: The ID of the device or scanner that must scan the tag. You can use one device ID or a list of device IDs. If omitted, any device that scans the tag can start the automation.
  required: false
  type: [string, list]
{% endoptions_yaml %}

## Good to know

- This trigger listens for `tag_scanned` events.
- In YAML, `device_id` limits the trigger to scans from specific devices or scanners.
- The visual editor lets you pick the tag. To limit the trigger by `device_id`, edit the automation in YAML.

{% include triggers/try_it.md %}

For this trigger, scan the tag you selected to test the automation. To inspect tag scan data, open {% my developer_events title="**Settings** > **Tools** > **Events**" %}, select **Listen to events**, and subscribe to `tag_scanned`.

{% include triggers/more_examples.md %}

### Automation: turn on a light when a tag is scanned

Place a tag near an entrance or room and scan it to turn on a light.

- **Trigger**: Tag
  - **Tag**: Entrance tag
- **Action**: Turn on light
  - **Target**: Entry light

{% details "YAML example for turning on a light when a tag is scanned" %}

{% example %}
automation: |
  alias: "Turn on the entry light from a tag"
  triggers:
    - trigger: tag
      tag_id: "A7-6B-90-5F"
  actions:
    - action: light.turn_on
      target:
        entity_id: light.entry
{% endexample %}

{% enddetails %}

### Automation: run an action only when a specific scanner reads the tag

If several devices can scan the same tag, use `device_id` in YAML to run the automation only when a specific scanner reads it.

- **Trigger**: Tag
  - **Tag**: Music tag
  - device_id: 0e19cd3cf2b311ea88f469a7512c307d (add it in YAML)
- **Action**: Turn on switch
  - **Target**: Music player power

{% details "YAML example for running an action from a specific tag scanner" %}

{% example %}
automation: |
  alias: "Turn on music from the living room tag reader"
  triggers:
    - trigger: tag
      tag_id: "A7-6B-90-5F"
      device_id: 0e19cd3cf2b311ea88f469a7512c307d
  actions:
    - action: switch.turn_on
      target:
        entity_id: switch.music_player_power
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
