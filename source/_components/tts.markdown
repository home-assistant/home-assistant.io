---
layout: page
title: "Text-to-Speech (TTS)"
description: "Instructions on how to setup Text-to-Speech (TTS) with Home Assistant."
date: 2016-12-13 07:00
sidebar: true
comments: false
sharing: true
footer: true
ha_release: 0.35
---

Text-to-Speech (TTS) enables Home Assistant to speak to you.

## {% linkable_title Configuring a `tts` platform %}

To get started, add the following lines to your `configuration.yaml` (example for Google):

```yaml
# Example configuration.yaml entry for google tts service
tts:
  - platform: google
```

<p class='note'>
Depending on your setup, you might need to set a base URL (`base_url`) inside the [http component](/components/http/) or in the parameters of this component.
</p>

The following optional parameters can be used with any platform. However, the TTS component will only look for global settings under the configuration of the first configured platform:

{% configuration %}
cache:
  description: Allow TTS to cache voice file to local storage.
  required: false
  type: boolean
  default: True
cache_dir:
  description: Folder name or path to a folder for caching files.
  required: false
  type: string
  default: tts
time_memory:
  description: Time to hold the voice data inside memory for fast play on a media player. Minimum is 60 s and the maximum 57600 s (16 hours).
  required: false
  type: integer
  default: 300
base_url:
  description: A base URL to use *instead* of the one set in the [http component](/components/http/). It is used as-is by the `tts` component. In particular, you need to include the protocol scheme `http://` or `https://` and the correct port number. They will not be automatically added for you.
  required: false
  type: string
  default: value of ``http.base_url``
{% endconfiguration %}

The extended example from above would look like the following sample:

```yaml
# Example configuration.yaml entry for Google TTS service
tts:
  - platform: google
    cache: true
    cache_dir: /tmp/tts
    time_memory: 300
    base_url: http://192.168.0.10:8123
```

## {% linkable_title When do you need to set `base_url` here? %}

The general answer is "whenever the global `base_url` set in [http component](/components/http/) is not adequate to allow the `say` service to run". The `say` service operates by generating a media file that contains the speech corresponding to the text passed to the service. Then the `say` service sends a message to the media device with a URL pointing to the file. The device fetches the media file at the URL and plays the media. Some combinations of a media device, network configuration and Home Assistant configuration can make it so that the device cannot fetch the media file.

The following sections describe some of the problems encountered with media devices.

### {% linkable_title Self-signed certificates %}

This problem occurs when your Home Assistant instance is configured to be accessed through SSL, and you are using a self-signed certificate.

The `tts` service will send an `https://` URL to the media device, which will check the certificate, and reject it. So it won't play your file. If you could make the device accept your certificate, it would play the file. However, many media devices do not allow changing settings to accept self-signed certificates. Ultimately, your option may be to serve files to the device as `http://` rather than `https://`. To do this, you *could* change the `base_url` setting in [http component](/components/http/), but that would turn off SSL for all services that use `base_url`. Instead, setting a `base_url` for the `tts` service allows turning off SSL only for this component.

### {% linkable_title Google cast devices %}

The Google cast devices (Google Home, Chromecast, etc.) present the following problems:

* They [reject self-signed certificates](#self-signed-certificates).

* They do not work with URLs that contain hostnames established by local naming means. Let's say your Home Assistant instance is running on a machine made known locally as `ha`. All your machines on your local network are able to access it as `ha`. However, try as you may, your cast device won't download the media files from your `ha` machine. That's because your cast device ignores your local naming setup. In this example, the `say` service creates a URL like `http://ha/path/to/media.mp3` (or `https://...` if you are using SSL). Setting a `base_url` that contains the IP address of your server works around this issue. By using an IP address, the cast device does not have to resolve the hostname.

* An alternative way to force Google cast devices to use internal DNS is to block them from accessing Google DNS at the firewall/router level. This would be useful in the case, for example, where your internal IP of HASS is a private IP and you have your internal DNS server (quite often a split-brain DNS scenario). This method works on both Google Home Mini and Google Chromecasts.

## {% linkable_title Service say %}

The `say` service support `language` and on some platforms also `options` for set, i.e., *voice, motion, speed, etc*. The text for speech is set with `message`.

Say to all `media_player` device entities:

```yaml
# Replace google_say with <platform>_say when you use a different platform.
service: tts.google_say
data:
  message: 'May the Force be with you.'
```
Say to the `media_player.floor` device entity:

```yaml
service: tts.google_say
entity_id: media_player.floor
data:
  message: 'May the Force be with you.'
```

Say to the `media_player.floor` device entity in French:

```yaml
service: tts.google_say
entity_id: media_player.floor
data:
  message: 'Que la force soit avec toi.'
  language: 'fr'
```

With a template:

```yaml
service: tts.google_say
data_template:
  message: "Temperature is {% raw %}{{states('sensor.temperature')}}{% endraw %}."
  cache: false
```

## {% linkable_title Cache %}

The component has two caches. Both caches can be controlled with the `cache` option in the platform configuration or the service call `say`. A long time cache will be located on the file system. The in-memory cache for fast responses to media players will be auto-cleaned after a short period.

## {% linkable_title REST Api %}

#### {% linkable_title POST /api/tts_get_url %}

Returns an URL to the generated TTS file. Platform and message are required.

```json
{
    "platform": "amazon_polly",
    "message": "I am speaking now"
}
```

The return code is 200 if the file is generated. The message body will contain a JSON object with the URL.

```json
{
    "url": "http://127.0.0.1:8123/api/tts_proxy/265944c108cbb00b2a621be5930513e03a0bb2cd_en_-_demo.mp3"
}
```

Sample `curl` command:

```bash
$ curl -X POST -H "x-ha-access: YOUR_PASSWORD" \
       -H "Content-Type: application/json" \
       -d '{"message": "I am speaking now", "platform": "amazon_polly"}' \
       http://localhost:8123/api/tts_get_url
```
