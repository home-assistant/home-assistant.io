---
title: "Command Line Cover"
description: "How to control a cover with the command line."
ha_category:
  - Cover
ha_release: 0.14
ha_codeowners:
  - '@gjohansson-ST'
ha_config_flow: true
ha_iot_class: Local Polling
ha_domain: command_line
---

A `command_line`cover platform that issues specific commands when it is moved up, down and stopped. It allows anyone to integrate any type of cover into Home Assistant that can be controlled from the command line.

{% include integrations/config_flow.md %}

## Examples

In this section you find some real-life examples of how to use this sensor.

### Full configuration

| Field | Entry |
| --- | --- |
| Command open | move_command up garage |
| Command close | move_command down garage |
| Command stop | move_command stop garage |
| Command state | state_command garage |
| Value template | {%raw%}{% if value == 'open' %} 100 {% elif value == 'closed' %} 0 {% endif %}{%endraw%} |
