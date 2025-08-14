---
title: Uonet+ Vulcan
description: Instructions on setting up Uonet+ Vulcan within Home Assistant.
ha_category:
  - Calendar
ha_iot_class: Cloud Polling
ha_release: 2022.4
ha_domain: vulcan
ha_codeowners:
  - '@Antoni-Czaplicki'
ha_config_flow: true
ha_platforms:
  - calendar
ha_integration_type: integration
---

The **Uonet+ Vulcan** {% term integration %} allows you to view timetable from your e-register.

Supported informations:

- Timetable

## Prerequisites

To use **Uonet+ Vulcan** {% term integration %} in Home Assistant you must obtain `token`, `symbol` and `pin` from your Vulcan account. You can find them in the student/parent panel in `Mobile access`/`Dostęp mobilny` tab.

{% include integrations/config_flow.md %}
