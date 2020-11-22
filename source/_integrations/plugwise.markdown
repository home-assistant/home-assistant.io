---
title: Plugwise
description: Plugwise Smile platform integration.
ha_category:
  - Climate
  - Binary Sensor
  - Sensor
  - Switch
ha_iot_class: Local Polling
ha_release: 0.98
ha_codeowners:
  - '@CoMPaTech'
  - '@bouwew'
  - '@brefra'
ha_config_flow: true
ha_domain: plugwise
---

This enables [Plugwise](https://www.plugwise.com) components with a Smile gateway or Stick and the various connected devices to be integrated. For the Stick you will need to know which port it is connected to, for the networked Smile you will need its IP address and Smile ID.

This integration supports [Anna](https://www.plugwise.com/en_US/products/anna), [Adam (zonecontrol)](https://www.plugwise.com/en_US/zonecontrol), [P1](https://www.plugwise.com/en_US/products/smile-p1) Smile products and other Plugwise products through the [Stretch](https://www.plugwise.com/nl_NL/het-systeem) product or using the USB-stick. See below list for more details.

Platforms available - depending on your Smile and setup include:

 - `climate` (for the Anna and Lisa products, or a single Tom)
 - `sensor` (for all relevant products including the Smile P1)
 - `binary_sensor` (for domestic hot water and secondary heater)
 - `switch` (for Plugs connected to Adam or Stealths and Circles either connected to a Stretch or through the USB-stick)

For Smile connectivity, the password can be found on the bottom of your Smile or Stretch, it should consist of 6 characters. To find your IP address use the Plugwise App: 

 - Open the Plugwise App and choose the 'Settings'-icon (&#9776;) and choose 'HTML-interface'. 
 - Go to the (lower) 'Settings'-icon (&#9776;) and choose 'Preferences'. 
 - Choose 'System' then 'Networking' and your IP address will be shown.

## Entities

This integration will show all Plugwise entities present in your Plugwise configuration. For Smiles, you will see a 'Smile' entity added representing your central Plugwise gateway (i.e., Anna, Smile P1 or Adam).

For example, if you have an Adam setup with a Lisa named 'Living' and a Tom named 'Bathroom', these will show up as individual entities. When there are more (than one) Plugwise thermostats present, an "Auxiliary Device" will be added, representing the active heating/cooling device present in your climate system. If you have Plugs (as in, pluggable switches connecting to an Adam) those will be discovered as switches. Various other measures of your setup will be available as sensors or binary sensors.

Centralized measurements such as 'power' for a P1, 'outdoor_temperature' on Anna or Smile will be assigned to your gateway entity. Auxiliary Heater(/Cooler) measurements such as 'boiler_temperature' will be assigned to the Auxiliary entity.

## Configuration

From the Home Assistant front page, go to **Configuration** and then select **Integrations** from the list. If you have a Smile it most probably is visible as a discovered device for you to click to configure. Otherwise use the plus button in the bottom right to add a new integration, just search for **Plugwise** and choose Networked or USB approprately on the first question.

### Smile (Networked component)

The Plugwise Smile(s) present in your network will be automatically detected via Zeroconf discovery and will be shown on the Integrations-page. To set up an integration, click the "CONFIGURATION" button on the discovered integration and you will be presented with a dialog requesting your Smile password. After you click submit, you will have the opportunity to select the area(s) where individual Smile appliances are located. The username `smile` is shown as a default, when configuring your Stretch change this to `stretch` accordingly.

Repeat the above procedure for each Smile gateway (i.e., if you have an Adam setup and a P1 DSMR you'll have to add two integrations).

After adding the Plugwise integration(s), the default Smile-data refresh-interval can be changed by pressing the "OPTIONS" button: change the number via the up- or down-button and press "SUBMIT".

<div class='note warning'>
When you have an Anna and an Adam, make sure to only configure the Adam integration. You can press the "IGNORE" button on the Anna integration to remove this integration. In case you need to rediscover the Adam integration, make sure to click the "STOP IGNORING" button on the Plugwise integration first, available via "show ignored integrations".
</div>

### Stick (USB)

In the setup wizard at the 'USB Device Path', it will list all detected serial ports available to Home Assistant. You need to pick the serial port of the connected Plugwise USB-Stick. If required, the selection list contains the possibility to manually enter the device path.

When you press `Submit` and the integration will try to initialize the USB-Stick at the supplied device path. If the connection to the USB-stick is initialized successfully, it will automatically do a discovery of all linked Plugwise nodes stored at the Circle+ device. An error will be displayed in the wizard if Home Assistant can't access the USB-stick or the connection fails.

The integration will automatically save the connection by the serial path (e.g., `/dev/serial/by-id/*`) to keep the connection consistent between system restarts.

### Services

#### Update Smile data

Forced update of data from your Smile can be triggered by calling the generic `homeassistant.update_entity` service with your Smile entity as the target.

```yaml
# Example script change the temperature
script:
  force_adam_update:
    sequence:
      - service: homeassistant.update_entity
        data:
          entity_id: climate.anna
```

#### Set HVAC mode (schedule)

Service: `climate.set_hvac_mode`

Available options include `auto` or `off`. The meaning of `auto` is that a schedule is active and the thermostat will change presets accordingly. The meaning of `off` is that there is no schedule active, i.e., the active preset or manually set temperature is to be used to control the climate of your house or rooms.
The last schedule that was active is determined the same way long-tapping the top of Anna works.

Example:

```yaml
# Example script change the temperature
script:
  lisa_reactive_last_schedule:
    sequence:
      - service: climate.set_hvac_mode
        data:
          entity_id: climate.lisa_bios
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
          entity_id: climate.anna
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

#### Manually add a device using the USB stick

Service: `plugwise.device_add`

Mandatory option `mac` holding the full 16 character MAC address of the device.

#### Manually remove a device using the USB stick

Service: `plugwise.device_remove`

Mandatory option `mac` holding the full 16 character MAC address of the device.

### Supported devices

The current implementation of the [Python module](https://pypi.org/projects/plugwise) from [`python-plugwise`](https://github.com/plugwise/python/plugwise) includes:

Adam (zone_control):

 - v3.0
 - v2.3

 - Devices supported are Floor, Lisa, Tom, Koen and Plug - note a Koen always comes with a Plug (the active part) 

Anna (thermostat):

 - v4.x
 - v3.x
 - v1.x

Smile P1 (DSMR):

 - v4.x
 - v3.x
 - v2.x

Stretch (power switches):

 - v3.x
 - v2.x

USB-stick
