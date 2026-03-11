---
title: HiVi Speaker
description: Instructions on how to integrate HiVi Multi-Room speakers into Home Assistant.
ha_category:
  - Media player
  - Switch
ha_release: "2025.4"
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@swansmart'
ha_domain: hivi_speaker
ha_platforms:
  - media_player
  - switch
ha_integration_type: hub
---

The **HiVi Speaker** {% term integration %} allows you to control [HiVi](https://www.hivi.com) Multi-Room speakers from Home Assistant. It discovers HiVi speakers on your local network and creates [media player](/integrations/media_player/) entities for playback control, plus [switch](/integrations/switch/) entities to manage multi-room synchronization (master–slave groups).

The integration automatically discovers compatible HiVi Multi-Room devices on your local network and controls them directly over your home network. Media browsing can use local media and [DLNA Digital Media Server](/integrations/dlna_dms/) content when that integration is configured.

There is support for the following platform types within Home Assistant:

- [Media player](#media-player)
- [Switch](#switch)

## Prerequisites

- HiVi speakers must be powered on and connected to the same local network as Home Assistant.
- Speakers must support Multi-Room functionality (see [Supported devices](#supported-devices)).

{% include integrations/config_flow.md %}

Setup is single-instance: you add the integration once. The integration then scans the network for HiVi Multi-Room speakers and creates entities as devices are discovered.

## Options

From the integration’s **Options** you can trigger a **Refresh discovery** to scan again for speakers. Newly discovered devices will be added automatically.

## Media player

Each discovered HiVi speaker is represented by a [media player](/integrations/media_player/) entity. You can:

- **Play / Pause** — Control playback on that speaker.
- **Volume** — Adjust volume and mute.
- **Media source** — Choose media from local sources or from a configured [DLNA DMS](/integrations/dlna_dms/) (when available).
- **Browse media** — Use the media browser to select and play music or other audio.

Playback and volume apply to the individual speaker. To play the same audio on multiple speakers in sync, use the [Multi-room synchronization](#multi-room-synchronization) switches below.

## Switch

For each HiVi speaker that can act as a **master**, the integration creates **switch** entities: one per other available speaker. Each switch represents “use this other speaker as a synchronized **slave** of the current master.”

- **Switch on** — Add that speaker as a slave; it will play in sync with the master.
- **Switch off** — Remove the slave link; that speaker returns to standalone mode.

You can change sync groups at any time; multiple independent master–slave groups are supported.

## Multi-room synchronization

Multi-room works by designating one speaker as the **master** and others as **slaves**. Audio played on the master is streamed in sync to all its slaves.

### How to set up

1. Open the HiVi speaker **device** in Home Assistant (the one you want to use as master).
2. In the device’s configuration area, find the list of switches named after other HiVi speakers.
3. Turn on the switch for each speaker you want to sync with this master.
4. Those speakers become slaves of this master; playback on the master is synchronized to them.
5. Turn off a switch to remove that speaker from the sync group.

### Example layout

```text
Living Room Speaker (master)
├── [On]  Kitchen Speaker   (synchronized)
├── [On]  Bedroom Speaker   (synchronized)
├── [Off] Bathroom Speaker  (standalone)
└── [Off] Office Speaker   (standalone)
```

- Each master can have its own set of slaves.
- All speakers in a sync group must be on the same local network.
- You can add or remove slaves at any time without restarting playback.

## Supported devices

Compatible with HiVi speakers that support Multi-Room, including (but not limited to):

- HiVi M5A, M3AMKIII, H6, H8, H5MKII, M500, M300MKII, M200MKII (Wi‑Fi), M200D, M100MKIII, M80W
- MT1-MAX, MT1-MINI
- T200MKII, MS2 series

Other HiVi models with Multi-Room functionality may also work.

## Troubleshooting

### No speakers are found

- Confirm HiVi speakers are on and on the same network as Home Assistant.
- Ensure multicast is not blocked (UDP 239.255.255.250, port 1900).
- Restart Home Assistant and the speakers, then use **Options** > **Refresh discovery**.

### Speakers are out of sync during playback

- Update speaker firmware if possible.
- Improve network stability and reduce latency; fewer speakers in a sync group can help.
- Place speakers and router so that Wi‑Fi signal is strong.

### Speakers disconnect often

- Check Wi‑Fi signal strength.
- Consider assigning static IPs to speakers and updating router firmware.

### Enabling debug logging

To help diagnose issues, enable debug logging for this integration:

```yaml
# configuration.yaml
logger:
  default: warning
  logs:
    homeassistant.components.hivi_speaker: debug
```

Restart Home Assistant and reproduce the issue, then inspect the logs.

## Removing the integration

Removing the integration from {% my integrations title="**Settings** > **Devices & services**" %} will remove all related entities and devices. No extra steps are required.
