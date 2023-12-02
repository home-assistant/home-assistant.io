Current transformer (CT) clamp sensors measure your energy usage by looking at the current passing through an electrical wire. This makes it possible to calculate the energy usage. In Home Assistant we have support for off-the-shelf CT clamp sensors or you can build your own.

- The off-the-shelf solution that we advise is the [Shelly EM](https://www.shelly.com/en/products/shop/shelly-em-120a/shelly-em-50a?tracking=A7FsiPIfUWsFpnfKHa8SRyUYLXjr2hPq). The device has a local API, updates are pushed to Home Assistant and it has a high quality [integration](/integrations/shelly/).
- You can build your own using ESPHome's [CT Clamp Current sensor](https://esphome.io/components/sensor/ct_clamp.html) or energy meter sensors like the [ATM90E32](https://esphome.io/components/sensor/atm90e32.html). For the DIY route, check out [this video by digiblur](https://www.youtube.com/watch?v=n2XZzciz0s4) to get started.

_Attention! Installing CT clamp sensor devices requires opening your electrical cabinet. This work should be done by someone familiar with electrical wiring and may require a licensed professional in some regions. Your qualified installer will know how to do this._

_Disclaimer: Some links in this section are affiliate links._