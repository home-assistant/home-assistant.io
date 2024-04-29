---
title: "0.30: More Async, HASSbian, Digital Ocean, statistics, REST"
description: "More asynchronous, HASSbian image, Support for Digital Ocean, statistics, Västtrafik public transport, and Hacktoberfest."
date: 2016-10-08 03:04:05 +0000
date_formatted: "October 08, 2016"
author: Fabian Affolter
author_twitter: fabaff
categories:
- Release-Notes
- Core
---

Yes, after only nine days comes 0.30. Don't worry, we will try to keep our usual release cycle and not start to release every day.

We guess that you already know: The [Raspberry Pi image][pi-image] is available now. For Hassbian, [@Landrash] has combined the most essential parts for a Home Assistant setup in an easy-to-use image for the Raspberry Pi device family. Hassbian is quite young, thus we are looking forward to receive [feedback][hassbian-forum], [issue report][hassbian-forum], and [suggestions][hassbian-forum] to improve it.

A large amount of resources of the development are still focusing on the effort to move Home Assistant further to asynchronous programming. It's a labor-intensive task, comes with segmentation faults, and unstable instances when certain combinations of sensors are used. The benefit will be more speed in the near future.

To reduce the run-time of your tests, [@balloob] did a lot of tweaking. For now the RFXtrx tests are excluded which cut the needed time for running on your Pull Request in half.

### Documentation

All configuration sample entries are now minimized. This should help to avoid problem for starters and newbies as they only get what's needed and not a full sample with all optional entries. If there is an issue with an entry in your `configuration.yaml` file the error message will provide you an URL that point to the documentation.

<p class='img'>
  <img src='/images/screenshots/config-validation-url.png' />
</p>

As soon as the [Hacktoberfest] started there were a lot of incoming Pull Requests for the documentation. A huge "Thank you" to all participants. Especially, we would like to give a cookie to [@hillaryfraley]. She created around a dozen Pull Requests so far and didn't only fix typos but complete sections. The [Hacktoberfest] is still on-going and we are looking forward to get more Pull Requests.

### Statistics

With the [statistics sensor][stats-sensor] we would like to introduce a new sensor that is similar to the [template sensor][template-sensor] or the [trend sensor][trend-sensor]. This sensor is consuming values from another sensor and is doing some statistical analysis of the data. Over a group of samples is the average/mean, the min/max, the total, the standard deviation, and the variance calculated which can be used in your automation rules. If the source is a binary sensor then the state changes are counted.

<p class='img'>
  <img src='/images/screenshots/stats-sensor.png' />
</p>

As the results are processed on-the-fly you still need to use the data from your database for an in-depth analysis of your stored information. Check the latest [notebook] for doing statistics with your Home Assistant database.

### REST! We don't...

There was a lot of work done on our implementation which are working with RESTful APIs. [@w1ll1am23] extended the [aREST] platforms to display if an aREST unit is available or not. The aREST implementations are now covered by the configuration check as well. Please check the Backward-incompatible changes section for more details.

The [REST sensor][rest-sensor] supports now HTTP authentication (basic and digest) and custom headers. This will allow you to access resources which are protected. This sample sensor will access GitHub and retrieve the latest release number while by-passing the rate limit for non-authenticated requests.

{% raw %}

```yaml
sensor
  - platform: rest
    resource: https://api.github.com/repos/home-assistant/home-assistant/releases/latest
    username: YOUR_GITHUB_USERNAME
    password: YOUR_GITHUB_ACCESS_TOKEN
    authentication: basic
    value_template: "{{ value_json.tag_name }}"
    headers:
      Accept: application/vnd.github.v3+json
      Content-Type: application/json
      User-Agent: Home Assistant REST sensor
```

{% endraw %}

### Misc

- GitHub released with a recent update a review feature. This will give you more control over your comments while you review an open Pull Request.
- Thanks to [@robbiet480] we are now running [mention-bot]. It will help you when you create a new Pull Request to identify potential reviewers.
- The [Home Assistant Community Forum][forum] has now an additional section called "Installation".

### All changes

<img src='/images/supported_brands/digital_ocean.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='100' /><img src='/images/supported_brands/volvo.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='100' /><img src='/images/supported_brands/dark_sky.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='100' /><img src='/images/supported_brands/vasttrafik.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='100' />

- Core: A lot of stuff is now async ([@balloob])
- Nest: Support for operation modes ([@jawilson])
- Z-Wave: Massive update for command classes and device classes  ([@turbokongen])
- Digital Ocean: New [switch][do-switch] to control and [binary sensor][do-bin-sensor] to monitor droplets ([@fabaff])
- Cover: Support for [MySensors cover][mysensors-cover] ([@OttoWinter])
- Wink: Support for oAuth2 and relay sensors ([@w1ll1am23])
- Sensor: [Forecast][darksky] update interval is now configurable ([@KlaasH])
- Core: Failed login attempts are reported as persistent notifications ([@fabaff])
- Climate: Temperature convert now available in the Climate object ([@pvizeli])
- Notify: Update to accept a list ([@robbiet480])
- Device tracker: Support for tracking of your [Volvo] ([@molobrakos])
- Switch: Flux improvements ([@jawilson])
- InfluxDB: Time-out for connections ([@simonszu])
- Sensor: New MySensors types available ([@MartinHjelmare])
- Switch: [ANEL PwrCtrl][pwrctrl-switch] devices are now supported ([@mweinelt])
- Frontend: Path of the configuration file now visible on the frontend ([@justweb1])
- Homematic:  Extended device support (RF, IP and wired devices) ([@pvizeli], [@danielperna84])
- Sensor: New sensor for [statistical analysis][stats-sensor] ([@fabaff])
- Sensor: Support for headers and HTTP authentication for [REST sensors][rest-sensor] ([@fabaff])
- Device tracker: Support for encrypted Owntracks payload ([@molobrakos])
- Tests: Improvement of the HTML5 notify tests ([@capellini])
- Wink: Support for Wink Smoke and CO detectors ([@w1ll1am23])
- Sensor: [TED5000][ted5000] sensor was included ([@gwendalg])
- Sensor: Support for [Västtrafik][vasttrafik] public transport ([@persandstrom])
- Notify: Pushetta no longer sends message on start up ([@Danielhiversen])
- Sensor: [Forecast.io][forecast] sensor was replaced by [Dark Sky][darksky] ([@fabaff])
- Device Tracker: The `known_device.yaml` file is now validated ([@kellerza])
- Minor features and bug fixes by [@tchellomello], [@pavoni], [@fabaff], [@pvizeli], [@lwis], [@turbokongen], [@Danielhiversen], [@persandstrom], [@balloob], [@robbiet480], [@sam-io], [@bbangert], and you if you are missing here.

