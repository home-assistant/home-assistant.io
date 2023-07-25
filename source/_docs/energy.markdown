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

If you have a sensor that returns instantaneous power readings (W or kW), then to add a sensor that returns energy usage or generation (kWh) refer to [Riemann sum integral integration](/integrations/integration/#energy)

<img src='/images/docs/energy/energy-overview.png' alt='Visual representation of how all different energy forms relate.' style='border: 0;box-shadow: none;'>

## Troubleshooting missing entities 

### Condition

You are trying to add a sensor to the energy dashboard, but it does not appear in the selection list. 

### Resolution

To find out why the sensor is not showing, check the following points:
- The sensor must have the appropriate attributes. Check your entity attributes in {% my developer_states title="**Developer Tools** > **States**" %} to confirm the following:
  - `device_class` must be `energy` for electricity grid, solar, or battery categories. It must be `gas` for gas, or `water` for water.
  - `state_class` must be `total` or `total_increasing`.
  - The sensor must have an appropriate `unit_of_measurement`. See the help text for each category to see which units are accepted. Units containing an exponent must match superscript characters exactly as defined, e.g. `m³` is accepted, `m3` is not.
  
  If any of the attributes are not correct, please open an issue against the integration that provides your sensor, or if you are developing custom template sensors, make sure the templates have the correct settings.
 
- The entity must be a `sensor`. If you are trying to add something from another domain (for example an `input_number`), then you must first create a template sensor from it.
- The entity must not have any statistics errors. Go to {% my developer_statistics title="**Developer Tools** > **Statistics**" %} to check your specific entity. If your unit has a listed issue here, you must fix the issue before it can be added to the dashboard.
