---
layout: post
title: "RFXtrx, Blinkstick, SNMP and Telegram now supported"
description: "Home Assistant 0.7.5 has been released with support for RFXtrx, Blinkstick, SNMP and improved."
date: 2015-10-11 10:10:00 +0700
date_formatted: "October 11, 2015"
author: Paulus Schoutsen
comments: true
categories: release-notes
---

We discovered two major issues that I want to address with a release:

- Home Assistant package did not include the CloudMQTT certificate.
- Throttle worked on a class base instead of an instance base, preventing the same platform be used twice.

Beside the bugfixes for the major issues there are new featured in release 0.7.5: RFXtrx lights and switches, Blinklight, SNMP device tracker, and  Telegram notifier.

See [GitHub](https://github.com/balloob/home-assistant/releases/tag/0.7.5) for more detailed release notes.


__Blickstick__<br>
<img src='/images/supported_brands/blinkstick.png' style='border:none; box-shadow: none; float: right;' height='50' />
Blinkstick support has been added by [@alanbowman](https://github.com/alanbowman). Home Assistant is now able to control your Blinkstick devices.

```yaml
# Example configuration.yaml entry
light:
  platform: blinksticklight
  serial: BS000795-1.1
  name: Living Room
```

<!--more-->

__RFXtrx__<br>
<img src='/images/supported_brands/rfxtrx.png' style='border:none; box-shadow: none; float: right;' height='50' />
[@badele](https://github.com/badele) has contributed support for controlling RFXtrx lights and switches. 

__SNMP__<br>
<img src='/images/supported_brands/snmp.png' style='border:none; box-shadow: none; float: right;' height='50' />
[@tomduijf](https://github.com/tomduijf) has contributed support to do prescence detection using SNMP.

__Telegram__<br>
<img src='/images/supported_brands/telegram.png' style='border:none; box-shadow: none; float: right;' height='50' />
The [Telegram](https://telegram.org/) contributed by [@fabaff](https://github.com/fabaff) allow you send messages from Home Assistant to your Windows Phone or your iOS and Android devices.

__Media player__<br>
[@maddox](https://github.com/maddox) and [@MagnusKnutas](https://github.com/MagnusKnutas) worked on the Media player part and implemented new features and improved it.

