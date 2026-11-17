---
title: "My integration does not show up"
description: "If an integration you set up does not appear in Home Assistant, the reason is almost always in the logs."
ha_category: Configuration
---

If an {% term integration %} you set up does not appear in Home Assistant, the reason is almost always in the logs. Go to {% my logs title="**Settings** > **System** > **Logs**" %} and look for errors that mention the integration.

If you configured the integration through {% term "`configuration.yaml`" %} and the YAML file has a mistake, Home Assistant will refuse to load the affected parts. You can check your configuration before restarting:

- [Operating System](/common-tasks/os/#configuration-check)
- [Container](/common-tasks/container/#configuration-check)

Most integrations are set up through the user interface and do not require any YAML at all. See [Do I need to learn YAML to use Home Assistant?](/faq/#do-i-need-to-learn-yaml-to-use-home-assistant) for more on when YAML is and is not needed.
