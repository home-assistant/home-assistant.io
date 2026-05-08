---
title: "Problems with dependencies"
description: "Almost all problems with dependencies in Home Assistant come from custom integrations installed from outside the official store, such as through HACS."
ha_category: Usage
---

Almost all problems with dependencies in Home Assistant come from custom {% term integrations %} that you installed from outside the official integration store, such as through HACS.

Home Assistant tests and ships its own set of dependencies for every official integration, and updates them together. You should not see dependency errors from official integrations in normal use. If you do, please [report it](https://github.com/home-assistant/core/issues) so we can investigate.

For custom integrations, dependency issues can happen when the custom integration has not yet been updated for a new Home Assistant release, or when it conflicts with another custom integration. The first step is to restart Home Assistant and check [the logs](/integrations/logger/#viewing-logs) for the exact error. From there:

- Check whether the custom integration has a newer version available, and update it.
- Check the custom integration's issue tracker to see if others are seeing the same problem.
- If the issue started right after a Home Assistant update, you can restore an [automatic backup](/common-tasks/general/#backups) from before the update, if one is available, while you wait for the custom integration to be fixed.
