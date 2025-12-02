---
title: WebRTC
description: Instructions on how to configure the WebRTC integration for Home Assistant.
ha_category:
  - Other
ha_release: '2026.1'
ha_quality_scale: internal
ha_domain: web_rtc
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: system
---

The **WebRTC** {% term integration %} is an internal integration that provides WebRTC functionality for camera streaming in Home Assistant. It is automatically set up when needed and does not require any manual configuration.

If you want to configure your own <abbr title="traversal using relays around NAT">TURN</abbr> and <abbr title="session traversal utilities for NAT">STUN</abbr> servers, [check the core config](/integrations/homeassistant/#webrtc).
