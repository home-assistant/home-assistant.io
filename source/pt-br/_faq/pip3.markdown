---
title: "pip3: command not found"
description: "pip3: command not found"
ha_category: Installation
---


This utility should have been installed as part of the Python 3 installation. Check if Python 3 is installed by running `python3 --version`. If it is not installed, [download it here](https://www.python.org/getit/).

If you are able to successfully run `python3 --version` but not `pip3`, install Home Assistant by running the following command instead:

```bash
python3 -m pip install homeassistant=={{ site.current_major_version }}.{{ site.current_minor_version }}.{{ site.current_patch_version }}
```

On a Debian system, you can also install python3 by `sudo apt-get install python3` and pip3 by `sudo apt-get install python3-pip`.

If you run into errors during installation, check that you've installed all the necessary prerequisite packages, which include `python3-dev`, `libffi-dev`, and `libssl-dev`. On a Debian-based system, you can install these via `apt-get`:

```bash
sudo apt-get install python3-dev libffi-dev libssl-dev
```
