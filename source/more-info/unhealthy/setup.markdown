---
title: "Setup of the Supervisor failed"
description: "More information on why failing the setup stage makes an installation as unhealthy."
---

## The issue

This happens when any of the setup tasks fails to complete, this can be due to the host not being completely ready when the Supervisor starts or that [DBUS] is not properly working.

## The solution

If the issue is related to DBUS, you will see an unsupported message about that as well; You can have a look [here][DBUS] on how to resolve that.

If DBUS is not the problem, the first thing you should try is to restart the Supervisor.

This can also be done with the CLI, by running the following command:

```bash
ha supervisor restart
```

If this does not help or you do not have any way to access the CLI, you can try to reboot the host. This can be done by going to {% my hardware title="Settings -> System -> Hardware" %}, opening the menu in the top right corner, and selecting "Reboot system".

To help us make the setup more robust, please enable the sharing of diagnostics and crash logs on the {% my analytics title="Settings > System > Analytics" %} panel.

[DBUS]: /more-info/unsupported/dbus
