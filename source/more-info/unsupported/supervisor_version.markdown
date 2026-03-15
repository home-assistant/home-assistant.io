---
title: "Supervisor Version"
description: "More information on why supervisor_version marks the installation as unsupported."
---

## The issue

Only the latest version of the supervisor is supported. Users may control when Supervisor
updates by disabling its default auto-update behavior and updating it manually.
But using any version of Supervisor besides the latest is not supported.

## The solution

Update Supervisor to the latest version by running the following command:
```bash
ha supervisor update
```
Or re-enable auto update with this command:
```bash
ha supervisor options --auto-update
```
