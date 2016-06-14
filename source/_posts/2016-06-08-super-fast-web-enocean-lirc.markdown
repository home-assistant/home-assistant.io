---
layout: post
title: "0.21: Improved Web and support for EnOcean, LIRC and Osram Lightify"
description: "This new release of Home Assistant is lightning fast with the new web stack and progressive web application. On top of that a handful of new components and platforms for EnOcean, LIRC and Osram Lightify support."
date: 2016-06-08 01:06:00 +0000
date_formatted: "June 8, 2016"
author: Paulus Schoutsen
author_twitter: balloob
comments: true
categories: Release-Notes
---

It's time for release 0.21 and it contains massive core improvements: replacement of our home grown HTTP stack with a standardized WSGI stack. This will improve performance, speed, security and make future development of advanced HTTP features a breeze.

This work was driven by the amazing Josh Wright. His knowledge, high standards and drive for security has helped improve Home Assistant a lot ever since he started helping out. Hip hip hurray for Josh!

Alright, time for the changes:

<img src='/images/supported_brands/enocean.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='150' /><img src='/images/supported_brands/osramlightify.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='150' /><img src='/images/supported_brands/lirc.gif' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='150' />

 - New HTTP stack based on WSGI ([@JshWright], [@balloob])
 - Frontend: lots of performance improvements ([@balloob])
 - Initial support for EnOcean [lights][en-lights], [sensors][en-sensors] and [switches][en-switches] added ([@rubund])
 - Light: [Osram Lightify] is now supported ([@olimpiurob])
 - Light: [Insteon Hub] now supports brightness ([@wkonkel])
 - Add support for adding HA as Windows 10 tile ([@fabaff])
 - Condition: [time condition] can now cross midnight ([@jaharkes])
 - Template based sensors should now throw less warnings ([@Bart274])
 - New [LIRC component] allows receiving IR commands ([@partofthething])
 - The [Feedreader] component will now persist data to disk to prevent duplicate events ([@shaftoe])
 - Sun: azimuth attribute added ([@fabaff])
 - New [Flux like switch platform] to change light intensity in the evening ([@nkgilley])
 - We no longer crash if you live in a part of the world where the sun never sets ([@balloob])
 - Rollershutter: [RFXTRX] now supported ([@jacobtomlinson])
 - Switch: [Template switches] can now execute scripts ([@kellerza])
 - Z-Wave: automatically heal the network at midnight ([@infamy])
 - Sensor: [DTE Energy Bridge] now supported ([@kylehendricks])
 - Media Player: [Kodi] now supports different turn off commands ([@armills])

### Breaking Changes

 - Our work in the WSGI stack is not fully done yet. We still have a minor issues where retrieving the error log in the about screen can raise an encoding error
 - The API used to incorrectly accept a JSON body with form-url-encoded headers. Our cURL examples on the website used to be wrong and have [been updated].
 - Make sure your configuration.yaml file contains `frontend:` to serve the frontend

[@armills]: https://github.com/armills
[@balloob]: https://github.com/balloob
[@Bart274]: https://github.com/Bart274
[@fabaff]: https://github.com/fabaff
[@infamy]: https://github.com/infamy
[@jacobtomlinson]: https://github.com/jacobtomlinson
[@jaharkes]: https://github.com/jaharkes
[@JshWright]: https://github.com/JshWright
[@kellerza]: https://github.com/kellerza
[@kylehendricks]: https://github.com/kylehendricks
[@nkgilley]: https://github.com/nkgilley
[@olimpiurob]: https://github.com/olimpiurob
[@partofthething]: https://github.com/partofthething
[@rubund]: https://github.com/rubund
[@shaftoe]: https://github.com/shaftoe
[@wkonkel]: https://github.com/wkonkel
[DTE Energy Bridge]: /components/sensor.dte_energy_bridge/
[en-lights]: /components/light.enocean/
[en-sensors]: /components/sensor.enocean/
[en-switches]: /components/switch.enocean/
[Feedreader]: /components/feedreader/
[Flux like switch platform]: /components/switch.flux/
[Insteon Hub]: /components/insteon_hub/
[Kodi]: /components/media_player.kodi/
[LIRC component]: /components/lirc/
[Osram Lightify]: /components/light.osramlightify/
[RFXTRX]: /components/rfxtrx/
[Template switches]: /components/switch.template/
[time condition]: /getting-started/scripts-conditions/#time-condition
[been updated]: /developers/rest_api/
