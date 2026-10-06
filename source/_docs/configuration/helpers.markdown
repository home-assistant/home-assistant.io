---
title: "Helpers"
description: "Helpers are entities that you create yourself, for example, a toggle, a timer, or a sensor that combines other sensors. Learn which helpers there are, how to create them, and what happens to their values after a restart."
related:
  - docs: /docs/automation/which-tool-to-use/
    title: Which tool to use
  - docs: /docs/configuration/entities_domains/
    title: Entities and domains
  - docs: /integrations/#helper
    title: List of helpers
---

A helper is an {% term entity %} that you create yourself, without a device behind it. For example, a toggle that pauses an automation, a timer that counts down, or a sensor that shows the average temperature of several rooms. Helpers appear like other entities, so you can use them in automations, scripts, and dashboards.

You create and manage helpers in {% my helpers title="**Settings** > **Devices & services** > **Helpers**" %}.

## When do you need a helper?

Most automations don't need a helper. You need one when Home Assistant has to remember something, when you want to set something yourself that an automation then uses, or when you want a sensor that calculates its value from other entities. For example:

- You want to pause an automation without editing it, for example, while you're on vacation.
  - Create a **Toggle**. The automation only runs while the toggle is on. To pause the automation, turn the toggle off on your dashboard.
- You want to choose a value on your dashboard, and let automations use it.
  - Create a **Number**, for example, for the temperature the heating should reach, or a **Dropdown**, for example, for the mode of your home: Home, Away, or Night.
- You want something to happen a while later, even if Home Assistant restarts in between.
  - Create a **Timer**, and turn on **Restore state and time when Home Assistant starts**. One automation starts the timer, and another one reacts when it finishes.
  - If the timer finishes while Home Assistant isn't running, the automation that reacts to it doesn't run. For details, refer to the [known limitations of the timer](/integrations/timer/#known-limitations).
- You want to count something, for example, how often the doorbell rang today.
  - Create a **Counter**. An automation increases it each time.
- You want a sensor that combines other sensors, for example, the average temperature of all rooms.
  - Create a **Combine the state of several sensors** helper.

If none of these sounds like your situation, you probably don't need a helper yet.

## About the kinds of helpers

There are three kinds of helpers:

- [Helpers that store a value](#helpers-that-store-a-value), for example, a toggle or a timer
- [Helpers that calculate a value](#helpers-that-calculate-a-value) from other entities, for example, the average of several sensors
- [Other helpers](#other-helpers), which combine or control other entities, for example, a group of lights

### Helpers that store a value

These helpers keep what you or an automation set: a value, like the state of a toggle, or settings values, like the time blocks of a schedule.

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

To change a helper later, select it in the list of helpers, and change its settings. Helpers that you set up in YAML can't be changed in the UI. Their settings show **The settings of this entity cannot be edited from the UI. Only entities set up from the UI are configurable from the UI.**

## What happens to a helper value after a restart?

Home Assistant restarts now and then, for example, after an update or a power cut. If your automations depend on a helper, it matters whether the helper still has its value afterwards. For example, if a "Guests staying over" toggle turned itself off, an automation could turn down the heating in the guest room. And if a timer started idle again, the reminder it was counting down to would never come.

Most helpers keep their value after a restart, so usually you don't need to do anything. Check these cases:

- A timer that should keep running
  - By default, a timer stops when Home Assistant restarts, and is idle afterwards. If an automation depends on the timer, turn on **Restore state and time when Home Assistant starts** in the settings of the timer. If the timer finishes while Home Assistant isn't running, automations that react to it don't run after the restart.
- A toggle that should always start on or off
- A toggle that should always start on or off
  - By default, a toggle keeps its state. If it should always be **On**, or always **Off**, after a restart, change **Each time Home Assistant starts** in the settings of the toggle.
- A counter that should start again from its initial value
  - By default, a counter keeps its value. To start at its initial value after every restart, turn off **Restore the last known value when Home Assistant starts** in the settings of the counter.
- A number or a dropdown whose settings you changed
  - If you change the range of a number, its value moves to the nearest new limit. For example, if the value is 30 and you change the maximum to 25, the value becomes 25. If you change the range in YAML instead, and the last value is outside the new range, the number starts at its minimum after the restart.
  - If you change the range of a number, its value moves to the nearest new limit. For example, if the value is `30` and you change the maximum to `25`, the value becomes `25`. If you change the range in YAML instead, and the last value is outside the new range, the number starts at its minimum after the restart.
  - If you remove the option that a dropdown is set to, the dropdown shows as **Unknown** until you select another option. After a restart, it starts at its first option.

In YAML, a number, dropdown, text, or date and time helper can have an `initial` value. It then starts with that value after every restart, instead of its last value.

Helpers that calculate a value calculate it again from their entities. A schedule works out from its time blocks whether it's on.

## Where can you use helpers?

You can use helpers in these places:

- In automations and scripts
  - An automation can start when the helper changes, for example, when a timer finishes, with the [Timer finished](/triggers/timer.finished/) trigger.
  - An automation can check the helper in a condition, and only continue if, for example, a toggle is on.
  - An automation or a script can change the helper in an action. For example, an automation can turn on a toggle or [start a timer](/actions/timer.start/).
  - For more examples, refer to [Which tool to use](/docs/automation/which-tool-to-use/#combining-the-tools).
- On a dashboard
  - You can see and change the helper yourself. For example, use a toggle to pause an automation, or a number to set a target temperature. Add the helper to a card, like any other entity.
- With Assist
  - You can change the helper with your voice, for example, turn a toggle on or off. First, [expose the helper to Assist](/voice_control/voice_remote_expose_devices/).
