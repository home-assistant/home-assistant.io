---
title: "0.31: Reading you the news, some serious business, spooky hackery and a breaking Z-Wave change"
description: "Alexa Flash Briefing API support, Markdown in persistent notifications, a new updater component, Hacktoberfest and breaking Z-Wave changes."
date: 2016-10-22 13:00:00 -0700
date_formatted: "October 22, 2016"
release_date: 2016-10-23 21:57:00 -0700
author: Robbie Trencheny
author_twitter: robbie
categories:
- Release-Notes
- Core
---

Hello again friend,

How are you? Having a good day? We sure are. If you aren't having a good day, this might cheer you up...

Every other weekend around here gets a little hectic leading to a big sigh of relief as we release a new version of Home Assistant to the world. And this time is no different. Our developer community has once again built us a beautiful new release with lots of new features and improvements. We hope you like it.

One last thing before we get going though, I should warn you... [@balloob] got a bit lazy this week and let me ([@robbiet480]) step up to the plate again to write the blog post and do the release. I guess I didn't do such a bad job in [0.27][zero-two-seven-release]. You'll never know what surprises I have in store. Now that i've got all that stuff out of the way, let's get started...

## Stats Update
Sadly, no big amazing stats to update you with this time, but we did recently pass 7,000 commits! This release featured submissions from 45 contributors. Hopefully with the new updater component we will be able to give you some really good stats in the 0.32 blog post.

## Hacktoberfest

![Hacktoberfest logo][logo]

October means Hacktoberfest time and our community has really come through with some excellent improvements and additions. As of this writing, we have 194 merged and 41 open pull requests to the [home-assistant repository][hacktoberfest-ha-prs] and 209 merged/28 open pull requests submitted to the [home-assistant.github.io repository][hacktoberfest-site-prs]. If you want to get in on the fun check out our [Hacktoberfest][hacktoberfest-blog] blog post or the [Hacktoberfest website][hacktoberfest-website]. You get an awesome t-shirt for free if you have 4 pull requests merged in the month of October! We even have tasks that a non-developer can easily accomplish with a tiny bit of work. Better hurry up though, only 9 days left and most of the easy tasks are gone!

## ⚠️ A greatly improved updater component (Please read this!) ⚠️

This release includes an update to our [updater] component. The responsibility of the updater component is to check if a new version is available and notify the user if this is the case.

It used to be that this component would check with [PyPi] (the Python package manager) to see if a new update was available. This had a couple of problems:

 1. We are unable to do a slow rollout
 2. We are unable to show the user extra information (like a link to a changelog or the release date)
 3. We are unable to warn users for critical security updates

So to work around these problems, we decided to start hosting the version check service ourselves. Since we had to get some infrastructure spun up anyway, we figured we would take it a step further. Which leads me to this bit of the update (the most important part):

### What you need to know (the important bit!)

Remember how I mentioned that up there in the title that there is some serious business in this release? Well, we also added some basic analytics to the updater component which get sent to the server and stored so that we get a better idea of our user base.

Each Home Assistant instance running the updater component will generate a [unique ID][UUID] (based on UUIDv4) that will be used for the updater to be able to differentiate between instances. This UUID will be stored in your config directory in a file called `.uuid`.

#### Opting out

There are two ways to opt-out. The first way is by using the new `opt_out` option for the updater. This way the updater will continue to check for updates, but no information about your system will be shared with us.

```yaml
updater:
  reporting: false
```

You can also disable the updater component entirely by removing `updater:` from your `configuration.yaml` although **we would not suggest you do this** as you would miss any critical updates.

Finally, you can also reset your unique identifier by deleting the `.uuid` file and restarting Home Assistant.

#### Data stored on the Home Assistant update server

Here is what my production Home Assistant instance looks like from the server side:

