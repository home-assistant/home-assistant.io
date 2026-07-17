---
title: "Moon is waxing"
condition: moon.is_waxing
domain: moon
description: "Tests if the moon is waxing."
related_conditions:
  - moon.is_waning
  - moon.is_phase
---

The **Moon is waxing** condition passes while the moon is waxing, the half of the lunar month when the lit part grows from the new moon toward the full moon. Home Assistant works this out from the date, so it needs no account, no internet connection, and no location.

Use it to gate an automation on the rising half of the moon's cycle, for example to run a routine only while the moon is on its way to full.

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. From the search box, search for and select **Moon: Moon is waxing**.
5. Select **Save**.

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `moon.is_waxing`. It has no options:

{% example %}
condition: |
  condition: moon.is_waxing
{% endexample %}

This passes while the moon is waxing.

## Good to know

- This condition does not use a target. It checks the moon phase, which is the same everywhere on Earth, so it does not depend on your [home location](/docs/configuration/basic/).
- The moon waxes from the new moon up to the full moon, then wanes from the full moon back to the new moon. For the opposite check, use [Moon is waning](/conditions/moon.is_waning/).
- The phase is based on the date, so it changes at most once a day.
- To test for a single phase instead of the direction, use [Moon phase](/conditions/moon.is_phase/).

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: planting reminder while the moon is waxing

Some gardeners sow by the moon. Each morning, send a reminder, but only while the moon is waxing.

- **Trigger**: Time
  - **At time**: 9:00:00 AM
- **Condition**: Moon: Moon is waxing
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a waxing moon reminder" %}

{% example %}
automation: |
  alias: "Waxing moon planting reminder"
  triggers:
    - trigger: time
      at: "09:00:00"
  conditions:
    - condition: moon.is_waxing
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The moon is waxing, a good time to sow."
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
