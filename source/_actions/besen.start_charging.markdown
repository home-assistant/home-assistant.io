---
title: "Start charging"
action: besen.start_charging
domain: besen
description: "Starts charging at a later time, for a limited time, or both."
related_actions:
  - switch.turn_on
  - switch.turn_off
---

The **Start charging** action starts charging at a later time, for a limited time, or both. The **Charge** switch of the charger always starts charging right away and without a time limit. With this action, the charger starts by itself at the time you choose, for example when an off-peak tariff begins, and stops by itself when the time is up.

{% include actions/ui_header.md %}

To schedule charging from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Besen: Start charging**.
6. Select what you want to control. Under **By target** (see [Targets](#targets)), select the **Charge** switch of your charger.
7. Optionally, set a **Start** time and a **Duration**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Start:
  description: When the charger starts charging, at most 24 hours ahead. Leave empty to start now.
  required: false
Duration:
  description: How long the charger charges before it ends the session. Leave empty for no time limit.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `besen.start_charging`. A basic example looks like this:

{% example %}
action: |
  action: besen.start_charging
  target:
    entity_id: switch.besen_charge
  data:
    start: "2026-11-05 01:00:00"
    duration:
      hours: 3
{% endexample %}

This makes the charger start charging at 01:00 on November 5, 2026, and stop three hours later.

### Options in YAML

{% options_yaml %}
start:
  description: >
    When the charger starts charging, at most 24 hours ahead. A time without a
    UTC offset, such as `2026-11-05 01:00:00`, is in the time zone of Home
    Assistant. Leave it out to start now.
  required: false
  type: datetime
duration:
  description: >
    How long the charger charges before it ends the session. Accepts a duration
    object with `hours`, `minutes`, and `seconds` keys. The shortest duration is
    1 minute. Leave it out for no time limit.
  required: false
  type: time
{% endoptions_yaml %}

{% include actions/targets.md domain="switch" %}

## Good to know

- The schedule is stored on the charger. The charger holds one schedule at a time, and you can schedule charging before the vehicle is plugged in.
- While a start is scheduled, the **Charge** switch stays off and the **Charging message** sensor shows **Charging reservation**. The **Scheduled start** and **Charging time limit** sensors show what the charger accepted.
- To cancel a scheduled start, turn the **Charge** switch off.
- The charger rejects a new start while a start is scheduled or a session is charging. Cancel the schedule or stop the session first.
- With only a **Duration**, charging starts now, so the vehicle must be plugged in.
- The session uses the current set by the **Charging current** number.
- The action fails with an error when the start time is not in the future, is more than 24 hours ahead, or the charger rejects the request.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: charge during the off-peak tariff

Every evening, schedule charging for the start of the off-peak tariff and let the charger stop when the tariff ends.

- **Trigger**: Time: at 20:00
- **Action**: Besen: Start charging
  - **Target**: Charge switch of the charger (`switch.besen_charge`)
  - **Start**: 23:30 today
  - **Duration**: 6 hours

{% details "YAML example for charging during the off-peak tariff" %}

{% example %}
automation: |
  alias: "Charge the EV during the off-peak tariff"
  triggers:
    - trigger: time
      at: "20:00:00"
  actions:
    - action: besen.start_charging
      target:
        entity_id: switch.besen_charge
      data:
        start: "{{ today_at('23:30').isoformat() }}"
        duration:
          hours: 6
{% endexample %}

{% enddetails %}

### Automation: charge for two hours around midday

Use the hours when your solar panels produce the most. Every day at noon, start charging and let the charger stop two hours later.

- **Trigger**: Time: at 12:00
- **Action**: Besen: Start charging
  - **Target**: Charge switch of the charger (`switch.besen_charge`)
  - **Duration**: 2 hours

{% details "YAML example for charging for two hours around midday" %}

{% example %}
automation: |
  alias: "Charge the EV for two hours around midday"
  triggers:
    - trigger: time
      at: "12:00:00"
  actions:
    - action: besen.start_charging
      target:
        entity_id: switch.besen_charge
      data:
        duration:
          hours: 2
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
