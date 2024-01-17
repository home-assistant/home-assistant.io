---
title: "0.24: SQLAlchemy, KNX, Join by Joaoapps, and SimpliSafe."
description: "This new release of Home Assistant contains support for KNX, Join by Joaoapps, and SimpliSafe. As of now our new database backend is SQLAlchemy which gives you more flexibility for storing your data."
date: 2016-07-16 12:00:00 +0000
date_formatted: "July 16, 2016"
author: Fabian Affolter
author_twitter: fabaff
categories:
- Release-Notes
- Core
---

It's time for Home Assistant 0.24 and it's full of new integration for your Home. It contains some structural changes to our history which requires action from your end, so please keep reading.

[MapQuest] discontinued their free and direct tile access by Monday, July 11, 2016. With [CARTO] we found a very cool and suitable solution. They allow us to use their tile for the map. Thank you, [CARTO].

[Roy Hooper][@rhooper] did an amazing job migrating the history support from being tied to SQLite to use the ORM SQLAlchemy instead. This means that you can now use **any** SQL backend for the history. So besides SQLite you can now databases like MySQL or PostgreSQL. However, this does require that you install [SQLAlchemy] and run a command to migrate your existing history over. We tried to make the process as seamless as possible by introducing a new command line script: 

```bash
pip3 install SQLAlchemy
hass --script db_migrator --config /path/to/config
```

You can omit the `--config` option if you use the default configuration directory. Run the script with `--help` to get more options.

<img src='/images/supported_brands/joaoapps_join.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='150' /><img src='https://brands.home-assistant.io/knx/logo.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='150' /><img src='/images/supported_brands/tp-link.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='150' />

- Config: Improved support for storing [secrets][secrets] ([@kellerza])
- Sensor: Support for Yahoo! Weather ([@pvizeli])
- Add scripts to command line to expose advanced options ([@balloob])
- Alarm: [SimpliSafe][simplisafe] is now supported ([@w1ll1am23]) 
- Core: Switch to SQLAlchemy for the Recorder component ([@rhooper])
- Support for [Join by Joaoapps][join-joaoapps] added incl. [Join Notify][join-notify] ([@nkgilley])
- Media Player: [Plex] will no longer spam the logs if server goes offline ([@dale3h])
- Sensor: [APCUPSd Sensor][apcupsd-sensor] now supports names, icons and units ([@dale3h])
- Lock: [Verisure] entities will now use name instead of serial number for entity id ([@turbokongen])
- [StatsD] can now also export attributes ([@bah2830])
- Support for [KNX] added ([@usul27])
- Switch: [TPLink] HS100/HS110 now supported ([@GadgetReactor])
- Stability fixes for [RFXtrx] ([@Danielhiversen])
- Tweaks to [Z-Wave] ([@turbokongen])
- Light: [Brightness] now clamped to 0-255 ([@keatontaylor])
- Thermostat: [Radiotherm] HVAC mode now supported ([@danieljkemp])
- Sensor: [Google Travel] times can now use dynamic locations for start/end ([@bah2830])
- Notify: Allow sending photos to [Telegram] ([@pvizeli])
- Frontend: Improve loading times ([@balloob])
- Frontend: Fix stream not reconnecting after standby ([@balloob])
- Frontend: Wait up to two seconds for new state before resetting toggle after toggling state ([@balloob])

### Hotfix 0.24.1 - July 21

Quick hot fix after we found a bug in the migrator where it wouldn't work with a database in a non-standard location. Thanks to [@n8henrie] and [@AlucardZero].

### Backward-incompatible changes

- Migrating existing databases (see above).
- The [APCUPSd Sensor][apcupsd-sensor] was updated. This will need that you modify your `configuration.yaml` file.
- Entity IDs of Verisure locks will change. This is a one time change but should improve readability.

[@bah2830]: https://github.com/bah2830/
[@balloob]: https://github.com/balloob/
[@dale3h]: https://github.com/dale3h/
[@danieljkemp]: https://github.com/danieljkemp
[@GadgetReactor]: https://github.com/GadgetReactor
[@keatontaylor]: https://github.com/keatontaylor
[@kellerza]: https://github.com/kellerza/
[@nkgilley]: https://github.com/nkgilley
[@pvizeli]: https://github.com/pvizeli/
[@rhooper]: https://github.com/rhooper/
[@turbokongen]: https://github.com/turbokongen/
[@usul27]: https://github.com/usul27
[@w1ll1am23]: https://github.com/w1ll1am23/
[@n8henrie]: https://github.com/n8henrie/
[@AlucardZero]: https://github.com/AlucardZero/
[@Danielhiversen]: https://github.com/danielhiversen


[apcupsd-sensor]: /integrations/apcupsd#sensor
[Brightness]: /integrations/light/
[CARTO]: https://carto.com/
[Google Travel]: /integrations/google_travel_time
[imap-sensor]: /component/sensor.imap/
[join-joaoapps]: /integrations/joaoapps_join/
[join-notify]: /integrations/joaoapps_join
[KNX]: /integrations/knx/
[MapQuest]: https://www.mapquest.com/
[Plex]: /integrations/plex#media-player
[Radiotherm]: /integrations/radiotherm/
[recorder]: /integrations/recorder/
[secrets]: /topics/secrets/
[simplisafe]: /integrations/simplisafe
[SQLAlchemy]: http://www.sqlalchemy.org/
[StatsD]: /integrations/statsd/
[Telegram]: /integrations/telegram
[TPLink]: /integrations/tplink
[Verisure]: /integrations/verisure
[Z-Wave]: /integrations/zwave/
[RFXtrx]: /integrations/rfxtrx/
