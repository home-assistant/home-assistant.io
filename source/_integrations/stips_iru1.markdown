---
title: "STIPS IR Remote"
description: "Control AC units through STIPS IRU1 over your local network."
ha_category:
  - Climate
ha_iot_class: "Local Push"
ha_domain: "stips_iru1"
ha_platforms:
  - climate
ha_config_flow: true
ha_release: "2026.4"
---

## STIPS IR Remote

The **STIPS IR Remote** integration lets Home Assistant control supported air conditioners through a **STIPS IRU1** device.

During setup, Home Assistant signs in to your STIPS account to download your IR catalog, including areas, devices, and remotes. After setup, climate commands are sent locally on your LAN to the IRU1 device.

## Prerequisites

- A STIPS account with access to your IR catalog.
- At least one STIPS IRU1 device linked to your account.
- The IRU1 device and Home Assistant must be on the same local network.
- The IRU1 device should be online and reachable by hostname on your LAN.

## Configuration

1. In Home Assistant, go to **Settings** > **Devices & services**.
2. Select **Add Integration**.
3. Search for **STIPS IR Remote**.
4. Enter:
   - API host
   - Username
   - Password
5. Finish setup.

If setup succeeds, Home Assistant imports supported climate remotes from your STIPS catalog.

## Supported functionality

Climate platform support for:

- Protocol AC remotes
- Learned AC remotes
- HVAC mode control
- Target temperature control
- Fan mode control
- Swing mode control, where supported by the remote model
- Turn on and turn off

## Notes

- Internet access is required during setup to fetch catalog data.
- Normal climate command dispatch is local over LAN after setup.
- If the device hostname cannot be resolved, ensure the IRU1 is online and reachable on your network, then reload or reconfigure the integration.

## Limitations

- This initial version supports climate entities only.
- Non-climate remote features are planned for a follow-up release.

## Troubleshooting

If entities appear unavailable or commands fail:

1. Confirm the IRU1 is powered on and connected to your LAN.
2. Confirm Home Assistant can resolve and reach the device hostname.
3. From **Devices & services**, open STIPS IR Remote integration and reload the integration from (three-dots menu).
4. Reconfigure the integration if catalog data has changed.
