---
title: "Clear thermostat weekly schedule"
action: zha.clear_weekly_schedule
domain: zha
response: optional
description: "Clears the entire weekly schedule from a Zigbee thermostat."
related_actions:
  - zha.get_weekly_schedule
  - zha.set_weekly_schedule
---

Use this action to remove a schedule from a ZHA thermostat that supports the standard weekly schedule commands.

{% caution %}
This action clears the entire device schedule, potentially including cooling schedules, and can change the target temperature. Read and save the existing heating schedule first. Cooling schedules are not read, snapshotted, or verified, and cannot be restored by these actions. Back them up separately or do not clear the schedule if you need to keep them.
{% endcaution %}

{% include actions/ui_header.md %}

To clear a schedule from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script.
3. In the **Then do** section, select **Add action**.
4. Select what you want to control. Under **By target**, select the ZHA thermostat.
5. Under **Zigbee Home Automation**, select **Clear thermostat weekly schedule**.
6. Select **Save**.

### Options in the UI

This action has no additional options beyond the target.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `zha.clear_weekly_schedule`:

{% example %}
action: |
  action: zha.clear_weekly_schedule
  target:
    entity_id: climate.living_room
{% endexample %}

### Options in YAML

This action has no additional YAML options beyond the target.

{% include actions/targets.md domain="climate" entity_type="ZHA climate entity" example="climate.living_room" %}

## Response data

{% include actions/response.md %}

The optional response contains the verified empty heating schedule and the in-memory heating snapshot taken before clearing. It has the same format as [Get thermostat weekly schedule](/actions/zha.get_weekly_schedule/#response-data).

## Good to know

- ZHA verifies that the heating days are empty after clearing, but cannot verify cooling schedules.
- The action does not change the thermostat's operating mode or refresh its clock.
- If clearing cannot be confirmed, the device schedule may still have changed. No automatic rollback is attempted; read the schedule again before deciding what to do.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
