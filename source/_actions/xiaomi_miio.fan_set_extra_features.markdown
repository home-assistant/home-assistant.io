---
title: "Fan set extra features"
action: xiaomi_miio.fan_set_extra_features
domain: xiaomi_miio
description: "Sets a storage register that unlocks extra features in the Mi Home app."
related_actions:
  - xiaomi_miio.fan_reset_filter
---

The **Fan set extra features** action writes a storage register on a Xiaomi air purifier that advertises extra features. The Mi Home app reads this value. Setting it to `1` unlocks a feature called turbo mode in the app.

{% include actions/ui_header.md %}

To set the extra features from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Xiaomi Home: Fan set extra features**.
6. Enter the **Features** value.
7. Select **Save**.

This action does not support targets. In the UI, use the **Entity ID** field to choose which Xiaomi air purifier to act on. If you leave it empty, the action applies to all of them.

### Options in the UI

{% options_ui %}
Entity ID:
  description: The Xiaomi air purifier to act on. If you leave this empty, all of them are affected.
Features:
  description: "The features value to write. Known values are 0 (default) and 1 (turbo mode)."
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `xiaomi_miio.fan_set_extra_features`. A basic example looks like this:

{% example %}
action: |
  action: xiaomi_miio.fan_set_extra_features
  data:
    entity_id: fan.air_purifier
    features: 1
{% endexample %}

This unlocks turbo mode in the Mi Home app for `fan.air_purifier`.

### Options in YAML

{% options_yaml %}
entity_id:
  description: The Xiaomi air purifier to act on. If you leave this out, all of them are affected.
  required: false
  type: [string, list]
features:
  description: "The features value to write. Known values are 0 (default) and 1 (turbo mode)."
  required: true
  type: integer
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
