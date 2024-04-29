---
title: "Supervisor was not able to update"
description: "More information on why a failed Supervisor update marks a system as unhealthy."
---

## The issue

This can happen when there was a network issue during the startup of the Supervisor.

## The solution

Manually update the Supervisor, in case there is an update pending. This can be done from the {% my updates %} panel.

This can also be done with the CLI, by running the following command:
```bash
ha supervisor update
```

In case this doesn't work. Check the logs, if there's an error where a host can't be resolved (eg: lookup ghcr.io: no such host) there might be a problem with your network settings (eg: dns server that can't be reached).
