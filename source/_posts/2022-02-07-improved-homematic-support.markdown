---
layout: post
title: "New Add-on for HomeMatic/homematicIP support - Action Required"
description: "To improve HomeMatic support in the future we are deprecating the current HomeMatic CCU add-on in favor of the more feature rich RaspberryMatic CCU Add-on."
date: 2022-02-07 00:00:00
date_formatted: "February 07, 2022"
author: Stefan Agner
author_twitter: falstaff_ch
comments: true
categories:
- Announcements
---

If you are using HomeMatic/homematicIP smart home products with Home Assistant, the future will now be even brighter.

The team around [RaspberryMatic](https://raspberrymatic.de/de/home/) has been hard working during the last months to make their alternative “HomeMatic CCU“ operating system a full fledged [Home Assistant add-on](https://github.com/jens-maus/RaspberryMatic/tree/master/home-assistant-addon) with no compromises. Because of the much more advanced functionality of this third-party add-on compared to our own “HomeMatic CCU” add-on, this is now the recommended add-on to use your Home Assistant also as a HomeMatic CCU smart home central. The old “HomeMatic CCU” add-on from the official repository has now been deprecated.

To make migration as smooth as possible, our latest add-on release gained a final functionality: create and exporting backups. Go to the WebUI and click on “Create Backup” to generate a `.sbk` system backup file. Stop our “HomeMatic CCU” add-on, install the “[RaspberryMatic CCU add-on](https://github.com/jens-maus/RaspberryMatic/wiki/Installation-HomeAssistant)” and import the backup file to have all your HomeMatic/homematicIP devices available right away. A big shout-out to Jens Maus specifically to make all this happen!

<a href='https://github.com/jens-maus/RaspberryMatic/tree/master/home-assistant-addon'><img src='/images/blog/2022-02/raspberrymatic-ccu-addon.png' style='border: 0;box-shadow: none;'></a>

In addition, starting from Home Assistant OS 7.3 onwards HAOS supports dual HomeMatic+homematicIP communication when using the [HmIP-RFUSB](https://de.elv.com/elv-homematic-ip-arr-bausatz-rf-usb-stick-fuer-alternative-steuerungsplattformen-hmip-rfusb-fuer-smart-home-hausautomation-152306) RF USB stick with the “RaspberryMatic CCU” add-on. This change will, however,  also introduce a device rename for older installations still using the old HomeMatic CCU add-on: With a HmIP-RFUSB, you will need to manually update the “hmip” device setting to `/dev/raw-uart` after the OS 7.3 upgrade. Or even better: migrate to the RaspberryMatic CCU add-on right away to gain the full cloud-free smart home central functionality like the vendor-provided “CCU3”.

Last, not least, work has just been started to completely rework the HomeMatic/homematicIP device integration layer within Home Assistant itself. While still in an **early development** phase [this complete re-design](https://github.com/danielperna84/custom_homematic) will come with great new features and a way easier setup and a more complete device integration of all your HomeMatic/homematicIP devices.

So the future of using HomeMatic/homematicIP devices in Home Assistant was never brighter, be part of it!
