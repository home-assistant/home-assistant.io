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

The second part of an automation has the [condition](/docs/automation/condition/). If the condition is verified, the action part takes place. In the example of the automation above, the lights in the living room will turn on only if the sun has set.

### Action part

The last part of an automation has the [action](/docs/automation/action/). The action part will be performed only if the trigger and condition parts are met. Some examples of actions are: turn on a light, set the temperature on a thermostat or activate a scene.

## Creating automations

Now that you've got a sneak peek of what is possible, it's time to get your feet wet and create your first automation.

By default, to create automations, use the [automation editor](/docs/automation/editor/).

### Creating automations with the new Labs features

{% include integrations/labs_entity_triggers_note.md %}

After enabling the automation preview features in Labs, you can create an automation in the visual editor of the UI by following the steps below.

1. Go to **Settings** > **Automations & scenes**.
2. In the lower right corner, select **Create automation** > **Create new automation**.

#### Adding a trigger

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
   - Under **Targets**, you can select the first target or another one by selecting **Add target**.
     1. Do one of the following:
        - Select an entity, device or service to monitor a specific one.
        - Select entities, devices or services in an area, floor or with a certain label to monitor a group of them.
     2. You can add more targets by selecting **Add target** again.
   - Under **Behavior**, you can decide how the automation starts by selecting one of the options there.
     - **First**: if monitoring multiple targets, the automation only fires on the first time the trigger is verified for a target.
     - **Last**: if monitoring multiple targets, the automation only fires after the trigger is verified for all targets.
     - **Any**: the automation fires whenever a trigger of a monitored target is verified.
4. Select **Save**.

#### Adding a condition

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
4. In the window on the right, you will have different options depending on the selected condition. Under **Targets**, you can add the first target or another one by selecting **Add target**.
   1. Do one of the following:
      - Select an entity, device or service to monitor a specific one.
      - Select entities, devices or services in an area, floor or with a certain label to monitor a group of them.
   2. You can add another target by selecting **Add target** again.
5. Select **Save**.

#### Adding an action

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
4. In the window on the right, you will have different options depending on the selected action. Under **Targets**, you can add the first target or another one by selecting **Add target**.
   1. Do one of the following:
      - Select an entity, device or service to monitor a specific one.
      - Select entities, devices or services in an area, floor or with a certain label to monitor a group of them.
   2. You can add another target by selecting **Add target** again.
5. Select **Save**.
