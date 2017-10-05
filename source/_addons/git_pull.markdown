---
layout: page
title: "GIT pull"
description: "Load and update configuration files for Home Assistant from a GIT repository."
date: 2017-09-25 14:00
sidebar: true
comments: false
sharing: true
footer: true
---

Load and update configuration files for Home Assistant from a GIT repository.

```json
{
  "repository": "https://example.com/my_configs",
  "auto_restart": false,
  "repeat": {
    "active": false,
    "interval": 300
  }
}
```

- **repository** (*Required*): GIT url to your repository.
- **auto_restart** (*Optional*): Make a restart of Home-Assistant if the config have change and is valid.
- **repeat/active** (*Optional*): Pull periodic for GIT updates.
- **repeat/interval** (*Optional*): Pull all x seconds and look for changes.
