---
title: "AppArmor issues"
description: "More information on why missing AppArmor marks the installation as unsupported."
---

## The issue

AppArmor is how the Supervisor does handling all the security around add-ons,
without this, the Supervisor is missing important security mechanics to protect your system and data within it.

## The solution

If the AppArmor is not enabled on your host, add this to the Linux kernel boot parameters:  `apparmor=1 security=apparmor` and then reboot your operating system.

As a last resort, you might need to reinstall the host running the Supervisor
with one of the supported operating systems, [see instructions here](/more-info/unsupported/os).
