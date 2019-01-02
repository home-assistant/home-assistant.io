---
layout: page
title: "WebDAV Sensor"
description: "Instructions on how to monitor a WebDAV share with Home Assistant."
date: 2019-01-01 21:10
sidebar: true
comments: false
sharing: true
footer: true
logo: webdav.jpg
ha_category: Sensor
ha_iot_class: "Local Polling"
ha_release: 0.85
---

The WebDAV integration for Home Assistant allows you to create a sensor that monitors a WebDAV share.

The state of the sensor is simply `true` or `false` indicating whether the sensor was available when last polled.
The extra attribute `files` provides a list of the full URLs for all files in the share (recursively).

Specify the entity name and WebDAV server URL in your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: webdav
    name: file_server
    host: URL_OF_SHARE
```

Various authentication options are available (see table below), and you can also configure the entity to monitor
a specific path on the server rather than the root. Since this is a polling component, it is a good idea to
set the `scan_interval` to something other than the default.

{% configuration %}
name:
  description: The name that should be used for this sensor in Home Assistant.
  required: true
  type: string
host:
  description: The URL of the server that hosts the WebDAV share
  required: true
  type: string
path:
  description: The path to the share on the host.
  required: false
  type: string
  default: /
username:
  description: The username to use for authenticating to the WebDAV server (for username/password auth)
  required: false
  type: string
password:
  description: The password to use for authenticating to the WebDAV server (for username/password auth).
  required: false
  type: string
token:
  description: The token to use for authenticating to the WebDAV server (for token auth).
  required: false
  type: string
ssl_client_certificate:
  description: The path to the SSL certificate to use for authenticating to the WebDAV server (for certificate auth).
  required: false
  type: string
ssl_client_key:
  description: The path to the private key to use for authenticating to the WebDAV server (for certificate auth).
  required: false
  type: string
{% endconfiguration %}