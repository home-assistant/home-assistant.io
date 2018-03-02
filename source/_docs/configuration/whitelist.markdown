---
layout: page
title: "Accessing directories"
description: "Configuring access to directories via the whitelist."
date: 2018-03-02 12:50
sidebar: true
comments: false
sharing: true
footer: true
redirect_from: /getting-started/basic/#accessing-directories
---

Home-assistant keeps a list of external directories that are writeable or accessible by components. If a component needs to access an external directory that is not added to the `whitelist_external_dirs`, an error with be thrown. To add directories to the whitelist add to your configuration:

```yaml
homeassistant:
  whitelist_external_dirs:
    - /www
```
