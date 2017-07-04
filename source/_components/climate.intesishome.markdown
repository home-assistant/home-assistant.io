---
layout: page
title: "IntesisHome AC Controller"
description: "Instructions how to setup IntesisHome integration with Home Assistant"
date: 2017-07-03 21:38
sidebar: true
comments: false
sharing: true
footer: true
logo: intesishome.png
ha_category: Climate
ha_release: 0.49
ha_iot_class: "Cloud Push"
---

The `IntesisHome` climate platform let you control [IntesisHome](https://www.intesishome.com) devices. IntesisHome provide integrations with air conditioners including including Panasonic, Daikin, Fujitsu, Toshiba, LG and more.

To set it up, add the following information to your `configuration.yaml` file:

```yaml
climate:
  - platform: intesishome
    username: 'YOUR_USERNAME'
    password: 'YOUR_PASSWORD'
```

- **username** (*Required*): Username of an account authorised to control your IntesisHome device on [IntesisHome.com](https://user.intesishome.com).
- **password** (*Required*): Password for the IntesisHome account.

This component opens a TCP connection with the IntesisHome API to receive temperature and status updates, and to issue commands.

By default the component will be named using the friendly device name from the IntesisHome website or app.

### {% linkable_title Supported services %}
Available services: `climate.set_temperature`, `climate.set_fan_mode`, `climate.set_operation_mode`, `climate.set_swing_mode`

### {% linkable_title Example temperature sensor %}
To simplify automations, it can be desirable to create a template sensor to get the current temperature from the device state.

```yaml
- platform: template
  sensors:
    home_temperature:
      friendly_name: 'Home temperature'
      entity_id: climate.home
      unit_of_measurement: '{{ states.climate.home.attributes.unit_of_measurement }}'
      value_template: '{{ states.climate.home.attributes.current_temperature }}'
```

