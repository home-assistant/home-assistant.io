---
title: IntesisHome
description: Instructions how to integrate IntesisHome AC devices with Home Assistant
ha_category: Climate
ha_release: 0.104
ha_iot_class: Cloud Push
ha_codeowners:
  - '@jnimmo'
ha_domain: intesishome
ha_platforms:
  - climate
---

The `IntesisHome` climate platform lets you control [IntesisHome](https://www.intesishome.com) (including [Airconwithme](https://airconwithme.com) and Fujitsu anywAiR) and [IntesisBox](https://www.intesisbox.com) devices. IntesisHome provides integrations with air conditioners, including Panasonic, Daikin, Fujitsu, Toshiba, LG and more.

The platform allows for local control of IntesisBox devices using the WMP protocol, and local control of some IntesisHome models which include an embedded webserver.

## Configuration

To set it up, add the following information to your `configuration.yaml` file:

```yaml
climate:
#   IntesisHome example
  - platform: intesishome
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
#   IntesisHome with integrated webserver example
  - platform: intesishome
    device: intesishome_local
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
    host: 192.168.1.50
#   IntesisBox example
  - platform: intesishome
    device: IntesisBox
    host: 192.168.1.50
#   Airconwithme example
  - platform: intesishome
    device: airconwithme
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
```


{% configuration %}
username:
  description: "Your username for [IntesisHome.com](https://accloud.intesis.com) / [Airconwithme](https://airconwithme.com)"
  required: false
  type: string
password:
  description: Your password for IntesisHome
  required: false
  type: string
host:
  description: IP address or hostname for the IntesisBox and intesishome_local platforms.
device:
  description: "`IntesisHome`, `anywair`, `airconwithme`, `IntesisBox` or `intesishome_local`"
  required: false
  default: IntesisHome
  type: string
{% endconfiguration %}

This component opens a TCP connection with the IntesisHome API to receive temperature and status updates, and to issue commands.
By default, the component will be named using the friendly device name from the IntesisHome website or application.

### Supported services

Available services:

- `climate.set_temperature`
- `climate.set_fan_mode`
- `climate.set_operation_mode`
- `climate.set_swing_mode`
- `climate.turn_on`
- `climate.turn_off`
