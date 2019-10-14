---
title: "Gardena"
description: "Instructions on how to setup Gardena devices within Home Assistant."
logo: gardena.jpg
ha_category:
  - Hub
  - Vacuum
  - Sensor
  - Switch
ha_release: XXX
ha_qa_scale: XXX
ha_config_flow: false
---

[Gardena API](https://developer.1689.cloud/apis).
[py-smart-gardena wrapper for gardena API](https://github.com/grm/py-smart-gardena).

There is currently support for the following device types within Home Assistant:

- [Mower](#mower)
- [Sensor](#sensor)
- [Switch](#switch) (Power plugs, smart water control, Smart irrigation control)

Entities will automatically be added based on what is declared in the ANdroid/IOS 
application.

Mowers are added as a vacuum.

## Configuration

You first need to get a client id for your personal installation of gardena. 
To do so, create an account here : https://developer.1689.cloud/apis

Then you need to create an application and get the client_id as explained here : 
https://developer.1689.cloud/docs/getting-started

Once this has been done, you can configure the component :
```yaml
# Example configuration.yaml entry
gardena:
  email: your_email@provider.com
  password: your_secret_gardena_password
  client_id: your_client_id_from_the_gardena_site
  location_id: your_location_id
  default_mower_duration_in_minutes: 300
  default_smart_irrigation_control_duration_in_minutes: 60
  default_smart_watering_duration_in_minutes: 60
```

NB : Your email, password and your client_id are **PRIVATE**. You should not store them 
on a public git. You should store them in your unversionned secret file.

NB2 :
* If you don't have a mower, the key 'default_mower_duration_in_minutes' in the 
config is not necessary. Defaults to 60 Minutes.
* If you don't have a smart irrigation control, the key 
'default_smart_irrigation_control_duration_in_minutes' in the 
config is not necessary. Defaults to 60 Minutes.
* If you don't have a smart water control, the key 
'default_smart_watering_duration_in_minutes' in the 
config is not necessary. Defaults to 60 Minutes.

## Debugging integration

If you have problems with gardena smart system or the integration you can add debug 
prints to the log.

```yaml
logger:
  default: info
  logs:
    pydeconz: debug
    homeassistant.components.gardena: debug
    homeassistant.components.mower : debug
    homeassistant.components.sensor : debug
    homeassistant.components.switch : debug
    gardena.smart_system: debug

```