---
title: "hass-cli 0.5: Area, Device Registry and event CLI"
description: "Bulk editing for Areas!"
date: 2019-02-11 00:01:00
date_formatted: "February 11, 2018"
author: Max Rydahl Andersen
author_twitter: maxandersen
categories: Announcements
---

With [Home Assistant 0.87][hass-087] out we got Areas and Device Registry UI thus
it is time to do a release of `hass-cli` that allows you to operate on these in a terminal.

This release adds the following features:

 - Area `list`, `create`, `delete`, and `rename`
 - Device `list` and `assign`
 - Event `watch`
 
To get it run:

    $ pip3 install homeassistant-cli
    
And once you have configured some of the new things you can like:

Create an area: 

    $ hass-cli area create Attic
    -  id: 1
       type: result
       success: true
       result:
          area_id: 83977bdb16524579a856560925a791a7
          name: Attic

List all your areas:

    $ hass-cli area list
    ID                                NAME
    295afc88012341ecb897cd12d3fbc6b4  Bathroom
    9e08d89203804d5db995c3d0d5dbd91b  Winter Garden
    8816ee92b7b84f54bbb30a68b877e739  Office
    e6ebd3e6f6e04b63a0e4a109b4748584  Kitchen
    f7f5412a9f47436da669a537e0c0c10f  Livingroom
    bc98c209249f452f8d074e8384780e15  Hallway
    83977bdb16524579a856560925a791a7  Attic

List devices matching a pattern:

    $ hass-cli device list "Kitchen.*Light*"
    ID                                NAME                      MODEL                    MANUFACTURER    AREA
    f9cad07069c74d519fbe84811c91f1fb  Kitchen Light 2           LCT003                   Philips         e6ebd3e6f6e04b63a0e4a109b4748584
    d02ec64623ae4407a80b903cbc061511  Kitchen Light 3           LCT003                   Philips         e6ebd3e6f6e04b63a0e4a109b4748584
    820c9e511fce42ea92b228c18710aa56  Kitchen Light 1           LCT003                   Philips         e6ebd3e6f6e04b63a0e4a109b4748584
    417dd42c0c764765aa29580d77b8b7ad  Kitchen Light 5           LCT003                   Philips         e6ebd3e6f6e04b63a0e4a109b4748584

Like with `entity list` you can filter and pipe results to get interesting things.

How about a inventory count? 

    $ hass-cli --no-headers --columns manufacturer,model device list | sort | uniq -c | sort -nr
    10 IKEA of Sweden      TRADFRI bulb GU10 WS 400lm
     8 Philips             SML001
     7 LUMI                lumi.sensor_magnet.aq2
     6 Sonos               Play:1
     6 Philips             LTW012
     6 Philips             LCT003
     6 Philips             Hue color spot
     6 Philips             Hue ambiance candle
     5 Philips             LWG001
     5 Philips             LCT012
     5 Philips             Hue color candle
     5 IKEA of Sweden      TRADFRI bulb E14 W op/ch 400lm
     4 Sonos               One
     4 Philips             RWL021
     4 Philips             Hue color lamp
     4 IKEA of Sweden      TRADFRI remote control
     3 Philips             Hue lightstrip plus
     3 OSRAM               Color temperature light
     3 LUMI                lumi.vibration.aq1
     3 IKEA of Sweden      TRADFRI transformer 30W
     ....
     
And then my favorite feature, assign of area to a device:

    $ hass-cli device assign Kitchen "Kitchen Light 2"
    
or even more powerful, bulk-assign to any entity matching a certain pattern:

    $ hass-cli device assign --match "Kitchen" Kitchen
      Successfully assigned 'Kitchen' to 'Kitchen'
      Successfully assigned 'Kitchen' to 'Kitchen table left'
      Successfully assigned 'Kitchen' to 'Kitchen table right'
      Successfully assigned 'Kitchen' to 'Kitchen left middle at window'
      Successfully assigned 'Kitchen' to 'Kitchen front right at fridge'
      Successfully assigned 'Kitchen' to 'Kitchen left back at hub'
      Successfully assigned 'Kitchen' to 'Kitchen left back at bar'
      Successfully assigned 'Kitchen' to 'Kitchen right back at sink'
      Successfully assigned 'Kitchen' to 'Kitchen right middle at oven'
      Successfully assigned 'Kitchen' to 'Kitchen Light 2'
      Successfully assigned 'Kitchen' to 'Kitchen Light 3'
      .... 
      
