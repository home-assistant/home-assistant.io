---
title: "found character '\t' that cannot start any token"
description: "This YAML error means a tab character snuck into one of your configuration files. Replace it with two spaces."
ha_category: Usage
---

This error means a tab character was used instead of two spaces in one of your {% term YAML %} configuration files. Replace the tab with two spaces and the error will go away.

You only need to think about this if you edit YAML by hand. Most users never do, since {% term integrations %}, dashboards, and {% term automations %} are all configured through the user interface. If you have not opened a YAML file yourself, this error is most likely coming from a custom integration or a snippet you copied in from somewhere else.

Learn more:

- [YAML syntax](/docs/configuration/yaml/)
- [Do I need to learn YAML to use Home Assistant?](/faq/#do-i-need-to-learn-yaml-to-use-home-assistant)
