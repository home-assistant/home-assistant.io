---
title: "Troubleshooting Automations"
description: "Tips on how to troubleshoot your automations."
---

When an automation is run, all steps are recorded and a trace is made. From the UI choose **Settings** which is located in the sidebar, then click on **Automations & Scenes** to go to the automation editor or click this button directly: {% my automations badge %}

Click on the clock icon next to an automation to enter the debugging screen. Alternatively, click on **Show trace** directly from a Logbook automation entry.

![Automation tracing example](/images/integrations/automation/automation-tracing.png)

The above screenshot shows a previous run of an automation. The automation is displayed using an interactive graph, highlighting which path the automation took. Each node in the graph can be clicked to view the details on what happened with the automation during that specific step. It traces the complete run of an automation.

The debugging screen is split into four features, the first being the Step Details which provides all details for each step of the automation. The second feature is the Trace Timeline which the screenshot above shows and where the automation can be followed on a timeline. The next is Related logbook entries, as the name says a logbook for all the entries related to the specific trace. The last two features are Automation Config and optionally Blueprint Config for the automation YAML code.

Automations created in YAML must have an [`id`](/docs/automation/yaml/#migrating-your-yaml-automations-to-automationsyaml) assigned in order for debugging traces to be stored.

#### Traces ####

The last 5 traces are recorded for all automations. It is possible to change this by adding the following code to your automation.

```yaml
trace:
    stored_traces: 1
```

[template]: /topics/templating/

## Testing your automation

It is generally a difficult task to test an automation, especially if it includes several triggers and some conditions.

Please note that if you click on **Trigger** of an automation in the frontend, **only the `action` part will be executed** by Home Assistant. That means you **can't** test your trigger or condition part that way. It also means that if your automation uses some data from triggers, it won't work properly as well just because `trigger` is not defined in this scenario.

All this makes that Trigger feature pretty limited and nearly useless for debugging purposes so you need to find another way.
Make sure you check and adapt to your circumstances appropriate examples from Automation Trigger, Conditions and Actions.

It is also useful to go to **{% my server_controls title="Developer Tools -> YAML" %}** and click on **Check Configuration** button in Configuration validation section to make sure there are no syntax errors before restarting Home Assistant. In order for **Check configuration** to be visible, you must enable **Advanced Mode** on {% my profile title="your user profile" %}.

If your automation uses templates in any part, you can do the following to make sure it works as expected:

1. Go to **{% my developer_template title="Developer tools -> Template" %}** tab.
2. Create all variables (sources) required for your template as described at the end of [this](https://www.home-assistant.io/docs/configuration/templating/#processing-incoming-data) paragraph.
3. Copy your template code and paste it in Template editor straight after your variables.
4. If necessary, change your sources' value and check if the template works as you want and does not generate any errors.
