---
title: "Home Assistant 0.40: Turn any Android phone into an IP Webcam"
description: "Big startup performance increase and tons of bug fixes for MQTT, Z-Wave."
date: 2017-03-11 08:04:05 +0000
date_formatted: "March 11, 2017"
author: Paulus Schoutsen
author_twitter: balloob
categories:
- Release-Notes
- Core
og_image: /images/blog/2017-03-0.40/social.png
---

<a href='/integrations/#added_in_current_version'><img src='/images/blog/2017-03-0.40/social.png' style='border: 0;box-shadow: none;'></a>

It's time for version 0.40 already! For this version, the main focus was on performance and bug fixes. Big thanks to [@pvizeli] for driving this effort. Startup is now super fast. We have also continued with adding warnings for components and platforms that are slowing down Home Assistant.

Some people have interpreted our recent added warnings as if 0.39 introduced the issues that caused the warning. This is not the case, the platforms and components have been misbehaving for a while but now we are adding warnings so we are able to track down the culprits.

Before we continue talking about all the improvements in this release I want to take a moment to thank a few people from the Home Assistant community that are fundamental to the success of Home Assistant. Big thanks to [@dale3h], [@CCOSTAN], [@skalavala], [@rrubin0], [@brahmafear], [@bassclarinetl2], and [@torn8o]! These are all people that hang out in our [main chat channel] and help new users get started and help existing users when running into trouble. Home Assistant would not be there without all the effort you put in! 🙇

And that our community kicks ass is also shown in the numbers. We have already raised together over $700 for the [EFF] via the sale of [our t-shirts][hass-shirt]! All of you rock! Another number worth mentioning is that this release brings us passed 600 integrations for Home Assistant. All of you rock, again!

## Z-Wave is now threadsafe

[@andrey-git] has spend a lot of time to make Z-Wave perform better. It should no longer cause Home Assistant to run slower or raise warnings about the timer getting out of sync.

## Update on the MQTT Out of Memory errors in 0.39

