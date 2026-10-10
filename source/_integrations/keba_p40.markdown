---
title: KEBA P40
description: Instructions on how to integrate KEBA P40 and P40 Pro wallboxes into Home Assistant.
ha_category:
  - Car
ha_release: 2026.7
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@lpostiglione'
ha_domain: keba_p40
ha_platforms:
  - sensor
ha_integration_type: device
ha_quality_scale: bronze
---

The **KEBA P40** {% term integration %} connects Home Assistant to [KEBA](https://www.keba.com/) P40 and P40 Pro wallboxes over their local REST API.

## Supported devices

This integration supports the following KEBA wallboxes:

- KEBA P40
- KEBA P40 Pro

## Prerequisites

Before adding the wallbox to Home Assistant, make sure the following conditions are met:

- The local REST API must be enabled on the wallbox. Refer to the KEBA documentation or wallbox web interface to activate it.
- You need the **admin** user password for the wallbox. This is configured during initial setup or via the KEBA installation portal.
- The wallbox must be reachable from the Home Assistant host on **port 8443** (HTTPS). Both devices must be on the same local network.
- The wallbox uses a **self-signed TLS certificate**. This is expected behavior; the integration accepts it automatically. Because certificate validation is therefore bypassed, keep the wallbox on a trusted local network and do not expose its REST API port to the internet.

{% include integrations/config_flow.md %}

## Configuration parameters

{% configuration_basic %}
Host:
  description: >
    The hostname or IP address of your KEBA P40 wallbox on the local network.
    Example: `192.168.1.100` or `keba-wallbox.local`.
Port:
  description: >
    The HTTPS port used by the wallbox's local REST API. The default is `8443`
    and should only be changed if your network configuration differs.
Password:
  description: >
    The password for the wallbox's `admin` user. This is set during the initial
    wallbox installation.
{% endconfiguration_basic %}

## Supported functionality

### Entities

#### Sensors

| Name | Unit | Notes |
|---|---|---|
| Status | — | Enum: `charging`, `idle`, `ready_for_charging`, and others |
| Power | W | Current charging power |
| Energy | kWh | Energy delivered in the current or last session |
| Current offered | A | The current the wallbox is offering to the vehicle |
| Temperature | °C | Internal wallbox temperature (diagnostic) |
| Power factor | % | Diagnostic; disabled by default |
| Maximum current | A | Diagnostic; disabled by default |
| Error code | — | Diagnostic; disabled by default |
| Voltage L1 / L2 / L3 | V | Per-phase voltage; disabled by default |
| Current L1 / L2 / L3 | A | Per-phase current; disabled by default |

Several diagnostic sensors are **disabled by default**. They can be enabled from the entity settings in Home Assistant when needed.

## Data updates

The integration polls the wallbox's local REST API every **30 seconds**. All entity states are refreshed on each poll cycle. There is no push or event-based update mechanism; changes made externally (for example, via the KEBA app) will be reflected within the next polling interval.

## Known limitations

- Each wallbox requires its own config entry. It is not possible to manage multiple wallboxes under a single entry.
- The integration currently provides monitoring only. Control features (starting/stopping charging, adjusting the charging current, and locking the socket) are planned as follow-up additions.

## Troubleshooting

**The integration reports a TLS/certificate error.**
The KEBA P40 uses a self-signed certificate. This is expected and the integration is designed to accept it. If you are seeing certificate errors, ensure you are running a supported version of the integration and that the wallbox firmware has not changed the certificate unexpectedly.

**Setup fails with an authentication error.**
Verify that you are using the correct password for the `admin` user. The admin password is set during wallbox installation and can be reset via the KEBA installation portal.

**Entities are unavailable after setup.**
Confirm that the wallbox is reachable from the Home Assistant host on port 8443. Both devices must be on the same local network. A firewall, VLAN separation, or incorrect IP address will prevent polling from succeeding.

**State updates are delayed.**
The integration polls every 30 seconds. If a state change was made externally (via the KEBA app or web interface), it will appear in Home Assistant within one polling cycle.

{% include integrations/remove_device_service.md %}
