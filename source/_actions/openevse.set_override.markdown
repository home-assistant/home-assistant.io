---
title: "Set manual override"
action: openevse.set_override
domain: openevse
description: "Sets or updates the manual override on the charger."
---

Use this action to set or update a manual override on your OpenEVSE charger. You can specify whether charging should be active or disabled, adjust the target and maximum charge currents, set an energy or time limit for the override session, and choose whether to automatically clear the override when limits are reached or the vehicle disconnects.

{% include actions/ui_header.md %}

To set a manual override from an automation or script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the OpenEVSE device or entity you want to manage.
6. From the actions shown for that target, select **Set manual override**.
7. Fill in the optional override settings you wish to apply.
8. Select **Save**.

### Options in the UI

{% options_ui %}
State:
  description: The override charging state (`active` or `disabled`).
  required: false
Charge current:
  description: Target charging current in amperes (6–80 A).
  required: false
Maximum current:
  description: Maximum allowed charging current in amperes (6–80 A).
  required: false
Energy limit:
  description: Energy limit for the override session in watt-hours.
  required: false
Time limit:
  description: Time limit duration for the override session.
  required: false
Auto release:
  description: Automatically clear the override when the session completes or limits are reached.
  required: false
  default: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `openevse.set_override`.

{% example %}
action: |
  action: openevse.set_override
  target:
    entity_id: switch.openevse_manual_override
  data:
    state: active
    charge_current: 32
    auto_release: true
{% endexample %}

### Options in YAML

{% options_yaml %}
state:
  description: The override charging state (`active` or `disabled`).
  required: false
  type: string
charge_current:
  description: Target charging current in amperes (6–80 A).
  required: false
  type: integer
max_current:
  description: Maximum allowed charging current in amperes (6–80 A).
  required: false
  type: integer
energy_limit:
  description: Energy limit for the override session in watt-hours.
  required: false
  type: integer
time_limit:
  description: Time limit duration for the override session (e.g. `01:30:00` or seconds).
  required: false
  type: [string, integer]
auto_release:
  description: Automatically clear the override when the session completes or limits are reached.
  required: false
  type: boolean
  default: false
{% endoptions_yaml %}

{% include actions/targets.md %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
