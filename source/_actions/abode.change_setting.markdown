---
title: "Change setting"
action: abode.change_setting
domain: abode
description: "Changes a setting on your Abode system."
related_actions:
  - abode.capture_image
  - abode.trigger_automation
---

The **Change setting** action changes a setting on your Abode system.

For a full list of settings and valid values, see the [`jaraco.abode` settings section](https://github.com/jaraco/jaraco.abode/blob/main/README.rst#settings).

{% include actions/ui_header.md %}

To change a setting from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Abode: Change setting**.
6. Enter the **Setting** to change and its new **Value**.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Setting:
  description: The setting to change.
  required: true
Value:
  description: The value to change the setting to.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `abode.change_setting`. A basic example looks like this:

{% example %}
action: |
  action: abode.change_setting
  data:
    setting: "beeper_mute"
    value: "1"
{% endexample %}

This changes the `beeper_mute` setting to `1`.

### Options in YAML

{% options_yaml %}
setting:
  description: The setting to change.
  required: true
  type: string
value:
  description: The value to change the setting to.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
