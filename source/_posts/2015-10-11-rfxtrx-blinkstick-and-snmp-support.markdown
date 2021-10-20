---
title: "0.7.5: Blinkstick, SNMP, Telegram"
description: "Home Assistant 0.7.5 has been released with support for RFXtrx, Blinkstick, SNMP and Telegram."
date: 2015-10-11 10:10:00 -0700
date_formatted: "October 11, 2015"
author: Paulus Schoutsen
author_twitter: balloob
categories:
- Release-Notes
- Core
---

We discovered two issues annoying enough to warrant the release of 0.7.5:

- Home Assistant package did not include the CloudMQTT certificate.
- A bug in the core caused issues when some platforms are loaded twice.

This release also includes some new platforms (because they keep coming!):

<img src='/images/supported_brands/blinkstick.png' style='border:none; box-shadow: none; float: right;' height='50' /><img src='https://brands.home-assistant.io/rfxtrx/logo.png' style='border:none; box-shadow: none; float: right; clear: right;' height='50' /><img src='/images/supported_brands/telegram.png' style='border:none; box-shadow: none; float: right; clear: right;' height='50' />

 - Light: [blinkstick platform](/integrations/blinksticklight) added ([@alanbowman](https://github.com/alanbowman))
 - Device Tracker: [SNMP platform](/integrations/snmp) added ([@tomduijf](https://github.com/tomduijf))
 - Light: [rfxtrx platform](/integrations/rfxtrx#lights) added ([@badele](https://github.com/badele))
 - Switch: [rfxtrx platform](/integrations/rfxtrx#switches) added ([@badele](https://github.com/badele))
 - Notify: [telegram platform](/integrations/telegram) added ([@fabaff](https://github.com/fabaff))

Also, the media player was extended by [@maddox](https://github.com/maddox) to support the play media command. This has been implemented for the [iTunes platform](/integrations/itunes).
