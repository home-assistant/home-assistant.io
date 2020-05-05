---
title: Plugwise Anna
description: Plugwise Climate integration.
ha_category: Climate
ha_iot_class: Local Polling
ha_release: 0.98
ha_codeowners:
  - '@laetificat'
  - '@CoMPaTech'
  - '@bouwew'
ha_domain: plugwise
---

This enables [Plugwise](https://plugwise.com) [Anna](https://www.plugwise.com/en_US/products/anna) thermostats to be integrated. This integration talks locally to your **Smile** interface, and you will need its password and IP address.

The password can be found on the bottom of your Smile, it should consist of 6 characters. To find your IP address use the Plugwise App: 

 - Open the Plugwise App and choose the 'Settings'-icon (&#9776;) and choose 'HTML-interface'. 
 - Go to the (lower) 'Settings'-icon (&#9776;) and choose 'Preferences'. 
 - Choose 'System' then 'Networking' and your IP address will be shown.

## Configuration

You have to add the following to your `configuration.yaml` file:

```yaml
# Minimal configuration.yaml entry
climate:
  - platform: plugwise
    password: YOUR_SHORT_IP 
    host: YOUR_SMILE_LOCAL_IP
```
**Please note**: for a legacy Anna (firmware 1.8.x) an additional line is required, see below, this line is not needed for a more recent Anna (firmware 3.1.x).

{% configuration %}
password:
  description: Your Smile ID (located on the bottom of the Smile, not the Anna).
  required: true
  type: string
host:
  description: The IP address of your Smile. 
  required: true
  type: string
name:
  description: The name of your thermostat, i.e., "Anna".
  required: false
  type: string
  default: "Plugwise Thermostat"
username:
  description: Should you ever need to change this, you can.
  required: false
  type: string
  default: smile
port:
  description: When having a custom setup, you can change the port number.
  required: false
  type: integer
  default: 80
legacy_anna:
  description: Indicate that the Anna is a legacy unit
  required: false
  type: boolean
  default: false
min_temp:
  description: If you want to adjust the lower boundary, the integration will not allow temperatures below the set value.
  required: false
  type: integer
  default: 4
max_temp:
  description: If you want to adjust the upper boundary, the integration will not allow temperatures above the set value.
  required: false
  type: integer
  default: 30
{% endconfiguration %}

### Full configuration example

```yaml
climate:
  - platform: plugwise
    name: YOUR_THERMOSTAT_NAME
    password: YOUR_SHORT_ID
    host: YOUR_SMILE_LOCAL_IP
    port: YOUR_SMILE_PORT_NUMBER
    legacy_anna: true
    min_temp: YOUR_MINIMAL_TARGET_TEMPERATURE
    max_temp: YOUR_MAXIMAL_TARGET_TEMPERATURE
```

### Service

#### Set HVAC mode (schedule)

Service: `climate.set_hvac_mode`

Available options include `auto` or `off`. The meaning of `auto` is that a schedule is active and the thermostat will change presets accordingly. The meaning of `off` is that there is no schedule active, i.e., the active preset or manually set temperature is to be used to control the climate of your house or rooms.
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

#### Set temperature

Service: `climate.set_temperature`

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

#### Set preset mode

Service: `climate.set_preset_mode`

Available options include: `home`, `vacation`, `no_frost`, `asleep` & `away`.

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

```txt
[homeassistant.loader] Loaded plugwise from custom_components.plugwise
[homeassistant.loader] You are using a custom integration for plugwise which has not been tested by Home Assistant. This component might cause stability problems, be sure to disable it if you do experience issues with Home Assistant.
[custom_components.plugwise.climate] Plugwise: custom component loading (Anna PlugWise climate)
[homeassistant.components.climate] Setting up climate.plugwise
[custom_components.plugwise.climate] Init called
[custom_components.plugwise.climate] Initializing API
[custom_components.plugwise.climate] platform ready
[custom_components.plugwise.climate] Update called
```

Example of something going wrong (IP address not set) excerpt is shown below. Correct your configuration and try again. If the errors persist, please share a larger excerpt of your logfile.

```txt
1970-01-01 00:00:01 ERROR (MainThread) [homeassistant.components.climate] Error while setting up platform plugwise
  File "/home/homeassistant/.homeassistant/custom_components/plugwise/climate.py", line 104, in setup_platform
  File "/home/homeassistant/.homeassistant/custom_components/plugwise/climate.py", line 130, in __init__
    self._api = Haanna(self._username, self._password, self._host, self._port)
```
