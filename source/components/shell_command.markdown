---
layout: page
title: "Shell command component"
description: "Instructions how to integrate Sehll commands into Home Assistant."
date: 2015-10-13 19:10
sidebar: false
comments: false
sharing: true
footer: true
---

<img src='/images/supported_brands/utilities-terminal.png' class='brand pull-right' />
This component can expose regular shell commands as services

```yaml
# Example configuration.yaml entry
shell_command:
  restart_pow: touch ~/.pow/restart.txt
```

Configuration variables:

- Alias for the command and the command itself.

