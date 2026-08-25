---
title: "I'm trying to find my files on the host or SD card. Where are they?"
ha_category: Home Assistant
---

On a {% term "Home Assistant Operating System" %} installation, your files are on the data partition within `/mnt/data/supervisor/`.
On the SD itself, this is an EXT4 partition labeled `hassos-data`.

For information on file access, refer to the section on [configuring access to files](/common-tasks/os/#configuring-access-to-files).