---
title: "Installation on CentOS/RHEL"
description: "Installation of Home Assistant on your CentOS/RHEL computer."
---

To run Python 3.x on [CentOS](https://www.centos.org/) or RHEL (Red Hat Enterprise Linux), [Software Collections](https://www.softwarecollections.org/en/scls/rhscl/rh-python36/) needs to be activated first.

### Using Software Collections

First of all install the software collection repository as root and [scl utils](https://access.redhat.com/documentation/en-US/Red_Hat_Developer_Toolset/1/html-single/Software_Collections_Guide/). For example, on CentOS:

```bash
sudo yum install centos-release-scl
sudo yum-config-manager --enable centos-sclo-rh-testing
sudo yum install -y scl-utils
```

Install some dependencies you'll need later.

```bash
sudo yum install gcc gcc-c++ systemd-devel
```

Then install the Python 3.6 package. If you are using CentOS 7 then you may have to install the packages for Python 3.6 using RHEL Methods listed here: https://www.softwarecollections.org/en/scls/rhscl/rh-python36/) for this to work as mentioned above.

```bash
sudo yum install rh-python36
```

This is part of the slight change when trying to install Python 3.6 and running the command `python36 --version` which will after install give you the correct version, but won't allow you to set the software collection using the `scl` command. This command downloads the RH collection of Python to allow you to run `scl` command to enable the environment in `bash` and then run the automate command using the template.

```bash
yum install rh-python36
```

### Start using software collections

```bash
scl enable rh-python36 bash
```

Once installed, switch to your `homeassistant` user (if you've set one up), enable the software collection and check that it has set up the new version of Python:

```bash
$ python --version
Python 3.6.3
```

You will be in a command shell set up with Python 3.6 as your default version. The `virtualenv` and `pip` commands will be correct for this version, so you can now create a virtual environment and install Home Assistant following the main [instructions](/docs/installation/virtualenv/#step-4-set-up-the-virtualenv).

You will need to enable the software collection each time you log on before you activate your virtual environment.

### Systemd with Software Collections

To autostart Home Assistant using systemd and a python36 (from SCL) virtual environment, follow the main [instructions](/docs/autostart/systemd/) and adjust the template as follows:

Filename: `/etc/systemd/system/home-assistant@homeassistant.service`
```txt
[Unit]
Description=Home Assistant
After=network-online.target

[Service]
Type=simple
# %i means the username is derrived from the filename.
User=%i
# a python venv for hass exists in /opt/hass/venv
ExecStart=/srv/homeassistant/bin/hass

[Install]
WantedBy=multi-user.target
```

This works because the Python virtual environment was created using the SCL environment, thus there is no need to activate SCL.
