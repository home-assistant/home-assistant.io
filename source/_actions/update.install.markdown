---
title: "Install update"
action: update.install
domain: update
description: "Installs an update for a device or service."
related_actions:
  - update.skip
  - update.clear_skipped
---

Use this action to install an available update for a device or service, for example to update a light bulb's firmware or an add-on at a time that suits you.

{% include actions/ui_header.md %}

To install an update from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the update you want to install.
6. From the actions shown for that target, select **Install update**.
7. Optionally, set a specific version or request a backup if your update supports them.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Version:
  description: The version to install. If you leave this empty, the latest available version is installed. Your update entity must support selecting a version.
  required: false
Backup:
  description: Create a backup before installing the update. Your update entity must support making a backup.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `update.install`. A basic example looks like this:

{% example %}
action: |
  action: update.install
  target:
    entity_id: update.my_light_bulb
{% endexample %}

This installs the latest available update for `update.my_light_bulb`.

### Options in YAML

{% options_yaml %}
version:
  description: The version to install. If you leave this empty, the latest available version is installed. Your update entity must support selecting a version.
  required: false
  type: string
backup:
  description: Create a backup before installing the update. Your update entity must support making a backup.
  required: false
  type: boolean
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- This action only works with update entities that support installing updates.
- The version and backup options only work if your update entity supports them. Check the documentation of the integration that provides the update.
- Even if you previously skipped an update, this action still installs the latest available version.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: install an update in the evening if it is still available

Install an update at a quieter time, after checking that one is still available.

- **Trigger**: Time: 21:00
- **Condition**: Update is available
- **Action**: Install update
  - **Target**: Office router update

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Install an update during the evening if it is still available"
    triggers:
      - trigger: time
        at: "21:00:00"
    conditions:
      - condition: state
        entity_id: update.office_router_firmware
        state: "on"
    actions:
      - action: update.install
        target:
          entity_id: update.office_router_firmware
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
