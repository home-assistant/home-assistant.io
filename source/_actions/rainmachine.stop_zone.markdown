---
title: "Stop zone"
action: rainmachine.stop_zone
domain: rainmachine
description: "Stops a RainMachine zone."
related_actions:
  - rainmachine.start_zone
  - rainmachine.stop_all
---

The **Stop zone** action stops a single running RainMachine zone. Each zone is represented by a switch entity, and this action turns that zone off.

{% include actions/ui_header.md %}

To stop a zone from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **RainMachine: Stop zone**.
6. Under **Targets**, choose the zone switch entities to stop.
7. Select **Save**.

{% include actions/targets.md domain="switch" %}

### Options in the UI

This action has no additional options. Select the zone switch entities to stop.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `rainmachine.stop_zone`. A basic example looks like this:

{% example %}
action: |
  action: rainmachine.stop_zone
  target:
    entity_id: switch.rainmachine_front_lawn
{% endexample %}

### Options in YAML

This action has no additional options.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
