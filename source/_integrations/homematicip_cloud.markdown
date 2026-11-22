---
description: Instructions on how to integrate Homematic IP devices with Home Assistant.
ha_release: 0.66
ha_domain: homematicip_cloud
---

The **HomematicIP Cloud** {% term integration %} connects Home Assistant to the [Homematic IP](https://www.homematic-ip.com/) cloud, the same cloud the Homematic IP app uses. The devices and groups of your Homematic IP installation appear in Home Assistant, and their changes arrive as soon as the cloud reports them.

## Supported devices

The integration works with Homematic IP devices that are paired with a Homematic IP access point or a Home Control Unit (`HmIP-HCU1`). The lists below group the devices by the type of entity they create. A single physical device often creates entities of several types: a wall thermostat appears under *Climate*, *Sensors*, and *Binary sensors*. If your device isn't listed, see [Report a new device or a missing value](#report-a-new-device-or-a-missing-value).

Groups you set up in the Homematic IP app appear as well: heating groups as climate entities, switching groups as switches, shutter groups as covers, and security groups as binary sensors.

### Alarm control panel

- Combined alarm control panel with internal and external security zones (`HmIP-SecurityZone`)

### Binary sensors

- Access point cloud connection and arming blocked (`HmIP-HAP`, `HmIP-HAP-B1`)
- Window and door contacts, including the rotary handle sensor (`HmIP-SWDO`, `HmIP-SWDO-PL`, `HmIP-SWDO-I`, `HmIP-SWDM`, `HmIP-SWDM-B2`, `HmIP-SRH`)
- Contact interfaces (`HmIP-FCI1`, `HmIP-FCI6`, `HmIP-SCI`)
- Smoke detectors (`HmIP-SWSD`, `HmIP-SWSD-2`)
- Motion and presence sensors (`HmIP-SMI`, `HmIP-SMI55`, `HmIPW-SMI55`, `HmIP-SMO`, `HmIP-SMO-A`, `HmIP-SMO230-A`, `HmIP-SPI`, `HmIPW-SPI`)
- Acceleration, tilt, and vibration sensors (`HmIP-SAM`, `HmIP-STV`, `ELV-SH-CTV`, `ELV-SH-TACO`)
- Rain sensor (`HmIP-SRD`)
- Water sensor (`HmIP-SWD`)
- Storm, sunshine, and rain of the weather sensors (`HmIP-SWO-B`, `HmIP-SWO-PL`, `HmIP-SWO-PR`)
- Water alarm of the water stop and supply unit (`HmIP-WSS`, `HmIP-WSS-GB`)
- Pluggable power supply monitoring (`HmIP-PMFS`)
- Wired input modules, 16 and 32 channels (`HmIPW-DRI16`, `HmIPW-DRI32`)
- Low battery of battery-powered devices, including the alarm sirens (`HmIP-ASIR`, `HmIP-ASIR-O`, `HmIP-ASIR-B1`)
- Full Flush Lock Controller glass-break and lock state sensors (`HmIP-FLC`)
- Door lock sensor (`HmIP-DLS`)
- Heating output of wall thermostats, shown when the thermostat's switching output is enabled (`HmIP-BWTH`, `HmIP-WGT`, `HmIP-WGT-A`, `HmIP-WGTC`)

### Buttons

- Wall-mounted garage door controller (`HmIP-WGC`)
- Full Flush Lock Controller door opener (`HmIP-FLC`)
- Full Flush Door Controller door opener (`HmIP-FDC`)
- Identify, which makes the device signal its location, on devices that support it

### Climate

The integration creates one climate entity per room as a Homematic IP heating group (`HmIP-HeatingGroup`). The group reads temperature and humidity from any of the following devices in that room and drives the floor heating or radiator actuators behind it:

- Wall thermostats (`HmIP-WTH`, `HmIP-WTH-1`, `HmIP-WTH-2`, `HmIP-WTH-B`, `HmIPW-WTH`, `HmIP-BWTH`, `HmIP-BWTH-24`, `HmIP-WGT`, `HmIP-WGT-A`, `HmIP-WGTC`, `ALPHA-IP-RBG`, `ALPHA-IP-RBGa`)
- Radiator thermostats (`HmIP-eTRV`, `HmIP-eTRV-2`, `HmIP-eTRV-2-UK`, `HmIP-eTRV-2-B`, `HmIP-eTRV-2-B1`, `HmIP-eTRV-3`, `HmIP-eTRV-C`, `HmIP-eTRV-CL`, `HmIP-eTRV-E`, `HmIP-eTRV-F`)
- Temperature and humidity sensors (`HmIP-STH`, `HmIP-STHD`)

Floor heating actuators are operated through the climate group (`HMIP-FAL230-C6`, `HMIP-FAL230-C10`, `HMIP-FAL24-C6`, `HMIP-FAL24-C10`, `HMIP-FALMOT-C8`, `HMIP-FALMOT-C12`, `HmIPW-FALMOT-C12`).

### Covers

- Shutter actuators (`HmIP-BROLL`, `HmIP-FROLL`)
- Blind actuators (`HmIP-BBL`, `HmIP-FBL`, `HMIP-DRBLI4`, `HmIPW-DRBL4`)
- Garage door modules (`HmIP-MOD-TM`, `HMIP-MOD-HO`)
- Hunter Douglas and Erfal window blinds (`HMIP-HDM1`)

### Events

- Button presses of remote controls, wall-mounted buttons, and other devices with push-buttons (`HmIP-RC8`, `HmIP-MOD-RC8`, `HmIP-WRC2`, `HmIPW-WRC2`, `HmIP-WRC6`, `HmIP-WRC6-230`, `HmIPW-WRC6`, `HmIP-WRCC2`, `HmIP-WRCR`, `HmIP-BRC2`, `HmIP-KRC4`, `HmIP-KRCA`, `HmIP-KRC-K`, `HmIP-DBB`, `HmIP-WGC`, `HmIP-WGS`, `HmIP-SMI55`, `ELV-SH-CRC`), see [Button events](#button-events)
- Doorbell events for devices that expose a `DOOR_BELL_INPUT` channel, like `HmIP-DSD-PCB` and `HmIP-DBB`

### Fans

- Wall-mounted universal actuator, as a ventilation actuator (`HmIP-WUA`)

### Lights

- Dimming actuators (`HmIP-BDT`, `HmIP-FDT`, `HmIP-PDT`, `HmIP-DRDI3`)
- Universal dimmer with push-button (`HmIP-UDI-PB2`)
- Light strip and RGBW controllers (`HmIP-LSC`, `HmIP-RGBW`)
- Switch actuators with signal lamp or meter (`HmIP-BSL`, `HmIP-BSM`)
- Status lights of wall-mounted remote controls (`HmIP-WRC6-230`, `HmIPW-WRC6`)
- Light of the combination signalling device (`HmIP-MP3P`)
- Wired dimmer module, 3 channels (`HmIPW-DRD3`)

### Locks

- Door lock drives (`HmIP-DLD`, `HmIP-DLP`)

The Full Flush Lock Controller (`HmIP-FLC`) has no lock entity. Its lock state is a binary sensor, and its door opener is a button.

### Sensors

- Access point duty cycle (`HmIP-HAP`, `HmIP-HAP-B1`)
- Wall thermostats (`HmIP-WTH`, `HmIP-WTH-1`, `HmIP-WTH-2`, `HmIP-WTH-B`, `HmIPW-WTH`, `HmIP-BWTH`, `HmIP-WGT`, `HmIP-WGT-A`, `HmIP-WGTC`, `ALPHA-IP-RBG`, `ALPHA-IP-RBGa`)
- Radiator thermostats (`HmIP-eTRV`, `HmIP-eTRV-2`, `HmIP-eTRV-3`, `HmIP-eTRV-C`, `HmIP-eTRV-CL`, `HmIP-eTRV-E`, `HmIP-eTRV-F`)
- Temperature and humidity sensors (`HmIP-STH`, `HmIP-STHD`, `HmIP-STHO`, `HmIP-STHO-A`, `ELV-SH-CTH`)
- External temperature sensors with two probes (`HmIP-STE2-PCB`, `ELV-SH-PTI2`)
- Weather sensors, with temperature, humidity, illuminance, wind, and rain (`HmIP-SWO-B`, `HmIP-SWO-PL`, `HmIP-SWO-PR`)
- Light sensor, outdoor (`HmIP-SLO`)
- Motion and presence sensors, illuminance (`HmIP-SMI`, `HmIP-SMI55`, `HmIPW-SMI55`, `HmIP-SMO`, `HmIP-SMO230-A`, `HmIP-SPI`, `HmIPW-SPI`)
- Passage sensor with direction recognition (`HmIP-SPDR`)
- Window state of the rotary handle sensor (`HmIP-SRH`)
- Tilt angle and tilt state of the tilt and vibration sensors (`HmIP-STV`, `ELV-SH-CTV`, `ELV-SH-TACO`)
- Power and energy of switch actuators with a meter (`HmIP-PSM`, `HmIP-PSM-CH`, `HmIP-PSM-IT`, `HmIP-PSM-UK`, `HmIP-PSM-PE`, `HmIP-PSMCO`, `HmIP-BSM`, `HmIP-BSM-I`, `HmIP-FSM`, `HmIP-FSM16`, `HmIP-USBSM`)
- Energy and gas meter interface (`HmIP-ESI`)
- Floor heating actuators, valve positions and valve adaptation state (`HmIP-FAL230-C6`, `HmIP-FAL230-C10`, `HmIP-FAL24-C6`, `HmIP-FAL24-C10`, `HmIP-FALMOT-C8`, `HmIP-FALMOT-C12`, `HmIPW-FALMOT-C12`)
- Valve state of motorized floor heating actuators (`HmIP-FALMOT-C8`, `HmIP-FALMOT-C12`, `HmIPW-FALMOT-C12`)
- Smoke detector dirt level (`HmIP-SWSD-2`)
- Fine dust sensor (`HmIP-SFD`)
- Soil moisture sensor (`ELV-SH-SMSI`)
- Ultrasonic distance sensor interface, distance and height (`ELV-SH-DUSI`)
- Carbon dioxide sensors (`HmIP-SCTH230`, `HmIP-WGTC`, `HmIPW-SCTHD`)
- Water flow and volume of the smart watering actuator (`ELV-SH-WSM`)
- Water flow of the water stop and supply unit (`HmIP-WSS`, `HmIP-WSS-GB`)

### Sirens

- Combination signalling device, with its sounds and volume (`HmIP-MP3P`)

### Switches

- Pluggable switches and meters (`HmIP-PS`, `HmIP-PSM`, `HmIP-PSM-CH`, `HmIP-PSM-IT`, `HmIP-PSM-UK`, `HmIP-PSM-PE`, `HmIP-PSMCO`, `HmIP-USBSM`)
- Flush-mount switch actuators and meters (`HmIP-FSM`, `HmIP-FSM16`)
- Switch actuators with push-button input, flush-mount (`HmIP-FSI6`, `HmIP-FSI16`)
- Switch actuator for brand switches with meter, flush-mount (`HmIP-BSM-I`)
- Open collector module receiver, 8 channels (`HmIP-MOD-OC8`)
- Multi-IO box (`HmIP-MIOB`)
- Switch circuit boards (`HmIP-PCBS`, `HmIP-PCBS2`, `HmIP-PCBS-BAT`)
- Switch actuator for heating systems, 2 channels (`HmIP-WHS2`)
- Wired switch actuators, 4 and 8 channels (`HmIPW-DRS4`, `HmIPW-DRS8`)
- Wired inbound and outbound module, 6 channels (`HmIPW-FIO6`)
- DIN rail switch actuators (`HMIP-DRSI1`, `HMIP-DRSI4`)
- Switch actuator, 2 channels (`ELV-SH-BS2`)
- Switch box, 8 channels (`ELV-SH-SB8`)
- Switchable power supply, 25 W (`ELV-SH-SPS25`)
- Switching output of wall thermostats and wall-mounted devices (`HmIP-WGT`, `HmIP-WGT-A`, `HmIP-WGTC`, `HmIP-WGS`, `HmIP-WRC6-230`, `HmIP-FWI`, `HmIP-SCTH230`, `HmIP-SMO230-A`)

### Valves

- Smart watering actuator (`ELV-SH-WSM`)
- Water stop and supply unit (`HmIP-WSS`, `HmIP-WSS-GB`)

### Weather

- Weather sensors, basic, plus, and pro (`HmIP-SWO-B`, `HmIP-SWO-PL`, `HmIP-SWO-PR`)

## Prerequisites

- A Homematic IP access point or a Home Control Unit (`HmIP-HCU1`), set up in the Homematic IP app.
- The access point ID (SGTIN), printed on the back of the access point.
- The PIN of the access point, if you set one in the Homematic IP app.

During setup, Home Assistant asks for the access point ID and the PIN, then asks you to press the blue button on the access point. On a Home Control Unit, press the button on top of the device before you start, and finish the setup within 5 minutes.

{% include integrations/config_flow.md %}

## Manual configuration

Instead of the UI, you can add an access point in your {% term "`configuration.yaml`" %} file. Generate an authentication token with the `hmip_generate_auth_token` command of the [homematicip](https://pypi.org/project/homematicip/) Python package, then add the access point:

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
  description: Name to identify your access point, used as a prefix for your device names.
  type: string
accesspoint:
  required: true
  description: The access point ID (Serialized Global Trade Item Number, or SGTIN).
  type: string
authtoken:
  required: true
  description: "Authentication token generated with `hmip_generate_auth_token`."
  type: string
{% endconfiguration %}

## Supported functionality

### Devices and groups

Devices and groups you add or remove in the Homematic IP app are mirrored into Home Assistant. Groups appear and disappear immediately. Devices disappear immediately and appear after about 30 seconds. Name a new device in the Homematic IP app within that time, otherwise Home Assistant uses a default name based on the device type. You can rename the device in Home Assistant later.

### Alarm system

Newer Homematic IP alarm systems refuse to arm while a window is open or a device is unreachable. Home Assistant then reports an error naming those devices, and the **Arming blocked** binary sensor of the access point turns on. It only follows the commands sent from Home Assistant and stays on until the next one goes through.

To arm the alarm system anyway, use the [`homematicip_cloud.arm_anyway`](/actions/homematicip_cloud.arm_anyway/) action. It arms the alarm system in the `away` or `home` mode and leaves the sensors that block it unmonitored.

### Door locks and door openers

To control the `HmIP-DLD` door lock drive or the door openers of the `HmIP-FLC` and `HmIP-FDC`, allow Home Assistant to do so under **Access Control** in the Homematic IP app.

The door opener is a button entity. If the access authorization has a PIN, use the `homematicip_cloud.pull_latch` action with its `pin` field instead, because the button cannot pass a PIN.

### Button events

Devices with physical buttons have an event entity for each button. It reports a short release (`short_release`), a long press (`long_press`), and a long release (`long_release`), which you can use to trigger automations.

{% important %}
If a button is directly paired to an actuator in the Homematic IP app (*Direct Device Connection*, called *Direktverknüpfung* in the German app), the cloud doesn't see the press, so Home Assistant can't react to it either. To use the button in Home Assistant, either remove the direct pairing in the Homematic IP app, or add an automation in the Homematic IP app that references the button. The cloud then forwards the press to Home Assistant.
{% endimportant %}

{% note %}
All actions that operate on the access point accept an optional `accesspoint_id` parameter (Serialized Global Trade Item Number, or SGTIN). If your installation has only one access point, you can leave this out. With multiple access points, you can find the ID at the top of the integration page or printed on the back of the access point.
{% endnote %}

{% include integrations/actions.md %}

## HomematicIP Cloud automation examples

The buttons, sensors, and actuators of your Homematic IP installation can control any device in Home Assistant, and the other way around. Here are a few ideas to get you started.

{% include docs/paste_yaml_tip.md %}

### Automation: Toggle a light with a button

Toggle a light when you briefly press a button.

- **Trigger**: Event received
  - **Target**: The event entity of your button
  - **Event type**: **Short release**
- **Action**: Toggle light
  - **Target**: Your light

{% details "YAML example for toggling a light with a button" %}

{% example %}
automation: |
  alias: "Toggle the living room light with button 3"
  triggers:
    - trigger: event.received
      target:
        entity_id: event.wall_switch_button_3
      options:
        event_type:
          - short_release
  actions:
    - action: light.toggle
      target:
        entity_id: light.living_room
{% endexample %}

{% enddetails %}

### Automation: Activate a scene with a double press

The cloud delivers a double press as two `short_release` events. After the first one, wait half a second for the second.

{% details "YAML example for activating a scene with a double press" %}

{% example %}
automation: |
  alias: "Movie scene on a double press of button 3"
  triggers:
    - trigger: event.received
      target:
        entity_id: event.wall_switch_button_3
      options:
        event_type:
          - short_release
  actions:
    - wait_for_trigger:
        - trigger: event.received
          target:
            entity_id: event.wall_switch_button_3
          options:
            event_type:
              - short_release
      timeout: "00:00:00.500"
      continue_on_timeout: false
    - action: scene.turn_on
      target:
        entity_id: scene.movie_night
{% endexample %}

{% enddetails %}

### Automation: Dim a light while holding a button

The button reports `long_press` while you hold it and `long_release` when you let go. Dim the light step by step until the release arrives.

{% details "YAML example for dimming a light while holding a button" %}

{% example %}
automation: |
  alias: "Dim the living room light while holding button 3"
  triggers:
    - trigger: event.received
      target:
        entity_id: event.wall_switch_button_3
      options:
        event_type:
          - long_press
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
            entity_id: event.wall_switch_button_3
            attribute: event_type
            state: long_press
{% endexample %}

{% enddetails %}

### Automation: Shut off the water when a leak is detected

Close the water stop and supply unit as soon as a water sensor detects water, and send a notification.

- **Trigger**: State
  - **Entity**: Your water sensor
  - **To**: **Wet**
- **Actions**:
  - **Close valve**
    - **Target**: Your water stop and supply unit
  - **Send a notification message**
    - **Target**: Your phone

{% details "YAML example for shutting off the water on a leak" %}

{% example %}
automation: |
  alias: "Shut off the water on a leak"
  triggers:
    - trigger: state
      entity_id: binary_sensor.water_sensor_basement
      to: "on"
  actions:
    - action: valve.close_valve
      target:
        entity_id: valve.water_stop
    - action: notify.send_message
      target:
        entity_id: notify.mobile_app_phone
      data:
        message: "Water detected in the basement, the water supply is closed."
{% endexample %}

{% enddetails %}

## Data updates

Home Assistant keeps a connection to the Homematic IP cloud open and receives every change as it happens, without {% term polling %}. If the connection drops, all entities become unavailable until it is back. Home Assistant then loads the current state of all devices again.

The cloud limits how many requests an IP address may send. If it throttles your address, the Homematic IP app shows a notice as well, and Home Assistant waits until the throttling is over before it connects again.

## Known limitations

- The `HmIP-DLD` door lock drive works only without a PIN. Make sure no PIN is set for the device in the Homematic IP app.
- The door opener buttons cannot pass a PIN. Use the `homematicip_cloud.pull_latch` action instead.
- Presses of buttons that are directly paired to an actuator do not reach Home Assistant.
- There is no double-press event. A double press arrives as two `short_release` events.

## Report a new device or a missing value

If a device shows up in the Homematic IP app but not in Home Assistant, or a value is missing, the [homematicip Python library](https://github.com/hahn-th/homematicip-rest-api) that the integration uses most likely does not support it yet.

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}, open the **HomematicIP Cloud** integration, and select **Download diagnostics**. Device IDs, labels, locations, and tokens are replaced with placeholders, so you can share the file publicly.
2. Open a [new issue](https://github.com/hahn-th/homematicip-rest-api/issues/new) on the library repository, name the device model and what you use it for, and attach the diagnostics file.

Support for a device lands in the library first and reaches Home Assistant with a later release.

## Troubleshooting

### Home Assistant cannot control a lock or door opener

Allow Home Assistant to control the device under **Access Control** in the Homematic IP app. For the `HmIP-DLD`, also make sure that no PIN is set.

### All entities are unavailable

Home Assistant has lost the connection to the Homematic IP cloud. Check whether the Homematic IP app still reaches your devices. If the setup shows that the cloud is throttling your IP address, wait until the time in the message has passed, Home Assistant then reconnects by itself.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
