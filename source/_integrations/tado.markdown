---
title: Tado
description: Instructions on how to integrate Tado devices with Home Assistant.
ha_category:
  - Binary Sensor
  - Hub
  - Climate
  - Water Heater
  - Presence Detection
  - Sensor
  - Weather
ha_release: 0.41
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@michaelarnauts'
  - '@bdraco'
  - '@noltari'
ha_domain: tado
ha_config_flow: true
ha_homekit: true
ha_platforms:
  - binary_sensor
  - climate
  - device_tracker
  - sensor
  - water_heater
---

The Tado integration platform is used as an interface to the [my.tado.com](https://my.tado.com/) website.

There is currently support for the following device types within Home Assistant:

- Binary Sensor - for some additional information of the zones.
- Climate - for every Tado zone.
- Water Heater - for water heater zones.
- [Presence Detection](#presence-detection)
- Sensor - for some additional information of the zones.
- Weather - for information about the current weather at the location of your Tado home.

{% include integrations/config_flow.md %}

The Tado thermostats are internet connected thermostats. There exists an unofficial API at [my.tado.com](https://my.tado.com/), which is used by their website and now by this component.

It currently supports presenting the current temperature, the setting temperature and the current operation mode. The operation mode can be set to manual, auto and off. If no user is at home anymore, all Tado zones show the away-state (Only with Tado assist mode). Manually switching between home-mode and away-mode is also supported. Any Tado climate card can be switched between these presence modes, this changes the setting for the entire home.

## Presence Detection

The `tado` device tracker is using the [Tado Smart Thermostat](https://www.tado.com/) and its support for person presence detection based on smartphone location by geofencing.

This tracker uses the Tado API to determine if a mobile device is at home. It tracks all devices in your home that Tado knows about.

To use the Tado platform in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry for Tado
device_tracker:
  - platform: tado
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
    home_id: YOUR_HOME_ID
```

{% configuration %}
username:
  description: The username for your Tado account.
  required: true
  type: string
password:
  description: The password for your Tado account.
  required: true
  type: string
home_id:
  description: The id of your home of which you want to track devices. If provided, the Tado device tracker will track *all* devices known to Tado associated with this home. See below how to find it.
  required: false
  type: integer
{% endconfiguration %}

After configuration, your device has to be at home at least once before showing up as *home* or *away*.
Polling Tado API for presence information will happen at most once every 30 seconds.

See the [device tracker integration page](/integrations/device_tracker/) for instructions how to configure the people to be tracked. Beware that the Tado (v2) API does not provide GPS location of devices, only a bearing, therefore Home Assistant only uses `home`/`not-home` status.

### Finding your `home_id`

Find your `home_id` by browsing to `https://my.tado.com/api/v2/me?username=YOUR_USERNAME&password=YOUR_PASSWORD`. There you'll see something like the following:

```json
{
  "name": "Mark",
  "email": "your@email.tld",
  "username": "your@email.tld",
  "homes": [
    {
      "id": 12345,
      "name": "Home Sweet Home"
    }
  ],
  "locale": "en_US",
  "mobileDevices": []
}
```

In this example `12345` is the `home_id` you'll need to configure.

### Finding your `home_id` alternative

If the above method returns an unauthorized error. The `home_id` can also be found using Chrome developer tools. Whilst logged into https://my.tado.com/webapp, take the following steps: 

- Select the "Network"' tab
- Filter for "home"
- Under "Name", select "users"
- Click on the "Response" tab

The `home_id` appears in the response for users as `"id":12345`

In this example `12345` is the `home_id` you'll need to configure.

## Services

### Service `tado.set_climate_timer`

You can use the service `tado.set_climate_timer` to set your Tado climate device, for example a radiator valve, to switch on for a set time period. 

| Service data attribute | Optional | Description                                                            |
| ---------------------- | -------- | ---------------------------------------------------------------------- |
| `entity_id`            | yes      | String, Name of entity e.g., `climate.heating`                         |
| `time_period`          | no       | Time Period, Period of time the boost should last for e.g., `01:30:00` |
| `temperature`          | no       | String, The required target temperature e.g., `20.5`                   |

### Service `tado.set_water_heater_timer`

You can use the service `tado.set_water_heater_timer` to set your water heater to switch on for a set time period. 

| Service data attribute | Optional | Description                                                            |
| ---------------------- | -------- | ---------------------------------------------------------------------- |
| `entity_id`            | yes      | String, Name of entity e.g., `climate.heating`                         |
| `time_period`          | no       | Time Period, Period of time the boost should last for e.g., `01:30:00` |
| `temperature`          | yes      | String, The required target temperature e.g., `20.5`                   |

### Service `tado.set_climate_temperature_offset`

You can use the service `tado.set_climate_temperature_offset` to set the temprature offset for Tado climate devices 

| Service data attribute | Optional | Description                                                            |
| ---------------------- | -------- | ---------------------------------------------------------------------- |
| `entity_id`            | yes      | String, Name of entity e.g., `climate.heating`                         |
| `offset`               | no       | Float, Offset you would like to set                                    |


Examples:

```yaml
# Example script to set a timer for the water heater with no temperature specified
script:
  boost_heating:
    sequence:
      - service: tado.set_climate_timer
        target:
          entity_id: climate.heating
        data:
          time_period: "01:30:00"
          temperature: 25
      - service: tado.set_water_heater_timer
        target:
          entity_id: water_heater.hot_water
        data:
          time_period: "01:30:00"
```

{% raw %}
```yaml
# Example automation to set temprature offset based on another thermostat value
automation:
    # Trigger if the state of either thermostat changes
    trigger:
    - platform: state
      entity_id:
        - sensor.temp_sensor_room
        - sensor.tado_temperature
    
    # Check if the room temp is more than 0.5 higher than the tado thermostat reading
    condition:
    - condition: template
      value_template: >
        {% set tado_temp = states('sensor.tado_temperature')|float %}
        {% set room_temp = states('sensor.temp_sensor_room')|float %}
        {{ (tado_temp - room_temp) > 0.5 }}
    
    # Work out what the new offset should be (tado temp less the room temp but add the current offset value) and turn that to a negative value for setting as the new offset
    action:
    - service: tado.set_climate_temperature_offset
      target:
        entity_id: climate.tado
      data:
        offset: >
          {% set tado_temp = states('sensor.tado_temperature')|float %}
          {% set room_temp = states('sensor.temp_sensor_room')|float %}
          {% set current_offset = state_attr('climate.tado', 'offset_celsius') %}
          {{ (-(tado_temp - room_temp) + current_offset)|round }}
```
{% endraw %}
