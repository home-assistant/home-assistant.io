---
layout: component
title: "Browser"
description: "Instructions how to setup the browser component with Home Assistant."
date: 2015-01-24 14:39
sidebar: true
comments: false
sharing: true
footer: true
logo: browser.png
ha_category: Other
---


The browser component provides a service to open urls in the default browser on the host machine.

To load this component, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
browser:
```

#### Service `browser/browse_url`

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `url`                  |       no | The url to open
