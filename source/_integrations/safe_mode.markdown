---
title: Safe Mode
description: Allows Home Assistant to start up in safe mode.
ha_category: []
ha_release: 0.105
ha_codeowners:
  - '@home-assistant/core'
ha_domain: safe_mode
---

The `safe_mode` integration is an internally used integration by the
Home Assistant Core.

You don't have to configure it in any way since it is automatically always
available when Home Assistant needs it.

If, during startup, Home Assistant has problems reading your configuration,
it will still continue to start using bits and pieces from the configuration
of the last time it did start.

When this happens, Home Assistant will start in "Safe mode" using this
integration. In this mode, nothing is loaded, but it does give you access to
the Home Assistant frontend, settings and add-ons.

This gives you the possibility to correct the issue and restart Home Assistant
to re-try.
