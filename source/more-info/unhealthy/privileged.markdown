---
title: "Privileged"
description: "More information on why not running with privileged marks the installation as unhealthy."
---

## The issue

The Supervisor needs to have privileged access to the docker runtime on your host
to be able to do everything it needs to do.

## The solution

If you are running an older version of our Home Assistant OS, update it in the
{% my configuration title="Configuration" %} panel.

If this is not our Home Assistant OS, your operating system might be out of date. Try checking for and
installing updates, then restarting your system. If this doesn't work, you may need to re-run our
[convenience installation script](https://github.com/home-assistant/supervised-installer).
