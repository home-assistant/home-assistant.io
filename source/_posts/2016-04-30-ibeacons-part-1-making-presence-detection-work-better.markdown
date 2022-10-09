---
title: "iBeacons: Making presence detection work better (part I)"
description: A step by step guide how to vastly improve your presence detection by integrating iBeacons.
date: 2016-04-30 07:50:09 +0100
date_formatted: "April 30, 2016"
author: Greg Dowling
author_twitter: pavoni240
categories: iBeacons Presence-Detection OwnTracks
---

_This post is by Home Assistant contributor [Greg Dowling](https://github.com/pavoni)._

In 2013 Apple introduced iBeacons: a class of Bluetooth low energy (LE) devices that broadcast their identifier to nearby devices, including most smartphones. At first glance it’s hard to imagine why they might be useful. In this two part blog I’ll try and explain why they are useful and how you can use them with Home Assistant.

The reason I started using iBeacons was to improve presence detection (and I think that’s the case with most people) so that's what I’ll discuss in _part 1_. In _part 2_ I’ll talk about using iBeacons to track devices that can’t track themselves.

### Using beacons to improve OwnTracks location data

When you use OwnTracks in standard _major move_ mode (which is kind to your phone battery) it sometimes fails to update when you’d like it to. In my case I found that it would often send a location update as I was on my way home, but then not update when I got home. The result would be that Home Assistant would think I was 500M away from home, and take quite a while to notice I was home. It would also mean that the automation that should turn on my lights when I got home didn’t work very well! There were a few times when my phone location updated at 2am and turned the lights on for me. Fortunately my wife is very patient!

Luckily, OwnTracks supports iBeacons so I could use them to make presence detection more reliable. When OwnTracks sees a beacon it recognizes, it will send an update. This means that if you put a beacon at your front door - OwnTracks will see it within a few seconds of you arriving home - and send an update saying it has seen this iBeacon.

<!--more-->

### Getting Started

To do this you first need to set up [MQTT] and [OwnTracks] in Home Assistant - and make sure that HA can track your phone.

[MQTT]: /integrations/mqtt/#picking-a-broker
[OwnTracks]: /integrations/owntracks

You then have to (A) tell Home Assistant where the beacon is located and (B) tell OwnTracks to recognize the beacon.

#### A. Tell Home Assistant where your beacon is located

You tell Home Assistant about fixed locations by creating a Zone with the longitude and latitude of your beacon. You should also give the zone a name which you will also use when you set up OwnTracks. An an example this zone specifies the location of my drive way.

**Example `configuration.yaml` entry**

````yaml

zone:
    - name: 'Drive'
      latitude: XXX
      longitude: YYY
      radius: 100
````

The radius isn’t used by the beacon code, but it is used by the GPS location sensing code. I’ll come back to this a little later. For now just use 50 or 100.

Once you’ve created the zone - you need to restart HA. The next step is:-

#### B. Tell OwnTracks to track  your beacon

1. Go to the OwnTracks app on your phone
2. Touch the `Regions` menu at the bottom of the screen
3. Touch the `+` symbol at the top right of the screen
4. Give the beacon a name e.g., `-drive` ’(start the name with a `-` see below for the reason)
5. Turn Share to `On`
6. Skip the `Circular Region` section
7. Enter the `UUID` of your beacon - this may be written on your beacon - or you can copy it from the management app that came with your iBeacon device. It’s a long number – so it’s easier to copy if you can!
8. Enter the `Minor` and `Major` numbers for your iBeacon - or leave them at 0 which will match all beacons with that `UUID`

<p class='img'>
  <img  width='200' border='2' src='/images/blog/2016-04-ibeacons/owntracks_beacon_setup.png'>
</p>

Once you’ve added the iBeacon - you should be able to see it on the OwnTracks region screen. If your phone can see the packets from that beacon, OwnTracks will turn the relevant Region red.

<p class='img'>
  <img width='200' src='/images/blog/2016-04-ibeacons/owntracks_red_beacon.png'>
</p>

When OwnTracks sees the beacon (and turns the region red), it also sends an MQTT packet to HA to say that you have entered that region.

The result of the configuration above would be to set the location of device.phone to `Drive` , (and the GPS location to XXX,YYY) when your phone sees the beacon.

So with the steps above you should be able to improve the reliability of tracking your phone - and send timely updates to HA. I did this for my home - and the lights now turn on before I reach the house on foot. If I arrive by car they turn on within a few seconds of arriving, before I can get to the front door.

I’m also pleased to say I no longer get an _arrive home_ event at 2am that turns the lights on. I hope I’ve convinced you that iBeacons are worth trying!

### Mixing Beacons and GPS locations

You will probably use beacons to make entry into your existing GPS zones more reliable. By default either a beacon or a GPS location can cause you to enter a zone - and HA has some logic that should make them two work well together (it ignores GPS updates when you’re in an iBeacon Zone).

However you can also use beacons for situations where GPS doesn’t work well.

This might be because the zones are too close together - or even on top of each other!
For example, my wife works next door - and I couldn’t detect whether she’s at home or in the office via GPS because the accuracy wasn’t high enough. However I can do this by using two beacons.

To make this type of presence detection work you need to turn GPS off for a zone in Home Assistant by making them `passive`. This is important because otherwise HA will try to decide between two close together zones without enough data. This doesn’t work well.

A passive zone can only be entered via an iBeacon, so a GPS location update will always pick the other zone.

I set up my Home zone to be a standard region, and my office zone to be passive, so the home zone can be entered in the normal way via either GPS or a Beacon.

**Example `configuration.yaml` entry**

````yaml

zone:
    - name: 'Office'
      latitude: XXX
      longitude: YYY
      radius: 3
      passive: true
````

You could use this technique to try to detect which room someone is in. This might allow you to notice whether someone is in the living room or the bedroom - even though one is above the other (although beacon packets do pass through walls and floors).

To get this to work you’ll probably need to experiment with the beacon signal strength to try to match the beacon reception area to the location you want to track. Let me know if you get this to work (it doesn’t make sense in my open plan house)

### Conclusion

Presence tracking sounds easy - and it's an important part of Home Automation. Trying it shows how difficult it is to get presence detection right.  I've found that iBeacons have improved the reliability and timeliness of knowing where I am, and I hope I encouraged you to try them too.

### Tips

You can find out more about configuring the OwnTracks application and beacons [here](http://owntracks.org/booklet/features/beacons/)

There is information about configuring Homeassistant to use beacons [here](/integrations/owntracks)

#### Connections and disconnecting

Owntracks treats a region name with a leading `-` as a hint that it shouldn't disconnect after a single missed packet. This improves the ability to keep a connection to a beacon.

However, even when using this feature I’ve noticed that you can still lose connections (although it seems to vary by beacon manufacturer and type - I’ll talk more about this in _part 2_). This means that it's best to take into account that you may see false enter/leave events in HA. You may be able to improve this by changing how often the beacons send packets - and by increasing the signal strength (both will drain your beacon batteries more quickly). You can usually change these parameters in the app supplied by the iBeacon maker. You can also find some high power beacons (which have worked well for me).

In automations you can use a `for:` to avoid triggering during a brief disconnect, or use a script with a delay. Stay tuned for _part 2_ for an example of this.

#### Using Multiple beacons for the same Zone
iBeacons have a `UUID` (usually set to the same value for beacons from the same manufacturer), as well as a `minor` and `major` number. If you set two beacons to have exactly same details then OwnTracks will think multiple beacons are at the same location.

This means you can have more than one beacon around your home - and a connection to any of them will count as `home` to OwnTracks and HA. This reduces disconnections.

You can achieve the same effect by using the same the same `UUID` but different `major` / `minor` numbers - and tell OwnTracks not to worry about the `minor` / `major` numbers for a particular region by setting them to 0).

_Make sure to also check out [part II](/blog/2016/05/26/ibeacons-how-to-track-things-that-cant-track-themselves-part-ii/) where I talk about how to use iBeacons to track any object._
