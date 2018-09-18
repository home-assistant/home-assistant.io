---
layout: page
title: "ZeverSolar WebConnect"
description: "Instructions on how to connect your ZeverSolar Inverter to Home Assistant."
date: 2018-09-24 21:45
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Energy
logo: zeversolar.png
ha_iot_class: "Local Polling"
ha_release: 0.77.3
---


The `zeversolar` sensor will poll a [Zevercloud/Zeversolar](https://www.zevercloud.com) inverter api and present the values as sensors (or attributes of sensors) in Home Assistant.
An Api key is required and can be found on the Zevercloud website, once logged in, into the zevercloud website.  
Under `Configuration` -> `Plant Configuration` the Api Key can be found.

## {% linkable_title Configuration %}

To enable this sensor, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor zeversolar:
  - platform: zeversolar
    api_key: API_KEY
    resources:
      sid
      E-Today
      E-Month
```

Configuration variables:

- **api_key** (*Required*): The api key, which can be found on the (https://www.zevercloud.com) website.
- **sensors** (*Required*): A dictionary of sensors that will be added.

Sensors configuration:

The sensors can be any one of the following:
- sid
- E-Today
- E-Month
- E-Total
- TotalYield
- CO2Avoided
- Power
