---
layout: page
title: "Supervisord"
description: "Instructions how to integrate Supervisord within Home Assistant."
date: 2016-05-13 22:00
sidebar: true
comments: false
sharing: true
footer: true
logo: supervisord.png
ha_category: System Monitor
ha_release: "0.20"
ha_iot_class: "Local Polling"
---

The `supervisord` platform allows you to track the states of [Supervisord](http://supervisord.org/).

It required that you enable the HTTP feature in the `/etc/supervisord.conf` configuration file.

```text
[inet_http_server]
port=127.0.0.1:9001
```

After a restart of `supervisord` you should be able to access the web interface. If needed then this could be added as an [iFrame panel](/components/panel_iframe/).

<p class='img'>
  <img src='{{site_root}}/images/screenshots/supervisor.png' />
</p>


To use this sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: supervisord
```

Configuration variables:

- **url** (*Optional*): The URL to track. Default to `http://localhost:9001/RPC2`.

