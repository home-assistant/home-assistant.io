---
layout: page
title: "Setting up TellStick"
description: "Instructions how to integrate your TellStick into Home Assistant."
date: 2015-03-28 13:06
sidebar: false
comments: false
sharing: true
footer: true
logo: telldus_tellstick.png
ha_category: Hub
---

<img src='/images/supported_brands/telldus_tellstick.png' class='brand pull-right' />
The TellStick Home Assistant integration allows users to add switches and sensors.

To get started, add the following information to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
switch:
  platform: tellstick

sensor:
  platform: tellstick

  # optionally, you can name your sensors by mapping ID to their name
  2: Outside
  5: Fridge

  # Set only_named to 1 to hide all sensors that you did not mention.
  only_named: 1

# All dimmers will be picked up as lights.
light:
  platform: tellstick

```


