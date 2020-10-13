---
title: "Docker Version"
description: "More information on why Docker version marks the installation as unsupported."
---

## The issue

The version that is needed by the Supervisor depends on the features it needs
to be present for it to work properly and therefor the version may change in the
future, when that happens it will be communicated before we publish a version that
will require you to upgrade.

The current minimum supported version of Docker is: `19.03.0`

## The solution

If you are running an older version of our Home Assistant OS, update it the
supervisor panel.

If this is not our Home Assistant OS, you need to manually update Docker on your
host for instructions on how to do that check the official
[Docker documentation](https://docs.docker.com/engine/install/debian/).
