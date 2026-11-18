---
title: Birthday
description: Instructions on how to add birthdays to Home Assistant as a calendar.
ha_categories:
  - helpers
ha_release: 2026.12
ha_iot_class: Calculated
ha_config_flow: true
ha_codeowners:
  - '@Jump-333'
ha_domain: birthday
ha_platforms:
  - calendar
ha_integration_type: service
ha_quality_scale: platinum
---

The **Birthday** {% term integration %} creates a {% term entity %} calendar with the birthdays of the people you add. Each birthday repeats every year and shows the age when the birth year is known.

## Supported functions

### Calendar

A single calendar entity, `calendar.birthdays`, contains all the birthdays.

- Each event lasts the whole day.
- With a birth year, the event is "🎂 Name's 35th birthday" and the description says "Name turns 35."
- Without a birth year, the event is "🎂 Name's birthday".
- The calendar state is `on` on a birthday day. Its attributes describe the next birthday.
- A birthday on 29 February is shown on 1 March in years that are not leap years.
- Names must be unique

{% include integrations/config_flow.md %}

{% configuration_basic %}
Name:
  description: The name of the person. It must be unique
Day:
  description: The day of the month of the birthday.
Month:
  description: The month of the birthday, from 1 to 12.
Year:
  description: Optional. The year of birth, between 1900 and the current year. It is used to show the age.
Add another birthday:
  description: Save this birthday and show the form again to add another one.
{% endconfiguration_basic %}

## Configuration parameters

The integration has no settings of its own. Every birthday is a sub-entry of the integration, with the same fields described above.

- To add a birthday, select **Add birthday** on the integration page.
- To edit a birthday, select the settings wheel icon next to it.
- To remove a birthday, select the three dots next to it, then **Delete**.

## Use cases

- Get a notification on the day of a birthday.
- Show all birthdays in the calendar card of a dashboard.
- Announce on a speaker who has a birthday today.

## Examples

### Notify on a birthday

This automation sends a notification at 08:00 when a birthday starts.
1. Under **When**, select **Add trigger**, then **Calendar**.
2. Set **Calendar** to **Birthdays** and **Event** to **Start**.
3. Set **Offset** to `8:00:00`. Birthdays are all-day events starting at midnight, so the notification is sent 8 hours later.
4. Under **Then do**, select **Add action**, then **Notifications** > **Send a notification via notify.notify**.
5. Set **Title** to `Birthday` and **Message** to `{{ trigger.calendar_event.summary }}`.

```yaml
automation:
  - alias: "Birthday notification"
    mode: parallel
    triggers:
      - trigger: calendar
        event: start
        entity_id: calendar.birthdays
        offset: "8:00:00"
    actions:
      - action: notify.notify
        data:
          title: "Birthday"
          message: "{{ trigger.calendar_event.summary }}"
```

## Removing the integration

This integration follows the standard removal procedure.
{% include integrations/remove_device_service.md %}