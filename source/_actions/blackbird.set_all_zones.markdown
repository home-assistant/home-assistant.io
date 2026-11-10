---
title: "Set all zones"
action: blackbird.set_all_zones
domain: blackbird
description: "Sets every zone on the Blackbird matrix switch to the same input source at once."
---

Use this action to switch every zone on your Monoprice Blackbird matrix switch to the same input source in one step. This is handy when you want all the TVs in your home to show the same source, for example to play one video feed everywhere.

This action always updates every zone. Any entity or target you select is ignored, so there is no need to pick a specific zone.

{% include actions/ui_header.md %}

To set all zones to the same source from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Monoprice Blackbird Matrix Switch: Set all zones**.
6. In the **Source** field, enter the name of the source to activate. This is one of the source names you defined in your configuration.
7. Select **Save**.

This action does not support targets. In the UI, even if you are prompted to choose an entity, the action always updates every zone.

### Options in the UI

{% options_ui %}
Source:
  description: The name of the source to switch all zones to. This must match one of the source names you defined in your configuration.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `blackbird.set_all_zones`. A basic example looks like this:

{% example %}
action: |
  action: blackbird.set_all_zones
  data:
    source: BluRay
{% endexample %}

This switches every zone to the source named `BluRay`.

### Options in YAML

{% options_yaml %}
source:
  description: >
    The name of the source to switch all zones to. This must match one of
    the source names you defined in your configuration.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
