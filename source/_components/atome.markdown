---
title: "Atome Linky Sensor"
description: "Instructions on how to integrate Atome Linky consumption data within Home Assistant."
logo: enedis.png
ha_release: 0.97
ha_category:
  - Energy
  - Sensor
ha_iot_class: Cloud Polling
---

The `atome` sensor platform is retrieving the consumption of your home from the [Direct Energy Atome electric meter](https://total.direct-energie.com/particuliers/electricite/compteur-linky/atome).
This special little device is connected to a Linky Electric Meter, and sends live data to a cloud platform.


As there is no official documentation for the API, the component retrieves data from the API used in the Atome mobile app, [hosted here](http://esoftlink.esoftthings.com).

## Configuration

To use it, you need to order the device directly from "Total Direct Energie" Mobile App. Then you need to follow up the installation (covered inthe Atome App).
The configuration (see below) needs your Atome username & password you created during the initialisation of the Atome device.

And then, add the Atome sensor to your `configuration.yaml` file like below:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: atome
    username: YOUR_ATOME_USERNAME
    password: YOUR_ATOME_PASSWORD
```

{% configuration %}
username:
  description: The Atome account username.
  required: true
  type: string
password:
  description: The Atome account password.
  required: true
  type: string
timeout:
  description: Timeout to wait for the API connection.
  required: false
  type: integer
  default: 10
{% endconfiguration %}
