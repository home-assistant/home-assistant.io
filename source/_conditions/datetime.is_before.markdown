---
title: "Datetime is before"
condition: datetime.is_before
domain: datetime
description: "Tests if one or more date and time values are before a reference time."
---

The **Datetime is before** condition passes when the date and time of an {% term entity %} is earlier than a reference time. The reference time can be the current time, or the date and time of another entity. You can also shift the reference time forward or backward with an offset.

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. From the search box, search for and select **Datetime is before**.
5. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the date/time entity or timestamp sensor you want to check.
   You can also select a floor, an area, a device, or a label.
6. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All**.
7. Under **Reference time**, pick **Now** or **Entity**.
8. Optional: Under **Reference offset**, set an offset.
9. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: When multiple entities are targeted, controls how results combine. Pick **Any** to pass if at least one targeted entity is before the reference time, or **All** to pass only when every targeted entity is before the reference time. Default is **Any**.
Reference time:
  description: The time to compare the target against. Choose **Now** to use the current time, or **Entity** to use the date and time of another date/time entity or timestamp sensor.
Reference offset:
  description: An amount of time that is added to the reference time before the comparison. Use a positive offset to move the reference time into the future, or a negative offset to move it into the past. By default, no offset is used.
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `datetime.is_before`. For complete examples, see the [automation examples](#more-examples) below.

### Options in YAML

{% options_yaml %}
behavior:
  description: >
    Same as **Condition passes if**. Accepts `any` or `all`.
  required: false
  type: string
  default: any
reference:
  description: >
    Same as **Reference time**. Accepts `now`, or the entity ID of a date/time entity or timestamp sensor.
  required: false
  type: string
  default: now
reference_offset:
  description: |
    Same as **Reference offset**. Accepts a duration string in `HH:MM:SS` format, such as `"-02:00:00"`, or a mapping with `days`, `hours`, `minutes`, and `seconds`. For example:

    ```yaml
    reference_offset:
      days: -3
    ```
  required: false
  type: [string, map]
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- Besides date/time entities, you can target sensors with the `timestamp` device class. The same types of entities can be used as the reference time.
- The comparison is strict. If the target and the reference time are exactly the same, the condition does not pass.
- Entities that are unavailable (`unavailable`) or have an unknown state (`unknown`) are skipped. If every targeted entity is skipped, the condition does not pass with **Any**, but does pass with **All**.
- If the reference entity does not exist, or does not have a valid date and time, the condition does not pass.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: get a reminder to replace a filter

Every morning, check when the filter was last changed. If it was more than a year ago, get a notification reminding you to replace it.

- **Trigger**: Time
  - **At**: 09:00
- **Condition**: Datetime is before
  - **Target**: Filter changed
  - **Reference time**: Now
  - **Reference offset**: -365 days
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a filter replacement reminder" %}

{% example %}
automation: |
  alias: "Remind me to replace the filter after a year"
  triggers:
    - trigger: time
      at: "09:00:00"
  conditions:
    - condition: datetime.is_before
      target:
        entity_id: sensor.filter_changed
      options:
        reference: now
        reference_offset:
          days: -365
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: >
          The filter was last changed more than a year ago. Time to replace it.
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
