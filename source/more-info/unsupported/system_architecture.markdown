---
title: "System architecture"
description: "More information on why System Architecture marks the installation as unsupported."
---

## The issue

Supervisor considers `i386`, `armhf`, and `armv7` (all 32-bit system architectures)
as unsupported. Home Assistant announced the sunset of these architectures in May 2025
(see [this blog post for more information](https://www.home-assistant.io/blog/2025/05/22/deprecating-core-and-supervised-installation-methods-and-32-bit-systems/)).
On these system architectures, the Supervisor stops refreshing its update
information. This means you will no longer receive updates for any component,
including Home Assistant Core or Add-on updates.

## The solution

You can continue to use the system as is, but it is recommended to move your
Home Assistant installation onto supported hardware. This makes sure that you'll
continue to receive software updates, including security updates.

1. To migrate to a supported architecture, [create a full backup](/common-tasks/general/#backups)
and download it.
2. Install Home Assistant OS on supported 64-bit hardware. 
   - Use the [restore from backup feature during onboarding](https://www.home-assistant.io/getting-started/onboarding/) (Option 2).
   - If you use a Raspberry Pi 3 or Raspberry Pi 4, you can install the 64-bit variants
of Home Assistant OS. 
      - See the [Raspberry Pi installation documentation](https://www.home-assistant.io/installation/raspberrypi/) for detailed instructions.
