---
title: IntesisHome
description: Instructions how to integrate IntesisHome AC devices with Home Assistant
ha_category:
  - Climate
ha_release: 0.104
ha_iot_class: Cloud Push
ha_codeowners:
  - '@jnimmo'
ha_domain: intesishome
ha_platforms:
  - climate
ha_integration_type: integration
ha_quality_scale: legacy
---

The `IntesisHome` climate platform lets you control [IntesisHome](https://www.intesishome.com), [Airconwithme](https://airconwithme.com) and [anywAIR](https://www.fujitsugeneral.com.au/anywair) devices. IntesisHome provides integrations with air conditioners, including Panasonic, Daikin, Fujitsu, Toshiba, LG and more.

Note: IntesisHome products are a separate product line to IntesisBox. This platform does not support IntesisBox devices (which can be controlled locally using the WMP protocol).

## Configuration

To set it up, add the following information to your {% term "`configuration.yaml`" %} file:

```yaml
climate:
  - platform: intesishome
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
```

{% configuration %}
username:
  description: "Your username for [IntesisHome.com](https://accloud.intesis.com) / [Airconwithme](https://airconwithme.com)"
  required: true
  type: string
password:
  description: Your password for IntesisHome
  required: true
  type: string
device:
  description: "`IntesisHome`, `airconwithme` or `anywair`."
  required: false
  default: IntesisHome
  type: string
{% endconfiguration %}

This integration opens a TCP connection with the IntesisHome API to receive temperature and status updates, and to issue commands.
By default, the integration will be named using the friendly device name from the IntesisHome website or application.
If internet connectivity is lost, the device will be marked as unavailable after 5 minutes.

### Supported actions

Available actions:

- `climate.set_temperature`
- `climate.set_fan_mode`
- `climate.set_operation_mode`
- `climate.set_swing_mode`
- `climate.turn_on`
- `climate.turn_off`
