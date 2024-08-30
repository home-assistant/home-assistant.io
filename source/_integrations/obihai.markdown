---
title: Obihai
description: Instructions on how to integrate your Obihai device into Home Assistant.
ha_iot_class: Local Polling
ha_category:
  - Sensor
ha_config_flow: true
ha_release: 0.99
ha_codeowners:
  - '@dshokouhi'
  - '@ejpenney'
ha_domain: obihai
ha_platforms:
  - button
  - sensor
ha_integration_type: integration
ha_dhcp: true
---

The `obihai` integration allows you to view the call status for your [Obihai devices](https://www.obitalk.com/info/products#home_section).

{% include integrations/config_flow.md %}

{% configuration_basic %}
host:
  description: IP Address of Obihai device
username:
  description: Username for the Obihai device.
password:
  description: Password for the Obihai device.
{% endconfiguration_basic %}

The following is a list of expected sensors and their expected states when using the `user` account:

- Sensor if the device requires a reboot (`True` or `False`)
- Sensor for each configured service (`0` for no calls, `1` for a call and `2` for call waiting/3way calling)
- Sensor for the last reboot date
- Sensor for call direction (`No Active Calls`, `Inbound Call` or `Outbound Call`) 

In addition to the above list the `admin` account can expect to see the following sensors:

- Obihai service status (`Normal`, `Down` or other states from Obihais network)
- Sensors for each phone port in use (`On Hook`, `Off Hook` and `Ringing`)
- Sensors for last caller name and number (this is also the current incoming call, will also show `--` if no data provided)

You will also see a reboot button for each configured Obihai, this button will restart the Obihai when pressed.
