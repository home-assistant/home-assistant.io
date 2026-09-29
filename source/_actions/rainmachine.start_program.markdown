---
title: "Start program"
action: rainmachine.start_program
domain: rainmachine
description: "Starts a RainMachine program."
related_actions:
  - rainmachine.stop_program
  - rainmachine.start_zone
---

The **Start program** action starts a RainMachine watering program. Each program is represented by a switch entity, and this action turns that program on.

{% include actions/ui_header.md %}

To start a program from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **RainMachine: Start program**.
6. Under **Targets**, choose the program switch entities to start.
7. Select **Save**.

{% include actions/targets.md domain="switch" %}

### Options in the UI

This action has no additional options. Select the program switch entities to start.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `rainmachine.start_program`. A basic example looks like this:

{% example %}
action: |
  action: rainmachine.start_program
  target:
    entity_id: switch.rainmachine_morning_program
{% endexample %}

### Options in YAML

This action has no additional options.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
