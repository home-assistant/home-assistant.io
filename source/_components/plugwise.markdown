---
title: "Plugwise"
description: "Plugwise Climate integration."
logo: plugwise.png
ha_category: Climate
ha_iot_class: Local Polling
ha_release: 0.97
---

This enables [Plugwise](https://plugwise.com) [Anna](https://www.plugwise.com/en_US/products/anna) thermostats to be integrated. This integration talks locally to your **Smile** interface, you will need it's secret key and IP address.

To find your IP address using the Plugwise App. When connected choose the 'Settings'-icon and go to 'HTML-interface'. Go to the (now little lower) 'Settings'-icon and choose 'Preferences'. Under 'System' then 'Networking' you will find your IP address.

### Configuration

```yaml
# Minimal configuration.yaml entry
climate:
  - platform: plugwise
    password: your_short_id # required, the ID on the smile (some string of 6 characters)
    host: local_ip_address  # required, the IP-address of your smile
```

```yaml
# Example configuration.yaml entry to show only devices at your vacation and primary homes
climate:
  - platform: anna
    name: Anna Thermostat   # optional, only if you want to use a different name
    password: your_short_id # required, the ID on the smile (some string of 6 characters)
    host: local_ip_address  # required, the IP-address of your smile
    username: smile         # optional, default username is smile
    port: 80 		    # optional, only needed when other than 80
    min_temp: 4 	    # optional, when you want to change the minimal temperature
    max_temp: 30 	    # optional, when you want to change the maximum temperature
```

{% configuration %}
password:
  description: Your Smile ID (located on the bottom of the Smile, not the Anna)
  required: true
  type: string
host:
  description: The IP address of your Smile. 
  required: true
  type: string
name:
  description: The name of your thermostat, i.e. "Anna"
  required: false
  type: string
username:
  description: Should you ever need to change this, you can
  required: false
  type: string
port:
  description: When having a custom setup, you can change the port number
  required: false
  type: integer
min_temp:
  description: If you want to adjust the lower boundary, the integration will no allow temperatures below the set value.
  required: false
  type: integer
max_temp:
  description: If you want to adjust the upper boundary, the integration will no allow temperatures above the set value.
  required: false
  type: integer
{% endconfiguration %}

### Service `climate.set_hvac_mode`

Available options include `auto` or `off`. Meaning `auto` is a schedule is active and `off` there is no schedule active (active preset or manually set temperature will continue).
The last schedule that was active is determined the same way long-tapping the top of Anna works.

Example:

```yaml
# Example script change the temperature
script:
  anna_reactive_last_schedule:
    sequence:
      - service: climate.set_hvac_mode
        data:
          hvac_mode: auto
```

Changing the active schedule can be done, though not easily:

- Deactivate the schedule (press the power button on the UI-card).
- Look up the available schemas in the `states` view (attribute `available_schemas`).
- Change the attribute `active_schema` to the actual name of your schema as available from the above attribute or your Plugwise App.
- Activate the schedule (press the calendar button on the UI-card).

### Service `climate.set_temperature`

Example:

```yaml
# Example script change the temperature
script:
  anna_set_predefined_temperature:
    sequence:
      - service: climate.set_temperature
        data:
          temperature: 19.5
```

### Service `climate.set_preset_mode`

Available options include: `home`, `vacation`, `no_frost`, `asleep` & `away`

Example:

```yaml
# Example script changing the active (or currently set by schedule) preset
script:
  anna_activate_preset_asleep:
    sequence:
      - service: climate.set_preset_mode
        data:
          preset_mode: asleep
```


### Troubleshooting

Example of a working configuration excerpt (with debugging enabled):

```source
[homeassistant.loader] Loaded plugwise from custom_components.plugwise
[homeassistant.loader] You are using a custom integration for plugwise which has not been tested by Home Assistant. This component might cause stability problems, be sure to disable it if you do experience issues with Home Assistant.
[custom_components.plugwise.climate] Plugwise: custom component loading (Anna PlugWise climate)
[homeassistant.components.climate] Setting up climate.plugwise
[custom_components.plugwise.climate] Init called
[custom_components.plugwise.climate] Initializing API
[custom_components.plugwise.climate] platform ready
[custom_components.plugwise.climate] Update called
```

Example of something going wrong (IP address not set) excerpt is shown below. Correct your configuration and try again. If the errors persist, please share a larger excerpt of your logfile

```source
1970-01-01 00:00:01 ERROR (MainThread) [homeassistant.components.climate] Error while setting up platform plugwise
  File "/home/homeassistant/.homeassistant/custom_components/plugwise/climate.py", line 104, in setup_platform
  File "/home/homeassistant/.homeassistant/custom_components/plugwise/climate.py", line 130, in __init__
    self._api = Haanna(self._username, self._password, self._host, self._port)
```


