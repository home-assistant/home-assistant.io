---
title: "Containers known to cause issues"
description: "More information on why certain containers marks the installation as unsupported."
---

## The issue

The supervisor needs to be the only manager of the containers that it manages, unfortunately there are som other containers that also take on this role, and even worse they will auto-update the containers to development builds without consideration of the channel you have chosen, because of this a few containers known to cause issues have been added to a denylist that will flag your system as unsupported.

The containers in question is:

- containrrr/watchtower
- pyouroboros/ouroboros
- v2tec/watchtower

## The solution

If you remove all offending containers from your host and then reload the supervisor it will no longer be marked as unsupported for this reason.
