---
title: "Boost hotwater"
action: hive.boost_hot_water
domain: hive
description: "Turns the boost on or off for a Hive hot water tank for a set time."
related_actions:
  - hive.boost_heating_on
  - hive.boost_heating_off
---

The **Boost hotwater** action turns the boost on or off for a Hive hot water tank. When you turn the boost on, the hot water runs for the time you choose and then returns to its schedule.

{% include actions/ui_header.md %}

To boost hot water from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Hive: Boost hotwater**.
6. Select the hot water tank under **Entity**.
7. Select the **Mode** and **Time period**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Entity:
  description: The Hive hot water tank to boost.
  required: true
Mode:
  description: Whether to turn the boost on or off.
  required: true
Time period:
  description: The time period for the boost, for example 01:30:00.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `hive.boost_hot_water`. A basic example looks like this:

{% example %}
action: |
  action: hive.boost_hot_water
  data:
    entity_id: water_heater.hot_water
    on_off: "on"
    time_period: "01:30:00"
{% endexample %}

This boosts `water_heater.hot_water` for one and a half hours.

### Options in YAML

{% options_yaml %}
entity_id:
  description: >
    The entity ID of the Hive hot water tank to boost.
  required: true
  type: string
on_off:
  description: >
    Whether to turn the boost on or off. One of "on" or "off".
  required: true
  type: string
time_period:
  description: >
    The time period for the boost, for example 01:30:00.
  required: true
  type: string
{% endoptions_yaml %}

This action does not support targets. Specify the hot water tank with `entity_id` in the `data` section instead.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
