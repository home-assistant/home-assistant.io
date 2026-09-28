---
title: "Get directive schedule"
action: energyid.get_directive_schedule
domain: energyid
description: "Returns the complete current schedule for the selected EnergyID directive entities."
---

Use this action to read the full schedule behind an EnergyID directive sensor, for example to show the coming hours in a dashboard card or to plan when a script runs an appliance. The sensor itself only holds the current signal and the next change.

This action returns its result in a response variable, which you can use in later steps of the same automation or script.

{% include actions/ui_header.md %}

To get a directive schedule from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the EnergyID directive sensors to read.
6. From the actions shown for that target, select **Get directive schedule**.
7. In the **Response variable** field, enter a name to store the data in, such as `schedule`.
8. Select **Save**.

### Options in the UI

This action has no options. You only choose the directive sensors to read.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `energyid.get_directive_schedule`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: energyid.get_directive_schedule
  target:
    entity_id: sensor.my_home_energy_planner
  response_variable: schedule
{% endexample %}

This stores the schedule of `sensor.my_home_energy_planner` in `schedule`.

### Options in YAML

This action has no options besides the target.

{% include actions/targets.md domain="sensor" %}

## Response data

The response contains one entry per targeted entity, keyed by entity ID. Each entry has the following fields:

- `title`: The name of the directive.
- `description`: The description of the directive as published by its provider.
- `interval`: The length of one schedule slot as an ISO 8601 duration, such as `PT15M`.
- `provider`: The provider of the directive, with its `id`, `display_name`, and `logo_url`. The logo URL is empty when the provider has no logo.
- `data`: The schedule slots. Each slot has a `timestamp`, the `signal` (`--`, `-`, `0`, `+`, or `++`), the `color` suggested by the provider, and the `raw_value` the signal was derived from.

```yaml
sensor.my_home_energy_planner:
  title: Energy planner
  description: Balance forecast of your energy community
  interval: PT15M
  provider:
    id: energyid
    display_name: EnergyID
    logo_url:
  data:
    - timestamp: "2026-09-28T10:00:00+00:00"
      signal: "++"
      color: "#00750e"
      raw_value: 0.42
    - timestamp: "2026-09-28T10:15:00+00:00"
      signal: "+"
      color: "#7ed784"
      raw_value: 0.21
```

## Good to know

- The schedule is served from the last poll, so the action does not contact EnergyID and completes immediately.
- Directives whose schedule could not be fetched are unavailable and are left out of the response.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: announce the first very good moment of the day

Every morning, read the schedule and send a notification with the time of the first very good moment, so you know when to run the washing machine.

- **Trigger**: Time is 07:00
- **Action**: EnergyID: Get directive schedule
  - **Target**: Home energy planner
  - **Response variable**: `schedule`
- **Action**: Send a notification
  - **Message**: a template that picks the first `++` slot from the response

{% details "YAML example for announcing the first very good moment" %}

{% example %}
automation: |
  alias: "Announce the first very good moment"
  triggers:
    - trigger: time
      at: "07:00:00"
  actions:
    - action: energyid.get_directive_schedule
      target:
        entity_id: sensor.my_home_energy_planner
      response_variable: schedule
    - action: notify.mobile_app_phone
      data:
        message: >
          {% raw %}
          {% set slots = schedule['sensor.my_home_energy_planner'].data
             | selectattr('signal', 'eq', '++') | list %}
          {% if slots %}
          First very good moment today: {{ as_timestamp(slots[0].timestamp) | timestamp_custom('%H:%M') }}.
          {% else %}
          No very good moment planned today.
          {% endif %}
          {% endraw %}
{% endexample %}

{% enddetails %}

### Automation: store the next very good moment in a helper

Keep the start of the next very good moment in a date and time {% term helper %}, so other automations can wait for it. Create the helper separately before you use this automation.

- **Trigger**: State of the directive sensor changes
- **Action**: EnergyID: Get directive schedule
  - **Target**: Home energy planner
  - **Response variable**: `schedule`
- **Action**: Set the date and time of the helper to the first upcoming `++` slot

{% details "YAML example for storing the next very good moment" %}

{% example %}
automation: |
  alias: "Store the next very good moment"
  triggers:
    - trigger: state
      entity_id: sensor.my_home_energy_planner
  actions:
    - action: energyid.get_directive_schedule
      target:
        entity_id: sensor.my_home_energy_planner
      response_variable: schedule
    - action: input_datetime.set_datetime
      target:
        entity_id: input_datetime.next_very_good_moment
      data:
        datetime: >
          {% raw %}
          {% set upcoming = schedule['sensor.my_home_energy_planner'].data
             | selectattr('signal', 'eq', '++')
             | selectattr('timestamp', 'gt', now().isoformat()) | list %}
          {{ (upcoming[0].timestamp if upcoming else now().isoformat()) | as_datetime | as_local }}
          {% endraw %}
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}