### Release 0.30.1 - October 8

 - Device Tracker `known_devices.yaml` validation is now more accepting ([@kellerza])
 - Handle X10 light numbers greater than 9 ([@mtl010957])
 - Fix command line covers without a template ([@roidayan])

### Release 0.30.2 - October 12

- Handle Volvo's with dashes in their name ([@molobrakos])
- Fix some html5 push notification configuration options were discarded after first use ([@T3m3z])
- Fix Homematic device name with autodiscovery ([@pvizeli])
- Make 'pin' optional for zigbee device config ([@flyte])
- Fix when sending a notification to a service with target attached (i.e., `notify.html5_unnamed_device_2`) the target was not submitted to the platform as a list causing iteration over every character in the string. ([@robbiet480])
- Fix for Slack targets ([@fabaff])
- Fix for Pushover targets ([@Nixon506E])

### Backward-incompatible changes

- All deprecated condition options from `automation` have been removed (deprecated since May and have printed warnings to your console):
  - `use_trigger_values` is gone. You have to copy your triggers to conditions and adjust for the correct config.
  - `condition_type` is gone. Use `condition: or` instead.
  - To specify the type of a condition, use `condition:` instead of `platform:`.
- The [Forecast.io][forecast] was renamed to [Dark Sky][darksky]. Replace your `- platform: forecast` with `- platform: darksky`.
- The [aREST][arest] configuration between the [sensor][arest-sensor] and the [switch][arest-switch] platform was aligned.

### If you need help...
...don't hesitate to use our [Forum](https://community.home-assistant.io/) or join us for a little [chat](https://discord.gg/c5DvZ4e). The release notes have comments enabled but it's preferred if you the former communication channels. Thanks.

[@balloob]: https://github.com/balloob
[@bbangert]: https://github.com/bbangert
[@capellini]: https://github.com/capellini
[@Danielhiversen]: https://github.com/Danielhiversen
[@danielperna84]: https://github.com/danielperna84
[@fabaff]: https://github.com/fabaff
[@gwendalg]: https://github.com/gwendalg
[@hillaryfraley]: https://github.com/hillaryfraley
[@jawilson]: https://github.com/jawilson
[@justweb1]: https://github.com/justweb1
[@kellerza]: https://github.com/kellerza
[@KlaasH]: https://github.com/KlaasH
[@Landrash]: https://github.com/Landrash
[@lwis]: https://github.com/lwis
[@MartinHjelmare]: https://github.com/MartinHjelmare
[@molobrakos]: https://github.com/molobrakos
[@mweinelt]: https://github.com/mweinelt
[@OttoWinter]: https://github.com/OttoWinter
[@pavoni]: https://github.com/pavoni
[@persandstrom]: https://github.com/persandstrom
[@pvizeli]: https://github.com/pvizeli
[@robbiet480]: https://github.com/robbiet480
[@sam-io]: https://github.com/sam-io
[@simonszu]: https://github.com/simonszu
[@tchellomello]: https://github.com/tchellomello
[@turbokongen]: https://github.com/turbokongen
[@w1ll1am23]: https://github.com/w1ll1am23
[@mtl010957]: https://github.com/mtl010957
[@roidayan]: https://github.com/roidayan
[@T3m3z]: https://github.com/T3m3z
[@flyte]: https://github.com/flyte
[@Nixon506E]: https://github.com/Nixon506E

[arest]: https://arest.io/
[arest-sensor]: /integrations/arest#sensor
[arest-switch]: /integrations/arest#switch
[darksky]: /integrations/darksky
[do-bin-sensor]: /integrations/digital_ocean#binary-sensor
[do-switch]: /integrations/digital_ocean#switch
[forecast]: /integrations/darksky
[forum]: https://community.home-assistant.io/
[Hacktoberfest]: /blog/2016/10/02/hacktoberfest/
[hassbian-forum]: https://community.home-assistant.io/c/installation/hassbian
[mention-bot]: https://github.com/mention-bot
[mysensors-cover]: /integrations/cover.mysensors/
[notebook]: https://nbviewer.jupyter.org/github/home-assistant/home-assistant-notebooks/blob/master/other/database-statistics.ipynb
[pi-image]: /blog/2016/10/01/we-have-raspberry-image-now/
[pwrctrl-switch]: /integrations/anel_pwrctrl
[rest-sensor]: /integrations/rest
[stats-sensor]: /integrations/statistics
[ted5000]: /integrations/ted5000
[template-sensor]: /integrations/template
[trend-sensor]: /integrations/trend
[vasttrafik]: /integrations/vasttrafik
[Volvo]: /integrations/volvooncall
