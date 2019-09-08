---
title: "Obihai"
description: "Instructions on how to integrate your Obihai device into Home Assistant."
logo: obitalk.png
ha_iot_class: "Local Polling"
ha_category:
  - Sensor
ha_release: 0.99
redirect_from:
  - /components/sensor.obihai/
---

The `obihai` integration allows you to view the call status for your [Obihai devices](https://www.obitalk.com/info/products#home_section).

To enable `obihai` in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: obihai
    host: 192.168.1.x
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
```

{% configuration %}
host:
  description: IP Address of Obihai device
  required: true
  type: string
username:
  description: Username for the Obihai device.
  required: true
  type: string
  default: admin
password:
  description: Password for the Obihai device.
  required: true
  type: string
  default: admin
{% endconfiguration %}
