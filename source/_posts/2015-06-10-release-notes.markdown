---
title: "Release notes for June 10, 2015"
description: "Polymer 1.0, reviving media player support and the command line switch."
date: 2015-06-10 18:54 0000
date_formatted: "June 10, 2015"
author: Paulus Schoutsen
author_twitter: balloob
categories:
- Release-Notes
- Core
---

Wow, almost a month has gone by since the last release and this release is *packed*. The biggest part of this release is probably one that you won't notice: the frontend has been upgraded from Polymer 0.5 to the brand new released Polymer 1.0. Polymer has been declared stable by the Google overlords which will allow us to expand functionality that was waiting for this moment to arrive.

This release sets a record for the amount of people involved: 8! [Andythigpen](https://github.com/Andythigpen), [Jamespcole](https://github.com/Jamespcole), [Azelphur](https://github.com/Azelphur), [Fabaff](https://github.com/Fabaff), [Dutchy-](https://github.com/Dutchy-), [Fbradyirl](https://github.com/Fbradyirl), wind-rider and [ettisan](https://github.com/ettisan), thanks a lot for your contributions!

A big improvement has been brought this release by wind-rider. He took the time to revive the Chromecast support and started improving the media player integration. This triggered other people to join in resulting in a revamped media player experience and support for the Music Player Daemon.

<p class='img'>
  <img src='/images/screenshots/media_player-card.png' />   Example of the new media player cards
</p>

{% note %}
To update to the latest version, run <code>scripts/update</code>. Please report any issues on <a href='https://github.com/home-assistant/home-assistant/issues'>GitHub</a>.
{% endnote %}

<!--more-->

Before jumping into the newly supported platforms, here are the other improvements that are landing this release:

- Fronted upgraded to Polymer 1.0 by @balloob
- Include other YAML files using the `!include` keyword by @andythigpen
- Switch support and bug fixes for Vera platform by @jamespcole
- HTTP session support for the HTTP component by @jamespcole
- Device tracker bugfixes by @Dutchy-
- Bugfix for device tracker platform by @fbradyirl
- Fixing Chromecast support by @wind-rider
- Media player improvements by @balloob and @wind-rider
- Nest thermostat bugfixes by @balloob
- Fix the device tracker getting in a deadlock by @balloob
- Update documentation by @fabaff

__Music Player Daemon__
<img src='/images/supported_brands/mpd.png' style='border:none; box-shadow: none; float: right;' height='50' /> Fabaff has contributed MusicPlayerDaemon support. The mpd platform allows you to control a [Music Player Daemon](http://www.musicpd.org/) from Home Assistant. Right now, only playback is supported and not playlist manipulation.

```yaml
# Example configuration.yaml entry
media_player:
  platform: mpd
  server: 127.0.0.1
  port: 6600
  location: bedroom
```

__Command line switch__
A switch platform that issues specific commands when it is turned on and off. This might very well become our most popular platform as it allows anyone to integrate any type of switch into Home Assistant that can be controlled from the command line, including calling other scripts!

```yaml
# Example configuration.yaml entry
switch:
  platform: command_switch
  switches:
    - kitchen_light:
        oncmd: switch_command on kitchen
        offcmd: switch_command off kitchen
```

__LimitlessLED__
This new platform can control your LimitlessLED lights from within Home Assistant. The lights are also known as EasyBulb, AppLight, AppLamp, MiLight, LEDme, dekolight or iLight.

```yaml
# Example configuration.yaml entry
light:
  platform: limitlessled
  host: 192.168.1.10
  group_1_name: Living Room
  group_2_name: Bedroom
  group_3_name: Office
  group_4_name: Kitchen
```


__Bitcoin sensor__
<img src='/images/supported_brands/bitcoin.png' style='border:none; box-shadow: none; float: right;' height='50' /> The bitcoin platform displays various details about the [Bitcoin](https://bitcoin.org) network. If you have an online wallet from [Blockchain.info](https://blockchain.info/) the sensor is capable to show your current balance.

```yaml
# Example configuration.yaml entry
sensor:
  platform: bitcoin
  wallet: "YOUR WALLET_ID"
  password: YOUR_ACCOUNT_PASSWORD
  currency: YOUR CURRENCY
  display_options:
    - exchangerate
    - trade_volume_btc
    - miners_revenue_usd
    - btc_mined
    - trade_volume_usd
    - difficulty
    - minutes_between_blocks
    - number_of_transactions
    - hash_rate
    - timestamp
    - mined_blocks
    - blocks_size
    - total_fees_btc
    - total_btc_sent
    - estimated_btc_sent
    - total_btc
    - total_blocks
    - next_retarget
    - estimated_transaction_volume_usd
    - miners_revenue_btc
    - market_price_usd
```


__SMTP notificatoin platform__
<img src='/images/supported_brands/smtp.png' style='border:none; box-shadow: none; float: right;' height='50' /> The smtp platform allows you to deliver notifications from Home Assistant to an e-mail recipient.

```yaml
# Example configuration.yaml entry
notify:
  platform: mail
  server: MAIL_SERVER
  port: YOUR_SMTP_PORT
  sender: SENDER_EMAIL_ADDRESS
  starttls: 1 or 0
  username: YOUR_SMTP_USERNAME
  password: YOUR_SMTP_PASSWORD
  recipient: YOUR_RECIPIENT
```


__Syslog notification platform__
The syslog platform allows you to deliver notifications from Home Assistant to the local syslog.

```yaml
# Example configuration.yaml entry
notify:
  platform: syslog
```


__Swiss Public transport sensor__
The swiss public transport sensor will give you the next two departure times from a given location to another one in Switzerland. See the [component page](/integrations/swiss_public_transport) for more information how to set it up.


__Transmission turtle mode switch__
<img src='/images/supported_brands/transmission.png' style='border:none; box-shadow: none; float: right;' height='50' /> The transmission platform allows you to control your [Transmission](http://www.transmissionbt.com/) client from within Home Assistant. The platform enables you switch to your 'Alternative Speed Limits' (aka 'Turtle mode') setting. 

```yaml
# Example configuration.yaml entry
switch:
  platform: transmission
  name: Transmission
  host: 192.168.1.26
  port: 9091
  username: YOUR_USERNAME
  password: YOUR_PASSWORD
```


__Hikvision camera motion detection support__
This switch platform allows you to control your motion detection setting on your Hikvision camera.

```yaml
# Example configuration.yaml entry
switch:
    platform: hikvisioncam
    name: Hikvision Cam 1 Motion Detection
    host: 192.168.1.26
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
```
