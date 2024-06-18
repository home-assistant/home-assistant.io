---
title: "Docker Configuration"
description: "More information on why Docker configuration marks the installation as unsupported."
---

## The issue

The Supervisor has some expectations of how the Docker daemon is configured to maintain the stability and performance of the host running the Supervisor.

The logging driver for the Docker daemon needs to be set to `journald` and the storage driver
needs to be set to `overlay2`.

We only support cgroup version 1 on our hardware handling.

## The solution

If you are running an older version of our Home Assistant OS, update it to the latest version in the {% my configuration title="Configuration" %} panel.

If you are running Home Assistant Supervised, you need to modify the Docker daemon
configuration on the host. The configuration is located at `/etc/docker/daemon.json`.
If that file doesn't exist, you can create it and make sure it at least has the
following contents:

```json
{
    "log-driver": "journald",
    "storage-driver": "overlay2"
}
```

When the Docker configuration file is changed and saved, you need to restart the
Docker service on the host machine.

To fix issues with the cgroup level, addjust the `/etc/default/grub` and add `systemd.unified_cgroup_hierarchy=false` to `GRUB_CMDLINE_LINUX_DEFAULT` and run `sudo update-grub`. After this change is made, you need to reboot the host completely.

You can also just re-run our [convenience installation script](https://github.com/home-assistant/supervised-installer).
