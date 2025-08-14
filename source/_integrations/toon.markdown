---
title: Toon
description: Instructions on how to integrate Eneco Toon/Engie Electrabel Boxx/Viesgo within Home Assistant.
ha_category:
  - Binary sensor
  - Climate
  - Energy
  - Sensor
  - Switch
ha_release: 0.56
ha_iot_class: Cloud Push
ha_config_flow: true
ha_domain: toon
ha_dhcp: true
ha_platforms:
  - binary_sensor
  - climate
  - sensor
  - switch
ha_integration_type: integration
---

The Toon integration platform can be used to control your Quby Toon thermostat,
which is currently being sold as:

- Eneco Toon
- Engie Electrabel Boxx
- Viesgo Toon

This integration adds a climate device for your Toon thermostat, some switches
allowing you to control the program and holiday mode of the thermostats as well.

Sensors for energy, power and gas consumption, sensors for solar production and
several binary sensors for things like boiler burner on/off, hot tap water and
boiler health status.

For the Toon integration to work, you'll need an active Toon subscription
and a Toon API developer account.

There is currently support for the following device types within Home Assistant:

- [Binary sensor](#binary-sensor)
- [Climate](#climate)
- [Sensor](#sensor)
- [Switch](#switch)

## Setting up a developer account

In order to be able to use this integration, you'll need to sign up for a free Toon API developer account.

1. Visit the [Toon API developers website](https://developer.toon.eu/), and [sign in](https://developer.toon.eu/user/login). [Create an account](https://developer.toon.eu/user/register) if you don’t have one already.
2. Open the "[My Apps](https://developer.toon.eu/user/me/apps)" page and click on "Add a new App" button on the top right.
3. The "Add App" page shows a form with two fields:
   - **App Name**: Can be anything you like, for example, "Home Assistant" will just do.
   - **Callback URL**: `https://my.home-assistant.io/redirect/oauth`.
4. Click on "Create App" to complete the creation process.
5. Open the "[My Apps](https://developer.toon.eu/user/me/apps)" page again and click on the app that you've just created.
6. You need the codes now shown: "Consumer Key" and "Consumer Secret".
7. Add the following Toon configuration to your {% term "`configuration.yaml`" %} and restart Home Assistant.

```yaml
# Example configuration.yaml entry
toon:
  client_id: YOUR_CONSUMER_KEY
  client_secret: YOUR_CONSUMER_SECRET
```

{% configuration %}
client_id:
  description: Toon API Consumer Key.
  required: true
  type: string
client_secret:
  description: Toon API Consumer Secret.
  required: true
  type: string
{% endconfiguration %}

{% include integrations/config_flow.md %}

{% details "I have manually disabled My Home Assistant" %}

If you don't have [My Home Assistant](/integrations/my) on your installation,
you can use `<HOME_ASSISTANT_URL>/auth/external/callback` as the Callback URL
instead.

The `<HOME_ASSISTANT_URL>` must be the same as used during the configuration/
authentication process.

Internal examples: `http://192.168.0.2:8123/auth/external/callback`, `http://homeassistant.local:8123/auth/external/callback`." 

{% enddetails %}

## Binary sensor

The Toon integration provides the following binary sensors:

- Boiler Burner (only with OpenTherm)
- Boiler Heating* (only with OpenTherm)
- Boiler Module Connection*
- Boiler Preheating* (only with OpenTherm)
- Boiler Status (only with OpenTherm)
- Hot Tap Water (only with OpenTherm)
- OpenTherm Connection* (only with OpenTherm)
- Thermostat Program Override*

Binary sensors marked with `*` are disabled by default, but can be enabled
from the UI, by clicking on the device and enabling the specific entity.

## Climate

The Toon climate platform allows you to interact with your Toon thermostat.

Home Assistant support the four Toon presets: `Comfort`, `Home`, `Away` and `Sleep`.
It also supports setting the temperature manually.

Toon has no option to disable a preset. It will automatically unset
when values of the thermostat are changed.

## Sensor

The Toon integration provides the following sensors:

- Average Daily Energy Usage*
- Average Daily Gas Usage*
- Average Daily Water Usage*
- Average Gas Usage
- Average Power Usage*
- Average Water Usage*
- Average Solar Power Production to Grid* (only with solar module)
- Boiler Modulation Level* (only with OpenTherm)
- Current Gas Usage
- Current Power Usage
- Current Power Usage Covered By Solar (only with solar module)
- Current Solar Power Production (only with solar module)
- Current Water Usage*
- Electricity Meter Feed IN Tariff 1*
- Electricity Meter Feed IN Tariff 2*
- Electricity Meter Feed OUT Tariff 1*
- Electricity Meter Feed OUT Tariff 2*
- Energy Cost Today
- Energy Produced To Grid Today* (only with solar module)
- Energy Usage From Grid Today* (only with solar module)
- Energy Usage Today
- Gas Cost Today
- Gas Meter
- Gas Usage Today
- Humidity*
- Max Solar Power Production Today (only with solar module)
- Solar Energy Produced Today (only with solar module)
- Solar Power Production to Grid (only with solar module)
- Temperature
- Water Meter*
- Water Usage Today*
- Water Cost Today*

Sensors marked with `*` are disabled by default, but can be enabled
from the UI, by clicking on the device and enabling the specific entity.

## Switch

The Toon integration provides the following switches:

- Thermostat Holiday Mode
- Thermostat Program
