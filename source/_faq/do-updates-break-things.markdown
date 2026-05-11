---
title: "Do Home Assistant updates break things?"
description: "Updating Home Assistant is safe for most users. An automatic backup is taken before each update, breaking changes are announced in advance, and you can roll back if something goes wrong."
ha_category: About Home Assistant
---

For most users, updating Home Assistant is safe and uneventful.

A lot of the older articles and forum posts you may run into describe a time when updating Home Assistant was a real chore. You had to be careful, read every release note, and often dig into configuration files to fix things afterwards. That is no longer how it works for most people. Today, Home Assistant takes care of upgrading everything for you, including its operating system, the core, the user interface, and your {% term apps %}.

A new version of Home Assistant is released on the first Wednesday of every month, with smaller fix releases in between. A few things make the update process safe by default:

- An [automatic {% term backup %}](/common-tasks/general/#backups) is taken before each update, so you can roll back if something does not work for you.
- Every release is preceded by a public beta period, so issues are usually found and fixed before the stable release.
- Breaking changes are documented in advance in the [release notes](/blog/categories/core/), so you know what to look for.
- The built-in [repair system](/integrations/repairs/) proactively flags any issues after an update and walks you through how to resolve them.
- You can choose when to update, and skip a release if you prefer to wait.

When something does go wrong after an update, it usually affects a single {% term integration %}, especially community-maintained ones, rather than your whole installation. If you ever get stuck, you can restore the automatic backup and you are right back where you started.

Learn more:

- [Backups](/common-tasks/general/#backups)
- [Release notes](/blog/categories/core/)
- [Repairs](/integrations/repairs/)
