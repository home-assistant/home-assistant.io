---
title: "Integrating your water usage"
description: "Learn how to add information about your water usage to Home Assistant home energy management."
---

Home Assistant allows you to track your water usage in the home energy management too.

Although water usage is not strictly "energy", it is still a valuable resource to track and monitor as it is often tightly coupled with energy usage (like gas). Additionally, it can help you reduce your ecological footprint by using less water.

### Home water meters

There are several ways to measure water usage in your home. Multiple methods exist for reading your water usage. Older water meters typically feature a common arrow or only display total consumption. For these meters, you may require an [AI-on-the-edge-device](https://github.com/jomjol/AI-on-the-edge-device) with an ESP32 camera. While effective, this solution can be tedious to set up as it leans towards a DIY approach.

Newer water meters are equipped with a rotary disk that can be read using two methods. The first method utilizes light sensors, while the second method employs proximity sensors. The proximity sensor detects changes in the magnetic field, with each rotation of the disk representing one liter of water used. Meanwhile, the light sensor method operates on an autocorrelation technique, providing accuracy down to 100 milliliters instead of the traditional one-liter step.

For most water meters, the rotary encoder disk suffices the light sensor version. However, some older or specialized meters may necessitate the use of a proximity meter instead.

Home Assistant also has integrations build into the platform that connect with existing products

## Home Assistant integrations

Home Assistant will need to know the amount of water that is being consumed to be able to track usage. Several [water metering (fluid flow rate sensor device)](https://en.wikipedia.org/wiki/Water_metering) hardware options are available to do this. Depending on your setup, the required hardware is provided by your public water utility company, or you may need to buy your own. 

Some hardware with water meters may also provide additional practical functions or sensors, such as [valve](/integrations/valve), for example, for controlling water shutoff, or temperature and pressure (to enable freeze alarms).

We have the following integrations available for existing products that can provide information about water usage:

- [Flo](/integrations/flo)
- [Flume](/integrations/flume)
- [HomeWizard Energy](/integrations/homewizard)
- [StreamLabs](/integrations/streamlabswater)
- [Suez Water](/integrations/suez_water)

There are also products for water usage monitoring that are based on existing common IoT protocol standards:

- [Z-Wave](/integrations/zwave_js)
- [Zigbee](/integrations/zha)
- [Matter](/integrations/matter)


## Community-made sensors

If your water meter lacks a rotary disk, magnetic disk, or coil. There are alternative solutions available to seamlessly integrate water monitoring into your smart home setup:

- [AI-on-the-edge-device](https://github.com/jomjol/AI-on-the-edge-device) is a project running on an ESP32-CAM and can be fully integrated into Home Assistant using the Home Assistant Discovery Functionality of MQTT. It digitalizes your gas/water/electricity meter display and provides its data in various ways.![Photo of the AI-on-the-edge-device Workflow](/images/docs/energy/

If you have a Culligan Water Softener, you may be able to interface with the inbuilt `DEBUG PORT` and receive water usage stats including `Gallons` (gal), `Gallons Per Minute` (gal/min), and `Gallons to Recharge` (gal):

- [cullAssistant](https://github.com/LelandSindt/cullAssistant) (ESPHome)

Alternatively, the following shops sell ESPHome-based devices that use a 3-phase light sensor to detect a rotating disk in your water meter and convert this to the amount of water used in milliliters (ml):
- [Muino water meter reader](https://watermeter.muino.nl/) (ESPHome)

Alternatively, the following shops sell ESPHome-based devices, that use a proximity sensor to detect a rotating magnet in your water meter and use that pulse to count each liter of water used:
- [S0tool](https://s0tool.nl/) ("Made for ESPHome" approved)
- [Waterlezer dongle](https://smart-stuff.nl/product/esphome-waterlezer-dongle/) (Dutch)
- [Slimme Watermeter Gateway](https://smartgateways.nl/product/slimme-watermeter-gateway/) (Dutch)
- [watermeterkit.nl](https://watermeterkit.nl/) (Dutch)

## DIY

Maybe you like to build one yourself?
- Pieter Brinkman has quite a [nice blog article on how to create your own water sensor](https://www.pieterbrinkman.com/2022/02/02/build-a-cheap-water-usage-sensor-using-esphome-home-assistant-and-a-proximity-sensor/) using ESPHome, or [build a water meter](https://www.ztatz.nl/p1-monitor-watermeter/) that works with the [P1 Monitor](/integrations/p1_monitor) integration.
- [AI-on-the-edge-device](https://github.com/jomjol/AI-on-the-edge-device) is a project running on an ESP32-CAM and can be fully integrated into Home Assistant using the Home Assistant Discovery Functionality of MQTT. It digitalizes your gas/water/electricity meter display and provides its data in various ways.![Photo of the AI-on-the-edge-device Workflow](/images/docs/energy/ai-on-the-edge-device.jpg)
- [watermeter](https://github.com/nohn/watermeter) running classic OCR and statistical pattern recognition on any system supporting Docker
- [Muino water meter reader 3-phase](https://muino.nl/product/3-phase-muino-light-sensor-encoder/) Using the 3-phase sensor technique, a battery-powered version can be possible with this sensor.
- [Read water meter with magnetometer](https://github.com/tronikos/esphome-magnetometer-water-gas-meter) using [QMC5883L](https://esphome.io/components/sensor/qmc5883l.html) or [HMC5883L](https://esphome.io/components/sensor/hmc5883l.html), common and inexpensive magnetometers. This should be compatible with all the water meters the Flume water sensor is compatible with, which is [compatible](https://help.flumewater.com/en/articles/1618594-is-the-flume-device-compatible-with-all-water-meters) with about 95% of water meters in the United States.

If you manually integrate your sensors, for example, using the [MQTT](/integrations/mqtt) or [RESTful](/integrations/rest) integrations: Make sure you set and provide the `device_class`, `state_class`, and `unit_of_measurement` for those sensors.

For any of the above-listed options, make sure it actually works with the type of water meter you have before getting one.
