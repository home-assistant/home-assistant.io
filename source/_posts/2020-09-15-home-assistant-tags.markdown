---
title: "Home Assistant Tags"
description: "Power your home and life with NFC tags, now a first-class citizen in Home Assistant."
date: 2020-09-15 00:01:00
date_formatted: "September 15, 2020"
comments: true
author: Paulus Schoutsen
categories: Announcements
og_image: /images/blog/2020-09-15-home-assistant-tags/social.png
---

![Photo of a Tag Reader](/images/blog/2020-09-15-home-assistant-tags/tag-reader.jpg)

RFID tags have been on my radar for home automation since [@hoveeman](https://github.com/hoveeman) published [this video](https://www.youtube.com/watch?v=AvCseOQidSw) two years ago of him using RFID cards to play music in his house.

It has been [my dream](https://twitter.com/balloob/status/1256728762680393728?s=12) ever since to get this easily accessible to every Home Assistant user. It already got a lot more accessible when [@maddox](https://github.com/maddox) released [Magic Cards](https://github.com/maddox/magic-cards). But this was still a separate application that you had to run besides Home Assistant, and it required a separate RFID reader.

Can we do better? Yes, we can. Today we are introducing <b>Home Assistant Tags</b>. A collaboration between our iOS, Android, frontend, core and hardware groups. With Home Assistant Tags, we're making scannable tags (NFC/RFID) a first-class citizen in Home Assistant. Easy to read, write and automate!

## The Apps

The official Home Assistant apps have been updated with NFC support. This dramatically lowers the bar for starting to automate your house with NFC tags. All you need now is tags!

From the apps you can now write a special Home Assistant URL to tags. Once you hover over one of these tags with your phone, they will trigger the Home Assistant app and send the identifier to your Home Assistant instance for processing. Tags are not bound to the phone that wrote them, any phone can scan them.

Thanks to [@David-Development](https://github.com/david-development) for the NFC support in the Android app and thanks to [@zacwest](https://github.com/zacwest) for the NFC support in the iOS app.

<div class="videoWrapper">
  <iframe width="853" height="480" src="https://www.youtube-nocookie.com/embed/Xc120lClUgA" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
</div>

{% note %}
Only iPhone XS, XR and iPhone 11 or later support background NFC tag reading.
{% endnote %}

## Standalone Tag Reader

Having mobile tag readers is great, but there is more! The original RFID jukebox that peaked my interest worked with a dedicated RFID reader. This RFID reader was connected to a Raspberry Pi that was running a script to read the tags and send them to Home Assistant.

<p class="img">
  <img src="/images/blog/2020-09-15-home-assistant-tags/old-system.jpg" alt="Photo of the old system">
  Photo of the old system.
</p>

These solutions work great but were bulky and required hardware skills and technical skills to set up. The hardware cost for building a single reader could be around $30 (RFID reader + Raspberry Pi 0), but that's just for 1 room. What if you want more rooms? That adds up quickly.

[@adonno](https://github.com/adonno), with the help of [@MagnusO](https://github.com/magnusoverli), has been working on a smaller tag reader based on [ESPHome](https://www.esphome.io). It's powered by an ESP8266 chip and a PN532 NFC module. The case is 3D printed.

Because it's powered by ESPHome, setting up is a breeze. Once powered on, it will create an access point that allows you to add your WiFi configuration. After that Home Assistant will pick it up and you can start scanning tags.

![Photo of a tag reader with orange accents](/images/blog/2020-09-15-home-assistant-tags/orange-reader.jpg)

The nice thing about standalone tag readers is that they are dedicated to a room. This means automations know in which room to act when a music card is scanned and can pick the right media player. This makes it easy to have cards that can work in every room.

The tag reader is open-source and [available on GitHub](https://github.com/adonno/tagreader). You can make one yourself or buy one of the pre-built ones or DIY kits that Adonno is [selling](https://adonno-crafts.myshopify.com/).

## Managing Tags in Home Assistant 0.115

Home Assistant 0.115 will contain a brand new tag manager, thanks to [@bramkragten](https://github.com/bramkragten) and [@dmulcahey](https://github.com/dmulcahey). On this screen you can create new tags, see the tags that have been scanned and can easily create automations for each tag. The new UI tightly integrates with the mobile apps, allowing you to write existing IDs to new tags with the tap of a button.

![Tag user interface in Home Assistant](/images/blog/2020-09-15-home-assistant-tags/tag-ui.gif)

## Building the RFID jukebox

All previous things put the pieces in place for us to be able to build our own jukebox. We can do this with just a few lines of YAML using some of the cool new features coming in Home Assistant 0.115:

{% raw %}

```yaml
# Note, this is using new automation features introduced in Home Assistant 0.115
automation:
- id: handle_tag_scan
  alias: "Handle Tag Scan"
  mode: single
  # Hide warnings when triggered while in delay.
  max_exceeded: silent
  variables:
    # Map scanner device ID to media player entity ID
    media_players:
      0e19cd3cf2b311ea88f469a7512c307d: media_player.spotify_balloob
    # Map tag ID to content
    tags:
      A7-6B-90-5F:
        media_content_id: spotify:album:0h2knr6qpiAq0tV5ri5JMF
        media_content_type: album
      04-B1-C6-62-2F-64-80:
        media_content_id: spotify:playlist:0OtWh3u6fZrBJTQtVBQWge
        media_content_type: playlist
  trigger:
    platform: event
    event_type: tag_scanned
  condition:
    # Test that we support this device and tag
    - "{{ trigger.event.data.tag_id in tags }}"
    - "{{ trigger.event.data.device_id in media_players }}"
  action:
    - variables:
        media_player_entity_id: "{{ media_players[trigger.event.data.device_id] }}"
        media_content_id: "{{ tags[trigger.event.data.tag_id].media_content_id }}"
        media_content_type: "{{ tags[trigger.event.data.tag_id].media_content_type }}"
    - service: media_player.play_media
      target:
        entity_id: "{{ media_player_entity_id }}"
      data:
        media_content_id: "{{ media_content_id }}"
        media_content_type: "{{ media_content_type }}"
    - delay: 2 # timeout before we allow processing next scan
```

{% endraw %}

<p class='img'>
<img src='/images/blog/2020-09-15-home-assistant-tags/cards.jpg' alt='Photo of printed NFC cards'>
Printed NFC cards. <a href="/integrations/tag/#printing-tags">Learn how to make them</a>
</p>

## Time to get scanning!

With these new features, you will be able to do a lot of cool things. Get yourself some [NFC tags](https://amzn.to/3bQU0nN) or [NFC cards](https://amzn.to/2RlqPzM) to get going. Here is some inspiration:

- NFC cards to play music
- NFC stickers on books that play grandparents reading the book
- NFC tags to activate scenes in the room
- NFC cards to open recipes on screens in the kitchen
- NFC tags to allow access to your home

<div class="videoWrapper">
  <iframe width="853" height="480" src="https://www.youtube-nocookie.com/embed/sF83ZK9kFL4" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
</div>
