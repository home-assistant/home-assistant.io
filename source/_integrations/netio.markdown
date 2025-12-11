---
title: Netio
description: Instructions on how to integrate Netio switches into Home Assistant.
ha_category:
  - Switch
ha_iot_class: Local Polling
ha_release: 0.24
ha_domain: netio
ha_platforms:
  - switch
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `netio` switch {% term integration %} allows you to control your [Netio](https://www.netio-products.com/en/overview/) Netio4, Netio4 All, and Netio 230B. These are smart outlets controllable through Ethernet and/or Wi-Fi that reports consumptions (Netio4all). This integration requires Telnet to be enabled on the Netio device.

To use Netio devices in your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

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

{% configuration %}
host:
  description: "The IP address of your Netio plug, e.g., `http://192.168.1.32`."
  required: true
  type: string
port:
  description: The port to communicate with the switch.
  required: true
  default: 1234
  type: integer
username:
  description: The username for your plug.
  required: true
  default: admin
  type: string
password:
  description: The password for your plug.
  required: true
  type: string
outlets:
  description: "List of all outlets. Consisting of a number and a name [No.]: [Name]."
  required: false
  type: list
{% endconfiguration %}

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
