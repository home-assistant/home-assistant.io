---
title: Device refresh
action: deconz.device_refresh
domain: deconz
description: "Refresh the list of available devices from deCONZ."
related_actions:
  - deconz.configure
  - deconz.remove_orphaned_entries
---

Use this action to refresh the list of devices that deCONZ provides. deCONZ automatically tells Home Assistant when new sensors are added, but some other device types are not signaled automatically. Running this action picks them up without restarting Home Assistant.

{% important %}
Only users with administrator privileges can run this action.
{% endimportant %}

{% include actions/ui_header.md %}

To use this action in an automation or script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **deCONZ: Device refresh**.
6. Fill in the options you want to use.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Bridge identifier:
  description: A unique string for each piece of deCONZ hardware. You can find it as part of the integration name. This is useful if you run multiple deCONZ integrations.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `deconz.device_refresh`. A basic example looks like this:

{% example %}
action: |
  action: deconz.device_refresh
{% endexample %}

This refreshes the available devices on your main deCONZ gateway.

### Options in YAML

{% options_yaml %}
bridgeid:
  description: A unique string for each piece of deCONZ hardware. You can find it as part of the integration name. This is useful if you run multiple deCONZ integrations.
  required: false
  type: string
{% endoptions_yaml %}

## Good to know

- If you do not provide a bridge identifier and you run more than one deCONZ integration, the action uses your main deCONZ gateway.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
