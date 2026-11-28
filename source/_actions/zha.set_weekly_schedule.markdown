---
title: "Upload thermostat weekly schedule"
action: zha.set_weekly_schedule
domain: zha
response: optional
description: "Uploads a schedule helper as a Zigbee thermostat's heating schedule."
related_actions:
  - zha.get_weekly_schedule
  - zha.clear_weekly_schedule
---

Use this action to upload a separately created [schedule helper](/integrations/schedule/) to a ZHA thermostat. The thermostat must support the standard weekly schedule commands. For the required time block format and setup steps, see [Thermostat weekly schedules](/integrations/zha/#thermostat-weekly-schedules).

{% caution %}
Uploading can change the target temperature. Read and save the existing heating schedule first. If an upload fails, some days may already have changed, and no automatic rollback is attempted.
{% endcaution %}

{% include actions/ui_header.md %}

To upload a schedule from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script.
3. In the **Then do** section, select **Add action**.
4. Select what you want to control. Under **By target**, select the ZHA thermostat.
5. Under **Zigbee Home Automation**, select **Upload thermostat weekly schedule**.
6. Under **Schedule helper**, select the helper you created, then select **Save**.

### Options in the UI

{% options_ui %}
Schedule helper:
  description: The schedule helper containing all seven days of heating transitions.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `zha.set_weekly_schedule`:

{% example %}
action: |
  action: zha.set_weekly_schedule
  target:
    entity_id: climate.living_room
  data:
    schedule_entity: schedule.heating_schedule
{% endexample %}

### Options in YAML

{% options_yaml %}
schedule_entity:
  description: The entity ID of the schedule helper to upload.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/targets.md domain="climate" entity_type="ZHA climate entity" example="climate.living_room" %}

## Response data

{% include actions/response.md %}

The optional response contains the verified heating schedule and the in-memory snapshot taken before the upload. It has the same format as [Get thermostat weekly schedule](/actions/zha.get_weekly_schedule/#response-data).

## Good to know

- ZHA reads the thermostat's current heating limits before uploading. The action fails if the limits are unavailable or a temperature is outside them.
- The action does not change the thermostat's operating mode or refresh its clock.
- Editing the helper does not automatically upload changes unless it is linked to the thermostat using **Weekly schedules** on the ZHA configuration page.
- If an upload fails, read the device schedule again. Some days might already have changed, and no automatic rollback is attempted.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
