---
title: "Remote learn command"
action: xiaomi_miio.remote_learn_command
domain: xiaomi_miio
description: "Learns an IR command with a Xiaomi IR remote."
related_actions:
  - xiaomi_miio.remote_set_led_on
  - xiaomi_miio.remote_set_led_off
---

The **Remote learn command** action puts a Xiaomi IR remote into learning mode. After you start it, point a physical remote at the device and press a button. The learned command is shown as a notification in Overview, ready to copy into your configuration.

{% include actions/ui_header.md %}

To learn a command from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Xiaomi IR remote you want to control.
6. From the actions shown for that target, select **Remote learn command**.
7. Optionally, set the **Slot** and **Timeout**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Slot:
  description: The storage slot to save the learned IR command in.
Timeout:
  description: How long, in seconds, to wait for a command to be learned before giving up.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `xiaomi_miio.remote_learn_command`. A basic example looks like this:

{% example %}
action: |
  action: xiaomi_miio.remote_learn_command
  target:
    entity_id: remote.xiaomi_miio_remote
  data:
    slot: 1
    timeout: 30
{% endexample %}

This starts learning a command on `remote.xiaomi_miio_remote`, saving it to slot 1, and waits up to 30 seconds.

### Options in YAML

{% options_yaml %}
slot:
  description: The storage slot to save the learned IR command in.
  required: false
  type: integer
  default: 1
timeout:
  description: How long, in seconds, to wait for a command to be learned before giving up.
  required: false
  type: integer
  default: 10
{% endoptions_yaml %}

{% include actions/targets.md domain="remote" %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
