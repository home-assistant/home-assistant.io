---
title: SPAN Panel
description: Instructions on how to integrate SPAN smart electrical panels with Home Assistant.
ha_category:
  - Binary sensor
  - Button
  - Diagnostics
  - Energy
  - Select
  - Sensor
  - Switch
ha_release: 2026.5
ha_iot_class: Local Push
ha_config_flow: true
ha_zeroconf: true
ha_domain: span_panel
ha_codeowners:
  - '@cayossarian'
ha_platforms:
  - binary_sensor
  - button
  - diagnostics
  - select
  - sensor
  - switch
ha_integration_type: device
---

The **SPAN Panel** {% term integration %} connects Home Assistant to a [SPAN smart electrical panel](https://www.span.io/panel) on your local network. It exposes circuit-level power and energy, panel status, optional battery (BESS) and EV charger (EVSE) sub-devices when those are commissioned on the panel, and controls such as circuit breakers and shed priority where the panel allows it.

Communication uses SPAN’s local **eBus** interface (MQTT on the panel). State updates are delivered as **local push**; a short fallback {% term polling %} interval applies only to a small set of diagnostic-style entities.

{% note %}

This integration operates **real electrical equipment** (relays, shedding, grid-forming override). Automations can run without someone present—design them with the same care as manual panel operation. The integration is **not** a life-safety device. SPAN’s API documentation describes scope and responsibility for client automation; follow manufacturer guidance.

{% endnote %}

## Prerequisites

- SPAN Panel running firmware **spanos2/r202603/05** or later (v2 API).
- Network path from Home Assistant to the panel (same LAN or routed access as supported by your setup).
- **Authentication:** panel passphrase (from the SPAN app, on-premise settings) **or** physical access for **proof of proximity** (open/close the panel door as prompted).

Do **not** upgrade from legacy v1 firmware directly without following SPAN’s published upgrade path. Panels on unsupported firmware cannot complete setup.

## Moving from the custom integration

If you previously used the **Span Panel** custom integration (for example via HACS):

1. Upgrade the custom integration to the **current 2.0.x** release so your config entry and entity `unique_id` values match what core expects.
2. **Remove** the custom integration from `custom_components` (and restart Home Assistant) so the built-in **SPAN Panel** integration can load for domain `span_panel`.
3. While the custom package is present, Home Assistant loads **custom** code for that domain; the built-in integration is not used for those entries.

Unsupported: jumping from very old custom releases without upgrading first—upgrade the custom package, then switch to core.

## Firmware

SPAN ships panel firmware; **Home Assistant does not update SPAN firmware** through this integration.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "IP address or hostname of the SPAN Panel on your network."
HTTP port:
  description: "HTTP port for the panel API (default 80), if you changed it from the panel."
Power display precision:
  description: "Number of decimal places shown for power sensors (0–3)."
Energy display precision:
  description: "Number of decimal places shown for energy sensors (0–3)."
Auto-compensate energy dips:
  description: "When the panel reports a decrease in cumulative energy (for example after a firmware event), apply an offset so statistics stay monotonic and the energy dashboard avoids spurious spikes."
{% endconfiguration_basic %}

During setup you will choose **v2 authentication** (passphrase or proximity). Discovery may offer the panel automatically when zeroconf/Bonjour records are visible to Home Assistant.

{% include integrations/option_flow.md %}

{% configuration_basic %}
Snapshot update interval:
  description: "How often the integration rebuilds a full panel snapshot from MQTT traffic (0–15 seconds). Lower values react faster; higher values reduce CPU use on small hosts. Default is 1 second."
{% endconfiguration_basic %}

## Supported functionality

### Overview

- **Sensors:** Panel power and energy, grid/site/PV/battery power where available, DSM/run-config style status, software version, per-circuit power/energy/current, EVSE and BESS entities when present, and additional diagnostic sensors on v2.
- **Binary sensors:** Door tamper, link/status indicators, grid islanding capability where reported, and EVSE-related binary sensors when an EV charger is present.
- **Switches:** User-controllable circuit relays (not exposed for always-on circuits).
- **Select:** Circuit shed priority where supported (v2).
- **Button:** Grid-connected override (v2, MQTT-connected panels only)—see [Known limitations](#known-limitations).
- **Diagnostics:** Download diagnostics from the device page to inspect redacted connection metadata.

Many high-cardinality or supplementary sensors are **disabled by default**; enable them in the entity registry if needed.

### Data updates

The panel pushes MQTT state continuously. The integration merges messages into a snapshot and updates entities on a configurable **snapshot update interval** (see options). A **60 second** {% term polling %} interval may apply to specific disabled-by-default diagnostic entities.

### Energy dashboard

Use the panel’s **main meter** and **circuit** energy sensors where they match your tariff and wiring. After firmware events, enable **auto-compensate energy dips** (on by default for new setups) or correct historical statistics via **Developer tools** → **Statistics** if you see spikes.

## Actions

### Action `span_panel.export_circuit_manifest`

Returns a structured manifest of configured circuits (for dashboards, blueprints, or external tooling). The action supports **response only** (no fields).

**Response (conceptual):** an object with a `panels` list; each panel includes `serial`, `host`, and `circuits` with entries such as `entity_id`, `template`, `device_type`, and `tabs` (breaker positions).

Call it from **Developer tools** → **Actions** or from automations/scripts that use [`action`](/docs/scripts/service-calls/) with `response_variable`.

## WebSocket API (advanced)

The integration registers **`span_panel/panel_topology`**. It accepts a Home Assistant **device ID** for the SPAN panel device and returns panel metadata, circuits (including tab positions and mapped entity roles), and linked sub-devices (BESS, EVSE). Intended for custom front ends (for example panel layout cards) that would otherwise infer relationships from entity naming.

Callers must be **authorized** Home Assistant WebSocket clients (for example the logged-in frontend). Errors include unknown device, device not associated with SPAN Panel, or config entry not loaded.

## Known limitations

- **Grid restoration while islanded:** With the utility-side disconnect open, the panel cannot see the utility grid. **Do not** automate the **GFE override: grid connected** button from panel-only `DSM State`—confirm grid return with a utility-side sensor or manual verification. See SPAN and project documentation for BESS/MID behavior.
- **Always-on circuits** do not expose a switch (API restriction).
- **Door** state may show unavailable until the door has been operated (panel API behavior).
- **Regional availability:** SPAN hardware and services are subject to manufacturer distribution; not all regions have the same SKUs or support.

## Troubleshooting

- **Cannot connect / auth failed:** Verify firmware version, host/port, passphrase or proximity flow, and that nothing blocks MQTT or HTTP to the panel.
- **High CPU:** Increase **Snapshot update interval** in integration options (for example 10–15 seconds on a Raspberry Pi). Avoid `0` unless you understand the load.
- **Energy dashboard spikes after updates:** Keep **auto-compensate energy dips** enabled, or adjust affected statistics under **Developer tools** → **Statistics**.

## Removing the integration

1. Go to **{% my integrations icon title="Settings > Devices & services" %}**.
2. Open **SPAN Panel** and select the config entry.
3. Use **Delete** / **Remove** and confirm.

Removing the entry removes its devices and entities from the registries according to Home Assistant’s normal config entry lifecycle.

## Example

Monitor total panel power for a notification (replace the entity ID with yours):

```yaml
template:
  - trigger:
      - platform: numeric_state
        entity_id: sensor.span_panel_current_power
        above: 15000
    action:
      - service: notify.persistent_notification
        data:
          title: "High panel load"
          message: "Panel power is above 15 kW."
```

## See also

- [SpanPanel organization](https://github.com/SpanPanel) (integration source and issue tracker)
- [span-card](https://github.com/SpanPanel/span-card) (optional Lovelace card)
- [SPAN Panel Simulator](https://github.com/SpanPanel/simulator) (optional eBus-level test environment for contributors)
