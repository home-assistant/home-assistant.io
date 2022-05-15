---
title: "Command line Notify"
description: "Instructions on how to add command line notifications to Home Assistant."
ha_category:
  - Notifications
ha_release: 0.14
ha_codeowners:
  - '@gjohansson-ST'
ha_config_flow: true
ha_domain: command_line
---

The `command_line` platform allows you to use external tools for notifications from Home Assistant. The message will be passed in as STDIN.

{% include integrations/config_flow.md %}

To use notifications, please see the [getting started with automation page](/getting-started/automation/).
