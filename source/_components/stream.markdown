---
layout: page
title: "Stream"
description: "Instructions on how to integrate live streams within Home Assistant."
date: 2019-02-06 13:40
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: 
  - Other
ha_release: "0.90"
ha_iot_class: Local Push
ha_qa_scale: internal
---

The `stream` component provides a way to proxy live streams through Home Assistant. The component currently only supports the HLS format.

## {% linkable_title Configuration %}

To enable this component, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
stream:
```

<p class='note'>
Depending on your setup, you might need to set a base URL (`base_url`) inside the [http component](/components/http/) or in the parameters of this component.
</p>
{% configuration %}
base_url:
  description: A base URL to use *instead* of the one set in the [http component](/components/http/). It is used as-is by the `stream` component. In particular, you need to include the protocol scheme `http://` or `https://` and the correct port number. They will not be automatically added for you.
  required: false
  type: string
  default: value of ``http.base_url``
{% endconfiguration %}

The extended example from above would look like the following sample:

```yaml
# Example configuration.yaml entry with base_url
stream:
  base_url: http://192.168.0.10:8123
```

## {% linkable_title When do you need to set `base_url` here? %}

The general answer is "whenever the global `base_url` set in [http component](/components/http/) is not adequate to allow the `play_media` service to run". The `play_media` service operates by re-encoding and proxying a stream on the fly. Then the `play_media` service sends a message to the media device with a URL pointing to the file. The device fetches the media file at the URL and plays the media. Some combinations of a media device, network configuration and Home Assistant configuration can make it so that the device cannot fetch the media file.

The following sections describe some of the problems encountered with media devices.

### {% linkable_title Self-signed certificates %}

This problem occurs when your Home Assistant instance is configured to be accessed through SSL, and you are using a self-signed certificate.

The `stream` service will send an `https://` URL to the media device, which will check the certificate, and reject it. So it won't play your file. If you could make the device accept your certificate, it would play the file. However, many media devices do not allow changing settings to accept self-signed certificates. Ultimately, your option may be to serve files to the device as `http://` rather than `https://`. To do this, you *could* change the `base_url` setting in [http component](/components/http/), but that would turn off SSL for all services that use `base_url`. Instead, setting a `base_url` for the `stream` service allows turning off SSL only for this component.

### {% linkable_title Google cast devices %}

The Google cast devices (Google Home, Chromecast, etc.) present the following problems:

* They [reject self-signed certificates](#self-signed-certificates).

* They do not work with URLs that contain hostnames established by local naming means. Let's say your Home Assistant instance is running on a machine made known locally as `ha`. All your machines on your local network are able to access it as `ha`. However, try as you may, your cast device won't download the media files from your `ha` machine. That's because your cast device ignores your local naming setup. In this example, the `play_media` service creates a URL like `http://ha/api/hls/foo/index.m3u8` (or `https://...` if you are using SSL). Setting a `base_url` that contains the IP address of your server works around this issue. By using an IP address, the cast device does not have to resolve the hostname.

* An alternative way to force Google cast devices to use internal DNS is to block them from accessing Google DNS at the firewall/router level. This would be useful in the case, for example, where your internal IP of HASS is a private IP and you have your internal DNS server (quite often a split-brain DNS scenario). This method works on both Google Home Mini and Google Chromecasts.

### {% linkable_title Services %}

Once loaded, the `stream` platform will expose services that can be called to perform various actions.

#### {% linkable_title Service `record` %}

Make a `.mp4` recording from a provided stream.  While this service can be called directly, it is used internally by the [`camera.record`](/components/camera#service-record) service.

Both `duration` and `lookback` options are suggestions, but should be consistent per stream.  The actual length of the recording may vary. It is suggested that you tweak these settings to fit your needs.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `stream_source`        |      no  | The input source for the stream, e.g., `rtsp://my.stream.feed:554`. |
| `filename`             |      no  | The file name string. Variable is `entity_id`, e.g., `/tmp/my_stream.mp4`. |
| `duration`             |      yes | Target recording length (in seconds). Default: 30 |
| `lookback`             |      yes | Target lookback period (in seconds) to include in addition to duration.  Only available if there is currently an active HLS stream for `stream_source`. Default: 0 |

The path part of `filename` must be an entry in the `whitelist_external_dirs` in your [`homeassistant:`](/docs/configuration/basic/) section of your `configuration.yaml` file.

For example, the following action in an automation would take a recording from `rtsp://my.stream.feed:554` and save it to `/tmp`.

```yaml
action:
  service: camera.record
  data:
    stream_source: rtsp://my.stream.feed:554
    filename: '/tmp/my_stream.mp4'
```

## {% linkable_title Troubleshooting %}

Some users on manual installs may see the following error in their logs after restarting:

```
2019-03-12 08:49:59 ERROR (SyncWorker_5) [homeassistant.util.package] Unable to install package av==6.1.2: Command "/home/pi/home-assistant/bin/python3 -u -c "import setuptools, tokenize;__file__='/tmp/pip-install-udfl2b3t/av/setup.py';f=getattr(tokenize, 'open', open)(__file__);code=f.read().replace('\r\n', '\n');f.close();exec(compile(code, __file__, 'exec'))" install --record /tmp/pip-record-ftn5zmh2/install-record.txt --single-version-externally-managed --compile --install-headers /home/pi/home-assistant/include/site/python3.6/av" failed with error code 1 in /tmp/pip-install-udfl2b3t/av/
2019-03-12 08:49:59 ERROR (MainThread) [homeassistant.requirements] Not initializing stream because could not install requirement av==6.1.2
2019-03-12 08:49:59 ERROR (MainThread) [homeassistant.setup] Setup failed for stream: Could not install all requirements.
```

If you see this error you can solve it by running the following commands and restarting Home Assistant (commands do not need to be ran as the `homeassistant` user):

```
sudo apt-get install -y python-dev pkg-config libavformat-dev libavcodec-dev libavdevice-dev libavutil-dev libswscale-dev libavresample-dev libavfilter-dev
```
