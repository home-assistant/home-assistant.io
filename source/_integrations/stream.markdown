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
ha_integration_type: system
---

The stream integration provides a way to proxy live streams through Home Assistant. Most users should not need to configure anything or interface with the integration directly since it is an internal integration used by the [camera integration](/integrations/camera).

## Configuration

The `stream` integration is automatically loaded by `default_config` and enabled by the `camera` platforms that support it. If `default_config` is used, no separate {% term "`configuration.yaml`" %} entry is necessary. However, there are some extra options you can configure.

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

You can further adjust LL-HLS settings in {% term "`configuration.yaml`" %} as it may perform better or worse with different values depending on your network setup, cameras, or whether or not they are local or cloud.

Example configuration:

```yaml
# Example LL-HLS configuration.yaml entry.
stream:
  ll_hls: true
  part_duration: 0.75
  segment_duration: 6
```


## Technical details

The integration currently supports proxying H.264 and H.265 source streams to the HLS (and LL-HLS) protocol.

Note that while H.265 works on Android and iOS, it does not work in many browsers. This is a browser limitation and not a Home Assistant issue. Safari has native H.265 support, and H.265 also works in Edge on Windows when "HEVC Video Extensions" is installed. Chrome versions >= 104 may also work when started with the `--enable-features=PlatformHEVCDecoderSupport` option.

For testing HEVC browser support, do not rely on the https://www.caniuse.com charts or the https://html5test.com site. They are inaccurate. You can instead use the ["Unprefixed tests" from caniuse.com](https://tests.caniuse.com/?feat=hevc) or the [hls.js demo app with an HEVC HLS stream](https://hls-js.netlify.app/demo/?src=https%3A%2F%2Fbitmovin-a.akamaihd.net%2Fcontent%2Fdataset%2Fmulti-codec%2Fhevc%2Fstream_fmp4.m3u8). The videos there should play if your browser supports H.265.

The `stream` integration supports AAC and MP3 audio. PCM codecs (e.g. G.711/G.723/G.726/G.729) are not supported.
