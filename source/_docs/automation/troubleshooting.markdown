---
title: "Testing and troubleshooting automations"
description: "How to test the conditions and actions of an automation and how to find out why an automation did not run, using the trace timeline, the logs, and the test buttons in the automation editor."
---

Sometimes an automation does not do what you expect. Maybe it does not run at all, maybe it runs at the wrong moment, or maybe one of the actions in the middle quietly fails. Home Assistant has built-in tools to help you find out exactly what happened, without having to dig through log files.

The most useful tool is the **trace**. Every time an automation runs, Home Assistant records a step-by-step timeline of what was triggered, which conditions were checked, and what each action did. You can also test parts of an automation directly from the editor, without waiting for a real trigger.

## Testing your automation

Many automations can be tested directly in the automation editor UI.

### Checking the state of a condition

While the automation is open in the automation editor, you can see whether each condition passes at every moment. Home Assistant checks the condition again every second, so you can watch it change when the situation changes, for example, when a door opens. It is also checked again when you edit the condition.

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %} and open the automation.
2. Hover over the state indicator circle on the left side of the condition row.
   - Result: The tooltip shows one of the following states:
     - **Condition passes**: the condition is met.
     - **Condition did not pass**: the condition is not met.
     - **Invalid condition configuration**: the condition has an invalid input value for an option, for example.
     - **Condition state unknown**: the condition state can't be checked due to a missing input value for an option, for example.

### Testing a condition

