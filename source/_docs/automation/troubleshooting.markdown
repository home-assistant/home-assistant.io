---
title: "Troubleshooting automations"
description: "Tips on how to troubleshoot your automations."
---

Automations and {% term scripts %} can be debugged in a few different ways. You can [test run](#testing-your-automation) the full sequence of actions, or test each condition and action separately. [Traces](#traces) let you see details of every step after an automation is run. For complicated automations with {% term templates %}, see the section [testing templates](#testing-templates).

## Testing your automation

Many automations can be tested directly in the automation editor UI.

### Running the entire automation

In the three dots menu in the automation list or automation editor UI, select the **Run** button. This will execute all of the {% term actions %}, while skipping all {% term triggers %} and {% term conditions %}. This lets you test the full sequence of actions, as if the automation was triggered and all conditions were true. Note that any [trigger ID](/docs/automation/trigger/#trigger-id) used in your triggers will not be active when you test this way. The Trigger ID or any data passed by in the `trigger` data in conditions or actions can't be tested directly this way.

You can also trigger an automation manually. This can test the conditions as if the automation was triggered by an event. Navigate to {% my developer_services title="**Developer tools** > **Actions**" %}. In the **Action** drop-down, select **Automation: Trigger**, then **Choose entity** to select the automation you are testing. Toggle whether to skip the conditions, then **Perform action**. If needed, additional `trigger` or other data can be added in the YAML view for testing. The [trigger](/docs/automation/trigger/) page has more information about data within the trigger.

Testing with complex triggers, conditions, and variables can be difficult. Note that using the **Run** button will skip all triggers and conditions, while **Developer Tools** can be used with or without checking conditions.

### Running individual actions or conditions

In the automation editor UI, each {% term condition %} and {% term action %} can be tested individually. Select the three dots {% icon "mdi:dots-vertical" %} menu, then the **Test** button.

- Testing a condition will highlight it to show whether the condition passed at the moment it was tested. If all conditions pass, then the automation will run when triggered. Testing building blocks like an **and** condition will report whether the whole block registers as true or false, or you can test individual conditions within the building block.

- Testing an action block will run that block immediately.

Note that complex automations that depend on previous blocks, such as trigger IDs, variables in templates, or action calls that return data to use in subsequent blocks, cannot be tested this way.

If you are writing automations in YAML, it is also useful to go to {% my server_controls title="**Developer tools** > **YAML**" %}** and in the Configuration validation section, select the **Check configuration** button. This is to make sure there are no syntax errors before restarting Home Assistant. In order for **Check configuration** to be visible, you must enable **Advanced Mode** on {% my profile title="your user profile" %}.

## Traces

When an {% term automation %} is run, all steps are recorded and a trace is made. From the UI, open **Settings**, which is located in the sidebar, then select **Automations & Scenes** to go to the automation editor or click this button directly: {% my automations badge %}

From the automation editor UI, or in the automations list in the three dots menu, select **Traces**. Alternatively, select an automation entry shown in the Logbook.

![Automation tracing example](/images/integrations/automation/automation-tracing.png)

The above screenshot shows a previous run of an automation. The automation is displayed using an interactive graph, highlighting which path the automation took. Each node in the graph can be clicked to view the details on what happened with the automation during that specific step. It traces the complete run of an automation.

The right side of the trace screen has tabs with more information:

- **Step Details** shows data and results of the step that is currently highlighted.
- **Automation Config** shows the full YAML configuration at the time the automation was run.
- **Trace Timeline**, shown in the screenshot above, lists the steps that were executed and their timing.
- **Related logbook entries**, shows a logbook for all the entries related to the specific trace.
- **Blueprint Config** will only be shown if the automation was created from a {% term blueprint %}.

The top bar shows the date and time the automation was triggered. Use the left and right arrows to view previous runs of the automation.

Automations created in YAML must have an [`id`](/docs/automation/yaml/#migrating-your-yaml-automations-to-automationsyaml) assigned in order for debugging traces to be stored.

### Trace configuration

The last 5 traces are recorded for all automations. It is possible to change this by adding the following code to your automation.

{% raw %}

```yaml
trace:
  stored_traces: 20
```

{% endraw %}

## Testing templates

If your automation uses [templates](/docs/configuration/templating/) in any part, you can do the following to make sure it works as expected:

1. Go to {% my developer_template title="**Developer tools** > **Template**" %} tab.
2. Create all variables (sources) required for your template as described at the end of [this](https://www.home-assistant.io/docs/configuration/templating/#processing-incoming-data) paragraph.
3. Copy your template code and paste it in Template editor straight after your variables.
4. If necessary, change your sources' value and check if the template works as you want and does not generate any errors.
