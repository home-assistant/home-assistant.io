---
layout: page
title: "WebDAV Camera"
description: "Instructions on how to pull images from a WebDAV share within Home Assistant."
date: 2019-03-31 20:00
sidebar: true
comments: false
sharing: true
footer: true
logo: webdav.jpg
ha_category: Camera
ha_iot_class: Local Polling
ha_release: 0.92
---

The WebDAV camera for Home Assistant allows you to create a camera that returns images from a WebDAV share.

The camera will display image files from the specified share in sorted order by filename, with each image 
being displayed for a user-defined interval. Non-image files are simply skipped over.

Specify the entity name, WebDAV server URL, and image interval in your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: webdav
    name: file_server
    host: URL_OF_SHARE
    image_interval: '1:00'
```

Various authentication options are available (see table below), and you can also configure the camera to pull from
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
image_interval:
  description: The amount of time for which the camera will display a given image before moving on to the next one.
  required: true
  type: integer
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
