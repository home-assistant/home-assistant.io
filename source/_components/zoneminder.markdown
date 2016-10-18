---
layout: page
title: "ZoneMinder"
description: "Instructions how to integrate ZoneMinder into Home Assistant."
date: 2016-10-13 22:57
sidebar: true
comments: false
sharing: true
footer: true
logo: zoneminder.png
ha_category: Camera
featured: false
---

The ZoneMinder component is the main component to integrate all the sensors and switches for controlling your ZoneMinder instance.

```yaml
# Example configuration.yaml entry
zoneminder:
  host: ZM_HOST
  path: ZM_PATH
  username: USERNAME
  password: PASSWORD
```

Configuration variables:
- **host** (*Required*): Your ZoneMinder server.
- **path** (*Optional*): Path to your ZoneMinder install (default: /zm/)
- **username** (*Optional*): Your ZoneMinder username.
- **password** (*Optional*): Your ZoneMinder password.

