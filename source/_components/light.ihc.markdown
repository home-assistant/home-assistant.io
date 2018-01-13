---
layout: page
title: "IHC Light"
description: "Instructions how to integrate IHC lights within Home Assistant."
date: 2017-11-27 13:35
sidebar: true
comments: false
sharing: true
footer: true
logo: ihc.png
ha_category: Light
ha_release: 0.59
ha_iot_class: "Local Push"
---

Before you can use the IHC Light platform, you must setup the [IHC Component](../ihc/)

When auto setup is enabled the following products will be found in the IHC project and setup as light devices:

* Wireless lamp outlet dimmer
* Wireless dimmer
* Wireless combi dimmer 4 buttons
* Wireless lamp outlet relay
* Wireless combi relay 4 buttons
* Wireless mobile dimmer
* Dataline lamp outlet

To manually configure IHC lights insert this section in your configuration:

```yaml
light:
  - platform: ihc
    lights:
      - id: 12345
        name: tablelight
        dimmable: True
      - id: 12346
        name: anotherlight
      ...
```

Configuration variables:
- **dimmable** (*Optional*): Default false. Set to True if the IHC resource is a light level
- **id** (*Required*): The IHC resource id.
- **lights** (*Optional*): List of lights to setup manually
- **name** (*Optional*): The name of the component.

In the example above 12345 is ihc resource id and "tablelight" is the name. 
The IHC resource id can be a light level for dimmers or an boolean output of a relay. 
For more information about IHC resource ids see [Manual Setup](../ihc/#manualy-setup)
