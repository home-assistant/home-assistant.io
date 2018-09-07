---
layout: page
title: "Kankun SP3 Wifi Switch"
description: "Instructions for the Kankun SP3 Wifi switch"
date: 2016-12-28 01:50
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Switch
ha_release: 0.36
ha_iot_class: "Local Polling"
---


The `kankun` switch platform allows you to toggle customized Kankun SP3 Wifi switches. Switches are
modified to include the [json.cgi](https://github.com/homedash/kankun-json/blob/master/cgi-bin/json.cgi)
script to provide an HTTP API. Details of the necessary modifications can be found
[here](http://www.homeautomationforgeeks.com/openhab_http.shtml#kankun) (be sure to install the JSON version
of the script as linked above).

To enable it, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
switch:
  platform: kankun
  switches:
    bedroom_heating:
      host: hostname_or_ipaddr
```

Configuration variables:

- **switches** (*Required*): The array that contains all Kankun switches.
  - **identifier** (*Required*): Name of the Kankun switch as slug. Multiple entries are possible.
    - **host** (*Required*): Hostname or IP address of the switch on the local network.
    - **name** (*Optional*): Friendly name of the switch.
    - **port** (*Optional*): HTTP connection port, defaults to 80.
    - **path** (*Optional*): Path of CGI script, defaults to `/cgi-bin/json.cgi`.
    - **username** (*Optional*): Username for basic authentication.
    - **password** (*Optional*): Password for basic authentication.