You can test each {% term condition %} of an automation on its own.

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %} and open the automation.
2. On the right side of the condition row, select **Menu** {% icon "mdi:dots-vertical" %}, and then select **Test**.
   - You can test a building block such as **And** as a whole, or test each condition within it.
   - The test checks the condition on its own, without trigger data or variables from earlier blocks. If the condition depends on them, the result is not reliable. In that case, [run the automation with a simulated trigger](#using-a-simulated-trigger-to-test-an-automation) and check its [trace](#traces) instead.
   - Result: For a few seconds, the condition is highlighted to show whether it passed at the moment it was tested:
     - If the condition is met, the condition row displays the message **Condition passes**.
     - If the condition is not met, the condition row displays the message **Condition did not pass**.
     - If all conditions of the automation pass, the automation runs its actions when it is triggered.

### Testing an action

To test a single {% term action %} of an automation, you can run it manually.

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %} and open the automation of interest.
2. On the right side of the action row, select **Menu** {% icon "mdi:dots-vertical" %}, and then select **Run action**.
   - The action runs on its own, without trigger data, variables, or data returned by earlier blocks. If the action depends on them, [run the automation with a simulated trigger](#using-a-simulated-trigger-to-test-an-automation) and check its [trace](#traces) instead.
   - Result: The action runs immediately. For a few seconds, the action row displays the message **Action ran successfully** or **Error running action**.
3. If the action failed, select the message while it is shown to see more information about the error.

### Testing all the actions

To test the full sequence of {% term actions %} of an automation, you can run all of them manually at once. This skips the {% term triggers %} and {% term conditions %} of the automation.

{% note %}
The actions run without trigger data, so there is no [trigger ID](/docs/automation/trigger/#trigger-id). If an action depends on which trigger started the automation, for example, a **Triggered by** condition in a **Choose** block or a template that uses `trigger` data, [run the automation with a simulated trigger](#using-a-simulated-trigger-to-test-an-automation) instead.
{% endnote %}

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Do one of the following:
   - In the automation list, select **Overflow menu** {% icon "mdi:dots-vertical" %} next to the automation.
   - Open the automation, and in the top bar of the automation editor, select **Menu** {% icon "mdi:dots-vertical" %}.
3. Select **Run actions**.
   - Result: The actions run in order, as if the automation was triggered and all its conditions were met. Conditions within the actions still apply, so a condition step can stop the actions that follow it.

### Triggering an automation manually

To test the conditions and the actions together, without waiting for a real trigger, you can trigger the automation from the **Actions** tool.

{% note %}
The automation runs without trigger data, so there is no [trigger ID](/docs/automation/trigger/#trigger-id). A **Triggered by** condition is never met, and a template that uses `trigger` data has nothing to read. If your conditions or actions depend on the trigger, [run the automation with a simulated trigger](#using-a-simulated-trigger-to-test-an-automation) instead.
{% endnote %}

1. Go to {% my developer_services title="**Settings** > **Tools** > **Actions**" %}.
2. In the **Action** dropdown list, select **Trigger automation**, with **Automation** next to it.
3. Select **Add target**, and then select the automation you are testing.
4. To check the conditions, turn off **Skip conditions**. To skip them, leave it on.
5. Optional: To pass variables for testing, switch to **YAML mode**, and add them under `variables` in the `data` of the action.
6. Select **Perform action**.
   - Result: The automation runs. If **Skip conditions** is off, the automation checks the conditions first.

### Using a simulated trigger to test an automation

To test an automation whose conditions or actions depend on which trigger started it, run it with a simulated trigger. You cause the change that the trigger reacts to by simulating a state change or an event. The automation then runs from the start, with real trigger data, including the [trigger ID](/docs/automation/trigger/#trigger-id).

This works for triggers that react to a state change or to an event, such as the **State**, **Numeric state**, and **Manual event received** triggers. For other triggers, such as a time or an MQTT trigger, cause the real thing the trigger reacts to instead, for example, by publishing the MQTT message.

{% note %}
**Risk of unintended device actions**

Simulating a state change or firing an event starts every automation with a trigger that reacts to it. Those automations control real devices and services.

To avoid this:

- Before you continue, review which automations react to this state change or event.
- Turn off any of these automations that you don't want to run.
{% endnote %}

1. Do one of the following:
   - To simulate a state change, go to {% my developer_states title="**Settings** > **Tools** > **States**" %}.
     - Under **Entity**, select the entity. Then use **Set state** to reproduce the change that your trigger reacts to:
       - For a state trigger, set the **State** from its **From** value to its **To** value. If the entity already has the **To** state, set it to a different state first. Setting the same state again is not a state change, so the trigger does not react.
       - For a numeric state trigger, set a value in **State** that crosses its **Above** or **Below** threshold. If the value is already past the threshold, first set a value on the other side.
       - For a trigger on an attribute, change that attribute under **State attributes (YAML, optional)**.
     - For details, refer to [Setting the state of an entity](/docs/tools/dev-tools/#setting-the-state-of-an-entity).
     - Changing the state here doesn't change the device. It only changes the state that Home Assistant shows, so that the trigger reacts. After the test, the state shown may be wrong until the device reports its state again.
     - Result: Every automation with a trigger on that state change starts, with the trigger data of the simulated change. The actions of the automation run for real.
   - To simulate an event, go to {% my developer_events title="**Settings** > **Tools** > **Events**" %}.
     - If you don't know what the event data looks like, first [listen to the real event](/docs/tools/dev-tools/#subscribe-to-an-event) to see it.
     - Enter the same **Event type** and **Event data (YAML, optional)** as in the trigger of your automation, and select **Fire event**. For details, refer to [Firing an event](/docs/tools/dev-tools/#fire-an-event).
     - Result: Every automation with a trigger on that event starts, with the trigger data of the simulated event. The actions of the automation run for real.
2. To see what the automation did, open its [trace](#traces).

### Checking what triggered an automation

While the automation is open in the automation editor, you can see when a trigger reacts, and what it reacted to.

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %} and open the automation.
2. When a trigger reacts, its row displays the message **Triggered** for a few seconds. Select the message.
   - Result: The **Triggering event detail** dialog shows the trigger data in YAML, for example, the entity and its old and new state.

### Checking your YAML configuration

If you are writing automations in YAML, check your configuration for syntax errors before restarting Home Assistant.

1. Go to {% my server_controls title="**Settings** > **Tools** > **YAML**" %}.
2. In the **Check and restart** section, select **Check configuration**.
   - Result: Home Assistant shows whether the configuration is valid, and lists any errors or warnings.

## Traces

Every time an {% term automation %} runs, Home Assistant records a trace: a step-by-step record of what happened. The trace shows which {% term trigger %} started the automation, whether each {% term condition %} passed, what each {% term action %} did, and which variables changed. If you ran the actions manually, the trace has no trigger, and the conditions of the automation are skipped. Conditions within the actions, such as in an **If-then** or **Choose** block, still run and are shown. Use it to find out why an automation did not do what you expected.

Home Assistant keeps the last 5 traces of each automation. Some triggers also record a trace when they notice a relevant change but do not start the automation. These traces are marked **Did not trigger**. They are kept separately, so they never replace the traces of real runs.

Automations created in YAML must have an [`id`](/docs/automation/yaml/#migrating-your-yaml-automations-to-automationsyaml) for their traces to be available.

### Viewing the traces of an automation

Do this when an automation did not run as expected, to see which path it took and where it stopped. You can open the traces from the automation list, the automation editor, or **Activity**.

1. Do one of the following:
   - Go to {% my automations title="**Settings** > **Automations & scenes**" %}. In the automation list, select **Overflow menu** {% icon "mdi:dots-vertical" %} next to the automation, and then select **Traces**.
     - Result: The trace of the latest run opens.
   - In the automation editor, select **Traces** in the top bar. On narrow screens, select **Menu** {% icon "mdi:dots-vertical" %}, and then select **Traces**.
     - Result: The trace of the latest run opens.
   - In **Activity**, select an entry that the automation caused. In the dialog that opens, select **View trace** next to the automation.
     - Result: The trace of the run that caused this entry opens.
2. To see another run, select it under **Select trace**, or select **Older trace** {% icon "mdi:ray-start-arrow" %} or **Newer trace** {% icon "mdi:ray-end-arrow" %}.
   - The list shows when each run started and how it ended, for example, **Stopped because a condition failed**.

### Parts of a trace

The graph shows the path that the automation took. To see what happened in a step, select it in the graph.

Triggers, conditions, and actions are shown with the icon of their type. Common triggers and conditions use the following icons:

- {% icon "mdi:state-machine" %} **State changed** trigger and **State** condition.
- {% icon "mdi:numeric" %} **Numeric state crossed threshold** trigger and **Numeric state** condition.
- {% icon "mdi:clock-outline" %} **Time** trigger and condition.
- {% icon "mdi:av-timer" %} **Time pattern** trigger.
- {% icon "mdi:weather-sunny" %} **Sun** trigger and condition.
- {% icon "mdi:gesture-double-tap" %} **Manual event received** trigger.
- {% icon "mdi:map-marker-radius" %} **Zone** trigger and condition.

Building blocks use the following icons:

- {% icon "mdi:arrow-decision" %} **Choose**. Each option shows {% icon "mdi:checkbox-marked-outline" %} if the automation took it, and {% icon "mdi:checkbox-blank-outline" %} if it did not.
- {% icon "mdi:call-split" %} **If-then**, with {% icon "mdi:call-received" %} for **Then** and {% icon "mdi:call-missed" %} for **Else**.
- {% icon "mdi:refresh" %} **Repeat**.
- {% icon "mdi:format-list-numbered" %} **Run in sequence**.
- {% icon "mdi:shuffle-disabled" %} **Run in parallel**.
- {% icon "mdi:timer-outline" %} **Wait for time to pass (delay)**.
- {% icon "mdi:code-braces" %} **Wait for a template**.
- {% icon "mdi:traffic-light" %} **Wait for a trigger**.
- {% icon "mdi:close" %} The end of the path when a condition is not met.

The tabs next to the graph show more information:

- **Step details**: The configuration and the result of the selected step. Within this tab, **Changed variables** shows the variables that the step changed.
- **Trace timeline**: The steps that ran, and when they ran.
- **Related activity**: The activity related to this run of the automation.
- **Automation config**: The configuration of the automation at the time it ran.
- **Blueprint config**: Only shown if the automation was created from a {% term blueprint %}.

### Changing the number of stored traces

By default, Home Assistant keeps the last 5 traces of each automation. To keep more, add the `trace` option to the automation. The visual editor has no field for this option, so you add it in YAML.

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %} and open the automation.
2. Select **Menu** {% icon "mdi:dots-vertical" %}, and then select **Edit in YAML**.
3. Add the following option, with the number of traces that you want to keep:

   ```yaml
   trace:
     stored_traces: 20
   ```

4. Select **Save**.
   - Result: Home Assistant keeps up to this number of traces of runs, and the same number of **Did not trigger** traces.

## Testing templates

If your automation uses [templates](/docs/templating/), test them in the template editor before you use them in the automation. The template editor doesn't have the `trigger` variable, so you define the values that your template uses yourself. For the steps, refer to [testing a template](/docs/tools/dev-tools/#testing-a-template).

## Troubleshooting your automation

Most problems with automations show up in the [trace](#traces). Open the trace of the automation first, and then find the symptom below.

{% details "My automation doesn't trigger: the automation is turned off" %}

### Symptom: the automation doesn't start

The change that the trigger waits for happens, but the automation doesn't start, and there is no new trace.

#### Cause

The automation is turned off. A turned-off automation doesn't react to its triggers. You can still run its actions manually, so **Run actions** works.

#### Resolution

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %} and open the automation.
2. If the editor shows **Automation is disabled**, select **Enable**.

{% enddetails %}

{% details "My automation doesn't trigger: the value was already past the threshold" %}

### Symptom: a Numeric state crossed threshold trigger doesn't react

The automation has a **Numeric state crossed threshold** trigger. The value is above or below the threshold, but the automation doesn't start.

#### Cause

The trigger only reacts when the value crosses the threshold. If the value was already past the threshold when the automation was turned on or Home Assistant started, the trigger waits until the value goes back and crosses the threshold again.

#### Resolution

- Wait for the value to cross the threshold again.
- To also check the value at other moments, add another trigger, such as a **Home Assistant** trigger set to **Start**, and a **Numeric state** condition with the same threshold.

{% enddetails %}

{% details "My automation doesn't trigger: the state doesn't match" %}

### Symptom: a State changed trigger doesn't react to the state you see

The automation has a **State changed** trigger with a **To** or **From** state. The entity changes to that state in the UI, but the automation doesn't start.

#### Cause

The UI shows a state in a readable form, for example, **Open** for a door sensor. The trigger compares the raw state, which can be different, for example, `on`. If you typed the state that the UI shows, it doesn't match the raw state.

#### Resolution

1. Go to {% my developer_states title="**Settings** > **Tools** > **States**" %} and find the entity.
   - Result: The **State** column shows the raw state.
2. In the trigger, select the state from the list, or enter the raw state.

{% enddetails %}

{% details "My automation doesn't trigger: the entity came back from unavailable" %}

### Symptom: a State changed trigger with a From state doesn't react

The automation has a **State changed** trigger with a **From** state, for example, from `off` to `on`. The entity is now in the **To** state, but the automation didn't start.

#### Cause

The entity was unavailable in between, for example, because the device lost its connection. The change was from `unavailable` to `on`, not from `off` to `on`, so the **From** state doesn't match.

#### Resolution

If the automation should react no matter what the previous state was, clear **From**. The trigger then also reacts when the entity comes back from unavailable.

{% enddetails %}

{% details "My automation doesn't trigger: the trigger doesn't keep checking" %}

### Symptom: the automation doesn't start while something is true

You expect the automation to start while something is true, for example, while a temperature is high. The automation doesn't start, or only starts once.

#### Cause

Triggers react to a change. They don't keep checking whether something is still true. For example, a **Numeric state crossed threshold** trigger reacts once, when the value crosses the threshold.

#### Resolution

- Use a trigger for the moment that the automation should start, and a {% term condition %} for what must be true at that moment.
- To check something regularly, use a **Time pattern** trigger, and a condition for what must be true.

{% enddetails %}

{% details "My automation stopped working after an update: a delay or wait was lost" %}

### Symptom: an automation that was waiting didn't finish

An automation was waiting, for example, in a delay, a wait, or a trigger with **For at least**. After Home Assistant restarted, for example, to install an update, the automation didn't continue.

#### Cause

When Home Assistant restarts, it stops the automations that are running. A delay, a wait, or a **For at least** duration that was in progress is lost.

#### Resolution

For long waits, don't use a delay. Instead, use a trigger for the moment that the automation should continue, for example, a **Time** trigger. To also handle a restart, add a **Home Assistant** trigger set to **Start**, and a condition that checks whether the automation still needs to run.

{% enddetails %}

{% details "My automation stopped working after an update: an entity ID changed" %}

### Symptom: the automation doesn't react to an entity, or doesn't control it

The automation used to work with an entity, but now it doesn't start, or its action doesn't change the entity.

#### Cause

The entity ID changed, for example, because you renamed it. Home Assistant doesn't update automations when an entity ID changes, so the automation still uses the old entity ID. For actions, the logs show a warning like `Referenced entities light.kitchen are missing or not currently available`.

#### Resolution

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %} and open the automation.
2. In each trigger, condition, and action that uses the old entity, select the entity again.
3. Select **Save**.

{% enddetails %}

{% details "My automation stopped working after an update: the device has a new ID" %}

### Symptom: the automation is unavailable, and a repair mentions the device

The automation has a trigger, condition, or action of the **Device** type. After you replaced or added the device, the automation editor shows **Automation is unavailable**, and {% my repairs title="**Settings** > **System** > **Repairs**" %} shows **Automation … failed to set up**, with an error like `Unknown device`.

#### Cause

A **Device** trigger, condition, or action refers to the device by an internal ID. If you add the same device again, Home Assistant keeps its ID. But the device gets a new ID when it is a different device, for example, a replacement for a broken one, or when you add it again more than 30 days after you removed its integration. The automation then refers to a device that no longer exists.

#### Resolution

1. Go to {% my repairs title="**Settings** > **System** > **Repairs**" %} and select the issue.
2. Select the link to edit the automation.
3. In each **Device** trigger, condition, and action, select the device again. If the editor shows **This device no longer exists. It was replaced by** and the name of a device, select **Update**.
4. Select **Save**.

{% enddetails %}

{% details "My automation stopped working after an update: the configuration is no longer valid" %}

### Symptom: after an update, the automation is unavailable

After you updated Home Assistant, the automation editor shows **Automation is unavailable**, or {% my repairs title="**Settings** > **System** > **Repairs**" %} shows **Automation … failed to set up** or **… uses an unknown action**.

#### Cause

The update changed or removed something that the automation uses, for example, an option of a trigger, or an action of an integration. The configuration of the automation is no longer valid, so Home Assistant can't set it up.

#### Resolution

1. Go to {% my repairs title="**Settings** > **System** > **Repairs**" %} and select the issue.
   - Result: The issue shows the error.
2. Check the backward-incompatible changes in the [release notes](/latest-release-notes/) for what changed.
3. Select the link to edit the automation, correct it, and select **Save**.

{% enddetails %}

{% details "I can't find my device or button as a trigger: the device has no device triggers" %}

### Symptom: the Device trigger shows No triggers

In a **Device** trigger, you select your device, but the list of triggers shows **No triggers**.

#### Cause

Not every {% term integration %} provides device triggers. Without them, the **Device** trigger has nothing to offer for this device.

#### Resolution

Use a trigger on an {% term entity %} of the device instead:

1. In the automation editor, select **Add trigger**.
2. On the **By target** tab, select the device or one of its entities.
   - Result: The triggers for this target are shown, for example, **State changed**.
3. Select the trigger that fits.

{% enddetails %}

{% details "I can't find my device or button as a trigger: the button is an event entity" %}

### Symptom: the button presses are not shown as triggers

Your button or remote has an entity that starts with `event.`, but you don't find its presses as a trigger.

#### Cause

The button presses are events of an event entity. They have their own trigger, **Event received**.

#### Resolution

1. In the automation editor, select **Add trigger**.
2. On the **By target** tab, select the event entity of the button, or its device.
3. Select **Event received**.
4. Under **Event type**, select the press that should start the automation, for example, a single press.

For more information, refer to the [**Event received** trigger](/triggers/event.received/).

{% enddetails %}

{% details "I can't find my device or button as a trigger: the device or entity is disabled" %}

### Symptom: the device or entity is not in the list

When you add a trigger, the device or entity is not in the list.

#### Cause

The device or entity is disabled. Disabled devices and entities are not shown when you add a trigger.

#### Resolution

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}, and open the **Devices** or **Entities** tab.
2. Find the device or entity, and enable it.

{% enddetails %}

{% details "My wait, delay, or for doesn't work as expected: For at least starts over" %}

### Symptom: the trigger reacts later than the For at least duration

The trigger has a **For at least** duration, but the automation starts later than expected, or not at all.

#### Cause

The **For at least** timer stops as soon as the entity leaves the state in the trigger. When the entity goes back to that state, the timer starts over with the full duration. For example, a motion sensor that briefly detects motion again restarts a **For at least** of 10 minutes on the clear state. Changes of attributes don't restart the timer.

#### Resolution

1. In the **History** panel, check the {% term entity %} for short changes during the duration.
2. If the entity changes back and forth, choose a shorter duration, or use an entity that changes less often.

{% enddetails %}

{% details "My wait, delay, or for doesn't work as expected: Wait for a trigger never finishes" %}

### Symptom: the automation stays at a Wait for a trigger action

The trace shows that the automation is waiting at a **Wait for a trigger** action, although the entity already has the state that the trigger waits for.

#### Cause

**Wait for a trigger** only reacts to a change that happens after the wait starts. If the entity already has that state when the wait starts, there is no change, so the wait doesn't finish.

#### Resolution

- To continue right away when the state is already there, use **Wait for a template** instead. It continues immediately if the template is already true.
- To wait for a limited time only, set **Timeout (optional)**.

{% enddetails %}

{% details "My wait, delay, or for doesn't work as expected: the automation continues after the timeout" %}

### Symptom: the automation continues although nothing happened

The automation has a **Wait for a trigger** or **Wait for a template** action with a timeout. When the timeout ends, the automation continues with the next actions, although the thing it waited for didn't happen.

#### Cause

**Continue on timeout** is turned on by default. The automation then continues after the timeout, as if the wait had finished.

#### Resolution

- If the automation should stop when the timeout ends, turn off **Continue on timeout**.
- If the next actions should only run when the wait finished, check `wait.completed` in an **If-then** building block. It is `false` when the timeout ended the wait.

{% enddetails %}

{% details "My wait, delay, or for doesn't work as expected: Wait for a template continues right away" %}

### Symptom: the automation doesn't wait at a Wait for a template action

The automation continues right away at a **Wait for a template** action.

#### Cause

If the template is already true when the wait starts, **Wait for a template** continues immediately.

#### Resolution

To wait for a change, use **Wait for a trigger** instead. It only continues when something changes after the wait starts.

{% enddetails %}

{% details "My wait, delay, or for doesn't work as expected: a new start cancels the delay" %}

### Symptom: the automation stops during a delay or wait, and starts again

The trace shows a run that stopped during a delay or a wait, and a new run that started at the same moment.

#### Cause

The automation uses the **Restart** [mode](/docs/automation/modes/). When the automation starts while it is still running, Home Assistant stops the previous run, including its delay or wait, and starts a new run.

#### Resolution

If the running delay or wait should finish, change the mode. Open the automation, select **Menu** {% icon "mdi:dots-vertical" %}, select **Change mode**, and then select another mode, for example, **Single** to ignore new starts while the automation is running.

{% enddetails %}

{% details "Something turned on or off and I don't know why: find what caused the change" %}

### Symptom: an entity changed, and you don't know why

A light turned on, a switch turned off, or another {% term entity %} changed, and you don't know what caused it.

#### Cause

An automation, a script, a scene, a person, an integration, or the device itself changed the entity. Home Assistant records what caused a change in the **Activity** of the entity.

#### Resolution

1. Open the entity, for example, by selecting it on a dashboard.
2. In the **Activity** section, select the entry of the change.
   - Result: The **Activity details** dialog opens. Under **What happened**, it shows what caused the change, for example:
     - **By automation:** or **By script:**, with the name of the automation or script.
     - **By** and the name of a person who changed it in the UI or the app.
     - **Via** and the name of an integration, for example, when a scene or an action changed it.
3. If an automation or script caused the change, select **View trace** to see why it ran. **View trace** is only shown while Home Assistant still keeps the trace of that run.
4. To see which automations, scripts, and scenes use the entity, in the dialog of the entity, select **Menu** {% icon "mdi:dots-vertical" %}, and then select **Related**.

{% enddetails %}

{% details "Something turned on or off and I don't know why: no cause was recorded" %}

### Symptom: the Activity details show no cause

In the **Activity details** of the change, Home Assistant shows **No cause was recorded for this activity.**

#### Cause

The change didn't come from Home Assistant. For example, someone used a button on the device, the app of the manufacturer, a schedule on the device itself, or another system that controls the device.

#### Resolution

Check the device and the app of the manufacturer for schedules, scenes, or automations that control the device.

{% enddetails %}

{% details "My automation runs at the wrong time: the time zone is wrong" %}

### Symptom: time-based triggers run hours too early or too late

Automations with a **Time** or **Time pattern** trigger run at the wrong hour, always by the same number of hours.

#### Cause

Time triggers use the time zone of Home Assistant. If it is set to another time zone than yours, the times are off.

#### Resolution

1. Go to {% my general title="**Settings** > **System** > **Home information**" %}.
2. On the **Region** card, under **Time zone**, select your time zone.
3. Select **Save**.

{% enddetails %}

{% details "My automation runs at the wrong time: a Time pattern runs once an hour" %}

### Symptom: a Time pattern trigger runs less often than expected

The automation has a **Time pattern** trigger, for example, with **Minutes** set to `5`. It runs once an hour instead of every 5 minutes.

#### Cause

A number on its own means that exact value. **Minutes** set to `5` runs at 5 minutes past every hour. To run every 5 minutes, the value needs a `/` in front of it.

#### Resolution

Set **Minutes** to `/5`. The `/` counts from the clock, so `/5` runs at 0, 5, 10 minutes past the hour, and so on. Use a value that divides 60 evenly, such as `/5`, `/10`, or `/15`, to get even intervals.

{% enddetails %}

{% details "My automation runs at the wrong time: the sun offset is before instead of after" %}

### Symptom: a sunrise or sunset automation runs too early or too late

The automation has a sun trigger with an offset, and it runs before the sunrise or sunset instead of after it, or the other way around.

#### Cause

The offset is set to before the event. In the **Sunrise** and **Sunset** triggers, **Offset type** decides this, and **Before** is the default. In the **Sun** trigger, a negative offset means before the event, and a positive offset means after it.

#### Resolution

- In the **Sunrise** or **Sunset** trigger, set **Offset type** to **After** to run after the event.
- In the **Sun** trigger, remove the `-` from the offset to run after the event.

{% enddetails %}

{% details "My automation runs at the wrong time: the location is wrong" %}

### Symptom: sunrise and sunset automations are off by minutes or hours

Automations with a sun trigger run at a different time than the real sunrise or sunset.

#### Cause

Home Assistant calculates sunrise and sunset from the location of your home. If the location is wrong, the times are wrong.

#### Resolution

1. Go to {% my general title="**Settings** > **System** > **Home information**" %}.
2. On the **Location** card, select **Edit**, and then set the location of your home.

{% enddetails %}

{% details "My automation runs at the wrong time: the helper only has a date" %}

### Symptom: a Time trigger with a date and time helper runs at midnight

The **Time** trigger uses **Value of a date/time helper or timestamp-class sensor**, and the automation runs at midnight.

#### Cause

The date and time helper only has a date, no time. The trigger then runs at midnight at the start of that day.

#### Resolution

Set the helper to have a date and a time, or only a time, and set the time.

{% enddetails %}

{% details "My automation runs at the wrong time: the time has passed or is unavailable" %}

### Symptom: a Time trigger with a helper or sensor doesn't run

The **Time** trigger uses **Value of a date/time helper or timestamp-class sensor**, and the automation doesn't run at the time of the entity.

#### Cause

The date and time of the entity has already passed, or the sensor is unavailable or unknown. The trigger only runs at a date and time in the future.

#### Resolution

1. Go to {% my developer_states title="**Settings** > **Tools** > **States**" %} and check the state of the entity.
2. If the date and time has passed, set a new one. If the sensor is unavailable, check the device or the integration that provides it.

{% enddetails %}

{% details "My automation runs at the wrong time: the clocks went forward" %}

### Symptom: on the day daylight saving time starts, a Time trigger doesn't run

On the day that the clocks go forward, an automation with a **Time** trigger doesn't run.

#### Cause

When the clocks go forward, some times don't exist on that day, for example, 02:30. A trigger at such a time doesn't run on that day. It runs again the next day.

#### Resolution

If the automation must run every day, choose a time outside the hours when the clocks change, for example, before 01:00 or after 04:00.

{% enddetails %}

{% details "My automation runs at the wrong time: the clocks went back" %}

### Symptom: on the day daylight saving time ends, a Time trigger runs twice

On the day that the clocks go back, an automation with a **Time** trigger runs twice.

#### Cause

When the clocks go back, some times happen twice, for example, 02:30. A trigger at such a time runs at both moments.

#### Resolution

If the automation must run only once, choose a time outside the hours when the clocks change, for example, before 01:00 or after 04:00.

{% enddetails %}

{% details "I get an error when I save my automation: the configuration is not valid" %}

### Symptom: saving shows Message malformed

When you save the automation, Home Assistant shows an error that starts with `Message malformed:`, and the automation is not saved.

#### Cause

Home Assistant checks the automation when you save it. Something in it is not valid, for example, an option that the trigger or action needs is empty, or has a value that is not allowed. The message names the part that is not valid.

#### Resolution

1. Read the message to find the trigger, condition, or action that is not valid.
2. Fill in or correct the option, and save again.

{% enddetails %}

{% details "I get an error when I save my automation: the YAML has an error" %}

### Symptom: saving in YAML mode shows an error about the YAML

You edited the automation in YAML, and saving shows an error from the YAML, for example, about the indentation.

#### Cause

The YAML is not valid, for example, because of wrong indentation, or a missing space after a colon.

#### Resolution

Fix the line that the error names, and save again. If you're not sure what is wrong, switch back to the visual editor, and make the change there.

{% enddetails %}

{% details "I get an error when I save my automation: the automation has no name" %}

### Symptom: saving shows Cannot save automation without a name

When you save a new automation, Home Assistant shows **Cannot save automation without a name**.

#### Cause

A new automation needs a name before you can save it.

#### Resolution

In the save dialog, enter a name, and then save again.

{% enddetails %}

{% details "The action works manually but not in my automation" %}

### Symptom: the actions work when you run them, but not when the trigger happens

The automation works when you select **Run actions**, but not when the trigger happens.

#### Cause

**Run actions** skips the triggers and the conditions. If the actions work this way, the problem is in a trigger or a condition.

#### Resolution

[Open the trace](#viewing-the-traces-of-an-automation) of the real run, and check how it ended:

- If the list of traces has no run for that moment, the trigger didn't react. Check the entries that start with "My automation doesn't trigger".
- If the run is marked **Stopped because a condition failed**, check the entry for a failed condition.

{% enddetails %}

{% details "My condition doesn't behave as expected: the condition is only checked when a trigger reacts" %}

### Symptom: the condition becomes true later, but the automation doesn't start

When the trigger reacted, the condition was not met. Later, the condition is met, but the automation doesn't start.

#### Cause

Conditions are only checked once, right after a trigger reacts. They don't start the automation when they become true later.

#### Resolution

Add a trigger for the change that makes the condition true, so the automation also starts at that moment. The conditions are then checked again.

{% enddetails %}

{% details "My condition doesn't behave as expected: all conditions must be met" %}

### Symptom: the automation only runs when every condition is met

The automation has several conditions, and you expect it to run when one of them is met.

#### Cause

The automation only runs when all its conditions are met.

#### Resolution

To run the automation when at least one condition is met, add an **Or** building block, and move the conditions into it.

{% enddetails %}

{% details "My condition doesn't behave as expected: the value is exactly at the threshold" %}

### Symptom: a Numeric state condition doesn't pass at the threshold

The automation has a **Numeric state** condition. The value is exactly at the threshold, and the condition doesn't pass.

#### Cause

**Above** and **Below** don't include the threshold itself. For example, with **Above** set to 20, a value of exactly 20 doesn't pass.

#### Resolution

Adjust the threshold, for example, set **Above** to 19.9 to include 20.

{% enddetails %}

{% details "My condition doesn't behave as expected: the entity is unavailable" %}

### Symptom: a Numeric state condition doesn't pass while the entity is unavailable

The automation has a **Numeric state** condition, and the entity is unavailable or unknown. The condition doesn't pass.

#### Cause

A **Numeric state** condition doesn't pass when the value is unavailable or unknown. This also applies when the threshold comes from another entity that is unavailable or unknown.

#### Resolution

Check the state of the entity, and of the threshold entity, if you use one. If it is unavailable, check that the device has power and a connection.

{% enddetails %}

{% details "My condition doesn't behave as expected: For at least counts from the restart" %}

### Symptom: after a restart, a State condition with For at least doesn't pass

The automation has a **State** condition with **For at least**. After Home Assistant restarted, the condition doesn't pass, although the entity has had that state for a long time.

#### Cause

After a restart, Home Assistant counts the time that an entity has had its state from the moment it started. The **For at least** duration of a **State** condition then starts at the restart.

#### Resolution

Wait until the duration has passed after the restart, or choose a shorter duration.

{% enddetails %}

{% details "My condition doesn't behave as expected: Days of the week after midnight" %}

### Symptom: a Time condition across midnight doesn't pass after midnight

The automation has a **Time** condition with **Days of the week**, and a time range across midnight, for example, **After** 22:00 and **Before** 06:00 on Friday. At 02:00 on Saturday, the condition doesn't pass.

#### Cause

**Days of the week** checks the current day. After midnight, the day is already Saturday, not Friday. The time range across midnight itself works.

#### Resolution

Also select the next day under **Days of the week**, for example, Saturday for a range that starts on Friday evening.

{% enddetails %}

{% details "My condition doesn't behave as expected: a Template condition doesn't pass" %}

### Symptom: a Template condition doesn't pass although the template gives a result

The automation has a **Template** condition. In the template editor, the template gives a result such as `on`, `yes`, or `1`, but the condition doesn't pass.

#### Cause

A **Template** condition only passes when the template gives `true`. Any other result, such as `on`, `yes`, or a number, doesn't pass.

#### Resolution

Change the template so that it gives `true` or `false`, for example, with a comparison such as `==` or `>`. To check the result, [test the template](/docs/tools/dev-tools/#testing-a-template) in the template editor.

{% enddetails %}

{% details "My condition doesn't behave as expected: the condition has an error" %}

### Symptom: a condition doesn't pass, and the logs show an error

A condition doesn't pass, and the logs show a warning like `Error evaluating condition in '<name of your automation>'`.

#### Cause

The condition couldn't be checked, for example, because the entity doesn't exist, or its state is not a number in a **Numeric state** condition. A condition that can't be checked doesn't pass.

#### Resolution

1. Go to {% my logs title="**Settings** > **System** > **Logs**" %}, and check the error.
2. Fix the condition, for example, by selecting an existing entity.

{% enddetails %}

{% details "I can't edit, delete, or rename my automation: the automation is in YAML" %}

### Symptom: the automation can't be edited or deleted in the UI

The automation editor shows **This automation cannot be edited from the UI, because it is not stored in the automations.yaml file, or doesn't have an ID.**, or deleting it shows **Only automations in automations.yaml can be deleted.**

#### Cause

The automation is set up in YAML, outside the `automations.yaml` file, or it has no `id`. Home Assistant can only change automations in `automations.yaml` that have an `id`.

#### Resolution

- To edit the automation in the UI, select **Migrate**. Home Assistant opens an editable copy. After you save the copy, remove the old automation from your YAML configuration.
- To delete the automation, remove it from your YAML configuration, and then reload the automations or restart Home Assistant.

{% enddetails %}

{% details "I can't edit, delete, or rename my automation: the automation uses a blueprint" %}

### Symptom: you can only change the blueprint inputs

The automation editor only shows the blueprint and its inputs. You can't change the triggers, conditions, or actions.

#### Cause

The automation is created from a {% term blueprint %}. The blueprint defines its triggers, conditions, and actions.

#### Resolution

To change the automation itself, turn it into a regular automation:

1. In the automation editor, select **Menu** {% icon "mdi:dots-vertical" %}, and then select **Take control**.
   - Result: A preview of the automation opens.
2. Select **Yes**, and then select **Save**.
   - Result: The automation no longer uses the blueprint. Changes to the blueprint no longer apply to it.

{% enddetails %}

{% details "I can't edit, delete, or rename my automation: the entity ID didn't change" %}

### Symptom: after renaming, the automation still has its old entity ID

You renamed the automation, but its entity ID is still the old one.

#### Cause

**Rename** only changes the name of the automation, not its entity ID.

#### Resolution

1. In the automation editor, select **Menu** {% icon "mdi:dots-vertical" %}, and then select **Settings**.
2. Under **Entity ID**, enter the new entity ID, and then select **Update**.

If other automations, scripts, or dashboards use the old entity ID, update them too. Home Assistant doesn't do this for you.

{% enddetails %}

<a id="my-automation-doesnt-appear-in-the-ui"></a>

{% details "My automation doesn't appear in the UI" %}

### Symptom: the automation is not in the list of automations

You created an automation in the automation editor or from a blueprint, but it doesn't appear in the list of automations.

#### Cause

Your {% term "`configuration.yaml`" %} no longer includes the `automations.yaml` file. The automation editor saves your automations in `automations.yaml`, and Home Assistant only loads that file when {% term "`configuration.yaml`" %} includes it. The default configuration includes it, but the line may have been removed when the file was edited.

#### Resolution

Add this line from the default configuration back to your {% term "`configuration.yaml`" %}:

```yaml
automation: !include automations.yaml
```

{% include integrations/restart_ha_after_config_inclusion.md %}

{% enddetails %}

{% details "My automation triggered, but nothing happened: a condition failed" %}

### Symptom: the automation started, but its actions didn't run

The trace shows that the automation started, but the device didn't change.

#### Cause

A condition of the automation was not met, so the automation stopped before its actions. In the list of traces, the run is marked **Stopped because a condition failed**.

#### Resolution

1. [Open the trace](#viewing-the-traces-of-an-automation) of the run.
2. In the graph, select the condition that ends the path.
   - Result: **Step details** shows the result of the condition.
3. Adjust the condition. To check it, [test the condition](#running-individual-actions-or-conditions) in the editor.

{% enddetails %}

{% details "My automation triggered, but nothing happened: an action failed" %}

### Symptom: the automation stopped at an action

The trace shows that the automation started, but it stopped at an action. In the list of traces, the run is marked **Stopped on error**, with the error.

#### Cause

The action failed, for example, because an option has a wrong value, or the device returned an error.

#### Resolution

1. [Open the trace](#viewing-the-traces-of-an-automation) of the run.
2. In the graph, select the action that failed.
   - Result: **Step details** shows the error.
3. Fix the action. To check it, [run the action](#running-individual-actions-or-conditions) in the editor.

{% enddetails %}

{% details "My automation triggered, but nothing happened: an error was ignored" %}

### Symptom: the automation finished, but an action didn't do anything

The trace shows that the automation finished, but one of its actions didn't have an effect.

#### Cause

The action failed, but it has `continue_on_error: true`. The automation then continues with the next action, and the run still finishes. The error is shown in the trace and in the logs. In the automation editor, the action shows {% icon "mdi:alert-circle-check" %}, with the tooltip **If this action fails, the next action will still run.**

#### Resolution

1. [Open the trace](#viewing-the-traces-of-an-automation) of the run, and select the action.
   - Result: **Step details** shows the error.
2. Fix the action. If the automation should stop when this action fails, remove `continue_on_error: true` from the action in YAML.

{% enddetails %}

{% details "My automation triggered, but nothing happened: the target matched no entities" %}

### Symptom: the action ran, but no device changed

The trace shows that the action ran without an error, but no device changed.

#### Cause

The target of the action, such as an {% term area %}, a {% term device %}, or a label, contains no entities that the action can control. For example, you turn on the lights in an area that has no lights. Home Assistant then skips the action without an error.

#### Resolution

1. [Open the trace](#viewing-the-traces-of-an-automation) of the run, and select the action.
   - Result: **Step details** shows the target.
2. Check that the target contains entities of the right type, for example, lights for a **Turn on light** action.

{% enddetails %}

{% details "My automation triggered, but nothing happened: the device is offline" %}

### Symptom: the action ran, but the device didn't change

The trace shows that the action ran, but the device didn't change.

#### Cause

The device is offline, so its entity is unavailable. Home Assistant skips unavailable entities, and the logs show a warning like `Referenced entities light.kitchen are missing or not currently available`. Some integrations send the command anyway, and show an error when the device doesn't respond.

#### Resolution

1. Go to {% my logs title="**Settings** > **System** > **Logs**" %} and look for the warning or error.
2. Check the state of the entity. If it is **Unavailable**, check that the device has power and a connection.

{% enddetails %}

{% details "My automation triggered, but nothing happened: the run mode blocked the run" %}

### Symptom: the automation didn't run while it was still running

The automation started while a previous run was still running, for example, during a delay. In the list of traces, the new run is marked **Stopped because only a single execution is allowed** or **Stopped because maximum number of parallel runs reached**.

#### Cause

The [mode](/docs/automation/modes/) of the automation decides what happens when it starts while it is still running. In the default mode, **Single**, the new run doesn't start, and the logs show the warning `Already running`.

#### Resolution

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %} and open the automation.
2. Select **Menu** {% icon "mdi:dots-vertical" %}, and then select **Change mode**.
3. Select the mode that fits your automation, for example, **Restart** to stop the previous run and start again.

{% enddetails %}

{% details "My automation runs too often or twice: attribute changes start it" %}

### Symptom: the automation starts although the state didn't change

The automation has a **State changed** trigger, and it starts more often than the state changes.

#### Cause

The trigger has no **From** and no **To** state. Then it reacts to every change of the entity, including changes of its attributes, such as the brightness of a light or the battery level of a sensor.

#### Resolution

In the trigger, under **To**, select the state that the automation should react to. To react to every state change, but not to attribute changes, select **Any state (ignoring attribute changes)**.

{% enddetails %}

{% details "My automation runs too often or twice: several triggers react to the same change" %}

### Symptom: the automation runs twice at the same moment

The list of traces shows two or more runs at almost the same time.

#### Cause

The automation has several triggers, or a trigger with several entities, that react to the same change. For example, a trigger on a light and a trigger on the group that contains the light both react when the light turns on. Each trigger that reacts starts the automation.

#### Resolution

1. [Open the traces](#viewing-the-traces-of-an-automation) of the runs.
   - Result: At the top of each trace, **Triggered by the** shows the trigger that started the run.
2. Remove the trigger or the entity that you don't need, or add a condition to ignore one of them.

{% enddetails %}

{% details "My automation runs too often or twice: the sensor changes back and forth" %}

### Symptom: the automation starts many times in a short time

The automation starts again and again, for example, every few seconds.

#### Cause

The entity in the trigger changes back and forth quickly, for example, a motion sensor that switches between detected and clear, or a power sensor near the threshold. Each change starts the automation.

#### Resolution

In the trigger, set **For at least** to a duration, for example, 1 minute. The trigger then only reacts when the entity has kept the new state for that time.

{% enddetails %}

{% details "I see an 'Already running' warning in the logs" %}

### Symptom: the logs show the warning "Already running"

The logs show a warning with the name of your automation and `Already running`.

#### Cause

The automation started while a previous run was still running, for example, during a delay. The automation uses the default [mode](/docs/automation/modes/), **Single**, so Home Assistant didn't start the new run, and logged the warning. This is how **Single** mode works, not an error.

#### Resolution

- If the automation should also handle the new start, change the mode. Open the automation, select **Menu** {% icon "mdi:dots-vertical" %}, select **Change mode**, and then select another mode, for example, **Restart**.
- If the automation should skip the new start, and you don't want the warning, add `max_exceeded: silent` to the automation in YAML:

  ```yaml
  max_exceeded: silent
  ```

{% enddetails %}

{% details "My automation fails when I run it manually" %}

### Symptom: the automation fails or behaves differently when you run it manually

The automation works when the trigger happens, but it shows an error or does something else when you select **Run actions**, or use the **Automation: Trigger** action.

#### Cause

When you run the automation manually, there is no trigger, so there is no trigger data. Templates that use `trigger`, such as `{{ trigger.to_state.state }}`, have no value, and a **Triggered by** condition doesn't pass because there is no trigger ID.

#### Resolution

Make the real trigger happen, for example:

- To test a **State changed** trigger, [set the state of the entity](/docs/tools/dev-tools/#setting-the-state-of-an-entity) in the **States** tab of **Tools**.
- To test a **Manual event received** trigger, [fire the event](/docs/tools/dev-tools/#firing-an-event) in the **Events** tab of **Tools**.

The **Automation: Trigger** action can't pass trigger data, so it doesn't help to test templates that use `trigger`.

{% enddetails %}
