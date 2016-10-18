---
layout: page
title: "Neato Robotics Switch"
description: "Instructions how to integrate a Neato Botvac Connected switch within Home Assistant."
date: 2016-10-18 16:41
sidebar: true
comments: false
sharing: true
footer: true
logo: neato.png
ha_category: Switch
ha_release: 0.3X
---

The `neato` switch platform allows you to control your [Neato Botvac Connected](https://www.neatorobotics.com/robot-vacuum/botvac-connected-series/botvac-connected/).

To enable this switch in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
    platform: neato
    username: USERNAME
    password: PASSWORD
```

This will automatically add switch for each Botvac Connected that you have. The switch will start a full home cleaning when turn ON and return the robot to base when turn OFF.

<p class='note'>
The Home Assistant Neato platform has only be tested a Botvac Connected. There is no support for the Botvac D3 Connected and Botvac D5 Connected robots at this time.
</p>
