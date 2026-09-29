---
title: "Testing and troubleshooting automations"
description: "How to test the conditions and actions of an automation and how to find out why an automation did not run, using the trace timeline, the logs, and the test buttons in the automation editor."
---

Sometimes an automation does not do what you expect. Maybe it does not run at all, maybe it runs at the wrong moment, or maybe one of the actions in the middle quietly fails. Home Assistant has built-in tools to help you find out exactly what happened, without having to dig through log files.

The most useful tool is the **trace**. Every time an automation runs, Home Assistant records a step-by-step timeline of what was triggered, which conditions were checked, and what each action did. You can also test parts of an automation directly from the editor, without waiting for a real trigger.

## Testing your automation

Many automations can be tested directly in the automation editor UI.

### Checking the state of a condition

You can see whether a condition passes or fails as soon as you add it to the automation.

In the automation editor UI, hover over the state indicator circle on the left side of the condition row to check the condition state. The available states are:

- **Condition passes**: the condition is verified.
- **Condition did not pass**: the condition is not verified.
- **Invalid condition configuration**: the condition has an invalid input value for an option, for example.
- **Condition state unknown**: the condition state can't be checked due to a missing input value for an option, for example.

There is an automatic and continuous verification of the condition state. When you edit the condition and change any of its options, for example, the condition state is automatically updated.

### Running the entire automation

In the three dots menu in the automation list or automation editor UI, select the **Run actions** button. This will execute all the {% term actions %}, while skipping all {% term triggers %} and {% term conditions %}. This lets you test the full sequence of actions, as if the automation was triggered and all conditions were true. Note that any [trigger ID](/docs/automation/trigger/#trigger-id) used in your triggers will not be active when you test this way. The Trigger ID or any data passed by in the `trigger` data in conditions or actions can't be tested directly this way.

You can also trigger an automation manually. This can test the conditions as if the automation was triggered by an event. Go to {% my developer_services title="**Settings** > **Tools** > **Actions**" %}. In the **Action** drop-down, select **Automation: Trigger**, then **Choose entity** to select the automation you are testing. Toggle whether to skip the conditions, then **Perform action**. If needed, additional `trigger` or other data can be added in the YAML view for testing. The [trigger](/docs/automation/trigger/) page has more information about data within the trigger.

If an event fires a trigger, the trigger row displays the message **Triggered** in the automation editor UI. You can select the message to see the YAML details in the **Triggering event detail** dialog.

Testing with complex triggers, conditions, and variables can be difficult. Note that using the **Run actions** button will skip all triggers and conditions, while **Tools** can be used with or without checking conditions.

### Running individual actions or conditions

In the automation editor UI, each {% term condition %} can be tested individually. On the right side of the condition row, select the three dots {% icon "mdi:dots-vertical" %} menu, and then select **Test**.

- Testing a condition will highlight it to show whether the condition passed at the moment it was tested. If all conditions pass, then the automation will run when triggered. Testing building blocks like an **and** condition will report whether the whole block registers as true or false, or you can test individual conditions within the building block.
- If the condition is verified, the condition row displays the message **Condition passes**.
- If the condition is not verified, the condition row displays the message **Condition did not pass**.

In the automation editor UI, each {% term action %} can be tested individually. On the right side of the action row, select the three dots {% icon "mdi:dots-vertical" %} menu, and then select **Run action**.

- Testing an action block will run that block immediately.
- If the action runs, the action row displays the message **Action ran successfully**.
- If the action fails, the action row displays the message **Error running action**. Select the message to open a dialog with more information about the error.

Note that complex automations that depend on previous blocks, such as trigger IDs, variables in templates, or action calls that return data to use in subsequent blocks, cannot be tested this way.

If you are writing automations in YAML, it is also useful to go to {% my server_controls title="**Settings** > **Tools** > **YAML**" %} and in the Configuration validation section, select the **Check configuration** button. This is to make sure there are no syntax errors before restarting Home Assistant.

## Traces

Every time an {% term automation %} runs, Home Assistant records a trace: a step-by-step record of what happened. The trace shows which {% term trigger %} started the automation, whether each {% term condition %} passed, what each {% term action %} did, and which variables changed. If you ran the actions manually, the trace only shows the steps that ran, without a trigger or conditions. Use it to find out why an automation did not do what you expected.

Home Assistant keeps the last 5 traces of each automation. Some triggers also record a trace when they notice a relevant change but do not start the automation. These traces are marked **Did not trigger**. They are kept separately, so they never replace the traces of real runs.

Automations created in YAML must have an [`id`](/docs/automation/yaml/#migrating-your-yaml-automations-to-automationsyaml) for their traces to be available.

### Viewing the traces of an automation

Do this when an automation did not run as expected, to see which path it took and where it stopped. You can open the traces from the automation list, the automation editor, or **Activity**.

1. Do one of the following:
   - Go to {% my automations title="**Settings** > **Automations & scenes**" %}. In the automation list, select **Overflow menu** {% icon "mdi:dots-vertical" %} next to the automation, and then select **Traces**.
     - Result: The trace of the latest run opens.
   - In the automation editor, select **Traces** in the top bar. On narrow screens, select **Menu** {% icon "mdi:dots-vertical" %}, and then select **Traces**.
     - Result: The trace of the latest run opens.
   - In **Activity**, select **View trace** next to an entry of the automation.
     - Result: The trace of the run that created this entry opens.
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
