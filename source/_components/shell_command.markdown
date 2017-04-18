---
layout: component
title: "Shell command"
description: "Instructions how to integrate Shell commands into Home Assistant."
date: 2015-10-13 19:10
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Automation
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
