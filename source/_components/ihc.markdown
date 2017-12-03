---
layout: page
title: "IHC"
description: "Instructions on how to integrate the IHC components with Home Assistant"
date: 2017-11-11 22:00
sidebar: true
comments: false
sharing: true
footer: true
logo: ihc.png
ha_category: Hub
ha_release: "0.59"
ha_iot_class: "Local Push"
---

IHC Controller integration for Home Assistant allows you to connect the LK IHC controller to Home Assistant. 
(The controller is sold under other names in different countries - "ELKO Living system" in Sweeden and Norway)

An `ihc` section must be present in the `configuration.yaml` file and contain the following options:

```yaml
# Example configuration.yaml entry
ihc:
   host: http://192.168.1.3
   username: admin
   password: mysecret
   info: True
```
Configuration variables:
- **host** (*Required*): The url of the IHC Controller.
- **username** (*Required*): The username for the IHC Controller.
- **password** (*Required*): The password for the IHC Controller.
- **info** (*Optional*): If True additional ihc info will be shown on each component.

The info option will show the IHC "note" and "position" attributes. 
This will make it easier to identify the products within Home Assistant

There is currently support for the following device types within Home Assistant:

- [Binary Sensor](../binary_sensor.ihc/) 
- [Sensor](../sensor.ihc/) 
- [Light](../light.ihc/) 
- [Switch](../switch.ihc/) 

### Auto setup of IHC products

Each compoment can automatically find products from the IHC project and insert these as components in Home Assistant.
To enable this set autosetup to True for the component. 
See the individual components for a list of products to be regocnized automatically.

Components will get a default name that is a combination of the IHC location and IHC resource id.
If you want to change the names use the [Customizing entities](../../docs/configuration/customizing-devices/)

### {% linkable_title Manualy setup %}

To manually setup components you specify resource ids from the IHC project.
(The IHC project is the file you edit/upload to the IHC Controller using LK IHC Visual - or similar program if your controller is not the LK brand).
The project file is a XML file and you can view it with any text/xml editor. 
You can rename it to have the xml extension and use a browser like Chrome or Internet Explorer.
The resources are the \<airlink_xxx> or \<dataline_xxx> eleements.
Shown as inputs or outputs of products in the application.
You can also use inputs and outputs from function blocks.
These are the \<resource_input> and \<resource_output> elements from the project file.

The IHC resource id should be specified as an integer value. (In the project file the id will be specified as a hex number)

If you want an easier way to get the IHC resource ids, you can download the [Alternative Service View application](https://www.dingus.dk/updated-ihc-alternative-service-view/).
The application will show the product tree. You can expand it, select inputs and outputs and when selected you can see the resource id.
