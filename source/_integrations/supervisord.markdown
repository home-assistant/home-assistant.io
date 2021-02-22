---
title: Supervisord
description: Instructions on how to integrate Supervisord within Home Assistant.
ha_category:
  - System Monitor
ha_release: '0.20'
ha_iot_class: Local Polling
ha_domain: supervisord
ha_platforms:
  - sensor
---

The `supervisord` platform allows you to track the states of [Supervisord](http://supervisord.org/).

It required that you enable the HTTP feature in the `/etc/supervisord.conf` configuration file.

```text
[inet_http_server]
port=127.0.0.1:9001
```

After a restart of `supervisord` you should be able to access the web interface. If needed then this could be added as an [iFrame panel](/integrations/panel_iframe/).

<p class='img'>
  <img src='/images/screenshots/supervisor.png' />
</p>

To use this sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: supervisord
```

{% configuration %}
url:
  description: The URL to track.
  required: false
  default: "`http://localhost:9001/RPC2`"
  type: string
{% endconfiguration %}
