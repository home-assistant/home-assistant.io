---
title: "Get circulation schedule"
action: vicare.get_circulation_schedule
domain: vicare
description: "Gets the domestic hot water circulation pump schedule."
related_actions:
  - vicare.set_circulation_schedule
---

Use this action to read the weekly schedule of the domestic hot water (<abbr title="domestic hot water">DHW</abbr>) circulation pump on your Viessmann device.

This action returns its result in a response variable, which you can use in later steps of the same automation or script, for example to save the schedule before changing it and restore it later.

{% include actions/ui_header.md %}

To get the circulation schedule from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the water heater entity of your Viessmann device.
6. From the actions shown for that target, select **Viessmann ViCare: Get circulation schedule**.
7. Select **Save**.

This action has no options besides the target.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `vicare.get_circulation_schedule`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: vicare.get_circulation_schedule
  target:
    entity_id: water_heater.main_water_heater
  response_variable: circulation
{% endexample %}

This reads the circulation schedule of the water heater and stores it in `circulation`.

{% include actions/targets.md domain="water_heater" %}

## Response data

The response is keyed by the entity ID of each targeted water heater. Each entry contains one list per weekday, `monday` through `sunday`, with the circulation slots of that day in order. Each slot has the following fields:

- `from`: The time the pump turns on, such as `06:00:00`.
- `to`: The time the pump turns off. `24:00:00` means the end of the day.
- `mode`: The circulation mode of the slot, such as `on`, `5/25-cycles`, or `5/10-cycles`.

A shortened example of the response looks like this:

```yaml
water_heater.main_water_heater:
  monday:
    - from: "05:30:00"
      to: "09:00:00"
      mode: "on"
    - from: "18:00:00"
      to: "20:00:00"
      mode: "on"
  tuesday: []
  # ... and so on until sunday
```

The schedule of each water heater uses the same format as the [Set circulation schedule](/actions/vicare.set_circulation_schedule/) action, so you can pass it back unchanged.

## Good to know

Not all devices have a circulation pump. If yours doesn't, the action fails with an error saying the device does not support a domestic hot water circulation schedule.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: Pause circulation while nobody is home

This automation saves the circulation schedule when everyone leaves, turns the pump off, and restores the saved schedule once someone comes back.

- **Trigger**: nobody is in the home zone
- **Action**: Get circulation schedule, stored in the response variable `saved`
- **Action**: Set circulation schedule with no slots on any day
- **Action**: Wait until someone is home again
- **Action**: Set circulation schedule with the saved schedule

{% details "Show example YAML" %}

{% example %}
automation: |
  alias: "Pause circulation while nobody is home"
  triggers:
    - trigger: numeric_state
      entity_id: zone.home
      below: 1
  actions:
    - action: vicare.get_circulation_schedule
      target:
        entity_id: water_heater.main_water_heater
      response_variable: saved
    - action: vicare.set_circulation_schedule
      target:
        entity_id: water_heater.main_water_heater
      data:
        monday: []
        tuesday: []
        wednesday: []
        thursday: []
        friday: []
        saturday: []
        sunday: []
    - wait_for_trigger:
        - trigger: numeric_state
          entity_id: zone.home
          above: 0
    - action: vicare.set_circulation_schedule
      target:
        entity_id: water_heater.main_water_heater
      data: "{{ saved['water_heater.main_water_heater'] }}"
{% endexample %}

{% enddetails %}

### Automation: Send today's circulation slots to your phone

This automation sends you a notification every morning with the times the circulation pump runs today.

- **Trigger**: the time is 7:00 AM
- **Action**: Get circulation schedule, stored in the response variable `circulation`
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "Show example YAML" %}

{% example %}
automation: |
  alias: "Send today's circulation slots"
  triggers:
    - trigger: time
      at: "07:00:00"
  actions:
    - action: vicare.get_circulation_schedule
      target:
        entity_id: water_heater.main_water_heater
      response_variable: circulation
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: >
          {% set day = now().strftime('%A') | lower %}
          {% set slots = circulation['water_heater.main_water_heater'][day] %}
          {% for slot in slots %}{{ slot.from[:5] }}-{{ slot.to[:5] }} ({{ slot.mode }}){% if not loop.last %}, {% endif %}{% else %}No circulation today{% endfor %}
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
