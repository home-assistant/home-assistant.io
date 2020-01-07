---
title: "Installation on Arch Linux"
description: "Installation of Home Assistant on your Arch Linux computer."
---

[Arch Linux](https://www.archlinux.org/) is a lightweight and flexible Linux distribution for x86_64.

There are two ways to install Home Assistant on Arch Linux:

## 1. Use existing package

Install the package available for Arch Linux based distributions: [home-assistant-package](https://www.archlinux.org/packages/community/any/home-assistant/).

Run 

```sudo pacman -S home-assistant```

to install home-assistant including all required dependencies.

After installation has finished you can run Home Assistant:

```hass --open-ui```



## 2. Manual installation

Install the needed Python packages.

```bash
sudo pacman -S python
sudo pacman -S python-pip
```

From here on, we recommend you to follow the
[virtualenv](https://www.home-assistant.io/docs/installation/virtualenv/) guide.
