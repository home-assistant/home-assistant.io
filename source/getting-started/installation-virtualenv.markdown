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

There are several reasons why it makes sense to run Home Assistant in a virtual environment. A [virtualenv](https://virtualenv.pypa.io/en/latest/) encapsulates all aspect of a Python environment within a single directory tree. That means the Python packages you install for Home Assistant won't interact with the rest of your system and vice-versa. It means a random upgrade for some other program on your computer won't break Home Assistant, and it means you don't need to install Python packages as root.

Virtualenvs are pretty easy to setup. This example will walk through one method of setting one up (there are certainly others). We'll be using Debian in this example (as many Home Assistant users are running Raspbian on a Raspberry Pi), but all of the Python related steps should be the same on just about any platform.

### {% linkable_title Step 0: Install some dependencies %}

```bash
$ sudo apt-get update
$ sudo apt-get upgrade
$ sudo apt-get install python-pip python3-dev
$ sudo pip install --upgrade virtualenv
```

### {% linkable_title Step 1: Create a Home Assistant user %}

This step is optional, but it's a good idea to give services like Home Assistant their own user. It gives you more granular control over permissions, and reduces the exposure to the rest of your system in the event there is a security related bug in Home Assistant. This is a reasonably Linux oriented step, and will look different on other operating systems (or even other Linux distributions).

```bash
$ sudo adduser --system homeassistant
```

Home Assistant stores its configuration in `$HOME/.homeassistant` by default, so in this case, it would be in `/home/homeassistant/.homeassistant`

If you plan to use a Z-Wave controller, you will need to add this user to the `dialout` group

```bash
$ sudo usermod -G dialout -a homeassistant
```

### {% linkable_title Step 2: Create a directory for Home Assistant %}

This can be anywhere you want. As example we put it in `/srv`. You also need to change the ownership of the directory to the user you created above (if you created one).

```bash
$ sudo mkdir /srv/homeassistant
$ sudo chown homeassistant /srv/homeassistant
```

### {% linkable_title Step 3: Become the new user %}

This is obviously only necessary if you created a `homeassistant` user, but if you did, be sure to switch to that user whenever you install things in your virtualenv, otherwise you'll end up with mucked up permissions.

```bash
$ sudo su -s /bin/bash homeassistant
```

The `su` command means 'switch' user. We use the '-s' flag because the `homeassistant` user is a system user and doesn't have a default shell by default (to prevent attackers from being able to log in as that user).

### {% linkable_title Step 4: Set up the virtualenv %}

All this step does is stick a Python environment in the directory we're using. That's it. It's just a directory. There's nothing special about it, and it is entirely self-contained.

It will include a `bin` directory, which will contain all the executables used in the virtualenv (including hass itself). It also includes a script called `activate` which we will use to activate the virtualenv.

```bash
$ virtualenv -p python3 /srv/homeassistant
```

### {% linkable_title Step 5: Activate the virtualenv %}

```bash
$ source /srv/homeassistant/bin/activate
```

After that, your prompt should include `(homeassistant)`.

### {% linkable_title Step 6: Install Home Assistant %}

Once your virtualenv has been activated, you don't need to `sudo` any of your `pip` commands. `pip` will be installing things in the virtualenv, which the `homeassistant` user has permission to modify.

```bash
(homeassistant)$ pip3 install --upgrade homeassistant
```

And that's it... you now have Home Assistant installed, and you can be sure that every bit of it is contained in `/srv/homeassistant`.

### {% linkable_title Finally... Run Home Assistant %}

There are two ways to launch Home Assistant. If you are **in** the virtualenv, you can just run `hass` and it will work as normal. If the virtualenv is not activated, you just use the `hass` executable in the `bin` directory mentioned earlier. There is one caveat... Because Home Assistant stores its configuration in the user's home directory, we need to be the user `homeassistant` user or specify the configuration with `-c`.

```bash
$ sudo -u homeassistant -H /srv/homeassistant/bin/hass
```

The `-H` flag is important. It sets the `$HOME` environment variable to `/home/homeassistant` so `hass` can find its configuration.

### {% linkable_title Upgrading Home Assistant %}

Upgrading Home Assistant is simple, just repeat steps 3, 5 and 6.

### {% linkable_title Starting Home Assistant on boot %}

The [autostart instructions](/getting-started/autostart/) will work just fine, just be sure to replace `/usr/bin/hass` with `/srv/homeassistant/bin/hass` and specify the `homeassistant` user where appropriate.

### {% linkable_title Installing python-openzwave %}

If you want to use Z-Wave devices, you will need to install `python-openzwave` in your virtualenv. This requires a small tweak to the instructions in [the Z-Wave Getting Started documentation](/getting-started/z-wave/)

Install the dependencies as normal (Note: you will need to do this as your normal user, since `homeassistant` isn't a sudoer).

```bash
$ sudo apt-get install cython3 libudev-dev python3-sphinx python3-setuptools
```

Then, activate your virtualenv (steps 3 and 5 above) and upgrade cython.

```bash
(homeassistant)$ pip3 install --upgrade cython==0.24.1
```

Finally, get and install `python-openzwave`.

```bash
(homeassistant)$ mkdir /srv/homeassistant/src
(homeassistant)$ cd /srv/homeassistant/src
(homeassistant)$ git clone https://github.com/OpenZWave/python-openzwave.git
(homeassistant)$ cd python-openzwave
(homeassistant)$ git checkout python3
(homeassistant)$ PYTHON_EXEC=`which python3` make build
(homeassistant)$ PYTHON_EXEC=`which python3` make install
```
