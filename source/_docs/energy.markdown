---
title: "Understanding Home Energy Management"
description: "How to get started using home energy management in Home Assistant."
---

Home Assistant allows you to get on top of your energy use with its home energy management feature. Gain new insights, optimize your solar panel production, plan energy usage and save money.

{% my energy badge %} {% my config_energy badge %}

Home Assistant works with three different types of information sources. You can start using it even if you just have one source connected to Home Assistant. Every source you add will complement the other sources, giving you even more insight into energy in your home.

## Understanding data collection
The [Recorder](https://www.home-assistant.io/integrations/recorder/) integration stores the sensor details and the [Statistics](https://www.home-assistant.io/integrations/statistics/) sensor platform calculates and saves statistics in the database. 
Sensors need to have a [device_class](https://www.home-assistant.io/integrations/sensor/#device-class) (e.g. `Energy` or `Gas`) and [state_class](https://developers.home-assistant.io/docs/core/entity/sensor/#available-state-classes) (e.g. `measurement` or `total_increasing`) set to values matching the energy type.
Collecting statistics for the home energy management can take up to two hours. Statistics for Energy management can be cleared manually or via the [Service Purge](https://www.home-assistant.io/integrations/recorder/#service-purge).

## Hardware
Home Assistant is an open platform and so home energy management is not restricted to specific hardware. Any energy monitoring hardware that integrates with Home Assistant can be used as a data source. Check out the following sections for in-depth explanations and hardware recommendations.

- [Integrate your energy use from the electricity grid](/docs/energy/electricity-grid/)
- [Integrate your solar panels](/docs/energy/solar-panels/)
- [Integrate your home batteries](/docs/energy/battery/)
- [Integrate your gas consumption](/docs/energy/gas/)
- [Integrate individual devices](/docs/energy/individual-devices/)

<img src='/images/docs/energy/energy-overview.png' alt='Visual representation of how all different energy forms relate.' style='border: 0;box-shadow: none;'>
