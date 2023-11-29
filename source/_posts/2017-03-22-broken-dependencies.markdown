---
title: "0.40.2 and broken dependencies"
description: "Due to a bug in our dependency installation, some older versions can get into a broken state."
date: 2017-03-22 08:04:05 +0000
date_formatted: "March 22, 2017"
author: Paulus Schoutsen
author_twitter: balloob
categories:
- Release-Notes
- Core
---

TL; DR: We have just released version 0.40.2 that includes a fix related to the installation of dependencies.

Some users in the last few days have been reporting that their Home Assistant installation fails to start with an error in the http component:

```txt
ImportError: No module named 'aiohttp.file_sender'
```

The problem is that Home Assistant did not handle the case where a dependency would want to install a core dependency of Home Assistant that is newer than what Home Assistant works with. For now, we have identified the following two components that can cause this issue:

  - AppleTV (0.38+)
  - Android IP Webcam (0.40+)

This issue has been resolved by 0.40.2. If you are on an impacted version and cannot upgrade to the latest version just yet, a temporary workaround will be to remove the `<config dir>/deps` directory and stop using the above mentioned integrations. In the case of AppleTV, you will also have to disable the discovery component to prevent it from being auto-detected.
