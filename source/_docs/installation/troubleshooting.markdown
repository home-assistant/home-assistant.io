---
title: "Troubleshooting installation problems"
description: "Common installation problems and their solutions."
redirect_from: /getting-started/troubleshooting/
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

#### libyaml is not found or a compiler error

On a Debian system, install the Python 3 YAML library by `sudo apt-get install python3-yaml`.

#### distutils.errors.DistutilsOptionError: must supply either home or prefix/exec-prefix -- not both
This is a known issue if you're on a Mac using Homebrew to install Python. Please follow [these instructions](https://github.com/Homebrew/brew/blob/master/docs/Homebrew-and-Python.md#note-on-pip-install---user) to resolve it.

#### No access to the frontend

In newer Linux distributions the access to a host is very limited. This means that you can't access the Home Assistant frontend that is running on a host outside of the host machine.

To fix this you will need to open your machine's firewall for TCP traffic to port 8123. The method for doing this will vary depending on your operating system and the firewall you have installed. Below are some suggestions to try. Google is your friend here.

For UFW systems (Ubuntu, Debian, Raspbian, etc.):

```bash
sudo ufw allow 8123/tcp
```

For `iptables` systems (was the default for older distributions):

```bash
iptables -I INPUT -p tcp --dport 8123 -j ACCEPT
iptables-save > /etc/network/iptables.rules  # your rules may be saved elsewhere
```

#### After upgrading, your browser login gets stuck at the "loading data" step

After upgrading to a new version, you may notice your browser gets stuck at the "loading data" login screen. Close the window/tab and go into your browser settings and delete all the cookies for your URL. You can then log back in and it should work. 

Android Chrome
chrome -> settings -> site settings -> storage -> search for your URL for Home Assistant-> "clear & reset"

#### Not initializing discovery because could not install dependency netdisco

If you see `Not initializing discovery because could not install dependency netdisco==x.y.z` in the logs, you will need to install the `python3-dev` or `python3-devel` package on your system manually (eg. `sudo apt-get install python3-dev` or `sudo dnf -y install python3-devel`). On the next restart of Home Assistant, discovery should work. If you still get an error, check if you have a compiler (`gcc`) available on your system.
