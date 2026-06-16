---
title: "Send command"
action: ps4.send_command
domain: ps4
description: "Emulates a button press on a PlayStation 4."
---

The **Send command** action emulates a button press on your PlayStation 4. It mimics the buttons available in the PS4 Second Screen App. These are not the same as the DualShock 4 controller buttons.

{% include actions/ui_header.md %}

To send a command from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **PlayStation 4: Send command**.
6. Choose the **Entity** and the **Command** you want to send.
7. Select **Save**.

This action does not support targets. In the UI, you choose the PlayStation 4 in the **Entity** field.

### Options in the UI

{% options_ui %}
Entity:
  description: The PlayStation 4 media player entity to send the command to.
  required: true
Command:
  description: "The button to press. One of `ps` (PS button), `ps_hold` (PS button long press), `option`, `enter`, `back`, `up` (swipe up), `down` (swipe down), `left` (swipe left), or `right` (swipe right)."
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `ps4.send_command`. A basic example looks like this:

{% example %}
action: |
  action: ps4.send_command
  data:
    entity_id: media_player.ps4
    command: ps
{% endexample %}

This presses the PS button on the selected PlayStation 4.

### Options in YAML

{% options_yaml %}
entity_id:
  description: >
    The PlayStation 4 media player entity to send the command to.
  required: true
  type: string
command:
  description: >
    The button to press. One of `ps` (PS button), `ps_hold` (PS button
    long press), `option`, `enter`, `back`, `up` (swipe up), `down`
    (swipe down), `left` (swipe left), or `right` (swipe right).
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: Pause playback by pressing the PS button at bedtime

This automation presses the PS button on your PlayStation 4 every night at bedtime, which opens the home screen and pauses whatever is playing.

- Trigger: the time is 11:00 PM
- Action: send the PS button press
  - Entity: the PlayStation 4 media player
  - Command: `ps`

{% details "Show example YAML" %}

{% example %}
automation: |
  alias: "Open PlayStation home screen at bedtime"
  triggers:
    - trigger: time
      at: "23:00:00"
  actions:
    - action: ps4.send_command
      data:
        entity_id: media_player.ps4
        command: ps
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