And finally as a little bonus feature you can now watch the event bus from the CLI:

All events: 

    $ hass-cli event watch
    
or specific events:

    $ hass-cli event watch call_service
    
At the moment the output is raw JSON, that will improve in a future release.

The full change list including bugfixes from community is as follows:

## What's Changed

New features:

- Device, Area and event support [237ade8](http://github.com/home-assistant/home-assistant-cli/commit/237ade81372d25bfb3655c6a9f10d4aa697cad2e) @maxandersen
- add minimal dockerfile [2b00bd7](http://github.com/home-assistant/home-assistant-cli/commit/2b00bd7e5b865775e7787c9cedf8d9c17d5f68cb) Ben Lebherz

Bug fixes:

- fix(entity): honor --columns in entity get [67397a1](http://github.com/home-assistant/home-assistant-cli/commit/67397a102295381d5d9101a51764643a3668e1e6) @maxandersen
- Fix result reporting from service calls [14fc952](http://github.com/home-assistant/home-assistant-cli/commit/14fc9527ec0861a7dd26e185f4937bf9aace7f07) @maxandersen
- Remove pyaml and move to ruamel only for yaml [df9f8c2](http://github.com/home-assistant/home-assistant-cli/commit/df9f8c23fa9993f16c735159634f29d2a50e1a43) @maxandersen

Minor fixes:

- fix: release 0.5.0 version [200a099](http://github.com/home-assistant/home-assistant-cli/commit/200a099d066f2f5b34cce986e29952f4b6bb6594) @maxandersen
- fix: be pep440 complant [98320f8](http://github.com/home-assistant/home-assistant-cli/commit/98320f888b75c8a091c5d19b154cac5b2946ac7b) @maxandersen
- fix: fix lint errors [eca26fa](http://github.com/home-assistant/home-assistant-cli/commit/eca26fa4c2ebd0637a75a221dc17af60210bd0b3) @maxandersen
- fix: fix lint errors [ffd2369](http://github.com/home-assistant/home-assistant-cli/commit/ffd23695cace01e872590fba06dedab63a56693f) @maxandersen
- enable deploy of git timestamped build [4b27a65](http://github.com/home-assistant/home-assistant-cli/commit/4b27a65a2ddab302d97253b677df55739696c6d7) @maxandersen
- Merge branch 'master' into dev [caaf7b1](http://github.com/home-assistant/home-assistant-cli/commit/caaf7b160f1bc7f7854d82ecdb35d0954c5e7ea8) @maxandersen
- add docker reference [d3b64e8](http://github.com/home-assistant/home-assistant-cli/commit/d3b64e886f2a3380e0c4dceb0ea5a5c7d8e7eedc) @maxandersen
- docs: add docs for area, device and event watch [ee4f74a](http://github.com/home-assistant/home-assistant-cli/commit/ee4f74af87ec810a135c66d0d193a14242213328) @maxandersen
- Make dockerfile build from source + entrypoint [b7f8764](http://github.com/home-assistant/home-assistant-cli/commit/b7f876420df65b07a6b2a99c0e7dc7635711c1cd) @maxandersen
- Fix lint issue [8bb0c9e](http://github.com/home-assistant/home-assistant-cli/commit/8bb0c9e4d62ff364f54e1561573e37c7517a46c9) @fabaff
- Fix lint issues [58fdc83](http://github.com/home-assistant/home-assistant-cli/commit/58fdc835978f0448d43e43595379c32c161f3af3) @fabaff
- fix bad typing [499b544](http://github.com/home-assistant/home-assistant-cli/commit/499b5449b0441b546ea48aff212754433457dbd5) @maxandersen
- fix editor formatting [86d9bf8](http://github.com/home-assistant/home-assistant-cli/commit/86d9bf8bf6bfb5bec1a9f28177c105f84912a91b) @maxandersen
- Fix version [3765a03](http://github.com/home-assistant/home-assistant-cli/commit/3765a03ccf11f0865baa7e70937279bcaa245352) @maxandersen
- Fix version marker [edbe4bf](http://github.com/home-assistant/home-assistant-cli/commit/edbe4bf42e7d0993d68a367ca04ad80217aac395) @maxandersen

Have fun!

[Max Rydahl Andersen][@maxandersen]


[@maxandersen]: https://xam.dk/about
[hass-087]: /blog/2019/02/06/release-87/
