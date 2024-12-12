---
title: Recovery mode
description: Allows Home Assistant to start up in recovery mode.
ha_category: []
ha_release: 0.105
ha_codeowners:
  - '@home-assistant/core'
ha_domain: recovery_mode
ha_quality_scale: internal
ha_integration_type: system
related:
  - docs: /docs/troubleshooting_general/
    title: General troubleshooting
---

The **Recovery mode** {% term integration %} is an internal integration used by the
Home Assistant Core.

You don't have to configure it since it is automatically always
available when Home Assistant needs it.

If, during startup, Home Assistant has problems reading your configuration,
it will still continue to start using parts of the configuration
from the last time Home Assistant did start.

When this happens, Home Assistant will start in **Recovery mode** using this
integration. In this mode, no user configured integrations are loaded, but it does give you access to
the Home Assistant frontend, settings and add-ons.

This gives you the possibility to correct the issue and restart Home Assistant
to re-try.
