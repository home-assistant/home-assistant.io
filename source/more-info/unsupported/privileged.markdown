---
title: "Privileged"
description: "More information on why not running with privileged marks the installation as unsupported."
---

## The issue

The Supervisor needs to have privileged access to the docker runtime on your host
to be able to do everything it needs to do.

## The solution

If you are running an older version of our Home Assistant OS, update it in the
{% my configuration title="Configuration" %} panel.

If this is not our Home Assistant OS, you need to re-run our
[convenience installation script](https://github.com/home-assistant/supervised-installer).

If running on Ubuntu (an unsupported installation), you can attempt to restart the supervisor service by running:

```bash
sudo systemctl restart hassio-supervisor.service
```

Running a similar command to restart the supervisor on your distro of installation may yield results.
