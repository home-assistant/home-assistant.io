---
title: "Schedule holiday"
action: vicare.schedule_holiday
domain: vicare
description: "Schedules a holiday program of the heating device."
related_actions:
  - vicare.cancel_holiday
---

The **Viessmann ViCare: Schedule holiday** action schedules a holiday program of your Viessmann heating device for a start and an end date. The device switches to the program on the start date and back to its normal operation after the end date.

{% include actions/targets.md domain="climate" %}

{% include actions/ui_header.md %}

To schedule a holiday from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Viessmann ViCare: Schedule holiday**.
6. Select the climate entity as the target, then enter the **Start date** and the **End date**.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Program:
  description: The holiday program to use, **Holiday** or **Holiday at home**. Defaults to **Holiday**.
  required: false
Start date:
  description: The first day of the holiday.
  required: true
End date:
  description: The last day of the holiday.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `vicare.schedule_holiday`. A basic example looks like this:

{% example %}
action: |
  action: vicare.schedule_holiday
  target:
    entity_id: climate.living_room
  data:
    start_date: "2026-12-20"
    end_date: "2027-01-06"
{% endexample %}

This schedules the holiday program from December 20 to January 6.

### Options in YAML

{% options_yaml %}
program:
  description: The holiday program to use, `holiday` or `holiday_at_home`.
  required: false
  type: string
  default: holiday
start_date:
  description: The first day of the holiday, as `YYYY-MM-DD`.
  required: true
  type: string
end_date:
  description: The last day of the holiday, as `YYYY-MM-DD`. It must not be before the start date.
  required: true
  type: string
{% endoptions_yaml %}

## Good to know

- The holiday program applies to the whole device, not only to the heating circuit of the climate entity you target.
- Not every device has the **Holiday at home** program. If yours doesn't, the action fails with an error saying the device does not support it.
- Some devices reject a holiday that starts and ends on the same day.
- The **Holiday** and **Holiday at home** binary sensors and their start and end date sensors show the scheduled holiday.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: Schedule the holiday from a calendar

This automation schedules the holiday program when an all-day event called "Holiday" starts in your calendar. All-day events end on the day after their last day, so the end date is moved back by one day.

- Trigger: an event starts in the calendar
- Condition: the event is called "Holiday"
- Action: schedule the holiday
  - Target: the living room climate entity
  - Start date: the first day of the event
  - End date: the last day of the event

{% details "Show example YAML" %}

{% example %}
automation: |
  alias: "Schedule the heating holiday from the calendar"
  triggers:
    - trigger: calendar
      event: start
      entity_id: calendar.family
  conditions:
    - condition: template
      value_template: "{{ trigger.calendar_event.summary == 'Holiday' }}"
  actions:
    - action: vicare.schedule_holiday
      target:
        entity_id: climate.living_room
      data:
        start_date: "{{ trigger.calendar_event.start }}"
        end_date: "{{ (strptime(trigger.calendar_event.end, '%Y-%m-%d') - timedelta(days=1)).date() }}"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
