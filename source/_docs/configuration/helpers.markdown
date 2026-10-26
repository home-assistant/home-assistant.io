---
title: "Helpers"
description: "Helpers are entities that you create yourself, such as a toggle, a timer, or a sensor that combines other sensors. Learn which helpers there are, how to create them, and what happens to their values after a restart."
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

## About the kinds of helpers

There are three kinds of helpers:

- [Helpers that store a value](#helpers-that-store-a-value), such as a toggle or a timer
- [Helpers that calculate a value](#helpers-that-calculate-a-value) from other entities, such as the average of several sensors
- [Other helpers](#other-helpers), which combine or control other entities, such as a group of lights

### Helpers that store a value

These helpers keep what you or an automation set: a value, like the state of a toggle, or settings values, like the time blocks of a schedule.

- [**Toggle**](/integrations/input_boolean/)
  - An on/off switch. For example, use it to pause an automation or to show that a guest is staying over.
- [**Number**](/integrations/input_number/)
  - A number that you set with a slider or a box. For example, use it for a target temperature.
- [**Dropdown**](/integrations/input_select/)
  - One option from a list that you define. For example, use it for the mode of your home.
- [**Text**](/integrations/input_text/)
  - A short piece of text. For example, use it for a message to show on a dashboard.
- [**Date and/or time**](/integrations/input_datetime/)
  - A date, a time, or both. For example, use it for the time your alarm goes off.
- [**Button**](/integrations/input_button/)
  - A button that you press to start automations. It remembers when it was last pressed.
- [**Counter**](/integrations/counter/)
  - A whole number that goes up, goes down, or starts again from its initial value. For example, use it to count how many times a door opened today.
- [**Timer**](/integrations/timer/)
  - Counts down a time that you set. You can start, pause, cancel, finish, or change it.
- [**Schedule**](/integrations/schedule/)
  - Turns on during time blocks that you set for each day of the week. For example, use it for the hours when the heating should be on.

### Helpers that calculate a value

These helpers calculate their value from other entities, and update it when those entities change. For example:

- [**Combine the state of several sensors**](/integrations/min_max/): The minimum, maximum, average, or sum of several sensors.
- [**Derivative sensor**](/integrations/derivative/): How fast a value changes, such as how fast the temperature rises.
- [**Integral sensor**](/integrations/integration/): A total over time. For example, it calculates the energy used from the power.
- [**Utility Meter**](/integrations/utility_meter/): The use of energy, gas, or water per day, week, month, or another period.
- [**History Stats**](/integrations/history_stats/): How long or how often an entity was in a state, such as how long the heating was on today.
- [**Threshold Sensor**](/integrations/threshold/): Whether a value is above or below a limit that you set.
- [**Template**](/integrations/template/): An entity whose state comes from a [template](/docs/templating/), a small piece of code.

For all helpers of this kind, refer to the [list of helpers](/integrations/#helper).

### Other helpers

Some helpers do more than store or calculate a value. For example:

- [**Generic thermostat**](/integrations/generic_thermostat/): Turns a heater or a cooler on and off, based on a temperature sensor.
- [**Group**](/integrations/group/): Combines several entities into one, such as all lights in a room.
- [**Change device type of a switch**](/integrations/switch_as_x/): Shows a switch as another type of device, such as a light.

## When do you need a helper?

Most automations don't need a helper. You need one when Home Assistant has to remember something, when you want to set something yourself that an automation then uses, or when you want a sensor that calculates its value from other entities. For example:

- You want to pause an automation without editing it, such as while you're on vacation.
  - Create a **Toggle**. The automation only runs while the toggle is on. To pause the automation, turn the toggle off on your dashboard.
- You want to choose a value on your dashboard, and let automations use it.
  - Create a **Number** for a value, such as the temperature the heating should reach.
  - Or create a **Dropdown** for a choice, such as the mode of your home: **Home**, **Away**, or **Night**.
- You want something to happen a while later, even if Home Assistant restarts in between.
  - Create a **Timer**, and turn on **Restore state and time when Home Assistant starts**. One automation starts the timer, and another one reacts when it finishes.
  - If the timer finishes while Home Assistant isn't running, the automation that reacts to it doesn't run. For details, refer to the [known limitations of the timer](/integrations/timer/#known-limitations).
- You want to count something, such as how often the doorbell rang today.
  - Create a **Counter**. An automation increases it each time.
- You want a sensor that combines other sensors, such as the average temperature of all rooms.
  - Create a **Combine the state of several sensors** helper.

If none of these sounds like your situation, you probably don't need a helper yet.

## Creating a helper

1. Go to {% my helpers title="**Settings** > **Devices & services** > **Helpers**" %}.
2. Select **Create helper**.
3. Select the type of helper, such as **Toggle**.
4. Enter a name, and fill in the other options.
5. Select **Create** or **Submit**, depending on the type of helper.

Some places let you create a helper right where you need it. For example, if a field asks for a toggle, a number, or a dropdown, the list of entities offers to create a new helper of that type.

## Changing a helper in the UI

You can change any helper that you created in the UI. For example, you can add an option to a **Dropdown**, or add a sensor to a **Combine the state of several sensors** helper.

1. Go to {% my helpers title="**Settings** > **Devices & services** > **Helpers**" %}, and select the helper.
2. Select the cog {% icon "mdi:cog-outline" %} to open the settings.
3. Change the settings that you need. Which settings you see depends on the type of helper:
   - Every helper has the settings that all entities have, such as the name, the icon, the area, and **Voice assistants**. Some helpers, such as a **Button**, only have these settings.
   - Some helpers also show their own settings, as in the following examples:
     - A **Number** shows its **Minimum value** and **Maximum value**.
     - A **Change device type of a switch** helper shows **Show switch as**.
     - A **Toggle**, a **Counter**, or a **Text** helper shows its settings when you select **More options**.
   - Helpers that calculate a value, and other helpers such as a **Group**, have their own settings in a separate entry, named after the helper type, such as **Template options** or **Derivative sensor options**. You find it above **Voice assistants**. Select it, change the settings, and then select **Submit**.
4. If you changed settings in the settings dialog itself, select **Update**.

## Changing a helper in YAML

You can only change a helper in YAML if you set it up in YAML. Helpers that you created in the UI aren't stored in your YAML configuration.

For a helper that you set up in YAML, you can't change its own settings in the UI, such as the range of a **Number**. If the helper has a unique ID, you can still change the settings that all entities have, such as the area, in the UI. Helpers that store a value, such as a **Toggle** or a **Number**, always have one. For other helpers, refer to [Why does this entity not have a unique ID?](/faq/unique_id/).

### Prerequisites

- The helper is set up in YAML.
  - To check, go to {% my helpers title="**Settings** > **Devices & services** > **Helpers**" %}. A helper that you set up in YAML shows {% icon "mdi:pencil-off" %} in the **Editable** column. Its settings show one of the following messages:
    - **The settings of this entity cannot be edited from the UI. Only entities set up from the UI are configurable from the UI.**
    - A message that the entity doesn't have a unique ID, and that its settings can't be managed from the UI.
  - You can also look for the helper in your YAML configuration, such as {% term "configuration.yaml" %}.

### To change a helper in YAML

1. Open the YAML file where you set up the helper, such as {% term "configuration.yaml" %}.
   - For ways to open and edit the file, refer to [Editing `configuration.yaml`](/docs/configuration/#editing-configurationyaml).
2. Find the entry of the helper, and change its settings.
   - For the settings of each type of helper, refer to its page, such as [Toggle](/integrations/input_boolean/).
3. Save the file.
4. [Reload the YAML configuration](/common-tasks/general/restarting/#reloading-the-yaml-configuration).
   - Result: The helper uses its new settings.
   - Some types of helpers, such as a **Counter**, don't support reloading. If the helper still uses its old settings, [restart Home Assistant](/common-tasks/general/restarting/#restarting-home-assistant).

## Creating a similar helper

You can't copy a helper. To use the same settings for several things, [create a new helper](#creating-a-helper) for each one. For example, to show the average temperature of each floor, create one **Combine the state of several sensors** helper per floor. In each one, select the temperature sensors of that floor.

## What happens to a helper value after a restart?

Home Assistant restarts now and then, such as after an update or a power cut. If your automations depend on a helper, it matters whether the helper still has its value afterwards. For example, if a "Guests staying over" toggle turned itself off, an automation could turn down the heating in the guest room. And if a timer started idle again, the reminder it was counting down to would never come.

Most helpers keep their value after a restart, so usually you don't need to do anything. Check these cases:

- A timer that should keep running
  - By default, a timer stops when Home Assistant restarts, and is idle afterwards. If an automation depends on the timer, turn on **Restore state and time when Home Assistant starts** in the settings of the timer. If the timer finishes while Home Assistant isn't running, automations that react to it don't run after the restart.
- A toggle that should always start on or off
  - By default, a toggle keeps its state. To change that, open the [settings](#changing-a-helper-in-the-ui) of the toggle, and select **More options**. Under **Each time Home Assistant starts**, select one of the following options:
    - To always start on, select **Turn on**.
    - To always start off, select **Turn off**.
    - To keep the state from before the restart, select **Restore previous state**. This is the default.
- A counter that should start again from its initial value
  - By default, a counter keeps its value. To start at its initial value after every restart, turn off **Restore the last known value when Home Assistant starts** in the [settings](#changing-a-helper-in-the-ui) of the counter, under **More options**.
- A number or a dropdown whose settings you changed
  - If you change the range of a number, its value moves to the nearest new limit. For example, if the value is `30` and you change the maximum to `25`, the value becomes `25`. If you change the range in YAML instead, and the last value is outside the new range, the number starts at its minimum after the restart.
  - If you remove the option that a dropdown is set to, the dropdown shows as **Unknown** until you select another option. After a restart, it starts at its first option.

In YAML, a number, dropdown, text, or date and time helper can have an `initial` value. It then starts with that value after every restart, instead of its last value.

Helpers that calculate a value calculate it again from their entities. A schedule works out from its time blocks whether it's on.

## Where can you use helpers?

You can use helpers in these places:

- In automations and scripts
  - An automation can start when the helper changes. For example, the [Timer finished](/triggers/timer.finished/) trigger starts an automation when a timer finishes.
  - An automation can check the helper in a condition. For example, the automation only continues if a toggle is on.
  - An automation or a script can change the helper in an action. For example, an automation can turn on a toggle or [start a timer](/actions/timer.start/).
  - For more examples, refer to [Which tool to use](/docs/automation/which-tool-to-use/#combining-the-tools).
- On a dashboard
  - You can see and change the helper yourself. For example, use a toggle to pause an automation, or a number to set a target temperature. Add the helper to a card, like any other entity.
- With Assist
  - You can change the helper with your voice. For example, you can turn a toggle on or off. First, [expose the helper to Assist](/voice_control/voice_remote_expose_devices/).
