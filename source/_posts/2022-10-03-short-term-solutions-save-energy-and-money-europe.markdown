---
title: Short-term solutions on how to use smart home tech to save energy and money in Europe
description: "Overview of things that Europeans can do to start saving energy and money today – even if they rent a home."
date: 2022-10-03 00:00:00
date_formatted: "October 3, 2022"
author: Paulus Schoutsen
author_twitter: balloob
categories: Announcements
og_image: /images/blog/2022-10-03-short-term-solutions-save-energy-and-money-europe/shelly-trv.png
---

Europe has entered an energy crisis and prices for electricity and gas are skyrocketing. Rates of €1/kWh and €3,40 per m³ of gas are not uncommon. People are turning to their friends in the Home Assistant community asking for help on how to save energy. With winter around the corner, they want a solution that they can apply before it gets really cold.

The goal of this post is to give an overview of things that Europeans can do to start saving energy and money today – even if they rent a home. The focus is on homes using radiators and a boiler connected to a thermostat.

Heating is a complicated topic and you will probably still have questions after reading this post. Don’t hesitate to join the Home Assistant community to discuss how to save energy (do make sure to search before asking a question). Join us [in the forums][forums] in the energy category or come hang out in the #energy channel on our [Discord chat server][discord].

## Take control of your heating

Most of your energy usage goes into heating your house in the winter.

Gas is more efficient than electricity to heat your house, unless you have a heat pump. So don’t turn off your gas heating and replace it with an electric heater as it will cost you a lot more money.

There are two ways of saving energy with heating. The first approach is to invest in more efficient technology to generate heat and improve the home insulation to stay warm. Things like getting a heat pump, improving insulation and getting thicker windows. Those things are not achievable before winter kicks in, so they are out of scope for this post.

The second way of saving energy is to use less of it. Governments have been advising to lower the overall temperature of your home, but putting the temperature too low can get a little too cold. Instead, you can be smarter about how you heat your home by installing smart thermostats, temperature sensors and thermostatic radiator valves (TRV).

<p class='img'>
<img src='/images/blog/2022-10-03-short-term-solutions-save-energy-and-money-europe/shelly-trv.png'>
Photo of a Shelly TRV
</p>

## Smart Thermostats

A thermostat works by measuring the temperature. If the current temperature is below the target temperature set by the user, it turns on the heating until the home is the right temperature.

If you’re renting your home, you can skip this section as upgrading a thermostat is generally not an option.

The way a thermostat can help you save the most energy is by controlling the boiler, and preferably the boiler temperature. Heating the water is what drives the energy usage, so you wouldn’t want the boiler to heat the water to a higher temperature than is necessary to reach your target temperature.

Thermostats measure the temperature from the thermostat device. If the thermostat hangs in the last place in your home that gets warm, it might be heating more than you need. A smart thermostat can help by allowing you to pair extra temperature sensors to report the temperature in different rooms in your home. This allows the thermostat to turn off the heating earlier.

An extra bonus feature of a smart thermostat with remote control is that you’ll be able to change the temperature if you realize that you won’t be home at the scheduled time.

If you’re going to be in it for the long haul and want the easiest solution, you should invest in a smart thermostat that is part of a heating/cooling ecosystem that also has an API. Optimizing heating energy use is complicated and not something Home Assistant is good at out of the box. Instead, let that be managed by the ecosystem. The API allows you to still observe and influence it from Home Assistant to integrate presence and other data points the ecosystem is not aware of.

