---
layout: page
title: "Neato Robotics"
description: "Instructions how to integrate your Neato within Home Assistant."
date: 2016-10-09 20:15
sidebar: true
comments: false
sharing: true
footer: true
logo: neato.png
ha_category: Hub
ha_release: 0.33
---

The `neato` component allows you to control your [Neato Botvac Connected](https://www.neatorobotics.com/robot-vacuum/botvac-connected-series/botvac-connected/).

To enable `neato` in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
neato:
  username: USERNAME
  password: PASSWORD
```

Configuration variables:

- **username** (*Required*): Username for the Neato account.
- **password** (*Required*): Password for the Neato account.

<p class='note'>
After the update to firmware 4.0 (which adds cleaning maps) there is also support for displaying the maps of the Botvac D3 Connected and Botvac D5 Connected robots. The start/stop functionality does not work. More information on how to update here: https://support.neatorobotics.com/hc/en-us/articles/115004320694-Software-Update-4-0-for-Neato-Botvac-Connected-D3-D5-
</p>
