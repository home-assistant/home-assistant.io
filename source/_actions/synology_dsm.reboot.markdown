---
title: "Reboot"
action: synology_dsm.reboot
domain: synology_dsm
description: "Reboots your Synology NAS."
related_actions:
  - synology_dsm.shutdown
---

The **Synology DSM: Reboot** action restarts your Synology NAS.

{% important %}
This action is deprecated and will be removed in a future release. Use the **Restart** button entity of your NAS instead. In an automation or a script, target that entity with the [**Press**](/actions/button.press/) action.
{% endimportant %}

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label. If you have more than one Synology NAS set up, enter the **Serial** of the NAS to reboot.

{% include actions/ui_header.md %}

To reboot your NAS from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Synology DSM: Reboot**.
6. If you have more than one Synology NAS set up, enter the **Serial** of the NAS.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Serial:
  description: The serial number of the NAS to reboot. Required when you have more than one Synology NAS set up.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `synology_dsm.reboot`. A basic example looks like this:

{% example %}
action: |
  action: synology_dsm.reboot
  data:
    serial: "1NDVC86409"
{% endexample %}

This reboots the NAS with serial number `1NDVC86409`.

### Options in YAML

{% options_yaml %}
serial:
  description: >
    The serial number of the NAS to reboot. Required when you have more than one Synology NAS set up.
  required: false
  type: string
{% endoptions_yaml %}

## Good to know

- Only administrators can perform this action.
- Each time this action runs, Home Assistant logs a warning that it is deprecated.
- If you leave out the serial number while more than one NAS is set up, the action fails and the error message lists the serial numbers of your NAS devices.
- While the NAS restarts, its entities are unavailable. They come back automatically once the NAS is running again.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
