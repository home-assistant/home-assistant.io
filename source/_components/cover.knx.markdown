---
layout: page
title: "KNX Cover"
description: "Instructions on how to integrate KXN covers with Home Assistant."
date: 2017-06-18 12:00
sidebar: true
comments: false
sharing: true
footer: true
logo: knx.png
ha_category: DIY
ha_release: 0.48
ha_iot_class: "Local Polling"
---


The `knx` cover platform is used as in interface with KNX covers.

To use your KNX covers in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
cover:
  - platform: knx
    updown_address: 9/0/0
    stop_address: 9/0/1
```

- **updown_address** (*Required*): The KNX group address that is used to move the cover up and down.
- **stop_address** (*Required*): The group address that is used to stop the cover.
- **setposition_address** (*Optional*): The group address that is used to set the position.
- **getposition_address** (*Optional*): The group address that is used to read the position.
- **name** (*Optional*): A name for this devices used within Home Assistant.

