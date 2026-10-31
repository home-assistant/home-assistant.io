---
title: "Cancel holiday"
action: vicare.cancel_holiday
domain: vicare
description: "Cancels a scheduled or running holiday program of the heating device."
related_actions:
  - vicare.schedule_holiday
---

The **Viessmann ViCare: Cancel holiday** action cancels a holiday program of your Viessmann heating device, whether it is still scheduled or already running.

{% include actions/targets.md domain="climate" %}

{% include actions/ui_header.md %}

To cancel a holiday from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Viessmann ViCare: Cancel holiday**.
6. Select the climate entity as the target.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Program:
  description: The holiday program to cancel, **Holiday** or **Holiday at home**. Defaults to **Holiday**.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `vicare.cancel_holiday`. A basic example looks like this:

{% example %}
action: |
  action: vicare.cancel_holiday
  target:
    entity_id: climate.living_room
{% endexample %}

This cancels the holiday program of the device.

### Options in YAML

{% options_yaml %}
program:
  description: The holiday program to cancel, `holiday` or `holiday_at_home`.
  required: false
  type: string
  default: holiday
{% endoptions_yaml %}

## Good to know

- The holiday program applies to the whole device, so cancelling it through one climate entity cancels it for all heating circuits of the device.
- Not every device has the **Holiday at home** program. If yours doesn't, the action fails with an error saying the device does not support it.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: Cancel the holiday when you come home early

This automation cancels the holiday program as soon as someone is home again.

- Trigger: the number of people at home rises above zero
- Condition: the holiday program is active
- Action: cancel the holiday
  - Target: the living room climate entity

{% details "Show example YAML" %}

{% example %}
automation: |
  alias: "Cancel the heating holiday on an early return"
  triggers:
    - trigger: numeric_state
      entity_id: zone.home
      above: 0
  conditions:
    - condition: state
      entity_id: binary_sensor.heating_holiday
      state: "on"
  actions:
    - action: vicare.cancel_holiday
      target:
        entity_id: climate.living_room
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
