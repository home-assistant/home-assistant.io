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

If this does not help, you can try to reboot the host.
If you are running Home Assistant Operating System, this can be done from the "System" tab in the Supervisor panel. On the card for "Host System", there is a button to reboot the host.

To help us make the setup more robust, please enable the sharing of diagnostics and crash logs on the {% my analytics title="Settings > System > Analytics" %} panel.

[DBUS]: /more-info/unsupported/dbus
