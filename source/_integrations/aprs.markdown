---
title: APRS
description: Instructions on how to use APRS to track devices in Home Assistant.
ha_release: 0.95
ha_category:
  - Presence detection
ha_iot_class: Cloud Push
ha_codeowners:
  - '@PhilRW'
ha_domain: aprs
ha_platforms:
  - device_tracker
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `aprs` [(Automatic Packet Reporting System)](https://en.wikipedia.org/wiki/Automatic_Packet_Reporting_System) device tracker integration connects to the [APRS-IS](http://aprs-is.net/) network for tracking amateur radio devices.

## Configuration

To enable APRS tracking in Home Assistant, add the following section to {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: aprs
    username: FO0BAR  # or FO0BAR-1 to FO0BAR-15
    callsigns:
      - 'XX0FOO*'
      - 'YY0BAR-1'
```

{% configuration %}
username:
  description: "Your callsign (or callsign-SSID combination). This is used to connect to the host. Note: Do not use the same callsign or callsign-SSID combination as a device you intend to track: the APRS-IS network will not route the packets to Home Assistant. This is a known limitation of APRS packet routing."
  required: true
  type: string
password:
  description: Your APRS password. This will verify the connection.
  required: false
  type: string
  default: -1
callsigns:
  description: A list of callsigns you wish to track. Wildcard `*` is allowed. Any callsigns that match will be added as devices.
  required: true
  type: list
host:
  description: The APRS server to connect to.
  required: false
  type: string
  default: rotate.aprs2.net
timeout:
  description: The number of seconds to wait to connect to the APRS-IS network before giving up.
  required: false
  type: float
  default: 30.0
{% endconfiguration %}

Verified connections are only required to send data to the APRS-IS network, which the `aprs` platform does not yet do.
However, you are free to verify your connection if you know your APRS password.
