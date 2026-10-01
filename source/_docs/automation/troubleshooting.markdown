---
title: "Troubleshooting automations"
description: "Find out why an automation doesn't trigger or fire, runs twice, runs at the wrong time, or doesn't do what you expect, and how to fix it."
---

<a id="troubleshooting-your-automation"></a>When an automation doesn't do what you expect, find the symptom below. Each entry explains a possible cause and how to fix it.

Most problems show up in the [trace](/docs/automation/testing/#traces) of the automation, so open the trace first. To test an automation or parts of it, refer to [Testing automations](/docs/automation/testing/).

<a id="testing-your-automation"></a><a id="checking-the-state-of-a-condition"></a><a id="testing-a-condition"></a><a id="testing-an-action"></a><a id="testing-all-the-actions"></a><a id="triggering-an-automation-manually"></a><a id="using-a-simulated-trigger-to-test-an-automation"></a><a id="checking-what-triggered-an-automation"></a><a id="checking-your-yaml-configuration"></a><a id="traces"></a><a id="viewing-the-traces-of-an-automation"></a><a id="parts-of-a-trace"></a><a id="changing-the-number-of-stored-traces"></a><a id="testing-templates"></a>Testing your automation, traces, and testing templates have moved to [Testing automations](/docs/automation/testing/).

## My automation doesn't trigger

Use this section if your automation doesn't start, doesn't run, or ignores its trigger.

<a id="automation-doesnt-trigger-because-it-is-turned-off-disabled"></a>

{% details "Automation doesn't trigger because it is turned off (disabled)" %}

<h3 class="no_toc">Symptom</h3>

The change that the trigger waits for happens, but the automation doesn't start, and there is no new trace.

#### Description

The automation is turned off. A turned-off automation doesn't react to its triggers. You can still run its actions manually, so **Run actions** works.

#### Resolution

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %} and open the automation.
2. If the editor shows **Automation is disabled**, select **Enable**.

{% enddetails %}

<a id="automation-with-a-numeric-state-crossed-threshold-trigger-doesnt-trigger-when-the-value-is-already-past-the-threshold"></a>

{% details "Automation with a Numeric state crossed threshold trigger doesn't trigger when the value is already past the threshold" %}

<h3 class="no_toc">Symptom</h3>

The automation has a **Numeric state crossed threshold** trigger. The value is above or below the threshold, but the automation doesn't start.

#### Description

The trigger only reacts when the value crosses the threshold. If the value was already past the threshold when the automation was turned on or Home Assistant started, the trigger waits until the value goes back and crosses the threshold again.

#### Resolution

- Wait for the value to cross the threshold again.
- To also check the value at other moments, add another trigger, such as a **Home Assistant** trigger set to **Start**, and a **Numeric state** condition with the same threshold.

{% enddetails %}

<a id="automation-with-a-state-changed-trigger-doesnt-trigger-for-open-or-detected-because-the-raw-state-is-on"></a>

{% details "Automation with a State changed trigger doesn't trigger for “Open” or “Detected” because the raw state is “on”" %}

<h3 class="no_toc">Symptom</h3>

The automation has a **State changed** trigger with a **To** or **From** state. The entity changes to that state in the UI, but the automation doesn't start.

#### Description

The UI shows a state in a readable form, for example, **Open** for a door sensor. The trigger compares the raw state, which can be different, for example, `on`. If you typed the state that the UI shows, it doesn't match the raw state.

#### Resolution

1. Go to {% my developer_states title="**Settings** > **Tools** > **States**" %} and find the entity.
   - Result: The **State** column shows the raw state.
2. In the trigger, select the state from the list, or enter the raw state.

{% enddetails %}

<a id="automation-with-a-state-changed-trigger-and-a-from-state-doesnt-trigger-after-the-device-was-unavailable"></a>

{% details "Automation with a State changed trigger and a From state doesn't trigger after the device was unavailable" %}

<h3 class="no_toc">Symptom</h3>

The automation has a **State changed** trigger with a **From** state, for example, from `off` to `on`. The entity is now in the **To** state, but the automation didn't start.

#### Description

The entity was unavailable in between, for example, because the device lost its connection. The change was from `unavailable` to `on`, not from `off` to `on`, so the **From** state doesn't match. For details, refer to [What counts as a change](/docs/automation/how-automations-react-to-changes/#what-counts-as-a-change).

#### Resolution

If the automation should react no matter what the previous state was, remove the **From** state:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %} and open the automation.
2. In the **State changed** trigger, clear **From**.
   - The trigger then also reacts when the entity comes back from unavailable.
3. Select **Save**.

{% enddetails %}

<a id="automation-doesnt-start-while-something-stays-true-because-triggers-only-react-to-changes"></a>

{% details "Automation doesn't start while something stays true, because triggers only react to changes" %}

<h3 class="no_toc">Symptom</h3>

You expect the automation to start while something is true, for example, while a temperature is high. The automation doesn't start, or only starts once.

#### Description

Triggers react to a change. They don't keep checking whether something is still true. For example, a **Numeric state crossed threshold** trigger reacts once, when the value crosses the threshold. For details, refer to [Triggers react to changes](/docs/automation/how-automations-react-to-changes/#triggers-react-to-changes).

#### Resolution

- Use a trigger for the moment that the automation should start, and a {% term condition %} for what must be true at that moment.
- To check something regularly, use a **Time pattern** trigger, and a condition for what must be true.

{% enddetails %}

## My automation triggered, but nothing happened

Use this section if the automation starts, but the lights, devices, or notifications don't respond.

<a id="automation-triggered-but-its-actions-didnt-run-stopped-because-a-condition-failed"></a>

{% details "Automation triggered, but its actions didn't run: “Stopped because a condition failed”" %}

