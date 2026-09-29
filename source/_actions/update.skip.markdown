---
title: "Skip update"
action: update.skip
domain: update
description: "Marks a currently available update as skipped."
related_actions:
  - update.install
  - update.clear_skipped
---

Use this action to mark a currently available update as skipped, for example to hide an update you do not want to install yet.

{% include actions/ui_header.md %}

To skip an update from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the update you want to skip.
6. From the actions shown for that target, select **Skip update**.
7. Select **Save**.

### Options in the UI

This action has no additional options beyond the target.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `update.skip`. A basic example looks like this:

{% example %}
action: |
  action: update.skip
  target:
    entity_id: update.my_light_bulb
{% endexample %}

This skips the currently available update for `update.my_light_bulb`.

### Options in YAML

This action has no additional YAML options beyond the target.

{% include actions/targets.md %}

## Good to know

- After you skip an update, the entity returns to the `off` state, which means there is no update available.
- Skipping does not block installation. You can still install the latest version with the [Install update](/actions/update.install/) action.
- When a newer version becomes available, the entity returns to the `on` state again.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: skip an update automatically when it appears

Skip updates for a specific device as soon as they appear, for example for a device you update manually.

- **Trigger**: State: Update becomes available
- **Action**: Skip update
  - **Target**: Office router update

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Skip office router updates automatically"
    triggers:
      - trigger: state
        entity_id: update.office_router_firmware
        to: "on"
    actions:
      - action: update.skip
        target:
          entity_id: update.office_router_firmware
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
