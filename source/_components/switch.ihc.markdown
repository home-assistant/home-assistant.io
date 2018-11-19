---
layout: page
title: "IHC Switch"
description: "Instructions on how to integrate IHC switches within Home Assistant."
date: 2017-11-27 13:35
sidebar: true
comments: false
sharing: true
footer: true
logo: ihc.png
ha_category: Switch
ha_release: 0.62
ha_iot_class: "Local Push"
---

Before you can use the IHC Switch platform, you must setup the
[IHC Component](/components/ihc/)

When auto setup is enabled the following products will be found in the ihc
project and setup as switch devices:

- Wireless plug outlet
- Wireless relay
- Mobile wireless relay
- Dataline plug outlet

To manually configure IHC switches insert the "switches" section in your
IHC configuration:

```yaml
ihc:
  - url: 'http://192.168.1.3'
    username: YOUR_USERNAME2
    password: YOUR_PASSWORD2
    info: true 
    switches:
      - id: 12345
      - id: 12346
```

{% configuration %}
switches:
  description: List of switches to setup manually
  required: false
  type: map
  keys:
    id:
      description: The IHC resource id.
      required: true
      type: integer
    name:
      description: The name of the component
      required: false
      type: string
    note:
      description: Descriptive note.
      required: false
      type: string
      default: false
    position
      description: Where it is placed.
      required: false
      type: string
      default: false
{% endconfiguration %}

The resource id should be a boolean resource (On/Off).
For more information about IHC resource ids see
[Manual Setup](/components/ihc/#manual-setup).
