---
title: Supervisord
description: Instructions on how to integrate Supervisord within Home Assistant.
ha_category:
  - System monitor
ha_release: '0.20'
ha_iot_class: Local Polling
ha_domain: supervisord
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `supervisord` {% term integration %} allows you to track the states of [Supervisord](http://supervisord.org/).

It required that you enable the HTTP feature in the `/etc/supervisord.conf` configuration file.

```text
[inet_http_server]
port=127.0.0.1:9001
```

After a restart of `supervisord` you should be able to access the web interface. If needed then this could be added as an [webpage dashboard](/dashboards/dashboards/#webpage-dashboard).

<p class='img'>
  <img src='/images/screenshots/supervisor.png' />
</p>

To use this {% term integration %} in your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

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
