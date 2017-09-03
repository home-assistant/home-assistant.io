---
layout: page
title: "LimitlessLED"
description: "Instructions on how to setup LimitlessLED within Home Assistant."
date: 2015-12-03 13:00
sidebar: true
layout: page
comments: false
sharing: true
footer: true
logo: limitlessled_logo.png
ha_category: Light
ha_iot_class: "Assumed State"
ha_release: pre 0.7
---

`limitlessled` can control your [LimitlessLED](http://www.limitlessled.com/) lights from within Home Assistant. The lights are also known as EasyBulb, AppLight, AppLamp, MiLight, LEDme, dekolight, or iLight.

### {% linkable_title Setup %}

Before configuring Home Assistant, make sure you can control your bulbs or LEDs with the MiLight mobile application. Discover your bridge(s) IP address. You can do this via your router or a mobile application like Fing ([android](https://play.google.com/store/apps/details?id=com.overlook.android.fing&hl=en) or [itunes](https://itunes.apple.com/us/app/fing-network-scanner/id430921107?mt=8)). Keep in mind that LimitlessLED bulbs are controlled via groups. You can not control an individual bulb via the bridge, unless it is in a group by itself. Note that you can assign an `rgbw`, `rgbww` and `white` group to the same group number, effectively allowing 12 groups (4 `rgbww`, 4 `rgbw` and 4 `white`) to be controlled independently per bridge.

To add `limitlessled` to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
light:
  platform: limitlessled
  bridges:
    - host: 192.168.1.10
      groups:
      - number: 1
        name: Bedroom
      - number: 2
        type: rgbw
        name: Bathroom
      - number: 3
        type: rgbw
        name: Kitchen
        fade: on
    - host: 192.168.1.11
      groups:
      - number: 1
        name: Living Room & Hall
      - number: 1
        type: bridge-led
        name: Bridge Light
```

Configuration variables:

- **bridges** array (*Required*):
  - **host** (*Required*): IP address of the device, eg. `192.168.1.32`
  - **version** (*Optional*): Bridge version (default is `6`).
  - **port** (*Optional*): Bridge port. Defaults to 5987. For older bridges than v6 choose `8899`.
  - **groups** array (*Required*): The list of available groups.
    - **number** (*Required*): Group number (`1`-`4`). Corresponds to the group number on the remote. These numbers may overlap only if the type is different.
    - **name** (*Required*): Any name you'd like. Must be unique among all configured groups.
    - **type** (*Optional*): Type of group. Choose either `rgbww`, `rgbw`, `white`, or `bridge-led`. `rgbw` is the default if you don't specify this entry. Use `bridge-led` to control the built-in LED of newer WiFi bridges.
    - **fade** (*Optional*): Fade behavior. Defaults to `off`. If turned on, the group is faded out before being turned off. This makes for a more pleasing transition at the expense of wall switch usability, since the light will turn back on at the lowest brightness if it is power cycled.

### {% linkable_title Properties %}

Refer to the [light]({{site_root}}/components/light/) documentation for general property usage, but keep in mind the following notes specific to LimitlessLED.

- **RGBWW** (Only supported on v6 bridges)
  - *Color*: There are 25,856 color possibilities along the LimitlessLED color spectrum. For colors, hue and saturation can be used, but not lightness. If you select a color with lightness, Home Assistant will calculate the nearest valid LimitlessLED color. In white mode the temperature can be set.
  - *Temperature*: There are 101 temperature steps.
  - *Brightness*: There are 101 brightness steps.
- **RGBW**
  - *Color*: There are 256 color possibilities along the LimitlessLED color spectrum. Color properties like saturation and lightness can not be used - only Hue can. The only exception is white (which may be warm or cold depending on the type of RGBW bulb). If you select a color with saturation or lightness, Home Assistant will calculate the nearest valid LimitlessLED color.
  - *Brightness*: Wifi bridge v6 supports 101 brightness steps; older versions only 25.
- **White**
  - When using a legacy wifi bridge (before v6), you can observe on the MiLight mobile application, you can not select a specific brightness or temperature - you can only step each property up or down. There is no indication of which step you are on. This restriction, combined with the unreliable nature of LimitlessLED transmissions, means that setting white bulb properties is done on a best-effort basis. The only very reliable settings are the minimum and maximum of each property.
  - *Temperature*: Wifi bridge v6 supports 101 temperature steps; older versions only 10.
  - *Brightness*: Wifi bridge v6 supports 101 brightness steps; older versions only 10.
- **Transitions**
  - If a transition time is set, the group will transition between the current settings and the target settings for the duration specified. Transitions from or to white are not possible - the color will change immediately.

### {% linkable_title Initialization & Synchronization %}

When starting Home Assistant, your LimitlessLED bulbs will be set to known default values. This ensures a consistent user interface and uninterrupted turning on/off. If you control your LimitlessLED lights via the MiLight mobile application or other means while Home Assistant is running, Home Assistant can not track those changes and you may observe unexpected behavior. This is due to a LimitlessLED limitation.

### {% linkable_title Example Setup and Configuration %}

## General Overview

1. Install the MiLight phone app
1. Connect the bridge to your network/phone
1. Link bulbs to one of 4 groups on phone app
1. Add config to HomeAssistant's configuration.yaml file

### Install MiLight app

Install from your store of choice. I used v3.7 from the Google Play store.

### Connect the v6 bridge to your phone/network

1. connect phone to home WiFi
2. open MiLight app
3. click + to go to configuration
4. smart link
5. enter home WiFi ssid and password
6. press reset button once on bottom briefly, the two lights will start flashing
7. press Start Configuration button on app
7. it should say 'Success'
8. lights will go solid then one will slow flashing
9. press back on the app 
10. press 'Searching for device' at bottom of screen
11. your bridge should now be visible in the list, click on it to get into the configuration

If you want to get to the webmin console for your bridge, use 'Advanced IP Scanner' program or similar network scanner to locate the IP address. username: admin, password: admin. It's a good idea to go in in there and set a static IP address for your bridge.

### Link/bind a bulb

Before you can use HomeAssistant to control your bulbs you have to pair them to the phone app. This sends the config to the bridge. Once linked you don't have to use the MiLight app at all if you don't want to.

Pair your bulbs to the relevant 4 zones (tabs) along the top. These are the four groups that map to the 'numbers' in the configuration.yaml. For example the first tab or zone in the App is '- number: 1' in configuration.yaml.

Make sure you choose the relevant logical remote control in the app for your lights. I messed around for hours and hours trying to use the default remote that had colour and colour temp. 

1. once the bridge is connected to your phone and network
1. open MiLight 3.7
1. click on the MiLight device
1. you will see the 4 zones along the top
1. click the two arrows icon in the top right to choose the relevant remote type for your bulb 
1. back on the main page, click the chainlink icon in top right corner to get to the Link/Unlink page
1. unlink the bulb first (if you have already used it before)
   1. turn the light you want to connect to off and back on again at the wall
   1. within 3 secs press the red Unlink button
   1. light will flash 9 times and will now be unlinked
1. select the tab/zone along the top for the zone you want to put the bulb into
1. turn the light you want to connect to off and back on again at the wall
1. within 3 secs press the green Link button
1. light will flash 4? times and will now be linked
1. go back to the main page and you can control it.
1. Repeat the linking process for each bulb you want connected to the same group, ie. 4x kitchen lights all connected to the same tab.

I Have:
- 4x GU10 ww/cw bulbs for the kitchen spotlight fixture, assigned to zone 1 on the app using the 10th remote control along from the left; it's the white only with 4 blue groups buttons at the bottom.
- The remaining bulbs are all E27 RGBW added to the relevant zone using the 2nd remote control from the left in the MiLight app v 3.7; this is the colour-only remote with 4 yellow group buttons at the bottom.
  - Kitchen table, also added to zone 1, but from the colour only remote stated above. This appears to allow me to independently control it even though it's on the same zone as the 4x GU10 bulbs. This is because they're of a different 'type', 'white' vs 'rgbw' (see the config below). This is explained in [LimitlessLED example page](https://home-assistant.io/components/light.limitlessled/) 
  - Lounge & Hall, both are bound to zone 2
  - Study, bound to zone 3
  - Bedroom, bound to zone 4

Other Tips I found on an article on the LimitlessLED website that might be of use:

We also had some feedback/tips from users:
1. Tip#10. I had to use the LimitlessLED v1.7 app to connect the bridge to my LAN, then it worked, thanks.
1. Tip#11. I had to use the correct remote screen in the app for my particular RGBW LEDs to sync, thanks.
1. Tip#12. I had to clear remote code pairing using section 3.3.5 of the manual, and then the app and wifi
bridge worked. Thx
1. Tip#13. “I figured it out. I was using a fixture that held multiple bulbs. Apparently there is interference
when you try to pair two bulbs at the same time. A fixture with a single bulb worked.”
1. Tip#14. It worked after I changed my wifi router to the standard wifi secure settings WPA2/PSK AES.
1. Tip#15. I was able to connect the bridge to my network after I set the SSID to visible.
1. Tip#16. I placed the wifi bridge closer to the wifi router.
1. Tip#17. After trying another usb power supply to the wifi bridge it worked.
1. Tip#18. Might be some sneaky power leaking on to your socket with the switch even off. So remove
the bulb from the socket, turn the switch on at the wall. Plug the bulb to the socket, and within 2
seconds press the group1 on button on the remote. Dual white remote for dual white bulbs, RGBW
remote for rgbw bulbs. Now for the App, you must sync it again separately, because the wifi bridge acts
just like its own remote.


### Add the config to the configuration.yaml file

Here's my working light section:

    light:
      platform: limitlessled
      bridges:
        - host: 192.168.0.138
          version: 6
          port: 5987
          groups:
          - number: 1
            type: white
            name: Kitchen
          - number: 1
            type: bridge-led
            name: Bridge Light
          - number: 1
            type: rgbw
            name: Kitchen table
          - number: 2
            type: rgbw
            name: Lounge & Hall
          - number: 3
            type: rgbw
            name: Study
          - number: 4
            type: rgbw
            name: Bedroom

Then reboot your Pi.
You should now see the lights on your home page in HomeAssistant.

Things to note here...

1. not sure if the version and port are required (docs say it's optional), but I added for completeness and to remind me if I ever upgrade or run into issues
1. There are a total of four groups because that's all that the v6 bridge can handle... however... on my main page of HomeAssistant I have **6 independently controllable entities**, i.e. there are 6 on/off switches listed. This is because each of the 4 number/groups here can have duplicates (see I have three 'number 1' entities) because each of those are a different 'type'; a 'white', a 'rgbw', and the 'bridge-led'.
1. the bridge-led is the light on the v6 bridge, this is a special entity and think it can be assigned to any of the 4 groups, it doesn't really matter.
1. Even though my rgb**w** lights have warm white, they're not the rgb**ww** type because mine are the older type I think that doesn't have colour temperature. Thanks to my buddy @noodlemctwoodle for that one... saved me hours, and was about to throw it all in the bin!

Hope this helps someone else.

