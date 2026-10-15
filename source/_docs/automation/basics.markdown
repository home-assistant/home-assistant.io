---
title: "Understanding automations"
description: "A breakdown of what an automation consists of."
---

All {% term automations %} are made of at least a {% term trigger %} and an {% term action %}. Optionally combined with a {% term condition %}. Take for example the automation:

> When Paulus enters home and it is after sunset, turn on the lights in the living room.

## Parts of an automation

The previous automation example has the following three parts:

```text
(trigger part)    When Paulus enters home
(condition part)  and it is after sunset
(action part)     turn on the lights in the living room
```

### Trigger part

The [trigger](/docs/automation/trigger/) belongs to the first part of the automation. When the trigger part is verified, the automation starts.

### Condition part

The second part of an automation has the [condition](/docs/automation/condition/). If the condition is verified, the action part takes place. In the example of the automation above, the lights in the living room will turn on only if the sun has set. If Paulus comes home before sunset, nothing happens when the sun sets later. For why, and how to cover both cases, refer to [how automations react to changes](/docs/automation/how-automations-react-to-changes/#when-two-things-must-both-be-true).

### Action part

The last part of an automation has the [action](/docs/automation/action/). The action part will be performed only if the trigger and condition parts are met. Some examples of actions are: turn on a light, set the temperature on a thermostat or activate a scene.

## Creating automations

Now that you've got a sneak peek of what is possible, it's time to get your feet wet and create your first automation.

By default, create automations with the visual editor, one of the available [automation editors](/docs/automation/editor/). You can create an automation in the visual editor of the UI by following the steps below.

1. Go to **Settings** > **Automations & scenes**.
2. In the lower right corner, select **Create automation** > **Create new automation**.

### Adding a trigger

1. In the **When** section, select **Add trigger**.
2. Now you can do one of the following:
   - Select a target and then a trigger.
     1. Under **By target**, select the entity, device or service to which you want to apply the trigger to. You can find the available entities, devices or services listed by:
        - Area of your home, in the **Home** section.
        - **Entities**, **Devices** and **Services**, in the **Unassigned** section.
        - Labels that you have previously created, in the **Labels** section.
     2. For that target, you can see the available triggers on the right side. Select **+** on the desired one.
   - Select a trigger.
     1. Select **By type**, and then select the trigger type from the list on the left.
     2. From the listed triggers, select **+** on the one you choose.
   - Search for a trigger or target and then select a trigger.
     1. Enter the name of one of the following in the search box:
        - A target: an entity, a device or a service.
        - A group of targets: an area or label.
        - A trigger.
     2. From the listed results, select **+** on the desired trigger.
3. In the window on the right, you will have different options depending on the selected trigger. You might find the following ones, for example:
   - To select what the trigger monitors, select **Add target**. To learn which entities are part of a target, refer to [Automation targets](/docs/automation/targets/).
     1. Do one of the following:
        - Select an entity, device or service to monitor a specific one.
        - Select entities, devices or services in an area, floor or with a certain label to monitor a group of them.
     2. You can add more targets by selecting **Add target** again.
   - Under **Trigger when**, if you monitor more than one target, you can decide when the automation starts:
     - **Each**: Every time one of the targets makes the change that the trigger reacts to, for example, every time one of the lights turns on.
     - **First**: The first time one of the targets makes that change. The trigger reacts again only after none of the targets is in that state anymore.
     - **All**: Once all targets have made that change, for example, when the last of the lights turns on.
4. Select **Save**.

### Adding a condition

Note that you don´t need to add a condition to create an automation.

1. In the **And if** section, select **Add condition**.
2. Under **Blocks**, you have the following options:
   - If you want to make sure that a condition is not verified for the automation to run, select  **+** on the **Not** block.
   - If you will add more than one condition, you can select:
     - the **And** block to make sure all conditions are verified for the automation to run.
     - the **Or** block to make sure at least one of the conditions is verified for the automation to run.
3. Select **Add condition** again and now you can:
   - Select a target and then a condition.
     1. Under **By target**, select the entity, device or service to which you want to apply the condition to. You can find the available entities, devices or services listed by:
        - Area of your home, in the **Home** section.
        - **Entities**, **Devices** and **Services**, in the **Unassigned** section.
        - Labels that you have previously created, in the **Labels** section.
     2. For that target, you can see the available conditions on the right side. Select **+** on the desired one.
   - Select a condition.
     1. Select **By type**, and then select the condition type from the list on the left.
     2. From the listed conditions, select **+** on the one you choose.
   - Search for a condition or target and then select a condition.
     1. Enter the name of one of the following in the search box:
        - A target: an entity, a device or a service.
        - A group of targets: an area or label.
        - A condition.
     2. From the listed results, select **+** on the desired condition.
4. In the window on the right, you will have different options depending on the selected condition. To select what the condition checks, select **Add target**. To learn which entities are part of a target, refer to [Automation targets](/docs/automation/targets/).
   1. Do one of the following:
      - Select an entity, device or service to check a specific one.
      - Select entities, devices or services in an area, floor or with a certain label to check a group of them.
   2. You can add another target by selecting **Add target** again.
5. Select **Save**.

### Adding an action

1. In the **Then do** section, select **Add action**.
2. Under **Blocks**, you have many options that allow you, for example, to:
   - Set up conditions for specific actions.
   - Define the way a sequence of actions is performed.
   - Wait for a trigger or a template to run a sequence of actions.
3. Now you can do one of the following:
   - Select a target and then an action.
     1. Under **By target**, select the entity, device or service to which you want to apply the action to. You can find the available entities, devices or services listed by:
        - Area of your home, in the **Home** section.
        - **Entities**, **Devices** and **Services**, in the **Unassigned** section.
        - Labels that you have previously created, in the **Labels** section.
     2. For that target, you can see the available actions on the right side. Select **+** on the desired one.
   - Select an action.
     1. Select **By type**, and then select the action type from the list on the left.
     2. From the listed actions, select **+** on the one you choose.
   - Search for an action or target and then select an action.
     1. Enter the name of one of the following in the search box:
        - A target: an entity, a device or a service.
        - A group of targets: an area or label.
        - An action.
     2. From the listed results, select **+** on the desired action.
4. In the window on the right, you will have different options depending on the selected action. To select what the action controls, select **Add target**. To learn which entities are part of a target, refer to [Automation targets](/docs/automation/targets/).
   1. Do one of the following:
      - Select an entity, device or service to control a specific one.
      - Select entities, devices or services in an area, floor or with a certain label to control a group of them.
   2. You can add another target by selecting **Add target** again.
5. Select **Save**.

## Automations as entities

Each automation is also an {% term entity %}, with an entity ID such as `automation.turn_on_porch_light`. Automation entities are listed with all other entities under {% my entities title="**Settings** > **Devices & services** > **Entities**" %}. Like other entities, you can show an automation entity on a dashboard, or use it in other automations and {% term scripts %}.

### Automation states

The {% term state %} shows whether the automation is enabled. It doesn't show whether the automation is running right now. Each item shows the label you see in the Home Assistant interface, followed by the state as Home Assistant stores it. If you write {% term templates %} or edit automations in {% term YAML %}, use the stored state.

- **On** (`on`): The automation is enabled. It reacts to its {% term triggers %}.
- **Off** (`off`): The automation is disabled. It ignores its triggers.
- **Unavailable** (`unavailable`): The configuration of the automation isn't valid, so Home Assistant can't set it up. For details, refer to [Automation is unavailable after an update](/docs/automation/troubleshooting/#automation-is-unavailable-after-an-update-automation-is-unavailable-or-failed-to-set-up).

When Home Assistant restarts, each automation keeps its on or off state, unless it has an [initial state](/docs/automation/yaml/#automation-initial-state) set in YAML.

### Automation attributes

The attributes tell you more about an automation, such as when it last ran, or whether it's running right now. You can use them to check an automation without opening it, or to make another automation depend on it.

You can see and use the attributes in different places:

- In the entities list or on a dashboard, select the automation entity, and then select **Menu** {% icon "mdi:dots-vertical" %} > **Details**.
- In an automation or a script, select an attribute in the **Attribute** field of a **State** trigger or condition.
- In templates, use `state_attr()`. For example, `state_attr('automation.turn_on_porch_light', 'last_triggered')`.

Automations have the following automation-specific attributes. **Max running automations** and **ID** are only present in some cases, as described in the list. If an automation is unavailable, **ID** is the only automation-specific attribute it can have.

- **Last triggered** (`last_triggered`): When the automation was last triggered after its {% term conditions %} were either met or skipped. If the conditions stopped the automation, or the run mode didn't allow another run, this time doesn't change.
  - Use it to check when an automation was last triggered, or to keep another automation from reacting again too soon.
- **Running automations** (`current`): How many runs of the automation there are right now. In **Queued** mode, this includes the runs that are waiting in the queue. Usually, this is `0`.
  - Use it to wait until an automation has finished, or to skip something while it's still running.
- **Run mode** (`mode`): What happens when a trigger reacts while the automation is still running: **Single**, **Restart**, **Queued**, or **Parallel**. For details, refer to [Automation modes](/docs/automation/modes/).
- **Max running automations** (`max`): How many runs there can be at the same time, including runs that are waiting. Only automations in **Queued** or **Parallel** mode have this attribute.
  - When **Running automations** reaches this number, the next time a trigger reacts, no new run is added. For details, refer to [I see an "Already running" warning in the logs](/docs/automation/troubleshooting/#i-see-an-already-running-warning-in-the-logs).
- **ID** (`id`): The unique ID of the automation. It connects the entity to the configuration of the automation. Automations that you create in the editor always have one. Automations in YAML only have one if you set `id`.

### Actions for automations

To control an automation from another automation or a script, use these {% term actions %}:

- [Turn on automation](/actions/automation.turn_on/): Sets the state to **On**.
- [Turn off automation](/actions/automation.turn_off/): Sets the state to **Off**. By default, it also stops the actions that are running.
- [Toggle automation](/actions/automation.toggle/): Switches the state between **On** and **Off**.
- [Trigger automation](/actions/automation.trigger/): Runs the actions right away, without waiting for a trigger. By default, it skips the conditions.
