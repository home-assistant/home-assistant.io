---
title: "Moon is waning"
condition: moon.is_waning
domain: moon
description: "Tests if the moon is waning."
related_conditions:
  - moon.is_waxing
  - moon.is_phase
---

The **Moon is waning** condition passes while the moon is waning, the half of the lunar month when the lit part shrinks from the full moon back toward the new moon. Home Assistant works this out from the date, so it needs no account, no internet connection, and no location.

Use it to gate an automation on the falling half of the moon's cycle, for example to run a routine only while the moon is heading back toward dark.

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. From the search box, search for and select **Moon: Moon is waning**.
5. Select **Save**.

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `moon.is_waning`. It has no options:

{% example %}
condition: |
  condition: moon.is_waning
{% endexample %}

This passes while the moon is waning.

## Good to know

- This condition does not use a target. It checks the moon phase, which is the same everywhere on Earth, so it does not depend on your [home location](/docs/configuration/basic/).
- The moon wanes from the full moon back to the new moon, then waxes from the new moon up to the full moon. For the opposite check, use [Moon is waxing](/conditions/moon.is_waxing/).
- The phase is based on the date, so it changes at most once a day.
- To test for a single phase instead of the direction, use [Moon phase](/conditions/moon.is_phase/).

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: wind-down reminder while the moon wanes

Each evening, send a gentle wind-down reminder, but only while the moon is waning.

- **Trigger**: Time
  - **At time**: 9:00:00 PM
- **Condition**: Moon: Moon is waning
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a waning moon reminder" %}

{% example %}
automation: |
  alias: "Waning moon wind-down reminder"
  triggers:
    - trigger: time
      at: "21:00:00"
  conditions:
    - condition: moon.is_waning
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The moon is waning."
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
