---
title: "Create vacation"
action: ecobee.create_vacation
domain: ecobee
description: "Creates a vacation on the selected ecobee thermostat."
related_actions:
  - ecobee.delete_vacation
  - ecobee.resume_program
---

The **Create vacation** action creates a vacation on the selected ecobee thermostat.

A vacation holds the thermostat at the cooling and heating temperatures you choose for a set period, which is handy when you are away from home for a while.

{% include actions/ui_header.md %}

To create a vacation from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **ecobee: Create vacation**.
6. Select the **Entity** to create the vacation on, enter a **Vacation name**, and set the **Cool temperature** and **Heat temperature**. Optionally, set the start and end date and time, the fan mode, and the fan minimum on time.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Entity:
  description: The ecobee thermostat on which to create the vacation.
  required: true
Vacation name:
  description: The name of the vacation to create. It must be unique on the thermostat.
  required: true
Cool temperature:
  description: The cooling temperature during the vacation.
  required: true
Heat temperature:
  description: The heating temperature during the vacation.
  required: true
Start date:
  description: The date the vacation starts, in YYYY-MM-DD format. If omitted, the vacation starts immediately.
  required: false
Start time:
  description: The time the vacation starts, in the thermostat's local time, in 24-hour HH:MM:SS format.
  required: false
End date:
  description: The date the vacation ends, in YYYY-MM-DD format. If omitted, the vacation lasts 14 days.
  required: false
End time:
  description: The time the vacation ends, in the thermostat's local time, in 24-hour HH:MM:SS format.
  required: false
Fan mode:
  description: The fan mode during the vacation, either `auto` or `on`.
  required: false
Fan minimum on time:
  description: The minimum number of minutes to run the fan each hour during the vacation, from 0 to 60.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `ecobee.create_vacation`. A basic example looks like this:

{% example %}
action: |
  action: ecobee.create_vacation
  data:
    entity_id: climate.living_room
    vacation_name: "Skiing"
    cool_temp: 25
    heat_temp: 19
{% endexample %}

This creates a vacation named `Skiing` on `climate.living_room`, starting immediately and lasting 14 days.

### Options in YAML

{% options_yaml %}
entity_id:
  description: The ecobee thermostat on which to create the vacation.
  required: true
  type: string
vacation_name:
  description: The name of the vacation to create. It must be unique on the thermostat.
  required: true
  type: string
cool_temp:
  description: The cooling temperature during the vacation.
  required: true
  type: float
heat_temp:
  description: The heating temperature during the vacation.
  required: true
  type: float
start_date:
  description: >
    The date the vacation starts, in YYYY-MM-DD format. If omitted, the
    vacation starts immediately.
  required: false
  type: string
start_time:
  description: >
    The time the vacation starts, in the thermostat's local time, in 24-hour
    HH:MM:SS format.
  required: false
  type: time
end_date:
  description: >
    The date the vacation ends, in YYYY-MM-DD format. If omitted, the vacation
    lasts 14 days.
  required: false
  type: string
end_time:
  description: >
    The time the vacation ends, in the thermostat's local time, in 24-hour
    HH:MM:SS format.
  required: false
  type: time
fan_mode:
  description: The fan mode during the vacation, either `auto` or `on`.
  required: false
  type: string
  default: auto
fan_min_on_time:
  description: >
    The minimum number of minutes to run the fan each hour during the
    vacation, from 0 to 60.
  required: false
  type: integer
  default: 0
{% endoptions_yaml %}

## Good to know

- The start and end date and time only take effect when they are all specified together. If you leave them out, the vacation starts immediately and lasts 14 days, unless you delete it earlier.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
