Current transformer (CT) clamp sensors measure your energy usage by looking at the current passing through an electrical wire. This makes it possible to calculate the energy usage. In Home Assistant we have support for off-the-shelf CT clamp sensors or you can build your own.

- The off-the-shelf solution that we advise is the [Shelly EM](https://www.shelly.com/products/shelly-em-50a-clamp-1?tracking=A7FsiPIfUWsFpnfKHa8SRyUYLXjr2hPq). The device has a local API, updates are pushed to Home Assistant and it has a high quality [integration](/integrations/shelly/).
- You can build your own using ESPHome's [CT Clamp Current sensor](https://esphome.io/components/sensor/ct_clamp/) or energy meter sensors like the [ATM90E32](https://esphome.io/components/sensor/atm90e32/). For the DIY route, check out [this video by digiblur](https://www.youtube.com/watch?v=n2XZzciz0s4) to get started.
- Using a Raspberry Pi, you can use a CT clamp HAT from LeChacal called [RPICT hats](https://lechacal.com/docs/RPICT/Raspberrypi_Current_and_Temperature_Sensor_Adaptor/). They can be stacked to expand the number of lines to monitor. They also provide Active, Apparent, and Reactive power and power factor for single-phase and three-phase installations. They integrate with Home Assistant using MQTT.

_Attention! Installing CT clamp sensor devices requires opening your electrical cabinet. This work should be done by someone familiar with electrical wiring and may require a licensed professional in some regions. Your qualified installer will know how to do this._

_Disclaimer: Some links in this section are affiliate links._

**Using a dedicated energy meter**

A dedicated energy meter gives you the most accurate readings. Many energy meters also use a CT clamp, but because they measure the voltage and power factor in addition to the current, they can report the actual power and energy accurately. Many DIN-rail energy meters report cumulative energy (kWh) directly and can be integrated using [Modbus](/integrations/modbus/) or [ESPHome](https://esphome.io/).

**Why a current-only CT clamp can be inaccurate**

A DIY CT clamp that measures only current has to assume the voltage and power factor to calculate the power. Power factor describes how much of the current actually does useful work. Inverters, battery systems, and other electronics can draw current that does little or no useful work, even when they are producing or using almost no power. A current-only clamp cannot tell the difference. It multiplies the current it measures by an assumed voltage, so it can report power that is not really flowing.

For example, a solar inverter left idle overnight can still draw a small standby current. In reality this is a small amount of energy being consumed, not produced, but a current-only clamp cannot tell the direction of flow. It may report this current as production, even though the panels are generating nothing. Depending on the inverter, this false reading is often tens to hundreds of watts, which can add up to a noticeable amount of energy over time.
