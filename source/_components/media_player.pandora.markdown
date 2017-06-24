---
layout: page
title: "Pandora"
description: "Instructions how to integrate Pandora radio into Home Assistant."
date: 2016-06-10 19:59
sidebar: true
comments: false
sharing: true
footer: true
logo: pandora.png
ha_category: Media Player
featured: false
ha_release: 0.22
ha_iot_class: "Local Polling"
---

If you have a Pandora account, you can control it from Home Assistant with this media player. 


### {% linkable_title Installation of Pianobar %}

This media player uses the [Pianobar command-line Pandora client](https://github.com/PromyLOPh/pianobar), which you have to install separately. This can be done on a Raspberry Pi 2 with Raspbian Jesse as follows . _(Note: Other platforms may have different installation processes)_

Install the following dependencies:

```bash
$ sudo apt-get install git libao-dev libgcrypt11-dev libfaad-dev libmad0-dev libjson0-dev make pkg-config libav-tools libavcodec-extra libavcodec-dev libcurl4-openssl-dev  libavfilter-dev libavformat-dev
```

Now clone the Pianobar repo and build pianobar:

```bash
$ git clone https://github.com/PromyLOPh/pianobar.git
$ cd pianobar
$ make clean && make
$ sudo make install
```

Configure Pianobar to auto-login and start playing a station (optional, see `man pianobar`) by creating and editing the `~/.config/pianobar/config` file:

```bash
password = Password
user = you@youraccount.com
```

Test it out by running `pianobar` in the command line. You should be able to listen to your Pandora stations.

### {% linkable_title Configuration in Home Assistant %}

The Pandora player can be loaded by adding the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: pandora
```

That's it! Now you will find a media player. If you click it you will find all your stations listed as different sources. If you switch to one, the station will begin playing. 

<p class='img'>
<img src='/images/screenshots/pandora_player.png' />
</p>

