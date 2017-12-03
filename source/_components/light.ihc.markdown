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

To configure light insert this section in your configuration:

```yaml
light:
  - platform: ihc
    autosetup: True
```

autosetup: True will scan the ihc project and insert all products recognized as lights. The following products will be recognized:
* Wireless lamp outlet dimmer
* Wireless dimmer
* Wireless combi dimmer 4 buttons
* Wireless lamp outlet relay
* Wireless combi relay 4 buttons
* Dataline lamp outlet

 If you want to manually add ihc resources - add the ids like this:

```yaml
light:
  - platform: ihc
    autosetup: True
    lights:
      - id: 12345
        name: tablelight
      - id: 12346
        name: anotherlight
      ...
```

Configuration variables:
- **autosetup** (*Optional*): True to have IHC products auto setup.
- **id** (*Required*): The IHC resource id.
- **lights** (*Optional*): List of lights to setup manually
- **name** (*Optional*): The name of the component.

In the example above 12345 is ihc resource id and "tablelight" is the name. The ihc resource id can be a light level for dimmers or an boolean output of a relay. 
For more information about ihc resource ids see [Manual Setup](../ihc#manualy-setup)
