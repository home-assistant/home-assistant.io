---
title: "Installation on a Armbian system"
description: "Instructions to install Home Assistant on an Armbian-powered systems."
---

[armbian](https://www.armbian.com) runs on a wide-variety of [ARM development boards](https://www.armbian.com/download/). Currently there are around 50 boards supported inclusive the OrangePi family, Cubieboard, Pine64, and ODROID.

Setup Python and `pip`:

```bash
sudo apt-get update
sudo apt-get install python3-dev python3-pip python3-setuptools libffi-dev libssl-dev
```

Now that you installed python, there are two ways to install Home Assistant:

1. It is recommended to install Home Assistant in a virtual environment to avoid using `root`, using the [VirtualEnv instructions](/docs/installation/virtualenv/)
2. Alternatively, you can install Home Assistant for the user you created when first booting Armbian:

```bash
sudo pip3 install -U wheel --user
sudo pip3 install homeassistant
hass --open-ui
```

Running these commands will:

- Install Home Assistant
- Launch Home Assistant and serve the web interface on `http://localhost:8123`
- The configuration files will be created in `/home/{user}/.homeassistant`
