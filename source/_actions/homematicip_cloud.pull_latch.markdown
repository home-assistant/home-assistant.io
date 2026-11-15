---
title: "Pull latch"
action: homematicip_cloud.pull_latch
domain: homematicip_cloud
description: "Pulls the latch of a Homematic IP door opener, optionally with the PIN of its access authorization."
related_actions:
  - button.press
  - homematicip_cloud.arm_anyway
---

The **HomematicIP Cloud: Pull latch** action pulls the latch of a Homematic IP door opener (`HmIP-FLC`, `HmIP-FDC`), so the door can be opened. Unlike the door opener button, it can pass the PIN of the access authorization.

{% include actions/ui_header.md %}

To pull the latch from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **HomematicIP Cloud: Pull latch**.
6. Select the **Devices** and, if the access authorization has one, enter the **PIN**.
7. Select **Save**.

This action does not support targets. Instead, you select the door openers through the **Devices** field.

### Options in the UI

{% options_ui %}
Devices:
  description: "The door openers whose latch is pulled."
  required: true
PIN:
  description: "The PIN of the access authorization. Only needed if a PIN is configured for it."
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `homematicip_cloud.pull_latch`. A basic example looks like this:

{% example %}
action: |
  action: homematicip_cloud.pull_latch
  data:
    device_id: 1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d
    pin: "1234"
{% endexample %}

This pulls the latch of the door opener with the given device ID, using the PIN of its access authorization.

### Options in YAML

{% options_yaml %}
device_id:
  description: "The device IDs of the door openers whose latch is pulled."
  required: true
  type: [string, list]
pin:
  description: "The PIN of the access authorization. Only needed if a PIN is configured for it."
  required: false
  type: string
{% endoptions_yaml %}

## Good to know

- Home Assistant must be allowed to control the door opener under **Access Control** in the Homematic IP app.
- The action fails with an error if a selected device is not a door opener, or if the access point refuses the command.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
