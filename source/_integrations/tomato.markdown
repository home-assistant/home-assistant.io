---
title: Tomato
description: Instructions on how to integrate Tomato routers into Home Assistant.
ha_category:
  - Presence detection
ha_release: pre 0.7
ha_domain: tomato
ha_iot_class: Local Polling
ha_platforms:
  - device_tracker
ha_integration_type: integration
ha_quality_scale: legacy
---

The `tomato` device tracker integration allows one to tracker devices which are
connected to a wireless router that is running [Tomato](https://tomato.groov.pl/)
as firmware.

Because of a limitation in Tomato's API, this integration will only track wireless devices.

This integration is confirmed to be working with [FreshTomato](https://freshtomato.org) 2020.8 and may also be working with [AdvancedTomato](https://advancedtomato.com/). 

## Setup

The integration requires an extra configuration variable called `http_id`. The
value can be obtained by logging in to the Tomato admin interface and search for
`http_id` in the page's source code.

## Configuration

To use this device tracker in your installation,
add the following to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: tomato
    host: YOUR_ROUTER_IP_ADDRESS
    username: YOUR_ADMIN_USERNAME
    password:  YOUR_ADMIN_PASSWORD
    http_id: YOUR_HTTP_ID
```

{% configuration %}
host:
  description: "The IP address or hostname of your router, e.g., `192.168.1.1` or `rt-ac68u`."
  required: true
  type: string
port:
  description: "The port number of your router, e.g., `443`."
  required: false
  type: integer
  default: 80/443 (automatically detected)
ssl:
  description: "Whether to connect via `https`."
  required: false
  type: boolean
  default: false
verify_ssl:
  description: "If SSL verification for HTTPS resources needs to be turned off (for self-signed certs, etc.) this can take on boolean values `false` or `true` or you can pass a location on the device where a certificate can be used for verification e.g., `/mnt/NAS/router_cert.pem`."
  required: false
  type: [string, boolean]
  default: true
username:
  description: "The username of a user with administrative privileges, usually *admin*."
  required: true
  type: string
password:
  description: "The password for your given admin account."
  required: true
  type: string
http_id:
  description: "The value of `http_id`."
  required: true
  type: string
{% endconfiguration %}

See the [device tracker integration page](/integrations/device_tracker/) for
instructions how to configure the people to be tracked.

## SSL Certificate

Gathering the SSL Certificate of your router can be accomplished with this (or
a similar) command:

```bash
openssl s_client -showcerts -connect 172.10.10.1:443 </dev/null 2>/dev/null | openssl x509 -outform PEM > router_cert.pem
```
