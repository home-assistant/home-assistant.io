---
title: "Docker Version"
description: "More information on why Docker version marks the installation as unsupported."
---

## The issue

The version that is needed by the Supervisor depends on the features it needs
to work properly.

The current minimum supported version of Docker is: `20.10.17`.

However, the feature set changes and improves over time. Therefore, the minimal
required version may change. When that happens, it will be communicated
before we publish a version that requires you to upgrade Docker.

## The solution

If you are running an older version of Home Assistant OS, 
{% my updates title="update" %} it.

If this is not Home Assistant OS, you need to manually update Docker on your
host. For instructions on how to do that, check the official
[Docker documentation](https://docs.docker.com/engine/install/debian/).
