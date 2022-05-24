---
title: Stream
description: Instructions on how to integrate live streams within Home Assistant.
ha_category:
  - Other
ha_release: '0.90'
ha_iot_class: Local Push
ha_quality_scale: internal
ha_codeowners:
  - '@hunterjm'
  - '@uvjustin'
  - '@allenporter'
ha_domain: stream
ha_platforms:
  - diagnostics
ha_integration_type: integration
---

The stream integration provides a way to proxy live streams through Home Assistant. Most users should not need to configure anything or interface with the component directly since it is an internal component used by the [camera integration](/integrations/camera).

## Configuration

The `stream` integration is automatically loaded by `default_config` and enabled by the `camera` platforms that support it. If `default_config` is used, no separate `configuration.yaml` entry is necessary. However, there are some extra options you can configure.

{% configuration %}
ll_hls:
  description: Allows disabling Low Latency HLS (LL-HLS)
  required: false
  type: boolean
  default: true
segment_duration:
  description: The duration of each HLS segment, in seconds (between 2 and 10)
  type: float
  required: false
  default: 6
part_duration:
  description: The duration of each part within a segment, in seconds (between 0.2 and 1.5)
  type: float
  required: false
  default: 1
{% endconfiguration %}

## LL-HLS - Low Latency HLS

LL-HLS reduces the start time and delay for a stream, but it has strict timing and network requirements and opens additional browser connections. To avoid running into browser limits it is strongly recommended to use an HTTP/2 proxy (e.g., NGINX or haproxy) to take advantage of request pipelining. LL-HLS is enabled by default, but when not using HTTP/2, the Home Assistant frontend will revert back to regular HLS if too many streams are open.

You can further adjust LL-HLS settings in `configuration.yaml` as it may perform better or worse with different values depending on your network setup, cameras, or whether or not they are local or cloud.

Example configuration:

```yaml
# Example LL-HLS configuration.yaml entry.
stream:
  ll_hls: true
  part_duration: 0.75
  segment_duration: 6
```


## Technical Details

The integration currently supports proxying H.264 and H.265 source streams to the HLS protocol and requires at least FFmpeg >= 4. Note that H.265 support is limited to Safari, iOS, and Android. The `stream` integration also provides limited support for audio. PCM codecs (e.g. G.711/G.723/G.726/G.729) are not supported. ADTS AAC audio is also currently not supported. Most other AAC and MP3 encoded audio should work.

## Troubleshooting

Users on manual installs with FFmpeg < 4 may see an error similar to:

```text
2020-04-28 13:35:43 ERROR (SyncWorker_5) [homeassistant.util.package] Unable to install package av==7.0.1: ERROR: Command errored out with exit status 1:
     command: /mnt/c/dev/home-assistant/venv/bin/python3.7 -u -c 'import sys, setuptools, tokenize; sys.argv[0] = '"'"'/tmp/pip-install-twd7glz2/av/setup.py'"'"'; __file__='"'"'/tmp/pip-install-twd7glz2/av/setup.py'"'"';f=getattr(tokenize, '"'"'open'"'"', open)(__file__);code=f.read().replace('"'"'\r\n'"'"', '"'"'\n'"'"');f.close();exec(compile(code, __file__, '"'"'exec'"'"'))' install --record /tmp/pip-record-x9tw2ql2/install-record.txt --single-version-externally-managed --compile --install-headers /mnt/c/dev/home-assistant/venv/include/site/python3.7/av
         cwd: /tmp/pip-install-twd7glz2/av/
```

You can solve this by running the following steps to update FFmpeg >= 4:

```text
sudo add-apt-repository ppa:jonathonf/ffmpeg-4
sudo apt upgrade
```
