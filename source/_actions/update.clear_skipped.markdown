---
title: "Clear skipped update"
action: update.clear_skipped
domain: update
description: "Removes the skipped version marker from an update."
related_actions:
  - update.install
  - update.skip
---

Use this action to remove the skipped version marker from an update you previously skipped, so the update notification appears again.

{% include actions/ui_header.md %}

To clear a skipped update from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the update you want to clear.
6. From the actions shown for that target, select **Clear skipped update**.
7. Select **Save**.

### Options in the UI

This action has no additional options beyond the target.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `update.clear_skipped`. A basic example looks like this:

{% example %}
action: |
  action: update.clear_skipped
  target:
    entity_id: update.my_light_bulb
{% endexample %}

This removes the skipped version marker from `update.my_light_bulb`.

### Options in YAML

This action has no additional YAML options beyond the target.

{% include actions/targets.md %}

## Good to know

- This action only affects updates you previously skipped with the [Skip update](/actions/update.skip/) action.
- After you clear the marker, the entity returns to the `on` state and the update notification appears again.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: clear skipped updates every week

Bring back previously skipped updates on a schedule, for example as a weekly reminder to update.

- **Trigger**: Time: Monday at 09:00
- **Action**: Clear skipped update
  - **Target**: Office router update

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Clear skipped updates every week"
    triggers:
      - trigger: time
        at: "09:00:00"
    conditions:
      - condition: time
        weekday:
          - mon
    actions:
      - action: update.clear_skipped
        target:
          entity_id: update.office_router_firmware
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
