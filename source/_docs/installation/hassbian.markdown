---
title: "Hassbian"
description: "Instructions to flash the Home Assistant Hassbian image on a Raspberry Pi."
redirect_from: /getting-started/hassbian/
---

Hassbian is our customized operating system for the Raspberry Pi Zero, 2,3 and 3B+. It is one of the easiest ways of installing Home Assistant.

 - [Install Hassbian](/docs/hassbian/installation/)
 - [Customize your installation](/docs/hassbian/customization/)
 - [Pi specific integrations](/docs/hassbian/integrations/)
 - [Learn how to perform common tasks](/docs/hassbian/common-tasks/)

### Activating the virtual environment

When instructions tell you to activate the virtual environment to install a Python library, or perform some tasks, the following commands will do this:

```bash
sudo -u homeassistant -H -s
source /srv/homeassistant/bin/activate
```
