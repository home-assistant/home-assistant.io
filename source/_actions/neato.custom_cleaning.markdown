---
title: "Custom cleaning"
action: neato.custom_cleaning
domain: neato
description: "Starts a custom cleaning run on a Neato Botvac."
---

Use this action to start a custom cleaning run on your Neato Botvac from an automation or a script. You can set the same options as in the Neato app, such as the cleaning mode, navigation mode, map usage, and a specific zone to clean.

{% include actions/ui_header.md %}

To start a custom cleaning run from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Neato Botvac you want to start.
6. From the actions shown for that target, select **Neato: Custom cleaning**.
7. Optionally, set the **Mode**, **Navigation**, **Category**, and **Zone** options.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Mode:
  description: "The cleaning mode: `1` for eco or `2` for turbo. Defaults to turbo."
  required: false
Navigation:
  description: "The navigation mode: `1` for normal, `2` for extra care, or `3` for deep. Defaults to normal. Deep cleaning is only supported on the Botvac D7."
  required: false
Category:
  description: "Whether to use a persistent map for cleaning (the No-Go lines): `2` for no map or `4` for map. Defaults to using a map, and falls back to no map when none is found."
  required: false
Zone:
  description: The name of the zone to clean, as set in the Neato app. Defaults to cleaning the whole house. Only supported on the Botvac D7.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `neato.custom_cleaning`. A basic example looks like this:

{% example %}
action: |
  action: neato.custom_cleaning
  target:
    entity_id: vacuum.neato
  data:
    mode: 2
    navigation: 1
{% endexample %}

This starts a turbo cleaning run with normal navigation.

### Options in YAML

{% options_yaml %}
mode:
  description: "The cleaning mode: `1` for eco or `2` for turbo."
  required: false
  type: integer
  default: 2
navigation:
  description: "The navigation mode: `1` for normal, `2` for extra care, or `3` for deep. Deep cleaning is only supported on the Botvac D7."
  required: false
  type: integer
  default: 1
category:
  description: "Whether to use a persistent map for cleaning (the No-Go lines): `2` for no map or `4` for map. Falls back to no map when none is found."
  required: false
  type: integer
  default: 4
zone:
  description: The name of the zone to clean, as set in the Neato app. Defaults to cleaning the whole house. Only supported on the Botvac D7.
  required: false
  type: string
{% endoptions_yaml %}

{% include actions/targets.md domain="vacuum" %}

## Good to know

- Not all Botvac models support every option. Only the Neato Botvac D7 supports the `zone` option and deep navigation.
- Use unique names for your zones in the Neato app to avoid starting the wrong zone.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
