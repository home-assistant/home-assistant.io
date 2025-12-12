---
title: "Unsupported software"
description: "More information on why running unsupported software marks the installation as unsupported."
---

## The issue

As stated in [ADR-0014](https://github.com/home-assistant/architecture/blob/master/adr/0014-home-assistant-supervised.md), no additional software, outside of the Home Assistant ecosystem, is installed. This includes but are not limited to standalone containers running on the same host.

Some containers will also conflict with the operations of the Supervisor, if you run any of those your system will also be marked as unhealthy. These containers will be shown in the Supervisor log as errors.

## The solution

Remove any additional software (including standalone containers) you have installed on your host and restart the Supervisor.
