---
title: Kankun
description: Instructions for the Kankun SP3 Wifi switch
ha_category:
  - Switch
ha_release: 0.36
ha_iot_class: Local Polling
ha_domain: kankun
ha_platforms:
  - switch
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `kankun` switch {% term integration %} allows you to toggle customized Kankun SP3 Wi-Fi switches. Switches are
modified to include the [json.cgi](https://github.com/homedash/kankun-json/blob/master/cgi-bin/json.cgi)
script to provide an HTTP API.
Details of the necessary modifications were provided on the now dead HomeAutomationForGeeks site,
but fortunately we can still access the information via
[archive.org link](https://web.archive.org/web/20170628063659/http://www.homeautomationforgeeks.com/openhab_http.shtml)
(be sure to install the JSON version of the script as linked above).

## Configuration

To enable it, add the following lines to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
switch:
  platform: kankun
  switches:
    bedroom_heating:
      host: hostname_or_ipaddr
```

{% configuration %}
switches:
  description: The array that contains all Kankun switches.
  required: true
  type: map
  keys:
    identifier:
      description: Name of the Kankun switch as slug. Multiple entries are possible.
      required: true
      type: map
      keys:
        host:
          description: Hostname or IP address of the switch on the local network.
          required: true
          type: string
        name:
          description: Friendly name of the switch.
          required: false
          type: string
        port:
          description: HTTP connection port.
          required: false
          default: 80
          type: integer
        path:
          description: Path of CGI script.
          required: false
          default: "/cgi-bin/json.cgi"
          type: string
        username:
          description: Username for basic authentication.
          required: false
          type: string
        password:
          description: Password for basic authentication.
          required: false
          type: string
{% endconfiguration %}
