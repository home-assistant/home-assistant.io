---
title: "CGroup Version"
description: "More information on why CGroup version marks the installation as unsupported."
---

## The issue

Supervisor depends on a particular version of Docker CGroup to be in use since
it depends on its features to work properly.

Currently Supervisor requires CGroup v1 in a supervised installation. 

However, the feature set changes and improves over time and therefore, the minimal
required version may change in the future. When that happens, it will be communicated
before we publish a version that will require you to upgrade CGroups.

## The solution

If your host uses CGroup v2, add this to the Linux kernel boot parameters: `systemd.unified_cgroup_hierarchy=0` and then reboot your operating system.

In a supervised installation if you have switched to CGroup v2 you will need to
revert what you did. Or you can re-run the [supervised installer](https://github.com/home-assistant/supervised-installer)
to fix it. Please be sure to reboot the system after the installation is done.

You should never see this issue on Home Assistant OS as all versions of the OS
ship with a supported CGroup version.
