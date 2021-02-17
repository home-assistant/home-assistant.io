---
title: Obihai
description: Instructions on how to integrate your Obihai device into Home Assistant.
logo: obitalk.png
ha_iot_class: Local Polling
ha_category:
  - Sensor
ha_release: 0.99
ha_codeowners:
  - '@dshokouhi'
ha_domain: obihai
ha_platforms:
  - sensor
---

The `obihai` integration allows you to view the call status for your [Obihai devices](https://www.obitalk.com/info/products#home_section).

To enable `obihai` in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: obihai
    host: 192.168.1.x
```

{% configuration %}
host:
  description: IP Address of Obihai device
  required: true
  type: string
username:
  description: Username for the Obihai device.
  required: false
  type: string
  default: admin
password:
  description: Password for the Obihai device.
  required: false
  type: string
  default: admin
{% endconfiguration %}

The following is a list of expected sensors and their expected states when using the `user` account:

- Sensor if the device requires a reboot (`True` or `False`)
- Sensor for each configured service (`0` for no calls, `1` for a call and `2` for call waiting/3way calling)
- Sensor for the last reboot date
- Sensor for call direction (`No Active Calls`, `Inbound Call` or `Outbound Call`) 

In addition to the above list the `admin` account can expect to see the following sensors:

- Obihai service status (`Normal`, `Down` or other states from Obihais network)
- Sensors for each phone port in use (`On Hook`, `Off Hook` and `Ringing`)
- Sensors for last caller name and number (this is also the current incoming call, will also show `--` if no data provided)
