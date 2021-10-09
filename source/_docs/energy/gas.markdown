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

Older meters are unlikely to have an LED that flashes. In fact, many don’t even have LED displays, but instead use multiple analogue dials to document usage in units of 1s, 10s, 100s, 1000s, 10,000s, etc. However, some of these meters can still use a pulse counter to determine usage.

As these analog dials often rotated based on a magnet spinning due to gas usage, a pulse counter could be constructed to count the magnetic “pulses”, or each time the magnetic made a completed rotation. In fact, many older meters were specifically designed with this in mind, and the single-digit dial is set up so that its complete rotation corresponds to the magnetic complete rotation. Some meters even had a spot under this dial to monitor magnetic pulses. 

By attaching a magnetic pulse counter under this single-digit dial, you can count the magnetic pulses and determine gas usage. Connecting back to Home Assistant can be done via a number of methods, such as ESPHome.

#### Listening for Smart Meter signals

Many modern meters are actually Smart Meters, which routinely report their usage and statistics via an RF or Cellular signal. This allows the Utility to collect the data without needing to send a person to physically read the meter. In the case of RF communication, it may be possible to listen for this signal to get your meter’s usage.

By buying an antenna tuned to the specific frequency, and connecting it via some interface to your computer, the RF signal can be consumed by a program. Software on the computer can then decode the signal into usable information. This is referred to as Software-Defined Radio (SDR). By combining this with a standard TV Tuner interface, you can connect an antenna to your computer via a USB attachment. As these tuners are based on an RTL chipset, this solution is commonly referred to as RTL-SDR. Both commercial and open-source solutions are available.

Note: this solution only works if the signal from your Smart Meter is unencrypted. While RF signals are unencrypted, some (and virtually all Cellular Signals) are encrypted. You may still be able to listen for encrypted communications from your Smart Meter, but you will not be able to discern any useful information from it.

#### Reading a Smart Meter’s display via Optical Character Recognition

If listening for a Smart Meter’s signal is not viable due to encryption, another option may be available depending on the type of Smart Meter display. Because Smart Meters need to read the meter usage to transmit it via RF or Cellular, most (but not necessarily all) Smart Meters use a digital display to physically display usage at the meter, instead of analogue dials. As digital displays almost exclusively use Seven Segment numbers, an image or live feed of the display can be fed into the computer, and through Optical Character Recognition (OCR) can translated into a number the computer can understand.

Home Assistant natively supports this type of translation via its SSOCR Integration (Seven Segment OCR). All that is needed is to feed the meter’s digital display into Home Assistant, which can be done by an IP Webcam.

### Install a Secondary Meter

If getting information from your existing meter is not possible, adding a second meter to your system is generally possible. Adding another meter has the benefit of letting you choose the exact solution that fits your needs. If placed directly after your Utilities meter, it will also provide the exact same information your Utility Meter does. This is not without drawbacks though. Meters are generally not cheap, not practical to install by yourself. And hiring a professional to do it likely costs the same, if not more, then the physical meter. But it is still a valid solution, and in some cases may be the only one.

#### Installing a Secondary Meter with a pulse counter

Just like reading a Utility Meter via a pulse counter, you can install a secondary meter which can be read by a pulse counter. While integrating a pulse counter into Home Assistant is some work, the main benefit of using this solution is it allows the secondary meter to be simple (and cheap). You can either buy the meter and pulse counter separately, which gives more choice in both, or get a pre-packaged meter with pulse counter attached. In either case, you’ll still have to integrate the pulse counter to Home Assistant.

#### Install a Secondary Smart Meter

Another, albeit expensive option, is to install a secondary meter that is meant to be used as a Smart Meter. As Smart Meters typically have more usage and statistical information available than regular meters, you will likely get the most information from them. However, this comes at a significant cost and complexity in integrating into Home Assistant.

One possible reason to pick this solution would be if you needed to install secondary meters for Electric, Gas, and Water (likely if you are unable to access any of the Utility Meters). Companies that sell meters often sell all three types, and have a unified solution for integrating them together. There may be some savings in using this approach, but probably only if your only solution was to install all three secondary meters.

### Estimating Gas Usage via Electric Usage and other Smart Home Devices

If you are unable (or unwilling) to modify your gas meter and/or setup, you may still be able to monitor gas usage through some type of estimation process. While by definition this will only be an estimate, it comes with the large benefit of not requiring you to change anything with your existing gas meter or setup. And by using other monitoring and smart devices, you should be able to get a reasonably accurate estimate. Perhaps not enough to predict your bill, but certainly enough to monitor usage, and even report unusual usage. 

#### Using Electricity usage to estimate Gas usage

Most household appliances that use gas (Fireplace, Stovetop, Dryer, Furnace, Water Heater) also use electricity to power their electronics and controls. As these electronics also monitor an appliance’s gas usage (for safety) and do something while the appliance is running, it is possible to use the appliance’s energy usage profile to infer when it’s using gas. By combining this with Automations, Helper Entities, and Template Sensors, you could create a Gas Usage sensor for your appliances and/or house.

This will likely be more of an Art then a Science. Determining what using gas will do to your appliance’s electric usage will largely depend on the specific appliance. You’ll need a smart plug that can monitor electricity usage and just monitor it over time to see what changes when you use the appliance. You’ll also need to figure out how much gas the appliance is consuming to tie into your smart system. The easiest way to do this is to note what the gas meter reads before the appliance starts and after its finishes.

WARNING: Most large appliances use a lot of electricity. Even ones that “run” off gas likely still draw more electricity than typical electronic loads like phones or tablets. When using a smart plug to monitor electricity usage, make sure to get one that can meet the load. The safest way to do this would be to look at the breaker it is connected to, and size it at or above that. But if this is not possible, looking at what the appliance max load is will work too.

#### Using on/off states and Duty Factors to estimate Gas usage

While monitoring electricity usage to determine gas usage will work for some gas appliances, it is not enough for all of them. A gas Dryer is the easiest to do with just electricity, as it has a clearly defined start and stop time, draws a noticeable amount of electricity when running, and should use a proportional amount of gas to its run time. However, other gas appliances are not as simple. Their gas usage depends on how long they are running and possibly even a setting for how much gas they can use. That said, it should still be possible to estimate usage when combined with other smart devices.

A Furnace is usually controlled by a thermostat, so with a smart thermostat, its gas usage can be estimated based on when it’s running. You’ll need to determine its gas usage per minute when running to determine total usage. You may also need to see if gas is consumed at a faster rate depending on how “hard” it is working (i.e. how much it needs to heat). A Water Heater can be monitored much the same way, by using a smart plug to determine if it is running (heating water) and a gas usage per minute calculation to determine total usage. A gas fireplace may or may not have electricity to work, but if it is smart (or made smart), you can determine when it is on and combine that with its gas consumption rate.

The hardest appliance to monitor is a gas Stovetop, because its gas usage is variable, and largely based on how many burners are on and how high they are set. The easiest way to do this would be to monitor the gas usage for a few cooking sessions and see if it is consistent enough to use an average value. If not, you could use a Duty-Factor based approach to determine averages. If you determine the gas usage of a few data points (i.e. one burner on low, multiple burners on low, multiple on medium, high, etc.) you could apply a duty factor to how often per week (or month) those situations will occur, and weight the average accordingly. It won’t be perfect, but with some iteration it should be close.

Note: when monitoring your gas meter for usage, make sure to only use one device at a time. For example, if you’re trying to monitor your dryer’s gas usage, don’t use a gas stovetop at the same time. For devices that can run on their own (like Furnaces or Water Heaters) you’ll need to either turn them off, or make sure they do not come on by themselves.