If you want full control over every part of heating your home, you don’t need to take the ecosystem route and instead invest in locally controllable thermostats, temperature sensors and TRVs and tie them together with Home Assistant. [Here is an example to get started.](https://community.home-assistant.io/t/smart-heating-scheduler-for-home-assistant-extra-multi-zones-version/237966)

### Recommended thermostats

It’s hard to give a single product recommendation here because there are so many different heating configurations and we are not aware of a single solution that works best in every case. Always check if the thermostat works with your boiler or other heating system you might use.

Home Assistant core developer Frenck researched this topic a couple of months ago for his own home and settled on [Plugwise](https://www.plugwise.com/). It controls his boiler and radiators and has a local API to integrate with Home Assistant.

Another popular solution is [Homematic IP](https://homematic-ip.com). It too has a local API to integrate with Home Assistant.

Here at Home Assistant we prefer devices that work locally. Any device that stores your data in the cloud will eventually need a way to recoup the cost of hosting your data. It also means that if the company goes out of business, the devices tend to stop working. However, we understand that your priority today is saving energy. If the above solutions don’t work well for your home, you can also consider [Netatmo](https://www.netatmo.com) or [Tado](https://www.tado.com).

We don’t recommend Google Nest because its ecosystem is not fully featured enough, as it does not support TRVs.

## Thermostatic Radiator Valves (TRV)

A TRV will replace the existing knob on your radiator with a smart one. This works too if you rent: just swap the old knob back when you move out. Installation generally takes just 5 minutes.

A TRV works like the thermostat of your house, but at the level of your radiator: you set the temperature that you want to reach, and it will open/close your radiator to get to the controlled temperature.

Having a TRV allows you to tune the temperature in individual rooms based on your schedule and/or planned usage, like only heating up the bathroom in the morning and around bedtime.

TRVs should be used to opt a room in/out of heating. Because heating the water in your boiler is still the biggest use of your energy, you should not use TRVs to turn off all radiators in your home or to reduce the temperature throughout the home. This should be done at the boiler level (usually via the thermostat). Keeping your boiler at the right (and not too high) temperature required to heat your home to the desired temperature is the biggest energy saver move you can do.

### Recommended TRVs

All three smart thermostats that we recommended are part of a product range that include TRVs. If you went with one of those, we suggest you stick to the ecosystem.

There are two devices that we recommend. Both work independently but also have a local API to allow plugging it into Home Assistant.

#### Shelly TRV

This device works standalone and does not require a hub. Battery life is claimed to be 2 years. It offers a local API and integrates perfectly with Home Assistant.

[Buy Shelly TRV](https://shop.shelly.cloud/shelly-trv-wifi-smart-home-automation?tracking=A7FsiPIfUWsFpnfKHa8SRyUYLXjr2hPq) _(affiliate link)_

<lite-youtube videoid="9M1EVjEaHfI" videotitle="Home Assistant Shelly TRV integration"></lite-youtube>

#### Aqara Smart Radiator Thermostat E1

The new kid on the block as it was just released. This TRV can be controlled directly from Home Assistant using Zigbee or via the Aqara hub. The hub can be locally integrated with Home Assistant via the [HomeKit Controller integration](/integrations/homekit_controller/).

Note: The vendor claims the device will support Matter in the future. It is unclear from their documentation if the device will speak Matter over Thread or that it will require their hub to expose the device over Matter. Our money is on the latter as that’s how they do HomeKit too.

[Buy Aqara Smart Radiator Thermostat E1](https://www.aqara.com/eu/product/radiator-thermostat-e1)

<lite-youtube videoid="ibFYGcAzyDM" videotitle="Simple Smart Home Heating In Minutes!"></lite-youtube>

## Automations that can save energy

Once you're able to control your thermostat and TRVs, you can start to save energy by automating your heating. Below are 5 useful automations to help with this.

<lite-youtube videoid="W9BdVneXTO8" videotitle="Save Energy and Costs with Home Assistant! 5 Tips!"></lite-youtube>

## Wrap up

Sadly, there is no golden solution to save energy that works for everyone everywhere. I hope that the above overview and tips will help you through the winter.

If some things are still not clear, don’t hesitate to join us in the forums in the energy category or come hang out in the #energy channel on our Discord chat server.

[forums]: https://community.home-assistant.io/c/energy/57
[discord]: /join-chat/
