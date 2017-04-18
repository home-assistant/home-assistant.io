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
---

The `splunk` component makes it possible to log all state changes to an external [Splunk](http://splunk.com/) database using Splunk's HTTP Event Collector feature. You can either use this alone, or with the HomeAssistant for Splunk [app](https://github.com/miniconfig/splunk-homeassistant). Since the HEC feature is new to Splunk, you will need to use at least version 6.3.

To use the `splunk` component in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
splunk:
  host: SPLUNK_HOST_IP_ADDRESS_OR_HOST_NAME
  port: 8088
  token: B4415DFF-683C-5C6C-3994-4F6D4A5DB03A
  SSL: True
```

Configuration variables:

- **host** (*Optional*): IP address or host name of your Splunk host, eg. http://192.168.1.10. Will default to `localhost` if not supplied.
- **port** (*Optional*): Port to use. Defaults to 8088.
- **token** (*Required*): The HTTP Event Collector Token already created in your Splunk instance.
- **SSL** (*Optional*): Use https instead of http to connect. Defaults to False.
