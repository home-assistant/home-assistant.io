---
title: Teltonika
description: Instructions on how to integrate Teltonika routers with Home Assistant.
ha_release: 2026.3
ha_iot_class: Local Polling
ha_codeowners:
  - '@karlbeecken'
ha_domain: teltonika
ha_integration_type: device
ha_dhcp: true
ha_config_flow: true
ha_quality_scale: silver
ha_category:
  - Sensor
ha_platforms:
  - sensor
related:
  - url: https://teltonika-networks.com/
    title: Teltonika Networks
  - url: https://wiki.teltonika-networks.com/
    title: Teltonika Networks Wiki
---

The **Teltonika** {% term integration %} integrates [Teltonika Networks](https://teltonika-networks.com/) routers with Home Assistant, allowing you to monitor cellular signal quality, modem temperature, and network connectivity.

## Supported devices

Most Teltonika routers running RutOS are supported, including:

- RUT series (RUT240, RUT950, RUT955, etc.)
- RUTX series (RUTX08, RUTX09, RUTX11, RUTX50, etc.)
- TRB series (TRB140, TRB245, TRB500, etc.)

## Prerequisites

You need the IP address and login credentials for your router's web interface.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "The IP address or hostname of your router. The integration will try both HTTPS and HTTP."
Username:
  description: "Username for the router's web interface."
Password:
  description: "Password for the router's web interface."
Validate SSL certificate:
  description: "Enable SSL certificate validation. Leave disabled for self-signed certificates."
{% endconfiguration_basic %}

## Automatic discovery

Teltonika routers are automatically discovered via DHCP.

## Sensors

The integration creates the following sensors for each cellular modem:

- **RSSI** - Signal strength in dBm
- **RSRP** - Reference signal power in dBm (LTE/5G)
- **RSRQ** - Reference signal quality in dB (LTE/5G)
- **SINR** - Signal to interference ratio in dB
- **Temperature** - Modem temperature in °C
- **Operator** - Mobile network operator name
- **Connection type** - Network technology (2G/3G/4G/5G)

Signal sensors include additional attributes like frequency band and modem state.

## Data updates

Data is polled from the router every 30 seconds.

## Examples

### Signal monitoring card

```yaml
type: entities
title: Cellular Signal Quality
entities:
  - entity: sensor.modem_2_1_rssi
    name: Signal Strength (RSSI)
  - entity: sensor.modem_2_1_rsrp
    name: Reference Power (RSRP)
  - entity: sensor.modem_2_1_rsrq
    name: Signal Quality (RSRQ)
  - entity: sensor.modem_2_1_sinr
    name: Signal/Noise Ratio (SINR)
  - entity: sensor.modem_2_1_temperature
    name: Modem Temperature
  - entity: sensor.modem_2_1_operator
    name: Network Operator
  - entity: sensor.modem_2_1_connection_type
    name: Connection Type
```

## Known limitations

- Only cellular modem monitoring is supported
- No SMS sending or router configuration
- Data usage statistics are not available

## Troubleshooting

### Connection issues

Verify the router is reachable on your network and the web interface is accessible. Check that you're using the correct IP address and credentials.

### Sensors unavailable

Ensure a SIM card is inserted and the modem has an active cellular connection. Check the modem status in the router's web interface under **Network > Mobile**.

## Removing the integration

{% include integrations/remove_device_service.md %}
