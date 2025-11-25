---
title: "Smart Baby Monitor"
description: "How to build your own smart baby monitor"
date: 2017-02-03 01:00:00 UTC
date_formatted: "February 3, 2017"
author: Pascal Vizeli
categories: How-To
og_image: /images/blog/2017-02-babyphone/social.png
---

One of the hardest part of being a parent is keeping a constant eye on the baby to make sure that the baby is doing well. Thus, it is not surprising that baby monitors are one of the fastest growing baby product category. However, many of the baby monitors available on the market are rather dumb and expect the parents to keep looking at the video stream or listen to the audio. This how-to will help you create a smart baby monitor on a budget and integrate it with Home Assistant. Instead of relying on the poor quality baby monitor speakers, we use our existing speakers (eg. Sonos). We can also send notifications (with pictures) to avoid constant monitoring of the feed.

Obviously, you can use the setup as a general purpose surveillance system to monitor noise in the whole house.

<!--more-->

### Setup

We need an IP camera that can capture sound in the baby's room. It is also possible to use a Raspberry Pi with a microphone and send the audio to Home Assistant with `ffmpeg -f alsa -i hw:1,0 -vn -f rtp rtp://236.0.0.1:2000` over multicast. We can set the `input` option on the Home Assistant side to `rtp://236.0.0.1:2000` in the same network.

Next, we attach a `ffmpeg_noise` binary sensor to our IP camera. The sensor has an output `option` that allows us to send the output to an [icecast2](http://icecast.org/) server for playing over speakers integrated with Home Assistant. We can use the binary sensor in our automation. You can ignore the icecast2 setup if you don't want to play the audio after the noise sensor trigger.

{% note %}
We change the platform name for binary sensor in 0.38 from `ffmpeg` to `ffmpeg_noise`. Also all service going to component and was rename from `binary_sensor.ffmpeg_xy` to `ffmpeg.xy`.
{% endnote %}

On Raspbian Jessie, you can setup [FFmpeg](/integrations/ffmpeg) and install an [icecast2](http://icecast.org/) server using:

```bash
sudo echo "deb http://ftp.debian.org/debian jessie-backports main" >> /etc/apt/sources.list
sudo apt-get update
sudo apt-get -t jessie-backports install ffmpeg
sudo apt-get install icecast2
```

We setup an icecast mount point for our babyphone and update `/etc/icecast2/icecast.xml`:

```xml
<mount>
    <mount-name>/babyphone.mp3</mount-name>
    <stream-name>Babyphone</stream-name>

    <username>stream_user</username>
    <password>stream_pw</password>
</mount>
```

Now we can add the noise sensor to Home Assistant. We lower the sensitivity of the sensor (so that you are not inundated with notifications for every cough of the baby) to 2 seconds using the `duration` option. The sensor should wait 60 seconds before restoring and it prevent us that a wine break will triggering a new alarm.

We can optimize the audio stream for human voice by using a highpass filter with 300 Hz and a lowpass filter with 2500 Hz. This filters out all non-human sounds such as background noise. We can even add a volume amplifier if the microphone volume is too low (you can remove it from `extra_arguments`). For icecast2 we convert the audio stream to mp3 with samplerate of 16000 (which is the minimum for Sonos speakers). We use `peak` to set the threshold for noise detection, where 0 dB is very loud and -100 dB is low.

```yaml
binary_sensor:
  - platform: ffmpeg_noise
    input: rtsp://user:pw@my_input/video
    extra_arguments: -filter:a highpass=f=300,lowpass=f=2500,volume=volume=2 -codec:a libmp3lame -ar 16000
    output: -f mp3 icecast://stream_user:stream_pw@127.0.0.1:8000/babyphone.mp3
    initial_state: false
    duration: 2
    reset: 60
    peak: -32
```

We use the option `initial_state` to prevent the FFmpeg process from starting with Home Assistant and only start it when needed. We use an `input_boolean`  to control the state of FFmpeg services using the following automation.

```yaml
input_boolean:
  babyphone:
    name: babyphone
    initial: off

automation:
 - alias: "Babyphone on"
   trigger:
     platform: state
     entity_id: input_boolean.babyphone
     from: "off"
     to: "on"
   action:
     service: ffmpeg.start
     target:
       entity_id: binary_sensor.ffmpeg_noise

 - alias: "Babyphone off"
   trigger:
     platform: state
     entity_id: input_boolean.babyphone
     from: "on"
     to: "off"
   action:
     service: ffmpeg.stop
     target:
       entity_id: binary_sensor.ffmpeg_noise
```

### Trigger an alarm

Now we can make a lot stuff. Here is a simple example of an automation what should be possible with Sonos speakers.

```yaml
automation:
 - alias: "Babyphone alarm on"
   trigger:
     platform: state
     entity_id: binary_sensor.ffmpeg_noise
     from: "off"
     to: "on"
   action:
    - service: media_player.sonos_snapshot
      target:
        entity_id: media_player.bedroom
    - service: media_player.sonos_unjoin
      target:
        entity_id: media_player.bedroom
    - service: media_player.volume_set
      target:
        entity_id: media_player.bedroom
      data:
        volume_level: 0.4
    - service: media_player.play_media
      target:
        entity_id: media_player.bedroom
      data:
        media_content_type: "music"
        media_content_id: http://my_ip_icecast:8000/babyphone.mp3
    - service: light.turn_on:
      target:
        entity_id:
       - light.floor
       - light.bedroom
      data:
        brightness: 150

 - alias: "Babyphone alarm off"
   trigger:
     platform: state
     entity_id: binary_sensor.ffmpeg_noise
     from: "on"
     to: "off"
   action:
    - service: media_player.sonos_restore
      target:
        entity_id: media_player.bedroom
    - service: light.turn_off:
      target:
        entity_id:
         - light.floor
         - light.bedroom
```

### Thanks

Special thanks to [arsaboo](https://github.com/arsaboo) for assistance in writing this blogpost.
