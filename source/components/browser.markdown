---
layout: page
title: "Browser"
description: "Instructions how to setup the browser component with Home Assistant."
date: 2015-01-24 14:39
sidebar: false
comments: false
sharing: true
footer: true
---

The browser component provides a service to open urls in the default browser on the host machine.

To load this component, add the following lines to your `configuration.yaml`:

```
browser:
```

#### Service `browser/browse_url`

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `url`                  |       no | The url to open
