---
title: "Docker Configuration"
description: "More information on why docker configuration marks the installation as unsupported."
---

## The issue

The supervisor have some expectations to how the docker runtime is configured,
this is due to stability and performance of the host running the supervisor.

The logging driver for docker needs to be set to `journald` and the storage driver
needs to be set to `overlay2`

## The solution

If you are running an older version of our Home Assistant OS, update it the
supervisor panel.

If this is not our Home Assistant OS, you need to modify the docker daemon
configuration on the host, that configuration is located at `/etc/docker/daemon.json`
if that file does not exist you can create it, and make sure it at least have the
following content:

```json
{
    "log-driver": "journald",
    "storage-driver": "overlay2"
}
```

When the file is saved you need to restart the docker service on the host.