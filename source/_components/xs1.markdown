---
layout: page
title: "EZcontrol XS1"
description: "Instructions on how to integrate an XS1 Gateway within Home Assistant."
date: 2018-12-04 20:00
sidebar: true
comments: false
sharing: true
footer: true
logo: xs1.jpg
ha_category: Hub
featured: true
ha_iot_class: "Local Polling"
---

The [EZcontrol XS1](http://www.ezcontrol.de/content/view/36/28/) integration for Home Assistant allows you to observe and control devices configured on the XS1 Gateway. Please have a look at the official docs for using this gateway [Bedienungsanleitung v3.0.0.0](http://www.ezcontrol.de/support/downloads/XS1/xs1manual/Bedienungsanleitung_EZcontrol_XS1_3.0.0.0-2.pdf).

## {% linkable_title Configuration %}

Add the following entry to the `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
xs1:
  host: "192.168.2.100"
```

The component will automatically detect the configuration of the XS1 Gateway only **on initialization** which currently means when Home Assistant boots. When you change the configuration of the XS1 you (currently) have to restart Home Assistant to see the effects.

{% configuration %}
xs1:
  required: true
  description: Main config entry to use this component
  type: map
  keys:
    host:
      description: Host of the XS1 Gateway
      required: true
      type: string
    port:
      description: Custom port if your running your gateway behind some kind of proxy
      required: false
      type: integer
      default: 80
    ssl:
      description: Defines if `https` should be used for api requests  (only possible via your own proxy)
      required: false
      type: boolean
      default: false
    username:
      description: User to access XS1 web api
      required: false
      type: string
    password:
      description: Password to access XS1 web api
      required: false
      type: string
{% endconfiguration %}

## {% linkable_title Supported Device Types %}

<p class='note warning'>
This component currently only covers part of the device types supported by the XS1 gateway, unsupported types are simply ignored.
</p>

### {% linkable_title Sensors %}

Any type of sensor is supported.

<p class='note warning'>
If you are using climate devices the "current temp" sensor will be automatically used by the actuator (if named correctly). To make this work have a look at the actuator description below.
</p>

### {% linkable_title Actuators %}

| Type          | Supported | Notes                                            |
|---------------|-----------|--------------------------------------------------|
| `switch`      | Yes       |                                                  |
| `dimmer`      | Partly    | Dimmers are currently handled like switches so actual dimming is not supported :(|
| `temperature` | Yes       |                                                  |
 
 
### {% linkable_title Climate Actuator/Sensor%}

Home Assistant can combine temperature sensors and climate actuators into a single device. To see how this can be done using multiple configuration entries on the XS1 have a look at the [XS1 Climate](/components/climate.xs1) page.

## {% linkable_title Examples %}

In this section you find some real-life examples of how to use this component.

### {% linkable_title Full configuration %}

This example shows how you can use the optional configuration options.

```yaml
# Example configuration.yaml entry
xs1:
  host: "192.168.2.100"
  port: 80
  ssl: false
  username: myuser
  password: 123totallySecure
```