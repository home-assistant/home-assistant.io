---
title: "Refresh values"
action: zwave_js.refresh_value
domain: zwave_js
description: "Forces a refresh of the values of a Z-Wave entity."
---

Use this action to force a refresh of the values of one or more Z-Wave entities. This is handy when you suspect an entity's state is stale and want Home Assistant to ask the device for its current value.

This action generates extra traffic on your Z-Wave network, so use it sparingly. Updates from battery-powered devices may take some time to arrive, since the device only responds when it next wakes up.

{% include actions/ui_header.md %}

To refresh values from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the list of actions, search for and select **Refresh values**.
6. Select the Z-Wave entities to refresh.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Entities:
  description: The entity, or entities, to refresh.
Refresh all values:
  description: When on, refreshes all watched values. When off, only the primary value is refreshed. Defaults to off.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `zwave_js.refresh_value`. A basic example looks like this:

{% example %}
action: |
  action: zwave_js.refresh_value
  target:
    entity_id: sensor.family_room_motion
{% endexample %}

### Options in YAML

{% options_yaml %}
entity_id:
  description: The entity ID, or list of entity IDs, to refresh.
  required: true
  type: [string, list]
refresh_all_values:
  description: When true, refreshes all watched values. When false, only the primary value is refreshed.
  required: false
  type: boolean
  default: false
{% endoptions_yaml %}

## Good to know

- This action generates extra Z-Wave traffic. Use it sparingly rather than on a frequent schedule.

{% include actions/stuck.md %}

{% include actions/related.md %}
