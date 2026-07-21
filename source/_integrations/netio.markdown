---
title: Netio
description: Instructions on how to integrate Netio smart power sockets into Home Assistant.
ha_category:
  - Switch
ha_iot_class: Local Polling
ha_release: 0.24
ha_domain: netio
ha_platforms:
  - switch
ha_integration_type: device
ha_codeowners:
  - '@agners'
ha_config_flow: true
ha_quality_scale: bronze
related:
  - docs: /docs/configuration/
    title: Configuration file
---

The **Netio** {% term integration %} allows you to control and monitor [NETIO](https://www.netio-products.com/en/) smart power sockets, power strips, and PDUs. The device outputs are exposed as {% term switch %} entities in Home Assistant.

The integration communicates with the device locally using the JSON version of the NETIO M2M API, which is available on all current NETIO devices (such as PowerCable, PowerBox, PowerPDU, and PowerDIN) as well as on the older Netio4 family.

## Prerequisites

The JSON M2M API must be enabled on the device before setting up the integration:

1. Open the web interface of your NETIO device.
2. Go to **Settings** > **M2M API Protocols** > **JSON API**.
3. Enable the JSON API and create an account with **read-write** access.
4. Take note of the username and password of this account; they are required when setting up the integration. Note that these credentials are separate from the credentials used to sign in to the web interface.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: The hostname or IP address of your NETIO device.
Port:
  description: The port of the JSON API web server on the device.
Username:
  description: The username of the device account with read-write access to the JSON API.
Password:
  description: The password of the device account.
Uses an SSL certificate:
  description: Connect to the device using HTTPS.
Verify SSL certificate:
  description: Verify the SSL certificate of the device when using HTTPS.
{% endconfiguration_basic %}

## Provided entities

The integration provides a switch entity for every output of the device, allowing you to switch the output on and off. The entities are named after the output names configured on the device.

## Data updates

The integration polls the device every 30 seconds.

## Remove the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

The JSON API account can afterwards be removed from the device web interface.

## Legacy YAML configuration (deprecated)

The previous version of this integration used the Telnet-based (KSHELL) M2M API and was configured through YAML. This configuration method is deprecated and will be removed in Home Assistant 2027.2.0. Set up the integration through the UI as described above instead.

Note that the older Koukaam NETIO-230x devices do not provide the JSON API and are only supported through the deprecated YAML configuration.

{% details "Deprecated YAML configuration" %}

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

{% enddetails %}
