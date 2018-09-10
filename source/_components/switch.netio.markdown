---
layout: page
title: "Netio Switch"
description: "Instructions on how to integrate Netio switches into Home Assistant."
date: 2016-09-02 19:00
sidebar: true
comments: false
sharing: true
footer: true
logo: netio.png
ha_category: Switch
ha_iot_class: "Local Polling"
ha_release: 0.24
---


The `netio` switch platform allows you to control your [Netio](http://www.netio-products.com/en/overview/) Netio4, Netio4 All, and Netio 230B. These are smart outlets controllable through Ethernet and/or WiFi that reports consumptions (Netio4all).

To use Netio devices in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: netio
    host: 192.168.1.43
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
    outlets:
      1: Free
      2: TV
      4: Lamp
```

Configuration variables:

- **host** (*Required*): The IP address of your Netio plug, eg. `http://192.168.1.32`.
- **port** (*Optional*): The port to communicate with the switch. Defaults to `1234`.
- **username** (*Required*): The username for your plug.
- **password** (*Required*): The password for your plug.
- **outlets** (*Required*) array: List of all outlets.
  - **[No.]: [Name]** (*Required*): Identification of an outlet.

To get pushed updates from the Netio devices, one can add this Lua code in the device interface as an action triggered on "Netio" "System variables updated" with an 'Always' schedule:


```lua
-- this will send socket and consumption status updates via CGI
-- to given address. Associate with 'System variables update' event
-- to get consumption updates when they show up

local address='ha:8123'
local path = '/api/netio/<host>'


local output = {}
for i = 1, 4 do for _, what in pairs({'state', 'consumption',
                        'cumulatedConsumption', 'consumptionStart'}) do
    local varname = string.format('output%d_%s', i, what)
    table.insert(output,
        varname..'='..tostring(devices.system[varname]):gsub(" ","|"))
end end

local qs = table.concat(output, '&')
local url = string.format('http://%s%s?%s', address, path, qs)
devices.system.CustomCGI{url=url}
```

