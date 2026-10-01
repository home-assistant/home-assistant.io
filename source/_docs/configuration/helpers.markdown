---
title: "Helpers"
description: "Helpers are entities that you create yourself, for example, a toggle, a timer, or a sensor that combines other sensors. Learn which helpers there are, how to create them, and what happens to their values after a restart."
related:
  - docs: /docs/automation/which-tool-to-use/
    title: Which tool to use
  - docs: /docs/configuration/entities_domains/
    title: Entities and domains
  - url: /integrations/#helper
    title: List of helpers
---

A helper is an {% term entity %} that you create yourself, without a device behind it. For example, a toggle that pauses an automation, a timer that counts down, or a sensor that shows the average temperature of several rooms. Helpers appear like other entities, so you can use them in automations, scripts, and dashboards.

You create and manage helpers in {% my helpers title="**Settings** > **Devices & services** > **Helpers**" %}.

## About the kinds of helpers

There are three kinds of helpers.

### Helpers that store a value

You or an automation set the value of these helpers, and they keep it:

- [**Toggle**](/integrations/input_boolean/)
  - An on/off switch, for example, to pause an automation or to show that a guest is staying over.
- [**Number**](/integrations/input_number/)
  - A number that you set with a slider or a box, for example, a target temperature.
- [**Dropdown**](/integrations/input_select/)
  - One option from a list that you define, for example, the mode of your home.
- [**Text**](/integrations/input_text/)
  - A short piece of text, for example, a message to show on a dashboard.
- [**Date and/or time**](/integrations/input_datetime/)
  - A date, a time, or both, for example, the time your alarm goes off.
- [**Button**](/integrations/input_button/)
  - A button that you press to start automations. It remembers when it was last pressed.
- [**Counter**](/integrations/counter/)
  - A whole number that goes up, goes down, or starts again from its initial value, for example, how many times a door opened today.
- [**Timer**](/integrations/timer/)
  - Counts down a time that you set. You can start, pause, cancel, finish, or change it.
- [**Schedule**](/integrations/schedule/)
  - Turns on during time blocks that you set for each day of the week, for example, the hours when the heating should be on.

### Helpers that calculate a value

These helpers calculate their value from other entities, and update it when those entities change. For example:

- [**Combine the state of several sensors**](/integrations/min_max/): The minimum, maximum, average, or sum of several sensors.
- [**Derivative sensor**](/integrations/derivative/): How fast a value changes, for example, how fast the temperature rises.
- [**Integral sensor**](/integrations/integration/): A total over time, for example, the energy used, calculated from the power.
- [**Utility Meter**](/integrations/utility_meter/): The use of energy, gas, or water per day, week, month, or another period.
- [**History Stats**](/integrations/history_stats/): How long or how often an entity was in a state, for example, how long the heating was on today.
- [**Threshold Sensor**](/integrations/threshold/): Whether a value is above or below a limit that you set.
- [**Template**](/integrations/template/): An entity whose state comes from a [template](/docs/templating/), a small piece of code.

For all helpers of this kind, refer to the [list of helpers](/integrations/#helper).

### Other helpers

Some helpers do more than store or calculate a value. For example:

- [**Generic thermostat**](/integrations/generic_thermostat/): Turns a heater or a cooler on and off, based on a temperature sensor.
- [**Group**](/integrations/group/): Combines several entities into one, for example, all lights in a room.
- [**Change device type of a switch**](/integrations/switch_as_x/): Shows a switch as another type of device, for example, as a light.

## Creating a helper

1. Go to {% my helpers title="**Settings** > **Devices & services** > **Helpers**" %}.
2. Select **Create helper**.
3. Select the type of helper, for example, **Toggle**.
4. Enter a name, and fill in the other options.
5. Select **Create** or **Submit**, depending on the type of helper.

Some places let you create a helper right where you need it. For example, if a field asks for a toggle, a number, or a dropdown, the list of entities offers to create a new helper of that type.

To change a helper later, select it in the list of helpers, and change its settings. Helpers that you set up in YAML can't be changed in the UI. Their settings show "The settings of this entity cannot be edited from the UI."

## What happens to the value after a restart

Helpers that store a value keep it when Home Assistant restarts, with these differences:

- **Toggle**
  - Gets its last state back. To start on or off after every restart instead, change **Each time Home Assistant starts** in the settings of the toggle.
- **Number**, **Dropdown**, **Text**, and **Date and/or time**
  - Get their last value back.
  - If the last value is no longer valid, for example, a number outside the range or an option you removed, **Number** starts at its minimum, and **Dropdown** at its first option.
  - In YAML, you can set an `initial` value. The helper then starts with that value after every restart, instead of its last value.
- **Button**
  - Remembers when it was last pressed.
- **Counter**
  - Gets its last value back. To start at its initial value after every restart instead, turn off **Restore the last known value when Home Assistant starts**.
- **Timer**
  - Starts idle after a restart, unless you turn on **Restore state and time when Home Assistant starts**. For details, refer to [Timer](/integrations/timer/).
- **Schedule**
  - Doesn't need to remember anything. It works out from its time blocks whether it's on.

Helpers that calculate a value calculate it again from their entities.

## Using helpers

- In automations, a helper can start the automation, be checked in a condition, or be changed by an action. For example, an automation can check whether a toggle is on, or start a timer. For more examples, refer to [Which tool to use](/docs/automation/which-tool-to-use/#combining-the-tools).
- On a dashboard, you can show and change a helper like other entities, for example, a toggle or a number in a tile card.
- With Assist, you can control helpers that you [expose to Assist](/voice_control/voice_remote_expose_devices/), for example, turn a toggle on or off.
