---
title: "Why does Home Assistant use YAML for power-user configuration?"
description: "YAML is human-friendly and easy to read, which makes it a good fit for the small number of power-user settings that are still configured in a file."
ha_category: Configuration
---

Most things in Home Assistant are configured through the user interface and you never need to look at a configuration file. For the small number of power-user settings that are still configured in a file, Home Assistant uses [YAML](/docs/configuration/yaml/) rather than JSON or XML because YAML is much friendlier to read and write by hand. There are no commas to forget, no closing tags to balance, and indentation makes the structure of the document obvious.

If you are wondering whether you need to learn YAML at all, see [Do I need to learn YAML to use Home Assistant?](/faq/#do-i-need-to-learn-yaml-to-use-home-assistant)
