---
title: "Ignored job conditions"
description: "More information on why ignoring job conditions marks the installation as unsupported."
---

## The issue

You have turned on the setting to ignore job conditions. Home Assistant has a built-in protection mechanism that detects if the system is working as expected. Ignoring job conditions disables this protection.

If the system is not working as expected, certain tasks can result in breaking the system.

## The solution

To solve this you need to re-enable the protection mechanism by removing all the ignored conditions by using the command-line interface (CLI):

```bash
ha jobs reset
```

When you have removed all of them, restart the Supervisor.

```bash
ha supervisor restart
```
