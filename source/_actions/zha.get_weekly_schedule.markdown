---
title: "Get thermostat weekly schedule"
action: zha.get_weekly_schedule
domain: zha
response: required
description: "Reads the heating schedule from a Zigbee thermostat."
related_actions:
  - zha.set_weekly_schedule
  - zha.clear_weekly_schedule
---

Use this action to read the heating schedule from a ZHA thermostat before changing it, or to check a schedule you uploaded. The thermostat must support the standard weekly schedule commands. For setup instructions, see [Thermostat weekly schedules](/integrations/zha/#thermostat-weekly-schedules).

To read and save a schedule without an automation:

1. Go to {% my tools_actions title="**Settings** > **Tools** > **Actions**" %}.
2. Search for and select **Get thermostat weekly schedule**.
3. Make sure **UI mode** is selected.
4. Select **Add target**, then select the thermostat.
5. Leave **Cache only** off and select **Perform action**.
6. Under **Response**, copy the result and save it somewhere safe.

{% include actions/ui_header.md %}

To read a schedule from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script.
3. In the **Then do** section, select **Add action**.
4. Select what you want to control. Under **By target**, select the ZHA thermostat.
5. Under **Zigbee Home Automation**, select **Get thermostat weekly schedule**.
6. Set a response variable to use the result in later steps, then select **Save**.

### Options in the UI

{% options_ui %}
Cache only:
  description: Return the in-memory cache instead of reading the thermostat. Defaults to off.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `zha.get_weekly_schedule`:

{% example %}
action: |
  action: zha.get_weekly_schedule
  target:
    entity_id: climate.living_room
  response_variable: thermostat_schedule
{% endexample %}

### Options in YAML

{% options_yaml %}
cache_only:
  description: Return the in-memory cache instead of reading the thermostat. Defaults to `false`.
  required: false
  type: boolean
{% endoptions_yaml %}

{% include actions/targets.md domain="climate" entity_type="ZHA climate entity" example="climate.living_room" %}

## Response data

{% include actions/response.md %}

The response is keyed by climate entity. Each result contains `days`, `complete`, and `pre_write_snapshot`. Each day has a `transitions` list with local `time` values in `HH:MM` format and `temperature` values in degrees Celsius, plus an `updated_at` timestamp in UTC. An empty list means the day is known to have no transitions; `null` means the day is unknown. `complete` is true only when all seven days are known.

`pre_write_snapshot` may contain the heating schedule read before the most recent upload or clear. It is stored only in memory and can be replaced by a later operation or lost on restart. Save the response separately if you need a record.

## Good to know

- By default, the action reads the thermostat. **Cache only** avoids a device read, but cached information may be stale or incomplete and is lost on restart.
- The response contains heating schedules only, not cooling schedules.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
