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
ha_release: 0.31
---

The ZoneMinder component is the main component to integrate all the sensors and switches for controlling your ZoneMinder instance.

```yaml
# Example configuration.yaml entry
zoneminder:
  host: ZM_HOST
```

Configuration variables:
- **host** (*Required*): Your ZoneMinder server.
- **path** (*Optional*): Path to your ZoneMinder install. Defaults to `/zm/`.
- **ssl** (*Optional*): Set to `True` if your ZoneMinder installation is using SSL. Default to `False`.
- **username** (*Optional*): Your ZoneMinder username.
- **password** (*Optional*): Your ZoneMinder password.

### {% linkable_title Full configuration %}

```yaml
# Example configuration.yaml entry
zoneminder:
  host: ZM_HOST
  path: ZM_PATH
  ssl: False
  username: USERNAME
  password: PASSWORD
```