| Name                  | Description                                | Example                            |
|-----------------------|--------------------------------------------|------------------------------------|
| `arch`                | CPU Architecture                           | `x86_64`                           |
| `distribution`        | Linux Distribution name (only Linux)       | `Ubuntu`                           |
| `docker`              | True if running inside Docker              | `false`                            |
| `os_name`             | Operating system name                      | `Darwin`                           |
| `os_version`          | Operating system version                   | `10.12`                            |
| `python_version`      | Python version                             | `3.5.2`                            |
| `timezone`            | Timezone                                   | `America/Los_Angeles`              |
| `user_agent`          | User agent used to submit analytics        | `python-requests/2.11.1`           |
| `uuid`                | Unique identifier                          | `10321ee6094d4a2ebb5ed55c675d5f5e` |
| `version`             | Home Assistant version                     | `0.31.0`                           |
| `virtualenv`          | True if running inside virtualenv          | `true`                             |

In addition to the above collected data, the server will also use your IP address to do a geographic IP address lookup to determine the city that you are from. To be extremely, extremely clear about this bit: __The Home Assistant updater does not: store your IP address in a database and also does not submit the location information from your `configuration.yaml`.__

<p class='img'>
  <img src='/images/blog/2016-10-flash-briefing-updater-hacktoberfest/map.png' />
  Geo-lookup on my IP resolves to Oakland with latitude/longitude pointing at the geographical center of the city.
</p>

The server also adds two timestamps to the data: the original date your instance UUID was first seen and the timestamp of the last time we have seen your instance. This gives us the following extra data:

| Name                  | Description                                | Example                            |
|-----------------------|--------------------------------------------|------------------------------------|
| `first_seen_datetime` | First time instance ID was submitted       | `2016-10-22T19:56:03.542Z`         |
| `geo_city`            | GeoIP determined city                      | `Oakland`                          |
| `geo_country_code`    | GeoIP determined country code              | `US`                               |
| `geo_country_name`    | GeoIP determined country name              | `United States`                    |
| `geo_latitude`        | GeoIP determined latitude (of the city)    | `37.8047`                          |
| `geo_longitude`       | GeoIP determined longitude (of the city)   | `-122.2124`                        |
| `geo_metro_code`      | GeoIP determined metro code                | `807`                              |
| `geo_region_code`     | GeoIP determined region code               | `CA`                               |
| `geo_region_name`     | GeoIP determined region name               | `California`                       |
| `geo_time_zone`       | GeoIP determined time zone                 | `America/Los_Angeles`              |
| `geo_zip_code`        | GeoIP determined zip code                  | `94602`                            |
| `last_seen_datetime`  | Most recent time instance ID was submitted | `2016-10-22T19:56:03.542Z`         |

This data is held in the highest security. The update system runs in a secured Amazon Web Services account owned by me ([@robbiet480]). I personally have 5 years of experience with complex AWS deployments and have an extensive security background. I have audited the entire system and made sure to take every step to protect the data, including limiting who has access (just [@balloob] and myself). While not directly personally identifiable we absolutely understand some users hesistance to giving this information out. Please understand that we are only collecting this information to better understand our user base to provide better long term support and feature development then is currently possible.

We currently have no plans to publicly expose any of this information. If we did do such a thing in the future we would of course notify you in advance. It must also be stated that we will never sell or allow the use of this information for non-Home Assistant purposes.

We thank you for understanding why we are collecting this data and hope that you leave the feature enabled but fully understand if you feel uncomfortable with this.

_This section was updated on October 24 to be more clear about geo-lookups being on the city level. [See original version.][blog-orig]_

Now, back to the fun stuff...

## Good evening. I'm Ron Burgundy and here's what happening in your world tonight.

Home Assistant got a crazy idea recently that it couldn't do enough already and wanted to challenge itself even more. I really don't understand how it came up with this kooky idea, but it now thinks that its newest hobby should be a minor career in journalism.

