---
layout: page
title: "Anova Precision Cooker"
description: "Instructions on how to integrate your Anova Precision Cooker within Home Assistant."
date: 2018-07-30 03:00
sidebar: true
comments: false
sharing: true
footer: true
logo: anova_culinary.png
ha_category: Sous-Vide
ha_release: 0.76
---

The `anova` platform allows you to control your [Anova Precision Cooker](https://anovaculinary.com/anova-precision-cooker/) sous-vide machine.

<p class='note'>
This platform has only been tested with an Anova 2 Wifi cooker, but should hopefully work with any of the Anova products.
</p>

To add your Anova cooker to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sous_vide:
  - platform: anova
    name:  My anova
    mac: 11:22:33:44:55:66
```

Configuration variables:

- **name** (*Optional*): The name you want to give to the cooker entity.
- **mac** (*Required*): The MAC address of the cooker.
