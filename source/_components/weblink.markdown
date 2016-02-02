---
layout: component
title: "Weblink"
description: "Instructions how to setup Links within Home Assistant."
date: 2016-02-02 20:00
sidebar: true
comments: false
sharing: true
footer: true
logo: 
ha_category: Other
---

The `weblinks` component allows you to display links in the Home Assistant frontend.

To use this component in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
weblink:
  entities:
    - name: Router
      url: http://192.168.1.1/
    - name: Home Assistant
      url: https://home-assistant.io
```
