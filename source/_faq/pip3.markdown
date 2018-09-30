---
layout: page
title: "pip3: command not found"
description: "pip3: command not found"
date: 2017-06-18 09:00
comments: false
sharing: true
footer: true
ha_category: Installation
---


This utility should have been installed as part of the Python 3 installation. Check if Python 3 is installed by running `python3 --version`. If it is not installed, [download it here](https://www.python.org/getit/).

If you are able to successfully run `python3 --version` but not `pip3`, install Home Assistant by running the following command instead:

```bash
$ python3 -m pip install homeassistant
```

On a Debian system, you can also install python3 by `sudo apt-get install python3`d and pip3 by `sudo apt-get install python3-pip`.
