---
layout: page
title: "Mochad"
description: "Instructions on how to integrate Mochad into Home Assistant."
date: 2016-10-20 17:09
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Hub
ha_release: 0.32
---

The `mochad` component is the main component to integrate all X10 platforms being controlled by [mochad](https://sourceforge.net/projects/mochad/). Besides this component you will have to setup your X10 devices separately.

To integrate your Mochad units with Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
mochad:
```

Configuration variables:

- **host** (*Optional*): The host that mochad is running on. Defaults to `localhost`.
- **port** (*Optional*): The port that mochad is running on. Defaults to `1099`.

A full configuration sample could look like the one below:

```yaml
# Example configuration.yaml entry
mochad:
  host: localhost
  port: 1099
```
