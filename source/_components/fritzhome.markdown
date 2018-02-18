---
layout: page
title: "Fritzbox"
description: "Instructions how to integrate the AVM fritzbox smarthome components."
date: 2018-02-18 17:10
sidebar: true
comments: false
sharing: true
footer: true
logo: avm.png
ha_category: Hub
ha_release: 0.64
ha_iot_class: "Local Polling"
---

The [AVM](www.avm.de) Fritzbox component for Home Assistant allows you to integrate the switch and climate devices.

#### {% linkable_title Tested Devices %}

- [FRITZ!Box 6490 Cable](https://avm.de/produkte/fritzbox/fritzbox-6490-cable/)
- [FRITZ!DECT 200](https://avm.de/produkte/fritzdect/fritzdect-200/)
- [Eurotronic Comet DECT](https://www.eurotronic.org/produkte/comet-dect.html)


## {% linkable_title Setup %}

```yaml
# Example configuration.yaml entry
fritzbox:
  devices:
    - host: fritz.box
      username: YOUR_USERNAME
      passowrd: YOUR_PASSWORD
```

{% configuration %}
  devices:
    description: A list of fritzbox devices.
    required: true
    type: map
    keys:
      host:
        description: The hostname or IP address of the fritzbox.
        required: true
        type: string
      username:
        description: The username for smarthome access.
        required: true
        type: string
      password:
        description: The password of the user.
        required: true
        type: string
{% endconfiguration %}
