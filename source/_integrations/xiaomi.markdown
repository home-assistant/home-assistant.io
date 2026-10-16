---
title: Xiaomi
description: Instructions on how to integrate a video feed (via FFmpeg) as a camera as well as a router within Home Assistant.
ha_category:
  - Camera
  - Presence detection
ha_config_flow: true
ha_release: 0.72
ha_iot_class: Local Polling
ha_domain: xiaomi
ha_platforms:
  - camera
  - device_tracker
ha_integration_type: hub
related:
  - docs: /docs/configuration/
    title: configuration.yaml file
ha_quality_scale: legacy
---

This section shows you how to integrate a [Xiaomi router](http://miwifi.com) or a Xiaomi camera into Home Assistant.

## Camera

The **Xiaomi** camera integration allows you to use Xiaomi cameras within Home Assistant.

### Prerequisites

- To successfully implement this integration, the Home Assistant host should be capable of multiple simultaneous reads.
  - For every concurrent Home Assistant user, a connection will be made to the camera every 10 seconds. This should normally not be a problem.

#### Preparing the device

1. To integrate the camera with Home Assistant, it is necessary to install a custom firmware on the device.
   - To install the firmware, follow the steps in the model-specific documentation:
   - [Yi 720p](https://github.com/fritz-smh/yi-hack)
   - [Yi Home 17CN / 27US / 47US / 1080p Home / Dome / 1080p Dome](https://github.com/shadow-1/yi-hack-v3)
   - [Recent Yi 1080p Home / 1080p Dome](https://github.com/roleoroleo/yi-hack-MStar)
   - [Xiaofang 1080p Camera](https://github.com/samtap/fang-hacks)
2. Once installed, make sure you have enabled FTP.

{% warning %}
Currently, version 0.1.4-beta2 of the custom firmware is the highest supported. Firmwares higher than this version use [Pure-FTPd](https://www.pureftpd.org/project/pure-ftpd), which has a bug that prevents FFmpeg from correctly rendering video files.
{% endwarning %}

{% important %}
Raspbian users: Don't forget to install `ffmpeg` support on your platform, otherwise, you'll not see video.
{% endimportant %}

{% note %}
The live stream writing by the camera is not a supported format when Home Assistant reads through FTP for Yi 720p and Xiaofang Cameras, so this platform retrieves the video which was saved 1 minute earlier.
{% endnote %}

{% tip %}
If you enabled RTSP server, you can connect to your camera via other Home Assistant camera platforms. However, this RTSP server disables the ability to use the supremely-useful Mi Home app. To maintain both Home Assistant compatibility _and_ the native app, this platform retrieves videos via FTP.
{% endtip %}

### Configuration

To enable the camera, add the following lines to your {% term "`configuration.yaml`" %} file:

```yaml
camera:
  - platform: xiaomi
    name: Camera
    host: "192.168.1.100"
    model: "yi"
    password: YOUR_PASSWORD
```

{% configuration %}
name:
  description: A human-friendly name for the camera.
  required: true
  type: string
host:
  description: The IP address or hostname of the camera.
  required: true
  type: template
model:
  description: The model of Xiaomi Camera, currently supporting yi and xiaofang.
  required: true
  type: string
password:
  description: The password to the FTP server on the camera (from above), can be any string as the current firmware doesn't allow setting ftp passwords.
  required: true
  type: string
path:
  description: The path to the raw MP4 files.
  required: false
  type: string
  default: /media/mmcblk0p1/record
username:
  description: The user that can access the FTP server.
  required: false
  type: string
  default: root
ffmpeg_arguments:
  description: Extra options to pass to `ffmpeg`.
  required: false
  type: string
{% endconfiguration %}

{% important %}
The default for `path:` will not work with all cameras. It may be needed that you add that key with the exact path for your device.
{% endimportant %}

### Image quality

Any option supported by [`ffmpeg` camera](/integrations/camera.ffmpeg/) can be utilized via the `ffmpeg_arguments` configuration parameter.

One particularly useful adjustment deals with video size. Since Yi videos are fairly large (especially on the 1080p cameras), the following configuration will bring them down to a manageable size:

```yaml
camera:
  - platform: xiaomi
    name: My Camera
    host: "192.168.1.100"
    model: "xiaofang"
    password: YOUR_PASSWORD
    path: /home/camera/feed
    ffmpeg_arguments: "-vf scale=800:450"
```

### Hostname template

The hostname/IP address can be provided either a value or from the existing {% term entity %} attributes.

```yaml
camera:
  - platform: xiaomi
    name: Front Camera
    host: "{{ states.device_tracker.front_camera.attributes.ip }}"
    model: "yi"
    password: 1234
    path: /tmp/sd/record
```

## Router

The **Xiaomi** router integration offers presence detection by looking at connected devices to a [Xiaomi](http://miwifi.com) router.

### Prerequisites

Before you add the integration, check that your router is compatible: navigate to `http://YOUR_ROUTER_IP/api/misystem/devicelist`.
You should see a listing of the device currently connected to your router.

However, some users report that even when the previous URL does not work, they have been able to integrate their Mi Router 3 in Home Assistant. For example, some users with the Mi Router 3 and firmware version 2.10.46 Stable have integrated their routers successfully and an alternative URL to test integration with is `http://YOUR_ROUTER_IP/cgi-bin/luci/api/misystem/devicelist`. Navigating to this page should show the `{"code":401,"msg":"Invalid token"}` message.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "The IP address of your router, for example `192.168.0.1`."
Username:
  description: "The admin username (default: admin)."
Password:
  description: "The password for the admin account."
{% endconfiguration_basic %}

This configuration sets up the router (presence detection). The camera platform is configured separately in the [Camera](#camera) section above and remains a {% term "`configuration.yaml`" %} configuration.

## Migrating from YAML configuration

If you previously configured the router integration through your {% term "`configuration.yaml`" %} file, the configuration is imported automatically at startup, so your existing setup keeps working without any changes.

A repair issue in {% my integrations title="**Settings** > **Devices & services**" %} is created to guide you through the migration:

1. Remove the `xiaomi` entry under `device_tracker:` from your {% term "`configuration.yaml`" %} file. Keep any Xiaomi `camera:` entries in place.
2. Restart Home Assistant.

See the [device tracker integration page](/integrations/device_tracker/) for instructions how to configure the people to be tracked.
