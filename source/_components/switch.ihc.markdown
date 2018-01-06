---
layout: page
title: "IHC Switch"
description: "Instructions how to integrate IHC switches within Home Assistant."
date: 2017-11-27 13:35
sidebar: true
comments: false
sharing: true
footer: true
logo: ihc.png
ha_category: Switch
ha_release: 0.59
ha_iot_class: "Local Push"
---

Before you can use the IHC Switch platform, you must setup the [IHC Component](../ihc/)

To configure IHC switches insert this section in your configuration:

```yaml
    switch:
      - platform: ihc
        auto_setup: True
```
The following products will be recognized from the ihc project if autosetup is enabled:

* Wireless plug outlet
* Wireless relay
* Mobile wireless relay
* Dataline plug outlet

To manually add ihc resources do:

```yaml
switch:
    - platform: ihc
    auto_setup: True
    switches:
        - id: 12345
          name: myswitch
        - id: 12346
        ....
```

Configuration variables:
- **auto_setup** (*Optional*): True to have IHC products auto setup.
- **id** (*Required*): The IHC resource id.
- **name** (*Optional*): The name of the component.
- **switches** (*Optional*): List of switches to setup manually

The resource id should be a boolean resource. (On/Off)
For more information about ihc resource ids see [Manual Setup](../ihc#manualy-setup)

