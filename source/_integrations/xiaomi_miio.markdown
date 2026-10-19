---
title: Xiaomi Home
description: Instructions on how to integrate Xiaomi devices using the Xiaomi Home integration within Home Assistant.
ha_categories:
  - hubs_protocols.smart_home_hubs
  - climate.air_purifiers_humidifiers
  - appliances_cleaning.cleaning
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
ha_integration_type: hub
---

The **Xiaomi Home** {% term integration %} supports the following devices:

- [Xiaomi Gateway](#xiaomi-gateway)
- [Xiaomi device tracker](#xiaomi-device-tracker)
- [Xiaomi Air Purifier, Air Humidifier and Standing Fan](#xiaomi-air-purifier-air-humidifier-and-standing-fan)
- [Xiaomi Air Quality Monitor](#xiaomi-air-quality-monitor)
- [Xiaomi IR Remote](#xiaomi-ir-remote)
- [Xiaomi Mi Robot Vacuum](#xiaomi-mi-robot-vacuum)
- [Xiaomi Philips Light](#xiaomi-philips-light)
- [Xiaomi Smart WiFi Socket and Smart Power Strip](#xiaomi-smart-wifi-socket-and-smart-power-strip)

## Prerequisites

Most Xiaomi Home devices are configured using the Home Assistant UI.
The [Xiaomi device tracker](#xiaomi-device-tracker) and [Xiaomi IR Remote](#xiaomi-ir-remote) require manual YAML configuration.

Before you add a device to Home Assistant:

1. Install the Xiaomi Home app and sign in to your account.
2. Add the device to the Xiaomi Home app.
3. Use the Xiaomi Home app instead of a vendor-specific app, such as the Roborock app.

{% note %}
For more complex network setups (for example, VLANs), reference the [following documentation](https://python-miio.readthedocs.io/en/latest/troubleshooting.html#discover-devices-across-subnets) for additional information.
{% endnote %}

{% include integrations/config_flow.md %}

During setup, enter your Xiaomi Home account credentials and select the server region you use in the Xiaomi Home app.
Home Assistant retrieves your device's connection information and API token, then connects to the device over your local network.

If you cannot use your Xiaomi Home account, select **Configure manually (not recommended)**.
You need the device's IP address and 32-character API token.
For instructions on finding the API token, refer to [Retrieving the access token](#retrieving-the-access-token).

{% configuration_basic %}
Username:
  description: The email address or username for your Xiaomi Home account.
Password:
  description: The password for your Xiaomi Home account.
Server region:
  description: The server region you use in the Xiaomi Home app. For a list of regions, refer to the [country server list](https://www.openhab.org/addons/bindings/miio/#country-servers).
Configure manually (not recommended):
  description: Turn this on to set up a device using its IP address and API token instead of your Xiaomi Home account.
IP address:
  description: The IP address of the device. You only need it when you set up a device manually and Home Assistant has not discovered it.
API token:
  description: The 32-character API token for the device.
{% endconfiguration_basic %}

## Troubleshooting

The most common problems are:

- Xiaomi Home devices do not communicate across subnets/VLANs due to the source address of the UDP packet not belonging to the subnet of the device itself, [more information and solutions](https://python-miio.readthedocs.io/en/latest/troubleshooting.html#discover-devices-across-subnets).
- Roborock vacuums need to be connected to the Xiaomi Home app, not the Roborock app, [more information](https://python-miio.readthedocs.io/en/latest/troubleshooting.html#roborock-vacuum-not-detected).
- Blocking the network access to the device is known to cause intermittent connection issues due to the device's internal software hanging and a watchdog restarting the internal software, [more information](https://python-miio.readthedocs.io/en/latest/troubleshooting.html#intermittent-connection-issues-timeouts-xiaomi-vacuum).

## Xiaomi Gateway

The Xiaomi Home {% term integration %} allows you to control the gateway and its connected subdevices.

### Supported Xiaomi gateway models

| Gateway            | Model                       | Zigbee ID             | Home Assistant support |
| ------------------ | --------------------------- | --------------------- | ---------------------- |
| European version   | `ZHWG11LM-763`, `DGNWQ05LM` | `lumi.gateway.mieu01` | Supported with Xiaomi Home credentials |
| Aqara AC Companion | `KTBL11LM`                  | `lumi.acpartner.v3`   | Supported              |
| Aqara hub          | `ZHWG11LM`                  | `lumi.gateway.aqhm01` | Supported              |
| Chinese version    | `DGNWG02LM`                 | `lumi.gateway.v3`     | Supported              |
| Mijia Zigbee 3.0   | `ZNDMWG03LM`                | `lumi.gateway.mgl03`  | Supported              |
| Aqara AC Companion | `KTBL01LM`                  | `lumi.acpartner.v1`   | Not tested             |
| Mi AC Companion    | `KTBL02LM`                  | `lumi.acpartner.v2`   | Not tested             |

### Retrieving connected subdevices through Xiaomi Home

Some gateways, such as `lumi.gateway.mieu01`, cannot retrieve connected subdevices locally.
To add their subdevices, use the Xiaomi Home service.

1. During setup, provide your Xiaomi Home account credentials.
2. Go to {% my integrations title="**Settings** > **Devices & services**" %}.
3. Select **Xiaomi Home**, then select the cogwheel {% icon "mdi:cog-outline" %} (**Configure**) next to your gateway.
4. Turn on **Use Xiaomi Home service to get connected subdevices**, then select **Submit**.

Home Assistant retrieves the subdevices from Xiaomi Home, then controls them and receives their status updates over your local network.
If credentials are required but have not been provided, Home Assistant starts a reauthentication flow.

### Gateway features

- **Alarm**: Arms or disarms the gateway alarm, and shows whether it is armed away, disarmed, or arming.
- **Light**: Turns the gateway light on or off, and sets its brightness and color.
- **Illuminance**: Shows the illuminance measured by the gateway, in lux.

Not yet implemented features (but possible):

- Gateway internet radio (only chinese stations)
- Gateway ringtones/sounds

### Supported subdevices

Home Assistant supports these subdevices:

- **Weather sensor (WSDCGQ01LM)**
  - Zigbee ID: `lumi.sensor_ht`
  - Features: Temperature and humidity sensors
- **Weather sensor (WSDCGQ11LM)**
  - Zigbee ID: `lumi.weather.v1`
  - Features: Temperature, humidity, and pressure sensors
- **Wall switch single (QBKG11LM)**
  - Zigbee ID: `lumi.ctrl_ln1`
  - Features: On/off and toggle control, and a load power sensor
- **Wall switch single (QBKG11LM)**
  - Zigbee ID: `lumi.ctrl_ln1.aq1`
  - Features: On/off and toggle control, and a load power sensor
- **Wall switch no neutral (QBKG04LM)**
  - Zigbee ID: `lumi.ctrl_neutral1.v1`
  - Features: On/off and toggle control
- **Wall switch double (QBKG12LM)**
  - Zigbee ID: `lumi.ctrl_ln2`
  - Features: On/off and toggle control, and a load power sensor
- **Wall switch double (QBKG12LM)**
  - Zigbee ID: `lumi.ctrl_ln2.aq1`
  - Features: On/off and toggle control, and a load power sensor
- **Wall switch double no neutral (QBKG03LM)**
  - Zigbee ID: `lumi.ctrl_neutral2`
  - Features: On/off and toggle control
- **D1 wall switch triple (QBKG26LM)**
  - Zigbee ID: `lumi.switch.n3acn3`
  - Features: On/off and toggle control, and a load power sensor
- **D1 wall switch triple no neutral (QBKG25LM)**
  - Zigbee ID: `lumi.switch.l3acn3`
  - Features: On/off and toggle control, and a load power sensor
- **Wall outlet (QBCZ11LM)**
  - Zigbee ID: `lumi.ctrl_86plug.v1`
  - Features: On/off and toggle control
- **Wall outlet (QBCZ11LM)**
  - Zigbee ID: `lumi.ctrl_86plug.aq1`
  - Features: On/off and toggle control, and a load power sensor
- **Plug (ZNCZ02LM)**
  - Zigbee ID: `lumi.plug`
  - Features: On/off and toggle control, and a load power sensor
- **Relay (LLKZMK11LM)**
  - Zigbee ID: `lumi.relay.c2acn01`
  - Features: On/off and toggle control, and a load power sensor
- **Smart bulb E27 (ZNLDP12LM)**
  - Zigbee ID: `lumi.light.aqcn02`
  - Features: On/off, brightness, and color temperature control
- **IKEA smart bulb E27 white (LED1545G12)**
  - Zigbee ID: `ikea.light.led1545g12`
  - Features: On/off, brightness, and color temperature control
- **IKEA smart bulb E27 white (LED1546G12)**
  - Zigbee ID: `ikea.light.led1546g12`
  - Features: On/off, brightness, and color temperature control
- **IKEA smart bulb E12 white (LED1536G5)**
  - Zigbee ID: `ikea.light.led1536g5`
  - Features: On/off, brightness, and color temperature control
- **IKEA smart bulb GU10 white (LED1537R6)**
  - Zigbee ID: `ikea.light.led1537r6`
  - Features: On/off, brightness, and color temperature control
- **IKEA smart bulb E27 white (LED1623G12)**
  - Zigbee ID: `ikea.light.led1623g12`
  - Features: On/off, brightness, and color temperature control
- **IKEA smart bulb GU10 white (LED1650R5)**
  - Zigbee ID: `ikea.light.led1650r5`
  - Features: On/off, brightness, and color temperature control
- **IKEA smart bulb E12 white (LED1649C5)**
  - Zigbee ID: `ikea.light.led1649c5`
  - Features: On/off, brightness, and color temperature control

### Recognized but unsupported subdevices

Home Assistant recognizes these subdevices but does not create entities for them.

Each item lists the device name, model number, and Zigbee ID.

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

## Xiaomi device tracker

The Xiaomi Mi WiFi Repeater 2 device tracker requires manual YAML configuration.
It reports the Wi-Fi clients associated with the repeater.

### Configure the device tracker

To configure the device tracker, add its IP address and access token to your {% term "`configuration.yaml`" %} file.
For instructions on finding the access token, refer to [Retrieving the access token](#retrieving-the-access-token).

```yaml
device_tracker:
  - platform: xiaomi_miio
    host: 192.168.130.73
    token: YOUR_TOKEN
```

{% configuration %}
host:
  description: The IP address of your Xiaomi device.
  required: true
  type: string
token:
  description: The access token of your Xiaomi Mi WiFi Repeater 2.
  required: true
  type: string
{% endconfiguration %}

## Xiaomi Air Purifier, Air Humidifier and Standing Fan

The Air Purifiers, Air Humidifiers and Standing Fans use multiple platforms to allow you to set the control modes and settings of the device.

### Supported device models

The following list shows each device name and model ID.

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
- **Standing Fan 2 Pro**: `dmaker.fan.p33`
- **Standing Fan 3**: `zhimi.fan.za5`

Depending on the model, air purifiers that don't have their own section on this page can provide the following controls and entities.

### Controls

- Turn the air purifier on or off.
- Select a preset mode: Auto, Silent, Favorite, or Idle.

### Attributes

In addition to the standard fan attributes, the fan entity shows these attributes.

- `extra_features`
- `turbo_mode_supported`
- `button_pressed`
- `sleep_time`
- `sleep_mode_learn_count`
- `use_time`
- `sleep_mode`

### Number entities

- **Favorite level**: Sets the fan level used in Favorite mode.

### Sensor entities

- **Filter life remaining**: Shows the remaining filter life, as a percentage. Enabled by default.
- **Filter use**: Shows how long the filter has been in use, in hours. Enabled by default.
- **Humidity**: Shows the measured humidity. Enabled by default.
- **Motor speed**: Shows the current motor speed, in rpm. Enabled by default.
- **PM2.5**: Shows the measured PM2.5 concentration. Enabled by default.
- **Purify volume**: Shows the total volume of purified air, in cubic meters. Disabled by default.
- **Temperature**: Shows the measured temperature. Enabled by default.
- **Use time**: Shows the total device usage time. [Disabled by default](/docs/configuration/customizing-devices/#disabling-or-enabling-an-entity).

### Switch entities

- **Buzzer**: Turns the buzzer on or off.
- **Child lock**: Turns the child lock on or off.
- **Learn mode**: Turns learn mode on or off.
- **LED**: Turns the LED on or off.

### Air Purifier Pro

Supported model ID: `zhimi.airpurifier.v6`.

#### Controls

- Turn the air purifier on or off.
- Select a preset mode: Auto, Silent, or Favorite.

#### Attributes

In addition to the standard fan attributes, the fan entity shows these attributes.

- `extra_features`
- `turbo_mode_supported`
- `button_pressed`
- `use_time`
- `sleep_time`
- `sleep_mode_learn_count`

#### Number entities

- **Favorite level**: Sets the fan level used in Favorite mode.
- **Volume**: Sets the device volume.

#### Sensor entities

- **Filter life remaining**: Shows the remaining filter life, as a percentage. Enabled by default.
- **Filter use**: Shows how long the filter has been in use, in hours. Enabled by default.
- **Humidity**: Shows the measured humidity. Enabled by default.
- **Illuminance**: Shows the measured light level. Enabled by default.
- **Motor speed**: Shows the current motor speed, in rpm. Enabled by default.
- **PM2.5**: Shows the measured PM2.5 concentration. Enabled by default.
- **Purify volume**: Shows the total volume of purified air, in cubic meters. Disabled by default.
- **Second motor speed**: Shows the current speed of the second motor, in rpm. Enabled by default.
- **Temperature**: Shows the measured temperature. Enabled by default.
- **Use time**: Shows the total device usage time. Disabled by default.

#### Switch entities

- **Child lock**: Turns the child lock on or off.
- **Learn mode**: Turns learn mode on or off.
- **LED**: Turns the LED on or off.

### Air Purifier Pro V7

Supported model ID: `zhimi.airpurifier.v7`.

#### Controls

- Turn the air purifier on or off.
- Select a preset mode: Auto, Silent, or Favorite.

#### Attributes

In addition to the standard fan attributes, the fan entity shows these attributes.

- `extra_features`
- `turbo_mode_supported`
- `button_pressed`

#### Number entities

- **Favorite level**: Sets the fan level used in Favorite mode.
- **Volume**: Sets the device volume.

#### Sensor entities

- **Filter life remaining**: Shows the remaining filter life, as a percentage. Enabled by default.
- **Filter use**: Shows how long the filter has been in use, in hours. Enabled by default.
- **Humidity**: Shows the measured humidity. Enabled by default.
- **Illuminance**: Shows the measured light level. Enabled by default.
- **Motor speed**: Shows the current motor speed, in rpm. Enabled by default.
- **PM2.5**: Shows the measured PM2.5 concentration. Enabled by default.
- **Second motor speed**: Shows the current speed of the second motor, in rpm. Enabled by default.
- **Temperature**: Shows the measured temperature. Enabled by default.
- **Use time**: Shows the total device usage time. Disabled by default.

#### Switch entities

- **Child lock**: Turns the child lock on or off.
- **Learn mode**: Turns learn mode on or off.
- **LED**: Turns the LED on or off.

### Air Purifier MA2

Supported model ID: `zhimi.airpurifier.ma2`.

#### Controls

- Turn the air purifier on or off.
- Select a preset mode: Auto, Silent, Favorite, or Idle.

#### Attributes

In addition to the standard fan attributes, the fan entity shows these attributes.

- `extra_features`
- `turbo_mode_supported`
- `button_pressed`
- `sleep_time`
- `sleep_mode_learn_count`
- `use_time`
- `sleep_mode`

#### Number entities

- **Favorite level**: Sets the fan level used in Favorite mode.

#### Sensor entities

- **Filter life remaining**: Shows the remaining filter life, as a percentage. Enabled by default.
- **Filter use**: Shows how long the filter has been in use, in hours. Enabled by default.
- **Humidity**: Shows the measured humidity. Enabled by default.
- **Motor speed**: Shows the current motor speed, in rpm. Enabled by default.
- **PM2.5**: Shows the measured PM2.5 concentration. Enabled by default.
- **Temperature**: Shows the measured temperature. Enabled by default.
- **Illuminance**: Shows the light level measured on top of the device. Enabled by default.
- **Use time**: Shows the total device usage time. Disabled by default.

#### Switch entities

- **Buzzer**: Turns the buzzer on or off.
- **Child lock**: Turns the child lock on or off.
- **Learn mode**: Turns learn mode on or off.
- **LED**: Turns the LED on or off.

### Air Purifier 2S

Supported model ID: `zhimi.airpurifier.mc1`.

#### Controls

- Turn the air purifier on or off.
- Select a preset mode: Auto, Silent, or Favorite.

#### Attributes

In addition to the standard fan attributes, the fan entity shows these attributes.

- `extra_features`
- `turbo_mode_supported`
- `button_pressed`

#### Number entities

- **Favorite level**: Sets the fan level used in Favorite mode.

#### Sensor entities

- **Filter life remaining**: Shows the remaining filter life, as a percentage. Enabled by default.
- **Filter use**: Shows how long the filter has been in use, in hours. Enabled by default.
- **Humidity**: Shows the measured humidity. Enabled by default.
- **Motor speed**: Shows the current motor speed, in rpm. Enabled by default.
- **PM2.5**: Shows the measured PM2.5 concentration. Enabled by default.
- **Temperature**: Shows the measured temperature. Enabled by default.
- **Use time**: Shows the total device usage time. Disabled by default.

#### Switch entities

- **Buzzer**: Turns the buzzer on or off.
- **Child lock**: Turns the child lock on or off.
- **Learn mode**: Turns learn mode on or off.
- **LED**: Turns the LED on or off.

### Air Purifier 3 and 3H (2019)

Supported model IDs:

- `zhimi.airpurifier.ma4`
- `zhimi.airpurifier.mb3`

These models use the newer MiOT communication protocol.

#### Controls

- Turn the air purifier on or off.
- Select a preset mode: Auto, Silent, Favorite, or Fan.

#### Attributes

In addition to the standard fan attributes, the fan entity shows the `use_time` attribute.

#### Number entities

- **Fan level**: Sets the fan level used in Fan mode, from 1 to 3.
- **Favorite level**: Sets the fan level used in Favorite mode.

#### Select entities

- **LED brightness**: Sets the brightness of the LEDs: Bright, Dim, or Off.

#### Sensor entities

- **Filter life remaining**: Shows the remaining filter life, as a percentage. Enabled by default.
- **Filter use**: Shows how long the filter has been in use, in hours. Enabled by default.
- **Humidity**: Shows the measured humidity. Enabled by default.
- **Motor speed**: Shows the current motor speed, in rpm. Enabled by default.
- **PM2.5**: Shows the measured PM2.5 concentration. Enabled by default.
- **Purify volume**: Shows the total volume of purified air, in cubic meters. Disabled by default.
- **Temperature**: Shows the measured temperature. Enabled by default.
- **Use time**: Shows the total device usage time. Disabled by default.

#### Switch entities

- **Buzzer**: Turns the buzzer on or off.
- **Child lock**: Turns the child lock on or off.

### Air Purifier Pro H and Pro H EU

Supported model IDs:

- `zhimi.airpurifier.va1`
- `zhimi.airpurifier.vb2`

#### Controls

- Turn the air purifier on or off.
- Select a preset mode: Auto, Silent, Favorite, or Fan.

#### Attributes

In addition to the standard fan attributes, the fan entity shows the `use_time` attribute.

#### Number entities

- **Fan level**: Sets the fan level used in Fan mode, from 1 to 3.
- **Favorite level**: Sets the fan level used in Favorite mode.

#### Select entities

- **LED brightness**: Sets the brightness of the LEDs: Bright, Dim, or Off.

#### Sensor entities

- **Filter life remaining**: Shows the remaining filter life, as a percentage. Enabled by default.
- **Filter use**: Shows how long the filter has been in use, in hours. Enabled by default.
- **Humidity**: Shows the measured humidity. Enabled by default.
- **Motor speed**: Shows the current motor speed, in rpm. Enabled by default.
- **PM2.5**: Shows the measured PM2.5 concentration. Enabled by default.
- **Purify volume**: Shows the total volume of purified air, in cubic meters. Disabled by default.
- **Temperature**: Shows the measured temperature. Enabled by default.
- **Use time**: Shows the total device usage time. Disabled by default.

#### Switch entities

- **Buzzer**: Turns the buzzer on or off.
- **Child lock**: Turns the child lock on or off.

### Air Purifier 3C

Supported model IDs:

- `zhimi.airpurifier.mb4`
- `zhimi.airp.mb4a`

#### Controls

- Turn the air purifier on or off.
- Select a preset mode: Auto, Silent, or Favorite.

#### Number entities

- **Favorite motor speed**: Sets the motor speed used in Favorite mode, in rpm.
- **LED brightness**: Sets the brightness of the display.

#### Sensor entities

- **Filter life remaining**: Shows the remaining filter life, as a percentage. Enabled by default.
- **Filter use**: Shows how long the filter has been in use, in hours. Enabled by default.
- **Motor speed**: Shows the current motor speed, in rpm. Enabled by default.
- **PM2.5**: Shows the measured PM2.5 concentration. Enabled by default.

#### Switch entities

- **Buzzer**: Turns the buzzer on or off.
- **Child lock**: Turns the child lock on or off.

### Air Purifier ZA1

Supported model ID: `zhimi.airpurifier.za1`.

#### Controls

- Turn the air purifier on or off.
- Select a preset mode: Auto, Silent, or Favorite.

#### Attributes

In addition to the standard fan attributes, the fan entity shows the `use_time` attribute.

#### Number entities

- **Favorite level**: Sets the fan level used in Favorite mode.

#### Sensor entities

- **Filter life remaining**: Shows the remaining filter life, as a percentage. Enabled by default.
- **Filter use**: Shows how long the filter has been in use, in hours. Enabled by default.
- **Humidity**: Shows the measured humidity. Enabled by default.
- **Motor speed**: Shows the current motor speed, in rpm. Enabled by default.
- **PM2.5**: Shows the measured PM2.5 concentration. Enabled by default.
- **Temperature**: Shows the measured temperature. Enabled by default.
- **TVOC**: Shows the measured concentration of total volatile organic compounds (TVOC). Enabled by default.

#### Switch entities

- **Buzzer**: Turns the buzzer on or off.
- **Child lock**: Turns the child lock on or off.

#### Select entities

- **LED brightness**: Sets the brightness of the display: Bright, Dim, or Off.

### Air Purifier V3

Supported model ID: `zhimi.airpurifier.v3`.

#### Controls

- Turn the air purifier on or off.
- Select a preset mode: Auto, Silent, Favorite, Idle, Medium, High, or Strong.

#### Attributes

In addition to the standard fan attributes, the fan entity shows these attributes.

- `sleep_time`
- `sleep_mode_learn_count`
- `extra_features`
- `use_time`
- `button_pressed`

#### Sensor entities

- **Filter life remaining**: Shows the remaining filter life, as a percentage. Enabled by default.
- **Filter use**: Shows how long the filter has been in use, in hours. Enabled by default.
- **Illuminance**: Shows the measured light level. Enabled by default.
- **Motor speed**: Shows the current motor speed, in rpm. Enabled by default.
- **PM2.5**: Shows the measured PM2.5 concentration. Enabled by default.
- **Purify volume**: Shows the total volume of purified air, in cubic meters. Disabled by default.
- **Second motor speed**: Shows the current speed of the second motor, in rpm. Enabled by default.
- **Use time**: Shows the total device usage time. Disabled by default.

#### Switch entities

- **Buzzer**: Turns the buzzer on or off.
- **Child lock**: Turns the child lock on or off.
- **LED**: Turns the LED on or off.

### Air Purifier 4 and 4 Pro

Supported model IDs:

- `zhimi.airp.mb5`
- `zhimi.airp.vb4`

These models use the newer MiOT communication protocol.

#### Controls

- Turn the air purifier on or off.
- Select a preset mode: Auto, Silent, Favorite, or Fan.

#### Attributes

In addition to the standard fan attributes, the fan entity shows the `use_time` attribute.

#### Number entities

- **Fan level**: Sets the fan level used in Fan mode, from 1 to 3.
- **Favorite level**: Sets the fan level used in Favorite mode.

#### Select entities

- **LED brightness**: Sets the brightness of the display: Bright, Dim, or Off.

#### Sensor entities

- **Filter life remaining**: Shows the remaining filter life, as a percentage. Enabled by default.
- **Filter lifetime remaining**: Shows the remaining filter life, in days. Enabled by default.
- **Filter use**: Shows how long the filter has been in use, in hours. Enabled by default.
- **Humidity**: Shows the measured humidity. Enabled by default.
- **Motor speed**: Shows the current motor speed, in rpm. Enabled by default.
- **PM2.5**: Shows the measured PM2.5 concentration. Enabled by default.
- **PM10**: Shows the measured PM10 concentration. Available on the Air Purifier 4 Pro only. Enabled by default.
- **Purify volume**: Shows the total volume of purified air, in cubic meters. Disabled by default.
- **Temperature**: Shows the measured temperature. Enabled by default.

#### Switch entities

- **Buzzer**: Turns the buzzer on or off.
- **Child lock**: Turns the child lock on or off.
- **Ionizer**: Turns the negative ion generator on or off.

### Air Fresh A1

Supported model ID: `dmaker.airfresh.a1`.

#### Controls

- Turn the device on or off.
- Select a preset mode: Auto, Sleep, or Favorite.

#### Binary sensor entities

- **Auxiliary heat status**: Shows whether the heater is currently on.

#### Button entities

- **Reset dust filter**: Resets the remaining life and usage of the dust filter.

#### Sensor entities

- **Carbon dioxide**: Shows the measured carbon dioxide concentration, in ppm. Enabled by default.
- **Dust filter life remaining**: Shows the remaining dust filter life, as a percentage. Enabled by default.
- **Dust filter lifetime remaining days**: Shows the remaining dust filter life, in days. Enabled by default.
- **PM2.5**: Shows the measured PM2.5 concentration. Enabled by default.
- **Temperature**: Shows the measured outdoor temperature. Enabled by default.
- **Control speed**: Shows the current motor speed, in rpm. Enabled by default.
- **Favorite speed**: Shows the motor speed used in Favorite mode, in rpm. Enabled by default.

#### Switch entities

- **Buzzer**: Turns the buzzer on or off.
- **Child lock**: Turns the child lock on or off.
- **Display**: Turns the display on or off.
- **Auxiliary heat**: Turns the heater on or off.

### Air Fresh VA2

Supported model ID: `zhimi.airfresh.va2`.

#### Controls

- Turn the device on or off.
- Select a preset mode: Auto or Interval.
- Set the fan speed.

#### Attributes

In addition to the standard fan attributes, the fan entity shows these attributes.

- `use_time`
- `extra_features`

#### Sensor entities

- **Carbon dioxide**: Shows the measured carbon dioxide concentration, in ppm. Enabled by default.
- **Filter life remaining**: Shows the remaining filter life, as a percentage. Enabled by default.
- **Filter use**: Shows how long the filter has been in use, in hours. Enabled by default.
- **Humidity**: Shows the measured humidity. Enabled by default.
- **PM2.5**: Shows the measured PM2.5 concentration. Enabled by default.
- **Temperature**: Shows the measured temperature. Enabled by default.
- **Use time**: Shows the total device usage time. Disabled by default.

#### Select entities

- **LED brightness**: Sets the brightness of the LEDs: Bright, Dim, or Off.

#### Switch entities

- **Buzzer**: Turns the buzzer on or off.
- **Child lock**: Turns the child lock on or off.
- **LED**: Turns the LED on or off.

### Air Fresh VA4

Supported model ID: `zhimi.airfresh.va4`.

#### Controls

- Turn the device on or off.
- Select a preset mode: Auto or Interval.
- Set the fan speed.

#### Attributes

In addition to the standard fan attributes, the fan entity shows these attributes.

- `use_time`
- `extra_features`

#### Sensor entities

- **Carbon dioxide**: Shows the measured carbon dioxide concentration, in ppm. Enabled by default.
- **Filter life remaining**: Shows the remaining filter life, as a percentage. Enabled by default.
- **Filter use**: Shows how long the filter has been in use, in hours. Enabled by default.
- **Humidity**: Shows the measured humidity. Enabled by default.
- **PM2.5**: Shows the measured PM2.5 concentration. Enabled by default.
- **Temperature**: Shows the measured temperature. Enabled by default.
- **Use time**: Shows the total device usage time. Disabled by default.

#### Select entities

- **LED brightness**: Sets the brightness of the LEDs: Bright, Dim, or Off.

#### Switch entities

- **Buzzer**: Turns the buzzer on or off.
- **Child lock**: Turns the child lock on or off.
- **LED**: Turns the LED on or off.
- **Auxiliary heat**: Turns the heater on or off.

### Air Fresh T2017

Supported model ID: `dmaker.airfresh.t2017`.

#### Controls

- Turn the device on or off.
- Select a preset mode: Auto, Sleep, or Favorite.

#### Binary sensor entities

- **Auxiliary heat status**: Shows whether the heater is currently on.

#### Button entities

- **Reset dust filter**: Resets the remaining life and usage of the dust filter.
- **Reset upper filter**: Resets the remaining life and usage of the upper filter.

#### Select entities

- **Auxiliary heat level**: Sets the heater level: Low, Medium, or High.
- **Display orientation**: Sets the orientation of the display: Forward, Left, or Right.

#### Sensor entities

- **Carbon dioxide**: Shows the measured carbon dioxide concentration, in ppm. Enabled by default.
- **Dust filter life remaining**: Shows the remaining dust filter life, as a percentage. Enabled by default.
- **Dust filter lifetime remaining days**: Shows the remaining dust filter life, in days. Enabled by default.
- **Upper filter life remaining**: Shows the remaining upper filter life, as a percentage. Enabled by default.
- **Upper filter lifetime remaining days**: Shows the remaining upper filter life, in days. Enabled by default.
- **PM2.5**: Shows the measured PM2.5 concentration. Enabled by default.
- **Temperature**: Shows the measured outdoor temperature. Enabled by default.
- **Control speed**: Shows the current motor speed, in rpm. Enabled by default.
- **Favorite speed**: Shows the motor speed used in Favorite mode, in rpm. Enabled by default.

#### Switch entities

- **Buzzer**: Turns the buzzer on or off.
- **Child lock**: Turns the child lock on or off.
- **Display**: Turns the display on or off.
- **Auxiliary heat**: Turns the heater on or off.

### Air Humidifier

Supported model ID: `zhimi.humidifier.v1`.

#### Controls

- Turn the humidifier on or off.
- Select a mode: Silent, Medium, High, or Strong.
- Set the target humidity from 30% to 80%, in steps of 10%.

#### Binary sensor entities

- **Water tank**: Shows whether the water tank is attached.

#### Select entities

- **LED brightness**: Sets the brightness of the LEDs: Bright, Dim, or Off.

#### Sensor entities

- **Humidity**: Shows the measured humidity. Enabled by default.
- **Temperature**: Shows the measured temperature. Enabled by default.
- **Use time**: Shows the total device usage time. Disabled by default.
- **Water level**: Shows the water level in the tank, as a percentage. Enabled by default.

#### Switch entities

- **Buzzer**: Turns the buzzer on or off.
- **Child lock**: Turns the child lock on or off.

### Air Humidifier CA1

Supported model ID: `zhimi.humidifier.ca1`.

#### Controls

- Turn the humidifier on or off.
- Select a mode: Silent, Medium, High, or Auto.
- Set the target humidity from 30% to 80%, in steps of 10%.

#### Binary sensor entities

- **Water tank**: Shows whether the water tank is attached.

#### Select entities

- **LED brightness**: Sets the brightness of the LEDs: Bright, Dim, or Off.

#### Sensor entities

- **Humidity**: Shows the measured humidity. Enabled by default.
- **Motor speed**: Shows the current motor speed, in rpm. Enabled by default.
- **Temperature**: Shows the measured temperature. Enabled by default.
- **Use time**: Shows the total device usage time. Disabled by default.
- **Water level**: Shows the water level in the tank, as a percentage. Enabled by default.

#### Switch entities

- **Buzzer**: Turns the buzzer on or off.
- **Child lock**: Turns the child lock on or off.
- **Dry mode**: Turns dry mode on or off.

### Air Humidifier CA4

Supported model ID: `zhimi.humidifier.ca4`.

#### Controls

- Turn the humidifier on or off.
- Select a mode: Auto, Low, Mid, or High.
- Set the target humidity from 30% to 80%.

#### Binary sensor entities

- **Water tank**: Shows whether the water tank is attached.

#### Number entities

- **Motor speed**: Sets the motor speed, in rpm.

#### Select entities

- **LED brightness**: Sets the brightness of the LEDs: Bright, Dim, or Off.

#### Sensor entities

- **Actual speed**: Shows the current motor speed, in rpm. Enabled by default.
- **Humidity**: Shows the measured humidity. Enabled by default.
- **Temperature**: Shows the measured temperature. Enabled by default.
- **Use time**: Shows the total device usage time. Disabled by default.
- **Water level**: Shows the water level in the tank, as a percentage. Enabled by default.

#### Switch entities

- **Buzzer**: Turns the buzzer on or off.
- **Child lock**: Turns the child lock on or off.
- **Clean mode**: Turns clean mode on or off.
- **Dry mode**: Turns dry mode on or off.

{% note %}
You can only change **Clean mode** and **Motor speed** while the humidifier is on.
{% endnote %}

### Air Humidifier CB1

Supported model ID: `zhimi.humidifier.cb1`.

#### Controls

- Turn the humidifier on or off.
- Select a mode: Silent, Medium, High, or Auto.
- Set the target humidity from 30% to 80%, in steps of 10%.

#### Binary sensor entities

- **Water tank**: Shows whether the water tank is attached.

#### Select entities

- **LED brightness**: Sets the brightness of the LEDs: Bright, Dim, or Off.

#### Sensor entities

- **Humidity**: Shows the measured humidity. Enabled by default.
- **Motor speed**: Shows the current motor speed, in rpm. Enabled by default.
- **Temperature**: Shows the measured temperature. Enabled by default.
- **Use time**: Shows the total device usage time. Disabled by default.
- **Water level**: Shows the water level in the tank, as a percentage. Enabled by default.

#### Switch entities

- **Buzzer**: Turns the buzzer on or off.
- **Child lock**: Turns the child lock on or off.
- **Dry mode**: Turns dry mode on or off.

### Air Humidifier JSQ, JSQ1, and MJJSQ

Supported model IDs:

- `deerma.humidifier.jsq`
- `deerma.humidifier.jsq1`
- `deerma.humidifier.mjjsq`

#### Controls

- Turn the humidifier on or off.
- Select a mode: Low, Medium, High, or Humidity.
- Set the target humidity from 30% to 80%.

#### Binary sensor entities

- **Water tank**: Shows whether the water tank is attached.
- **Water tank empty**: Shows whether the water tank is empty.

#### Sensor entities

- **Humidity**: Shows the measured humidity. Enabled by default.
- **Temperature**: Shows the measured temperature. Enabled by default.

#### Switch entities

- **Buzzer**: Turns the buzzer on or off.
- **LED**: Turns the LED on or off.

### Standing Fan 1X

Supported model ID: `dmaker.fan.p5`.

#### Controls

- Turn the fan on or off.
- Select a preset mode: Normal or Nature.
- Turn oscillation on or off.

#### Number entities

- **Delay off countdown**: Sets a timer, in minutes, after which the fan turns off.
- **Oscillation angle**: Sets the oscillation angle, in degrees.

#### Switch entities

- **Buzzer**: Turns the buzzer on or off.
- **Child lock**: Turns the child lock on or off.
- **LED**: Turns the LED on or off.

### Standing Fan

Supported model IDs:

- `zhimi.fan.za1`
- `zhimi.fan.za3`
- `zhimi.fan.za4`
- `zhimi.fan.sa1`

#### Controls

- Turn the fan on or off.
- Select a preset mode: Normal or Nature.
- Turn oscillation on or off.

#### Number entities

- **Delay off countdown**: Sets a timer, in minutes, after which the fan turns off.
- **Oscillation angle**: Sets the oscillation angle, in degrees.

#### Select entities

- **LED brightness**: Sets the brightness of the LEDs: Bright, Dim, or Off.

#### Switch entities

- **Buzzer**: Turns the buzzer on or off.
- **Child lock**: Turns the child lock on or off.

### DC Pedestal Fan

Supported model IDs:

- `zhimi.fan.v2`
- `zhimi.fan.v3`

#### Controls

- Turn the fan on or off.
- Select a preset mode: Normal or Nature.
- Turn oscillation on or off.

#### Number entities

- **Delay off countdown**: Sets a timer, in minutes, after which the fan turns off.
- **Oscillation angle**: Sets the oscillation angle, in degrees.

#### Select entities

- **LED brightness**: Sets the brightness of the LEDs: Bright, Dim, or Off.

#### Sensor entities

- **Battery**: Shows the battery level, as a percentage. Enabled by default.
- **Humidity**: Shows the measured humidity. Enabled by default.
- **Temperature**: Shows the measured temperature. Enabled by default.

#### Switch entities

- **Buzzer**: Turns the buzzer on or off.
- **Child lock**: Turns the child lock on or off.

### Standing Fan 1C

Supported model ID: `dmaker.fan.1c`.

#### Controls

- Turn the fan on or off.
- Select a preset mode: Normal or Nature.
- Turn oscillation on or off.

#### Number entities

- **Delay off countdown**: Sets a timer, in minutes, after which the fan turns off.

#### Switch entities

- **Buzzer**: Turns the buzzer on or off.
- **Child lock**: Turns the child lock on or off.
- **LED**: Turns the LED on or off.

### Tower Fan/Standing Fan 2/Standing Fan 2 Pro/Standing Fan Pro

Supported model IDs:

- `dmaker.fan.p9`
- `dmaker.fan.p10`
- `dmaker.fan.p11`
- `dmaker.fan.p18`
- `dmaker.fan.p33`

#### Controls

- Turn the fan on or off.
- Select a preset mode: Normal or Nature.
- Turn oscillation on or off.

#### Number entities

- **Delay off countdown**: Sets a timer, in minutes, after which the fan turns off.
- **Oscillation angle**: Sets the oscillation angle, in degrees.

#### Switch entities

- **Buzzer**: Turns the buzzer on or off.
- **Child lock**: Turns the child lock on or off.
- **LED**: Turns the LED on or off.

### Standing Fan 3

Supported model ID: `zhimi.fan.za5`.

#### Controls

- Turn the fan on or off.
- Select a preset mode: Normal or Nature.
- Turn oscillation on or off.

#### Binary sensor entities

- **Power supply**: Shows whether the power supply is connected.

#### Number entities

- **Delay off countdown**: Sets a timer, in minutes, after which the fan turns off.
- **LED brightness**: Sets the brightness of the LEDs.
- **Oscillation angle**: Sets the oscillation angle, in degrees.

#### Sensor entities

- **Humidity**: Shows the measured humidity. Enabled by default.
- **Temperature**: Shows the measured temperature. Enabled by default.

#### Switch entities

- **Buzzer**: Turns the buzzer on or off.
- **Child lock**: Turns the child lock on or off.
- **Ionizer**: Turns the ionizer on or off.

### Actions

These devices support the standard [humidifier](/integrations/humidifier/) and [fan](/integrations/fan/) actions, such as `humidifier.set_humidity`, `humidifier.set_mode`, `fan.set_percentage`, and `fan.set_preset_mode`. To act on a specific device, target its entity.

The integration also adds Xiaomi-specific actions for air purifiers, such as **Fan reset filter** and **Fan set extra features**. For the full list, see [Actions](#list-of-actions).

## Xiaomi Air Quality Monitor

Home Assistant shows the air quality measured by your Xiaomi Mi Air Quality Monitor (PM2.5).

- **Air quality**: Shows the air quality index (AQI).
  Its attributes show the power state, charging state, battery level, display clock, night mode and its schedule, and sensor state.

Depending on the model, a separate air quality entity also provides readings for PM2.5, PM10, carbon dioxide, carbon dioxide equivalent, total volatile organic compounds (TVOC), temperature, and humidity.

## Xiaomi IR Remote

The Xiaomi IR Remote (`ChuangmiIr`) requires manual YAML configuration.
It lets you send infrared commands to other devices.

### Configure the remote

To configure the remote, add its IP address and access token to your {% term "`configuration.yaml`" %} file.
For instructions on finding the access token, refer to [Retrieving the access token](#retrieving-the-access-token).

```yaml
remote:
  - platform: xiaomi_miio
    host: 192.168.42.42
    token: YOUR_TOKEN
```

{% configuration %}
host:
  description: The IP address of your remote.
  required: true
  type: string
token:
  description: The access token of your remote.
  required: true
  type: string
name:
  description: The name of your remote.
  required: false
  type: string
slot:
  description: The slot used to store learned commands.
  required: false
  type: integer
  default: 1
timeout:
  description: The time in seconds to wait while learning a command.
  required: false
  type: integer
  default: 10
commands:
  description: A list of commands
  required: false
  type: map
  keys:
    command:
      description: A list of commands in the [raw](#raw-commands) or [Pronto hex](#pronto-hex-codes) format.
      required: true
      type: list
{% endconfiguration %}

### Create reusable commands

Define named commands when you want to reuse them in scripts or dashboard controls.

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

### Send commands from a dashboard

You can add a named command to a dashboard as an entity button.

```yaml
type: entity-button
tap_action:
  action: perform-action
  perform_action: remote.send_command
  target:
    entity_id: remote.xiaomi_miio_ir
  data:
    command: activate_towel_heater
hold_action:
  action: more-info
show_icon: true
show_name: true
entity: remote.xiaomi_miio_ir
icon: "mdi:radiator"
name: Activate Towel Heater
```

You can also use named commands in a script.

{% example %}
script: |
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
{% endexample %}

### Command formats

The Xiaomi IR Remote supports raw and Pronto hex command formats.

#### Raw commands

A raw command is learned with the [Remote learn command](/actions/xiaomi_miio.remote_learn_command/) action.

The following is an example raw command:

```bash
raw:Z6UFANEAAAAjAQAAAwkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQIAE=
```

You can add the frequency as the last parameter:

```bash
raw:Z6UFANEAAAAjAQAAAwkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQIAE=:38400
```

#### Pronto hex codes

A Pronto hex code is often supplied by the device manufacturer.

The following is an example Pronto hex command:

```bash
pronto:0000 006C 0022 0002 015B 00AD 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0041 0016 0041 0016 0041 0016 0041 0016 0041 0016 0041 0016 0041 0016 0016 0016 0016 0016 0041 0016 0016 0016 0041 0016 0016 0016 0016 0016 0016 0016 0016 0016 0041 0016 0016 0016 0041 0016 0016 0016 0041 0016 0041 0016 0041 0016 0041 0016 0623 015B 0057 0016 0E6E
```

You can add the number of repeats as the last parameter when required by the device:

```bash
pronto:0000 006C 0022 0002 015B 00AD 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0041 0016 0041 0016 0041 0016 0041 0016 0041 0016 0041 0016 0041 0016 0016 0016 0016 0016 0041 0016 0016 0016 0041 0016 0016 0016 0016 0016 0016 0016 0016 0016 0041 0016 0016 0016 0041 0016 0016 0016 0041 0016 0041 0016 0041 0016 0041 0016 0623 015B 0057 0016 0E6E:2
```

The following Xiaomi IR Remote models are identified by their model IDs:

- `chuangmi.ir.v2`
- `chuangmi.remote.h102a03`
- `chuangmi.remote.v2`
- `chuangmi.remote.h102c01`

Pronto hex codes work only with `chuangmi.ir.v2`.

### Available actions

The Xiaomi IR Remote registers a generic `remote.send_command` action, along with Xiaomi-specific actions for learning commands and controlling the remote's LED.

#### `remote.send_command`

Use this action to send a named command or a command in one of the [supported formats](#command-formats).

To learn a new command, use the **Remote learn command** action. After learning, the base64 string is shown as a notification in Overview, where you can copy it. Commands learned to the same slot can still be sent using [`remote.send_command`](/actions/remote.send_command/) even if they are overwritten.

For the full list of actions this integration adds, see [Actions](#list-of-actions).

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

In addition to all of the actions provided by the [vacuum](/integrations/vacuum/) integration (`start`, `pause`, `stop`, `return_to_base`, `locate`, `set_fan_speed`, and `send_command`), this integration adds Xiaomi-specific actions to clean zones and segments, send the robot to a coordinate, and remote control the robot. For the full list, see [Actions](#list-of-actions).

### Button entities

- **Reset main brush**: Resets the remaining life of the main brush.
- **Reset side brush**: Resets the remaining life of the side brush.
- **Reset filter**: Resets the remaining life of the filter.
- **Reset sensor dirty**: Resets the remaining time until the sensors need cleaning.

### Sensor entities

- **Battery**: Shows the battery level, in percent. Enabled by default.
- **Current clean area**: Shows the area cleaned during the current cleaning run, in square meters. When the vacuum is not cleaning, shows the same value as **Last clean area**. Enabled by default.
- **Current clean duration**: Shows the duration of the current cleaning run. When the vacuum is not cleaning, shows the same value as **Last clean duration**. Enabled by default.
- **DnD start**: Shows when the next Do Not Disturb period starts. Disabled by default.
- **DnD end**: Shows when the current or next Do Not Disturb period ends. Disabled by default.
- **Filter remaining**: Shows the remaining filter life. Enabled by default.
- **Last clean area**: Shows the area cleaned during the last cleaning run, in square meters. Enabled by default.
- **Last clean duration**: Shows the duration of the last cleaning run. Enabled by default.
- **Last clean end**: Shows when the last cleaning run ended. Enabled by default.
- **Last clean start**: Shows when the last cleaning run started. Enabled by default.
- **Main brush remaining**: Shows the remaining main brush life. Enabled by default.
- **Side brush remaining**: Shows the remaining side brush life. Enabled by default.
- **Sensor dirty remaining**: Shows the remaining time until the sensors need cleaning. Enabled by default.
- **Total clean area**: Shows the total area cleaned, in square meters. Disabled by default.
- **Total clean count**: Shows the total number of cleaning runs. Disabled by default.
- **Total duration**: Shows the total cleaning time. Disabled by default.
- **Total dust collection count**: Shows the total number of dust collections. Disabled by default.

### Binary sensor entities

Binary sensor entities are only available for vacuums with a mop.

- **Water box attached**: Shows whether the water box is attached. Enabled by default.
  On models with a separate mop, an additional **Mop attached** entity shows whether the mop is attached.
- **Water shortage**: Shows whether the water box is low on water. Enabled by default.

### Attributes

In addition to the standard [vacuum](/integrations/vacuum/) attributes, the vacuum entity shows these attributes:

- `status`: The current status reported by the vacuum.
- `error`: The current error, if the vacuum reports one.
- `timers`: The cleaning timers set on the vacuum, if any.

### Example on how to clean a specific room

Example script using [`vacuum.send_command`](/integrations/vacuum/) to clean a specific room:

{% example %}
script: |
  vacuum_kitchen:
    alias: "Clean the kitchen"
    sequence:
      - action: vacuum.send_command
        target:
          entity_id: vacuum.xiaomi_vacuum_cleaner
        data:
          command: app_segment_clean
          params:
            - 18
{% endexample %}

The `params` value specifies a room number.
To clean multiple rooms, provide a list of room numbers, such as 17 and 18.
For instructions on finding valid room numbers and the rooms they map to, refer to [Retrieving room numbers](#retrieving-room-numbers).

### Example on how to reset maintenance hours (brushes, filter, sensors)

The vacuum entity stores attribute values for when brushes, filters and sensors need to be
cleaned or replaced (`main_brush_left`, `side_brush_left`, `filter_left` and
`sensor_dirty_left`). The values are measured in hours. Once the parts are cleaned
or replaced you can then reset those values on the vacuum. Here is an example script using
[`vacuum.send_command`](/integrations/vacuum/) to reset the hours for the main brush:

{% example %}
script: |
  reset_main_brush_left:
    alias: "Reset hours for main brush replacement"
    sequence:
      - action: vacuum.send_command
        target:
          entity_id: vacuum.xiaomi_vacuum_cleaner
        data:
          command: reset_consumable
          params:
            - "main_brush_work_time"
{% endexample %}

Allowed `params` for the `reset_consumable` command:

- `main_brush_work_time`
- `side_brush_work_time`
- `filter_work_time`
- `sensor_dirty_time`

### Retrieve zone cleaning coordinates

#### Using FloleVac (Android)

1. Download [FloleVac](https://play.google.com/store/apps/details?id=de.flole.xiaomi)
2. Log in with your Xiaomi credentials
3. Open Map (make sure you're on the same network as your vacuum cleaner)
4. Select "Zone cleanup" and draw a box around the zone you'd like to clean
5. Long press "Cleanup" and the zone coordinates will be copied to your clipboard

#### Using RoboRock Control Center (requires Valetudo firmware)

[RRCC](https://github.com/LazyT/rrcc) supports both rooted and non-rooted Vacuums and acts as a mostly fully featured replacement for Mi Home that works locally without the cloud. If you have installed the rooted firmware [Valetudo](https://github.com/Hypfer/Valetudo) you can SSH into your Vacuum and enable MQTT plus use map functions with no cloud requirement.

Using the map editor you can acquire the coordinates required for zoned clean up. Here is an example script for zoned clean up:

{% example %}
script: |
  vacuum_kitchen:
    alias: "Vacuum kitchen"
    sequence:
      - action: vacuum.send_command
        target:
          entity_id: "vacuum.xiaomi_vacuum_cleaner"
        data:
          command: app_zoned_clean
          params:
            - - 23084
              - 26282
              - 27628
              - 29727
              - 1
{% endexample %}

### Retrieving room numbers

Valid room numbers can be retrieved using miio command-line tool:

```bash
miiocli roborockvacuum --ip <ip of the vacuum> --token <your vacuum token> get_room_mapping
```

It will return the full mapping of room numbers to user-defined names as a list of (number,name) tuples.
Alternatively, one can just test the `clean_segment` action with a number and see which room it cleans.

It seems to be the case that Numbers 1..15 are used to number the initial segmentation done by the vacuum cleaner itself. Numbers 16 and upwards numbers rooms from the users manual editing.

## Xiaomi Philips Light

The Xiaomi Home light platform allows you to control the state of your Xiaomi Philips LED Ball Lamp, Xiaomi Philips Zhirui LED Bulb E14 Candle Lamp, Xiaomi Philips Zhirui Downlight, Xiaomi Philips LED Ceiling Lamp, Xiaomi Philips Eyecare Lamp 2, Xiaomi Philips Moonlight Bedside Lamp and Philips Zhirui Desk Lamp.

### Features

#### Philips LED Ball Lamp, Philips Zhirui LED Candle Lamp and Philips Zhirui Downlight

Supported model IDs:

- `philips.light.bulb`
- `philips.light.candle`
- `philips.light.candle2`
- `philips.light.downlight`

##### Controls

- Turn the light on or off.
- Set the brightness.
- Set the color temperature from about 3000 K to 5700 K.
- Select a fixed scene: 1, 2, 3, or 4.
- Turn the light off after a delay, in seconds.

##### Attributes

In addition to the standard light attributes, the light entity shows these attributes.

- `scene`
- `delayed_turn_off`

#### Philips LED Ceiling Lamp

Supported model IDs:

- `philips.light.ceiling`
- `philips.light.zyceiling`

##### Controls

- Turn the light on or off.
- Set the brightness.
- Set the color temperature from about 2700 K to 5700 K.
- Select a fixed scene: 1, 2, 3, or 4.
- Turn the light off after a delay, in seconds.

##### Attributes

In addition to the standard light attributes, the light entity shows these attributes.

- `scene`
- `delayed_turn_off`
- `night_light_mode`
- `automatic_color_temperature`

#### Philips Eyecare Smart Lamp 2

Supported model ID: `philips.light.sread1`.

This lamp has two light entities: the eyecare light and the ambient light.

##### Controls

- Turn the eyecare light on or off.
- Turn the ambient light on or off.
- Set the brightness of each light.
- Select a fixed scene: 1, 2, 3, or 4.
- Turn night light mode on or off.
- Turn the eyecare light off after a delay, in seconds.
- Turn the eye fatigue reminder on or off.
- Turn eyecare mode on or off.

##### Attributes

In addition to the standard light attributes, the eyecare light entity shows these attributes.

- `scene`
- `delayed_turn_off`
- `night_light_mode`
- `reminder`
- `eyecare_mode`

#### Philips Zhirui Desk Lamp

Supported model IDs:

- `philips.light.mono1`
- `philips.light.hbulb`

##### Controls

- Turn the light on or off.
- Set the brightness.
- Select a fixed scene: 1, 2, 3, or 4.
- Turn the light off after a delay, in seconds.

##### Attributes

In addition to the standard light attributes, the light entity shows these attributes.

- `scene`
- `delayed_turn_off`

#### Philips Moonlight Bedside Lamp

Supported model ID: `philips.light.moonlight`.

##### Controls

- Turn the light on or off.
- Set the brightness.
- Set the color.
- Set the color temperature from about 1700 K to 6500 K.
- Select a fixed scene: 1, 2, 3, 4, 5, or 6.

##### Attributes

In addition to the standard light attributes, the light entity shows these attributes.

- `scene`
- `sleep_assistant`
- `sleep_off_time`
- `total_assistant_sleep_time`
- `band_sleep`
- `band`

### Actions

This integration adds actions to set a fixed scene, schedule a delayed turn off, and, on the Philips Eyecare Smart Lamp 2, toggle the reminder, night light, and eyecare modes. For the full list, see [Actions](#list-of-actions).

## Xiaomi Smart WiFi Socket and Smart Power Strip

The Xiaomi Home switch platform allows you to control the state of your Xiaomi Smart WiFi Socket aka Plug, Xiaomi Smart Power Strip and Xiaomi Chuangmi Plug V1.

### Features

#### Xiaomi Smart WiFi Socket

Supported model IDs:

- `chuangmi.plug.m1`
- `chuangmi.plug.m3`
- `chuangmi.plug.v2`
- `chuangmi.plug.hmi205`
- `chuangmi.plug.hmi206`

##### Controls

- Turn the socket on or off.

##### Attributes

In addition to the standard switch attributes, the switch entity shows these attributes.

- `model`
- `temperature`

#### Xiaomi Chuangmi Plug V1

Supported model IDs:

- `chuangmi.plug.v1`
- `chuangmi.plug.v3`
- `chuangmi.plug.hmi208`

##### Controls

- Turn the plug on or off.
- Turn the USB port on or off.

##### Attributes

In addition to the standard switch attributes, the switch entities show these attributes.

- `model`
- `temperature`

#### Xiaomi Smart Power Strip

Supported model IDs:

- `qmi.powerstrip.v1`
- `zimi.powerstrip.v2`

##### Controls

- Turn the power strip on or off.
- Turn the Wi-Fi LED on or off.
- Set the power price, from 0 to 999.
- Set the power mode to Green or Normal. Only available on the `qmi.powerstrip.v1`.

##### Attributes

In addition to the standard switch attributes, the switch entity shows these attributes.

- `model`
- `temperature`
- `load_power`

On the `qmi.powerstrip.v1`, it also shows the `power_mode` attribute.

#### Xiaomi Air Conditioning Companion V3

Supported model ID: `lumi.acpartner.v3`.
The socket of the `lumi.acpartner.v1` and `lumi.acpartner.v2` can't be switched.

##### Controls

- Turn the socket on or off.

##### Attributes

In addition to the standard switch attributes, the switch entity shows these attributes.

- `model`
- `load_power`

### Actions

This integration adds actions to toggle the Wi-Fi LED and, on supported power strips, set the power mode and power price. For the full list, see [Actions](#list-of-actions).

{% include integrations/actions.md %}

## Retrieving the access token

Only retrieve an API token if you are setting up a device manually or configuring a Xiaomi Mi WiFi Repeater 2 or Xiaomi IR Remote in {% term "`configuration.yaml`" %}.
For other devices, sign in to your Xiaomi Home account during setup so Home Assistant can retrieve the token automatically.

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

3. Provide email address or username for Xiaomi's account, password, and country of the account (most used: CN - China Mainland, DE - Germany, and so on)
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

Note: If you have multiple devices needing a token, such as a Xiaomi Mi Robot Vacuum and a Xiaomi IR Remote, the above method may not work. The Xiaomi Home app will display a token, though it isn't the correct one. The alternative method using "Mi Home v5.4.49" will provide the correct token.

### Using the Get Mi Home Devices Token app

If you are on a Windows or macOS device, you can use the [Get MiHome devices token](https://github.com/Maxmudjon/Get_MiHome_devices_token/releases) App to retrieve the token. Click the link, download the file that corresponds to your OS, enter your login details and it will retrieve the access token.

### Alternative methods

{% note %}

If using an Android device to retrieve the Access Token only `v5.4.49` of Mi Home is confirmed working (December 2019). Use `v5.4.49` of Mi Home locate a text file under the `Smarthome/logs` folder where the 32 character token is stored. There will likely be several text files in this directory, search all of them for the word 'token' and you should find it there. Be advised that the latest version of Mi Home does not store the token in clear text.

The iPhone app still stores the token in the SQLite db as of `v4.23.4` (Nov 17, 2019).

After resetting the Wi-Fi settings of the Xiaomi robot vacuum, a new Access Token will be generated and therefore these instructions need to be followed again.

These instructions are written for the Mi Home app - not for the new RoboRock app.

This token (32 hexadecimal characters) is required for the Xiaomi Mi Robot Vacuum, Mi Robot 2 (Roborock) Vacuum, Xiaomi Philips Lights and Xiaomi IR Remote.

{% endnote %}

#### Android (not rooted)

> If using an Android device to retrieve the Access Token only `v5.4.49` of Mi Home is confirmed working (December 2019).

1. To begin, set up your Robovac with the latest version of Mi Home on your primary Android device as you normally would.
2. If your Robovac is already set up, you must reset its WiFi settings for it to get a new token.
3. Using `v5.4.49` of Mi Home locate a text file under the `Smarthome/logs` folder where the 32 character token is stored.
4. There will likely be several text files in this directory, search all of them for the word 'token' and you should find it there. Be advised that the latest version of Mi Home does not store the token in clear text.

#### Linux and rooted Android

1. To begin, set up your Robovac with the latest version of Mi Home on your primary Android device as you normally would.
2. Ensure successful operation using the latest Mi Home app and give the Vacuum a static IP in your router or however you do that on your LAN.
3. Install version `v5.4.54` of Mi Home on your rooted Android device and login (you can't have two version of Mi Home installed at the same time).
4. Ensure you are using the same server every time
5. Ensure successful operation using 5.4.54 (locate is a nice simple test)
6. Using adb we will now extract the token from the rooted phone
7. Use adb shell to connect to your device and become root (if using Magisck root do `adb shell -> su -> whoami` to ensure root access.
8. Then run grep -R '"token"' /data/data/com.xiaomi.smarthome and grab the token

#### iOS

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
11. Input and run this query (use appropriate SELECT query for your device, such as Vacuum, Powerstrip, or Plug):

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

#### Bluestacks

1. Configure the robot with the Mi-Home app. Make sure to select the correct region, as Xiaomi uses different product names for different geographical areas. Note that the new RoboRock app is currently not supported for this method.
2. Install [BlueStacks](https://www.bluestacks.com).
3. Set up [Mi Home version 5.4.49](https://www.apkmirror.com/apk/xiaomi-inc/mihome/mihome-5-4-49-release/) in BlueStacks and log in to synchronize devices.
4. Open Filemanager in the `More Apps` menu.
5. Use `Explore` on the left and navigate to `sdcard/SmartHome/logs/plug_DeviceManager`.
6. Click on `Export to Windows` in the lower left corner and select any or all files to export to you local disk.
7. Search for `"token":"<yourTokenHere>"`.

#### Miio command line tool

Use of Miio should be done before the Vacuum is connected to Xiaomi Home. If you already connected to the app you will need to delete it and then join the ad-hoc Wi-Fi network the Vacuum creates. If the vacuum is already paired it's likely this method will only return `???` as your token.

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
