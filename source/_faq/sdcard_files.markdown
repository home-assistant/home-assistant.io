---
title: "I'm trying to find my files on the host or SD card. Where are they?"
ha_category: Home Assistant
---

On a Home Assistant OS install, your files are on the data partition within `/mnt/data/supervisor/`.
On the SD itself, this is an EXT4 partition labeled `hassos-data`.

On a Supervised install, they are in `/usr/share/hassio/`.