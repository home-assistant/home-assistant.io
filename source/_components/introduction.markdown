---
layout: page
title: "Introduction"
description: "Details about the introduction within Home Assistant."
date: 2015-10-25 15:15
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Other
---

The introduction component will show a card in the UI with 'Welcome Home!' and steps on how to get started. It will also print the same message to the console when starting up.

The introduction component is loaded by default on a new Home Assistant instance.

```yaml
# Example configuration.yaml entry
introduction:
```

To disable this component, remove the `introduction:` entry from your `configuration.yaml` file.
