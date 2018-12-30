---
layout: page
title: "Splunk"
description: "Record events in Splunk."
date: 2016-02-05 15:31
sidebar: true
comments: false
sharing: true
footer: true
logo: splunk.png
ha_category: "History"
ha_release: 0.13
---

The `splunk` component makes it possible to log all state changes to an external [Splunk](http://splunk.com/) database using Splunk's HTTP Event Collector (HEC) feature. You can either use this alone, or with the Home Assistant for Splunk [app](https://github.com/miniconfig/splunk-homeassistant). Since the HEC feature is new to Splunk, you will need to use at least version 6.3.

## {% linkable_title Configuration %}

To use the `splunk` component in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
splunk:
  token: YOUR_SPLUNK_TOKEN
```

{% configuration %}
token:
  description: The HTTP Event Collector Token already created in your Splunk instance.
  required: true
  type: string
host:
  description: "IP address or host name of your Splunk host, e.g., 192.168.1.10."
  required: false
  default: localhost
  type: string
port:
  description: Port to use.
  required: false
  default: 8080
  type: integer
ssl:
  description: Use HTTPS instead of HTTP to connect.
  required: false
  default: false
  type: boolean
verify_ssl:
  description: Allows you do disable checking of the SSL certificate.
  required: false
  default: false
  type: boolean
name:
  description: This parameter allows you to specify a friendly name to send to Splunk as the host, instead of using the name of the HEC.
  required: false
  default: HASS
  type: string
{% endconfiguration %}
