---
layout: page
title: "HP ILO"
description: "How to integrate HP ILO (Integrated Lights-Out) sensors within Home Assistant."
date: 2016-08-15 19:00
sidebar: true
comments: false
sharing: true
footer: true
logo: hewlett_packard_enterprise.png
ha_category: System Monitor
ha_release: 0.27
ha_iot_class: "Local Polling"
---

The `hp_ilo` platform allows you to do an API call to the HP ILO (Integrated Lights-Out) sensor of your server, and use this data in (template) sensors.

The component will output the ILO information in the sensor attributes so they can be accessed like that. 

If the ILO only returns a single value (e.g. a temperature or state), it will be put in the state field.

Some more details about what can be retrieved from these sensors is available in the [python-hpilo documentation](http://pythonhosted.org/python-hpilo/).

<p class='img'>
  <img src='{{site_root}}/images/screenshots/hp_ilo.png' />
</p>


To use this component in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: hp_ilo
    host: IP_ADDRESS or HOSTNAME
    username: USERNAME
    password: PASSWORD
    monitored_variables:
      - server_name
      - server_fqdn
      - server_host_data
      - server_oa_info
      - server_power_status
      - server_power_readings
      - server_power_on_time
      - server_asset_tag
      - server_uid_status
      - server_health
      - network_settings
```

Configuration variables:

- **host** (*Required*): The hostname or IP address on which the ILO can be reached.
- **port** (*Optional*): The port on which the ILO can be reached, defaults to port `443`.
- **username** (*Required*): The username used to connect to the ILO.
- **password** (*Required*): The password used to connect to the ILO.
- **monitored_variables** array (*Optional*): Information to be collected from the ILO, defaults to `server_name`.
  - **server_name**: Get the name of the server this iLO is managing.
  - **server_fqdn**: Get the fqdn of the server this iLO is managing.
  - **server_host_data**: Get SMBIOS records that describe the host.
  - **server_oa_info**: Get information about the Onboard Administrator of the enclosing chassis.
  - **server_power_status**: Whether the server is powered on or not.
  - **server_power_readings**: Get current, min, max and average power readings.
  - **server_power_on_time**: How many minutes ago has the server been powered on.
  - **server_asset_tag**: Gets the server asset tag.
  - **server_uid_status**: Get the status of the UID light.
  - **server_health**: Get server health information.
  - **network_settings**: Get the iLO network settings.
