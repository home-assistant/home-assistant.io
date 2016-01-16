---
layout: component
title: "Netatmo"
description: "Instructions how to integrate Netatmo sensors into Home Assistant."
date: 2016-01-14 08:10
sidebar: true
comments: false
sharing: true
footer: true
logo: netatmo.png
ha_category: Sensor
---


The `netatmo` sensor platform is consuming the information provided by a [Netatmo](https://www.netatmo.com) device.

To enable the Netatmo sensor, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
sensor:
  platform: netatmo
  api_key: YOUR_API_KEY
  secret_key: YOUR_SECRET_KEY
  username: YOUR_USERNAME
  password: YOUR_PASSWORD
  modules:
    module_name1:
      - temperature
      - humidity
      - noise
      - pressure
      - co2
    module_name2:
      - temperature
```

Configuration variables:

- **api_key** (*Required*): The API key for your netatmo account.
- **secret_key** (*Required*): Your netatmo secret key
- **username** (*Required*): Username for the netatmo account.
- **password** (*Required*): Password for the netatmo account.
- **modules** (*Required*): Modules to use. Multiple entries allowd.
  - **module_name** array (*Required*): Name of the module.
    - ** [conditions] **: Condition to monitor.
