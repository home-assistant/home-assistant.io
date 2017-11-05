---
layout: page
title: "Hyperion"
description: "Instructions how to integrate Hyperion into Home Assistant."
date: 2015-10-25 22:43
sidebar: true
comments: false
sharing: true
footer: true
logo: hyperion.png
ha_category: Light
ha_release: 0.7.6
ha_iot_class: "Local Polling"
---

The `hyperion` platform allows you to integrate your [Hyperion](https://hyperion-project.org/wiki) into Home Assistant. Hyperion is an open source Ambilight implementation which runs on many platforms.

To use your Hyperion light in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
light:
  - platform: hyperion
    host: IP_ADDRESS
```

Configuration variables:

- **host** (*Required*): The IP address of the device the Hyperion service is running on.
- **port** (*Optional*): The port used to communicate with the Hyperion service. Defaults to `19444`.
- **name** (*Optional*): The name of the device used in the frontend.
- **priority** (*Optional*): The priority of the hyperion instance. Defaults to `128`.
- **default_color** (*Optional*): The color of the light. Defaults to `[255, 255, 255]`.
