---
title: Landis+Gyr Heat Meter
description: Instructions on how to integrate your Landis+Gyr Heat Meter device into Home Assistant.
ha_category:
  - Energy
  - Sensor
ha_iot_class: Local Polling
ha_config_flow: true
ha_release: 2022.9
ha_domain: landisgyr_heat_meter
ha_codeowners:
  - '@vpathuis'
ha_platforms:
  - sensor
ha_integration_type: integration
---

The Landis+Gyr Heat Meter integration for Home Assistant allows you to read the meter values from Ultraheat devices by Landis & Gyr. These devices are commonly used for district heating. The integration has been tested with the Landis & Gyr Ultraheat 50 (UH50), type LUGCUH50. Other models are likely to work as well.

The device is read through the optical interface. An (USB) IR reader is needed and connected to Home Assistant.

![USB IR reader](/images/integrations/landisgyr_heat_meter/usb_ir_reader.png)

{% include integrations/config_flow.md %}

## Sensors

The integration will create the following sensors:

- Heat usage (MWh)
- Volume usage (m3)

To be compatible with the Home Assistant energy units of measurement, heat usage is converted to MWh, from usage in GJ, which is supplied by the device, using a conversion factor: 1 GJ = 0.277778 MWh.

Further data that is read from the device is added as diagnostic entities:

- Heat usage measured in GJ, as is read from the device before conversion
- Ownership number
- Volume previous year (m3)
- Heat previous year (MWh)
- Heat previous year (GJ)
- Error number
- Device number
- Measurement period minutes
- Power max (kW)
- Power max previous year (kW)
- Flow rate max (m3ph)
- Flow rate max previous year (m3ph)
- Flow temperature max (°C)
- Return temperature max (°C)
- Flow temperature max previous year (°C)
- Return temperature max previous year (°C)
- Operating hours
- Fault hours
- Fault hours previous year
- Yearly set day
- Monthly set day
- Meter date time
- Measuring range (m3ph)
- Settings and firmware
- Flow hours

## Energy dashboard

Either heat usage or volume usage can be used as "Gas" on the energy dashboard. If you want to supply a price per MWh, make sure to apply the conversion factor first.

## Polling the device

Polling is by default done only once per day (and once right after adding the integration). Every time the Heat Meter values are read, battery time of the device will (supposedly) go down by about 30 minutes.

### Polling manually (optional)

For detailed control on when the device is polled, disable the default polling for this integration and create an automation that will update one of the entities (the other entities will be updated as well)

If you're comfortable with YAML, this code could be used:

```yaml
alias: "Heat Meter manual update"
triggers:
  - trigger: time
    at: "23:30:00"
actions:
  - action: homeassistant.update_entity
    target:
      entity_id: sensor.heat_meter_heat_usage_gj
```

For more detailed steps on how to define a custom polling interval, follow the procedure below.

#### Defining a custom polling interval

{% include common-tasks/define_custom_polling.md %}
