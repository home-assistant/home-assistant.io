---
title: "0.19: Empowering scripts and Alexa"
description: "The new release of Home Assistant includes a lot of upgrades to how we handle scripts and make them available in a wide range of new components including automation and alexa."
date: 2016-05-07 11:06:00 -0700
date_formatted: "May 7, 2016"
author: Paulus Schoutsen
author_twitter: balloob
categories:
- Release-Notes
- Core
---

This release is big. Until now, our automations and scripts have been very static. Starting today it should all be a bit more dynamic.

**Scripts** are now available in automations and when responding to Alexa/Amazon Echo. Both of these components will now expose data to be used in script templates (including `from_state` !). Passing data to script entities is available by passing the data to the script services.

```yaml
automation:
  trigger:
    platform: mqtt
    topic: some/notify/topic
  action:
    service: notify.notify
    data:
      message: {{ trigger.payload }}

automation 2:
  trigger:
    platform: state
    entity_id: light.hue
  action:
    service: notify.notify
    data:
      message: {{ trigger.to_state.name }} is now {{ trigger.to_state.state }}
```

**Entity Namespaces** allow you to influence the entity ids for a specific platform. For example you can turn `light.living_room` into `light.holiday_home_living_room` with the following config:

```yaml
light:
  platform: hue
  entity_namespace: holiday_home
```

 - Automation: allow [script syntax] for action ([@balloob])
 - Automation: expose [`trigger` variable][trigger-variable] to script templates ([@balloob])
 - Script: allow passing variables for script templates in the [script service calls] ([@balloob])
 - Alexa/Amazon Echo: allow [script syntax] for action ([@balloob])
 - Alexa/Amazon Echo: [expose intent variables] to script templates ([@balloob])
 - Script syntax: [conditions now supported] to interrupt execution ([@balloob])
 - Automation: use [new condition syntax] ([@balloob])
 - Script syntax: two new conditions [`and`][con-and] and [`or`][con-or] to combine conditions ([@balloob])
 - Any platform: Allow setting [entity namespace] to prefix entity_ids. ([@balloob])
 - Switch: [Raspberry Pi generic 433 Mhz GPIO adapters][rpi-rf] now supported ([@milaq])
 - Z-Wave: use more sane defaults ([@danieljkemp])
 - Media Player: [Snapcast] now supports picking a source ([@happyleavesaoc])
 - MySensors: major cleanup ([@MartinHjelmare])
 - Binary Sensor: [Command line sensor] now supports classes ([@fabaff])
 - MQTT: [allow client key authentication] ([@timharton])
 - Sensor: [Forecast.io] now supports minutely, hourly and daily summaries ([@aceat64])
 - Media Player: [Pioneer AVR] now supported ([@kylehendricks])
 - Switch: [Acer Projectors] now supported ([@deisi])
 - New [HVAC component] added with Z-Wave support ([@turbokongen])
 - Support added for [OctoPrint] ([@w1ll1am23])
 - Configuration.yaml can now refer to environment variables using `!env_var` ([@bah2830])
 - Lock: [Z-Wave][lock.zwave] now supported ([@devdelay])
 - New [Dweet component] to export data ([@fabaff])
 - Media Player now supports stop command + initial kodi support ([@hmronline])
 - Zigbee: push updates now supported ([@flyte])
 - Wink devices with battery level will now show these ([@w1ll1am23])
 - Templates: new [`as_timestamp`] method now available ([@srcLurker])
 - API: Add [`/api/discovery_info`] with basic instance info ([@robbiet480])
 - Sensor: [Google Maps travel time] added ([@Danielhiversen])
 - HTTP: Allow adding [CORS headers] ([@robbiet480])
 - Sensor: [Fitbit] support added ([@robbiet480])
 - Bug fixes and tweaks by [@turbokongen], [@danieljkemp], [@Danielhiversen], [@TheRealLink], [@persandstrom], [@sander76], [@fabaff], [@ishults], [@Bart274], [@robbiet480], [@Cinntax], [@blackdog70], [@gwendalg], [@JshWright], [@kylehendricks], [@bradsk88], [@shaftoe], [@molobrakos], [@bah2830], [@nkgilley]

