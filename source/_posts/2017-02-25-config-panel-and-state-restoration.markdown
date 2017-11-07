---
layout: post
title: "0.39: Configuration panel, state restoration and improved docs"
description: "0.39 is by far our best release yet."
date: 2017-02-25 08:04:05 +0000
date_formatted: "February 25, 2017"
author: Paulus Schoutsen
author_twitter: balloob
comments: true
categories: Release-Notes
og_image: /images/blog/2017-02-0.39/social.png
---

It's time for 0.39 and this release has some amazing new features!

<a href='/components/#added_in_current_version'><img src='/images/blog/2017-02-0.39/social.png' style='border: 0;box-shadow: none;'></a>

## T-Shirts

First off, in case you haven't seen it yet: [we have t-shirts][t-shirt] now and they are beautiful. All proceeds from the shirts will be donated to the Electronic Frontier Foundation. The first three days all of you have already raised $400! Still waiting for Teespring to get back to me so stay tuned for the EU store.

## Configuration panel

Yep, you read that right. We have a configuration panel. It's just the first of many small steps. Putting in a foundation is important and gives us something to iterate on.

To start, we have three simple configuration panels:

 - Core: allows you to validate config, reload core/group/automation config and restart/stop Home Assistant
 - Group: allows you to rename groups, change type between group/view and reorder entities.
 - Z-Wave: allows you to set device specific configuration settings

<p class='img'>
  <img src='/images/blog/2017-02-0.39/config.png'>
  Screenshot of our new configuration panel.
</p>

As a security measure, the configuration panel will need to be activated in the config file to be activated. This can be done by adding the following to your `configuration.yaml`:

```yaml
config:
```

Using our configuration panels will require you to structure your groups and Z-Wave device config according to how the configuration panel expects it. This is on purpose as it we will not be aiming to build a system that supports both our extended set of configuration extend hooks and our configuration panels. It's one or the other.

To activate them in your config, create empty files `groups.yaml` and `zwave_device_config.yaml` in your config dir and add the following entries to your config:

```yaml
group: !include groups.yaml

zwave:
  device_config: !include zwave_device_config.yaml
```

_Note that this is the first release. Things will be missing, things might be broken._

## Reorganized documentation

Thanks to [Fabian][@fabaff] we have a great re-organized documentation. Is it perfect yet? No. But we are getting close. We put a lot of focus on making sure the Raspberry Pi is the main focus of our getting started. The other instructions are still available, just not as part of the main getting started.

## State restoration

Ever have some input components or integrations and get annoyed with the fact that their state is lost after a restart? Don't worry any longer. [Johann][@kellerza] has added the foundation for state restoration to Home Assistant. For the initial release support has been added to `input_select` and `input_boolean` components. We will be adding this to more integrations in the future.

## Breaking changes to customize and Z-Wave "customize"

A couple of releases ago we introduced a new way of doing `customize`. It became a list that allowed different ways of matching the config to the entity.

We realized that this was leading into a rabbit hole that we had to get out off. Besides making it unnecessarily complicated it also blocked the road to config panels. And who doesn't like config panels?

So starting this release, we had to make some breaking changes to right the wrong. We will be releasing an online tool to help you convert your config to the new format later today.

