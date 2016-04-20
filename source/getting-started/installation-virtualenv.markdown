---
layout: page
title: "Installation in virtualenv"
description: "Instructions how to install Home Assistant in a virtual environment."
date: 2016-4-16 16:40
sidebar: true
comments: false
sharing: true
footer: true
---

There are several reasons why it makes sense to run Home Assistant in a virtualenv. A virtualenv encapsulates all aspect of a Python environment within a single directory tree. That means the Python packages you install for Home Assistant won't interact with the rest of your system and vice-versa. It means a random upgrade for some other program on your computer won't break HA, and it means you don't need to install a bunch of Python packages as root.

Virtualenvs are pretty easy to setup. This example will walk through one method of setting one up (there are certainly others). We'll be using Debian in this example (as many HA users are running Raspbian on a Raspberry Pi), but all of the Python related steps should be the same on just about any platform.

## Step 0: Install some dependencies

```bash
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install python-pip
sudo pip install --upgrade virtualenv
```

## Step 1: Create a Home Assistant user

This step is optional, but it's a good idea to give services like Home Assistant their own user. It gives you more granular control over permissions, and reduces the exposure to the rest of your system in the event there is a security related bug in HA. This is a reasonably Linux oriented step, and will look different on other OS's (or even other Linux distros).

```bash
sudo adduser --system hass
```

Home Assistant stores its config in `$HOME/.homeassistant` by default, so in this case, it would be in `/home/hass/.homeassistant`

## Step 2: Create a directory for Home Assistant

This can be anywhere you want, but I generally put stuff related to servers in /srv. You also need to change the ownership of the directory to the user you created above (if you created one)

```bash
sudo mkdir /srv/hass
sudo chown hass /srv/hass
```

## Step 3: Become the new user

This is obviously only necessary if you created a 'hass' user, but if you did, be sure to switch to that user whenever you install things in your virtualenv, otherwise you'll end up with mucked up permissions.

```bash
sudo su -s /bin/bash hass
```

The 'su' command means 'switch' user. We use the '-s' flag because the hass user is a system user and doesn't have a default shell by default (to prevent attackers from being able to log in as that user).

## Step 4: Set up the virtualenv

All this step does is stick a Python environment in the directory we're using. That's it. It's just a directory. There's nothing 'special' about it, and it is entirely self-contained.

It will include a 'bin' directory, which will contain all the executables used in the virtualenv (including hass itself). It also includes a script called 'activate' which we will use to activate the virtualenv.

```bash
virtualenv -p python3 /srv/hass
```

## Step 5: Activate the virtualenv

```bash
source /srv/hass/bin/activate
```

After that, your prompt should include '(hass)'.

## Step 6: Install Home Assistant

Once your virtualenv has been activated, you don't need to 'sudo' any of your pip commands. Pip will be installing things in the virtualenv, which our 'hass' user has permission to modify.

```bash
(hass)pip3 install --upgrade homeassistant
```

And that's it... you now have Home Assistant installed, and you can be sure that every bit of it is contained in /srv/hass

## Finally... Run Home Assistant

There are two ways to launch Home Assistant. If you are 'in' the virtualenv, you can just run `hass` and it will work as normal. If the virtualenv is not activated, you just use the 'hass' executable in that bin directory I mentioned earlier. There is one caveat... Because Home Assistant stores it's config in the user's home directory, we need to be the hass user.

```bash
sudo -u hass -H /srv/hass/bin/hass
```

The '-H' flag is important. It sets the `$HOME` environment variable to `/home/hass` so hass can find its configs.

## Upgrading Home Assistant

Upgrading HA is simple, just repeat steps 3, 5 and 6.

## Starting Home Assistant on boot

The autostart instructions on home-assistant.io will work just fine, just be sure to replace `/usr/bin/hass` with `/srv/hass/bin/hass` and specify the 'hass' user where appropriate.

## Installing python-openzwave

If you want to use Z Wave devices, you'll need to install python-openzwave in your virtualenv. This requires a small tweak to the instructions on home-assistant.io

Install the dependencies as normal (note: you'll need to do this as your normal user, since 'hass' isn't a sudoer).

```bash
$ sudo apt-get install cython3 libudev-dev python3-sphinx python3-setuptools
```

Then, activate your virtualenv (steps 3 and 5 above) and upgrade cython.

```bash
(hass)$ pip3 install --upgrade cython
```

Finally, get and install python-openzwave

```bash
(hass)$ mkdir /srv/hass/src
(hass)$ cd /srv/hass/src
(hass)$ git clone https://github.com/OpenZWave/python-openzwave.git
(hass)$ cd python-openzwave
(hass)$ git checkout python3
(hass)$ PYTHON_EXEC=`which python3` make build
(hass)$ PYTHON_EXEC=`which python3` make install
```