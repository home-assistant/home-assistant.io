---
title: "Job conditions ignored"
description: "More information on why ignoring job conditions marks the installation as unsupported."
---

## The issue

Ignoring job conditions can be useful in a development setting, but running with this is not supported and it will cause issues, these issues can break your system.

## The solution

Remove all ignored conditions by using the CLI.

```bash
ha jobs options --ignore_conditions []
```

When you have removed all of them, reload the Supervisor.

```bash
ha supervisor reload
```
