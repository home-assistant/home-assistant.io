---
title: "AppArmor issues"
description: "More information on why missing AppArmor marks the installation as unsupported."
---

## The issue

AppArmor is how the Supervisor does handling all the security around Add-ons,
without this, multiple things that the Supervisor missing important security mechanics.

## The solution

If the AppArmor is not enabled on your host, set this to the Linux boot cmd: `apparmor=1 security=apparmor` and reboot your operating system.

As a last resort, you might need to reinstall the host running the Supervisor
with one of the supported operating systems, [see instructions here](/more-info/unsupported/os).
