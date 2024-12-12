---
title: Xiaomi Miio
description: Instructions on how to integrate Xiaomi devices using the Xiaomi Miio integration within Home Assistant.
ha_category:
  - Alarm
  - Fan
  - Health
  - Hub
  - Light
  - Presence detection
  - Remote
  - Vacuum
ha_iot_class: Local Polling
ha_release: 0.51
ha_codeowners:
  - '@rytilahti'
  - '@syssi'
  - '@starkillerOG'
ha_domain: xiaomi_miio
ha_config_flow: true
ha_zeroconf: true
ha_platforms:
  - air_quality
  - alarm_control_panel
  - binary_sensor
  - button
  - device_tracker
  - diagnostics
  - fan
  - humidifier
  - light
  - number
  - remote
  - select
  - sensor
  - switch
  - vacuum
ha_integration_type: integration
---

The **Xiaomi Miio** {% term integration %} supports the following devices:

- [Xiaomi Gateway](#xiaomi-gateway)
- [Xiaomi device tracker (Xiaomi Mi WiFi Repeater 2)](#xiaomi-device-tracker-xiaomi-mi-wifi-repeater-2)
- [Xiaomi Air Purifier, Air Humidifier and Standing Fan](#xiaomi-air-purifier-air-humidifier-and-standing-fan)
- [Xiaomi Air Quality Monitor](#xiaomi-air-quality-monitor)
- [Xiaomi IR Remote](#xiaomi-ir-remote)
- [Xiaomi Mi Robot Vacuum](#xiaomi-mi-robot-vacuum)
- [Xiaomi Philips Light](#xiaomi-philips-light)
- [Xiaomi Smart WiFi Socket and Smart Power Strip](#xiaomi-smart-wifi-socket-and-smart-power-strip)

## Prerequisites

Most Xiaomi Miio devices support configuration using the Home Assistant UI,
except for the [Xiaomi device tracker](#xiaomi-device-tracker-xiaomi-mi-wifi-repeater-2)
and [Xiaomi IR Remote](#xiaomi-ir-remote). Please read the linked sections for those devices for more information.

Devices need to be set up using the Mi Home app and not vendor-specific apps (e.g. Roborock).

{% note %}
For more complex network setups (e.g. VLANs), reference the [following documentation](https://python-miio.readthedocs.io/en/latest/troubleshooting.html#discover-devices-across-subnets) for additional information.
{% endnote %}

{% include integrations/config_flow.md %}

It is recommend to supply your Xiaomi cloud credentials during configuration
to automatically connect to your devices. You need to specify the cloud server
you used in the Xiaomi Home App (where you initially setup the device). There are
6 servers: `cn`, `de`, `i2`, `ru`, `sg` and `us`; please see
[this page](https://www.openhab.org/addons/bindings/miio/#country-servers) for
the server to use for each country.

## Troubleshooting

The most common problems are:

- Xiaomi Miio devices do not communicate across subnets/VLANs due to the source address of the UDP packet not belonging to the subnet of the device itself, [more information and solutions](https://python-miio.readthedocs.io/en/latest/troubleshooting.html#discover-devices-across-subnets).
- Roborock vacuums need to be connected to the Xiaomi Home app, not the Roborock app, [more information](https://python-miio.readthedocs.io/en/latest/troubleshooting.html#roborock-vacuum-not-detected).
- Blocking the network access to the device is known to cause intermittent connection issues due to the device's internal software hanging and a watchdog restarting the internal software, [more information](https://python-miio.readthedocs.io/en/latest/troubleshooting.html#intermittent-connection-issues-timeouts-xiaomi-vacuum).

## Xiaomi Gateway

The `xiaomi_miio` gateway {% term integration %} allows you to control the gateway and its connected subdevices.

### Supported Xiaomi gateway models

The following list shows the Gateway name, the model number, the Zigbee ID, and whether the model is supported or not in Home Assistant.

- **Chinese version**
  - Model: DGNWG02LM
  - Zigbee ID: lumi.gateway.v3
  - Supported: Yes

- **European version**
  - Model: ZHWG11LM-763 / DGNWQ05LM
  - Zigbee ID: lumi.gateway.mieu01
  - Supported: Yes (cloud credentials needed)

- **Aqara hub**
  - Model: ZHWG11LM
  - Zigbee ID: lumi.gateway.aqhm01
  - Supported: Yes

- **Mijia Zigbee 3.0**
  - Model: ZNDMWG03LM
  - Zigbee ID: lumi.gateway.mgl03
  - Supported: Yes

- **Aqara AC Companion**
  - Model: KTBL01LM
  - Zigbee ID: lumi.acpartner.v1
  - Supported: Untested

- **Mi AC Companion**
  - Model: KTBL02LM
  - Zigbee ID: lumi.acpartner.v2
  - Supported: Untested

- **Aqara AC Companion**
  - Model: KTBL11LM
  - Zigbee ID: lumi.acpartner.v3
  - Supported: Yes

Some gateways (lumi.gateway.mieu01) do not support getting the connected subdevices locally. For those gateways, cloud credentials can be specified during the config flow and the "Use cloud to get connected subdevices" can be enabled in the options flow (after setting up the {% term integration %}, click Configuration in the sidebar, then click Integrations and then click Options on the already set up Xiaomi Miio Gateway {% term integration %}). The connected subdevices will then be retrieved from the Xiaomi Miio cloud (internet), control and status updates of those subdevices will then further take place over local network connection. A re-authentication flow may be triggered when no cloud credentials are provided yet and are needed for that particular gateway model.

### Gateway features

- Gateway alarm control (Turn on/off; see status `armed_away`, `disarmed`, `arming`)
- Gateway light control (Turn on/off; change brightness; change color; see status)
- Gateway illuminance sensor readout (illuminance value in lux)

Not yet implemented features (but possible):

- Gateway internet radio (only chinese stations)
- Gateway ringtones/sounds

### Supported subdevices

These subdevices are fully implemented in HomeAssistant:

- **Weather sensor (WSDCGQ01LM)**
  - Zigbee ID: `lumi.sensor_ht`
  - Features: readout `temperature` and `humidity`
- **Weather sensor (WSDCGQ11LM)**
  - Zigbee ID: `lumi.weather.v1`
  - Features: readout `temperature`, `humidity` and `pressure`
- **Wall switch single (QBKG11LM)**
  - Zigbee ID: `lumi.ctrl_ln1`
  - Features: load_power, status, turn_on, turn_off, toggle
- **Wall switch single (QBKG11LM)**
  - Zigbee ID: `lumi.ctrl_ln1.aq1`
  - Features: load_power, status, turn_on, turn_off, toggle
- **Wall switch no neutral (QBKG04LM)**
  - Zigbee ID: `lumi.ctrl_neutral1.v1`
  - Features: status, turn_on, turn_off, toggle
- **Wall switch double (QBKG12LM)**
  - Zigbee ID: `lumi.ctrl_ln2`
  - Features: load_power, status, turn_on, turn_off, toggle
- **Wall switch double (QBKG12LM)**
  - Zigbee ID: `lumi.ctrl_ln2.aq1`
  - Features: load_power, status, turn_on, turn_off, toggle
- **Wall switch double no neutral (QBKG03LM)**
  - Zigbee ID: `lumi.ctrl_neutral2`
  - Features: status, turn_on, turn_off, toggle
- **D1 wall switch triple (QBKG26LM)**
  - Zigbee ID: `lumi.switch.n3acn3`
  - Features: load_power, status, turn_on, turn_off, toggle
- **D1 wall switch triple no neutral (QBKG25LM)**
  - Zigbee ID: `lumi.switch.l3acn3`
  - Features: load_power, status, turn_on, turn_off, toggle
- **Wall outlet (QBCZ11LM)**
  - Zigbee ID: `lumi.ctrl_86plug.v1`
  - Features: status, turn_on, turn_off, toggle
- **Wall outlet (QBCZ11LM)**
  - Zigbee ID: `lumi.ctrl_86plug.aq1`
  - Features: load_power, status, turn_on, turn_off, toggle
- **Plug (ZNCZ02LM)**
  - Zigbee ID: `lumi.plug`
  - Features: load_power, status, turn_on, turn_off, toggle
- **Relay (LLKZMK11LM)**
  - Zigbee ID: `lumi.relay.c2acn01`
  - Features: load_power, status, turn_on, turn_off, toggle
- **Smart bulb E27 (ZNLDP12LM)**
  - Zigbee ID: `lumi.light.aqcn02`
  - Features: on/off, brightness, color temperature
- **IKEA smart bulb E27 white (LED1545G12)**
  - Zigbee ID: `ikea.light.led1545g12`
  - Features: on/off, brightness, color temperature
- **IKEA smart bulb E27 white (LED1546G12)**
  - Zigbee ID: `ikea.light.led1546g12`
  - Features: on/off, brightness, color temperature
- **IKEA smart bulb E12 white (LED1536G5)**
  - Zigbee ID: `ikea.light.led1536g5`
  - Features: on/off, brightness, color temperature
- **IKEA smart bulb GU10 white (LED1537R6)**
  - Zigbee ID: `ikea.light.led1537r6`
  - Features: on/off, brightness, color temperature
- **IKEA smart bulb E27 white (LED1623G12)**
  - Zigbee ID: `ikea.light.led1623g12`
  - Features: on/off, brightness, color temperature
- **IKEA smart bulb GU10 white (LED1650R5)**
  - Zigbee ID: `ikea.light.led1650r5`
  - Features: on/off, brightness, color temperature
- **IKEA smart bulb E12 white (LED1649C5)**
  - Zigbee ID: `ikea.light.led1649c5`
  - Features: on/off, brightness, color temperature

### Recognized subdevices (not yet implemented)

These subdevices are recognized by the python-miio code but are still being worked on (not yet implemented).

The list shows the device name, the model number, and the Zigbee ID.

- **Button** (WXKG01LM): `lumi.sensor_switch`
- **Button** (WXKG11LM 2015): `lumi.sensor_switch.aq2`
- **Button** (WXKG12LM): `lumi.sensor_switch.aq3`
- **Button** (WXKG11LM 2018): `lumi.remote.b1acn01`
- **Cube** (MFKZQ01LM): `lumi.sensor_cube.v1`
- **Cube** (MFKZQ01LM): `lumi.sensor_cube.aqgl01`
- **Motion sensor** (RTCGQ01LM): `lumi.sensor_motion`
- **Motion sensor** (RTCGQ11LM): `lumi.sensor_motion.aq2`
- **Door sensor** (MCCGQ01LM): `lumi.sensor_magnet`
- **Door sensor** (MCCGQ11LM): `lumi.sensor_magnet.aq2`
- **Vibration sensor** (DJT11LM): `lumi.vibration.aq1`
- **Honeywell smoke detector** (JTYJ-GD-01LM/BW): `lumi.sensor_smoke`
- **Honeywell natural gas detector** (JTQJ-BF-01LM/BW): `lumi.sensor_natgas`
- **Water leak sensor** (SJCGQ11LM): `lumi.sensor_wleak.aq1`
- **Remote switch single** (WXKG03LM 2016): `lumi.sensor_86sw1.v1`
- **Remote switch single** (WXKG03LM 2018): `lumi.remote.b186acn01`
- **D1 remote switch single** (WXKG06LM): `lumi.remote.b186acn02`
- **Remote switch double** (WXKG02LM 2016): `lumi.sensor_86sw2.v1`
- **Remote switch double** (WXKG02LM 2018): `lumi.remote.b286acn01`
- **D1 remote switch double** (WXKG07LM): `lumi.remote.b286acn02`
- **Curtain** (ZNCLDJ11LM): `lumi.curtain`
- **Curtain** (ZNGZDJ11LM): `lumi.curtain.aq2`
- **Curtain B1** (ZNCLDJ12LM): `lumi.curtain.hagl04`
- **Door lock S1** (ZNMS11LM): `lumi.lock.aq1`
- **Door lock S2** (ZNMS12LM): `lumi.lock.acn02`
- **Door lock S2 pro** (ZNMS13LM): `lumi.lock.acn03`
- **Vima cylinder lock** (A6121): `lumi.lock.v1`
- **Thermostat S2** (KTWKQ03ES): `lumi.airrtc.tcpecn02`

## Xiaomi device tracker (Xiaomi Mi WiFi Repeater 2)

The `xiaomi_miio` device tracker platform is observing your Xiaomi Mi WiFi Repeater 2 and reporting all associated WiFi clients.

Please follow the instructions on [Retrieving the Access Token](/integrations/xiaomi_miio/#retrieving-the-access-token) to get the API token.

To add a Xiaomi Mi WiFi Repeater device tracker to your installation, add the following to your {% term "`configuration.yaml`" %} file:

```yaml
device_tracker:
  - platform: xiaomi_miio
    host: 192.168.130.73
    token: YOUR_TOKEN
```

{% configuration %}
host:
  description: The IP address of your miio device.
  required: true
  type: string
token:
  description: The API token of your miio device.
  required: true
  type: string
{% endconfiguration %}

## Xiaomi Air Purifier, Air Humidifier and Standing Fan

The Air Purifiers, Air Humidifiers and Standing Fans use multiple platforms to allow you to set the control modes and settings of the device.

Supported devices:

The list includes device name, model number (if available), and model.

- **Air Purifier**: `zhimi.airpurifier.v1`
- **Air Purifier 2** (FJY4006CN): `zhimi.airpurifier.v2`
- **Air Purifier V3**: `zhimi.airpurifier.v3`
- **Air Purifier V5**: `zhimi.airpurifier.v5`
- **Air Purifier Pro**: `zhimi.airpurifier.v6`
- **Air Purifier Pro V7**: `zhimi.airpurifier.v7`
- **Air Purifier 2 (mini)**: `zhimi.airpurifier.m1`
- **Air Purifier (mini)**: `zhimi.airpurifier.m2`
- **Air Purifier MA1**: `zhimi.airpurifier.ma1`
- **Air Purifier MA2**: `zhimi.airpurifier.ma2`
- **Air Purifier 2S**: `zhimi.airpurifier.mc1`
- **Air Purifier Super**: `zhimi.airpurifier.sa1`
- **Air Purifier Super 2**: `zhimi.airpurifier.sa2`
- **Air Purifier 3 (2019) (AC-M6-SC)**: `zhimi.airpurifier.ma4`
- **Air Purifier 3H (2019)**: `zhimi.airpurifier.mb3`
- **Air Purifier Pro H**: `zhimi.airpurifier.va1`
- **Air Purifier Pro H EU**: `zhimi.airpurifier.vb2`
- **Air Purifier 3C**: `zhimi.airpurifier.mb4`
- **Air Purifier 3C**: `zhimi.airp.mb4a`
- **Air Purifier ZA1**: `zhimi.airpurifier.za1`
- **Air Purifier 4 (AC-M16-SC)**: `zhimi.airp.mb5`
- **Air Purifier 4 PRO (AC-M15-SC)**: `zhimi.airp.vb4`
- **Air Fresh A1 (MJXFJ-150-A1)**: `dmaker.airfresh.a1`
- **Air Fresh VA2**: `zhimi.airfresh.va2`
- **Air Fresh VA4**: `zhimi.airfresh.va4`
- **Air Fresh T2017 (MJXFJ-300-G1)**: `dmaker.airfresh.t2017`
- **Air Humidifier**: `zhimi.humidifier.v1`
- **Air Humidifier CA1**: `zhimi.humidifier.ca1`
- **Air Humidifier CA4**: `zhimi.humidifier.ca4`
- **Air Humidifier CB1**: `zhimi.humidifier.cb1`
- **Air Humidifier JSQ**: `deerma.humidifier.jsq`
- **Air Humidifier JSQ1**: `deerma.humidifier.jsq1`
- **Air Humidifier MJJSQ**: `deerma.humidifier.mjjsq`
- **Standing Fan 1X**: `dmaker.fan.p5`
- **Inverter Pedestal Fan**: `zhimi.fan.za1`
- **Standing Fan 2**: `zhimi.fan.za3`
- **Standing Fan 2S**: `zhimi.fan.za4`
- **Standing Fan**: `zhimi.fan.sa1`
- **DC Pedestal Fan**: `zhimi.fan.v2`
- **DC Pedestal Fan**: `zhimi.fan.v3`
- **Standing Fan 1C**: `dmaker.fan.1c`
- **Tower Fan**: `dmaker.fan.p9`
- **Standing Fan 2**: `dmaker.fan.p10`
- **Standing Fan Pro**: `dmaker.fan.p11`
- **Standing Fan 2**: `dmaker.fan.p18`
- **Standing Fan 3**: `zhimi.fan.za5`

- Power (on, off)
- Operation modes (Auto, Silent, Favorite, Idle)
- Attributes (fan platform)
  - `model`
  - `mode`
  - `sleep_time`
  - `sleep_mode_learn_count`
  - `extra_features`
  - `turbo_mode_supported`
  - `use_time`
  - `button_pressed`
  - `sleep_mode`
- Number entities

| Number         | Description            |
| -------------- | ---------------------- |
| Favorite Level | Set the favorite level |

- Sensor entities

- **Filter Lifetime Remaining**: The remaining life of the filter. Enabled by default.
- **Filter Use**: Filter usage time in hours. Enabled by default.
- **Humidity**: The current humidity measured. Enabled by default.
- **Motor Speed**: The current motor speed measured in rpm. Enabled by default.
- **PM2.5**: The current particulate matter 2.5 measured. Enabled by default.
- **Purify Volume**: The volume of purified air in cubic meter. Disabled by default.
- **Temperature**: The current temperature measured. Enabled by default.
- **Use Time**: The accumulative number of seconds the device has been in use. Disabled by default.

- Switch entities

| Switch     | Description                |
| ---------- | -------------------------- |
| Buzzer     | Turn on/off the buzzer     |
| Child Lock | Turn on/off the child lock |
| Learn Mode | Turn on/off the learn mode |
| LED        | Turn on/off the LED        |

### Air Purifier Pro (zhimi.airpurifier.v6)

- Power (on, off)
- Operation modes (Auto, Silent, Favorite)
- Attributes (fan platform)
  - `sleep_time`
  - `sleep_mode_learn_count`
  - `extra_features`
  - `turbo_mode_supported`
  - `auto_detect`
  - `use_time`
  - `button_pressed`
- Number entities

| Number         | Description            |
| -------------- | ---------------------- |
| Favorite Level | Set the favorite level |
| Volume         | Set the volume         |

- Sensor entities
  - **Filter Life Remaining**: The remaining lifetime of the filter. Enabled by default.
  - **Filter Use**: Filter usage time in hours. Enabled by default.
  - **Humidity**: The current humidity measured. Enabled by default.
  - **Illuminance**: The current illuminance measured. Enabled by default.
  - **Motor Speed**: The current motor speed measured in rpm. Enabled by default.
  - **PM2.5**: The current particulate matter 2.5 measured. Enabled by default.
  - **Purify Volume**: The volume of purified air in cubic meter. Disabled by default.
  - **Second Motor Speed**: The current second motor speed measured in rpm. Enabled by default.
  - **Temperature**: The current temperature measured. Enabled by default.
  - **Use Time**: The accumulative number of seconds the device has been in use. Disabled by default.

- Switch entities

| Switch     | Description                |
| ---------- | -------------------------- |
| Child Lock | Turn on/off the child lock |
| Learn Mode | Turn on/off the learn mode |
| LED        | Turn on/off the LED        |

### Air Purifier Pro V7 (zhimi.airpurifier.v7)

- Power (on, off)
- Operation modes (Auto, Silent, Favorite)
- Attributes (fan platform)
  - `extra_features`
  - `turbo_mode_supported`
  - `button_pressed`
- Number entities

| Number         | Description            |
| -------------- | ---------------------- |
| Favorite Level | Set the favorite level |
| Volume         | Set the volume         |

- Sensor entities
  - **Filter Lifetime Remaining**: The remaining lifetime of the filter. Enabled by default.
  - **Filter Use**: Filter usage time in hours. Enabled by default.
  - **Humidity**: The current humidity measured. Enabled by default.
  - **Illuminance**: The current illuminance measured. Enabled by default.
  - **Motor Speed**: The current motor speed measured in rpm. Enabled by default.
  - **PM2.5**: The current particulate matter 2.5 measured. Enabled by default.
  - **Second Motor Speed**: The current second motor speed measured in rpm. Enabled by default.
  - **Temperature**: The current temperature measured. Enabled by default.
  - **Use Time**: The accumulative number of seconds the device has been in use. Disabled by default.

- Switch entities

| Switch     | Description                |
| ---------- | -------------------------- |
| Child Lock | Turn on/off the child lock |
| Learn Mode | Turn on/off the learn mode |
| LED        | Turn on/off the LED        |

### Air Purifier MA2 (zhimi.airpurifier.ma2)

- Power (on, off)
- Operation modes (Auto, Silent, Favorite)
- Attributes (fan platform)
  - `extra_features`
  - `turbo_mode_supported`
  - `button_pressed`
  - `preset_modes`
  - `preset_mode`
  - `sleep_time`
  - `sleep_mode_learn_count`
  - `use_time`
  - `sleep_mode`
  - `friendly_name`
  - `supported_features`

| Number         | Description            |
| -------------- | ---------------------- |
| Favorite Level | Set the favorite level |

- Sensor entities
  - **Filter Lifetime Remaining**: The remaining lifetime of the filter. Enabled by default.
  - **Filter Use**: Filter usage time in hours. Enabled by default.
  - **Humidity**: The current humidity measured. Enabled by default.
  - **Motor Speed**: The current motor speed measured in rpm. Enabled by default.
  - **PM2.5**: The current particulate matter 2.5 measured. Enabled by default.
  - **Temperature**: The current temperature measured. Enabled by default.
  - **Illuminance**: The current illuminance measured on top of the device (0-200 lux). Enabled by default.
  - **Use Time**: The accumulative number of seconds the device has been in use. Disabled by default.

- Switch entities

| Switch     | Description                |
| ---------- | -------------------------- |
| Buzzer     | Turn on/off the buzzer     |
| Child Lock | Turn on/off the child lock |
| Learn Mode | Turn on/off the learn mode |
| LED        | Turn on/off the LED        |

### Air Purifier 2S (zhimi.airpurifier.mc1)

- Power (on, off)
- Operation modes (Auto, Silent, Favorite)
- Attributes (fan platform)
  - `extra_features`
  - `turbo_mode_supported`
  - `button_pressed`
- Number entities

| Number         | Description            |
| -------------- | ---------------------- |
| Favorite Level | Set the favorite level |

- Sensor entities
  - **Filter Lifetime Remaining**: The remaining lifetime of the filter. Enabled by default.
  - **Filter Use**: Filter usage time in hours. Enabled by default.
  - **Humidity**: The current humidity measured. Enabled by default.
  - **Motor Speed**: The current motor speed measured in rpm. Enabled by default.
  - **PM2.5**: The current particulate matter 2.5 measured. Enabled by default.
  - **Temperature**: The current temperature measured. Enabled by default.
  - **Use Time**: The accumulative number of seconds the device has been in use. Disabled by default.

- Switch entities

| Switch     | Description                |
| ---------- | -------------------------- |
| Buzzer     | Turn on/off the buzzer     |
| Child Lock | Turn on/off the child lock |
| Learn Mode | Turn on/off the learn mode |
| LED        | Turn on/off the LED        |

### Air Purifier 3/3H (2019) (zhimi.airpurifier.ma4, zhimi.airpurifier.mb3)

This model uses newer MiOT communication protocol.

- Power (on, off)
- Operation modes (Auto, Silent, Favorite, Fan)
- Attributes (fan platform)
  - `use_time`
- Number entities

| Number         | Description            |
| -------------- | ---------------------- |
| Fan Level      | Set the fan level      |
| Favorite Level | Set the favorite level |

- Select entities

| Select         | Description                                            |
| -------------- | ------------------------------------------------------ |
| LED Brightness | Controls the brightness of the LEDs (bright, dim, off) |

- Sensor entities
  - **Filter Lifetime Remaining**: The remaining lifetime of the filter. Enabled by default.
  - **Filter Use**: Filter usage time in hours. Enabled by default.
  - **Humidity**: The current humidity measured. Enabled by default.
  - **Motor Speed**: The current motor speed measured in rpm. Enabled by default.
  - **PM2.5**: The current particulate matter 2.5 measured. Enabled by default.
  - **Purify Volume**: The volume of purified air in cubic meter. Disabled by default.
  - **Temperature**: The current temperature measured. Enabled by default.
  - **Use Time**: The accumulative number of seconds the device has been in use. Disabled by default.

- Switch entities

| Switch     | Description                |
| ---------- | -------------------------- |
| Buzzer     | Turn on/off the buzzer     |
| Child Lock | Turn on/off the child lock |

### Air Purifier Pro H, Pro H EU (zhimi.airpurifier.va1, zhimi.airpurifier.vb2)

- Power (on, off)
- Operation modes (Auto, Silent, Favorite, Fan)
- Attributes (fan platform)
  - `use_time`
- Number entities

| Number         | Description            |
| -------------- | ---------------------- |
| Fan Level      | Set the fan level      |
| Favorite Level | Set the favorite level |

- Select entities

| Select         | Description                                            |
| -------------- | ------------------------------------------------------ |
| LED Brightness | Controls the brightness of the LEDs (bright, dim, off) |

- Sensor entities
  - **Filter Lifetime Remaining**: The remaining lifetime of the filter. Enabled by default.
  - **Filter Use**: Filter usage time in hours. Enabled by default.
  - **Humidity**: The current humidity measured. Enabled by default.
  - **Motor Speed**: The current motor speed measured in rpm. Enabled by default.
  - **PM2.5**: The current particulate matter 2.5 measured. Enabled by default.
  - **Purify Volume**: The volume of purified air in cubic meter. Disabled by default.
  - **Temperature**: The current temperature measured. Enabled by default.
  - **Use Time**: The accumulative number of seconds the device has been in use. Disabled by default.

- Switch entities

| Switch     | Description                |
| ---------- | -------------------------- |
| Buzzer     | Turn on/off the buzzer     |
| Child Lock | Turn on/off the child lock |

### Air Purifier 3C (zhimi.airpurifier.mb4, zhimi.airp.mb4a)

- Power (on, off)
- Operation modes (Auto, Silent, Favorite)
- Number entities

| Number               | Description                  |
| -------------------- | ---------------------------- |
| Favorite Motor Speed | Set the favorite motor speed |
| LED Brightness       | Set the LED brightness       |

- Sensor entities
  - **Filter Lifetime Remaining**: The remaining lifetime of the filter. Enabled by default.
  - **Filter Use**: Filter usage time in hours. Enabled by default.
  - **Motor Speed**: The current motor speed measured in rpm. Enabled by default.
  - **PM2.5**: The current particulate matter 2.5 measured. Enabled by default.

- Switch entities

| Switch     | Description                |
| ---------- | -------------------------- |
| Buzzer     | Turn on/off the buzzer     |
| Child Lock | Turn on/off the child lock |

### Air Purifier ZA1 (zhimi.airpurifier.za1)

- Power (on, off)
- Operation modes (Auto, Silent, Favorite)
- Number entities

| Number         | Description            |
| -------------- | ---------------------- |
| Favorite Level | Set the favorite level |

- Sensor entities
  - **Filter Lifetime Remaining**: The remaining lifetime of the filter. Enabled by default.
  - **Filter Use**: Filter usage time in hours. Enabled by default.
  - **Humidity**: The current humidity measured. Enabled by default.
  - **Motor Speed**: The current motor speed measured in rpm. Enabled by default.
  - **PM2.5**: The current particulate matter 2.5 measured. Enabled by default.
  - **Temperature**: The current temperature measured. Enabled by default.
  - **TVOC**: The current concentration of Total Organic Volatile Components. Enabled by default.

- Switch entities

| Switch     | Description                |
| ---------- | -------------------------- |
| Buzzer     | Turn on/off the buzzer     |
| Child Lock | Turn on/off the child lock |

- Select entities

| Select         | Description                                               |
| -------------- | --------------------------------------------------------- |
| LED Brightness | Controls the brightness of the Display (bright, dim, off) |

### Air Purifier V3 (zhimi.airpurifier.v3)

- Power (on, off)
- Operation modes (Auto, Silent, Favorite, Idle, Medium, High, Strong)
- Attributes (fan platform)
  - `sleep_time`
  - `sleep_mode_learn_count`
  - `extra_features`
  - `use_time`
  - `button_pressed`

- Sensor entities
  - **Filter Lifetime Remaining**: The remaining lifetime of the filter. Enabled by default.
  - **Filter Use**: Filter usage time in hours. Enabled by default.
  - **Illuminance**: The current illuminance measured. Enabled by default.
  - **Motor Speed**: The current motor speed measured in rpm. Enabled by default.
  - **PM2.5**: The current particulate matter 2.5 measured. Enabled by default.
  - **Purify Volume**: The volume of purified air in cubic meter. Disabled by default.
  - **Second Motor Speed**: The current second motor speed measured in rpm. Enabled by default.
  - **Use Time**: The accumulative number of seconds the device has been in use. Disabled by default.

- Switch entities

| Switch     | Description                |
| ---------- | -------------------------- |
| Buzzer     | Turn on/off the buzzer     |
| Child Lock | Turn on/off the child lock |
| LED        | Turn on/off the LED        |

### Air Purifier 4/4 PRO (zhimi.airp.mb5, zhimi.airp.vb4)

These models use newer MiOT communication protocol.

- Power (on, off)
- Operation modes (Auto, Silent, Favorite, Fan)
- Attributes (fan platform)
- Number entities

| Number         | Description            |
| -------------- | ---------------------- |
| Fan Level      | Set the fan level      |
| Favorite Level | Set the favorite level |

- Select entities

| Select         | Description                                               |
| -------------- | --------------------------------------------------------- |
| LED Brightness | Controls the brightness of the Display (bright, dim, off) |

- Sensor entities
  - **Filter Lifetime Remaining**: The remaining lifetime of the filter in %. Enabled by default.
  - **Filter Time Left**: The remaining lifetime of the filter in days. Enabled by default.
  - **Filter Use**: Filter usage time in hours. Enabled by default.
  - **Humidity**: The current humidity measured. Enabled by default.
  - **Motor Speed**: The current motor speed measured in rpm. Enabled by default.
  - **PM2.5**: The current particulate matter 2.5 measured. Enabled by default.
  - **PM10**: The current particulate matter 10 measured (4 PRO only). Enabled by default.
  - **Purify Volume**: The volume of purified air in cubic meter. Disabled by default.
  - **Temperature**: The current temperature measured. Enabled by default.

- Switch entities

| Switch     | Description                            |
| ---------- | -------------------------------------- |
| Buzzer     | Turn on/off the buzzer                 |
| Child Lock | Turn on/off the child lock             |
| Ionizer    | Turn on/off the negative ion generator |

### Air Fresh A1 (dmaker.airfresh.a1)

- Power (on, off)
- Operation modes (Auto, Sleep, Favorite)
- Binary sensor entities

| Binary sensor         | Description                            |
| --------------------- | -------------------------------------- |
| Auxiliary Heat Status | Indicates if the heater is actually on |

- Button entities

| Button            | Description                                             |
| ----------------- | ------------------------------------------------------- |
| Reset Dust Filter | Resets filter lifetimetime and usage of the dust filter |

- Sensor entities

| Sensor                              | Description                                 |
| ----------------------------------- | ------------------------------------------- |
| Carbon Dioxide                      | The current carbon dioxide in ppm           |
| Dust filter lifetime remaining      | The remaining lifetime of the filter        |
| Dust filter lifetime remaining days | The remaining lifetime of the filter in day |
| PM2.5                               | The current particulate matter 2.5          |
| Temperature                         | The current outside temperature             |
| Control Speed                       | The current motor speed in rpm              |
| Favorite Speed                      | The favorite motor speed in rpm             |

- Switch entities

| Switch         | Description              |
| -------------- | ------------------------ |
| Buzzer         | Turn on/off `buzzer`     |
| Child Lock     | Turn on/off `child lock` |
| Display        | Turn on/off `display`    |
| Auxiliary Heat | Turn on/off `heater`     |

### Air Fresh VA2

- Power (on, off)
- Operation modes (Auto, Silent, Interval, Low, Middle, Strong)
- Attributes (fan platform)
  - `use_time`
  - `extra_features`
- Sensor entities|
  - **Carbon Dioxide**: The current carbon dioxide measured in ppm. Enabled by default.
  - **Filter Lifetime Remaining**: The remaining lifetime of the filter. Enabled by default.
  - **Filter Use**: Filter usage time in hours. Enabled by default.
  - **Humidity**: The current humidity measured. Enabled by default.
  - **PM2.5**: The current particulate matter 2.5 measured. Enabled by default.
  - **Temperature**: The current temperature measured. Enabled by default.
  - **Use Time**: The accumulative number of seconds the device has been in use. Disabled by default.

- Select entities

| Select         | Description                                            |
| -------------- | ------------------------------------------------------ |
| LED Brightness | Controls the brightness of the LEDs (bright, dim, off) |

- Switch entities

| Switch     | Description              |
| ---------- | ------------------------ |
| Buzzer     | Turn on/off `buzzer`     |
| Child Lock | Turn on/off `child lock` |
| LED        | Turn on/off `led`        |

### Air Fresh VA4

- Power (on, off)
- Operation modes (Auto, Silent, Interval, Low, Middle, Strong)
- Attributes (fan platform)
  - `use_time`
  - `extra_features`
- Sensor entities

| Sensor                    | Description                                                   | Enabled by default |
| ------------------------- | ------------------------------------------------------------- | ------------------ |
| Carbon Dioxide            | The current carbon dioxide measured in ppm                    | True               |
| Filter Lifetime Remaining | The remaining lifetime of the filter                          | True               |
| Filter Use                | Filter usage time in hours                                    | True               |
| Humidity                  | The current humidity measured                                 | True               |
| PM2.5                     | The current particulate matter 2.5 measured                   | True               |
| Temperature               | The current temperature measured                              | True               |
| Use Time                  | The accumulative number of seconds the device has been in use | False              |

- Select entities

| Select         | Description                                            |
| -------------- | ------------------------------------------------------ |
| LED Brightness | Controls the brightness of the LEDs (bright, dim, off) |

- Switch entities

| Switch         | Description              |
| -------------- | ------------------------ |
| Buzzer         | Turn on/off `buzzer`     |
| Child Lock     | Turn on/off `child lock` |
| LED            | Turn on/off `led`        |
| Auxiliary Heat | Turn on/off `heater`     |

### Air Fresh T2017 (dmaker.airfresh.t2017)

- Power (on, off)
- Operation modes (Auto, Sleep, Favorite)
- Binary sensor entities
  - **Auxiliary Heat Status**: Indicates if the heater is actually on

- Button entities
  - **Reset Dust Filter**: Resets filter lifetime and usage of the dust filter
  - **Reset Upper Filter**: Resets filter lifetime and usage of the upper filter

- Select entities
  - **Auxiliary Heat Level**: Controls the level of the heater (Low, Medium, High)
  - **Display Orientation**: Controls the orientation of the display (Forward, Left, Right)

- Sensor entities
  - **Carbon Dioxide**: The current carbon dioxide in ppm
  - **Dust filter lifetime remaining**: The remaining lifetime of the dust filter
  - **Dust filter lifetime remaining days**: The remaining lifetime of the dust filter in days
  - **Upper filter lifetime remaining**: The remaining lifetime of the upper filter
  - **Upper filter lifetime remaining days**: The remaining lifetime of the upper filter in days
  - **PM2.5**: The current particulate matter 2.5
  - **Temperature**: The current outside temperature
  - **Control Speed**: The current motor speed in rpm
  - **Favorite Speed**: The favorite motor speed in rpm

- Switch entities

| Switch         | Description              |
| -------------- | ------------------------ |
| Buzzer         | Turn on/off `buzzer`     |
| Child Lock     | Turn on/off `child lock` |
| Display        | Turn on/off `display`    |
| Auxiliary Heat | Turn on/off `heater`     |

### Air Humidifier (zhimi.humidifier.v1)

- On, Off
- Operation modes (Silent, Medium, High, Strong)
- Target humidity (30, 40, 50, 60, 70, 80)
- Attributes (humidifier platform)

| Attribute         | Description                               |
| ----------------- | ----------------------------------------- |
| `available_modes` | A list with the operation modes available |
| `humidity`        | The current target humidity               |
| `max_humidity`    | The maximum settable target humidity      |
| `min_humidity`    | The minimum settable target humidity      |
| `mode`            | The current operation mode selected       |

- Binary sensor entities

| Binary sensor | Description                                          |
| ------------- | ---------------------------------------------------- |
| Water Tank    | Indicates whether the water tank is connected or not |

- Select entities

| Select         | Description                                            |
| -------------- | ------------------------------------------------------ |
| LED Brightness | Controls the brightness of the LEDs (bright, dim, off) |

- Sensor entities
  - **Humidity**: The current humidity measured. Enabled by default.
  - **Temperature**: The current temperature measured. Enabled by default.
  - **Use Time**: The accumulative number of seconds the device has been in use. Disabled by default.
  - **Water Level**: The current water level percentage measured. Enabled by default.

- Switch entities

| Switch     | Description                |
| ---------- | -------------------------- |
| Buzzer     | Turn on/off the buzzer     |
| Child Lock | Turn on/off the child lock |

### Air Humidifier CA (zhimi.humidifier.ca1)

- On, Off
- Operation modes (Silent, Medium, High, Auto)
- Target humidity (30, 40, 50, 60, 70, 80)
- Attributes (humidifier platform)

| Attribute         | Description                               |
| ----------------- | ----------------------------------------- |
| `available_modes` | A list with the operation modes available |
| `humidity`        | The current target humidity               |
| `max_humidity`    | The maximum settable target humidity      |
| `min_humidity`    | The minimum settable target humidity      |
| `mode`            | The current operation mode selected       |

- Binary sensor entities

| Binary sensor | Description                                          |
| ------------- | ---------------------------------------------------- |
| Water Tank    | Indicates whether the water tank is connected or not |

- Select entities

| Select         | Description                                            |
| -------------- | ------------------------------------------------------ |
| LED Brightness | Controls the brightness of the LEDs (bright, dim, off) |

- Sensor entities
  - **Humidity**: The current humidity measured. Enabled by default.
  - **Temperature**: The current temperature measured. Enabled by default.
  - **Use Time**: The accumulative number of seconds the device has been in use. Disabled by default.
  - **Water Level**: The current water level percentage measured. Enabled by default.

- Switch entities

| Switch     | Description                |
| ---------- | -------------------------- |
| Buzzer     | Turn on/off the buzzer     |
| Child Lock | Turn on/off the child lock |
| Dry Mode   | Turn on/off the dry mode   |

### Air Humidifier CA (zhimi.humidifier.ca4)

- On, Off
- Operation modes (Auto, Low, Medium, High)
- Target humidity (30 - 80)
- Attributes (humidifier platform)

| Attribute         | Description                               |
| ----------------- | ----------------------------------------- |
| `available_modes` | A list with the operation modes available |
| `humidity`        | The current target humidity               |
| `max_humidity`    | The maximum settable target humidity      |
| `min_humidity`    | The minimum settable target humidity      |
| `mode`            | The current operation mode selected       |

- Binary sensor entities

| Binary sensor | Description                                          |
| ------------- | ---------------------------------------------------- |
| Water Tank    | Indicates whether the water tank is connected or not |

- Number entities

| Number      | Description         |
| ----------- | ------------------- |
| Motor Speed | Set the motor speed |

- Select entities

| Select         | Description                                            |
| -------------- | ------------------------------------------------------ |
| LED Brightness | Controls the brightness of the LEDs (bright, dim, off) |

- Sensor entities
  - **Actual Speed**: The current motor speed measured in rpm. Enabled by default.
  - **Humidity**: The current humidity measured. Enabled by default.
  - **Temperature**: The current temperature measured. Enabled by default.
  - **Use Time**: The accumulative number of seconds the device has been in use. Disabled by default.
  - **Water Level**: The current water level percentage measured. Enabled by default.

- Switch entities

| Switch     | Description                |
| ---------- | -------------------------- |
| Buzzer     | Turn on/off the buzzer     |
| Child Lock | Turn on/off the child lock |
| Clean Mode | Turn on/off the clean mode |
| Dry Mode   | Turn on/off the dry mode   |

{% note %}
Clean mode and Motor speed can only be set when the device is turned on.
{% endnote %}

### Air Humidifier CB (zhimi.humidifier.cb1)

- On, Off
- Operation modes (Silent, Medium, High, Auto)
- Target humidity (30, 40, 50, 60, 70, 80)
- Attributes (humidifier platform)

| Attribute         | Description                               |
| ----------------- | ----------------------------------------- |
| `available_modes` | A list with the operation modes available |
| `humidity`        | The current target humidity               |
| `max_humidity`    | The maximum settable target humidity      |
| `min_humidity`    | The minimum settable target humidity      |
| `mode`            | The current operation mode selected       |

- Binary sensor entities

| Binary sensor | Description                                          |
| ------------- | ---------------------------------------------------- |
| Water Tank    | Indicates whether the water tank is connected or not |

- Select entities

| Select         | Description                                            |
| -------------- | ------------------------------------------------------ |
| LED Brightness | Controls the brightness of the LEDs (bright, dim, off) |

- Sensor entities
  - **Humidity**: The current humidity measured. Enabled by default.
  - **Temperature**: The current temperature measured. Enabled by default.
  - **Use Time**: The accumulative number of seconds the device has been in use. Disabled by default.
  - **Water Level**: The current water level percentage measured. Enabled by default.

- Switch entities

| Switch     | Description                |
| ---------- | -------------------------- |
| Buzzer     | Turn on/off the buzzer     |
| Child Lock | Turn on/off the child lock |
| Dry Mode   | Turn on/off the dry mode   |

### Air Humidifier JSQ/JSQ1/MJJSQ (deerma.humidifier.jsq, deerma.humidifier.jsq1, deerma.humidifier.mjjsq)

- On, Off
- Operation modes (low, medium, high, humidity)
- Target humidity (30, 40, 50, 60, 70, 80)
- Attributes (humidifier platform)

| Attribute         | Description                               |
| ----------------- | ----------------------------------------- |
| `available_modes` | A list with the operation modes available |
| `humidity`        | The current target humidity               |
| `max_humidity`    | The maximum settable target humidity      |
| `min_humidity`    | The minimum settable target humidity      |
| `mode`            | The current operation mode selected       |

- Binary sensor entities

| Binary sensor    | Description                                          |
| ---------------- | ---------------------------------------------------- |
| Water Tank       | Indicates whether the water tank is connected or not |
| Water Tank Empty | Indicates whether the water tank is empty or not     |

- Sensor entities|
  - **Humidity**: The current humidity measured. Enabled by default.
  - **Temperature**: The current temperature measured. Enabled by default.
  - **Use Time**: The accumulative number of seconds the device has been in use. Disabled by default.

- Switch entities

| Switch | Description            |
| ------ | ---------------------- |
| Buzzer | Turn on/off the buzzer |
| LED    | Turn on/off the LED    |

### Standing Fan 1X (dmaker.fan.p5)

- Power (on, off)
- Operation modes (Normal, Nature)
- Oscillation (on, off)
- Number entities

| Number              | Description                            |
| ------------------- | -------------------------------------- |
| Delay Off Countdown | Set the delay off countdown in minutes |
| Oscillation Angle   | Set the oscillation angle in degrees   |

- Switch entities

| Switch     | Description              |
| ---------- | ------------------------ |
| Buzzer     | Turn on/off `buzzer`     |
| Child Lock | Turn on/off `child lock` |
| LED        | Turn on/off `led`        |

### Standing Fan (zhimi.fan.za1, zhimi.fan.za3, zhimi.fan.za4, zhimi.fan.sa1)

- Power (on, off)
- Operation modes (Normal, Nature)
- Oscillation (on, off)
- Number entities

| Number              | Description                            |
| ------------------- | -------------------------------------- |
| Delay Off Countdown | Set the delay off countdown in minutes |
| Oscillation Angle   | Set the oscillation angle in degrees   |

- Select entities

| Select         | Description                                            |
| -------------- | ------------------------------------------------------ |
| LED Brightness | Controls the brightness of the LEDs (bright, dim, off) |

- Switch entities

| Switch     | Description              |
| ---------- | ------------------------ |
| Buzzer     | Turn on/off `buzzer`     |
| Child Lock | Turn on/off `child lock` |

### DC Pedestal Fan (zhimi.fan.v2, zhimi.fan.v3)

- Power (on, off)
- Operation modes (Normal, Nature)
- Oscillation (on, off)
- Number entities

| Number              | Description                            |
| ------------------- | -------------------------------------- |
| Delay Off Countdown | Set the delay off countdown in minutes |
| Oscillation Angle   | Set the oscillation angle in degrees   |

- Select entities

| Select         | Description                                            |
| -------------- | ------------------------------------------------------ |
| LED Brightness | Controls the brightness of the LEDs (bright, dim, off) |

- Sensor entities

| Sensor      | Description                             |
| ----------- | --------------------------------------- |
| Battery     | The current battery level in percentage |
| Humidity    | The current humidity measured           |
| Temperature | The current temperature measured        |

- Switch entities

| Switch     | Description              |
| ---------- | ------------------------ |
| Buzzer     | Turn on/off `buzzer`     |
| Child Lock | Turn on/off `child lock` |

### Standing Fan 1C (dmaker.fan.1c)

- Power (on, off)
- Operation modes (Normal, Nature)
- Oscillation (on, off)
- Number entities

| Number              | Description                            |
| ------------------- | -------------------------------------- |
| Delay Off Countdown | Set the delay off countdown in minutes |

- Switch entities

| Switch     | Description                |
| ---------- | -------------------------- |
| Buzzer     | Turn on/off the Buzzer     |
| Child Lock | Turn on/off the Child Lock |
| LED        | Turn on/off the LED        |

### Tower Fan/Standing Fan 2/Standing Fan Pro (dmaker.fan.p9, dmaker.fan.p10, dmaker.fan.p11, dmaker.fan.p18)

- Power (on, off)
- Operation modes (Normal, Nature)
- Oscillation (on, off)
- Number entities

| Number              | Description                            |
| ------------------- | -------------------------------------- |
| Delay Off Countdown | Set the delay off countdown in minutes |
| Oscillation Angle   | Set the oscillation angle in degrees   |

- Switch entities

| Switch     | Description                |
| ---------- | -------------------------- |
| Buzzer     | Turn on/off the Buzzer     |
| Child Lock | Turn on/off the Child Lock |
| LED        | Turn on/off the LED        |

### Standing Fan 3 (zhimi.fan.za5)

- Power (on, off)
- Operation modes (Normal, Nature)
- Oscillation (on, off)
- Binary sensor entities

| Binary sensor | Description                                            |
| ------------- | ------------------------------------------------------ |
| Power Supply  | Indicates whether the power supply is connected or not |

- Number entities

| Number              | Description                            |
| ------------------- | -------------------------------------- |
| Delay Off Countdown | Set the delay off countdown in minutes |
| LED Brightness      | Set the LED brightness                 |
| Oscillation Angle   | Set the oscillation angle in degrees   |

- Sensor entities

| Sensor      | Description                      |
| ----------- | -------------------------------- |
| Humidity    | The current humidity measured    |
| Temperature | The current temperature measured |

- Switch entities

| Switch     | Description                |
| ---------- | -------------------------- |
| Buzzer     | Turn on/off the Buzzer     |
| Child Lock | Turn on/off the Child Lock |
| Ionizer    | Turn on/off the Ionizer    |

### Actions

### Action `humidifier.set_humidity`

Set the target humidity.

| Data attribute | Optional | Description                                           |
| ---------------------- | -------- | ----------------------------------------------------- |
| `entity_id`            | no       | Only act on a specific Xiaomi miIO humidifier entity. |
| `humidity`             | no       | Target humidity                                       |

### Action `humidifier.set_mode`

Set the humidifier operation mode.

| Data attribute | Optional | Description                                           |
| ---------------------- | -------- | ----------------------------------------------------- |
| `entity_id`            | no       | Only act on a specific Xiaomi miIO humidifier entity. |
| `mode`                 | no       | The Xiaomi miIO operation mode                        |

### Action `fan.set_percentage`

Set the fan speed percentage.

| Data attribute | Optional | Description                                    |
| ---------------------- | -------- | ---------------------------------------------- |
| `entity_id`            | no       | Only act on a specific Xiaomi miIO fan entity. |
| `percentage`           | no       | Fan speed. Percentage speed setting            |

### Action `fan.set_preset_mode`

Set the fan operation mode.

| Data attribute | Optional | Description                                    |
| ---------------------- | -------- | ---------------------------------------------- |
| `entity_id`            | no       | Only act on a specific Xiaomi miIO fan entity. |
| `preset_mode`          | no       | The Xiaomi miIO operation mode                 |

### Action `xiaomi_miio.fan_reset_filter` (Air Purifier 2 only)

Reset the filter lifetime and usage.

| Data attribute | Optional | Description                                    |
| ---------------------- | -------- | ---------------------------------------------- |
| `entity_id`            | no       | Only act on a specific Xiaomi miIO fan entity. |

### Action `xiaomi_miio.fan_set_extra_features` (Air Purifier only)

Set the extra features.

| Data attribute | Optional | Description                                    |
| ---------------------- | -------- | ---------------------------------------------- |
| `entity_id`            | no       | Only act on a specific Xiaomi miIO fan entity. |
| `features`             | no       | Integer, known values are 0 and 1.             |

## Xiaomi Air Quality Monitor

The `xiaomi_miio` Air Quality Monitor is observing your Xiaomi Mi Air Quality Monitor (PM2.5) and reporting the air quality index and other values.

Currently, the supported features are:

- Air Quality Index (AQI)
- Particulate matter 2.5
- Attributes
  - power
  - charging
  - battery
  - time_stat
  - carbon_dioxide_equivalent
  - total_volatile_organic_compounds
  - temperature
  - humidity

## Xiaomi IR Remote

The `xiaomi miio` remote platform allows you to send IR commands from your Xiaomi IR Remote (ChuangmiIr).

### Setup

Please follow the instructions on [Retrieving the Access Token](/integrations/xiaomi_miio/#retrieving-the-access-token) to get the API token to use in the {% term "`configuration.yaml`" %} file.

### Configuring the Platform

To add a Xiaomi IR Remote to your installation, add the following to your {% term "`configuration.yaml`" %} file:

```yaml
remote:
  - platform: xiaomi_miio
    host: 192.168.42.42
    token: YOUR_TOKEN
```

{% configuration %}
host:
  description: The IP of your remote.
  required: true
  type: string
token:
  description: The API token of your remote.
  required: true
  type: string
name:
  description: The name of your remote.
  required: false
  type: string
slot:
  description: The slot used to save learned command.
  required: false
  type: integer
  default: 1
timeout:
  description: Timeout for learning a new command.
  required: false
  type: integer
  default: 30
commands:
  description: A list of commands
  required: false
  type: map
  keys:
    command:
      description: A list of commands as [raw (learned command)](/integrations/xiaomi_miio/#raw) or [pronto hex code](/integrations/xiaomi_miio/#pronto-hex-code).
      required: true
      type: list
{% endconfiguration %}

### Full Configuration

```yaml
remote:
  - platform: xiaomi_miio
    name: "bathroom remote"
    host: 192.168.42.42
    token: YOUR_TOKEN
    slot: 1
    timeout: 30
    commands:
      activate_towel_heater:
        command:
          - raw:base64:[optional_frequency]
      read_bad_poem:
        command:
          - raw:base64:[optional_frequency]
          - pronto:pronto_hex:[optional_repeat]
```

### Add command as entity button to a dashboard

```yaml
type: entity-button
tap_action:
  action: call-service
  action: remote.send_command
  data:
    command: activate_towel_heater
    entity_id: remote.xiaomi_miio_ir
hold_action:
  action: more-info
show_icon: true
show_name: true
entity: remote.xiaomi_miio_ir
icon: "mdi:radiator"
name: Activate Towel Heater
```

### Use named commands to create UI buttons

```yaml
script:
  towel_heater:
    sequence:
      - action: remote.send_command
        target:
          entity_id: "remote.bathroom_remote"
        data:
          command:
            - "activate_towel_heater"
  please_cover_your_ears:
    sequence:
      - action: remote.send_command
        target:
          entity_id: "remote.bathroom_remote"
        data:
          command:
            - "read_bad_poem"
```

### Command Types

The Xiaomi IR Remote Platform currently supports two different formats for IR codes.

### Raw

A raw command is a command learned from [`xiaomi_miio.remote_learn_command`](/integrations/xiaomi_miio/#xiaomi_miioremote_learn_command).

A raw command is defined as in the following example:

```bash
raw:Z6UFANEAAAAjAQAAAwkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQIAE=
```

with an optional last parameter of frequency:

```bash
raw:Z6UFANEAAAAjAQAAAwkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQIAE=:38400
```

### Pronto Hex Code

A pronto hex code is a hex code often supplied by the device manufacturer.

A pronto hex code is defined as in the following example:

```bash
pronto:0000 006C 0022 0002 015B 00AD 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0041 0016 0041 0016 0041 0016 0041 0016 0041 0016 0041 0016 0041 0016 0016 0016 0016 0016 0041 0016 0016 0016 0041 0016 0016 0016 0016 0016 0016 0016 0016 0016 0041 0016 0016 0016 0041 0016 0016 0016 0041 0016 0041 0016 0041 0016 0041 0016 0623 015B 0057 0016 0E6E
```

with an optional last parameter of repeats (required by some devices):

```bash
pronto:0000 006C 0022 0002 015B 00AD 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0041 0016 0041 0016 0041 0016 0041 0016 0041 0016 0041 0016 0041 0016 0016 0016 0016 0016 0041 0016 0016 0016 0041 0016 0016 0016 0016 0016 0016 0016 0016 0016 0041 0016 0016 0016 0041 0016 0016 0016 0041 0016 0041 0016 0041 0016 0041 0016 0623 015B 0057 0016 0E6E:2
```

Note there are at least 4 versions of the Xiaomi IR Remote (ChuangmiIr) which can be recognized by their default hostname:

- `chuangmi.ir.v2`
- `chuangmi.remote.h102a03`
- `chuangmi.remote.v2`
- `chuangmi.remote.h102c01`

For now, pronto hex codes only work on the first version (`chuangmi.ir.v2`).

### Actions

The Xiaomi IR Remote Platform registers four actions.

### `remote.send_command`

Allows sending either named commands using an identifier or sending commands as one of the two types defined in [Command Types](/integrations/xiaomi_miio/#command-types).

### `xiaomi_miio.remote_learn_command`

Used to learn new commands.

Use the entity_id of the Xiaomi IR Remote to start a learning process.

`slot` and `timeout` can be specified, but multiple commands learned to the same slot can still be sent using [`remote.send_command`](/integrations/xiaomi_miio/#remotesend_command) even if they are overwritten.

After learning the command the base64 string can be found as a notification in Overview, the string can be copied by left clicking on the string and choose the copy option.

### `xiaomi_miio.remote_set_led_on`

Used to turn remote's blue LED on.

### `xiaomi_miio.remote_set_led_off`

Used to turn remote's blue LED off.

## Xiaomi Mi Robot Vacuum

The `xiaomi_miio` vacuum platform allows you to control the state of your [Xiaomi Mi Robot Vacuum](https://www.mi.com/roomrobot/).

Currently supported actions are:

- `start`
- `pause`
- `stop`
- `return_to_base`
- `locate`
- `clean_spot`
- `set_fan_speed`
  Fan speeds: `Silent`, `Standard`, `Medium`, `Turbo` and `Gentle` (exclusively for mopping).
- `xiaomi_clean_zone`
- `xiaomi_clean_segment`
- `xiaomi_goto`
- `remote_control_*` (of your robot)

### Actions

In addition to all of the actions provided by the `vacuum` {% term integration %} (`start`, `pause`, `stop`, `return_to_base`, `locate`, `set_fan_speed` and `send_command`), the `xiaomi_miio` platform introduces specific actions to access the remote control mode of the robot. These are:

- `xiaomi_miio.vacuum_clean_zone`
- `xiaomi_miio.vacuum_clean_segment`
- `xiaomi_miio.vacuum_goto`
- `xiaomi_miio.vacuum_remote_control_start`
- `xiaomi_miio.vacuum_remote_control_stop`
- `xiaomi_miio.vacuum_remote_control_move`
- `xiaomi_miio.vacuum_remote_control_move_step`

### Action `xiaomi_miio.vacuum_clean_zone`

Start the cleaning operation in the areas selected for the number of repeats indicated.

- **Data attribute**: `entity_id`
  - **Description**: Only act on a specific robot.
  - **Optional**: No.

- **Data attribute**: `zone`
  - **Description**: List of zones. Each zone is an array of four integer values. These values represent two sets of x- and y-axis coordinates that describe the beginning and ending points of a square or rectangle cleaning zone. For example, `[[23510,25311,25110,26361]]` creates a box that starts in one corner at the 23510, 25311 (x- and y-axis) coordinates and then is expanded diagonally to the 25110, 26361 coordinates to create a rectangular cleaning zone.
  - **Optional**: No.

- **Data attribute**: `repeats`
  - **Description**: Number of cleaning repeats for each zone between 1 and 3.
  - **Optional**: No.

Example of `xiaomi_miio.vacuum_clean_zone` use:

Inline array:
{% raw %}

```yaml
automation:
  - alias: "Test vacuum zone3"
    triggers:
      - trigger: homeassistant
        event: start
    actions:
      - action: xiaomi_miio.vacuum_clean_zone
        target:
          entity_id: vacuum.xiaomi_vacuum
        data:
          repeats: "{{states('input_number.vacuum_passes')|int}}"
          zone: [[30914, 26007, 35514, 28807], [20232, 22496, 26032, 26496]]
```

{% endraw %}

Array with inline zone:
{% raw %}

```yaml
automation:
  - alias: "Test vacuum zone3"
    triggers:
      - trigger: homeassistant
        event: start
    actions:
      - action: xiaomi_miio.vacuum_clean_zone
        target:
          entity_id: vacuum.xiaomi_vacuum
        data:
          repeats: "{{states('input_number.vacuum_passes')|int}}"
          zone:
            - [30914, 26007, 35514, 28807]
            - [20232, 22496, 26032, 26496]
```

{% endraw %}

Array mode:

```yaml
automation:
  - alias: "Test vacuum zone3"
    triggers:
      - trigger: homeassistant
        event: start
    actions:
      - action: xiaomi_miio.vacuum_clean_zone
        target:
          entity_id: vacuum.xiaomi_vacuum
        data:
          repeats: 1
          zone:
            - - 30914
              - 26007
              - 35514
              - 28807
            - - 20232
              - 22496
              - 26032
              - 26496
```

### Action `xiaomi_miio.vacuum_clean_segment`

Clean the specified segment/room. A room is identified by a number. Instructions on how to find the valid room numbers and determine what rooms they map to, read the section [Retrieving room numbers](#retrieving-room-numbers).

- **Data attribute**: `entity_id`
  - **Description**: Only act on a specific robot.
  - **Optional**: No.
- **Data attribute**: `segments`
  - **Description**: List of segment numbers or one single segment number.
  - **Optional**: No.

Example of `xiaomi_miio.vacuum_clean_segment` use:

Multiple segments:

```yaml
automation:
  - alias: "Vacuum kitchen and living room"
    triggers:
      - trigger: homeassistant
        event: start
    actions:
      - action: xiaomi_miio.vacuum_clean_segment
        target:
          entity_id: vacuum.xiaomi_vacuum
        data:
          segments: [1, 2]
```

Single segment:

```yaml
automation:
  - alias: "Vacuum kitchen"
    triggers:
      - trigger: homeassistant
        event: start
    actions:
      - action: xiaomi_miio.vacuum_clean_segment
        target:
          entity_id: vacuum.xiaomi_vacuum
        data:
          segments: 1
```

The original app for Xiaomi vacuum has a nice feature of room cleaning with repetition, you can achieve the same result with repeating segments:

```yaml
automation:
  - alias: "Vacuum kitchen"
    triggers:
      - trigger: homeassistant
        event: start
    actions:
      - action: xiaomi_miio.vacuum_clean_segment
        target:
          entity_id: vacuum.xiaomi_vacuum
        data:
          segments: [1, 1]
```

### Action `xiaomi_miio.vacuum_goto`

Go the specified coordinates.

- **Data attribute**: `entity_id`
  - **Description**: Only act on a specific robot.
  - **Optional**: No.
- **Data attribute**: `x_coord`
  - **Description**: X-coordinate, integer value. The dock is located at x-coordinate 25500.
  - **Optional**: No.
- **Data attribute**: `y_coord`
  - **Description**: Y-coordinate, integer value. The dock is located at y-coordinate 25500.
  - **Optional**: No.

Note: If your vacuum is in motion and does not respond to the `xiaomi_miio.vacuum_goto` command, call the `vacuum.pause` or `vacuum.stop` action first.

### Action `xiaomi_miio.vacuum_remote_control_start`

Start the remote control mode of the robot. You can then move it with `remote_control_move`; when done, call `remote_control_stop`.

| Data attribute | Optional | Description                  |
| ---------------------- | -------- | ---------------------------- |
| `entity_id`            | no       | Only act on a specific robot |

### Action `xiaomi_miio.vacuum_remote_control_stop`

Exit the remote control mode of the robot.

| Data attribute | Optional | Description                  |
| ---------------------- | -------- | ---------------------------- |
| `entity_id`            | no       | Only act on a specific robot |

### Action `xiaomi_miio.vacuuNm_remote_control_move`

Remote control the robot. Please ensure you first set it in remote control mode with `remote_control_start`.

- `entity_id`: Only act on a specific robot. Not optional.
- `velocity`: Speed: between -0.29 and 0.29. Not optional.
- `rotation`: Rotation: between -179 degrees and 179 degrees. Not optional.
- `duration`: The number of milliseconds that the robot should move for. Not optional.

### Action `xiaomi_miio.vacuum_remote_control_move_step`

Enter remote control mode, make one move, stop, and exit remote control mode.

- **entity_id**: Only act on a specific robot. Not optional.
- **velocity**: Speed: between -0.29 and 0.29. Not optional.
- **rotation**: Rotation: between -179 degrees and 179 degrees. Not optional.
- **duration**: The number of milliseconds that the robot should move for. Not optional.

### Buttons

| Button             | Description                                                         |
| ------------------ | ------------------------------------------------------------------- |
| Reset Main Brush   | Resets main brush remaining lifespan                                |
| Reset Side Brush   | Resets side brush remaining lifespan                                |
| Reset Filter       | Resets filter remaining lifespan                                    |
| Reset Sensor Dirty | Resets sensor dirtiness (remaining time before needs to be cleaned) |

### Sensors

{% configuration_basic %}
DnD Start*:
  description: The timestamp when the next DnD (Do not disturb) period will start
DnD End*:
  description: The timestamp when the current or next DnD (Do not disturb) period will end
Total duration*:
  description: The total cleaning duration in seconds
Total Clean Area*:
  description: The total cleaning area in square meters
Total Clean Count*:
  description: The total amount of times a clean cycle has been ran
Total Dust Collection Count*:
  description: The total amount of dust that has been collected
Filter Left*:
  description: How long the filter can be used in seconds
Main Brush Left*:
  description: How long the main brush can be used in seconds
Sensor Dirty Left*:
  description: How long the sensor can be used in seconds
Current Clean Time:
  description: The current cleaning time of the vacuum. If the vacuum is not cleaning, this sensor will have the same value as the "Last Clean Duration" sensor.
Current Clean Area:
  description: The current area that has been cleaned. If the vacuum is not cleaning, this sensor will have the same value as the "Last Clean Area" sensor.
Last Clean Area*:
  description: The last cleaned area in square meters
Last Clean Duration\*:
  description: The last clean duration in seconds
Last Clean End:
  description: The last clean end time as a timestamp
Last Clean Start:
  description: The last clean start time as a timestamp
Mop Attached**:
  description: If the mop is attached
Water Box Attached**:
  description: If the watter box is attached
Water Shortage\*\*:
  description: If the water box is low on water
{% endconfiguration_basic %}

{% note %}
\* Needs to be manually enabled once the {% term integration %} has been added. <br>
\*\* Only enabled if the vacuum has a mop.
{% endnote %}

### Attributes

The vacuums from the `xiaomi` platform does not expose additional attributes other the ones provided by [the `vacuum` integration](/integrations/vacuum/#attributes),

### Example on how to clean a specific room

Example script using [`vacuum.send_command`](/integrations/vacuum/) to clean a specific room:

```yaml
vacuum_kitchen:
  alias: "Clean the kitchen"
  sequence:
    - action: vacuum.send_command
      target:
        entity_id: vacuum.xiaomi_vacuum_cleaner
      data:
        command: app_segment_clean
        params: [18]
```

Where params specify room numbers, for multiple rooms, params can be specified like `[17,18]`. Instructions on how to find the valid room numbers and determine what rooms they map to, read the section [Retrieving room numbers](#retrieving-room-numbers).

### Example on how to reset maintenance hours (brushes, filter, sensors)

The vacuum entity stores attribute values for when brushes, filters and sensors need to be
cleaned or replaced (`main_brush_left`, `side_brush_left`, `filter_left` and
`sensor_dirty_left`). The values are measured in hours. Once the parts are cleaned
or replaced you can then reset those values on the vacuum. Here is an example script using
[`vacuum.send_command`](/integrations/vacuum/) to reset the hours for the main brush:

```yaml
reset_main_brush_left:
  alias: "Reset hours for main brush replacement"
  sequence:
    - action: vacuum.send_Command
      target:
        entity_id: vacuum.xiaomi_vacuum_cleaner
      data:
        command: reset_consumable
        params: ["main_brush_work_time"]
```

Allowed `params` for the `reset_consumable` command:

- `['main_brush_work_time']`
- `['side_brush_work_time']`
- `['filter_work_time']`
- `['sensor_dirty_time']`

### Retrieving Zoned Cleaning Coordinates

### Using FloleVac (Android)

1. Download [FloleVac](https://play.google.com/store/apps/details?id=de.flole.xiaomi)
2. Login with your Xiaomi credentials
3. Open Map (make sure you're on the same network as your vacuum cleaner)
4. Select "Zone cleanup" and draw a box around the zone you'd like to clean
5. Long press "Cleanup" and the zone coordinates will be copied to your clipboard

### Using RoboRock Control Center (requires Valetudo firmware)

[RRCC](https://github.com/LazyT/rrcc) supports both rooted and non-rooted Vacuums and acts as a mostly fully featured replacement for Mi Home that works locally without the cloud. If you have installed the rooted firmware [Valetudo](https://github.com/Hypfer/Valetudo) you are able to SSH into your Vacuum and enable MQTT plus use map functions with no cloud requirement.

Using the map editor you are able to acquire the coordinates required for zoned clean up. Here is an example script for zoned clean up:

```yaml
vacuum_kitchen:
  alias: "vacuum kitchen"
  sequence:
    - action: vacuum.send_command
      target:
        entity_id: "vacuum.xiaomi_vacuum_cleaner"
      data:
        command: app_zoned_clean
        params: [[23084, 26282, 27628, 29727, 1]]
```

### Retrieving Room numbers

Valid room numbers can be retrieved using miio command-line tool:

```bash
miiocli roborockvacuum --ip <ip of the vacuum> --token <your vacuum token> get_room_mapping
```

It will return the full mapping of room numbers to user-defined names as a list of (number,name) tuples.
Alternatively, one can just test the `clean_segment` action with a number and see which room it cleans.

It seems to be the case that Numbers 1..15 are used to number the initial segmentation done by the vacuum cleaner itself. Numbers 16 and upwards numbers rooms from the users manual editing.

## Xiaomi Philips Light

The `xiaomi_miio` platform allows you to control the state of your Xiaomi Philips LED Ball Lamp, Xiaomi Philips Zhirui LED Bulb E14 Candle Lamp, Xiaomi Philips Zhirui Downlight, Xiaomi Philips LED Ceiling Lamp, Xiaomi Philips Eyecare Lamp 2, Xiaomi Philips Moonlight Bedside Lamp and Philips Zhirui Desk Lamp.

### Features

### Philips LED Ball Lamp, Philips Zhirui LED Candle Lamp and Philips Zhirui Downlight

Supported models: `philips.light.bulb`, `philips.light.candle`, `philips.light.candle2`, `philips.light.downlight`

- Power (on, off)
- Brightness
- Color temperature (175...333 mireds)
- Scene (1, 2, 3, 4)
- Delayed turn off (Resolution in seconds)
- Attributes
  - model
  - scene
  - delayed_turn_off

### Philips LED Ceiling Lamp

Supported models: `philips.light.ceiling`, `philips.light.zyceiling`

- Power (on, off)
- Brightness
- Color temperature (175...370 mireds)
- Scene (1, 2, 3, 4)
- Night light mode (on, off)
- Delayed turn off (Resolution in seconds)
- Attributes
  - model
  - scene
  - delayed_turn_off
  - night_light_mode
  - automatic_color_temperature

### Philips Eyecare Smart Lamp 2

Supported models: `philips.light.sread1`

- Eyecare light (on, off)
- Ambient light (on, off)
- Brightness (of each light)
- Scene (1, 2, 3, 4)
- Night light mode (on, off)
- Delayed turn off (Resolution in seconds)
- Eye fatigue reminder / notification (on, off)
- Eyecare mode (on, off)
- Attributes
  - model
  - scene
  - delayed_turn_off
  - night_light_mode
  - reminder
  - eyecare_mode

### Philips Zhirui Desk Lamp

Supported models: `philips.light.mono1`

- Power (on, off)
- Brightness
- Scene (1, 2, 3, 4)
- Delayed turn off (Resolution in seconds)
- Attributes
  - model
  - scene
  - delayed_turn_off

### Philips Moonlight Bedside Lamp

Supported models: `philips.light.moonlight`

- Power (on, off)
- Brightness
- Color
- Color temperature (153...588 mireds)
- Scene (1, 2, 3, 4, 5, 6)
- Attributes
  - model
  - scene
  - sleep_assistant
  - sleep_off_time
  - total_assistant_sleep_time
  - brand_sleep
  - brand

### Actions

### Action `xiaomi_miio.light_set_scene`

Set one of the 4 available fixed scenes.

| Data attribute | Optional | Description                                      |
| ---------------------- | -------- | ------------------------------------------------ |
| `entity_id`            | no       | Only act on a specific Xiaomi miIO light entity. |
| `scene`                | no       | Scene, between 1 and 4.                          |

### Action `xiaomi_miio.light_set_delayed_turn_off`

Delayed turn off.

| Data attribute | Optional | Description                                      |
| ---------------------- | -------- | ------------------------------------------------ |
| `entity_id`            | no       | Only act on a specific Xiaomi miIO light entity. |
| `time_period`          | no       | Time period for the delayed turn off.            |

### Action `xiaomi_miio.light_reminder_on` (Eyecare Smart Lamp 2 only)

Enable the eye fatigue reminder/notification.

| Data attribute | Optional | Description                                      |
| ---------------------- | -------- | ------------------------------------------------ |
| `entity_id`            | no       | Only act on a specific Xiaomi miIO light entity. |

### Action `xiaomi_miio.light_reminder_off` (Eyecare Smart Lamp 2 only)

Disable the eye fatigue reminder/notification.

| Data attribute | Optional | Description                                      |
| ---------------------- | -------- | ------------------------------------------------ |
| `entity_id`            | no       | Only act on a specific Xiaomi miIO light entity. |

### Action `xiaomi_miio.light_night_light_mode_on` (Eyecare Smart Lamp 2 only)

Turn the smart night light mode on.

| Data attribute | Optional | Description                                      |
| ---------------------- | -------- | ------------------------------------------------ |
| `entity_id`            | no       | Only act on a specific Xiaomi miIO light entity. |

### Action `xiaomi_miio.light_night_light_mode_off` (Eyecare Smart Lamp 2 only)

Turn the smart night light mode off.

| Data attribute | Optional | Description                                      |
| ---------------------- | -------- | ------------------------------------------------ |
| `entity_id`            | no       | Only act on a specific Xiaomi miIO light entity. |

### Action `xiaomi_miio.light_eyecare_mode_on` (Eyecare Smart Lamp 2 only)

Turn the eyecare mode on.

| Data attribute | Optional | Description                                      |
| ---------------------- | -------- | ------------------------------------------------ |
| `entity_id`            | no       | Only act on a specific Xiaomi miIO light entity. |

### Action `xiaomi_miio.light_eyecare_mode_off` (Eyecare Smart Lamp 2 only)

Turn the eyecare mode off.

| Data attribute | Optional | Description                                      |
| ---------------------- | -------- | ------------------------------------------------ |
| `entity_id`            | no       | Only act on a specific Xiaomi miIO light entity. |

## Xiaomi Smart WiFi Socket and Smart Power Strip

The `xiaomi_miio` switch platform allows you to control the state of your Xiaomi Smart WiFi Socket aka Plug, Xiaomi Smart Power Strip and Xiaomi Chuangmi Plug V1.

### Features

### Xiaomi Smart WiFi Socket

Supported models: `chuangmi.plug.m1`, `chuangmi.plug.m3`, `chuangmi.plug.v2`, `chuangmi.plug.hmi205`, `chuangmi.plug.hmi206`

- Power (on, off)
- Attributes
  - Temperature

### Xiaomi Chuangmi Plug V1

Supported models: `chuangmi.plug.v1`, `chuangmi.plug.v3`, `chuangmi.plug.hmi208`

- Power (on, off)
- USB (on, off)
- Attributes
  - Temperature

### Xiaomi Smart Power Strip

Supported models: `qmi.powerstrip.v1`, `zimi.powerstrip.v2`

- Power (on, off)
- Wifi LED (on, off)
- Power Price (0...999)
- Power Mode (green, normal) (Power Strip V1 only)
- Attributes
  - Temperature
  - Current
  - Load power
  - Wifi LED
  - Mode (Power Strip V1 only)

### Xiaomi Air Conditioning Companion V3

Supported models: `lumi.acpartner.v3` (the socket of the `acpartner.v1` and `v2` isn't switchable!)

- Power (on, off)
- Attributes
  - Load power

### Actions

### Action `xiaomi_miio.switch_set_wifi_led_on` (Power Strip only)

Turn the wifi LED on.

| Data attribute | Optional | Description                                       |
| ---------------------- | -------- | ------------------------------------------------- |
| `entity_id`            | no       | Only act on a specific Xiaomi miIO switch entity. |

### Action `xiaomi_miio.switch_set_wifi_led_off` (Power Strip only)

Turn the wifi LED off.

| Data attribute | Optional | Description                                       |
| ---------------------- | -------- | ------------------------------------------------- |
| `entity_id`            | no       | Only act on a specific Xiaomi miIO switch entity. |

### Action `xiaomi_miio.switch_set_power_price` (Power Strip)

Set the power price.

| Data attribute | Optional | Description                                       |
| ---------------------- | -------- | ------------------------------------------------- |
| `entity_id`            | no       | Only act on a specific Xiaomi miIO switch entity. |
| `price`                | no       | Power price, between 0 and 999.                   |

### Action `xiaomi_miio.switch_set_power_mode` (Power Strip V1 only)

Set the power mode.

| Data attribute | Optional | Description                                       |
| ---------------------- | -------- | ------------------------------------------------- |
| `entity_id`            | no       | Only act on a specific Xiaomi miIO switch entity. |
| `mode`                 | no       | Power mode, valid values are 'normal' and 'green' |

## Retrieving the Access Token

Not recommended, please specify the cloud credentials during the config flow for easier setup.
However when setting up a device manually the token can be retrieved in one of the following ways.

### Xiaomi Cloud Tokens Extractor

One of Home Assistant users wrote a tokens extractor tool, which is currently the easiest way to retrieve tokens for all devices assigned to Xiaomi account.
[In the repository](https://github.com/PiotrMachowski/Xiaomi-cloud-tokens-extractor) there's executable for convenient use on Windows or Python script to be run on any platform. If you do not wish to run executable, then you can run it using the source code:

1. Install requirements:

```bash
pip3 install pycryptodome pybase64 requests
```

2. Run script

```bash
python3 token_extractor.py
```

3. Provide email address or username for Xiaomi's account, password and country of the account (most used: CN - China Mainland, DE - Germany etc.)
4. Script will print out all devices connected to the account with their IP address and tokens for use in Home Assistant.

### Xiaomi Home app (Xiaomi Aqara Gateway, Android & iOS)

1. Install the Xiaomi Home app.
2. Sign In/make an account.
3. Make sure you set your region to: Mainland China (Seems to be the longest line with Chinese characters) under settings -> Region (language can later be set on English).
4. Select your Gateway in Xiaomi Home app.
5. Then the 3 dots at the top right of the screen.
6. Then click on about.
7. Tap the version number (Plug-in version 2.77.1 as of January 2020, iOS has a white space instead of version number) at the bottom of the screen repeatedly.
8. You should now see 2 extra options listed in English (iOS still in Chinese), this means you enabled developer mode. [if not, try all steps again!].
9. Android: under "Hub info" there is quite some text in JSON format, this includes the "token" that you need.
   iOS: Most options are still in Chinese, you need the fourth item from the top.

Note: If you have multiple devices needing a token, e.g., Xiaomi Mi Robot Vacuum and a Xiaomi IR Remote, the above method may not work. The Xiaomi Home app will display a token, though it isn't the correct one. The alternative method using "Mi Home v5.4.49" will provide the correct token.

### Using Get Mi Home Devices Token App

If you are on a Windows or macOS device, you can use the [Get MiHome devices token](https://github.com/Maxmudjon/Get_MiHome_devices_token/releases) App to retrieve the token. Click the link, download the file that corresponds to your OS, enter your login details and it will retrieve the access token.

### Alternative methods

{% note %}

If using an Android device to retrieve the Access Token only `v5.4.49` of Mi Home is confirmed working (December 2019). Use `v5.4.49` of Mi Home locate a text file under the `Smarthome/logs` folder where the 32 character token is stored. There will likely be several text files in this directory, search all of them for the word 'token' and you should find it there. Be advised that the latest version of Mi Home does not store the token in clear text.
<br/> <br/>
The iPhone app still stores the token in the SQLite db as of `v4.23.4` (Nov 17, 2019).
<br/> <br/>
After resetting the Wi-Fi settings of the Xiaomi robot vacuum, a new Access Token will be generated and therefore these instructions need to be followed again.
<br/> <br/>
These instructions are written for the Mi Home app - not for the new RoboRock app.
<br/> <br/>
This token (32 hexadecimal characters) is required for the Xiaomi Mi Robot Vacuum, Mi Robot 2 (Roborock) Vacuum, Xiaomi Philips Lights and Xiaomi IR Remote.

{% endnote %}

### Android (not rooted)

> If using an Android device to retrieve the Access Token only `v5.4.49` of Mi Home is confirmed working (December 2019).

1. To begin, set up your Robovac with the latest version of Mi Home on your primary Android device as you normally would.
2. If your Robovac is already set up, you must reset its WiFi settings for it to get a new token.
3. Using `v5.4.49` of Mi Home locate a text file under the `Smarthome/logs` folder where the 32 character token is stored.
4. There will likely be several text files in this directory, search all of them for the word 'token' and you should find it there. Be advised that the latest version of Mi Home does not store the token in clear text.

### Linux and Rooted Android

1. To begin, set up your Robovac with the latest version of Mi Home on your primary Android device as you normally would.
2. Ensure successful operation using the latest Mi Home app and give the Vacuum a static IP in your router or however you do that on your LAN.
3. Install version `v5.4.54` of Mi Home on your rooted Android device and login (you can't have two version of Mi Home installed at the same time).
4. Ensure you are using the same server every time
5. Ensure successful operation using 5.4.54 (locate is a nice simple test)
6. Using adb we will now extract the token from the rooted phone
7. Use adb shell to connect to your device and become root (if using Magisck root do `adb shell -> su -> whoami` to ensure root access.
8. Then run grep -R '"token"' /data/data/com.xiaomi.smarthome and grab the token

### iOS

1. Configure the robot with the Mi Home app. Make sure to select the correct region, as Xiaomi uses different product names for different geographical areas. Note that the new RoboRock app is currently not supported for this method.
2. Using iTunes, create an unencrypted backup of your iPhone. Since macOS 10.15 there is no iTunes app. Use Finder instead - after connecting your iOS device you should see it in left menu of Finder window.
3. Install [iBackup Viewer](https://www.imactools.com/iphonebackupviewer/), open it, and open your backup.
4. Open the "Raw Data" module.
5. Navigate to `com.xiaomi.mihome`.
6. Search for a file that looks like this: `123456789_mihome.sqlite` (Note: `_mihome.sqlite` is _not_ the correct file. Most likely, you will find this file in the `Documents` folder.)
7. Save this file to your filesystem.
8. Install [DB Browser for SQLite](https://sqlitebrowser.org/).
9. Open DB Browser and load the `.sqlite` file you saved from your backup.
10. Click on the `Execute SQL` tab.
11. Input and run this query (use appropriate SELECT query for your device i.e. Vacuum, Powerstrip or Plug):

    ```sql
    -- Execute to retrieve token for Vacuum
    SELECT ZTOKEN FROM ZDEVICE WHERE ZMODEL LIKE "%vacuum%"

    -- Execute to retrieve token for Smart Powerstrip
    SELECT ZTOKEN FROM ZDEVICE WHERE ZMODEL LIKE "%powerstrip%"

    -- Execute to retrieve token for Smart Plug
    SELECT ZTOKEN FROM ZDEVICE WHERE ZMODEL LIKE "%plug%"
    ```

12. Copy the returned 96-digit hexadecimal string to your clipboard.
13. Open `Terminal` and execute this command:

    ```bash
    echo '0: <YOUR HEXADECIMAL STRING>' | xxd -r -p | openssl enc -d -aes-128-ecb -nopad -nosalt -K 00000000000000000000000000000000
    ```

14. Use the resulting 32-digit string as your token. (On your mac in front of the terminal session)

### Bluestacks

1. Configure the robot with the Mi-Home app. Make sure to select the correct region, as Xiaomi uses different product names for different geographical areas. Note that the new RoboRock app is currently not supported for this method.
2. Install [BlueStacks](https://www.bluestacks.com).
3. Set up [Mi Home version 5.4.49](https://www.apkmirror.com/apk/xiaomi-inc/mihome/mihome-5-4-49-release/) in BlueStacks and login to synchronize devices.
4. Open Filemanager in the `More Apps` menu.
5. Use `Explore` on the left and navigate to `sdcard/SmartHome/logs/plug_DeviceManager`.
6. Click on `Export to Windows` in the lower left corner and select any or all files to export to you local disk.
7. Search for `"token":"<yourTokenHere>"`.

### Miio command line tool

Use of Miio should be done before the Vacuum is connected to Mi Home. If you already connected to the app you will need to delete it and then join the ad-hoc Wi-Fi network the Vacuum creates. If the vacuum is already paired it's likely this method will only return `???` as your token.

Discovering devices on the current network:

```bash
npx miio discover
```

This will list devices that are connected to the same network as your computer. Let it run for a while so it has a chance to reach all devices, as it might take a minute or two for all devices to answer.

The commands outputs each device on this format:

```text
Device ID: 48765421
Model info: zhimi.airpurifier.m1
Address: 192.168.100.9
Token: token-as-hex-here via auto-token
Support: At least basic
```

The information output is:

- `Device ID` - The unique identifier of the device, does not change if the device is reset.
- `Model ID`- The model id if it could be determined, this indicates what type of device it is.
- `Address` - The IP that the device has on the network.
- `Token` - The token of the device or `???` if it could not be automatically determined.

### Xiaomi Cloud Tokens Extractor

Alternate method to get all yours devices tokens in one run. Please follow this [instruction](https://github.com/PiotrMachowski/Xiaomi-cloud-tokens-extractor).
