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
