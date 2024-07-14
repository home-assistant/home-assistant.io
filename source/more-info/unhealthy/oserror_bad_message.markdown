---
title: "Operating System error: Bad message"
description: "More information on what to do when OS errors mark the installation as unhealthy."
---

## The issue

The Supervisor received Operating System errors during file operation (Python OSError exceptions). The error number reported was 74, "Bad message", which is typically raised on file system corruption. File system corruption can happen due to a power outage or when the system otherwise did not get shut down properly. 

## The solution

Typically, Home Assistant recovers from file system corruption. If you see this error for the first time, ignore it. In case the problem gets worse, make sure to create a full backup, download it, or store it on a different system.

If this issue reappears even after a system restart, your system configuration or hardware might be at fault. Consider a clean reinstallation of your Operating System. If you are using an external USB drive, consider replacing the USB adapter or the SSD. If you are confident that the hardware is not at fault and you are using a Raspberry Pi, it might be related to incompatibility with certain UAS drives. For more background information, read this [Raspberry Pi forum post][rpi-forum-uas]. The Home Assistant OS maintains a list of devices where UAS are disabled in order to work around the problem (check config.txt on the first partition of your installation). If the USB PID/VID of your device is missing, consider [opening an issue][haos-issue] in the Home Assistant OS project.

[rpi-forum-uas]: https://forums.raspberrypi.com/viewtopic.php?t=245931
[haos-issue]: https://github.com/home-assistant/operating-system/issues/new/choose