[**Update: the online tool can be found here.**](https://jsfiddle.net/balloob/d2e56q6f/74/)

#### Customize has been reverted to it's original config

The old customize is back. The options to match by domain or using glob have been moved to it's own options. It will now look like this:

```yaml
homeassistant:
  customize:
    light.kitchen:
      hidden: true
  customize_domain:
    light:
      icon: mdi:home
  customize_glob:
    "light.kitchen_*":
      icon: mid:description
```

#### Z-Wave customize is now device config

Ever wondered why the Z-Wave customize was called customize? Yeah, so did we. So when migrating this to the new config format, we decided to upgrade the name too:

```yaml
zwave:
  device_config:
    light.kitchen:
      ignored: true
  device_config_domain:
    light:
      polling_intensity: 2
  device_config_glob:
    "light.kitchen_*":
      polling_intensity: 0
```

## Speed improvements

And a final shout out to [Pascal][@pvizeli]. He keeps improving the performance of components and platforms all over Home Assistant.

<!--more-->

## All changes

#### New platforms/components

- [Telegram] webhooks ([@scipioni])
- Added [Openhome][openhome] support ([@bazwilliams])
- [UPS][ups] sensor ([@happyleavesaoc])
- [FEDex][fedex] sensor ([@happyleavesaoc])
- [Gstreamer][gstreamer] media player ([@happyleavesaoc])
- [iTach Remote][itach] Platform ([@alanfischer])
- [myq] cover component ([@arraylabs])
- Support for the [Open Energy Monitor Thermostat][oemt] ([@Cadair])
- Added Fritzbox [Netmonitor][netmonitor] ([@PetePriority])
- Add platform for [Yeelight Sunflower lights][sunflowers] ([@lindsaymarkward])
- Support for [Pocket Casts][pocket] ([@molobrakos])
- [VolvoOnCall][volvo] component with support for sensors, heater and lock ([@molobrakos])
- Add [pushsafer.com][pushsafer] notification service ([@appzer])
- [Websocket push][kodi] notifications for Kodi ([@armills])
- New component 'insteon_plm' and related platforms ([@nugget])
- Add [aurora][aurora] sensor ([@walkerdb])
- Add [Ebox][ebox] sensor platform ([@titilambert])
- Mediaplayer [clementine][clementine] remote ([@jjmontesl])
- Add [Fido][fido] sensor ([@titilambert])
- Add [History Statistics][history_stats] sensor platform ([@bokub])

#### Improvements

- Tellduslive: Don't throw exception if connection to server is lost ([@molobrakos])
- Core: Convert config.components to a set ([@balloob])
- Media Player - Apple TV: Handle connection errors when connecting to Apple TVs, re-use aiohttp session , add fake support for turn on/off ([@postlund])
- Zoneminder: Refactoring and JSON decode error handling ([@pschmitt])
- Recorder: Add tests for full schema migration, limit to session scope ([@armills])
- Device tracker - Tado: Add support for multiple devices to Tado device tracker ([@markoudev])
- Z-Wave: Fix zwave helper getter not to fail on some None results. ([@andrey-git])
- Core: `sensor_class` migrate to `device_class` ([@armills])
- Sensor - Amcrest: Avoid traceback for Amcrest cameras/firmware that does not have the software_information API call ([@tchellomello])
- Media Player - MPD: Adds play URL support to mpd ([@jjmontesl])
- Logbook: Component set add using OR ([@kellerza])
- Config: Add config component and hassbian example panel ([@balloob])
- Proximity: Fixed proximity zone incorrectly using name instead of zone setting ([@jjmontesl])
- Z-Wave: Add device_class support to cover component ([@armills])
- Config: Add check_config API ([@balloob])
- Media player: Add media_image to media_player component ([@postlund])
- Sensor- Vasttrafik.py: vasttrafik: update token on read error ([@persandstrom])
- Z-Wave.py: force_update zwave sensors ([@andrey-git])
- Core: Two stage shutdown ([@pvizeli])
- Z-Wave: Rename customize to device_config ([@balloob])
- Thingspeak: Use the correct API key ([@fabaff])
- Lock - Nuki: Reduce battery drain on Nuki Lock ([@pschmitt])
- Notify - Webostv: Only try to pair notify.webostv when not paired ([@andersonshatch])
- KNX: Fix slow status updates from the knx bus ([@keerts])
- HDMI CEC: HDMI_CEC customization [Breaking change] ([@balloob], [@andrey-git])
- Sensor - Moon: Remove unit of measurement ([@fabaff])
- Z-Wave: Add initial Z-Wave config panel ([@balloob])
- History: Allow printing the number of states returned by history and time it took to extract and add day ([@andrey-git])
- MQTT: Enable sensor for discovery ([@fabaff])
- Light - Limitlessled: Added limitlessled support for bridge v6 and RGBWW bulbs. ([@soldag])
- Config - Hassbian: Update hassbian component with real output ([@balloob])
- Media Player -Sonos: Bugfix sonos favorite_source after lost connection ([@pvizeli])
- Sensor - SenseHAT: Add flag to declare if SenseHAT is attached  ([@nodinosaur])
- RFLink: Reconnect robustness, expose connection state. ([@aequitas])
- Media player - CMUS: Remove IO from properties ([@armills])
- Light - Litejet: Lights should have the option to dim in the UI. ([@joncar])
- Light - Hue: Add effect_list to hue light ([@armills])
- Meida player - Liveboxplaytv: Update liveboxplaytv and catch connection errors ([@pschmitt])
- Llight - Lifx: Fix colortemp conversion for lifx lights ([@kitcorey])
- Light - Flux_LED: Update FLUX_LED by adding Effects ([@dramamoose])
- Alarm control panel - Simplisafe: SimpliSafe updates ([@w1ll1am23])
- Cover Add supported_features to cover component ([@armills])
- Wink: Added tamper detection to Wink devices. ([@w1ll1am23])
- Sensor - onewire: Add support for aliased owfs sensors ([@normakm])
- Weather: Forecast ([@Tommatheussen])
- Device tracker - ASUSwrt: Added support for alternate SSH ports in AsusWRT ([@swbradshaw])
- Zoneminder: Add camera mjpeg stream support ([@mnoorenberghe])
- Restore: Restore_state helper to restore entity states from the DB on startup ([@kellerza])
- Sensor - Darksky: Add 'entity_picture' to Darksky component ([@aronsky])
- Media Player - Samsungtv: Add support for waking up Samsung TVs over the network ([@justin8])
- MQTT: Convert MQTT platforms to async ([@pvizeli])
- tests/components/device_tracker/test_init.py: Restore for device_tracker ([@kellerza])
- Discovery: Make it possible to ignore platforms in discovery ([@postlund])
- Image processing: Add `device_class` ([@pvizeli])

### {% linkable_title Release 0.39.1 - February 27 %}

 - Add workaround for Paho out of memory issues ([@pvizeli])
 - When an error occurs while storing group config, fail instead of wiping config. ([@balloob])

### {% linkable_title Release 0.39.2 - March 1 %}

 - Move Zigbee from eventbus to dispatcher ([@pvizeli])
 - Fix discovery taking up all memory and cpu ([@balloob] + [@tomusher])

### {% linkable_title Release 0.39.3 - March 4 %}

 - Prevent discovered services and devices to be handled twice (@colinodell)

#### Breaking changes

 - VolvoOnCall has been extended with more features and had to be converted to a component
 - Limitlessled support for Bridge v6 and RGBWW bulbs require users to specify `version` and `port
 - hdmi_cec config now requires users to set the types in the hdmi_cec config instead of using `customize`:

```yaml
hdmi_cec:
  types:
    hdmi_cec.hdmi_5: media_player
```

#### Bugfixes:

[@pvizeli], [@LinuxChristian], [@molobrakos], [@balloob], [@rytilahti], [@fabaff], [@andrey-git], [@aequitas], [@konikvranik], [@Danielhiversen], [@colinodell], [@pschmitt], [@bachp], [@bachp],[@w1ll1am23], [@valentinalexeev], [@robbiet480], [@MartinHjelmare], [@happyleavesaoc], [@tdickman], [@arraylabs], [@lwis], [@titilambert]

### If you need help...
...don't hesitate to use our very active [forums][forum] or join us for a little [chat][discord]. The release notes have comments enabled but it's preferred if you use the former communication channels. Thanks.

### Reporting Issues
Experiencing issues introduced by this release? Please report them in our [issue tracker][issue]. Make sure to fill in all fields of the issue template.

[@tomusher]: https://github.com/tomusher
[@turbokongen]: https://github.com/turbokongen
[@w1ll1am23]: https://github.com/w1ll1am23
[@nugget]: https://github.com/nugget
[@PetePriority]: https://github.com/PetePriority
[@dramamoose]: https://github.com/dramamoose
[@fabaff]: https://github.com/fabaff
[@joncar]: https://github.com/joncar
[@alanfischer]: https://github.com/alanfischer
[@LinuxChristian]: https://github.com/LinuxChristian
[@justin8]: https://github.com/justin8
[@jjmontesl]: https://github.com/jjmontesl
[@tdickman]: https://github.com/tdickman
[@Danielhiversen]: https://github.com/Danielhiversen
[@pavoni]: https://github.com/pavoni
[@Tommatheussen]: https://github.com/Tommatheussen
[@pvizeli]: https://github.com/pvizeli
[@keerts]: https://github.com/keerts
[@arraylabs]: https://github.com/arraylabs
[@soldag]: https://github.com/soldag
[@walkerdb]: https://github.com/walkerdb
[@kellerza]: https://github.com/kellerza
[@MartinHjelmare]: https://github.com/MartinHjelmare
[@bazwilliams]: https://github.com/bazwilliams
[@appzer]: https://github.com/appzer
[@tchellomello]: https://github.com/tchellomello
[@aronsky]: https://github.com/aronsky
[@swbradshaw]: https://github.com/swbradshaw
[@colinodell]: https://github.com/colinodell
[@nodinosaur]: https://github.com/nodinosaur
[@happyleavesaoc]: https://github.com/happyleavesaoc
[@bokub]: https://github.com/bokub
[@markoudev]: https://github.com/markoudev
[@titilambert]: https://github.com/titilambert
[@aequitas]: https://github.com/aequitas
[@mnoorenberghe]: https://github.com/mnoorenberghe
[@Cadair]: https://github.com/Cadair
[@postlund]: https://github.com/postlund
[@konikvranik]: https://github.com/konikvranik
[@scipioni]: https://github.com/scipioni
[@andrey-git]: https://github.com/andrey-git
[@persandstrom]: https://github.com/persandstrom
[@lwis]: https://github.com/lwis
[@balloob]: https://github.com/balloob
[@bachp]: https://github.com/bachp
[@robbiet480]: https://github.com/robbiet480
[@lindsaymarkward]: https://github.com/lindsaymarkward
[@valentinalexeev]: https://github.com/valentinalexeev
[@armills]: https://github.com/armills
[@molobrakos]: https://github.com/molobrakos
[@normakm]: https://github.com/normakm
[@rytilahti]: https://github.com/rytilahti
[@pschmitt]: https://github.com/pschmitt
[@kitcorey]: https://github.com/kitcorey
[@andersonshatch]: https://github.com/andersonshatch

[telegram]: https://home-assistant.io/componet/telegram_webhooks/
[pushsafer]: https://home-assistant.io/components/notify.pushsafer/
[openhome]: https://home-assistant.io/components/media_player.openhome/
[ups]: https://home-assistant.io/components/sensor.ups/
[fedex]: https://home-assistant.io/components/sensor.fedex/
[fido]: https://home-assistant.io/components/sensor.fido/
[gstreamer]: https://home-assistant.io/components/media_player.gstreamer/
[clementine]: https://home-assistant.io/components/media_player.clementine/
[ebox]: https://home-assistant.io/components/sensor.ebox/
[aurora]: https://home-assistant.io/components/binary_sensor.aurora/
[netmonitor]: https://home-assistant.io/components/sensor.fritzbox_netmonitor/
[itach]: https://home-assistant.io/components/remote.itach/
[sunflowers]: https://home-assistant.io/components/light.yeelightsunflower/
[kodi]: https://home-assistant.io/components/media_player.kodi/
[myq]: https://home-assistant.io/components/cover.myq/
[oemt]: https://home-assistant.io/components/climate.oem/
[volvo]: https://home-assistant.io/components/volvooncall/
[pocket]: https://home-assistant.io/components/sensor.pocketcasts/
[config]: https://home-assistant.io/components/config/
[history_stats]: https://home-assistant.io/components/sensor.history_stats/


[docs]: https://home-assistant.io/docs/
[getting-started]: https://home-assistant.io/getting-started/
[docs-issue]: https://github.com/home-assistant/home-assistant.github.io/issues/1603

[forum]: https://community.home-assistant.io/
[issue]: https://github.com/home-assistant/home-assistant/issues
[t-shirt]: https://home-assistant.io/blog/2017/02/22/home-assistant-tshirts-have-arrived/
[discord]: https://discord.gg/c5DvZ4e
