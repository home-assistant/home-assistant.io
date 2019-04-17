---
layout: page
title: "Afvalwijzer"
description: "Instructions on how to integrate Afvalwijzer into Home Assistant."
date: 2019-04-17 16:00
sidebar: true
comments: false
sharing: true
footer: true
logo: epson.png
ha_category: Sensor
ha_release: 0.93
ha_iot_class: Local Polling
---

The `afvalwijzer` platform allows you to monitor the garbage pickup dates from the Afvalwijzer platform (https://www.mijnafvalwijzer.nl/) from Home
Assistant. Afvalwijzer is a platform where Dutch townships post the garbage collection dates for the various types of garbage. You can setup a notification to be reminded when which garbage type is collected

To add Afvalwijzer to your installation,
add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
   - platform: afvalwijzer
     zipcode: ZIP_CODE
     housenumber: HOUSE_NUMBER
     housenumberaddition: HOUSE_NUMBER_ADDITION
     monitored_conditions:
     - restafval
     - pmd
     - gft
     - papier
     - takken
     - kerstboom
```

{% configuration %}
zipcode:
  description: The zipcode of the address you want to monitor (i.e. 1234AB)
  required: true
  type: string
housenumber:
  description: The house number of the address you want to monitor (i.e. 1)
  required: true
  type: string  
housenumberaddition:
  description: The house number addition of the address you want to monitor (i.e. A)
  required: false
  type: string  
monitored_conditions:
  description: "The garbage types to monitor. Valid values are: `restafval`, `pmd`, `gft`, `papier`, `takken` and `kerstboom`. Takken stands for prunings, kerstboom is the christmas tree collection."
  required: true
  type: list 
{% endconfiguration %}

Not all Dutch addresses are supported, check on mijnafvalwijzer.nl if your address is supported 
