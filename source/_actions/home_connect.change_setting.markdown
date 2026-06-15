---
title: "Change setting"
action: home_connect.change_setting
domain: home_connect
description: "Changes a setting on a Home Connect appliance."
related_actions:
  - home_connect.set_program_and_options
  - home_connect.start_selected_program
---

Use this action to change a setting on a Home Connect appliance, for example to turn on the child lock or switch the appliance into a different mode. You pick the appliance, the setting you want to change, and the value to set.

Settings are identified by their Home Connect key, such as `BSH.Common.Setting.ChildLock`. The value can be text, a number, or a toggle, depending on what the setting expects.

{% include actions/ui_header.md %}

To change a setting from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the list of actions, search for and select **Change setting**.
6. Select the appliance you want to change.
7. Enter the key of the setting and the value to set.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Device:
  description: The Home Connect appliance you want to change.
Key:
  description: "The key of the setting to change, such as `BSH.Common.Setting.ChildLock`."
Value:
  description: The value to set for the setting. The accepted value depends on the setting.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `home_connect.change_setting`. A basic example that turns on the child lock looks like this:

{% example %}
action: |
  action: home_connect.change_setting
  data:
    device_id: a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6
    key: "BSH.Common.Setting.ChildLock"
    value: true
{% endexample %}

### Options in YAML

{% options_yaml %}
device_id:
  description: The device ID of the Home Connect appliance you want to change.
  required: true
  type: string
key:
  description: "The key of the setting to change, such as `BSH.Common.Setting.ChildLock`."
  required: true
  type: string
value:
  description: The value to set for the setting. The accepted value depends on the setting.
  required: true
  type: [string, integer, boolean]
{% endoptions_yaml %}

## Good to know

- Which settings you can change depends on your appliance. The Home Connect API does not always match the Home Connect app, so some settings available in the app may not work through Home Assistant.
- The value must match the type the setting expects. A toggle uses `true` or `false`, while other settings expect text or a number.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: lock the appliance controls when you leave home

Turn on the child lock on your oven when everyone leaves, so the controls can't be changed while you're away.

- **Trigger**: Everyone leaves home
- **Action**: Change setting
  - **Key**: `BSH.Common.Setting.ChildLock`
  - **Value**: `true`

{% details "Show example YAML" %}

{% example %}
automation: |
  alias: "Lock the oven controls when away"
  triggers:
    - trigger: state
      entity_id: zone.home
      to: "0"
  actions:
    - action: home_connect.change_setting
      data:
        device_id: a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6
        key: "BSH.Common.Setting.ChildLock"
        value: true
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
