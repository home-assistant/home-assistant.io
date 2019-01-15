---
layout: page
title: "Logi Circle"
description: "Instructions on how to integrate your Logi Circle cameras within Home Assistant."
date: 2018-09-08 11:00
sidebar: true
comments: false
sharing: true
footer: true
logo: logi_circle.png
ha_category: Camera
ha_release: 0.79
ha_iot_class: "Cloud Push"
---

The `logi_circle` implementation allows you to integrate your [Logi Circle](https://circle.logi.com/) cameras in Home Assistant. To connect Logi Circle, you will have to [sign up for API access](https://docs.google.com/forms/d/184FUILJ10rVxotyOQR5DAiu6GcCbK31AZszUdzT1ybs) and get a `client_id`, `client_secret` and `api_key`.

<p class='note warning'>
The camera's live stream does not function with FFMPEG 3.2 - which is distributed by default with Home Assistant's docker container. Refer to [Resolving FFMPEG issues](#resolving-ffmpeg-issues) in this guide for instructions on updating FFMPEG.
</p>

### {% linkable_title Setting up developer account %}

1. Navigate to the [Circle OAuth2 Client Request Form](https://docs.google.com/forms/d/184FUILJ10rVxotyOQR5DAiu6GcCbK31AZszUdzT1ybs).
2. Fill out your personal details.
3. Request the following scopes:
    * `circle:activities`
    * `circle:accessories`
    * `circle:live_image`
    * `circle:live`
    * `circle:notifications`
    * `circle:summaries`
4. Request the `authorization_code` grant type.
5. For the redirect URI, specify your Home Assistant URL followed by `/api/logi_circle`. For example, if your Home Assistant URL is `https://homeassistant.local`, then request `https://homeassistant.local/api/logi_circle`

Please note that the turn-around time for API access is not immediate. 

### {% linkable_title Configuration %}

To integrate cameras linked with your [Logi Circle](https://circle.logi.com/) account, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
logi_circle:
  client_id: YOUR_CLIENT_ID
  client_secret: YOUR_CLIENT_SECRET
  api_key: YOUR_API_KEY
  redirect_uri: YOUR_REDIRECT_URI
```

{% configuration variables %}
client_id:
  description: The client ID issued to you by Logitech.
  required: true
  type: string
client_secret:
  description: The client secret issued to you by Logitech.
  required: true
  type: string
api_key:
  description: The API key issued to you by Logitech.
  required: true
  type: string
redirect_uri:
  description: > 
    The redirect URI that corresponds to your Home Assistant instance.
    It must one of the redirect URI you included when requesting API
    access from Logitech.
  required: true
  type: string
binary_sensor:
  description: Configuration to pass to all binary sensors.
  required: false
  type: map
  keys:
    monitored_conditions:
      description: The conditions to create binary sensors from.
      required: false
      type: list
      default: all
      keys:
        activity:
          description: Indicates whether there is an activity in-progress.
        is_charging:
          description: Indicates whether the camera is currently charging.
        privacy_mode:
          description: The configured privacy mode. If true, the camera will not capture activities.
        streaming_enabled:
          description: The soft on/off status of the camera.
sensor:
  description: Configuration to pass to all sensors.
  required: false
  type: map
  keys:
    monitored_conditions:
      description: The conditions to create sensors from.
      required: false
      type: list
      default: all
      keys:
        battery_level:
          description: Returns the battery level percentage from the camera.
        last_activity_time:
          description: Return the timestamp from the last time the Logi Circle camera detected any activity.
        signal_strength_category:
          description: Return the WiFi signal level from the camera.
        signal_strength_percentage:
          description: Return the WiFi signal percentage from the camera.
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

### {% linkable_title Resolving FFMPEG issues %}

The camera's live stream cannot be demuxed on FFMPEG 3.2. You must upgrade to FFMPEG 3.3 or 3.4 to resolve this issue.

If you're running Home Assistant directly, you can simply upgrade your system FFMPEG version to resolve this issue. If you're running a Home Assistant inside a docker container, you will need to download a static build of FFMPEG and reconfigure the ffmpeg platform to use the binary you downloaded.

<p class='note warning'>
The FFMPEG download links provided below are not officially distributed builds of FFMPEG. Please take care when downloading arbitrary binaries from unknown sources.
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

## {% linkable_title Full Configuration Example %}

```yaml
# Example configuration.yaml entry with all monitored conditions specified
logi_circle:
  client_id: YOUR_CLIENT_ID
  client_secret: YOUR_CLIENT_SECRET
  api_key: YOUR_API_KEY
  redirect_uri: YOUR_REDIRECT_URI
  binary_sensor:
    monitored_conditions:
      - activity
      - is_charging
      - privacy_mode
      - streaming_enabled
  sensor:
    monitored_conditions:
      - battery_level
      - last_activity_time
      - signal_strength_category
      - signal_strength_percentage
  camera:
    ffmpeg_arguments: "-vf eq=brightness=0.06:saturation=2"
```


