---
title: "Operating System error: Bad message"
description: "More information on what to do when OS errors mark the installation as unhealthy."
---

## The issue

The Supervisor received Operating System errors during file operation (Python OSError exceptions). The error number reported was 74, "Bad message", which is typically raised on file system corruption.

## The solution

File system corruption can happen due to power outage or when the system otherwise did not get shutdown properly. Typically Home Assistant recovers from file system corruption, so if you see this error the first time consider just ignoring it. Just in case the problem gets worse, make sure to create a full backup (and download it or store it on a different system).

If this issue reappears even after a system restart, your system configuration or hardware might be at fault. Consider a clean reinstallation of your Operating System. If you are using a externally attached USB drive, consider replacing the USB adapter or the SSD. If you are confident that the hardware is not at fault and you are using a Raspberry Pi, it might be related to incompatibility with certain UAS drives (this [Raspberry Pi forum post][rpi-forum-uas] has some more background information). Home Assistant OS maintains a list of devices where UAS gets disabled to work around the problem (check config.txt on the first partition of your installation). If the USB PID/VID of your device is missing consider [opening an issue][haos-issue] in the Home Assistant OS project.

[rpi-forum-uas]: https://forums.raspberrypi.com/viewtopic.php?t=245931
[haos-issue]: https://github.com/home-assistant/operating-system/issues/new/choose