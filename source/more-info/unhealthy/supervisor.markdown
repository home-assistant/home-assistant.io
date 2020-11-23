---
title: "Supervisor was not able to update"
description: "More information on why a failed Supervisor update marks a system as unhealthy."
---

## The issue

This can happen when there was a network issue during the startup of the Supervisor.

## The solution

Manually update the Supervisor. This can be done from the "System" tab in the Supervisor panel. On the card for "Supervisor", there is a button to update the Supervisor.

This can also be done with the CLI, by running the following command:
```bash
ha supervisor update
```
