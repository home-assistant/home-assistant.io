---
title: "Send RM command"
action: broadlink.send_rm_command
domain: broadlink
description: "Sends a key of an RM child device through its RM MAX gateway."
---

The **Broadlink: Send RM command** action presses a key of an RM child device, such as a TV, fan, or learned IR device, through the `RM MAX` gateway of a [Magic Home family](/integrations/broadlink/#magic-home-families).

Use it for keys that the device entities don't offer. For example, a TV media player has power, volume, and channel controls, but no menu or number keys. With this action, you can press any key that the device has in its imported key list, or any learned key.

{% include actions/ui_header.md %}

To send a key from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Broadlink: Send RM command**.
6. Select the **Device** and enter the **Key**.
7. Select **Save**.

This action does not support targets. Instead, you select the RM child device in the **Device** option.

### Options in the UI

{% options_ui %}
Device:
  description: The RM child device that sends the key.
  required: true
Key:
  description: Name of a key in the device's imported key list, or the name of a learned key, such as `menu`.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `broadlink.send_rm_command`. A basic example looks like this:

{% example %}
action: |
  action: broadlink.send_rm_command
  data:
    device_id: 0123456789abcdef0123456789abcdef
    command: menu
{% endexample %}

This presses the menu key of the selected RM child device.

### Options in YAML

{% options_yaml %}
device_id:
  description: >
    The ID of the RM child device that sends the key.
  required: true
  type: string
command:
  description: >
    Name of a key in the device's imported key list, or the name of a learned
    key. The name is not case-sensitive.
  required: true
  type: string
{% endoptions_yaml %}

## Good to know

- The key names come from the family you imported from the Magic Home app. After you add or rename keys in the app, [reimport the family](/integrations/broadlink/#reimport-a-family).
- The action fails if the device does not have the key. Home Assistant does not send anything in that case.
- IR and RF devices do not report back. The action succeeds when the gateway sends the code, even if the device did not respond to it.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: start the fan timer at bedtime

At bedtime, press the timer key of a fan that is controlled through the RM MAX, so the fan turns off by itself later in the night.

- **Trigger**: Time
  - **At**: 22:30
- **Action**: Broadlink: Send RM command
  - **Device**: Bedroom fan
  - **Key**: `timer`

{% details "YAML example for starting the fan timer at bedtime" %}

{% example %}
automation: |
  alias: "Start the bedroom fan timer"
  triggers:
    - trigger: time
      at: "22:30:00"
  actions:
    - action: broadlink.send_rm_command
      data:
        device_id: 0123456789abcdef0123456789abcdef
        command: timer
{% endexample %}

{% enddetails %}

### Automation: lower the projector screen when the projector turns on

When you turn on the projector from Home Assistant, press a learned key that lowers the projector screen.

- **Trigger**: State changed
  - **Entity**: Projector
  - **To**: On
- **Action**: Broadlink: Send RM command
  - **Device**: Projector screen remote
  - **Key**: `screen down`

{% details "YAML example for lowering the projector screen" %}

{% example %}
automation: |
  alias: "Lower the projector screen"
  triggers:
    - trigger: state
      entity_id: media_player.projector
      to: "on"
  actions:
    - action: broadlink.send_rm_command
      data:
        device_id: 0123456789abcdef0123456789abcdef
        command: screen down
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
