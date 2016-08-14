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

The commands can be dynamic, using templates to insert values of other entities. When using templates you are limited to only template the arguments. You are also no longer allowed to use pipe symbols when using templates.

Any service data passed into the service call to activate the shell command will be available as a variable within the template.

```yaml
# Apply value of a GUI slider to the shell_command
input_slider:
  ac_temperature:
    name: A/C Setting
    initial: 24
    min: 18
    max: 32
    step: 1
{% raw %}
shell_command:
  set_ac_to_slider: 'irsend SEND_ONCE DELONGHI AC_{{ states.input_slider.ac_temperature.state}}_AUTO'
{% endraw %}
```
