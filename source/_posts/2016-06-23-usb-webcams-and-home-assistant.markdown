---
layout: post
title: "Using USB webcams with Home Assistant"
description: "A How-to about the integration of USB webcams into Home Assistant."
date: 2016-06-23 06:00:00 +0000
date_formatted: "June 23, 2016"
author: Fabian Affolter
author_twitter: fabaff
comments: true
categories: How-To
og_image: /images/blog/2016-06-cranberry/motion.png
---

<img src='/images/blog/2016-06-cranberry/motion.png' style='clear: right; border:none; box-shadow: none; float: right; margin-bottom: 12px;' width='200' />
In the past month I was thinking about way to integrate USB webcams into Home Assistant again. The main reason was that this would give those devices a second life and enable one to benefit from low-cost video surveillance. There are a couple of options available like [pygame](http://www.pygame.org/hifi.html) or [SimpleCV](http://www.simplecv.org/) but I never finished something. With the [Local File camera platform](https://home-assistant.io/components/camera.local_file/) by [Landrash](https://github.com/Landrash) and [motion](http://lavrsen.dk/foswiki/bin/view/Motion/WebHome) you could integrate a local USB webcam with a few very easy steps.

In this blog post I using a Fedora 24 (will most likely work on other distributions too) installation with Home Assistant 0.22.1 on a Foxconn nT-330i with an old [Logitech QuickCam Orbit AF](http://support.logitech.com/en_us/product/quickcam-sphere-af) and a [Logitech HD Webcam C270](http://support.logitech.com/en_us/product/hd-webcam-c270). As a start only the Quickcam is used. No multi-camera setup for now.

<!--more-->

Check first if the your operating system lists your cameras.

```bash
$ lsusb
[...]
Bus 002 Device 016: ID 046d:08cc Logitech, Inc. Mic (PTZ)
[...]
```

The camera we are going to use is available at `/dev/video1`. The C270 is the one on `/dev/video0`.

```bash
$ ls -al /dev/video*
crw-rw----+ 1 root video 81, 0 Jun 23 08:05 /dev/video0
crw-rw----+ 1 root video 81, 1 Jun 23 08:36 /dev/video1
```

We need an additional software part to handle the cameras. [motion](http://lavrsen.dk/foswiki/bin/view/Motion/WebHome) is capable of monitoring the video signal from USB and network cameras, do motion detection, and other nifty stuff like saving images, add text, or basic image manipulations.

```bash
$ sudo dnf -y install motion
```

For your setup we need to modify the file `/etc/motion/motion.conf`. For now the most important parameters are `videodevice`, `snapshot_interval`, and `target_dir`. We are going to use the device `/dev/video1`, use a 30 seconds interval, and set the path to `/tmp`. Edit `/etc/motion/motion.conf` or use `sed`.

```bash
$ sudo sed -i 's|videodevice /dev/video0|videodevice /dev/video1|g' /etc/motion/motion.conf
$ sudo sed -i 's|target_dir /var/motion|target_dir /tmp|g' /etc/motion/motion.conf
$ sudo sed -i 's|snapshot_interval 0|snapshot_interval 30|g' /etc/motion/motion.conf
```

It's suggested that you adjust at least `width` and `height` to get a bigger image from your camera. Now fire up `motion`.

```bash
$ sudo motion
[0] [NTC] [ALL] conf_load: Processing thread 0 - config file /etc/motion/motion.conf
[0] [ALR] [ALL] conf_cmdparse: Unknown config option "sdl_threadnr"
[0] [NTC] [ALL] motion_startup: Motion 3.3.0 Started
[0] [NTC] [ALL] motion_startup: Logging to file (/var/log/motion.log)
```

Your `target_dir` will start filling up with images from your camera. `motion` will create a symlink called `lastsnap.jpg` which always point to the latest snapshot. We will setup the [Local File camera platform](https://home-assistant.io/components/camera.local_file/) to use this file.

```yaml
camera:
  - platform: local_file
    name: Cranberry cam
    file_path: /tmp/lastsnap.jpg
```

<p class='img'>
  <img src='/images/blog/2016-06-cranberry/cam.png' />
  The "Cranberry cam" in action
</p>

The machine with the attached USB camera will become a webcam server as well because `motion`'s built-in HTTP server is enabled by default. This means that you could connect your USB webcams to a different machine in your network, run `motion` there, adjust your firewall rules, and use Home Assistant to display the videos. Just check [http://[IP of your webcam host]:8081/](http://[IP of your webcam host]:8081/) to see the stream. This required more powerful hardware than using snapshots, of course.

In a scenario like this needs a [Generic MJPEG IP Camera ](https://home-assistant.io/components/camera.mjpeg/) in your `configuration.yaml` file.

```yaml
camera:
  - platform: mjpeg
    mjpeg_url: http://[IP of your webcam host]:8081
    name: Cranberry Live cam
```

[motion](http://lavrsen.dk/foswiki/bin/view/Motion/WebHome) is a powerful tool and this blog post only showed two very simple use cases. Take a look at the [documentation](http://www.lavrsen.dk/foswiki/bin/view/Motion/MotionGuide) of `motion` to unleash its potential.