<h3 class="no_toc">Symptom</h3>

The trace shows that the automation started, but the device didn't change.

#### Description

A condition of the automation was not met, so the automation stopped before its actions. In the list of traces, the run is marked **Stopped because a condition failed**.

#### Resolution

1. [Open the trace](/docs/automation/testing/#viewing-the-traces-of-an-automation) of the run.
2. In the graph, select the condition that ends the path.
   - Result: **Step details** shows the result of the condition.
3. Adjust the condition. To check it, [test the condition](/docs/automation/testing/#testing-a-condition) in the editor.

{% enddetails %}

<a id="automation-stopped-at-an-action-stopped-on-error"></a>

{% details "Automation stopped at an action: “Stopped on error”" %}

<h3 class="no_toc">Symptom</h3>

The trace shows that the automation started, but it stopped at an action. In the list of traces, the run is marked **Stopped on error**, with the error.

#### Description

The action failed, for example, because an option has a wrong value, or the device returned an error.

#### Resolution

1. [Open the trace](/docs/automation/testing/#viewing-the-traces-of-an-automation) of the run.
2. In the graph, select the action that failed.
   - Result: **Step details** shows the error.
3. Fix the action. To check it, [test the action](/docs/automation/testing/#testing-an-action) in the editor.

{% enddetails %}

<a id="automation-finished-but-an-action-with-continue-on-error-didnt-do-anything"></a>

{% details "Automation finished, but an action with Continue on error didn't do anything" %}

<h3 class="no_toc">Symptom</h3>

The trace shows that the automation finished, but one of its actions didn't have an effect.

#### Description

The action failed, but **Continue on error** is turned on for it. The automation then continues with the next action, and the run still finishes. The error is shown in the trace and in the logs. In the automation editor, the action shows {% icon "mdi:alert-circle-check" %}, with the tooltip **If this action fails, the next action will still run.**

#### Resolution

1. [Open the trace](/docs/automation/testing/#viewing-the-traces-of-an-automation) of the run, and select the action.
   - Result: **Step details** shows the error.
2. Fix the action. If the automation should stop when this action fails, in the **Menu** {% icon "mdi:dots-vertical" %} of the action, turn off [**Continue on error**](/docs/automation/editor/#continuing-after-an-action-fails).

{% enddetails %}

<a id="action-ran-without-an-error-but-its-area-floor-or-label-target-has-no-matching-devices"></a>

{% details "Action ran without an error, but its area, floor, or label target has no matching devices" %}

<h3 class="no_toc">Symptom</h3>

The trace shows that the action ran without an error, but no device changed.

#### Description

The target of the action, such as an {% term area %}, a {% term device %}, or a label, contains no entities that the action can control. For example, you turn on the lights in an area that has no lights. Home Assistant then skips the action without an error.

#### Resolution

1. [Open the trace](/docs/automation/testing/#viewing-the-traces-of-an-automation) of the run, and select the action.
   - Result: **Step details** shows the target.
2. Check that the target contains entities of the right type, for example, lights for a **Turn on light** action.

{% enddetails %}

<a id="action-doesnt-change-an-offline-device-because-its-entity-is-unavailable"></a>

{% details "Action doesn't change an offline device, because its entity is unavailable" %}

<h3 class="no_toc">Symptom</h3>

The trace shows that the action ran, but the device didn't change.

#### Description

The device is offline, so its entity is unavailable. Home Assistant skips unavailable entities, and the logs show a warning like `Referenced entities light.kitchen are missing or not currently available`. Some integrations send the command anyway, and show an error when the device doesn't respond.

#### Resolution

1. Go to {% my logs title="**Settings** > **System** > **Logs**" %} and look for the warning or error.
2. Check the state of the entity. If it is **Unavailable**, check that the device has power and a connection.

{% enddetails %}

<a id="automation-didnt-run-while-it-was-still-running-stopped-because-only-a-single-execution-is-allowed"></a>

{% details "Automation didn't run while it was still running: “Stopped because only a single execution is allowed”" %}

<h3 class="no_toc">Symptom</h3>

The automation started while a previous run was still running, for example, during a delay, and the new run didn't start. In the list of traces, the new run is marked **Stopped because only a single execution is allowed** or **Stopped because maximum number of parallel runs reached**.

For the description and the resolution, refer to [I see an "Already running" warning in the logs](#i-see-an-already-running-warning-in-the-logs).

{% enddetails %}

## My automation stopped working after an update

Use this section if an automation that used to work broke after you updated or restarted Home Assistant, or after you replaced or renamed a device.

<a id="automation-that-was-waiting-in-a-delay-wait-or-for-at-least-duration-didnt-finish-after-a-restart"></a>

{% details "Automation that was waiting in a delay, wait, or For at least duration didn't finish after a restart" %}

<h3 class="no_toc">Symptom</h3>

An automation was waiting, for example, in a delay, a wait, or a trigger with **For at least**. After Home Assistant restarted, for example, to install an update, the automation didn't continue.

#### Description

When Home Assistant restarts, it stops the automations that are running. A delay, a wait, or a **For at least** duration that was in progress is lost.

#### Resolution

For long waits, don't use a delay. Instead, use a trigger for the moment that the automation should continue, for example, a **Time** trigger. To also handle a restart, add a **Home Assistant** trigger set to **Start**, and a condition that checks whether the automation still needs to run.

{% enddetails %}

<a id="automation-stopped-working-after-renaming-an-entity-referenced-entities-are-missing-or-not-currently-available"></a>

{% details "Automation stopped working after renaming an entity: “Referenced entities … are missing or not currently available”" %}

<h3 class="no_toc">Symptom</h3>

The automation used to work with an entity, but now it doesn't start, or its action doesn't change the entity.

#### Description

The entity ID changed, for example, because you renamed it. Home Assistant doesn't update automations when an entity ID changes, so the automation still uses the old entity ID. For actions, the logs show a warning like `Referenced entities light.kitchen are missing or not currently available`.

#### Resolution

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %} and open the automation.
2. In each trigger, condition, and action that uses the old entity, select the entity again.
3. Select **Save**.

{% enddetails %}

<a id="automation-with-a-device-trigger-condition-or-action-is-unavailable-after-replacing-the-device-unknown-device"></a>

{% details "Automation with a Device trigger, condition, or action is unavailable after replacing the device: “Unknown device”" %}

<h3 class="no_toc">Symptom</h3>

The automation has a trigger, condition, or action of the **Device** type. After you replaced or added the device, the automation editor shows **Automation is unavailable**, and {% my repairs title="**Settings** > **System** > **Repairs**" %} shows **Automation … failed to set up**, with an error like `Unknown device`.

#### Description

A **Device** trigger, condition, or action refers to the device by an internal ID. If you add the same device again, Home Assistant keeps its ID. But the device gets a new ID when it is a different device, for example, a replacement for a broken one. It can also get a new ID when you add it again more than 30 days after you removed its integration, because Home Assistant only keeps removed devices for 30 days. The automation then refers to a device that no longer exists.

#### Resolution

1. Go to {% my repairs title="**Settings** > **System** > **Repairs**" %} and select the issue.
2. Select the link to edit the automation.
3. In each **Device** trigger, condition, and action, select the device again. If the editor shows **This device no longer exists. It was replaced by** and the name of a device, select **Update**.
4. Select **Save**.

{% enddetails %}

<a id="automation-is-unavailable-after-an-update-automation-is-unavailable-or-failed-to-set-up"></a>

{% details "Automation is unavailable after an update: “Automation is unavailable” or “failed to set up”" %}

<h3 class="no_toc">Symptom</h3>

After you updated Home Assistant, the automation editor shows **Automation is unavailable**, or {% my repairs title="**Settings** > **System** > **Repairs**" %} shows **Automation … failed to set up** or **… uses an unknown action**.

#### Description

The update changed or removed something that the automation uses, for example, an option of a trigger, or an action of an integration. The configuration of the automation is no longer valid, so Home Assistant can't set it up.

#### Resolution

1. Go to {% my repairs title="**Settings** > **System** > **Repairs**" %} and select the issue.
   - Result: The issue shows the error.
2. Check the backward-incompatible changes in the [release notes](/latest-release-notes/) for what changed.
3. Select the link to edit the automation, correct it, and select **Save**.

{% enddetails %}

## I can't find my device or button as a trigger

Use this section if a device, remote, or button doesn't show up, or shows no triggers, when you add a trigger.

<a id="device-trigger-shows-no-triggers-for-a-device"></a>

{% details "Device trigger shows “No triggers” for a device" %}

<h3 class="no_toc">Symptom</h3>

In a **Device** trigger, you select your device, but the list of triggers shows **No triggers**.

#### Description

Not every {% term integration %} provides device triggers. Without them, the **Device** trigger has nothing to offer for this device.

#### Resolution

Use a trigger on an {% term entity %} of the device instead:

1. In the automation editor, select **Add trigger**.
2. On the **By target** tab, select the device or one of its entities.
   - Result: The triggers for this target are shown, for example, **State changed**.
3. Select the trigger that fits.

{% enddetails %}

<a id="button-or-remote-presses-arent-shown-as-automation-triggers-because-the-button-is-an-event-entity"></a>

{% details "Button or remote presses aren't shown as automation triggers, because the button is an event entity" %}

<h3 class="no_toc">Symptom</h3>

Your button or remote has an entity that starts with `event.`, but you don't find its presses as a trigger.

#### Description

The button presses are events of an event entity. They have their own trigger, **Event received**.

#### Resolution

1. In the automation editor, select **Add trigger**.
2. On the **By target** tab, select the event entity of the button, or its device.
3. Select **Event received**.
4. Under **Event type**, select the press that should start the automation, for example, a single press.

For more information, refer to the [**Event received** trigger](/triggers/event.received/).

{% enddetails %}

<a id="device-or-entity-isnt-in-the-list-when-adding-an-automation-trigger-because-it-is-disabled"></a>

{% details "Device or entity isn't in the list when adding an automation trigger, because it is disabled" %}

<h3 class="no_toc">Symptom</h3>

When you add a trigger, the device or entity is not in the list.

#### Description

The device or entity is disabled. Disabled devices and entities are not shown when you add a trigger.

#### Resolution

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}.
2. Do one of the following:
   - For a device, open the **Devices** tab, and select the device. Select **Edit settings** {% icon "mdi:pencil" %}, turn on **Enable device**, and select **Update**.
   - For an entity, open the **Entities** tab, and select the entity. You might need to change the filters of the list to show disabled entities. Select **Settings** {% icon "mdi:cog-outline" %}, turn on **Enabled**, and select **Update**.

{% enddetails %}

## My "Wait", "Delay", or "For at least" duration doesn't work as expected

Use this section if a delay, wait, or timeout is cut short, never ends, or doesn't wait at all.

If Home Assistant restarted while the automation was waiting, refer to [An automation that was waiting didn't finish](#automation-that-was-waiting-in-a-delay-wait-or-for-at-least-duration-didnt-finish-after-a-restart).

<a id="trigger-with-for-at-least-reacts-later-than-the-duration-or-not-at-all"></a>

{% details "Trigger with For at least reacts later than the duration, or not at all" %}

<h3 class="no_toc">Symptom</h3>

The trigger has a **For at least** duration, but the automation starts later than expected, or not at all.

#### Description

The **For at least** timer stops as soon as the entity leaves the state in the trigger. When the entity goes back to that state, the timer starts over with the full duration. For example, a motion sensor that briefly detects motion again restarts a **For at least** of 10 minutes on the clear state. Changes of attributes don't restart the timer.

#### Resolution

1. In the **History** panel, check the {% term entity %} for short changes during the duration.
2. If the entity changes back and forth, choose a shorter duration, or use an entity that changes less often.

{% enddetails %}

<a id="wait-for-a-trigger-action-never-finishes-or-always-waits-for-the-timeout"></a>

{% details "Wait for a trigger action never finishes, or always waits for the timeout" %}

<h3 class="no_toc">Symptom</h3>

The trace shows that the automation is waiting at a **Wait for a trigger** action, although the entity already has the state that the trigger waits for.

#### Description

**Wait for a trigger** only reacts to a change that happens after the wait starts. If the entity already has that state when the wait starts, there is no change, so the wait doesn't finish.

#### Resolution

- To continue right away when the state is already there, use **Wait for a template** instead. It continues immediately if the template is already true.
- To wait for a limited time only, set **Timeout (optional)**.

{% enddetails %}

<a id="wait-for-a-trigger-or-wait-for-a-template-action-continues-after-the-timeout"></a>

{% details "Wait for a trigger or Wait for a template action continues after the timeout" %}

<h3 class="no_toc">Symptom</h3>

The automation has a **Wait for a trigger** or **Wait for a template** action with a timeout. When the timeout ends, the automation continues with the next actions, although the thing it waited for didn't happen.

#### Description

**Continue on timeout** is turned on by default. The automation then continues after the timeout, as if the wait had finished.

#### Resolution

- If the automation should stop when the timeout ends, turn off **Continue on timeout**.
- If the next actions should only run when the wait finished, check `wait.completed` in an **If-then** building block. It is `false` when the timeout ended the wait.

{% enddetails %}

<a id="wait-for-a-template-action-doesnt-wait"></a>

{% details "Wait for a template action doesn't wait" %}

<h3 class="no_toc">Symptom</h3>

The automation continues right away at a **Wait for a template** action.

#### Description

If the template is already true when the wait starts, **Wait for a template** continues immediately.

#### Resolution

To wait for a change, use **Wait for a trigger** instead. It only continues when something changes after the wait starts.

{% enddetails %}

<a id="delay-or-wait-is-cut-short-in-restart-mode"></a>

{% details "Delay or wait is cut short in Restart mode" %}

<h3 class="no_toc">Symptom</h3>

The trace shows a run that stopped during a delay or a wait, and a new run that started at the same moment.

#### Description

The automation uses the **Restart** [mode](/docs/automation/modes/). When the automation starts while it is still running, Home Assistant stops the previous run, including its delay or wait, and starts a new run.

#### Resolution

If the running delay or wait should finish, [change the mode](/docs/automation/editor/#changing-the-mode-of-an-automation), for example, to **Single** to ignore new starts while the automation is running.

{% enddetails %}

## My automation runs too often or twice

Use this section if the automation runs twice, runs multiple times, or keeps repeating.

<a id="automation-with-a-state-changed-trigger-starts-although-the-state-didnt-change-because-an-attribute-changed"></a>

{% details "Automation with a State changed trigger starts although the state didn't change, because an attribute changed" %}

<h3 class="no_toc">Symptom</h3>

The automation has a **State changed** trigger, and it starts more often than the state changes.

#### Description

The trigger has no **From** and no **To** state. Then it reacts to every change of the entity, including changes of its attributes, such as the brightness of a light or the battery level of a sensor.

#### Resolution

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %} and open the automation.
2. In the **State changed** trigger, under **To**, select the state that the automation should react to. To react to every state change, but not to attribute changes, select **Any state (ignoring attribute changes)**.
3. Select **Save**.

{% enddetails %}

<a id="automation-runs-twice-at-the-same-moment-because-several-triggers-react-to-the-same-change"></a>

{% details "Automation runs twice at the same moment, because several triggers react to the same change" %}

<h3 class="no_toc">Symptom</h3>

The list of traces shows two or more runs at almost the same time.

#### Description

The automation has several triggers, or a trigger with several entities, that react to the same change. For example, a trigger on a light and a trigger on the group that contains the light both react when the light turns on. Each trigger that reacts starts the automation.

#### Resolution

1. [Open the traces](/docs/automation/testing/#viewing-the-traces-of-an-automation) of the runs.
   - Result: At the top of each trace, **Triggered by the** shows the trigger that started the run.
2. Remove the trigger or the entity that you don't need, or add a condition to ignore one of them.

{% enddetails %}

<a id="automation-starts-many-times-in-a-short-time-because-the-sensor-changes-back-and-forth"></a>

{% details "Automation starts many times in a short time, because the sensor changes back and forth" %}

<h3 class="no_toc">Symptom</h3>

The automation starts again and again, for example, every few seconds.

#### Description

The entity in the trigger changes back and forth quickly, for example, a motion sensor that switches between detected and clear, or a power sensor near the threshold. Each change starts the automation.

#### Resolution

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %} and open the automation.
2. In the trigger, set **For at least** to a duration, for example, 1 minute.
   - The trigger then only reacts when the entity has kept the new state for that time.
3. Select **Save**.

{% enddetails %}

## I see an "Already running" warning in the logs

Use this section if the logs show `Already running` or `Maximum number of runs exceeded`.

<a id="automation-didnt-start-while-it-was-still-running-already-running-or-maximum-number-of-runs-exceeded"></a>

{% details "Automation didn't start while it was still running: “Already running” or “Maximum number of runs exceeded”" %}

<h3 class="no_toc">Symptom</h3>

The automation started while a previous run was still running, for example, during a delay, and the new run didn't start. You see one or both of the following:

- The logs show a warning with the name of your automation and `Already running`, or `Maximum number of runs exceeded`.
- In the list of traces, the new run is marked **Stopped because only a single execution is allowed** or **Stopped because maximum number of parallel runs reached**.

#### Description

The [mode](/docs/automation/modes/) of the automation decides what happens when it starts while it is still running. In the default mode, **Single**, Home Assistant doesn't start the new run, and logs the warning `Already running`. In the **Queued** and **Parallel** modes, it logs `Maximum number of runs exceeded` when the maximum number of runs is reached. This is how the modes work, not an error.

#### Resolution

- If the automation should also handle the new start, [change the mode](/docs/automation/editor/#changing-the-mode-of-an-automation), for example, to **Restart**. For **Queued** and **Parallel**, you can also [raise the maximum number of runs](/docs/automation/modes/#setting-the-maximum-number-of-runs).
- If the automation should skip the new start, and you don't want the warning, [change the warning in the logs](/docs/automation/modes/#changing-the-warning-in-the-logs), for example, to `silent`.

{% enddetails %}

## Something turned on or off and I don't know why

Use this section if a light, switch, or other device turns on or off by itself, and you want to know what changed it.

<a id="light-or-switch-turns-on-or-off-by-itself-find-the-automation-or-other-cause"></a>

{% details "Light or switch turns on or off by itself: find the automation or other cause" %}

<h3 class="no_toc">Symptom</h3>

A light turned on, a switch turned off, or another {% term entity %} changed, and you don't know what caused it.

#### Description

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

<a id="activity-details-show-no-cause-was-recorded-for-this-activity-for-a-device-change"></a>

{% details "Activity details show “No cause was recorded for this activity” for a device change" %}

<h3 class="no_toc">Symptom</h3>

In the **Activity details** of the change, Home Assistant shows **No cause was recorded for this activity.**

#### Description

Home Assistant didn't record what caused the change. Often, the change came from outside Home Assistant, for example, from a button on the device, the app of the manufacturer, a schedule on the device itself, or another system that controls the device. An {% term integration %} can also report a change without a cause.

#### Resolution

- Check the device and the app of the manufacturer for schedules, scenes, or automations that control the device.
- Check the documentation of the integration, and the logs under {% my logs title="**Settings** > **System** > **Logs**" %}, for changes that the integration made.

{% enddetails %}

## My automation runs at the wrong time

Use this section if a time, sunrise, or sunset automation runs too early, too late, twice, or not at all.

<a id="time-or-time-pattern-trigger-runs-hours-too-early-or-too-late-because-the-time-zone-is-wrong"></a>

{% details "Time or Time pattern trigger runs hours too early or too late, because the time zone is wrong" %}

<h3 class="no_toc">Symptom</h3>

Automations with a **Time** or **Time pattern** trigger run at the wrong hour, always by the same number of hours.

#### Description

Time triggers use the time zone of Home Assistant. If it is set to another time zone than yours, the times are off.

#### Resolution

1. Go to {% my general title="**Settings** > **System** > **Home information**" %}.
2. On the **Region** card, under **Time zone**, select your time zone.
3. Select **Save**.

{% enddetails %}

<a id="time-pattern-trigger-runs-once-an-hour-instead-of-every-few-minutes"></a>

{% details "Time pattern trigger runs once an hour instead of every few minutes" %}

<h3 class="no_toc">Symptom</h3>

The automation has a **Time pattern** trigger, for example, with **Minutes** set to `5`. It runs once an hour instead of every 5 minutes.

#### Description

A number on its own means that exact value. **Minutes** set to `5` runs at 5 minutes past every hour. To run every 5 minutes, the value needs a `/` in front of it.

#### Resolution

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %} and open the automation.
2. In the **Time pattern** trigger, set **Minutes** to `/5`.
   - The `/` counts from the clock, so `/5` runs at 0, 5, 10 minutes past the hour, and so on. Use a value that divides 60 evenly, such as `/5`, `/10`, or `/15`, to get even intervals.
3. Select **Save**.

{% enddetails %}

<a id="sunrise-or-sunset-trigger-with-an-offset-runs-too-early-or-too-late"></a>

{% details "Sunrise or Sunset trigger with an offset runs too early or too late" %}

<h3 class="no_toc">Symptom</h3>

The automation has a sun trigger with an offset, and it runs before the sunrise or sunset instead of after it, or the other way around.

#### Description

The offset is set to before the event. In the **Sunrise** and **Sunset** triggers, **Offset type** decides this, and **Before** is the default. In the **Sun** trigger, a negative offset means before the event, and a positive offset means after it.

#### Resolution

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %} and open the automation.
2. In the trigger, set the offset to after the event:
   - In the **Sunrise** or **Sunset** trigger, set **Offset type** to **After**.
   - In the **Sun** trigger, remove the `-` from the offset.
3. Select **Save**.

{% enddetails %}

<a id="sun-triggers-are-off-by-minutes-or-hours-because-the-home-location-is-wrong"></a>

{% details "Sun triggers are off by minutes or hours, because the home location is wrong" %}

<h3 class="no_toc">Symptom</h3>

Automations with a sun trigger run at a different time than the real sunrise or sunset.

#### Description

Home Assistant calculates sunrise and sunset from the location of your home. If the location is wrong, the times are wrong.

#### Resolution

1. Go to {% my general title="**Settings** > **System** > **Home information**" %}.
2. On the **Location** card, select **Edit**, and then set the location of your home.

{% enddetails %}

<a id="time-trigger-with-a-date-and-time-helper-runs-at-midnight"></a>

{% details "Time trigger with a date and time helper runs at midnight" %}

<h3 class="no_toc">Symptom</h3>

The **Time** trigger uses **Value of a date/time helper or timestamp-class sensor**, and the automation runs at midnight.

#### Description

The date and time helper only has a date, no time. The trigger then runs at midnight at the start of that day.

#### Resolution

1. Go to {% my helpers title="**Settings** > **Devices & services** > **Helpers**" %} and select the date and time helper.
2. Select **Settings** {% icon "mdi:cog-outline" %}.
3. Under **What do you want to input**, select **Date and time**, or **Time**, and then select **Update**.
4. Set the time of the helper.
   - Result: The trigger runs at the time of the helper.

{% enddetails %}

<a id="time-trigger-with-a-helper-or-timestamp-sensor-doesnt-run"></a>

{% details "Time trigger with a helper or timestamp sensor doesn't run" %}

<h3 class="no_toc">Symptom</h3>

The **Time** trigger uses **Value of a date/time helper or timestamp-class sensor**, and the automation doesn't run at the time of the entity.

#### Description

The date and time of the entity has already passed, or the sensor is unavailable or unknown. The trigger only runs at a date and time in the future.

#### Resolution

1. Go to {% my developer_states title="**Settings** > **Tools** > **States**" %} and check the state of the entity.
2. If the date and time has passed, set a new one. If the sensor is unavailable, check the device or the integration that provides it.

{% enddetails %}

<a id="time-trigger-in-the-skipped-hour-doesnt-run-on-the-day-daylight-saving-time-starts"></a>

{% details "Time trigger in the skipped hour doesn't run on the day daylight saving time starts" %}

<h3 class="no_toc">Symptom</h3>

On the day that the clocks go forward, an automation with a **Time** trigger doesn't run. The time of the trigger falls in the hour that is skipped, for example, 02:30. Triggers at other times run as usual.

#### Description

When the clocks go forward, some times don't exist on that day, for example, 02:30. A trigger at such a time doesn't run on that day. It runs again the next day.

#### Resolution

If the automation must run every day, choose a time when the clocks don't change:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %} and open the automation.
2. In the **Time** trigger, set a time outside the night hours when the clocks change in your time zone, for example, a time during the day.
3. Select **Save**.

{% enddetails %}

<a id="time-trigger-in-the-repeated-hour-runs-twice-on-the-day-daylight-saving-time-ends"></a>

{% details "Time trigger in the repeated hour runs twice on the day daylight saving time ends" %}

<h3 class="no_toc">Symptom</h3>

On the day that the clocks go back, an automation with a **Time** trigger runs twice. The time of the trigger falls in the hour that happens twice, for example, 02:30. Triggers at other times run once, as usual.

#### Description

When the clocks go back, some times happen twice, for example, 02:30. A trigger at such a time runs at both moments.

#### Resolution

If the automation must run only once, choose a time when the clocks don't change:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %} and open the automation.
2. In the **Time** trigger, set a time outside the night hours when the clocks change in your time zone, for example, a time during the day.
3. Select **Save**.

{% enddetails %}

## I get an error when I save my automation

Use this section if saving the automation fails, or shows an error such as `Message malformed`.

<a id="saving-an-automation-shows-message-malformed"></a>

{% details "Saving an automation shows “Message malformed”" %}

<h3 class="no_toc">Symptom</h3>

When you save the automation, Home Assistant shows an error that starts with `Message malformed:`, and the automation is not saved.

#### Description

Home Assistant checks the automation when you save it. Something in it is not valid, for example, an option that the trigger or action needs is empty, or has a value that is not allowed. The message names the part that is not valid.

#### Resolution

1. Read the message to find the trigger, condition, or action that is not valid.
2. Fill in or correct the option, and save again.

{% enddetails %}

<a id="saving-an-automation-in-yaml-mode-shows-a-yaml-error"></a>

{% details "Saving an automation in YAML mode shows a YAML error" %}

<h3 class="no_toc">Symptom</h3>

You edited the automation in YAML, and saving shows an error from the YAML, for example, about the indentation.

#### Description

The YAML is not valid, for example, because of wrong indentation, or a missing space after a colon.

#### Resolution

Fix the line that the error names, and save again. If you're not sure what is wrong, switch back to the visual editor, and make the change there.

{% enddetails %}

<a id="saving-a-new-automation-shows-cannot-save-automation-without-a-name"></a>

{% details "Saving a new automation shows “Cannot save automation without a name”" %}

<h3 class="no_toc">Symptom</h3>

When you save a new automation, Home Assistant shows **Cannot save automation without a name**.

#### Description

A new automation needs a name before you can save it.

#### Resolution

In the save dialog, enter a name, and then save again.

{% enddetails %}

## My automation behaves differently when I run it manually

Use this section if the automation works when you select **Run actions**, but not when the trigger happens, or the other way around.

<a id="actions-work-with-run-actions-but-not-when-the-trigger-happens"></a>

{% details "Actions work with Run actions, but not when the trigger happens" %}

<h3 class="no_toc">Symptom</h3>

The automation works when you select **Run actions**, but not when the trigger happens.

#### Description

**Run actions** skips the triggers and the conditions. If the actions work this way, the problem is usually in a trigger or a condition. It can also be an action that behaves differently in a real run, for example, because it uses `trigger` data, or because an entity has another state at that moment.

#### Resolution

[Open the trace](/docs/automation/testing/#viewing-the-traces-of-an-automation) of the real run, and check how it ended:

- If the list of traces has no run for that moment, the trigger didn't react. Check the causes under [My automation doesn't trigger](#my-automation-doesnt-trigger).
- If the run is marked **Stopped because a condition failed**, check the causes under [My automation triggered, but nothing happened](#my-automation-triggered-but-nothing-happened).
- If the run is marked **Stopped on error**, or it finished, but an action didn't have an effect, select that action in the graph. **Step details** shows the error or the values it used. For the causes, refer to [Automation stopped at an action](#automation-stopped-at-an-action-stopped-on-error), and to the other causes under [My automation triggered, but nothing happened](#my-automation-triggered-but-nothing-happened).

{% enddetails %}

<a id="automation-fails-with-run-actions-but-works-when-the-trigger-happens-because-there-is-no-trigger-data"></a>

{% details "Automation fails with Run actions, but works when the trigger happens, because there is no trigger data" %}

<h3 class="no_toc">Symptom</h3>

The automation works when the trigger happens, but it shows an error or does something else when you select **Run actions**, or use the **Automation: Trigger** action.

#### Description

When you run the automation manually, there is no trigger, so there is no trigger data. Templates that use `trigger`, such as `{{ trigger.to_state.state }}`, have no value, and a **Triggered by** condition doesn't pass because there is no trigger ID.

#### Resolution

Make the real trigger happen, or [use a simulated trigger](/docs/automation/testing/#using-a-simulated-trigger-to-test-an-automation) to test the automation with real trigger data.

The **Automation: Trigger** action can't pass trigger data, so it doesn't help to test templates that use `trigger`.

{% enddetails %}

## My condition doesn't behave as expected

Use this section if a condition doesn't pass although it should, or passes although it shouldn't.

<a id="automation-doesnt-start-when-its-condition-becomes-true-later"></a>

{% details "Automation doesn't start when its condition becomes true later" %}

<h3 class="no_toc">Symptom</h3>

When the trigger reacted, the condition was not met. Later, the condition is met, but the automation doesn't start.

#### Description

Conditions are only checked once, right after a trigger reacts. They don't start the automation when they become true later. For details, refer to [Conditions check the current state](/docs/automation/how-automations-react-to-changes/#conditions-check-the-current-state).

#### Resolution

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %} and open the automation.
2. Under **When**, select **Add trigger**, and add a trigger for the change that makes the condition true.
3. Select **Save**.
   - Result: The automation also starts at that moment, and checks its conditions again.

For an example, refer to [When two things must both be true](/docs/automation/how-automations-react-to-changes/#when-two-things-must-both-be-true).

{% enddetails %}

<a id="automation-only-runs-when-all-its-conditions-are-met-instead-of-any-of-them"></a>

{% details "Automation only runs when all its conditions are met, instead of any of them" %}

<h3 class="no_toc">Symptom</h3>

The automation has several conditions, and you expect it to run when one of them is met.

#### Description

The automation only runs when all its conditions are met.

#### Resolution

To run the automation when at least one condition is met, put the conditions in an **Or** building block:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %} and open the automation.
2. Under **And if**, select **Add building block**, and then select **Or**.
3. Drag the conditions into the **Or** building block by their handle {% icon "mdi:drag-horizontal-variant" %}.
4. Select **Save**.

{% enddetails %}

<a id="numeric-state-condition-doesnt-pass-when-the-value-is-exactly-at-the-threshold"></a>

{% details "Numeric state condition doesn't pass when the value is exactly at the threshold" %}

<h3 class="no_toc">Symptom</h3>

The automation has a **Numeric state** condition. The value is exactly at the threshold, and the condition doesn't pass.

#### Description

**Above** and **Below** don't include the threshold itself. For example, with **Above** set to 20, a value of exactly 20 doesn't pass.

#### Resolution

If the value can be exactly at the threshold, and it should pass, set the threshold a little lower, matching the precision of the sensor:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %} and open the automation.
2. In the **Numeric state** condition, change the threshold. For example, for a sensor that reports whole numbers, set **Above** to 19 to include 20.
3. Select **Save**.

For a sensor with decimals, use a **Template** condition that compares with `>=` instead.

{% enddetails %}

<a id="numeric-state-condition-doesnt-pass-while-the-entity-is-unavailable"></a>

{% details "Numeric state condition doesn't pass while the entity is unavailable" %}

<h3 class="no_toc">Symptom</h3>

The automation has a **Numeric state** condition, and the entity is unavailable or unknown. The condition doesn't pass.

#### Description

A **Numeric state** condition doesn't pass when the value is unavailable or unknown. This also applies when the threshold comes from another entity that is unavailable or unknown.

#### Resolution

1. Go to {% my developer_states title="**Settings** > **Tools** > **States**" %} and check the state of the entity, and of the threshold entity, if you use one.
2. If it is unavailable, check that the device has power and a connection.

{% enddetails %}

<a id="state-condition-with-for-at-least-doesnt-pass-after-a-restart"></a>

{% details "State condition with For at least doesn't pass after a restart" %}

<h3 class="no_toc">Symptom</h3>

The automation has a **State** condition with **For at least**. After Home Assistant restarted, the condition doesn't pass, although the entity has had that state for a long time.

#### Description

After a restart, Home Assistant counts the time that an entity has had its state from the moment it started. The **For at least** duration of a **State** condition then starts at the restart.

#### Resolution

Wait until the duration has passed after the restart, or choose a shorter duration.

{% enddetails %}

<a id="time-condition-across-midnight-doesnt-pass-after-midnight-because-of-days-of-the-week"></a>

{% details "Time condition across midnight doesn't pass after midnight, because of Days of the week" %}

<h3 class="no_toc">Symptom</h3>

The automation has a **Time** condition with **Days of the week**, and a time range across midnight, for example, **After** 22:00 and **Before** 06:00 on Friday. At 02:00 on Saturday, the condition doesn't pass.

#### Description

**Days of the week** checks the current day. After midnight, the day is already Saturday, not Friday. The time range across midnight itself works.

#### Resolution

To cover exactly one night, for example, from Friday 22:00 to Saturday 06:00, split the range into two **Time** conditions in an **Or** building block:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %} and open the automation.
2. Under **And if**, select **Add building block**, and then select **Or**.
3. In the **Or** building block, add two **Time** conditions:
   - One with **After** set to 22:00, and **Days of the week** set to Friday.
   - One with **Before** set to 06:00, and **Days of the week** set to Saturday.
4. Remove the old **Time** condition.
5. Select **Save**.

{% enddetails %}

<a id="template-condition-doesnt-pass-although-the-template-gives-a-result"></a>

{% details "Template condition doesn't pass although the template gives a result" %}

<h3 class="no_toc">Symptom</h3>

The automation has a **Template** condition. In the template editor, the template gives a result such as `on`, `yes`, or `1`, but the condition doesn't pass.

#### Description

A **Template** condition only passes when the template gives `true`. Any other result, such as `on`, `yes`, or a number, doesn't pass.

#### Resolution

Change the template so that it gives `true` or `false`, for example, with a comparison such as `==` or `>`. To check the result, [test the template](/docs/tools/dev-tools/#testing-a-template) in the template editor.

{% enddetails %}

<a id="condition-doesnt-pass-error-evaluating-condition-in-the-logs"></a>

{% details "Condition doesn't pass: “Error evaluating condition” in the logs" %}

<h3 class="no_toc">Symptom</h3>

A condition doesn't pass, and the logs show a warning like `Error evaluating condition in '<name of your automation>'`.

#### Description

The condition couldn't be checked, for example, because the entity doesn't exist, or its state is not a number in a **Numeric state** condition. A condition that can't be checked doesn't pass.

#### Resolution

1. Go to {% my logs title="**Settings** > **System** > **Logs**" %}, and check the error.
2. Fix the condition, for example, by selecting an existing entity.

{% enddetails %}

## I can't edit, delete, or rename my automation

Use this section if the automation is read-only, can't be deleted, or keeps its old entity ID after renaming.

<a id="automation-cant-be-edited-or-deleted-this-automation-cannot-be-edited-from-the-ui"></a>

{% details "Automation can't be edited or deleted: “This automation cannot be edited from the UI”" %}

<h3 class="no_toc">Symptom</h3>

The automation editor shows **This automation cannot be edited from the UI, because it is not stored in the automations.yaml file, or doesn't have an ID.**, or deleting it shows **Only automations in automations.yaml can be deleted.**

#### Description

The automation is set up in YAML, outside the `automations.yaml` file, or it has no `id`. Home Assistant can only change automations in `automations.yaml` that have an `id`.

#### Resolution

- To edit the automation in the UI, select **Migrate**. Home Assistant opens an editable copy. After you save the copy, remove the old automation from your YAML configuration.
- To delete the automation, remove it from your YAML configuration, and then reload the automations or restart Home Assistant.

{% enddetails %}

<a id="automation-created-from-a-blueprint-i-can-only-change-the-blueprint-inputs"></a>

{% details "Automation created from a blueprint: I can only change the blueprint inputs" %}

<h3 class="no_toc">Symptom</h3>

The automation editor only shows the blueprint and its inputs. You can't change the triggers, conditions, or actions.

#### Description

The automation is created from a {% term blueprint %}. The blueprint defines its triggers, conditions, and actions.

#### Resolution

To change the automation itself, turn it into a regular automation:

1. In the automation editor, select **Menu** {% icon "mdi:dots-vertical" %}, and then select **Take control**.
   - Result: A preview of the automation opens.
2. Select **Yes**, and then select **Save**.
   - Result: The automation no longer uses the blueprint. Changes to the blueprint no longer apply to it.

{% enddetails %}

<a id="automation-keeps-its-old-entity-id-after-renaming"></a>

{% details "Automation keeps its old entity ID after renaming" %}

<h3 class="no_toc">Symptom</h3>

You renamed the automation, but its entity ID is still the old one.

#### Description

[**Rename**](/docs/automation/editor/#renaming-an-automation-and-adding-details) only changes the name of the automation, not its entity ID.

#### Resolution

1. In the automation editor, select **Menu** {% icon "mdi:dots-vertical" %}, and then select **Settings**.
2. Under **Entity ID**, enter the new entity ID, and then select **Update**.

If other automations, scripts, or dashboards use the old entity ID, update them too. Home Assistant doesn't do this for you.

{% enddetails %}

## My automation doesn't appear in the UI

Use this section if a new or existing automation is missing from the list of automations.

<a id="automation-is-missing-from-the-list-of-automations-new-automation-setup-timed-out"></a>

{% details "Automation is missing from the list of automations: “New automation setup timed out”" %}

<h3 class="no_toc">Symptom</h3>

You created an automation in the automation editor or from a blueprint, but it doesn't appear in the list of automations. When you saved it, Home Assistant might have shown **New automation setup timed out**.

#### Description

Your {% term "`configuration.yaml`" %} no longer includes the `automations.yaml` file. The automation editor saves your automations in `automations.yaml`, and Home Assistant only loads that file when {% term "`configuration.yaml`" %} includes it. The default configuration includes it, but the line may have been removed when the file was edited.

#### Resolution

This is one of the few cases where you need to edit {% term "`configuration.yaml`" %}. There is no setting for it in the UI.

1. Open your {% term "`configuration.yaml`" %}. If you haven't edited it before, refer to [editing `configuration.yaml`](/docs/configuration/#editing-configurationyaml).
2. Add this line from the default configuration back to the file:

   ```yaml
   automation: !include automations.yaml
   ```

3. [Check the configuration](/docs/configuration/#validating-the-configuration).
4. [Reload the configuration](/docs/configuration/#reloading-the-configuration-to-apply-changes) of the automations, or restart Home Assistant.
   - Result: Your automations appear in the list of automations. If you set an area, category, or labels when you saved an automation, set them again. They were not saved.

{% enddetails %}
