---
title: Easee Charging Station
description: Instructions on setting up Easee charging stations with Home Assistant.
ha_category:
  - Sensor
ha_iot_class: Cloud Polling
ha_release: 0.x
ha_config_flow: true
ha_codeowners:
  - '@fondberg'
ha_domain: easee
---

The easee integrattion allows you to monitor your Easee charging stations (wallbox). It polls information from the EaseeCloud API (see https://api.easee.cloud/index.html).

This component provides the following platforms:

- Sensors: current set by the user, target energy set by the user, charging power, charged energy of the current session and total energy charged.

## Configuration

To set up this integration, click Configuration in the sidebar and then click Integrations. Click the + icon in the lower right and find easee. Click configure and you will be presented with the intergration dialog where you enter your easee.cloud login username and password.

Alternatively you can add at least the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
easee:
```


{% configuration %}
easee:
  description: configuration
  required: true
  type: map
  keys:
    host:
      description: Easee host.
      required: true
      type: string
    rfid:
      description: RFID tag used for authorization.
      required: false
      type: string
      default: "00845500"
    failsafe:
      description: Enable failsafe mode at Home Assistant startup.
      required: false
      type: boolean
      default: false
    failsafe_timeout:
      description: Timeout of the failsafe mode in seconds. Allowed values are between 10 seconds and 600 seconds (this parameter is only used if failsafe mode is enabled). Make sure to call the `easee.set_curr` service regularly within this timeout period!
      required: false
      type: integer
      default: 30
    failsafe_fallback:
      description: Fallback current of the failsafe mode in A. Allowed values are between 6 Ampere and 63 Ampere. 0 Ampere disables the running charging process completely (this parameter is only used if failsafe mode is enabled).
      required: false
      type: integer
      default: 6
    failsafe_persist:
      description: Saving the failsafe configuration to internal EEPROM of the Easee charging station. 1 means save it, 0 means do only keep this configuration until the next restart of the charging station (this parameter is only used if failsafe mode is enabled).
      required: false
      type: integer
      default: 0
    refresh_interval:
      description: Refresh interval to fetch new data from the charging station. 5 seconds (same as in the official app) is recommended.
      required: false
      type: integer
      default: 5
{% endconfiguration %}

## Sites, circuits and chargers

In the easee eco-system chargers are arranged in sites, circuits and chargers.

A site typically corresponds to a building, i.e. a single household home or an apartment building. Each site has a fuse rating assosiated. A site may have an assisiated equipmant that measures the current load on the phases thus allowing the chagergers to limit their current to not overload the fuses.

A circuit corresponds to a circuit breaker in the building electrical distribution panel. Each circuit have a fuse rating assosiated. Several chargers can be connected to the same circuit and they will then share the current that is allowed by the rating of that circuit. Chargers can also be connected to different circuits and will thus not share the current with other chargers, but will still be limited by and shre the site fuse rating.

A charger corresponds to a physical charging station.

## Options

Various options and sensors can be enabled/disabled in the integration option window as described below. 

### Sites

Select which sites the easee component should create sensors for, thus limiting sensor clutter.

### Sensors

The easee component have various sensors that can be enabled/disabled in the integration configuration UI.

- status
- basic_schedule
- cableLocked
- circuitCurrent
- costPerkWh
- dynamicChargerCurrent
- dynamicCircuitCurrent
- enableIdleCurrent
- energy_per_hour
- inCurrent
- isEnabled
- maxChargerCurrent
- maxCircuitCurrent
- online
- outputCurrent
- reasonForNoCurrent
- session_energy
- smartCharging
- total_power
- update_available
- voltage

### Consumption

Selects which sensors for energy consumptions should be created, options are 1, 7, 14, 30 and 365 days.

### Custom Units

Selects the units for power, kW or W, and for energy, kWh or Wh.

## Disclaimer

This software is not affiliated with or endorsed by Easee.
