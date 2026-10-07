---
title: "Testing automations"
description: "How to test the triggers, conditions, and actions of an automation, and how to use traces to see what an automation did, step by step."
---

Sometimes an automation does not do what you expect. Maybe it does not run at all, maybe it runs at the wrong moment, or maybe one of the actions in the middle quietly fails. Home Assistant has built-in tools to help you find out exactly what happened, without having to dig through log files.

The most useful tool is the **trace**. Every time an automation runs, Home Assistant records a step-by-step timeline of what was triggered, which conditions were checked, and what each action did. You can also test parts of an automation directly from the editor, without waiting for a real trigger.

If you already know the symptom, for example, an automation that doesn't trigger, refer to [Troubleshooting automations](/docs/automation/troubleshooting/).

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

1. Go to {% my tools_actions title="**Settings** > **Tools** > **Actions**" %}.
2. In the **Action** dropdown list, select **Trigger automation**, with **Automation** next to it.
3. Select **Add target**, and then select the automation you are testing.
4. To check the conditions, turn off **Skip conditions**. To skip them, leave it on.
5. Optional: To pass variables for testing, switch to **YAML mode**, and add them under `variables` in the `data` of the action.
6. Select **Perform action**.
   - Result: The automation runs. If **Skip conditions** is off, the automation checks the conditions first.

### Using a simulated trigger to test an automation

To test an automation whose conditions or actions depend on which trigger started it, run it with a simulated trigger. You cause the change that the trigger reacts to by simulating a state change or an event. The automation then runs from the start, with real trigger data, including the [trigger ID](/docs/automation/trigger/#trigger-id).

This works for triggers that react to a state change or to an event, such as the **State changed**, **Numeric state crossed threshold**, and **Manual event received** triggers. For other triggers, such as a time or an MQTT trigger, cause the real thing the trigger reacts to instead, for example, by publishing the MQTT message.

{% note %}
**Risk of unintended device actions**

Simulating a state change or firing an event starts every automation with a trigger that reacts to it. Those automations control real devices and services.

To avoid this:

- Before you continue, review which automations react to this state change or event.
- Turn off any of these automations that you don't want to run.
{% endnote %}

1. Do one of the following:
   - To simulate a state change, go to {% my tools_states title="**Settings** > **Tools** > **States**" %}.
     - Under **Entity**, select the entity. Then use **Set state** to reproduce the change that your trigger reacts to:
       - For a **State changed** trigger, set the **State** from its **From** value to its **To** value. If the entity already has the **To** state, set it to a different state first. Setting the same state again is not a state change, so the trigger does not react.
       - For a **Numeric state crossed threshold** trigger, set a value in **State** that crosses its **Above** or **Below** threshold. If the value is already past the threshold, first set a value on the other side.
       - For a trigger on an attribute, change that attribute under **State attributes (YAML, optional)**.
     - For details, refer to [Setting the state of an entity](/docs/tools/dev-tools/#setting-the-state-of-an-entity).
     - Changing the state here doesn't change the device. It only changes the state that Home Assistant shows, so that the trigger reacts. After the test, the state shown may be wrong until the device reports its state again.
     - Result: Every automation with a trigger on that state change starts, with the trigger data of the simulated change. The actions of the automation run for real.
   - To simulate an event, go to {% my tools_events title="**Settings** > **Tools** > **Events**" %}.
     - If you don't know what the event data looks like, first [listen to the real event](/docs/tools/dev-tools/#listening-to-events) to see it.
     - Enter the same **Event type** and **Event data (YAML, optional)** as in the trigger of your automation, and select **Fire event**. For details, refer to [Firing an event](/docs/tools/dev-tools/#firing-an-event).
     - Result: Every automation with a trigger on that event starts, with the trigger data of the simulated event. The actions of the automation run for real.
2. To see what the automation did, open its [trace](#traces).

### Checking what triggered an automation

While the automation is open in the automation editor, you can see when a trigger reacts, and what it reacted to.

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %} and open the automation.
2. When a trigger reacts, its row displays the message **Triggered** for a few seconds. Select the message.
   - Result: The **Triggering event detail** dialog shows the trigger data in YAML, for example, the entity and its old and new state.

### Checking your YAML configuration

If you are writing automations in YAML, check your configuration for syntax errors before restarting Home Assistant.

1. Go to {% my tools_yaml title="**Settings** > **Tools** > **YAML**" %}.
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
