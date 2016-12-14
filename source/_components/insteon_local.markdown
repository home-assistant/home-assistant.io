---
layout: page
title: "Insteon(local)"
description: "Instructions how to setup the Insteon Hub locally within Home Assistant."
date: 2016-01-27 08:00
sidebar: true
comments: false
sharing: true
footer: true
logo: insteon.png
ha_category: Hub
ha_iot_class: "Local Polling"
---

The `insteon-local` component lets you use your [Insteon Hub](http://www.insteon.com/insteon-hub/) with Home Assistant.

To integrate your Insteon(local) with Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml platform entry
insteon_local:
  host: YOUR HUB IP
  username: YOUR HUB USERNAME
  password: YOUR HUB PASSWORD
# Example configuration.yaml light entry  
light:
  - platform: insteon_local
    lights:
      dining_room:
        device_id: 30DA8A
        name: Dining Room
      living_room:
        device_id: 30D927
        name: Living Room
```

Configuration variables:

- **username** (*Required*): The username used to access the Insteon interface (find in your insteon app).
- **password** (*Required*): The password used to access the Insteon interface.
- **host** (*Required*): The ip address of your hub.
