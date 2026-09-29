---
title: "Testing and troubleshooting automations"
description: "How to test the conditions and actions of an automation and how to find out why an automation did not run, using the trace timeline, the logs, and the test buttons in the automation editor."
---

Sometimes an automation does not do what you expect. Maybe it does not run at all, maybe it runs at the wrong moment, or maybe one of the actions in the middle quietly fails. Home Assistant has built-in tools to help you find out exactly what happened, without having to dig through log files.

The most useful tool is the **trace**. Every time an automation runs, Home Assistant records a step-by-step timeline of what was triggered, which conditions were checked, and what each action did. You can also test parts of an automation directly from the editor, without waiting for a real trigger.

## Testing your automation

Many automations can be tested directly in the automation editor UI.

### Checking the state of a condition

While the automation is open in the automation editor, you can see whether each condition passes right now. Home Assistant checks the condition again every second, so you can watch it change when the situation changes, for example, when a door opens. It is also checked again when you edit the condition.

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %} and open the automation.
2. Hover over the state indicator circle on the left side of the condition row.
   - Result: The tooltip shows one of the following states:
     - **Condition passes**: the condition is met.
     - **Condition did not pass**: the condition is not met.
     - **Invalid condition configuration**: the condition has an invalid input value for an option, for example.
     - **Condition state unknown**: the condition state can't be checked due to a missing input value for an option, for example.

### Testing a single condition

You can test each {% term condition %} of an automation on its own.

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %} and open the automation.
2. On the right side of the condition row, select **Menu** {% icon "mdi:dots-vertical" %}, and then select **Test**.
   - You can test a building block such as **And** as a whole, or test each condition within it.
   - The test checks the condition on its own, without trigger data or variables from earlier blocks. If the condition depends on them, the result is not reliable. In that case, [run the automation with a simulated trigger](#using-a-simulated-trigger-to-test-an-automation) and check its [trace](#traces) instead.
   - Result: For a few seconds, the condition is highlighted to show whether it passed at the moment it was tested:
     - If the condition is met, the condition row displays the message **Condition passes**.
     - If the condition is not met, the condition row displays the message **Condition did not pass**.
     - If all conditions of the automation pass, the automation runs its actions when it is triggered.

### Running a single action manually

To test a single {% term action %} of an automation, you can run it manually.

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %} and open the automation of interest.
2. On the right side of the action row, select **Menu** {% icon "mdi:dots-vertical" %}, and then select **Run action**.
   - The action runs on its own, without trigger data, variables, or data returned by earlier blocks. If the action depends on them, [run the automation with a simulated trigger](#using-a-simulated-trigger-to-test-an-automation) and check its [trace](#traces) instead.
   - Result: The action runs immediately. For a few seconds, the action row displays the message **Action ran successfully** or **Error running action**.
3. If the action failed, select the message while it is shown to see more information about the error.

### Running all actions manually

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
2. In the **Action** drop-down, select **Trigger automation**, with **Automation** next to it.
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
       - For a **State** trigger, set the state from its **From** value to its **To** value. If the entity already has the **To** state, set it to a different state first. Setting the same state again is not a state change, so the trigger does not react.
       - For a **Numeric state** trigger, set a value that crosses its **Above** or **Below** threshold. If the value is already past the threshold, first set a value on the other side.
       - For a trigger on an attribute, change that attribute under **State attributes (YAML, optional)**.
     - For details, refer to [Setting the state of an entity](/docs/tools/dev-tools/#setting-the-state-of-an-entity).
     - Changing the state here doesn't change the device. It only changes the state that Home Assistant shows, so that the trigger reacts. After the test, the state shown may be wrong until the device reports its state again.
     - Result: Every automation with a trigger on that state change starts, with the trigger data of the simulated change. The actions of the automation run for real.
   - To simulate an event, go to {% my developer_events title="**Settings** > **Tools** > **Events**" %}.
     - If you don't know what the event data looks like, first [listen to the real event](/docs/tools/dev-tools/#listening-to-events) to see it.
     - Enter the same **Event type** and **Event data** as in the trigger of your automation, and select **Fire event**. For details, refer to [Firing an event](/docs/tools/dev-tools/#firing-an-event).
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

When an {% term automation %} is run, all steps are recorded and a trace is made. To open the automation editor, go to {% my automations title="**Settings** > **Automations & scenes**" %}.

From the automation editor UI, or in the automations list in the three dots menu, select **Traces**. Alternatively, select an automation entry shown under **Activity**.

![Automation tracing example](/images/integrations/automation/automation-tracing.png)

The above screenshot shows a previous run of an automation. The automation is displayed using an interactive graph, highlighting which path the automation took. Each node in the graph can be selected to view the details on what happened with the automation during that specific step. It traces the complete run of an automation.

The right side of the trace screen has tabs with more information:

- **Step Details** shows data and results of the step that is currently highlighted.
- **Automation Config** shows the full YAML configuration at the time the automation was run.
- **Trace Timeline**, shown in the screenshot above, lists the steps that were executed and their timing.
- **Related activity**, shows the activity for all the entries related to the specific trace.
- **Blueprint Config** will only be shown if the automation was created from a {% term blueprint %}.

The top bar shows the date and time the automation was triggered. Use the left and right arrows to view previous runs of the automation.

Automations created in YAML must have an [`id`](/docs/automation/yaml/#migrating-your-yaml-automations-to-automationsyaml) assigned in order for debugging traces to be stored.

### Trace configuration

The last 5 traces are recorded for all automations. It is possible to change this by adding the following code to your automation.


```yaml
trace:
  stored_traces: 20
```


## Testing templates

If your automation uses [templates](/docs/templating/) in any part, you can do the following to make sure it works as expected:

1. Go to {% my developer_template title="**Settings** > **Tools** > **Template**" %} tab.
2. Create all variables (sources) required for your template as described at the end of [this](/docs/templating/where-to-use/#processing-incoming-data) paragraph.
3. Copy your template code and paste it in Template editor straight after your variables.
4. If necessary, change your sources' value and check if the template works as you want and does not generate any errors.

## Troubleshooting your automation

### "My automation doesn't appear in the UI"

#### Symptom

You created an automation in the automation editor or from a blueprint, but it doesn't appear in the list of automations.

#### Cause

Your {% term "`configuration.yaml`" %} no longer includes the `automations.yaml` file. The automation editor saves your automations in `automations.yaml`, and Home Assistant only loads that file when {% term "`configuration.yaml`" %} includes it. The default configuration includes it, but the line may have been removed when the file was edited.

#### Resolution

Add this line from the default configuration back to your {% term "`configuration.yaml`" %}:

```yaml
automation: !include automations.yaml
```

{% include integrations/restart_ha_after_config_inclusion.md %}
