---
title: "Run a specific Home Assistant version"
description: "Instructions on how to run a specific Home Assistant version."
---

For this you would need to install the [Terminal & SSH add-on][ssh] or use the console
that is available on your device by connecting a keyboard and screen.

To install the Terminal & SSH add-on, choose **Supervisor**, which is located in the sidebar and then the add-on store.

Use the web-based terminal or SSH to your Home Assistant system, or connect to the console, and run:

```bash
ha core update --version=0.XX.X
```

[ssh]: /addons/ssh/
