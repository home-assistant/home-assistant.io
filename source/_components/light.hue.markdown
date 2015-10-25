---
layout: page
title: "Philips Hue support"
description: "Instructions how to setup Philips Hue within Home Assistant."
date: 2015-03-23 20:09
sidebar: false
comments: false
sharing: true
footer: true
logo: philips_hue.png
ha_category: Light
---

<img src='/images/supported_brands/philips_hue.png' class='brand pull-right' />

Philips Hue support is integrated into Home Assistant as a light platform. The preferred way to setup the Philips Hue platform is by enabling the [the discovery component]({{site_root}}/components/discovery.html).

If you want to enable the light component directly, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
light:
  platform: hue
```
