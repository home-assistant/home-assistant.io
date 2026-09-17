---
title: "Fan reset filter"
action: xiaomi_miio.fan_reset_filter
domain: xiaomi_miio
description: "Resets the filter lifetime and usage of a Xiaomi air purifier."
related_actions:
  - xiaomi_miio.fan_set_extra_features
---

The **Fan reset filter** action resets the filter lifetime and usage counter of a Xiaomi air purifier. Use it after you replace the filter so the remaining filter life is reported correctly again.

{% include actions/ui_header.md %}

To reset the filter from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Xiaomi Home: Fan reset filter**.
6. Select **Save**.

This action does not support targets. In the UI, use the **Entity ID** field to choose which Xiaomi air purifier to reset. If you leave it empty, the action applies to all of them.

### Options in the UI

{% options_ui %}
Entity ID:
  description: The Xiaomi air purifier to reset the filter for. If you leave this empty, all of them are reset.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `xiaomi_miio.fan_reset_filter`. A basic example looks like this:

{% example %}
action: |
  action: xiaomi_miio.fan_reset_filter
  data:
    entity_id: fan.air_purifier
{% endexample %}

This resets the filter counter for `fan.air_purifier`.

### Options in YAML

{% options_yaml %}
entity_id:
  description: The Xiaomi air purifier to reset the filter for. If you leave this out, all of them are reset.
  required: false
  type: [string, list]
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
