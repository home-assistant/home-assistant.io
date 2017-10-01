---
layout: page
title: "Hue hub"
description: "Instructions how to integrate your Hue within Home Assistant."
date: 2017-09-15 18:45
sidebar: true
comments: false
sharing: true
footer: true
logo: philips_hue.png
ha_category: Hub
ha_release: 0.55
---


The `hue` hub component must be added before you can use the `hue` sensors platform. Note that you must have the file `phue.conf` in your Home-assistant configuration directory, but this will have been created already if you are using the Hue lights component.

To use this component, add the following to your configuration.yaml file:

```yaml
# Example configuration.yaml entry
hue:
```
