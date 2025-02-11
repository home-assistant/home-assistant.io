---
title: HomematicIP Cloud
description: Instructions for integrating HomematicIP into Home Assistant.
ha_category:
  - Alarm
  - Binary sensor
  - Button
  - Climate
  - Cover
  - Hub
  - Light
  - Lock
  - Sensor
  - Switch
ha_iot_class: Cloud Push
ha_release: 0.66
ha_config_flow: true
ha_domain: homematicip_cloud
ha_platforms:
  - alarm_control_panel
  - binary_sensor
  - button
  - climate
  - cover
  - event
  - light
  - lock
  - sensor
  - switch
  - weather
ha_integration_type: integration
ha_codeowners:
  - '@hahn-th'
---

The [HomematicIP](https://www.homematic-ip.com/) integration platform is used as an interface to the cloud server. Since there is no official documentation about this API, everything was done via reverse engineering. Use at your own risk.

There is currently support for the following device types within Home Assistant:

- Alarm
- Binary sensor
- Button
- Climate
- Cover
- Light
- Lock
- Sensor
- Switch
- Weather

{% include integrations/config_flow.md %}

## Manual configuration

Generate the authentication token:

`hmip_generate_auth_token.py`

Add the information to your {% term "`configuration.yaml`" %} file:

```yaml
homematicip_cloud:
  - accesspoint: IDENTIFIER
    authtoken: AUTHTOKEN
  - name: Location2
    accesspoint: IDENTIFIER2
    authtoken: AUTHTOKEN2
```

{% configuration %}
name:
  required: false
  description: Name to identify your access point, this will be used to prefix your device names.
  type: string
accesspoint:
  required: true
  description: This is the access point ID (SGTIN).
  type: string
authtoken:
  required: true
  description: "Authentication token generated with `generate_auth_token.py`."
  type: string
{% endconfiguration %}

## Adding and removing devices and group via native HomematicIP APP

Devices and groups are instantly removed from Home Assistant when removed in the native HomematicIP APP.
Groups are instantly created in Home Assistant when created in the native HomematicIP APP.
Devices are created with a delay of 30 seconds in Home Assistant when created in the native HomematicIP APP.
Within this delay the device registration should be completed in the App, otherwise the device name will be a default one based on the device type. This can easily be fixed in the Home Assistant entity registry afterwards.

## Implemented and tested devices

- homematicip_cloud.alarm_control_panel
  - Combined Alarm Control Panal with INTERNAL and EXTERNAL Security zones (*HmIP-SecurityZone*)

- homematicip_cloud.binary_sensor
  - Access Point Cloud Connection (*HmIP-HAP, HmIP-HAP-B1*)
  - Acceleration Sensor (*HMIP-SAM*)
  - Inclination and vibration Sensor (*HMIP-STV*)
  - Window and door contact (*HmIP-SWDO, HmIP-SWDO-PL, HmIP-SWDO-I, HmIP-SWDM, HmIP-SWDM-B2*)
  - Contact Interface flush-mount – 1x channel (*HmIP-FCI1*)
  - Contact Interface flush-mount – 6x channels (*HmIP-FCI6*)
  - Contact Interface (*HmIP-SCI*)
  - Window Rotary Handle Sensor (*HmIP-SRH*)
  - Smoke sensor and alarm (*HmIP-SWSD*)
  - Motion Detector with Brightness Sensor - indoor (*HmIP-SMI*)
  - Motion Detector with Brightness Sensor - outdoor (*HmIP-SMO*)
  - Presence Sensor – indoor (*HmIP-SPI*)
  - Rain Sensor (*HmIP-SRD*)
  - Water Sensor (*HmIP-SWD*)
  - Remote Control - 8x buttons (*HmIP-RC8*) (battery only)
  - Wall-mount Remote Control - 2x buttons (*HmIP-WRC2*) (battery only)
  - Wall-mount Remote Control - flat - 2x buttons (*HmIP-WRCC2*) (battery only)
  - Wall-mount Remote Control - 6x buttons (*HmIP-WRC6*) (battery only)
  - Key Ring Remote Control - 4x buttons (*HmIP-KRC4*) (battery only)
  - Key Ring Remote Control - alarm  (*HmIP-KRCA*) (battery only)
  - Alarm Siren (*HmIP-ASIR, -B1*) (battery only)
  - Remote Control for brand switches – 2x buttons (*HmIP-BRC2*) (battery only)
  - Pluggable Power Supply Monitoring (*HmIP-PMFS*)
  - Wired Inbound module – 32x channels (*HMIPW-DRI32*)

- homematicip_cloud.button
  - Wall Mounted Garage Door Controller (*HmIP-WGC*)

- homematicip_cloud.climate
  - Climate group (*HmIP-HeatingGroup*)
  - This includes temperature/humidity measures for climate devices of a room delivered by:
    - Wall-mounted thermostat (*HmIP-WTH, HmIP-WTH-2, HmIP-WTH-B*)
    - Brand Wall-mounted thermostat (*HmIP-BWTH, HmIP-BWTH-24*)
    - Radiator thermostat (*HmIP-eTRV, HmIP-eTRV-2, HmIP-eTRV-C*) - should also work with (*HmIP-eTRV-2-UK, HmIP-eTRV-2-B, HmIP-eTRV-2-B1*)
    - Temperature and humidity sensor (*HmIP-STH*)
    - Temperature and humidity Sensor with display (*HmIP-STHD*)
    - Alpha IP Wall Thermostat Display (*ALPHA-IP-RBG*)
    - Alpha IP Wall Thermostat Display analog (*ALPHA-IP-RBGa*)
  - There is no need to directly support the following devices by Home Assistant, because their integration is done by the required wall thermostats:
    - Floor Heating Actuator – 6x channels, 230V (*HMIP-FAL230-C6*)
    - Floor Heating Actuator – 10x channels, 230V (*HMIP-FAL230-C10*)
    - Floor Heating Actuator – 6x channels, 24V (*HMIP-FAL24-C6*)
    - Floor Heating Actuator – 10x channels, 24V (*HMIP-FAL24-C10*)
    - Floor Heating Actuator – 12x channels, motorized (*HMIP-FALMOT-C12*)

- homematicip_cloud.cover
  - Shutter actuator for brand-mount (*HmIP-BROLL*)
  - Shutter actuator for flush-mount (*HmIP-FROLL*)
  - Blind Actuator for brand switches (*HmIP-BBL*)
  - Blind Actuator for DIN rail mount – 4x channels (*HMIP-DRBLI4*)
  - Blind Actuator for flush-mount (*HmIP-FBL*)
  - Garage door module for Tormatic (*HmIP-MOD_TM*)
  - Module for Hoermann drives (*HMIP-MOD-HO*)
  - Hunter Douglas & erfal window blinds (*HMIP-HDM1*)

- homematicip_cloud.light
  - Switch actuator and meter for brand switches (*HmIP-BSM*)
  - Dimming actuator for brand switches (*HmIP-BDT*)
  - Dimming actuator flush-mount (*HmIP-FDT*)
  - Pluggable Dimmer – trailing edge (*HmIP-PDT*)
  - Switch Actuator for brand switches – with signal lamp (*HmIP-BSL*)
  - Wired Dimmer module – 3x channels (*HMIPW-DRD3*)

- homematicip_cloud.lock
  - Door Lock Drive - currently, usage just without a pin is possible (*HmIP-DLD*)

- homematicip_cloud.sensor
  - Access Point Duty Cycle (*HmIP-HAP, HmIP-HAP-B1*)
  - Wall Mounted Thermostat (*HmIP-WTH, HmIP-WTH2, HmIP-WTH-B*)
  - Radiator thermostat (*HmIP-eTRV, HmIP-eTRV-2, HmIP-eTRV-C*) - should also work with (*HmIP-eTRV-2-UK, HmIP-eTRV-2-B, HmIP-eTRV-2-B1*)
  - Temperature and Humidity Sensor without display - indoor (*HmIP-STH*)
  - Temperature and Humidity Sensor with display - indoor (*HmIP-STHD*)
  - Temperature and Humidity sensor - outdoor (*HmIP-STHO, -A*)
  - Temperature sensor with external probes - 2-way (*HmIP-STE2-PCB*)
  - Motion Detector with Brightness Sensor - indoor (*HmIP-SMI*)
  - Motion Detector with Brightness Sensor - outdoor (*HmIP-SMO*)
  - Presence Sensor – indoor (*HmIP-SPI*)
  - Light Sensor - outdoor (*HmIP-SLO*)
  - Passage Sensor with Direction Recognition (*HmIP-SPDR*) (delta counter)
  - Alpha IP Wall Thermostat Display (*ALPHA-IP-RBG*)
  - Alpha IP Wall Thermostat Display analog (*ALPHA-IP-RBGa*)
  - Floor Heating Actuator – 12x channels, motorized - Valve positions (*HmIP-FALMOT-C12*)

- homematicip_cloud.switch
  - Pluggable Switch (*HmIP-PS*)
  - Pluggable Switch and Meter (*HmIP-PSM*) - should also work with (*HmIP-PSM-CH, HmIP-PSM-IT, HmIP-PSM-UK, HmIP-PSM-PE*)
  - Switch Actuator and Meter – flush-mount (*HmIP-FSM, HmIP-FSM16*)
  - Switch Actuator with Push-button Input – flush-mount (*HmIP-FSI16*)
  - Open Collector Module Receiver - 8x channels (*HmIP-MOD-OC8*)
  - Multi IO Box - 2x (*HmIP-MIOB*)
  - Switch Circuit Board - 1x channels (*HmIP-PCBS*)
  - Switch Circuit Board - 2x channels (*HmIP-PCBS2*)
  - Printed Circuit Board Switch Battery (*HmIP-PCBS-BAT*)
  - Switch Actuator for heating systems – 2x channels (*HmIP-WHS2*)
  - Wired Switch Actuator – 8x channels (*HMIPW-DRS8*)
  - Switch Actuator for DIN rail mount – 4x channels (*HMIP-DRSI4*)
  - Switch Actuator for DIN rail mount – 1x channels (*HMIP-DRSI1*)
  - Switch Actuator - 2x channels (*HmIP-BS2*)

- homematicip_cloud.weather
  - Weather Sensor – basic (*HmIP-SWO-B*)
  - Weather Sensor – plus (*HmIP-SWO-PL*)
  - Weather Sensor – pro (*HmIP-SWO-PR*)
  
## What to do, if a device is missing in Home Assistant

In order for a device to be integrated into Home Assistant, it must first be implemented in the upstream library. A dump of your configuration is required for this, which is then attached to a new issue in the [upstream lib's](https://github.com/hahn-th/homematicip-rest-api) GitHub repository.

1. Create a dump of your access point configuration in Home Assistant: 
  **Developer Tools** -> **Actions** -> Select `homematicip_cloud.dump_hap_config` -> Execute. 
  The default dump is anonymized and is written to your configuration directory (`hmip_config_XXXX.json`).
2. Create a [new issue](https://github.com/hahn-th/homematicip-rest-api/issues/new) at this GitHub repository and attach the created dump file.

Please be patient, wait for the implementation and a new release of the upstream library.
Afterward, this device can be implemented into Home Assistant.
  
## Actions

Executable by all users:
- `homematicip_cloud.activate_eco_mode_with_duration`: Activate eco mode with duration.
- `homematicip_cloud.activate_eco_mode_with_period`: Activate eco mode with period.
- `homematicip_cloud.activate_vacation`: Activates the vacation mode until the given time.
- `homematicip_cloud.deactivate_eco_mode`: Deactivates the eco mode immediately.
- `homematicip_cloud.deactivate_vacation`: Deactivates the vacation mode immediately.
- `homematicip_cloud.set_active_climate_profile`: Set the active climate profile index.
- `homematicip_cloud.set_home_cooling_mode`: Enable or disable cooling for the home.

Executable by administrators or within the context of an automation:
- `homematicip_cloud.dump_hap_config`: Dump the configuration of the Homematic IP Access Point(s).
- `homematicip_cloud.reset_energy_counter`: Reset energy counter of measuring actuators.

### Action examples

`accesspoint_id` (SGTIN) is optional for all actions and only relevant if you have multiple Homematic IP Accesspoints connected to HA. If empty, the action will be performed for all configured Homematic IP Access Points.
The `accesspoint_id` (SGTIN) can be found on top of the integration page, or on the back of your Homematic IP Accesspoint.

Activate eco mode with duration. 

```yaml
...
actions:
  - action: homematicip_cloud.activate_eco_mode_with_duration
    data:
      duration: 60
      accesspoint_id: 3014xxxxxxxxxxxxxxxxxxxx
```

Activate eco mode with period. 

```yaml
...
actions:
  - action: homematicip_cloud.activate_eco_mode_with_period
    data:
      endtime: 2019-09-17 18:00
      accesspoint_id: 3014xxxxxxxxxxxxxxxxxxxx
```

Activates the vacation mode until the given time.

```yaml
...
actions:
  - action: homematicip_cloud.activate_vacation
    data:
      endtime: 2019-09-17 18:00
      temperature: 18.5
      accesspoint_id: 3014xxxxxxxxxxxxxxxxxxxx
```

Deactivates the eco mode immediately.

```yaml
...
actions:
  - action: homematicip_cloud.deactivate_eco_mode
    data:
      accesspoint_id: 3014xxxxxxxxxxxxxxxxxxxx
```

Deactivates the vacation mode immediately.

```yaml
...
actions:
  - action: homematicip_cloud.deactivate_vacation
    data:
      accesspoint_id: 3014xxxxxxxxxxxxxxxxxxxx
```

Set the active climate profile index.

The index of the climate profile is 1-based. 
You can get the required index from the native Homematic IP App.

```yaml
...
actions:
  - action: homematicip_cloud.set_active_climate_profile
    target:
      entity_id: climate.livingroom
    data:
      climate_profile_index: 1
```

Dump the configuration of the Homematic IP Access Point(s).

```yaml
...
actions:
  - action: homematicip_cloud.dump_hap_config
    data:
      anonymize: True
```

Reset energy counter of measuring actuators.

```yaml
...
actions:
  - action: homematicip_cloud.reset_energy_counter
    target:
      entity_id: switch.livingroom
```

Enable (or disable) Cooling mode for the entire home. Disabling Cooling mode will revert to Heating.

```yaml
...
actions:
  - action: homematicip_cloud.set_home_cooling_mode
    data:
      cooling: True
      accesspoint_id: 3014xxxxxxxxxxxxxxxxxxxx
```

## Additional info

Push button devices are only available with a battery sensor. This is due to a limitation of the vendor API (eq3).
It's not possible to detect a key press event on these devices at the moment.

  - Remote Control - 8x buttons (*HmIP-RC8*)
  - Wall-mount Remote Control for brand switches - 2x buttons (*HmIP-BRC2*)
  - Motion Detector for 55mm frames - indoor (HmIP-SMI55)(Push button)
  - Wall-mount Remote Control - 2x buttons (*HmIP-WRC2*)
  - Wall-mount Remote Control - flat - 2x buttons (*HmIP-WRCC2*)
  - Wall-mount Remote Control - 6x buttons (*HmIP-WRC6*)
  - Key Ring Remote Control - 4x buttons (*HmIP-KRC4*)
  - Key Ring Remote Control - alarm  (*HmIP-KRCA*)
  - Wall-mount Remote Control – flat (*HmIP-WRCC2*)
  - Rotary Button (*HmIP-WRCR*)
