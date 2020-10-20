---
title: "Containers known to cause issues"
description: "More information on why certain containers marks the installation as unsupported."
---

## The issue

The Supervisor needs to be the only manager of the containers that it manages, unfortunately, some other containers also take on this role. Worst case, those will auto-update the existing containers to development builds without consideration of the channel you have chosen. Because of this, a few containers known to cause issues, have been added to a denylist that will flag your installation as unsupported.

As stated in [ADR-0014](https://github.com/home-assistant/architecture/blob/master/adr/0014-home-assistant-supervised.md), running additional software on the host is not supported,
and more containers or other software can be added to the denylist without any notice.

## The solution

You will find a list of offending containers in your Supervisor log.

If you remove all offending containers from your host and then reload the Supervisor, it will no longer be marked as unsupported for this reason.
