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
ha_release: 2026.4
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
ha_quality_scale: gold
---

The **SPAN Panel** {% term integration %} connects Home Assistant to a [SPAN smart electrical panel](https://www.span.io/panel) on your local network. It exposes circuit-level power and energy, panel status, optional battery (BESS) and EV charger (EVSE) sub-devices when those are commissioned on the panel, and controls such as circuit breakers and shed priority where the panel allows it.

Communication uses SPAN’s local *eBus* interface (MQTT on the panel). State updates are delivered as *local push*; a short fallback {% term polling %} interval applies only to a small set of diagnostic-style entities.

{% note %}

This integration operates **real electrical equipment**. Circuit switches open and close physical relays. The **GFE override: grid connected** action changes how the panel manages load shedding during outages. Those effects are the same as using the panel manually. Automations can run without someone present—design them with the same care you would for any unattended electrical control.

The integration is **not** a life-safety device and must not be relied on for life-safety applications. It is provided **as-is**, without warranty or guarantee of fitness for a particular installation. If you cannot accept that risk, do not use it.

SPAN’s client documentation applies to use of the panel API (including by this integration):

> An API client that attempts to implement its own load-shedding decisions, grid-state detection, or other critical automation is operating outside the scope of what SPAN API was designed and engineered for. Such use is entirely at the client developer’s and homeowner’s own risk and may void the SPAN Panel Limited Warranty. See the SPAN API Scope & Responsibility Model in the [SPAN API documentation](https://github.com/spanio/SPAN-API-Client-Docs).

{% endnote %}

## Prerequisites

- SPAN Panel running firmware `spanos2/r202603/05` or later.
- Network path from Home Assistant to the panel (same LAN or routed access as supported by your setup).
- **Authentication:** panel passphrase (from the SPAN app, on-premises settings) **or** physical access for **proof of proximity** (open/close the panel door as prompted).

## Upgrading from the HACS custom integration

The [Span Panel](https://github.com/SpanPanel/span) package is also distributed through HACS. The following applies **only** if you **already** use that **custom** integration and want to move to the **built-in** integration shipped with Home Assistant Core — not for new setups.

Before you change versions or remove the custom component: **create a backup** of your Home Assistant configuration and database; **review** the custom integration’s changelog and this documentation for breaking changes; **review automations and scripts** for references to removed or renamed entities; and plan the switch for a **quiet period** when you can monitor the system afterward.

Treat **custom release 2.0.4** as the required baseline before you switch: it matches the **config entry** and **entity registry** data that core expects, so the move is a **drop-in replacement** once you are on that version.

{% warning %}

If you are **upgrading from** the custom integration: you **must** install and run **Span Panel custom integration version 2.0.4** before you remove `custom_components/span_panel` and rely on the built-in integration. Older custom releases are not aligned with core’s storage contract for this domain.

{% endwarning %}

1. Upgrade to **2.0.4** (for example by HACS) and restart Home Assistant.
2. Confirm the integration is working (**Settings** > **Devices & services** > **SPAN Panel**).
3. Delete the **`custom_components/span_panel`** directory from your configuration, restart Home Assistant, and use a Home Assistant release that includes **SPAN Panel** in core.

While **`custom_components/span_panel`** exists, Home Assistant loads the **custom** code for domain `span_panel`; the built-in integration is not used for those entries.

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

During setup, authenticate using **panel passphrase** or **proof of proximity**. Discovery may offer the panel automatically when zeroconf/Bonjour records are visible to Home Assistant.

{% include integrations/option_flow.md %}

{% configuration_basic %}
Snapshot update interval:
  description: "How often the integration rebuilds a full panel snapshot from MQTT traffic (0–15 seconds). Lower values react faster; higher values reduce CPU use on small hosts. Default is 5 seconds."
Panel Net Energy:
  description: "Create net energy sensors for panel-level energy flows (main meter and feed-through). Shows true energy balance accounting for bidirectional flows. Default: on."
Circuit Net Energy:
  description: "Create net energy sensors for individual circuits. Shows true energy consumption accounting for reactive power and regenerative flows. Default: on."
Unmapped Circuit Sensors:
  description: "Create sensors for unmapped circuit tabs. These provide backing data for panels with circuits that are not assigned to named breakers. Default: off."
Energy Sensor Grace Period:
  description: "How long energy sensors maintain their last known value when the panel becomes unavailable (0–60 minutes). Helps preserve energy statistics integrity during brief outages. Default: 15 minutes."
Auto-Compensate Energy Dips:
  description: "Automatically compensate when the panel reports lower energy readings, preventing spikes in the energy dashboard. Disabling clears all accumulated offsets. Default: off."
{% endconfiguration_basic %}

## Supported functionality

### Overview

- **Sensors:** Panel power and energy, grid/site/PV/battery power where available, DSM/run-config style status, software version, per-circuit power/energy/current, EVSE and BESS entities when present, and additional diagnostic sensors.
- **Binary sensors:** Door tamper, link/status indicators, grid islanding capability where reported, and EVSE-related binary sensors when an EV charger is present.
- **Switches:** User-controllable circuit relays (not exposed for always-on circuits).
- **Select:** Circuit shed priority where supported.
- **Button:** Grid-connected override (MQTT-connected panels only)—see [Known limitations](#known-limitations).
- **Diagnostics:** Download diagnostics from the device page to inspect redacted connection metadata.

A small number of low-level diagnostic sensors (DSM state, vendor cloud status, L1/L2 voltage, upstream L1/L2 current) are **disabled by default** and can be enabled from the device or entity pages. Net energy and unmapped circuit sensors are controlled by the **options flow**.

### Data updates

The panel pushes MQTT state continuously. The integration merges messages into a snapshot and updates entities on a configurable **snapshot update interval** (see options). A **60-second** fallback {% term polling %} interval acts as a safety net in case MQTT delivery stalls.

### Energy dashboard

Use the panel’s **main meter** and **circuit** energy sensors where they match your tariff and wiring. After firmware events, enable **auto-compensate energy dips** (on by default for new setups) or correct historical statistics in **Developer tools** > **Statistics** if you see spikes.

## Key terms

The following terms appear in this documentation and in SPAN entities:

- **Grid Forming Entity (GFE):** The source that provides voltage and frequency reference for the home.
- **Islanded:** The home is electrically disconnected from utility and running on local generation/storage.
- **Microgrid Interconnect Device (MID):** The switch (part of or adjacent to a battery system) that isolates the home from utility during outage operation.
- **Shedding:** Turning off lower-priority circuits to preserve backup runtime.

## Entity reference

### Panel-level sensors

| Sensor | Device class | Unit | Notes |
| --- | --- | --- | --- |
| Current power | Power | W | Total panel power |
| Feed through power | Power | W | Feed-through (non-breaker) power |
| Main meter produced energy | Energy | Wh | Grid-exported energy |
| Main meter consumed energy | Energy | Wh | Grid-imported energy |
| Main meter net energy | Energy | Wh | Consumed minus produced |
| Feed through produced energy | Energy | Wh | Feed-through exported energy |
| Feed through consumed energy | Energy | Wh | Feed-through imported energy |
| Feed through net energy | Energy | Wh | Feed-through net energy |
| DSM state | — | — | `dsm_on_grid`, `dsm_off_grid`, `unknown` |
| Current run config | — | — | `panel_on_grid`, `panel_off_grid`, `panel_backup`, `unknown` |
| Grid Forming Entity | — | — | `GRID`, `BATTERY`, `PV`, `GENERATOR`, `NONE`, `UNKNOWN` |
| Main relay state | — | — | `closed`, `open`, `unknown` |
| Vendor cloud | — | — | `CONNECTED`, `UNCONNECTED`, `UNKNOWN` |
| Software version | — | — | Panel firmware string |

### Panel diagnostic sensors

| Sensor | Device class | Unit | Notes |
| --- | --- | --- | --- |
| L1 voltage | Voltage | V | L1 leg voltage |
| L2 voltage | Voltage | V | L2 leg voltage |
| Upstream L1 current | Current | A | Upstream L1 current |
| Upstream L2 current | Current | A | Upstream L2 current |
| Downstream L1 current | Current | A | Downstream L1 current |
| Downstream L2 current | Current | A | Downstream L2 current |
| Main breaker rating | Current | A | Main breaker amperage |

### Power flow sensors

| Sensor | Device class | Unit | Notes |
| --- | --- | --- | --- |
| Grid power | Power | W | Grid power flow |
| Site power | Power | W | Total site power (`grid + PV + battery`) |
| Battery power | Power | W | Charge/discharge, when BESS is commissioned |
| PV power | Power | W | PV generation, when PV is commissioned |

### PV metadata sensors (main panel device)

| Sensor | Device class | Unit | Notes |
| --- | --- | --- | --- |
| PV vendor | — | — | Inverter vendor |
| PV product | — | — | Inverter product |
| Nameplate capacity | Power | kW | Rated inverter capacity |

### Deprecated sensors

| Sensor | Reason |
| --- | --- |
| DSM grid state | Retained for compatibility; prefer `DSM State` |

### Power sensor attributes

Applies to current power, feed through power, battery power, PV power, grid power, and site power sensors.

| Attribute | Type | Notes |
| --- | --- | --- |
| `voltage` | string | Nominal panel voltage, for example `"240"` |
| `amperage` | string | Calculated current (`power / voltage`) |

### Software version sensor attributes

| Attribute | Type | Notes |
| --- | --- | --- |
| `panel_size` | int | Breaker spaces (for example `32`, `40`) |
| `wifi_ssid` | string | Current Wi-Fi SSID |

### EVSE (EV charger) entities

When a SPAN Drive or other EVSE is commissioned, the integration creates a separate EVSE sub-device linked to the panel by `via_device`. Manufacturer, model, serial number, and software version are provided as device info attributes.

#### EVSE device naming

The EVSE device name includes the panel device-name prefix to avoid collisions in multi-panel installs. A suffix differentiates multiple chargers on one panel:

- **Friendly names mode:** suffix is fed circuit name (for example `Garage`).
- **Circuit numbers mode:** suffix is EVSE serial (for example `SN-EVSE-001`).
- **No suffix available:** no empty parentheses are added.

| Naming mode | Example device name | Example entity ID |
| --- | --- | --- |
| Friendly names | `Main House SPAN Drive (Garage)` | `sensor.main_house_span_drive_garage_charger_status` |
| Circuit numbers | `Main House SPAN Drive (SN-EVSE-001)` | `sensor.main_house_span_drive_sn_evse_001_charger_status` |
| No suffix | `Main House SPAN Drive` | `sensor.main_house_span_drive_charger_status` |

#### EVSE sensors

| Sensor | Device class | Unit | Notes |
| --- | --- | --- | --- |
| Charger status | Enum | — | OCPP-style states such as `AVAILABLE`, `CHARGING` |
| Advertised current | Current | A | Advertised charging current |
| Lock state | Enum | — | `LOCKED`, `UNLOCKED`, `UNKNOWN` |

#### EVSE binary sensors

| Sensor | Device class | Notes |
| --- | --- | --- |
| Charging | Battery charging | On while charger status is charging |
| EV connected | Plug | On for connected/active charging states |

#### EVSE device info attributes

| Attribute | Source |
| --- | --- |
| Manufacturer | `vendor-name` |
| Model | `product-name` |
| Serial number | `serial-number` |
| Software version | `software-version` |

### BESS sub-device

When a battery energy storage system (BESS) is commissioned, the integration creates a separate BESS sub-device linked to the panel by `via_device`.

#### BESS sensors

| Sensor | Device class | Unit | Notes |
| --- | --- | --- | --- |
| Battery level | Battery | % | State of energy |
| Battery power | Power | W | Charge/discharge |
| BESS vendor | — | — | Diagnostic |
| BESS model | — | — | Diagnostic |
| BESS serial number | — | — | Diagnostic |
| BESS firmware | — | — | Diagnostic |
| Nameplate capacity | Energy storage | kWh | Diagnostic |
| Stored energy | Energy storage | kWh | Diagnostic |

#### BESS binary sensors

| Sensor | Device class | Notes |
| --- | --- | --- |
| BESS connected | Connectivity | BESS communication status |

### Panel energy sensor attributes

Applies to main meter and feed through energy sensors.

| Attribute | Type | Notes |
| --- | --- | --- |
| `voltage` | string | Nominal panel voltage |

### Circuit-level sensors

| Sensor | Device class | Unit | Notes |
| --- | --- | --- | --- |
| Power | Power | W | Instantaneous circuit power |
| Produced energy | Energy | Wh | Cumulative produced energy |
| Consumed energy | Energy | Wh | Cumulative consumed energy |
| Net energy | Energy | Wh | Net energy |
| Current | Current | A | Reported when panel publishes `current_a` |
| Breaker rating | Current | A | Diagnostic; when reported |

### Circuit power sensor attributes

| Attribute | Type | Notes |
| --- | --- | --- |
| `tabs` | string | Breaker slot position(s) |
| `voltage` | string | `120` or `240` |
| `always_on` | bool | Whether circuit is always on |
| `relay_state` | string | `OPEN`, `CLOSED`, `UNKNOWN` |
| `relay_requester` | string | Last relay requester |
| `shed_priority` | string | `NEVER`, `SOC_THRESHOLD`, `OFF_GRID`, `UNKNOWN` |
| `is_sheddable` | bool | Whether circuit can be shed |

### Circuit energy sensor attributes

| Attribute | Type | Notes |
| --- | --- | --- |
| `tabs` | string | Breaker slot position(s) |
| `voltage` | string | `120` or `240` |

### Binary sensors

| Sensor | Device class | Notes |
| --- | --- | --- |
| Door state | Tamper | Panel door state |
| Ethernet link | Connectivity | Wired link status |
| Wi-Fi link | Connectivity | Wireless link status |
| Panel status | Connectivity | Panel online/offline status |
| Grid islandable | — | Whether panel reports islanding capability |

### Removed binary sensors

| Sensor | Reason |
| --- | --- |
| Cellular (wwan) | Replaced by `Vendor Cloud` |

### Circuit controls

| Entity | Type | Notes |
| --- | --- | --- |
| Breaker | Switch | Relay control |
| Circuit shed priority | Select | Off-grid shed behavior |

### Circuit shed priority options

| Option key | Display label (EN) | API value |
| --- | --- | --- |
| `never` | Stays on in an outage | `NEVER` |
| `soc_threshold` | Stays on until battery threshold | `SOC_THRESHOLD` |
| `off_grid` | Turns off in an outage | `OFF_GRID` |

### Panel controls

| Entity | Type | Notes |
| --- | --- | --- |
| GFE override: grid connected | Button | Indicates grid return on MQTT-connected panels |

## BESS and grid management

This section explains what panel-side signals can and cannot tell you in off-grid operation when BESS is present.

### Grid Forming Entity

`Grid Forming Entity` indicates which source sets voltage/frequency reference, not which source is delivering the most watts.

| Value | Meaning |
| --- | --- |
| `GRID` | Grid-connected state |
| `BATTERY` | Islanded on battery |
| `PV` | Islanded with PV forming reference (future/conditional) |
| `GENERATOR` | Islanded with generator forming reference (future/conditional) |
| `NONE` | Islanded with no active source |
| `UNKNOWN` | Unknown or fault |

If BESS communication is lost while islanded, this value can become stale.

### What the panel can detect

- **Grid loss:** detectable by panel-side voltage sensing.
- **Grid restoration while islanded:** not detectable from panel-side measurements when MID is open.

Use utility-side confirmation (for example a utility-side current clamp, ATS/MTS contact, or equivalent sensor) for restoration detection.

### DSM state behavior

`DSM State` corroborates multiple panel signals and can improve confidence for some transitions. It still cannot overcome the MID blind spot while islanded: panel-side signals remain home-side only.

### GFE override behavior and risk

The `GFE override: grid connected` button tells the panel to treat grid as returned.

- Wrongly declaring grid return can reduce backup runtime because of unmanaged battery drain.
- The primary risk is lost runtime, not overload; batteries protect themselves at depletion.
- Do **not** automate this from panel-only signals (including `DSM State`) during islanded operation.
- Prefer utility-side confirmation or manual verification.
- When BESS communication recovers, firmware resumes normal GFE handling.

## Configuration options details

### Snapshot update interval

The panel publishes high-frequency MQTT updates. Per-message merge work is inexpensive; rebuilding snapshots and updating entities is the heavier step controlled by this interval.

- **Default:** 5 seconds
- **Range:** 0 to 15 seconds
- **`0`:** no debounce (highest update pressure)
- Increase interval on lower-power systems to reduce CPU load

### Entity naming pattern

Setup offers two naming modes:

1. **Friendly names:** entity IDs use panel circuit names and follow circuit rename updates.
2. **Circuit numbers:** entity IDs are stable against circuit rename changes.

### Energy dip compensation

When enabled, energy dips in cumulative sensors are offset so Home Assistant receives monotonic values.

- **Default for new installs:** enabled
- **Default for existing installs:** disabled
- **Threshold:** 1.0 Wh
- **Disabling:** clears accumulated offsets

When compensation is active, diagnostic attributes can include:

| Attribute | Meaning |
| --- | --- |
| `energy_offset` | Total applied compensation |
| `last_dip_delta` | Most recent dip size |

### Customizing precision

Entity display precision can be changed in Home Assistant entity settings when different decimal precision is preferred.

## Troubleshooting details

### Energy dashboard spikes after firmware events

Firmware events can produce temporary decreases in cumulative energy sensors, which Home Assistant may treat as resets.

Recommended response:

1. Keep **auto-compensate energy dips** enabled.
2. If spikes already exist, adjust affected statistics in **Developer tools** > **Statistics**.
3. Verify affected SPAN energy entities and correct sums where required.

### High CPU usage

If CPU usage is elevated:

- Increase **snapshot update interval**.
- Avoid `0` unless you explicitly need no debounce and accept added load.

### Common issues

1. **Door sensor unavailable:** API may report unknown until door activity occurs.
2. **No circuit switch:** always-on circuits do not expose relay control by API design.

## Actions

### Action `span_panel.export_circuit_manifest`

Returns a structured manifest of configured circuits (for dashboards, blueprints, or external tooling). The action supports **response only** (no fields).

**Response (conceptual):** an object with a `panels` list; each panel includes `serial`, `host`, and `circuits` with entries such as `entity_id`, `template`, `device_type`, and `tabs` (breaker positions).

Call it from **Developer tools** > **Actions** or from automations/scripts that use [`action`](/docs/scripts/service-calls/) with `response_variable`.

## WebSocket API (advanced)

The integration registers **`span_panel/panel_topology`**. It accepts the Home Assistant **device ID** for the **main SPAN panel device** and returns panel metadata, circuits (including tab positions and mapped entity roles), and linked sub-devices (BESS, EVSE). Intended for custom front ends (for example panel layout cards) that would otherwise infer relationships from entity naming.

Callers must be **admin-authorized** Home Assistant WebSocket clients. Passing a BESS or EVSE sub-device ID is rejected; use the panel device ID instead. Errors include unauthorized caller, unknown device, device not associated with SPAN Panel, or config entry not loaded.

## Known limitations

- **Grid restoration while islanded:** With the utility-side disconnect (for example the microgrid interconnect) open, the panel sits on the home side of the gap—it **cannot** detect utility grid restoration. That limitation is physical, not a software gap. Use a **utility-side** sensor in Home Assistant (for example a grid-side current clamp, ATS/MTS contact, or similar), or **manual** confirmation, before acting on grid return.
- **GFE override (`GFE override: grid connected`):** Telling the panel to shed load (the conservative direction) is comparatively low risk; wrongly telling it the grid is back when it is not can increase unmanaged battery drain and shorten backup runtime. The battery protects itself when depleted; the main risk is lost runtime, not overload. **Do not** automate this button from panel **`DSM State`** (or similar panel-only signals)—they share the same blind spot while islanded and can remain off-grid even after the utility returns. Use a utility-side sensor or manual verification first. When BESS communication is restored, the panel’s normal GFE handling resumes and a manual undo of the override is usually unnecessary.
- **BESS and stale GFE:** If a battery system is installed and BESS communication is lost while the panel is islanded, **Grid Forming Entity** can stay stale (for example showing battery when the grid has actually returned), which can prolong unnecessary shedding. The panel can still detect **grid loss** on its own; **grid return while islanded** remains undetectable from panel-side data alone.
- **Always-on circuits** do not expose a switch (API restriction).
- **Door** state may show unavailable until the door has been operated (SPAN API may report unknown until then). The entity is a tamper-style indicator, not a general entry-door sensor.
- **Regional availability:** SPAN hardware and services are subject to manufacturer distribution; not all regions have the same SKUs or support.

## Troubleshooting

- **Cannot connect / auth failed:** Verify firmware version, host/port, passphrase or proximity flow, and that nothing blocks MQTT or HTTP to the panel.
- **High CPU:** Increase **Snapshot update interval** in integration options (for example 10–15 seconds on a Raspberry Pi). Avoid `0` unless you understand the load.
- **Energy dashboard spikes after updates:** Keep **auto-compensate energy dips** enabled, or adjust affected statistics under **Developer tools** > **Statistics**. The integration may surface a notification when a dip is detected on affected cumulative energy sensors.

## Removing the integration

1. Go to **{% my integrations icon title="Settings > Devices & services" %}**.
2. Open **SPAN Panel** and select the config entry.
3. Use **Delete** / **Remove** and confirm.

Removing the entry removes its devices and entities from the registries according to Home Assistant’s normal config entry lifecycle.

## Examples

Send a notification when panel power is high (replace the entity ID with yours):

```yaml
automation:
  - alias: "Notify when SPAN panel load is high"
    triggers:
      - trigger: numeric_state
        entity_id: sensor.span_panel_current_power
        above: 15000
    actions:
      - action: notify.persistent_notification
        data:
          title: "High panel load"
          message: "Panel power is above 15 kW."
```

## See also

- [home-assistant/core](https://github.com/home-assistant/core) — source and issue tracker for the built-in integration (`homeassistant/components/span_panel/`)
- [span-card](https://github.com/SpanPanel/span-card) (optional Lovelace card)
- [SPAN Panel Simulator](https://github.com/SpanPanel/simulator) (optional test and modeling environment for understanding panel behavior without hardware)
