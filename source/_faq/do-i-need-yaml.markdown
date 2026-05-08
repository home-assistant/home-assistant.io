---
title: "Do I need to learn YAML to use Home Assistant?"
description: "No. Home Assistant can be set up and used entirely from the user interface. YAML is an optional power-user feature."
ha_category: About Home Assistant
---

No. You do not need to learn {% term YAML %} to use Home Assistant.

This is one of the most common questions about Home Assistant, and the answer used to be different. In the early days of the project, almost everything was configured by editing YAML files by hand. That has not been the case for a long time. Today, the user interface handles the vast majority of setups, and YAML is only needed for a few specialized use cases.

Adding {% term integrations %}, building dashboards, and creating {% term automations %} are all done from the user interface. The visual automation editor handles the vast majority of automations, and most integrations are set up through a guided dialog with menus and forms.

YAML is a simple text format that Home Assistant supports as an optional power-user feature. It is useful when you want to:

- Reuse the same configuration across many automations.
- Set up a small number of integrations that do not yet have a user interface.
- Keep your configuration in version control.

If none of that applies to you, you can safely ignore YAML and still get a fully working smart home.

Learn more:

- [`configuration.yaml`](/docs/configuration/)
- [YAML syntax](/docs/configuration/yaml/)
- [Adding integrations](/getting-started/integration/)
- [Automating Home Assistant](/docs/automation/)
