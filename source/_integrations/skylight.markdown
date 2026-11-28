---
title: Skylight
description: Instructions on how to integrate your Skylight Calendar frame with Home Assistant.
ha_category:
  - Calendar
ha_iot_class: Cloud Polling
ha_release: 2026.12
ha_config_flow: true
ha_codeowners:
  - '@devinslick'
  - '@megathelegend'
ha_domain: skylight
ha_integration_type: service
ha_platforms:
  - calendar
ha_quality_scale: bronze
related:
  - docs: /integrations/calendar
    title: Calendar integration documentation
  - url: https://www.ourskylight.com/
    title: Skylight Calendar official site
---

The **Skylight** {% term integration %} lets Home Assistant read the calendar of your [Skylight Calendar family frame](https://www.ourskylight.com/) — the touchscreen wall calendar that syncs with your family's connected calendars (Google, iCloud, and others).

{% include integrations/config_flow.md %}

## Authentication

Skylight uses OAuth2 with a browser sign-in. During the configuration flow, Home Assistant opens the Skylight sign-in page in your browser. After signing in with your Skylight account, copy the `code=` value from the address bar of the page you land on (or the entire URL) and paste it back into Home Assistant. This is a one-time step; token refreshes happen automatically afterwards.

## Calendar

The integration provides one read-only [calendar](/integrations/calendar) entity for your frame. It aggregates the events of every calendar source connected to the frame (for example Google or iCloud calendars), within a rolling window from 14 days in the past to 60 days into the future.

Use the standard calendar card, `calendar.get_events` service, or automations to display and act on upcoming family events.

The entity is read-only: creating, editing, and deleting events is not supported yet — continue to use the Skylight app or frame for that. Writable calendars may arrive in a future release.
