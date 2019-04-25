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
ha_category:
  - Camera
  - Sensor
ha_release: 0.79
ha_iot_class: Cloud Polling
redirect_from:
  - /components/camera.logi_circle/
  - /components/sensor.logi_circle/
---

The `logi_circle` implementation allows you to integrate your [Logi Circle](https://circle.logi.com/) cameras in Home Assistant. To connect Logi Circle, you will have to [sign up for API access](#requesting-api-access) and get a `client_id`, `client_secret` and `api_key`.

## {% linkable_title Requesting API access %}

1. Navigate to the [Circle OAuth2 Client Request Form](https://docs.google.com/forms/d/184FUILJ10rVxotyOQR5DAiu6GcCbK31AZszUdzT1ybs).
2. Fill out your contact name and e-mail address.
3. For the User Visible Client Name, specify "Home Assistant"
3. Request the following scopes:
    * `circle:activities`
    * `circle:accessories`
    * `circle:live_image`
    * `circle:live`
    * `circle:notifications`
    * `circle:summaries`
4. Request the `authorization_code` grant type.
5. For the redirect URI, specify your Home Assistant URL followed by `/api/logi_circle`. For example, if your Home Assistant URL is `https://homeassistant.local`, then request `https://homeassistant.local/api/logi_circle`. The redirect URI _must_ be HTTPS.

Please note that the turn-around time for API access takes a few business days after which you will be contacted by Logitech using the email address you provided in the form.

## {% linkable_title Configuration %}

To integrate cameras linked with your [Logi Circle](https://circle.logi.com/) account, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
logi_circle:
  client_id: YOUR_CLIENT_ID
  client_secret: YOUR_CLIENT_SECRET
  api_key: YOUR_API_KEY
  redirect_uri: YOUR_REDIRECT_URI
```

{% configuration %}
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
    It must match one of the redirect URIs specified when you requested API
    access from Logitech.
  required: true
  type: string
{% endconfiguration %}

### {% linkable_title Camera %}

The `logi_circle` camera platform allows you to watch the live RTSP stream of your [Logi Circle](https://circle.logi.com/) camera's in Home Assistant.

Logi Circle cameras support the `camera.turn_on` and `camera.turn_off` services. This will set the streaming mode property of your camera accordingly, controlling whether the live stream is available and activity recordings are captured.

You can optionally specify FFMPEG arguments to be used when viewing the live RTSP stream. This is achieved by extending the [Logi Circle component](/components/logi_circle/) configuration in your `configuration.yaml` file with the following settings:

```yaml
# Example configuration.yaml entry
logi_circle:
  cameras:
    ffmpeg_arguments: "-vf eq=brightness=0.06:saturation=2"
```

{% configuration %}
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

These arguments are not used by the [live stream record service](/components/logi_circle/#service-logi_circlelivestream_record).

#### {% linkable_title Resolving FFMPEG issues %}

The camera's live stream cannot be demuxed on FFMPEG 3.2. You must upgrade to FFMPEG 3.3 or newer to resolve this issue.

If you're running Home Assistant directly, you can simply upgrade your system FFMPEG version to resolve this issue. If you're running Home Assistant inside a docker container, you will need to download a static build of FFMPEG and reconfigure the ffmpeg platform to use the binary you downloaded.

At the time of writing, FFMPEG versions 3.3 to 4.1.3 have been tested and validated working with Logi Circle cameras.

<p class='note warning'>
The FFMPEG download links provided below are not officially distributed builds of FFMPEG. Please practice your usual online security habits when downloading and installing FFMPEG from the supplied links.
</p>

1. [Download the latest version of FFMPEG appropriate for your processor architecture](https://www.johnvansickle.com/ffmpeg/). 
2. Extract the tarball, eg. `tar -xJf ffmpeg-release-amd64-static.tar.xz`
3. Copy or move `ffmpeg` from the extracted tarball to a folder that is mapped to your Home Assistant container. For the sake of example, we'll use the configuration folder. Create an `ffmpeg` folder in your Home Assistant configuration folder, and copy the `ffmpeg` binary there.
4. Set the ffmpeg path in your configuration.yaml as follows:
```yaml
ffmpeg:
  ffmpeg_bin: /config/ffmpeg/ffmpeg
```
5. Restart Home Assistant. The camera's live stream should now function.

### {% linkable_title Sensor %}

The `logi_circle` sensor platform lets you monitor sensors connected to your [Logi Circle](https://circle.logi.com) cameras in Home Assistant.

To customize which sensors are setup, you can extend the Logi Circle component configuration in your `configuration.yaml` file with the following settings:

```yaml
# Example configuration.yaml entry
logi_circle:
  sensors:
    monitored_conditions:
      - battery_level
      - last_activity_time
      - recording
      - signal_strength_category
      - signal_strength_percentage
      - streaming
```

By default, all sensors available from your Logi Circle devices will be monitored. Leave `monitored_conditions` blank to disable all sensors for the Logi Circle component. Devices without an internal battery will not expose a `battery_level` sensor.

{% configuration %}
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
        recording:
          description: The camera's recording mode. If false, the camera will not capture activities.
        signal_strength_category:
          description: Return the WiFi signal level from the camera.
        signal_strength_percentage:
          description: Return the WiFi signal percentage from the camera.
        streaming:
          description: The soft on/off status of the camera.
{% endconfiguration %}

## {% linkable_title Services %}

The `logi_circle` platform exposes 3 services for interacting with your Logi Circle device. When calling a service with one or more entity IDs, please ensure you target the camera entity (eg. `camera.living_room_camera`).

### {% linkable_title Service `logi_circle.livestream_record` %}

Initiates a recording of the camera's live stream.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            |      yes | Name(s) of entities to initiate a recording for, e.g., `camera.living_room_camera`. If blank, targets all Logi Circle cameras. |
| `filename `            |      no  | Template of a file name. Variable is `entity_id`, e.g., {% raw %}`/tmp/recording_{{ entity_id }}.mp4`{% endraw %}. |
| `duration`             |      no  | Duration of recording, in seconds.

The path part of `filename` must be an entry in the `whitelist_external_dirs` in your [`homeassistant:`](/docs/configuration/basic/) section of your `configuration.yaml` file.

### {% linkable_title Service `logi_circle.livestream_snapshot` %}

Take a snapshot from a camera's live stream. This differs from the generic [snapshot](/components/camera/#service-snapshot) service in that explicitly requests a fresh image from Logi Circle's API. This will force cameras in a deep sleep state to wake.

Please note that new snapshots will only be generated if the cached snapshot is older than 30s. Requesting multiple snapshots in quick succession will likely return the same image. Likewise, requesting a snapshot from a camera that is actively streaming (ie. is not in deep sleep) will return a cached image no older than 30s.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            |      yes | Name(s) of entities to create a live stream snapshot from, e.g., `camera.living_room_camera`. If blank, targets all Logi Circle cameras. |
| `filename`             |      no  | Template of a file name. Variable is `entity_id`, e.g., {% raw %}`/tmp/snapshot_{{ entity_id }}.jpg`{% endraw %}. |

The path part of `filename` must be an entry in the `whitelist_external_dirs` in your [`homeassistant:`](/docs/configuration/basic/) section of your `configuration.yaml` file.

### {% linkable_title Service `logi_circle.set_config` %}

Sets a configuration property for your camera.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            |      yes | Name(s) of entities to set the operation mode for, e.g., `camera.living_room_camera`. If blank, targets all Logi Circle cameras. |
| `mode`                 |      no  | Configuration property to set. Allowed values: `LED`, `RECORDING_MODE` |
| `value`                |      no  | Mode value. Allowed values: `true`, `false` |
