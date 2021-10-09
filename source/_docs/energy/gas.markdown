---
title: "Integrating your gas usage"
description: "Learn how to add information about your gas usage to Home Assistant home energy management."
---

Some homes are connected to gas. Gas is being used to heat water, cook and heat up the home.

Home Assistant allows you to track your gas usage and easily compare it against your energy usage for the same period of time.

## Hardware

Home Assistant will need to know the amount of gas that is being consumed.

### Connect to your meter

The best way to get this data is directly from your gas meter that sits between your house and the grid. In certain countries these meters contain standardized ways of reading out the information locally or provide this information via the electricity meter.

#### Connect using a P1 port

The P1 port is a standardized port on electricity meters in the Netherlands, Belgium and Luxembourg which also provides gas consumption information. A P1 reader can connect to this port and receive real-time information.

We have worked with creator [Marcel Zuidwijk](https://www.zuidwijk.com) to develop [SlimmeLezer](https://www.slimmelezer.nl). It's an affordable P1 reader powered by [ESPHome](https://esphome.io) that will seamlessly integrate this information in Home Assistant. It is being sold on [his website](https://www.slimmelezer.nl) and the firmware is open source [on GitHub](https://github.com/zuidwijk/dsmr).

![Photo of SlimmeLezer attached to a smart electricity meter](/images/docs/energy/slimmelezer.jpg)

#### Reading the meter via a pulse counter

Some Gas Meters, similar to Electric Meters, have an LED that will flash whenever a fixed amount of energy passes through it. By monitoring the time between flashes it’s possible to determine the energy consumption.

Like Electric Meters, you can use Home Assistant Glow, an open source solution powered by ESPHome’s pulse meter sensor. You put it on top of the activity LED of your gas meter and it will bring your consumption into Home Assistant.

#### Reading the meter via a magnetic pulse counter

Older meters are unlikely to have an LED that flashes, but instead use multiple analogue dials to document usage in units of 1s, 10s, 100s, 1000s, 10,000s, etc.

As these analog dials rotated based on a magnet spinning from gas usage, a pulse counter could be constructed to count the magnetic “pulses”, or each time the magnetic makes a completed rotation. In fact, some meters even had a spot under one of the dials to monitor pulses. 

By attaching a magnetic pulse counter under this dial (usually the single-digit one), you can count the magnetic pulses and determine gas usage. Connecting the pulse counter back to Home Assistant can be done via a number of methods, such as ESPHome.

#### Listening for Smart Meter signals

Many modern meters are actually Smart Meters, which routinely report their usage statistics via an RF or Cellular signal. This allows the Utility to collect the data without needing to send a person to physically read the meter. In the case of RF communication, it may be possible to listen for this signal to get your meter’s usage.

One way to do this is via Software-Defined Radio (SDR), which combines an antenna with a standard TV Tuner interface so a program on a computer can listen for various RF signals. As most TV tuners are based on an RTL chipset, this solution is commonly referred to as RTL-SDR. Both commercial and open-source solutions are available.

Note: this solution only works if the signal from your Smart Meter is unencrypted. While most RF signals are unencrypted, some (and virtually all cellular signals) are encrypted. You may be able to listen for encrypted communications from your Smart Meter, but you will not be able to discern any useful information from them.

#### Reading a Smart Meter’s display via Optical Character Recognition

If listening for a Smart Meter’s signal is not viable due to encryption, if your Smart Meter has a digital display, you could point a camera at it and use Optical Character Recognition (OCR) to translate what it sees into a number the computer can understand.

Home Assistant natively supports this via the SSOCR Integration (Seven Segment OCR). All that is needed is to feed the meter’s digital display into Home Assistant, which can be done by an IP Webcam.

### Install a Secondary Meter

If getting information from your existing meter is not possible, adding a second meter to your system is generally an option, and if placed directly after your Utilities meter it will also provide the exact same usage that your utility sees. In general, any of the same solutions for connecting to your meter will work with a secondary meter, depending on the meter's construction.

### Estimating Gas Usage via Electric Usage and other Smart Home Devices

If you are unable (or unwilling) to modify your gas meter and/or setup, you can still monitor gas usage through estimation. While by definition this will only be an estimate, it comes with the benefit of not requiring you to change anything with your existing gas meter or setup.

Most household appliances that use gas (Fireplace, Stovetop, Dryer, Furnace, Water Heater) also use electricity to power their electronics and controls. Using this, it is possible to use the appliance’s energy usage profile to infer when it’s using gas. By combining this with Automations, Helper Entities, and Template Sensors, you can create a Gas Usage sensor for your appliances and/or house.

WARNING: Most large appliances use a lot of electricity, more than most other devices. Be sure to pick any smart devices carefully.
