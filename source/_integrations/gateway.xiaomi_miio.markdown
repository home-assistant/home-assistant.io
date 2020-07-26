---
title: "Xiaomi Gateway"
description: "Instructions on how to integrate your Xiaomi Gateway within Home Assistant."
ha_category:
  - Hub
ha_iot_class: Local Polling
ha_release: '0.110'
ha_domain: xiaomi_miio
---

The `xiaomi_miio` gateway integration allows you to control the gateway and its connected subdevices.

Please follow the instructions on [Retrieving the Access Token](/integrations/vacuum.xiaomi_miio/#retrieving-the-access-token) to get the API token to use during configuration flow setup.

## Configuration flow setup

To set up the Xiaomi gateway, click Configuration in the sidebar, then click Integrations and then click the + icon in the lower right and find xiaomi_miio. Select the option "Connect to a Xiaomi Gateway" and click submit. You will then be presented with a form in which you will need to fill in the "IP address" and 32 characters "token". Optionally, you can specify a different name for the gateway. After you click submit, you will have the opportunity to select the area that your devices are located.

{% configuration %}
host:
  description: The IP address of your Xiaomi gateway.
  required: true
  type: string
token:
  description: The API token of your Xiaomi gateway [Retrieving the Access Token](/integrations/vacuum.xiaomi_miio/#retrieving-the-access-token).
  required: true
  type: string
name:
  description: The name of your Xiaomi gateway.
  required: false
  type: string
  default: Xiaomi Gateway
{% endconfiguration %}

## Supported Xiaomi gateway models:

| Gateway name       | Zigbee id           | model        | supported                                 |
| ------------------ | ------------------- | ------------ |------------------------------------------ |
| Chinese version    | lumi.gateway.v3     | DGNWG02LM    | yes                                       |
| European version   | lumi.gateway.mieu01 | ZHWG11LM-763 | only gateway features (no subdevices yet) |
| Aqara hub          | lumi.gateway.aqhm01 | ZHWG11LM     | untested                                  |
| Mijia Zigbee 3.0   | lumi.gateway.mgl03  | ZNDMWG03LM   | untested                                  |
| Aqara AC Companion | lumi.acpartner.v1   | KTBL01LM     | untested                                  |
| Mi AC Companion    | lumi.acpartner.v2   | KTBL02LM     | untested                                  |
| Aqara AC Companion | lumi.acpartner.v3   | KTBL11LM     | yes                                       |


## Gateway Features

- Gateway alarm control (Turn on/off; see status `armed_away`, `disarmed`, `arming`)

Not yet implemented features (but possible):

- Gateway light control
- Gateway light sensor readout
- Gateway internet radio (only chinese stations)

## Supported subdevices

These subdevices are fully implemented in HomeAssistant:

| Subdevice name                   | Zigbee id               | model           | features                                         |
| -------------------------------- | ----------------------- | --------------- | ------------------------------------------------ |
| Weather sensor                   | lumi.sensor_ht          | WSDCGQ01LM      | readout `temperature` and `humidity`             |
| Weather sensor                   | lumi.weather.v1         | WSDCGQ11LM      | readout `temperature`, `humidity` and `pressure` |

## Recognized subdevices (not yet implemented)

These subdevices are recognized by the python-miio code but are still being worked on (not yet implemented).

| Subdevice name                   | Zigbee id               | model           |
| -------------------------------- | ----------------------- | --------------- |
| Button                           | lumi.sensor_switch      | WXKG01LM        |
| Button                           | lumi.sensor_switch.aq2  | WXKG11LM 2015   |
| Button                           | lumi.sensor_switch.aq3  | WXKG12LM        |
| Button                           | lumi.remote.b1acn01     | WXKG11LM 2018   |
| Cube                             | lumi.sensor_cube.v1     | MFKZQ01LM       |
| Cube                             | lumi.sensor_cube.aqgl01 | MFKZQ01LM       |
| Motion sensor                    | lumi.sensor_motion      | RTCGQ01LM       |
| Motion sensor                    | lumi.sensor_motion.aq2  | RTCGQ11LM       |
| Door sensor                      | lumi.sensor_magnet      | MCCGQ01LM       |
| Door sensor                      | lumi.sensor_magnet.aq2  | MCCGQ11LM       |
| Vibration sensor                 | lumi.vibration.aq1      | DJT11LM         |
| Honeywell smoke detector         | lumi.sensor_smoke       | JTYJ-GD-01LM/BW |
| Honeywell natural gas detector   | lumi.sensor_natgas      | JTQJ-BF-01LM/BW |
| Water leak sensor                | lumi.sensor_wleak.aq1   | SJCGQ11LM       |
| Remote switch single             | lumi.sensor_86sw1.v1    | WXKG03LM 2016   |
| Remote switch single             | lumi.remote.b186acn01   | WXKG03LM 2018   |
| D1 remote switch single          | lumi.remote.b186acn02   | WXKG06LM        |
| Remote switch double             | lumi.sensor_86sw2.v1    | WXKG02LM 2016   |
| Remote switch double             | lumi.remote.b286acn01   | WXKG02LM 2018   |
| D1 remote switch double          | lumi.remote.b286acn02   | WXKG07LM        |
| Wall switch single               | lumi.ctrl_ln1           | QBKG11LM        |
| Wall switch single               | lumi.ctrl_ln1.aq1       | QBKG11LM        |
| Wall switch no neutral           | lumi.ctrl_neutral1.v1   | QBKG04LM        |
| Wall switch double               | lumi.ctrl_ln2           | QBKG12LM        |
| Wall switch double               | lumi.ctrl_ln2.aq1       | QBKG12LM        |
| Wall switch double no neutral    | lumi.ctrl_neutral2      | QBKG03LM        |
| D1 wall switch triple            | lumi.switch.n3acn3      | QBKG26LM        |
| D1 wall switch triple no neutral | lumi.switch.l3acn3      | QBKG25LM        |
| Wall outlet                      | lumi.ctrl_86plug.v1     | QBCZ11LM        |
| Wall outlet                      | lumi.ctrl_86plug.aq1    | QBCZ11LM        |
| Plug                             | lumi.plug               | ZNCZ02LM        |
| Relay                            | lumi.relay.c2acn01      | LLKZMK11LM      |
| Curtain                          | lumi.curtain            | ZNCLDJ11LM      |
| Curtain                          | lumi.curtain.aq2        | ZNGZDJ11LM      |
| Curtain B1                       | lumi.curtain.hagl04     | ZNCLDJ12LM      |
| Door lock S1                     | lumi.lock.aq1           | ZNMS11LM        |
| Door lock S2                     | lumi.lock.acn02         | ZNMS12LM        |
| Door lock S2 pro                 | lumi.lock.acn03         | ZNMS13LM        |
| Vima cylinder lock               | lumi.lock.v1            | A6121           |
| Smart bulb E27                   | lumi.light.aqcn02       | ZNLDP12LM       |
| IKEA smart bulb E27 white        | ikea.light.led1545g12   | LED1545G12      |
| IKEA smart bulb E27 white        | ikea.light.led1546g12   | LED1546G12      |
| IKEA smart bulb E12 white        | ikea.light.led1536g5    | LED1536G5       |
| IKEA smart bulb GU10 white       | ikea.light.led1537r6    | LED1537R6       |
| IKEA smart bulb E27 white        | ikea.light.led1623g12   | LED1623G12      |
| IKEA smart bulb GU10 white       | ikea.light.led1650r5    | LED1650R5       |
| IKEA smart bulb E12 white        | ikea.light.led1649c5    | LED1649C5       |
| Thermostat S2                    | lumi.airrtc.tcpecn02    | KTWKQ03ES       |
