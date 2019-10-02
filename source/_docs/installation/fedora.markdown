---
title: "Installation on Fedora"
description: "Installation of Home Assistant on your Fedora computer."
---

[Fedora](https://fedoraproject.org) is an operating system based on the Linux kernel, developed by the community-supported Fedora Project. There are releases for x86 and x86_64 including ARM and other architectures. 

Install the development package of Python.

```bash
<<<<<<< HEAD
$ sudo dnf -y install python3-devel redhat-rpm-config
=======
sudo dnf -y install python3-devel redhat-rpm-config
>>>>>>> upstream/next
```

and Home Assistant itself.

```bash
<<<<<<< HEAD
$ pip3 install homeassistant
=======
pip3 install homeassistant
>>>>>>> upstream/next
```

To isolate the Home Assistant installation a [`venv`](https://docs.python.org/3/library/venv.html) is handy. First create a new directory to store the installation and adjust the permissions.

```bash
<<<<<<< HEAD
$ sudo mkdir -p /opt/homeassistant
$ sudo useradd -rm homeassistant -G dialout
$ sudo chown -R homeassistant:homeassistant /opt/homeassistant
=======
sudo mkdir -p /opt/homeassistant
sudo useradd -rm homeassistant -G dialout
sudo chown -R homeassistant:homeassistant /opt/homeassistant
>>>>>>> upstream/next
```
Now switch to the new directory, setup the `venv`, and activate it.

```bash
<<<<<<< HEAD
$ sudo -u homeassistant -H -s
$ cd /opt/homeassistant
$ python3.6 -m venv .
$ source bin/activate
=======
sudo -u homeassistant -H -s
cd /opt/homeassistant
python3.6 -m venv .
source bin/activate
>>>>>>> upstream/next
```

Install Home Assistant itself.

```bash
$ pip3 install homeassistant colorlog
```

Check the [autostart](/docs/autostart/systemd/) section in the documentation for further details and the [Firewall section](/docs/installation/troubleshooting/#no-access-to-the-frontend) if you want to access your Home Assistant installation.
