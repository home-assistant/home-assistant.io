---
title: "Why does the start button for an app flash red when I select it?"
description: "A red flash means the app failed to start or install. The reason is in the logs."
ha_category: Home Assistant
---

A red flash on the start button means the {% term app %} failed to start or install. The reason is in the logs.

Go to {% my supervisor_logs title="**Settings** > **System** > **Logs**" %} and select the relevant app from the dropdown to see why it failed to start. Common causes include a port that is already in use, missing configuration, or a hardware device that is not available.
