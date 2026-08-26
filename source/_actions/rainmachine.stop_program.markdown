---
title: "Stop program"
action: rainmachine.stop_program
domain: rainmachine
description: "Stops a RainMachine program."
related_actions:
  - rainmachine.start_program
  - rainmachine.stop_all
---

The **Stop program** action stops a running RainMachine watering program. Each program is represented by a switch entity, and this action turns that program off.

{% include actions/ui_header.md %}

To stop a program from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **RainMachine: Stop program**.
6. Under **Targets**, choose the program switch entities to stop.
7. Select **Save**.

{% include actions/targets.md domain="switch" %}

### Options in the UI

This action has no additional options. Select the program switch entities to stop.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `rainmachine.stop_program`. A basic example looks like this:

{% example %}
action: |
  action: rainmachine.stop_program
  target:
    entity_id: switch.rainmachine_morning_program
{% endexample %}

### Options in YAML

This action has no additional options.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