[script syntax]: /getting-started/scripts/
[trigger-variable]: /getting-started/automation-templating/#available-trigger-data
[script service calls]: /integrations/script/#passing-parameters-in-service-calls
[expose intent variables]: /integrations/alexa/#configuring-home-assistant
[conditions now supported]: /getting-started/scripts-conditions/
[new condition syntax]: /getting-started/scripts-conditions/
[con-and]: /getting-started/scripts-conditions/#and-condition
[con-or]: /getting-started/scripts-conditions/#or-condition
[entity namespace]: /topics/platform_options/#entity-namespace
[rpi-rf]: /integrations/rpi_rf
[Forecast.io]: /integrations/darksky
[Snapcast]: /integrations/snapcast
[Command line sensor]: /integrations/sensor.command_line/
[allow client key authentication]: /integrations/mqtt/
[Pioneer AVR]: /integrations/pioneer
[Acer Projectors]: /integrations/acer_projector
[HVAC component]: /integrations/climate/
[OctoPrint]: /integrations/octoprint/
[Z-Wave]: /integrations/zwave/
[lock]: /integrations/lock/
[lock.zwave]: /integrations/zwave#lock
[Dweet component]: /integrations/dweet/
[`as_timestamp`]: /topics/templating/#home-assistant-template-extensions
[Google Maps travel time]: /integrations/google_travel_time
[CORS headers]: /integrations/http/
[Fitbit]: /integrations/fitbit
[@balloob]: https://github.com/balloob/
[@milaq]: https://github.com/milaq/
[@danieljkemp]: https://github.com/danieljkemp/
[@happyleavesaoc]: https://github.com/happyleavesaoc/
[@MartinHjelmare]: https://github.com/MartinHjelmare/
[@fabaff]: https://github.com/fabaff/
[@timharton]: https://github.com/timharton/
[@aceat64]: https://github.com/aceat64/
[@kylehendricks]: https://github.com/kylehendricks/
[@deisi]: https://github.com/deisi/
[@turbokongen]: https://github.com/turbokongen/
[@w1ll1am23]: https://github.com/w1ll1am23/
[@bah2830]: https://github.com/bah2830/
[@devdelay]: https://github.com/devdelay/
[@hmronline]: https://github.com/hmronline/
[@flyte]: https://github.com/flyte/
[@srcLurker]: https://github.com/srcLurker/
[@robbiet480]: https://github.com/robbiet480/
[@Danielhiversen]: https://github.com/Danielhiversen/
[@TheRealLink]: https://github.com/TheRealLink/
[@persandstrom]: https://github.com/persandstrom/
[@sander76]: https://github.com/sander76/
[@ishults]: https://github.com/ishults/
[@Bart274]: https://github.com/Bart274/
[@Cinntax]: https://github.com/Cinntax/
[@blackdog70]: https://github.com/blackdog70/
[@gwendalg]: https://github.com/gwendalg/
[@JshWright]: https://github.com/JshWright/
[@bradsk88]: https://github.com/bradsk88/
[@shaftoe]: https://github.com/shaftoe/
[@molobrakos]: https://github.com/molobrakos/
[@nkgilley]: https://github.com/nkgilley/

### Deprecations
 - Conditions in automations should now specify which condition to use with `condition:` instead of `platform:`. For example `condition: state`.
 - RFXtrx has a new config format.

Old RFXtrx config format:

```yaml
  devices:
    123efab1:
      name: My DI.0 light device
      packetid: 1b2200000890efab1213f60
```

New RFXtrx config format:

```yaml
  devices:
    1b2200000890efab1213f60:
      name: My DI.0 light device
```
