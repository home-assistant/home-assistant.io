---
title: "Troubleshooting Automations"
description: "Tips on how to troubleshoot your automations."
---

You can verify that your automation rules are being initialized correctly by watching both the realtime logs (`homeassistant.log` in the configuration directory) and also the [Logbook](/integrations/logbook/). The realtime logs will show the rules being initialized (once for each trigger), example:

```text
INFO [homeassistant.components.automation] Initialized rule Rainy Day
INFO [homeassistant.components.automation] Initialized rule Rainy Day
INFO [homeassistant.components.automation] Initialized rule Rainy Day
INFO [homeassistant.components.automation] Initialized rule Rain is over
```

The Logbook integration will show a line entry when an automation is triggered. You can look at the previous entry to determine which trigger in the rule triggered the event.

![Logbook example](/images/integrations/automation/logbook.png)

[template]: /topics/templating/

### Testing your automation

It is generally a difficult task to test an automation, especially if it includes several triggers and some conditions.

Please note that if you click on **Trigger** of an automation in the frontend, **only the `action` part will be executed** by Home Assistant. That means you **can't** test your trigger or condition part that way. It also means that if your automation uses some data from triggers, it won't work properly as well just because `trigger` is not defined in this scenario.

All this makes that Trigger feature pretty limited and nearly useless for debugging purposes so you need to find another way.
Make sure you check and adapt to your circumstances appropriate examples from Automation Trigger, Conditions and Actions.

It is also useful to go to **{% my server_controls title="Configuration -> Server Control" %}** and click on **Check Configuration** button in Configuration validation section to make sure there are no syntax errors before restarting Home Assistant. In order for **Check configuration** to be visible, you must enable **Advanced Mode** on {% my profile title="your user profile" %}.

If your automation uses templates in any part, you can do the following to make sure it works as expected:

1. Go to **{% my developer_templates title="Developer tools -> Template" %}** tab.
2. Create all variables (sources) required for your template as described at the end of [this](https://www.home-assistant.io/docs/configuration/templating/#processing-incoming-data) paragraph.
3. Copy your template code and paste it in Template editor straight after your variables.
4. If necessary, change your sources' value and check if the template works as you want and does not generate any errors.
