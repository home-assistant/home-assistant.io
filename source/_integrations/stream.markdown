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
---

The `stream` integration provides a way to proxy live streams through Home Assistant. Most users should not need configure anything or interface with the component directly since it is an internal component used by the [`camera`](/integrations/camera) integration.

## Configuration

The `stream` component is automatically loaded by `default_config` and enabled by the `camera` platforms that support it. If `default config` is used, no separate `configuration.yaml` entry is necessary. If `default_config` is not used, the `stream` component can be activated with the entry below:

```yaml
# Example configuration.yaml entry. There are no additional options.
stream:
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
