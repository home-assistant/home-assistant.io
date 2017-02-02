---
layout: post
title: "Baby monitoring"
description: "Make your Home fit for baby monitoring."
date: 2016-07-28 06:00:00 +0200
date_formatted: "July 28, 2016"
author: Pascal Vizeli
comments: true
categories: How-To Babyphone
og_image: /images/blog/2017-02-babyphone/social.png
---

For freshly baked parents comes quickly the question how to monitor the sleep of his child. We want to be awakened when something is. There are many expensive solutions and thus other devices which stand only for a purpose somewhere. What is if we could build a super babephone with little means? With Home-Assistant is this quite simply and possible! We use our existing e.g. Sonos as a loudspeaker and in the night we want to supposed a dimmed lit on the way to the children's room. I send also a notification with a image to my phone, so I have a nice history on next day.

The whole solutions goes also for other purposes, e.g. the audio of the surveillance camera should transfer on a noise into our apartment.

<!--more-->

We need an IP camera in the children's room with sound. This is the simplest solution and we describe this here in the blog. It is also possible to equip a Raspberry with a microphone and send the sound to our Home-Assistant with `ffmpeg -f alsa -i hw:1,0 -vn -f rtp rtp://236.0.0.1:2000` over multicast.

We attach a ffmpeg noise binray sensor to our IP camera. The sensor have a `output` option they allow us to send the output of this to icecast2 server for playing over e.g. Sonos. The binary sensor will go to our main part for all automation. If we don't want to play the audio after trigger the noise sensor, we don't need to install and setup icecast2 server and we ignor this part of setup.

<p class='note'>
We change the platform name for binary sensor in 0.38 from `ffmpeg` to `ffmpeg_noise`. Also all service going to component and was rename from `binary_sensor.ffmpeg_xy` to `ffmpeg.xy`.
</p>

We setup [ffmpeg](components/ffmpeg/) and install a [icecast2](http://icecast.org/) server. On a Raspbian with jessie:
```bash
$ sudo echo "deb http://ftp.debian.org/debian jessie-backports main" >> /etc/apt/sources.list
$ sudo apt-get update
$ sudo apt-get -t jessie-backports install ffmpeg
$ sudo apt-get install icecast2
```

We setup a icecast mount point for our babyphone and update `/etc/icecast2/icecast.xml`:
```
<mount>
    <mount-name>/babyphone.mp3</mount-name>
    <stream-name>Babyphone</stream-name>

    <username>stream_user</username>
    <password>stream_pw</password>
</mount>
```

So now we can add the noise sensor to Home-Assistant. I do not want to be awaiken with every cough of the little child, so we should be at least 2 seconds for option `duration`. The sensor should wait 60 seconds before restoring and it prevent us that a wine break will triggering a new alarm.

We optimize the audio stream for human voice sound. It use a highpass filter with 300Hz and a lowpass filter from 2500Hz. This filter all frequenze with none human voice. Use this filter for reduce background noice. This example add also a volume amplifier that help if the micro volume is to low. If you don't want it, remove the filter from `extra_arguments`. For icecast2 we convert it to mp3 with samplerate of 16000 (that is the minimum for sonos systems). We use `peak` to set the threshold of detecting noise, in dB. 0 is very loud and -100 is low.

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

We use option `initial_state` to prevent that the ffmpeg process will start with Home-Assistant. I don't want monitor the children every time. We make a `input_boolean` to control the state of monitoring with ffmpeg services.

```
input_boolean:
  babyphone:
    name: babyphone
    initial: off

automation:
 - alias: 'Babyphone on'
   trigger:
     platform: state
     entity_id: input_boolean.babyphone
     from: 'off'
     to: 'on'
   action:
     service: ffmpeg.start
     entity_id: binary_sensor.ffmpeg_noise
 - alias: 'Babyphone off'
   trigger:
     platform: state
     entity_id: input_boolean.babyphone
     from: 'on'
     to: 'off'
   action:
     service: ffmpeg.stop
     entity_id: binary_sensor.ffmpeg_noise
```
