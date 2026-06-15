---
title: "Set scan interval"
action: starline.set_scan_interval
domain: starline
description: "Sets how often Home Assistant fetches StarLine entity updates."
---

Use this action to set how often Home Assistant fetches updates for your StarLine entities.

{% include actions/ui_header.md %}

To set the scan interval from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **StarLine: Set scan interval**.
6. Enter the **Scan interval** in seconds.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Scan interval:
  description: How often to fetch updates, in seconds. Must be between 10 and 86400.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `starline.set_scan_interval`. A basic example looks like this:

{% example %}
action: |
  action: starline.set_scan_interval
  data:
    scan_interval: 180
{% endexample %}

This fetches StarLine entity updates every three minutes.

### Options in YAML

{% options_yaml %}
scan_interval:
  description: >
    How often to fetch updates, in seconds. Must be between 10 and 86400.
  required: true
  type: integer
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
