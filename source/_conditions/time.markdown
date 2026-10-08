---
title: "Time"
condition: time
domain: homeassistant
description: "Tests if the current time is after or before a time, or if today is one of the selected days of the week."
related_conditions:
  - schedule.is_on
  - calendar.is_event_active
---

The **Time** condition checks whether the current time is in a time window, or whether today is one of the days of the week that you select. Use it when an automation should only continue at certain times. For example, the automation only turns on a light at full brightness during the day, or only sends a reminder on weekdays.

The time can be a fixed time, or the value of a [date and time helper](/integrations/input_datetime/), a time entity, or a timestamp sensor. With a helper that you create yourself, you can change the time later without editing the automation.

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. From the search box, search for and select **Time**.
5. Set at least one of the following:
   - For the start of the time window, under **After**, select **Fixed time** or **Value of a date/time helper or timestamp-class sensor**. Then enter the time, or select the entity.
   - For the end of the time window, do the same under **Before**.
   - To only pass on some days, select them under **Days of the week**.
6. Select **Save**.

### Options in the UI

{% options_ui %}
After:
  description: The time when the time window starts. Use a **Fixed time**, or the **Value of a date/time helper or timestamp-class sensor**. Default is **Fixed time**.
  required: false
Before:
  description: The time when the time window ends. The window ends just before this time. Use a **Fixed time**, or the **Value of a date/time helper or timestamp-class sensor**. Default is **Fixed time**.
  required: false
Days of the week:
  description: The days on which the condition passes. By default, every day passes.
  required: false
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, use `condition: time`. A basic example looks like this:

{% example %}
condition: |
  condition: time
  after: "08:00:00"
  before: "20:00:00"
{% endexample %}

This passes from 08:00 until just before 20:00.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
condition:
  description: The condition type. For this condition, use `time`.
  required: true
  type: string
after:
  description: >
    The start of the time window, in `HH:MM:SS` format. Instead of a time, you can use the entity ID of an `input_datetime` helper, a `time` entity, or a `sensor` entity with the `timestamp` device class. You must set `after`, `before`, `weekday`, or a combination of them.
  required: false
  type: [time, string]
before:
  description: >
    The end of the time window, in `HH:MM:SS` format. Instead of a time, you can use the same entities as for `after`. You must set `after`, `before`, `weekday`, or a combination of them.
  required: false
  type: [time, string]
weekday:
  description: >
    The days on which the condition passes. Use one day, or a list of days. Valid values are `mon`, `tue`, `wed`, `thu`, `fri`, `sat`, and `sun`.
  required: false
  type: [string, list]
{% endoptions_yaml %}

The following example uses two date and time helpers that you create yourself, for quiet hours that you can change on a dashboard:

{% example %}
condition: |
  condition: time
  after: input_datetime.quiet_hours_start
  before: input_datetime.quiet_hours_end
{% endexample %}

## Good to know

- The time window starts exactly at **After**, and ends just before **Before**. For example, with **After** set to 15:00 and **Before** set to 02:00, the condition passes at 15:00:00, but not at 02:00:00.
- If you only set **After**, the condition passes from that time until midnight. If you only set **Before**, it passes from midnight until that time.
- If **Before** is earlier than **After**, the time window goes past midnight. For example, with **After** set to 22:00 and **Before** set to 06:00, the condition passes during the night.
- **Days of the week** checks the current day. In a time window that goes past midnight, the hours after midnight belong to the next day. For example, at 01:00 on a Saturday, the condition only passes if **Saturday** is selected.
- If you use an entity, only its time counts. The date is ignored. If a time entity or a timestamp sensor is unavailable (`unavailable`) or unknown (`unknown`), the condition doesn't pass.
- To check for working days, including public holidays, use the [Workday](/integrations/workday/) integration. It creates a sensor that you can check with a [State](/docs/scripts/conditions/#state-condition) condition.
- For time windows that change from day to day, a [schedule helper](/integrations/schedule/) can be easier to set up. You can check it with [Schedule is on](/conditions/schedule.is_on/).
- The condition uses the time zone of Home Assistant. You can find it in {% my general title="**Settings** > **System** > **Home information**" %}.
- This condition checks the time right now. To start an automation at a certain time, use the [Time](/triggers/time/) trigger.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: dim the hallway light at night

When motion is detected in the hallway at night, this automation turns on the hallway light at a low brightness. The time window goes past midnight, from 22:00 until 06:00.

- **Trigger**: State changed
  - **Entity**: Hallway motion (`binary_sensor.hallway_motion`)
  - **To**: Detected
- **Condition**: Time
  - **After**: 22:00:00
  - **Before**: 06:00:00
- **Action**: Turn on light
  - **Target**: Hallway light (`light.hallway`)
  - **Brightness**: 10%

{% details "YAML example for dimming the hallway light at night" %}

{% example %}
automation: |
  alias: "Dim hallway light at night"
  triggers:
    - trigger: state
      entity_id: binary_sensor.hallway_motion
      to: "on"
  conditions:
    - condition: time
      after: "22:00:00"
      before: "06:00:00"
  actions:
    - action: light.turn_on
      target:
        entity_id: light.hallway
      data:
        brightness_pct: 10
{% endexample %}

{% enddetails %}

### Automation: open the bedroom blinds after the wake-up time on weekdays

When motion is detected in the bedroom on a weekday, this automation opens the blinds, but only after the wake-up time. The wake-up time comes from a [date and time helper](/integrations/input_datetime/) with only a time, which you create yourself. In this example, the helper is called **Wake-up time** (`input_datetime.wake_up_time`).

- **Trigger**: State changed
  - **Entity**: Bedroom motion (`binary_sensor.bedroom_motion`)
  - **To**: Detected
- **Condition**: Time
  - **After**: Value of a date/time helper or timestamp-class sensor
    - Wake-up time (`input_datetime.wake_up_time`)
  - **Days of the week**: Monday, Tuesday, Wednesday, Thursday, Friday
- **Action**: Open cover
  - **Target**: Bedroom blinds (`cover.bedroom_blinds`)

{% details "YAML example for opening the bedroom blinds on weekdays" %}

{% example %}
automation: |
  alias: "Open bedroom blinds after wake-up time"
  triggers:
    - trigger: state
      entity_id: binary_sensor.bedroom_motion
      to: "on"
  conditions:
    - condition: time
      after: input_datetime.wake_up_time
      weekday:
        - mon
        - tue
        - wed
        - thu
        - fri
  actions:
    - action: cover.open_cover
      target:
        entity_id: cover.bedroom_blinds
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
