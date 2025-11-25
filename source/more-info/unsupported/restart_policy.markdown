---
title: "Restart policy"
description: "More information on why changing the docker restart policy for containers marks the system as unsupported."
---

## The issue

Supervisor needs to start the containers it manages for addons, plugins and Home Assistant in the
correct order after a system reboot. Changing the restart policy it sets on those containers may
cause them to start in the wrong order and create errors.

## The solution

If the restart policy of observer was changed, fix it from the host shell with this:

```sh
docker update hassio_observer --restart always
```

For everything else, the restart policy can be fixed with the following command:

```sh
docker update <container_name> --restart no
```

The supervisor log should contain a list of container names with incorrect restart policies.
