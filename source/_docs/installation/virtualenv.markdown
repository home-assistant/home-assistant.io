---
layout: page
title: "Installation in Python virtual environment"
description: "How to install Home Assistant in a Python virtual environment."
date: 2016-4-16 16:40
sidebar: true
comments: false
sharing: true
footer: true
redirect_from: /getting-started/installation-virtualenv/
---
<p class='note'>
Beginners should check our [getting started guide](/getting-started/) first.
</p>

There are several reasons why it makes sense to run Home Assistant in a virtual environment. A [virtual environments (or short `venv`)](https://docs.python.org/3.6/library/venv.html) encapsulates all aspect of a Python environment within a single directory tree. That means the Python packages you install for Home Assistant won't interact with the rest of your system and vice-versa. It means a random upgrade for some other program on your computer won't break Home Assistant, and it means you don't need to install Python packages as root.

Virtual environments are pretty easy to setup. We'll be using Debian in this example (as many Home Assistant users are running Raspbian on a Raspberry Pi), but all of the Python related steps should be the same on just about any platform.

### {% linkable_title Basic guide %}

The basic guide is for testing Home Assistant. Also check the advanced guide for instances used in production.

## {% linkable_title Step 1: Install dependencies %}

```bash
$ sudo apt-get update
$ sudo apt-get upgrade
$ sudo apt-get install python3-pip python3-dev python3-venv
$ sudo pip3 install --upgrade virtualenv
```

## {% linkable_title Step 2: Setup virtualenv %}

```bash
$ python3 -m venv $HOME/homeassistant
```

## {% linkable_title Step 3: Install or update Home Assistant %}

```bash
$ source $HOME/homeassistant/bin/activate
(homeassistant)$ pip3 install --upgrade homeassistant
```

## {% linkable_title Step 4: Run Home Assistant %}

```bash
$ $HOME/homeassistant/bin/hass
```

### {% linkable_title Advanced guide %}
## {% linkable_title Separate user & group for Home Assistant (Basic guide step 2) %}

It's a good idea to give services like Home Assistant their own user. It gives you more granular control over permissions, and reduces the exposure to the rest of your system in the event there is a security related bug in Home Assistant. This is a reasonably Linux oriented step, and will look different on other operating systems (or even other Linux distributions).

```bash
$ sudo adduser --system homeassistant
$ sudo addgroup homeassistant
```

Home Assistant stores its configuration in `$HOME/.homeassistant` by default, so in this case, it would be in `/home/homeassistant/.homeassistant`.

If you plan to use a Z-Wave controller, you will need to add this user to the `dialout` group:

```bash
$ sudo usermod -G dialout -a homeassistant
```

## {% linkable_title Custom installation directory for Home Assistant (Basic guide step 2) %}

This can be anywhere you want. We chose to put it in `/srv`. You also need to change the ownership of the directory to the user you created above.

```bash
$ sudo mkdir /srv/homeassistant
$ sudo chown homeassistant:homeassistant /srv/homeassistant
```

Switching to your `homeassistant` user is obviously only necessary if you created a `homeassistant` user, but if you did, be sure to switch to that user whenever you install things in your virtual environment, otherwise you'll end up with mucked up permissions.

```bash
$ sudo su -s /bin/bash homeassistant
```

The `su` command means 'switch' user. We use the '-s' flag because the `homeassistant` user is a system user and doesn't have a default shell by default (to prevent attackers from being able to log in as that user).

Now, you can setup your virtual environment.

```bash
$ python3 -m venv /srv/homeassistant
```

## {% linkable_title Install or update Home Assistant %}

With [`pip`](https://pip.pypa.io/en/stable/quickstart/) you are now able to install Home Assistant in your virtual environment.

```bash
$ source /srv/homeassistant/bin/activate
(homeassistant)$ pip3 install homeassistant
```

Or updating:

```bash
$ source /srv/homeassistant/bin/activate
(homeassistant)$ pip3 install --upgrade homeassistant
```

## {% linkable_title Run Home Assistant (Basic guide step 4) %}

There are two ways to launch Home Assistant. If you are **in** the virtual environment, you can just run `hass` and it will work as normal. If the virtual environment is not activated, you just use the `hass` executable in the `bin` directory mentioned earlier. There is one caveat. Because Home Assistant stores its configuration in the user's home directory, we need to be the user `homeassistant` or specify the configuration with `-c`.

```bash
$ sudo -u homeassistant -H /srv/homeassistant/bin/hass
```

The `-H` flag is important. It sets the `$HOME` environment variable to `/home/homeassistant` so `hass` can find its configuration.

## {% linkable_title Starting Home Assistant on boot %}

The [autostart instructions](/getting-started/autostart/) will work just fine, just be sure to replace `/usr/bin/hass` with `/srv/homeassistant/bin/hass` and specify the `homeassistant` user where appropriate.
