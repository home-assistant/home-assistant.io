---
title: "Troubleshooting installation problems"
description: "Common installation problems and their solutions."
---

It can happen that you run into trouble while installing Home Assistant. This page is here to help you solve the most common problems.

#### pip3: command not found

This utility should have been installed as part of the Python installation. Check if Python is installed by running `python3 --version`. If it is not installed, [download it here](https://www.python.org/getit/).

If you are able to successfully run `python3 --version` but not `pip3`, install Home Assistant by running the following command instead:

```bash
python3 -m pip install homeassistant
```

On a Debian system, you can also install python3 by `sudo apt-get install python3`, and pip3 by `sudo apt-get install python3-pip`.

#### No module named pip

[Pip](https://pip.pypa.io/en/stable/) should come bundled with the latest Python 3 but is omitted by some distributions. If you are unable to run `python3 -m pip --version` you can install `pip` by [downloading the installer](https://bootstrap.pypa.io/get-pip.py) and running it with Python 3:

```bash
python3 get-pip.py
```

#### No access to the frontend

In newer Linux distributions the access to a host is very limited. This means that you can't access the Home Assistant frontend that is running on a host outside of the host machine.

To fix this you will need to open your machine's firewall for TCP traffic to port 8123. The method for doing this will vary depending on your operating system and the firewall you have installed. Below are some suggestions to try. Google is your friend here.

For UFW systems (Ubuntu, Debian, Raspberry Pi OS, etc.):

```bash
sudo ufw allow 8123/tcp
```

For `iptables` systems (was the default for older distributions):

```bash
iptables -I INPUT -p tcp --dport 8123 -j ACCEPT
iptables-save > /etc/network/iptables.rules  # your rules may be saved elsewhere
```

### System freezes

On small systems (such as a Pi2), not directly supported by binaries (Python Wheels) you may run out of memory.
Upon the first run or after an upgrade, Home Assistant uses a lot of resources to (re)compile all the integrations. 
If you run out of memory and/or swap memory, your system will freeze.
Increasing swap memory can help:

```bash
sudo dphys-swapfile swapoff
sudo nano /etc/dphys-swapfile
```

Modify the line the sets the swapfile size. Set it equal to your memory or double your current setting: `CONF_SWAPSIZE = 925` then:

```bash
sudo dphys-swapfile swapon
sudo systemctl restart dphys-swapfile.service
```
