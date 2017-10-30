---
layout: page
title: "Shell command"
description: "Instructions how to integrate Shell commands into Home Assistant."
date: 2015-10-13 19:10
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Automation
logo: home-assistant.png
---

This component can expose regular shell commands as services. Services can be called from a [script] or in [automation].
Shell commands aren't allowed for a camel-case naming, please use lowercase naming only and separate the names with underscores.

[script]: /components/script/
[automation]: /getting-started/automation/

```yaml
# Example configuration.yaml entry
# Exposes service shell_command.restart_pow
shell_command:
  restart_pow: touch ~/.pow/restart.txt
```

Configuration variables:

 - Alias for the command
 - Command itself.

The commands can be dynamic, using templates to insert values for arguments. When using templates, shell_command runs in a more secure environment which doesn't allow any shell helpers like automatically expanding the home dir `~` or using pipe symbols to run multiple commands.

Any service data passed into the service call to activate the shell command will be available as a variable within the template.

```yaml

# Apply value of a GUI slider to the shell_command
automation:
  - alias: run_set_ac
    trigger:
      platform: state
      entity_id: input_number.ac_temperature
    action:
      service: shell_command.set_ac_to_slider

input_number:
  ac_temperature:
    name: A/C Setting
    initial: 24
    min: 18
    max: 32
    step: 1
    
{% raw %}
shell_command:
  set_ac_to_slider: 'irsend SEND_ONCE DELONGHI AC_{{ states.input_number.ac_temperature.state }}_AUTO'
{% endraw %}
```
