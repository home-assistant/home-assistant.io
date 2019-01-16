---
layout: page
title: "Logi Circle Camera"
description: "Instructions on how to integrate your Logi Circle cameras within Home Assistant."
date: 2018-09-08 11:00
sidebar: true
comments: false
sharing: true
footer: true
logo: logi_circle.png
ha_category: Camera
ha_release: 0.79
ha_iot_class: "Cloud Polling"
---

The `logi_circle` camera platform allows you to watch the live RTSP stream of your [Logi Circle](https://circle.logi.com/) camera's in Home Assistant.

<p class='note'>
You must have the [Logi Circle component](/components/logi_circle/) configured to use this camera platform. The `logi_circle` camera will be automatically setup when you do.
</p>

Logi Circle cameras support the `camera.turn_on` and `camera.turn_off` services. This will set the streaming mode property of your camera accordingly, controlling whether the live stream is available and activity recordings are captured.

## {% linkable_title Configuration %}

You can optionally specify FFMPEG arguments to be used when viewing the live RTSP stream. This is achieved by extending the [Logi Circle component](/components/logi_circle/) configuration in your `configuration.yaml` file with the following settings:

```yaml
# Example configuration.yaml entry
logi_circle:
  cameras:
    ffmpeg_arguments: "-vf eq=brightness=0.06:saturation=2"
```

{% configuration variables %}
camera:
  description: Configuration to pass to all cameras.
  required: false
  type: map
  keys:
    ffmpeg_arguments:
      description: >
        Extra options to pass to ffmpeg, e.g.,
        image quality or video filter options.
      required: false
      type: string
{% endconfiguration %}

These arguments are not used by the [live stream record service](#service-cameralogi_circle_livestream_record).

### {% linkable_title Service `camera.logi_circle_livestream_record` %}

Initiates a recording of the camera's live stream.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            |      yes | Name(s) of entities to initiate a recording for, e.g., `camera.living_room_camera`. If blank, targets all Logi Circle cameras. |
| `filename `            |      no  | Template of a file name. Variable is `entity_id`, e.g., {% raw %}`/tmp/snapshot_{{ entity_id }}.mp4`{% endraw %}. |
| `duration`             |      no  | Duration of recording, in seconds.

The path part of `filename` must be an entry in the `whitelist_external_dirs` in your [`homeassistant:`](/docs/configuration/basic/) section of your `configuration.yaml` file.

### {% linkable_title Service `camera.logi_circle_livestream_snapshot` %}

Take a snapshot from a camera's live stream. This differs from the generic [snapshot](/components/camera/#service-snapshot) service in that explicitly requests a fresh image from Logi Circle's API. This will force cameras in a deep sleep state to wake.

Please note that new snapshots will only be generated if the cached snapshot is older than 30s. Requesting multiple snapshots in quick succession will likely return the same image. Likewise, requesting a snapshot from a camera that is actively streaming (ie. is not in deep sleep) will return a cached image no older than 30s.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            |      yes | Name(s) of entities to create a live stream snapshot from, e.g., `camera.living_room_camera`. If blank, targets all Logi Circle cameras. |
| `filename`             |      no  | Template of a file name. Variable is `entity_id`, e.g., {% raw %}`/tmp/snapshot_{{ entity_id }}.jpg`{% endraw %}. |

The path part of `filename` must be an entry in the `whitelist_external_dirs` in your [`homeassistant:`](/docs/configuration/basic/) section of your `configuration.yaml` file.

### {% linkable_title Service `camera.logi_circle_set_privacy_mode` %}

Sets the privacy mode of your camera. If set to true, the camera will not capture activities.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            |      yes | Name(s) of entities to set the privacy mode for, e.g., `camera.living_room_camera`. If blank, targets all Logi Circle cameras. |
| `value`                |      no  | Privacy mode value. Allowed values: `true`, `false` |

## {% linkable_title Resolving FFMPEG issues %}

The camera's live stream cannot be demuxed on FFMPEG 3.2. You must upgrade to FFMPEG 3.3 or 3.4 to resolve this issue.

If you're running Home Assistant directly, you can simply upgrade your system FFMPEG version to resolve this issue. If you're running a Home Assistant inside a docker container, you will need to download a static build of FFMPEG and reconfigure the ffmpeg platform to use the binary you downloaded.

<p class='note warning'>
The FFMPEG download links provided below are not officially distributed builds of FFMPEG. Please practice all normal online security habits when downloading and installing FFMPEG from the supplied links.
</p>

1. Download FFMPEG 3.4.2 appropriate for your processor architecture.
     * [x86 (32-bit)](https://www.johnvansickle.com/ffmpeg/old-releases/ffmpeg-3.4.2-armhf-32bit-static.tar.xz)
     * [x86-64 (64-bit)](https://www.johnvansickle.com/ffmpeg/old-releases/ffmpeg-3.4.2-64bit-static.tar.xz)
     * [armel (32-bit)](https://www.johnvansickle.com/ffmpeg/old-releases/ffmpeg-3.4.2-armel-32bit-static.tar.xz)
     * [armhf (32-bit)](https://www.johnvansickle.com/ffmpeg/old-releases/ffmpeg-3.4.2-armhf-32bit-static.tar.xz)
     * [arm64 (64-bit)](https://www.johnvansickle.com/ffmpeg/old-releases/ffmpeg-3.4.2-arm64-64bit-static.tar.xz)
2. Extract the tarball, eg. `tar -xJf ffmpeg-3.4.2-arm64-64bit-static.tar.xz`
3. Copy or move `ffmpeg` from the extracted tarball to a folder that is mapped to your Home Assistant container. For the sake of example, we'll use the configuration folder. Create an `ffmpeg` folder in your Home Assistant configuration folder, and copy the `ffmpeg` binary there.
4. Set the ffmpeg path in your configuration.yaml as follows:
```yaml
ffmpeg:
  ffmpeg_bin: /config/ffmpeg/ffmpeg
```
5. Restart Home Assistant. The camera's live stream should now function.

FFMPEG 4.x also supports demuxing Logi Circle's live stream, but is not yet supported by Home Assistant's `ffmpeg` component. Refer to [this issue](https://github.com/home-assistant/home-assistant/issues/18056) for more information.