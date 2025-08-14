---
title: go2rtc
description: Instructions on how to setup go2rtc in Home Assistant.
ha_category:
  - Camera
ha_release: 2024.11
ha_iot_class: Local Polling
ha_codeowners:
  - '@home-assistant/core'
ha_domain: go2rtc
ha_integration_type: system
related:
  - docs: /installation/
ha_quality_scale: internal
---

go2rtc is an open source project providing a camera streaming application that supports formats such as RTSP, WebRTC, HomeKit, FFmpeg, RTMP.  The **go2rtc** {% term integration %} connects to a go2rtc instance and provides a WebRTC proxy for all your cameras. To learn more about go2rtc, refer to the [project's GitHub page](https://github.com/AlexxIT/go2rtc/).


If you are using the [`default_config`](/integrations/default_config/) and run Home Assistant using one of the following installation methods, the go2rtc integration will be set up automatically and you don't need to do anything:

- {% term "Home Assistant Operating System" %}
- {% term "Home Assistant Supervised" %}
- {% term "Home Assistant Container" %}

## Configuration

This integration is part of the [`default_config`](/integrations/default_config/).

The following YAML options are available:

{% configuration %}
debug_ui:
  required: false
  description: Enables the UI of the go2rtc, which helps debugging WebRTC issues. The `debug_ui` should only be enabled during debugging as it will expose port 11984 without any authentication!
  default: false
  type: boolean
url:
  required: false
  description: The URL to the self-hosted [go2rtc](https://github.com/AlexxIT/go2rtc/) server
  type: string
{% endconfiguration %}

If you using the go2rtc server managed by Home Assistant, please be aware that all ports are prefixed by `1` compared to the default port settings to avoid port conflicts:
- Api port `1984` becomes `11984`
- WebRTC port `8555` becomes `18555`

{% warning %}

The `debug_ui` should only be enabled during debugging as it will expose port 11984 without any authentication!
Please disable the `debug_ui` immediately after debugging.

{% endwarning %}

### Examples

Use a self-hosted instance:

```yaml
go2rtc:
  url: http://my-go2rtc-instance:1984
```
