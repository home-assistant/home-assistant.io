---
layout: page
title: "Troubleshooting"
description: "Common problems and their solutions."
date: 2015-01-20 22:36
sidebar: false
comments: false
sharing: true
footer: true
---

It can happen that you run into trouble while installing Home Assistant. This page is here to help you figure out the most common problems.

**python3: command not found**<br>
Check if Python 3.4 is installed by running `python3 --version`. If it is not installed, [download it here](https://www.python.org/getit/).

**No module named pip**<br>
Pip should come bundled with the latest Python 3 but is ommitted by some distributions. If you are unable to run `python3 -m pip --version` you can install pip by [downloading the installer](https://bootstrap.pypa.io/get-pip.py) and run it with Python 3: `python3 get-pip.py`.

**git: command not found**<br>
Check if Git is installed by running `git --version`. If you are unable to run this command you can install it by following [these instructions](http://git-scm.com/downloads).

**No module named 'pytz'**<br>
There is a problem with installing dependencies on the fly. Install the dependencies manually in advance.

```bash
python3 -m pip install --upgrade pip
python3 -m pip install --upgrade -r requirements.txt
```

**Ubuntu 14.04: ... returned non-zero exit status**<br>
There is a known issue with installing on Ubuntu 14.04 and possibly many other newer Debian based distributions. The venv Python 3.4 package that has been bundled in the apt-get repository are known to be broken. This has been documented [in this bug report](https://bugs.launchpad.net/ubuntu/+source/python3.4/+bug/1290847). If you are encountering an error that looks like the following while creating the virtual environment, you are experiencing this bug.

```bash
Error: Command '['home-assistant/bin/python3.4', '-Im', 'ensurepip', '--upgrade', '--default-pip']' returned non-zero exit status
```

This error can be fixed permanently by running the following commands.

```bash
cd ~/Downloads
wget https://gist.githubusercontent.com/rmkraus/c3972492a9de875203c6/raw/46629b63857537deedc85ec4a11cd8284816e2a0/install_ensurepip.py
sudo python3 install_ensurepip.py
rm install_ensurepip.py
```

After these commands have been successfully executed, the venv package will be fixed system-wide.
