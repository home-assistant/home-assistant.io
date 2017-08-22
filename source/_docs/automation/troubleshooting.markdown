---
layout: page
title: "Troubleshooting Automations"
description: "Tips on how to troubleshoot your automations."
date: 2016-04-24 08:30 +0100
sidebar: true
comments: false
sharing: true
footer: true
redirect_from: /getting-started/automation-troubleshooting/
---

You can verify that your automation rules are being initialized correctly by watching both the realtime logs (`homeassistant.log` in the configuration directory) and also the [Logbook](/components/logbook/). The realtime logs will show the rules being initialized (once for each trigger), example:

```text
INFO [homeassistant.components.automation] Initialized rule Rainy Day
INFO [homeassistant.components.automation] Initialized rule Rainy Day
INFO [homeassistant.components.automation] Initialized rule Rainy Day
INFO [homeassistant.components.automation] Initialized rule Rain is over
```

The Logbook component will show a line entry when an automation is triggered. You can look at the previous entry to determine which trigger in the rule triggered the event.

![Logbook example](/images/components/automation/logbook.png)

[template]: /topics/templating/