0.31 adds support for the brand spanking new [Alexa Flash Briefing API](https://developer.amazon.com/alexa-skills-kit/flash-briefing), allowing you to get updates from Home Assistant anytime you ask Alexa to read your flash briefing. What's the use case you ask? Well, now when I wake up in the morning and get my flash briefing, Home Assistant adds this to the end of it for me:

> Drive time with traffic is 35 minutes. There is an UberPOOL that will cost $11.52, estimated to be 2 minutes away, for a total of 37 minutes. BART is currently estimated to take 29 minutes. You should take BART, as it is estimated to be faster by 8 minutes.

Now I know how to best get to [my real job][runway] (no, Home Assistant is _not_ my real job, it does seem like it sometimes though) every morning. Obviously not the best home automation example, but I think you get the idea. I could see this being used to tell you any major events that happened in your home overnight or reading you your hyperlocal weather report. Thanks to the audio support you could even replace all of the default Alexa Flash Briefing sources with your own news feeds. Home Assistant supports both text and audio content as well as displaying data in the Alexa app. I also want to point out that unlike the existing Skill integration, the Flash Briefing API does _not_ require HTTPS (_but you should still be using HTTPS if possible_). For more information, check out the new [docs][flash-briefing-docs].

<p class='img'>
  <img src='/images/blog/2016-10-flash-briefing-updater-hacktoberfest/stay-classy.jpg'>
  You stay classy, San Diego. (It's funny, because balloob lives in San Diego))
</p>

## Major breaking Z-Wave changes ahead

A rather nasty Z-Wave [issue][z-wave-issue] was discovered recently by [@lukas-hetzenecker]. There was a somewhat large chance that if you had multiple of the same model Z-Wave device they may both try to use the same entity IDs. To fix the issue the internal Z-Wave index is now appended to the end of all Z-Wave entity IDs.

What this means for all you Z-Wave users is that you will need to update your configurations to reflect the change. I personally have quite a few (17) Z-Wave devices and went through the process this week. Here's what I had to do:

- Update customizations
- Update groups
- Update my `zwave.customize` section
- Update my Alexa skills that used old entity IDs
- Because I use `emulated_hue` with Alexa and `emulated_hue` uses the entity ID as a unique identifier I also had to remove all Z-Wave devices from Alexa and re-add them.

Your todo list may be a little different from mine, I just wanted to outline the steps I took to give you an idea of what you need to think about. It's not a very hard process, especially when using global find and replace in Sublime Text but did take me about 20 minutes to complete.

This is super annoying, I know, especially since we had said in [0.12][zero-one-two-release] that Z-Wave IDs should hopefully never change again, but we are now forced to eat those words. I will state again that Z-Wave IDs shouldn't change in the future but obviously we see how that went. To sum up on this section... sorry but it had to happen.

## All changes

- [Updater] component ([@infamy], [@robbiet480], [@kellerza])
- Continue to setup other platforms when 1 platform config is invalid ([@kellerza])
- Create [persistent notifications][pers-notify] when a platform contains invalid config ([@kellerza])
- Logbook: Allow [filtering] domains and entities to be shown ([@wokar])
- HTTP: Change `approved_ips` from string to CIDR validation ([@mweinelt])
- Persistent Notifications: Allow using [markdown][pers-notify] ([@justweb1])
- Netatmo: Add [discovery][netatmo-discovery] support ([@jabesq])
- Netatmo Welcome camera: Add [binary sensor][netatmo-bin] ([@jabesq])
- Support added for [HaveIBeenPwned] ([@joyrider3774])
- Device tracker: `known_devices.yaml` reading and writing tweaks and fixes ([@kellerza])
- Fix climate platforms showing the wrong temperature unit ([@rcloran])
- Lots of voluptuous love ([@fabaff])
- Ensure proper attribution for weather platforms ([@fabaff])
- Fix Telegram in Docker ([@jeanregisser])
- Support recursive config inclusions in YAML ([@lwis])
- Camera: [Synology] SS cameras now supported ([@jgriff2])
- History: Allow filtering domains and entities to be shown ([@wokar])
- Media Player - Squeezebox: Now able to show artist and album ([@ih8gates])
- Alexa: Flash Briefing skill support added ([@robbiet480])
- Device Tracker: Add support for Bbox Modem Router ([@HydrelioxGithub])
- Sensor: Add support for Bbox Modem Router ([@HydrelioxGithub])
- Input select: Services added to pick next and prev option ([@persandstrom])
- Sensor: [ARWN] now supported ([@sdague])
- Pushbullet: Push an URL note if an url is provided inside data ([@jabesq])
- Z-Wave: Allow certain devices to be not added to Home Assistant ([@lukas-hetzenecker])
- New support for [Zoneminder] added ([@Khabi])
- Weather: Allow tracking severe weather alerts with [WUnderground] ([@tchellomello])
- Sensor: New support added to track [min/max/mean][min] ([@fabaff])
- Convert EntityComponent to be async ([@pvizeli], [@balloob])
- Z-Wave: Add association service ([@turbokongen])
- Frontend - Services dev tool: persist state and tweak UI ([@justweb1])
- Sensor: Support added for [scraping][scrape] websites ([@fabaff])
- Clean up of tests ([@capellini])
- New `fail` filter added to templates to raise on UndefinedError ([@jaharkes])
- Support added for [Emoncms history][emoncms] ([@joyrider3774])
- Support for [Apple Push Notifications Service][APNS] ([@sam-io])
- Thermostat: Netatmo now supported ([@gieljnssns])
- Alarm control panel: [Concord232] now supported ([@JasonCarter80])
- Notify: [Matrix] support added ([@mweinelt])
- Device tracker - nmap: Allow specifying multiple inputs for [nmap] ([@hcooper])
- Device Tracker - snmp: SNMPv3 now supported ([@T3m3z])
- Notify: Telstra SMS now supported ([@nvella])
- Camera: [Verisure] now supported ([@turbokongen])
- Support added for [Neato] Connected Robot ([@jabesq])
- Media player: More options for [Yamaha] AVR ([@ehagan])
- Sensor: Support for [Pilight] sensor ([@DavidLP])
- iOS support ([@robbiet480])
- Minor features and bug fixes by [@mtl010957], [@molobrakos], [@flyte], [@fabaff], [@phardy], [@sander76], [@T3m3z], [@c-w], [@balloob], [@robbiet480], [@StaticCube], [@vittoriom], [@hartmms], [@kirichkov], [@mezz64], [@ishults], [@Danielhiversen] and [@tchellomello].

### Release 0.31.1 - October 24

 - Identify special character encoding error in YAML files ([@kellerza], [@lwis])
 - iOS app component bug fixes ([@robbiet480])
 - Fix a spelling problem on user-facing error ([@robbiet480])
 - YAML includes will ignore dirs/files prefixed with . ([@lwis])

## Backward-incompatible changes

 - The [HTTP] component now takes a different format for authenticating IPs
 - Configuration format has changed for [Proximity]
 - The [Arduino] platform are now covered by the configuration check. Please check the documentation to see how.
 - The Z-Wave entity ID change mentioned above

## If you need help...
...don't hesitate to use our [Forum](https://community.home-assistant.io/) or join us for a little [chat](https://discord.gg/c5DvZ4e). The release notes have comments enabled but it's preferred if you the former communication channels. Thanks.

## Until next time

Thanks for reading all of the above, especially since this week was a pretty long post. We should be back with a new post around November 5th announcing the arrival of 0.32.

-- Robbie

[@balloob]: https://github.com/balloob
[@capellini]: https://github.com/capellini
[@c-w]: https://github.com/c-w
[@Danielhiversen]: https://github.com/Danielhiversen
[@DavidLP]: https://github.com/DavidLP
[@ehagan]: https://github.com/ehagan
[@fabaff]: https://github.com/fabaff
[@flyte]: https://github.com/flyte
[@gieljnssns]: https://github.com/gieljnssns
[@hartmms]: https://github.com/hartmms
[@hcooper]: https://github.com/hcooper
[@HydrelioxGithub]: https://github.com/HydrelioxGithub
[@ih8gates]: https://github.com/ih8gates
[@infamy]: https://github.com/infamy
[@ishults]: https://github.com/ishults
[@jabesq]: https://github.com/jabesq
[@jaharkes]: https://github.com/jaharkes
[@JasonCarter80]: https://github.com/JasonCarter80
[@jeanregisser]: https://github.com/jeanregisser
[@jgriff2]: https://github.com/jgriff2
[@joyrider3774]: https://github.com/joyrider3774
[@justweb1]: https://github.com/justweb1
[@kellerza]: https://github.com/kellerza
[@Khabi]: https://github.com/Khabi
[@kirichkov]: https://github.com/kirichkov
[@lukas-hetzenecker]: https://github.com/lukas-hetzenecker
[@lwis]: https://github.com/lwis
[@mezz64]: https://github.com/mezz64
[@molobrakos]: https://github.com/molobrakos
[@mtl010957]: https://github.com/mtl010957
[@mweinelt]: https://github.com/mweinelt
[@Nixon506E]: https://github.com/Nixon506E
[@nvella]: https://github.com/nvella
[@persandstrom]: https://github.com/persandstrom
[@phardy]: https://github.com/phardy
[@pvizeli]: https://github.com/pvizeli
[@rcloran]: https://github.com/rcloran
[@robbiet480]: https://github.com/robbiet480
[@sam-io]: https://github.com/sam-io
[@sander76]: https://github.com/sander76
[@sdague]: https://github.com/sdague
[@StaticCube]: https://github.com/StaticCube
[@T3m3z]: https://github.com/T3m3z
[@tchellomello]: https://github.com/tchellomello
[@turbokongen]: https://github.com/turbokongen
[@vittoriom]: https://github.com/vittoriom
[@wokar]: https://github.com/wokar

[Arduino]: /integrations/arduino/
[APNS]: /integrations/apns
[ARWN]: /integrations/arwn
[Concord232]: /integrations/concord232#alarm-control-panel
[HTTP]: /integrations/http/
[HaveIBeenPwned]: /integrations/haveibeenpwned
[Matrix]: /integrations/matrix/#notifications
[Neato]: /integrations/neato#switch
[Pilight]: /integrations/pilight#sensor
[Proximity]: /integrations/proximity/
[PyPi]: https://pypi.python.org/pypi
[Synology]: /integrations/synology
[UUID]: https://en.wikipedia.org/wiki/Universally_unique_identifier
[Verisure]: /integrations/verisure
[WUnderground]: /integrations/wunderground
[Yamaha]: /integrations/yamaha
[Zoneminder]: /integrations/zoneminder/
[emoncms]: /integrations/emoncms_history/
[filtering]: /integrations/logbook/
[flash-briefing-docs]: /integrations/alexa/
[hacktoberfest-blog]: /blog/2016/10/02/hacktoberfest/
[hacktoberfest-ha-prs]: https://github.com/home-assistant/home-assistant/labels/Hacktoberfest
[hacktoberfest-site-prs]: https://github.com/home-assistant/home-assistant.io/labels/Hacktoberfest
[hacktoberfest-website]: https://hacktoberfest.digitalocean.com/
[logo]: /images/blog/2016-10-hacktoberfest/hacktoberfest.png
[min]: /integrations/min_max
[netatmo-bin]: /integrations/netatmo#binary-sensor
[netatmo-discovery]: /integrations/netatmo/
[nmap]: /integrations/nmap_tracker
[pers-notify]: /integrations/persistent_notification/
[runway]: http://runway.is
[scrape]: /integrations/scrape
[updater]: /integrations/updater/
[z-wave-issue]: https://github.com/home-assistant/home-assistant/pull/3759
[zero-one-two-release]: /blog/2016/01/30/insteon-lifx-twitter-and-zigbee/#backwards-incompatible-changes
[zero-two-seven-release]: /blog/2016/08/28/notifications-hue-fake-unification/
[twitter]: https://twitter.com/home_assistant
[robbie-twitter]: https://twitter.com/robbie
[blog-orig]: https://github.com/home-assistant/home-assistant.io/blob/c937242d154e509d2d84d10c51f654e20556fa21/source/_posts/2016-10-22-flash-briefing-updater-hacktoberfest.markdown
