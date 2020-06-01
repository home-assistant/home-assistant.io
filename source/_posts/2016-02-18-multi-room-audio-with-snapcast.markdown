---
title: "Multi-room audio with Snapcast, Mopidy, and Home Assistant"
date: 2016-02-18 00:10:56 -0500
author: happyleavesaoc
categories: How-To
date_formatted: "February 18, 2016"
og_image: /images/blog/2016-02-snapcast/diagram.png
---

Would you like to listen to music in every room in your home, controlled from one source? Then multi-room audio is for you.

Multi-room audio can be achieved by having a computer attached to speakers in every room. On each computer, services run to play and/or control the audio. With this DIY approach, the kind of computer and speakers is very much up to you. It could be your desktop computer with attached powered speakers, your HTPC hooked up to your TV and receiver, a Raspberry Pi with Amp or DAC, or even an Android device.

You'll need two key software packages, besides Home Assistant. The first is [Mopidy](https://www.mopidy.com/), a music server that can play local files, or connect to streaming music services like Spotify. The second is [Snapcast](https://github.com/badaix/snapcast/), which enables synchronized audio streaming across your network. Both can be integrated into Home Assistant. Each room audio device will run an instance of the Snapcast client, and optionally a Mopidy instance. Your server will run a special instance of Mopidy and the Snapcast server.

Finally, you also need a player to control Mopidy. Any MPD-compatible player will work, and there are several [Mopidy-only web-based options](https://docs.mopidy.com/en/latest/ext/web/#ext-web) available. On Android, [Remotedy](https://play.google.com/store/apps/details?id=se.anil.remotedy) is particularly nice since you can access multiple Mopidy instances in one place.

Home Assistant will provide device status, and volume control for each room. If you want to play music in all your rooms (on all your clients), access the server instance of Mopidy. If you want to play music only in a specific room, access that specific Mopidy instance. If you're using a web UI for Mopidy, you can add links to each instance in Home Assistant with the weblink component.

<p class='img'>
  <img src='/images/blog/2016-02-snapcast/diagram.png'>
</p>

<!--more-->

## Staging

- [Install](https://www.mopidy.com/) Mopidy (2.0.0 or greater)
- [Download](https://github.com/badaix/snapcast/releases/) and [Install](https://github.com/badaix/snapcast/tree/v0.5.0-beta-1#installation) Snapcast (0.5.0 or greater)

## Configure Mopidy

Mopidy can be run with multiple configuration files, each extending the previous file. This is helpful when we're running multiple instances with varying functionality.

### core.conf

The core configuration is shared between all instances:

```conf
[mpd]
hostname = ::

[http]
hostname = ::

[audio]
output = alsasink

[spotify]
username = <redacted>
password = <redacted>
```

### local.conf

Add the local configuration on computers that have local media files:

```conf
[local]
media_dir = <your/music/here>
```

### snapcast.conf

Finally, the Mopidy instance that connects with Snapcast needs special configuration. Run on a different port to avoid conflicts if you have a second Mopidy instance running on your computer. The audio output is sent to a named pipe - Snapcast will read from there. Note that you may have to adjust the audio output attribute depending on your system and audio sources.

```conf
[mpd]
hostname = ::
port = 6601

[http]
hostname = ::
port = 6681

[audio]
output = audioresample ! audio/x-raw,rate=48000,channels=2,format=S16LE ! audioconvert ! wavenc ! filesink location=/tmp/snapfifo
```

## Run Mopidy

To run a room-specific instance:

```bash
mopidy --config $CONF_DIR/core.conf
```

To run a room-specific instance with local media:

```bash
mopidy --config $CONF_DIR/core.conf:$CONF_DIR/local.conf
```

To run the special Snapcast-connected instance (with local media):

```bash
mopidy --config $CONF_DIR/core.conf:$CONF_DIR/local.conf:$CONF_DIR/snapcast.conf
```

## Run Snapcast

Start the `snapserver` on the same server running Mopidy with the snapcast configuration.

```bash
snapserver   # or use systemd
```

Start the `snapclient` on computers that will be playing audio.

```bash
snapclient   # or use systemd, add -h <server host> if necessary
```

## Configure Snapcast

There are a number of snapcast configuration options, but the one relevant to Home Assistant is the client names. You can set them in the snapserver configuration file, by default located at `~/.config/Snapcast/settings.json`. Only edit this file while the `snapserver` is not running. Modify the `name` JSON value to your liking - this is how the client will be named in Home Assistant.

## Configure Home Assistant

Use the [mpd] and [snapcast] components. Optionally, use [weblink] to provide easy access to a Mopidy web UI.

```yaml
media_player:
- platform: snapcast
  host: xxxxx
- platform: mpd
  server: xxxx
  location: Multi-Room Controller
- platform: mpd
  server: xxx
  location: Room 1

weblink:
  entities:
  - name: Multi-Room Player
    url: xxxx
```

[snapcast]: /integrations/snapcast
[mpd]: /integrations/mpd
