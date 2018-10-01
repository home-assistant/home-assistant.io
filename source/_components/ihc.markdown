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
ha_release: "0.62"
ha_iot_class: "Local Push"
---

IHC Controller integration for Home Assistant allows you to connect the LK IHC
controller to Home Assistant. The controller is sold under other names in
different countries - "ELKO Living system" in Sweden and Norway

An `ihc` section must be present in the `configuration.yaml` file and contain
the following options:

```yaml
# Example configuration.yaml entry
ihc:
   url: http://192.168.1.3
   username: YOUR_USERNAME
   password: YOUR_PASSWORD
   info: true
```

{% configuration %}
auto_setup:
  description: Automatic setup of IHC products.
  required: false
  type: boolean
  default: true
info:
  description: Shows the IHC "name", "note" and "position" attributes of each component. This will make it easier to identify the IHC products within Home Assistant.
  required: false
  type: boolean
password:
  description: The password for the IHC Controller.
  required: true
  type: string
url:
  description: The URL of the IHC Controller.
  required: true
  type: string
username:
  description: The username for the IHC Controller.
  required: true
  type: string
{% endconfiguration %}

There is currently support for the following device types within Home Assistant:

- [Binary Sensor](/components/binary_sensor.ihc/)
- [Sensor](/components/sensor.ihc/)
- [Light](/components/light.ihc/)
- [Switch](/components/switch.ihc/)

### Auto setup of IHC products

If the auto setup is enabled, the `ihc` component will automatically find IHC
products and insert these as devices in Home Assistant.
To disable this set auto_setup to false. See the individual device types for a
list of IHC products to be recognized automatically.

Components will get a default name that is a combination of the IHC group and
IHC resource id.
If you want to change the display names use the
[Customizing entities](/docs/configuration/customizing-devices/).

### {% linkable_title Manual setup %}

Each device is associated with an IHC resource id. To manually setup components
you specify resource ids from the IHC project. The IHC project is the file you
edit/upload to the IHC Controller using LK IHC Visual - or similar program if
your controller is not the LK brand.
The project file is an XML file and you can view it with any text/XML editor.
You can rename it to have the XML extension and use a browser like Chrome or
Internet Explorer. The resources are the \<airlink_xxx> or \<dataline_xxx>
elements. Shown as inputs or outputs of products in the IHC application. You can
also use inputs and outputs from function blocks. These are the
\<resource_input> and \<resource_output> elements from the project file.

The IHC resource id should be specified as an integer value. In the project file
the id will be specified as a hex number.

If you want an easier way to get the IHC resource ids, you can download the
[Alternative Service View application](https://www.dingus.dk/updated-ihc-alternative-service-view/).
The application will show the product tree. You can expand it, select inputs and
outputs and when selected you can see the resource id.

See the manual of each device type for configuration options.
