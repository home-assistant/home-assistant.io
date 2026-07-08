---
title: HomematicIP Cloud
description: Instructions for integrating HomematicIP into Home Assistant.
ha_category:
  - Alarm
  - Binary sensor
  - Button
  - Climate
  - Cover
  - Event
  - Hub
  - Light
  - Lock
  - Sensor
  - Switch
  - Valve
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
  - diagnostics
  - event
  - light
  - lock
  - sensor
  - siren
  - switch
  - valve
  - weather
ha_integration_type: hub
ha_codeowners:
  - '@hahn-th'
  - '@lackas'
---

The [HomematicIP](https://www.homematic-ip.com/) {% term integration %} is used as an interface to the cloud server. Since there is no official documentation about this API, everything was done via reverse engineering. Use at your own risk.

There is currently support for the following device types within Home Assistant:

- Alarm
- Binary sensor
- Button
- Climate
- Cover
- Event
- Light
- Lock
- Sensor
- Switch
- Valve
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

## Adding and removing devices and groups via the Homematic IP app

Devices and groups you add or remove in the Homematic IP app are mirrored into Home Assistant:

- Groups appear and disappear immediately.
- Devices appear with a delay of about 30 seconds, and disappear immediately. Within this delay, finish naming the device in the Homematic IP app; otherwise Home Assistant uses a default name based on the device type. You can rename the device later in the entity registry.

## Use HmIP-DLD Door Lock Drive in Home Assistant

If you are unable to control the HmIP-DLD device via Home Assistant, you might need to allow the Home Assistant access point to control the lock in the Homematic IP app.

To do this, navigate to **Access Control** in the Homematic IP app and enable the necessary permissions.

Currently, you can only use the HmIP-DLD in Home Assistant without a PIN. Make sure no PIN is set for the device in the Homematic IP app.

## Supported devices

The list below shows which Home Assistant entities each supported Homematic IP device contributes. Devices are grouped by Home Assistant entity platform; a single physical device often contributes entities on more than one platform (for example, a wall thermostat appears under *Climate*, *Sensors*, and *Binary sensors* for the battery state). If your device isn't listed, see [My device isn't recognized](#my-device-isnt-recognized).

### Alarm control panel

- Combined alarm control panel with internal and external security zones (`HmIP-SecurityZone`)

### Binary sensors

- Access point cloud connection (`HmIP-HAP`, `HmIP-HAP-B1`)
- Window and door contacts, including the rotary handle sensor (`HmIP-SWDO`, `HmIP-SWDO-PL`, `HmIP-SWDO-I`, `HmIP-SWDM`, `HmIP-SWDM-B2`, `HmIP-SRH`)
- Contact interfaces (`HmIP-FCI1`, `HmIP-FCI6`, `HmIP-SCI`)
- Smoke detectors (`HmIP-SWSD`, `HmIP-SWSD-2`)
- Motion and presence sensors (`HmIP-SMI`, `HmIP-SMI55`, `HmIP-SMO`, `HmIP-SMO-A`, `HmIP-SMO230`, `HmIP-SPI`)
- Acceleration and tilt sensors (`HmIP-SAM`, `HmIP-STV`)
- Rain sensor (`HmIP-SRD`)
- Water sensor (`HmIP-SWD`)
- Alarm sirens (`HmIP-ASIR`, `HmIP-ASIR-O`, `HmIP-ASIR-B1`)
- Pluggable power supply monitoring (`HmIP-PMFS`)
- Wired input module – 32 channels (`HmIPW-DRI32`)
- Battery sensors on remote controls (`HmIP-RC8`, `HmIP-WRC2`, `HmIP-WRCC2`, `HmIP-WRC6`, `HmIP-WRC6-230`, `HmIPW-WRC6`, `HmIP-KRC4`, `HmIP-KRCA`, `HmIP-BRC2`, `HmIP-MOD-RC8`)
- Full Flush Lock Controller glass-break and lock state sensors (`HmIP-FLC`)

### Buttons

- Wall-mounted garage door controller (`HmIP-WGC`)
- Full Flush Lock Controller door opener (`HmIP-FLC`)

### Climate

The integration creates one climate entity per room as a Homematic IP heating group (`HmIP-HeatingGroup`). The group reads temperature and humidity from any of the following devices in that room and drives the floor heating or radiator actuators behind it:

- Wall thermostats (`HmIP-WTH`, `HmIP-WTH-1`, `HmIP-WTH-2`, `HmIP-WTH-B`, `HmIP-BWTH`, `HmIP-BWTH-24`, `ALPHA-IP-RBG`, `ALPHA-IP-RBGa`)
- Radiator thermostats (`HmIP-eTRV`, `HmIP-eTRV-2`, `HmIP-eTRV-2-UK`, `HmIP-eTRV-2-B`, `HmIP-eTRV-2-B1`, `HmIP-eTRV-C`, `HmIP-eTRV-E`)
- Temperature and humidity sensors (`HmIP-STH`, `HmIP-STHD`)

Floor heating actuators are operated through the climate group and don't need their own entity (`HMIP-FAL230-C6`, `HMIP-FAL230-C10`, `HMIP-FAL24-C6`, `HMIP-FAL24-C10`, `HMIP-FALMOT-C12`).

### Covers

- Shutter actuators (`HmIP-BROLL`, `HmIP-FROLL`)
- Blind actuators (`HmIP-BBL`, `HmIP-FBL`, `HMIP-DRBLI4`)
- Garage door modules (`HmIP-MOD-TM`, `HMIP-MOD-HO`)
- Hunter Douglas and Erfal window blinds (`HMIP-HDM1`)

### Events

- Doorbell events for devices that expose a `DOOR_BELL_INPUT` channel, like `HmIP-DSD-PCB`.

### Lights

- Dimming actuators (`HmIP-BDT`, `HmIP-FDT`, `HmIP-PDT`)
- Switch actuators with signal lamp or meter (`HmIP-BSL`, `HmIP-BSM`)
- Wired dimmer module – 3 channels (`HmIPW-DRD3`)

### Locks

- Door lock drive – currently usable without a PIN only (`HmIP-DLD`)
- Full Flush Lock Controller (`HmIP-FLC`)

### Sensors

- Access point duty cycle (`HmIP-HAP`, `HmIP-HAP-B1`)
- Wall thermostats (`HmIP-WTH`, `HmIP-WTH-1`, `HmIP-WTH-2`, `HmIP-WTH-B`, `ALPHA-IP-RBG`, `ALPHA-IP-RBGa`)
- Radiator thermostats (`HmIP-eTRV`, `HmIP-eTRV-2`, `HmIP-eTRV-C`, `HmIP-eTRV-E`)
- Temperature and humidity sensors (`HmIP-STH`, `HmIP-STHD`, `HmIP-STHO`, `HmIP-STHO-A`)
- External temperature sensors with two probes (`HmIP-STE2-PCB`, `ELV-SH-PTI2`)
- Light sensor – outdoor (`HmIP-SLO`)
- Motion and presence sensors (`HmIP-SMI`, `HmIP-SMO`, `HmIP-SPI`)
- Passage sensor with direction recognition (`HmIP-SPDR`)
- Floor heating actuator – 12 channels, valve positions (`HMIP-FALMOT-C12`)
- Fine dust sensor (`HmIP-SFD`)
- Soil moisture sensor (`ELV-SH-SMSI`)
- Door lock pad (`HmIP-DLP`)

### Switches

- Pluggable switches and meters (`HmIP-PS`, `HmIP-PSM`, `HmIP-PSM-CH`, `HmIP-PSM-IT`, `HmIP-PSM-UK`, `HmIP-PSM-PE`)
- Flush-mount switch actuators and meters (`HmIP-FSM`, `HmIP-FSM16`)
- Switch actuator with push-button input – flush-mount (`HmIP-FSI16`)
- Open collector module receiver – 8 channels (`HmIP-MOD-OC8`)
- Multi-IO box (`HmIP-MIOB`)
- Switch circuit boards (`HmIP-PCBS`, `HmIP-PCBS2`, `HmIP-PCBS-BAT`)
- Switch actuator for heating systems – 2 channels (`HmIP-WHS2`)
- Wired switch actuator – 8 channels (`HmIPW-DRS8`)
- DIN rail switch actuators (`HMIP-DRSI1`, `HMIP-DRSI4`)
- Switch actuator – 2 channels (`HmIP-BS2`)
- Switchable power supply – 25 W (`ELV-SH-SPS25`)

### Valves

- Smart watering actuator (`ELV-SH-WSM`)

### Weather

- Weather sensors – basic, plus, and pro (`HmIP-SWO-B`, `HmIP-SWO-PL`, `HmIP-SWO-PR`)

## My device isn't recognized

If your device shows up in the Homematic IP app but Home Assistant doesn't pick it up, the device family is most likely not yet implemented in the [Python library](https://github.com/hahn-th/homematicip-rest-api) that this integration uses. Each device family has to be added there first.

Here is how you can help getting it added:

1. Download diagnostics for your access point:
    - Go to {% my integrations title="**Settings** > **Devices & services**" %}, open the **HomematicIP Cloud** integration, and select **Download diagnostics**.
    - Result: Home Assistant downloads an anonymized JSON file.
    - Device IDs, labels, location, and the refresh token are replaced with placeholders, so you can share the file publicly without exposing your home layout.
2. Open an issue on the library repository. File a [new issue](https://github.com/hahn-th/homematicip-rest-api/issues/new) describing what the device does (model number, what you use it for), and attach the diagnostics file.
3. Wait for the device to land. Adding a new device runs through several steps: library pull request, library release on PyPI, Home Assistant integration update, and finally a Home Assistant release. Each step usually takes a few days to a few weeks. You can follow progress on the library issue and on the linked pull requests.

While you wait, you can often expose the device through the Homematic IP app's own automations. The effects on devices that Home Assistant already supports will then show up there.


## Actions

The integration registers the following service actions. You can call them from automations or from {% my developer_call_service title="**Developer tools** > **Actions**" %}, which also shows the parameters for each action.

All actions that operate on the access point accept an optional `accesspoint_id` parameter (the SGTIN). If your installation has only one access point, you can leave this out. With multiple access points, you can find the ID at the top of the integration page or printed on the back of the access point.

### Climate and home modes

- `homematicip_cloud.activate_eco_mode_with_duration`: Activate eco mode for a given number of minutes.
- `homematicip_cloud.activate_eco_mode_with_period`: Activate eco mode until a given date and time.
- `homematicip_cloud.deactivate_eco_mode`: Deactivate eco mode immediately.
- `homematicip_cloud.activate_vacation`: Activate vacation mode until a given date and time, holding a target temperature.
- `homematicip_cloud.deactivate_vacation`: Deactivate vacation mode immediately.
- `homematicip_cloud.set_active_climate_profile`: Switch the active climate profile of a climate entity. The index is 1-based and matches the order shown in the Homematic IP app.
- `homematicip_cloud.set_home_cooling_mode`: Switch the entire home between heating and cooling. *Administrator only.*

### Energy and diagnostics

- `homematicip_cloud.reset_energy_counter`: Reset the energy counter of a measuring actuator. *Administrator only.*
- `homematicip_cloud.dump_hap_config`: Write a configuration dump to a file on disk. *Administrator only.* For sharing the dump publicly, prefer **Download diagnostics** from the integration page; it produces the same dump with stricter redaction.

### Action examples

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
      anonymize: true
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
      cooling: true
      accesspoint_id: 3014xxxxxxxxxxxxxxxxxxxx
```

## Button events

Devices with physical buttons expose an event entity per button channel. You can use these to trigger automations on a short release, a long press, or a long release.

{% important %}
If a button is directly paired to an actuator inside the Homematic IP app (*Direct Device Connection*, called *Direktverknüpfung* in the German app), the cloud doesn't see the press, so Home Assistant can't react to it either. To use the button in Home Assistant, either remove the direct pairing in the Homematic IP app, or add an automation in the Homematic IP app that references the button. The cloud then forwards the press to Home Assistant.
{% endimportant %}

{% note %}
The cloud doesn't deliver a dedicated double-press event. A double-press arrives as two consecutive `short_release` events, so double-press automations are built on top of the same event entity, as shown below.
{% endnote %}

### Trigger an action on a short release

{% example %}
automation:
  - alias: "Toggle living room light on button 3 short release"
    triggers:
      - trigger: state
        entity_id: event.wandtaster_6_fach_button_3
        attribute: event_type
        to: short_release
    actions:
      - action: light.toggle
        target:
          entity_id: light.living_room
{% endexample %}

### Trigger an action on a double press

The cloud delivers a double press as two consecutive `short_release` events. Use `wait_for_trigger` with a short timeout to detect the second press:

{% example %}
automation:
  - alias: "Activate movie scene on button 3 double press"
    triggers:
      - trigger: state
        entity_id: event.wandtaster_6_fach_button_3
        attribute: event_type
        to: short_release
    actions:
      - wait_for_trigger:
          - trigger: state
            entity_id: event.wandtaster_6_fach_button_3
            attribute: event_type
            to: short_release
        timeout: "00:00:00.500"
        continue_on_timeout: false
      - action: scene.turn_on
        target:
          entity_id: scene.movie_night
{% endexample %}

### Dim a light while holding a button

The button reports `long_press` when held and `long_release` when released. Use a `repeat` loop that keeps dimming until the release event fires:

{% example %}
automation:
  - alias: "Dim living room while holding button 3"
    triggers:
      - trigger: state
        entity_id: event.wandtaster_6_fach_button_3
        attribute: event_type
        to: long_press
    actions:
      - repeat:
          sequence:
            - action: light.turn_on
              target:
                entity_id: light.living_room
              data:
                brightness_step_pct: -5
            - delay: "00:00:00.200"
          while:
            - condition: state
              entity_id: event.wandtaster_6_fach_button_3
              attribute: event_type
              state: long_press
{% endexample %}
