---
title: "Gardena"
description: "Instructions on how to setup Gardena devices within Home Assistant."
logo: gardena.jpg
ha_category:
  - Hub
  - Vacuum
  - Sensor
  - Switch
ha_release: 0.101
ha_qa_scale: Silver
ha_config_flow: false
---

This plugin aims to integrate Gardena smart systems into Home Assistant.
Gardena provides integrations for mowers, power socket, sensors, ...

[Gardena API](https://developer.1689.cloud/apis).
[py-smart-gardena wrapper for gardena API](https://github.com/grm/py-smart-gardena).

There is currently support for the following device types within Home Assistant:

- [Mower](#mower)
- [Sensor](#sensor)
- [Switch](#switch) (Power plugs, smart water control, Smart irrigation control)

Entities will automatically be added based on what is declared in the Android/IOS 
application.

Mowers are added as a vacuum.

For now, the integration supports only one location.

## Configuration

You first need to get a client id for your personal installation of Gardena. 
To do so, create an account here: <https://developer.1689.cloud/apis>

Then you need to create an application and get the client_id as explained here: 
<https://developer.1689.cloud/docs/getting-started>

Once this has been done, you can configure the integration:

```yaml
# Sample configuration.yaml entry
gardena:
  email: your_email@provider.com
  password: your_secret_gardena_password
  client_id: your_client_id_from_the_gardena_site
  location_id: your_location_id
```


{% configuration %}
email:
  description: The email associated with the Gardena account.
  required: true
  type: string
password:
  description: The password associated with the Gardena account.
  required: true
  type: string
client_id:
  description: The client_id provided by gardena when creating the application.
  required: true
  type: string
location_id:
  description: The locations_id where the devices are stored.
  required: true
  type: string
default_mower_duration_in_minutes:
  description: The default duration of mowing when launching the mower manually. 
  required: false
  default: 60
  type: string
default_smart_irrigation_control_duration_in_minutes:
  description: The default duration when starting irrigation manually. 
  required: false
  default: 60
  type: string
default_smart_watering_duration_in_minutes:
  description: The default duration when starting the watering manually. 
  required: false
  default: 60
  type: string  
{% endconfiguration %}

## Full sample configuration

```yaml
# Full configuration.yaml entry
gardena:
  email: your_email@provider.com
  password: your_secret_gardena_password
  client_id: your_client_id_from_the_gardena_site
  location_id: your_location_id
  mower_duration: 300
  smart_irrigation_control_duration: 60
  smart_watering_duration: 60
```

You can adjust, through "mower_duration", 
"smart_irrigation_control_duration", 
"smart_watering_duration" the duration of the different actions
 depending on your specific garden setup. These durations are in minutes.

## Debugging integration

If you have problems with Gardena smart system or the integration you can add debug 
prints to the log.

```yaml
logger:
  default: info
  logs:
    homeassistant.components.gardena: debug
    homeassistant.components.gardena.mower : debug
    homeassistant.components.gardena.sensor : debug
    homeassistant.components.gardena.switch : debug
    gardena.smart_system: debug
```
