---
title: "Troubleshooting installation problems"
description: "Common installation problems and their solutions."
---

It can happen that you run into trouble while installing Home Assistant. This page is here to help you solve the most common problems.

### System freezes

On small systems (such as a Pi2), not directly supported by binaries (Python Wheels) you may run out of memory.
Upon the first run or after an upgrade, Home Assistant uses a lot of resources to (re)compile all the integrations.
If you run out of memory and/or swap memory, your system will freeze.
Increasing swap memory can help:

```bash
sudo dphys-swapfile swapoff
sudo nano /etc/dphys-swapfile
```

Modify the line the sets the swapfile size. Set it equal to your memory or double your current setting: `CONF_SWAPSIZE = 925` then:

```bash
sudo dphys-swapfile swapon
sudo systemctl restart dphys-swapfile.service
```
