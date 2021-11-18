---
title: "Home Assistant moving to YAML"
description: "Configuration will now be more flexible"
date: 2015-03-01 20:38:00 +0100
date_formatted: March 1, 2015
author: "Theodor Lindquist"
categories:
- Release-Notes
- Core
---

Home Assistant is now using [YAML](http://yaml.org/) for its configuration file. YAML allows the use of lists, which should make the configuration file a bit more flexible and useful. The new configuration file format is backwards compatible with existing components. Because of this, there is no need for component developers to update their components.

The new file is named configuration.yaml and if it can't be found in your config directory, Home Assistant will instead try to find the old configuration file, home-assistant.conf.

The home-assistant.conf.example has been replaced with an updated configuration.yaml.example.

Users of Home Assistant should migrate as the old configuration format is deprecated.
