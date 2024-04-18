---
title: "Understanding Home Energy Management"
description: "How to get started using home energy management in Home Assistant."
---

Home Assistant allows you to get on top of your energy use with its home energy management feature. Gain new insights, optimize your solar panel production, plan energy usage and save money.

{% my energy badge %} {% my config_energy badge %}

Home energy management works with three different types of information sources. You can start using it even if you just have one source connected to Home Assistant. Every source you add will complement the other sources, giving you even more insight into energy in your home.

Home Assistant is an open platform and so home energy management is not restricted to specific hardware. Any energy monitoring hardware that integrates with Home Assistant can be used as a data source. Check out the following sections for in-depth explanations and hardware recommendations.

- [Integrate your energy use from the electricity grid](/docs/energy/electricity-grid/)
- [Integrate your solar panels](/docs/energy/solar-panels/)
- [Integrate your home batteries](/docs/energy/battery/)
- [Integrate your gas consumption](/docs/energy/gas/)
- [Integrate your water consumption](/docs/energy/water/)
- [Integrate individual devices](/docs/energy/individual-devices/)

If you have a sensor that returns instantaneous power readings (W or kW), then to add a sensor that returns energy usage or generation (kWh), refer to the [Riemann sum integral integration](/integrations/integration/#energy).

<img src='/images/docs/energy/energy-overview.png' alt='Visual representation of how all different energy forms relate.' style='border: 0;box-shadow: none;'>
