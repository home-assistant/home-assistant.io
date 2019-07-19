---
title: "Installation on Arch Linux"
description: "Installation of Home Assistant on your Arch Linux computer."
---

[Arch Linux](https://www.archlinux.org/) is a lightweight and flexible Linux distribution for x86_64.

### Official Repositories

Home Assistant is provided in Arch's official `community` repository. Install using pacman.

```bash
# pacman -S home-assistant
```

Enable and start `home-assistant.service`.

```bash
# systemctl enable home-assistant
# systemctl start home-assistant
```

Configurations and data are stored at `/var/lib/hass`


### PyPI

Alternatively, install directly using the PyPI repository. Install the needed Python packages.

```bash
$ sudo pacman -S python
$ sudo pacman -S python-pip
```

and Home Assistant itself.

```bash
$ pip3 install --user homeassistant
```
