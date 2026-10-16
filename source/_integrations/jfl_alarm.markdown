---
title: JFL Alarm
description: Instructions on how to integrate JFL Active-series alarm panels with Home Assistant.
ha_category:
  - Alarm
ha_release: 2026.9
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@jmceara'
ha_domain: jfl_alarm
ha_platforms:
  - alarm_control_panel
ha_integration_type: hub
ha_quality_scale: bronze
---

The **JFL Alarm** {% term integration %} connects [JFL](https://www.jfl.com.br) Active-series alarm panels, a line of security panels sold in Brazil, to Home Assistant.

{% important %}
JFL panels **dial out** to a monitoring destination rather than being polled or queried, which is the reverse of how most Home Assistant integrations reach a device. This integration runs a listener instead of a client: Home Assistant waits on a TCP port, and the panel is programmed to report to it. See [Prerequisites](#prerequisites) below.
{% endimportant %}

## Supported devices

- Active 32 Duo (verified against real hardware)

Other Active-series panels described in JFL's own protocol documentation are implemented but have not been verified against real hardware. If such a panel connects and something does not work as expected, please open an issue naming the model.

## Prerequisites

The panel has to be programmed to report to Home Assistant before the integration can see it:

1. In the panel's own programming (via its keypad or JFL's configuration software), set a **free** reporting destination to the IP address of the machine running Home Assistant and a TCP port of your choosing.
2. If the panel already reports to a monitoring company, use a different slot for Home Assistant and enable dual reporting so the existing connection keeps working.
3. Make sure the chosen port is reachable from the panel. Keeping the panel on the same local network as Home Assistant is strongly recommended. If the panel is at another location, connect the two networks with a VPN rather than forwarding the port on your router: the listener is unauthenticated, so exposing it directly to the internet is not safe.

Nothing else needs to be prepared: model, partitions, and everything about the panel's configuration is detected automatically once it connects.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Listening address:
    description: "The network address to listen on. Leave `0.0.0.0` to listen on every network interface; a specific address is only needed on a machine with several networks."
Listening port:
    description: "The TCP port to listen on. It must match the reporting destination programmed into the panel."
{% endconfiguration_basic %}

After the listener is set up, panels that report to it appear automatically. Each one is added as its own sub-entry:

{% configuration_basic %}
Panel serial number:
    description: "The ten-character serial the panel itself reports. Panels that have already connected are added on their own, so this is only needed for one that is not powered up yet."
Code to arm and disarm (optional):
    description: "A code Home Assistant asks for before arming or disarming. This is a Home Assistant-side code, not a panel user code — it is never sent to the panel, because the command path this integration uses carries no password at all. Leave it empty for no code."
Also ask for the code when arming:
    description: "By default the code is only asked for when disarming. Turn this on to also require it when arming."
Read-only mode:
    description: "While on, the integration does not send arm or disarm commands to the panel; it only observes. It still requests status updates, because the panel only reports its state when asked."
{% endconfiguration_basic %}

## Supported functionality

This integration provides one {% term entity %} per partition:

### Alarm Control Panel

An {% term entity %} for each partition programmed on the panel, supporting arm home, arm away, and disarm. State is read from the panel's own status reports; nothing is assumed or optimistically set ahead of the panel confirming it.

A partition that has not been named in the panel's own programming is labeled by its number; the integration reads real zone and partition names directly from the panel and uses them once they are available.

## Data updates

The panel only reports its status when asked, so the integration {% term polling polls %} it for a status frame every 30 seconds. This interval is fixed and not configurable. Anything the panel reports on its own — a new connection, an event, a partition changing state — arrives immediately, independent of that poll.

## Known limitations

- Only the **Active 32 Duo** has been verified against real hardware. Other Active-series models are implemented from JFL's own protocol documentation but are otherwise unverified — see [Supported devices](#supported-devices).
- Arming and disarming use a command path that carries no password, by design — see the note on the optional code above. There is no authenticated command path in this integration.
- This integration currently provides the alarm panel itself. Additional entities are expected in future releases.

## Troubleshooting

### No panel appears after setup

#### Symptom: the integration is set up, but no device or entity is created

#### Description

Because the panel dials out rather than being connected to, nothing at all happens until it reports in. A panel that was never programmed to report to Home Assistant produces no error and no device — the integration simply waits.

#### Resolution

1. Double-check the panel's own programming: the reporting destination IP and port must exactly match what this integration is listening on.
2. If the panel already reports to a monitoring company, make sure dual reporting is enabled so both destinations are active — the new one should not replace the existing one.
3. If the panel is on a different network or behind a firewall, make sure the port is reachable from it.
4. Enable debug logging for the integration. Every frame the panel sends is logged there, so a panel that is connecting but not being understood looks different from one that never connects at all.

### Arming or disarming does nothing

#### Symptom: the alarm entity reports an error when armed or disarmed

#### Description

A panel is added in read-only mode, so that a new installation observes before it controls anything.

#### Resolution

Open the panel's own settings from the integration page and turn **Read-only mode** off.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

The panel itself keeps reporting to the address and port it was programmed with until that programming is changed. If Home Assistant's listener is removed or moved, update the panel's own reporting destination to match, or clear it if it is no longer wanted.