MQTT started causing "Out of Memory" errors for some people on a Raspberry Pi. We have been able to track this down to Raspberry Pis that are using an older firmware. If you are experiencing this issue, please [upgrade your firmware using `rpi-update`](https://github.com/Hexxeh/rpi-update#installing).

## Turn any Android phone into an IP Camera

With the new support for [IP Webcam](/integrations/android_ip_webcam/) added by [@robbiet480] and [@pvizeli] you are now able to re-purpose any Android phone to become a multifunctional IP webcam. Some of the cool things that you can do:

 - Integrate the Android device camera
 - Binary sensor when motion is detected
 - Sensors to expose the device sensors, including pressure, sound, battery, light
 - Control device features like the GPS, night vision and camera flash

<p class='img'>
<img src='/images/blog/2017-03-0.40/ipwebcam.png' />
Screenshot of all the different functionality the IP webcam integration offers.
</p>

## Other Highlights

 - Support added for Austrian weather using Zamg weather data ([@Zac-HD])
 - Ring.com video doorbell integration added ([@tchellomello])
 - Blink Home Security Camera support added ([@fronzbot])
 - AppleTV has been converted to push data to Home Assistant instead of us having to poll ([@postlund])

## Backward-incompatible changes

- Vera entity ids have changed. This is a one time change to migrate to a model that will prevent future conflicts.
- The Twilio notify platforms now have to be configured via the twilio component.

```yaml
twilio:
  account_sid: "abc"
  auth_token: "xyz"
```

- If you are using async custom components, the passed in `async_add_devices` method is now a callback instead of a coroutine function.

### If you need help...
...don't hesitate to use our very active [forums][forum] or join us for a little [chat][discord]. The release notes have comments enabled but it's preferred if you use the former communication channels. Thanks.

### Reporting Issues
Experiencing issues introduced by this release? Please report them in our [issue tracker][issue]. Make sure to fill in all fields of the issue template.

### Release 0.40.1 - March 16

- Fix wake_on_lan ping with None as host ([@iamtpage] - [#6532])
- Don't start the push updater if the Apple TV is 'off' ([@jnewland] - [#6552])
- Fix for the case of zwave value used in several devices. ([@andrey-git] - [#6577])
- Fix hydroquebec ([@titilambert] - [#6574])
- Update pyecobee version to 0.0.7 ([@dale3h] - [#6593])
- Update SMA solar sensor to work with the new add_devices callback ([@kellerza] - [#6602])
- since knx_2_float can't handle 0, bypass converting 0 value from knx to float ([@goofz] - [#6626])
- Fix Osram Lightify colors ([@deisi] - [#6598])
- Bugfix RFLINK remove group ([@pvizeli] - [#6580])

### Release 0.40.2 - March 22

Hot fix release to fix dependency issues. More detailed information about the issue in [this blog post](/blog/2017/03/22/broken-dependencies/).

- Prevent dependencies that are installed on demand from installing different versions of core dependencies ([@balloob] - [#6738])
- Upgrade PyChromecast to silent some benign errors ([@balloob] - [#6702])

<!--more-->

## All changes

- Cleanup run_callback_threadsafe ([@pvizeli])
- Use H2 headers to split up the different sections ([@colinodell])
- Refactory of envisalink ([@pvizeli])
- Create zwave devices on OZW thread and only add them during discovery ([@andrey-git])
- Bugfix restore startup state ([@kellerza])
- Random test fixes ([@balloob])
- Remove automatically reloading group config ([@balloob])
- Default config to setup group editor ([@balloob])
- minor broadlink fix ([@danielhiversen])
- Update Yeelight Sunflower light platform to 0.0.6 (@lindsaymarkwawrd)
- Some zwave cleanup ([@andrey-git])
- sensor.speedtest: provide a default icon ([@molobrakos])
- Test the temperature returned by RM2 ([@aronsky])
- Zamg weather ([@Zac-HD])
- Fix reporting on bad login ([@balloob])
- Move mqtt from eventbus to dispatcher / add unsub for dispatcher ([@pvizeli])
- Update flake8 and pylint to latest ([@andrey-git])
- Fix link ([@fabaff])
- Make glob preserve order ([@andrey-git])
- Update regex ([@fabaff])
- Fix recorder async ([@balloob])
- Fix livebox-play interactions for Python < 3.6 ([@pschmitt])
- Ensure we properly close HASS instances. ([@balloob])
- Add service to change log levels ([@postlund])
- Move ffmpeg to dispatcher from hass.data entity store. ([@pvizeli])
- Feature/reorg recorder ([@balloob])
- Bugfix mqtt socket error ([@pvizeli])
- Notify ciscospark ([@shenning00])
- Config fix ([@balloob])
- Bugfix mqtt paho client to speend time ([@pvizeli])
- Properly report features for each hue bulb type ([@jawilson])
- Local file camera now supports yet inexisting files. ([@jjmontesl])
- light.transition now supports float instead of int in order to be able to perform faster transitions ([@BillyNate])
- Fix for OSRAM lights connected to hue bridge ([@groth-its])
- Add support for MAX!Cube thermostats and window shutter sensors ([@BastianPoe])
- Analog modem callerid support ([@vroomfonde1])
- [sensor.dnsip] New Sensor: DNS IP ([@danielperna84])
- Update library version for Yeelight Sunflower lights platform (fix for packaging problem with 0.0.7) (@lindsaymarkwawrd)
- Prevent duplicate names on Vera devices by appending the device id ([@arjenfvellinga])
- Add temperature support for MH-Z19 CO2 sensor. ([@andrey-git])
- improve history_stats accuracy ([@bokub])
- Updated pyitachip2ir ([@alanfischer])
- Influx fix ([@open-homeautomation])
- Fix toggle and media_play_pause post async ([@armills])
- Migrate calendar setup to async. ([@pvizeli])
- Frontier silicon ([@zhelev])
- Bootstrap / Component setup async ([@pvizeli])
- Convert kpH and mpH to kph and mph ([@ericgingras])
- Rollback netdisco to 0.8.2 to resolve #6165 ([@deftdawg])
- Log errors when loading yaml ([@kellerza])
- Bootstrap tweaks tests ([@balloob])
- Telegram webhooks new text event ([@scipioni])
- Cleanup component track_point_in_utc_time usage ([@pvizeli])
- Discovery fix ([@balloob])
- Test against 3.6-dev ([@balloob])
- Bugfix Zigbee / Move from eventbus to dispatcher ([@pvizeli])
- Bump netdisco to 0.9.1 ([@balloob])
- sensor.dovado: compute state in update ([@molobrakos])
- Fix mysensors callback race ([@MartinHjelmare])
- Upgrade TwitterAPI to 2.4.5 ([@fabaff])
- Upgrade py-cpuinfo to 0.2.6 ([@fabaff])
- Template sensor change flow / add restore ([@pvizeli])
- Zwave optimize value_added ([@andrey-git])
- Update Vagrant provision.sh ([@shaftoe])
- Update Adafruit_Python_DHT to support new raspberry kernel ([@masarliev])
- Add fallback for name if userdevicename isn't set using old serialnumber logic ([@reedriley])
- Improve Honeywell US climate component ([@titilambert])
- Template binary_sensor change flow / add restore ([@pvizeli])
- Additional support for ecobee hold mode ([@Duoxilian])
- Update Formulas in Convert XY to RGB ([@dramamoose])
- Use dynamic ports for test instances ([@armills])
- Added support for multiple codes executed in a row ([@martinfrancois])
- Use push updates in Apple TV ([@postlund])
- Fix command sudo not found error in dev Dockerfile ([@jawilson])
- Fix calendar authentication text, and handle calendar events without summaries. ([@alanfischer])
- Move dispatcher out of init. ([@pvizeli])
- Zwave: Add remove/replace failed node services. ([@andrey-git])
- Template switch change flow / add restore ([@pvizeli])
- Bump limitlessled dependency to 1.0.5. ([@janLo])
- snmp: upgrade pysnmp to 4.3.4 ([@milaq])
- Bugfix new async_add_devices function ([@pvizeli])
- Restore for input_slider ([@pvizeli])
- Added IPv4 data collector ([@open-homeautomation])
- Return None instead of raising ValueException from as_timestamp template function. ([@jjmontesl])
- [recorder] Catch more startup errors #6179 ([@kellerza])
- twilio component ([@happyleavesaoc])
- Add Z-Wave battery level as a sensor. ([@andrey-git])
- OwnTrack Async ([@pvizeli])
- Fix possibility that have multiple topic subscribe mqtt ([@pvizeli])
- Migrate mqtt tracker and arwn sensor to async / cleanup owntrack ([@pvizeli])
- Z-Wave prevent I/O event loop ([@balloob])
- Update pwaqi to 3.0 to use public API ([@valentinalexeev])
- Update Hikvision Binary Sensors to latest library, remove pyDispatcher ([@mezz64])
- Don't initialize components which have already been discovered ([@colinodell])
- Comed Hourly Pricing sensor ([@joe248])
- Add multi contracts support for Hydroquebec ([@titilambert])
- Add Zwave refresh services ([@andrey-git])
- Add keep-alive feature to the generic thermostat ([@aronsky])
- Fix wake_on_lan for German version of Windows 10 (#6397) ([@siebert])
- flux led lib ([@danielhiversen])
- Cleanup async handling ([@pvizeli])
- Restore for automation entities ([@kellerza])
- Fix tests no internet ([@balloob])
- Prevent more I/O in apns ([@balloob])
- Restore flow on device_tracker platform ([@pvizeli])
- switch.tplink: catch exceptions coming from pyHS100 to avoid flooding the logs when the plug is not available ([@rytilahti])
- Added sensors to support Ring.com devices ([@tchellomello])
- Split bootstrap into bs + setup ([@balloob])
- Tweak recorder/restore_state ([@balloob])
- Fix unnecessary warning for ip bans.yaml ([@balloob])
- Better restore_state warnings ([@balloob])
- Set new color before turning LIFX bulbs on ([@amelchio])
- Don't log username and password in camera URL ([@ishults])
- Ignore deleted mails in IMAP unread count (#6394) ([@amelchio])
- Delay zwave updates for 100ms to group them. ([@andrey-git])
- Rename _scheduled_update to _update_scheduled ([@andrey-git])
- Revert "Use dynamic port allocation for tests" ([@armills])
- Tado device_tracker exception when mobile device has geofencing enabled but location is currently unknown. ([@jmvermeulen])
- Add a Z-wave workaround to do full refresh on update ([@andrey-git])
- Use bundled certificates if port matches mqtts ([@dennisdegreef])
- Bugfix samsungtv discovery ([@pvizeli])
- Added unittest for Ring sensor ([@tchellomello])
- Shorten recorder connection init ([@balloob])
- KWB Easyfire support ([@bimbar])
- Bumped version number for supporting lib ([@bazwilliams])
- Send a logo with webostv notifications ([@andersonshatch])
- Upgrade netdisco to 0.9.2 ([@balloob])
- Allow testing against uvloop ([@balloob])
- fix issue ([@appzer])
- Remove connection status state. ([@aequitas])
- Support for Blink Camera System ([@fronzbot])
- Add warning for slow platforms/components ([@balloob])
- Fix wake_on_lan ping for Linux. ([@siebert])
- Add support for remove services / Reload script support ([@pvizeli])
- Expand MQTT lights ([@robbiet480])
- Allow configurable conditions for Pi-Hole sensor ([@colinodell])
- Improved iCloud 2FA support. ([@reedriley])
- Update pymyq requirement ([@arraylabs])
- Not always assume manufacturername is present ([@balloob])
- Add first pass at Z-Wave light tests ([@balloob])
- Bugfix mqtt socket memory error ([@pvizeli])
- Increase upper limit on light transitions ([@amelchio])
- Bugfix android camera autodiscovery settings ([@pvizeli])
- Update to Pyunifi2.0 ([@finish06])
- Insteon lib ([@craigjmidwinter])
- Bugfix rpi_rf cleanup ([@pvizeli])
- Android webcam better error handling / pump library 0.4 ([@pvizeli])

[@BastianPoe]: https://github.com/BastianPoe
[@BillyNate]: https://github.com/BillyNate
[@Duoxilian]: https://github.com/Duoxilian
[@MartinHjelmare]: https://github.com/MartinHjelmare
[@Zac-HD]: https://github.com/Zac-HD
[@aequitas]: https://github.com/aequitas
[@alanfischer]: https://github.com/alanfischer
[@amelchio]: https://github.com/amelchio
[@andersonshatch]: https://github.com/andersonshatch
[@andrey-git]: https://github.com/andrey-git
[@appzer]: https://github.com/appzer
[@arjenfvellinga]: https://github.com/arjenfvellinga
[@armills]: https://github.com/armills
[@aronsky]: https://github.com/aronsky
[@arraylabs]: https://github.com/arraylabs
[@balloob]: https://github.com/balloob
[@bazwilliams]: https://github.com/bazwilliams
[@bimbar]: https://github.com/bimbar
[@bokub]: https://github.com/bokub
[@colinodell]: https://github.com/colinodell
[@danielhiversen]: https://github.com/danielhiversen
[@danielperna84]: https://github.com/danielperna84
[@dennisdegreef]: https://github.com/dennisdegreef
[@dramamoose]: https://github.com/dramamoose
[@fabaff]: https://github.com/fabaff
[@finish06]: https://github.com/finish06
[@fronzbot]: https://github.com/fronzbot
[@groth-its]: https://github.com/groth-its
[@happyleavesaoc]: https://github.com/happyleavesaoc
[@ishults]: https://github.com/ishults
[@janLo]: https://github.com/janLo
[@jawilson]: https://github.com/jawilson
[@jjmontesl]: https://github.com/jjmontesl
[@jmvermeulen]: https://github.com/jmvermeulen
[@joe248]: https://github.com/joe248
[@deftdawg]: https://github.com/deftdawg
[@kellerza]: https://github.com/kellerza
[@martinfrancois]: https://github.com/martinfrancois
[@masarliev]: https://github.com/masarliev
[@mezz64]: https://github.com/mezz64
[@milaq]: https://github.com/milaq
[@molobrakos]: https://github.com/molobrakos
[@open-homeautomation]: https://github.com/open-homeautomation
[@postlund]: https://github.com/postlund
[@pschmitt]: https://github.com/pschmitt
[@pvizeli]: https://github.com/pvizeli
[@reedriley]: https://github.com/reedriley
[@robbiet480]: https://github.com/robbiet480
[@rytilahti]: https://github.com/rytilahti
[@scipioni]: https://github.com/scipioni
[@shaftoe]: https://github.com/shaftoe
[@shenning00]: https://github.com/shenning00
[@siebert]: https://github.com/siebert
[@tchellomello]: https://github.com/tchellomello
[@titilambert]: https://github.com/titilambert
[@valentinalexeev]: https://github.com/valentinalexeev
[@vroomfonde1]: https://github.com/vroomfonde1
[@craigjmidwinter]: https://github.com/craigjmidwinter
[@zhelev]: https://github.com/zhelev
[main chat channel]: https://discord.gg/c5DvZ4e
[@dale3h]: https://github.com/dale3h
[@CCOSTAN]: https://github.com/CCOSTAN
[@skalavala]: https://github.com/skalavala
[@rrubin0]: https://github.com/rrubin0
[@brahmafear]: https://github.com/brahmafear
[@bassclarinetl2]: https://github.com/bassclarinetl2
[@torn8o]: https://github.com/torn8o
[forum]: https://community.home-assistant.io/
[issue]: https://github.com/home-assistant/home-assistant/issues
[EFF]: https://www.eff.org
[hass-shirt]: /blog/2017/02/22/home-assistant-tshirts-have-arrived/
[#6532]: https://github.com/home-assistant/home-assistant/pull/6532
[#6552]: https://github.com/home-assistant/home-assistant/pull/6552
[#6574]: https://github.com/home-assistant/home-assistant/pull/6574
[#6577]: https://github.com/home-assistant/home-assistant/pull/6577
[#6580]: https://github.com/home-assistant/home-assistant/pull/6580
[#6593]: https://github.com/home-assistant/home-assistant/pull/6593
[#6598]: https://github.com/home-assistant/home-assistant/pull/6598
[#6602]: https://github.com/home-assistant/home-assistant/pull/6602
[#6626]: https://github.com/home-assistant/home-assistant/pull/6626
[@deisi]: https://github.com/deisi
[@goofz]: https://github.com/goofz
[@iamtpage]: https://github.com/iamtpage
[@jnewland]: https://github.com/jnewland
[#6702]: https://github.com/home-assistant/home-assistant/pull/6702
[#6738]: https://github.com/home-assistant/home-assistant/pull/6738
[discord]: https://discord.gg/c5DvZ4e
