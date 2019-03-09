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

If you already have Python 3.5.3 or later installed, you can easily give Home Assistant a spin.

It's recommended when installing Python packages that you use a [virtual environment](https://docs.python.org/3.5/library/venv.html#module-venv). This will make sure that your Python installation and Home Assistant installation won't impact one another. The following steps will work on most UNIX like systems.

_(If you're on a Debian based system, you will need to install Python virtual environment support using `apt-get install python3-pip python3-venv`. You may also need to install development libraries using `apt-get install build-essential libssl-dev libffi-dev python3-dev`.)_

<p class='Note'>
It is recommended to use the [advanced guide](/docs/installation/raspberry-pi/) which allows for the installation to run as a `homeassistant` user. The steps below may be shorter but some users find difficulty when applying updates and may run into issues.
</p>

### {% linkable_title Install %}

 1. Create a virtual environment in your current directory:
    ```
    $ python3 -m venv homeassistant
    ```
 2. Open the virtual environment:
    ```
    $ cd homeassistant
    ```
 3. Activate the virtual environment:
    ```
    $ source bin/activate
    ```
 4. Install wheel:
    ```
    $ python3 -m pip install wheel
    ```
 5. Install Home Assistant:
    ```
    $ python3 -m pip install homeassistant
    ```    
 6. Configure it to [autostart](/docs/autostart/)
 7. Or run Home Assistant manually:
    ```
    $ hass --open-ui
    ```
 8. You can now reach the web interface on `http://ipaddress:8123/` - the first start may take up to 20 minutes before the web interface is available

 
### {% linkable_title Upgrade %}

 1. Stop Home Assistant

 2. Open the directory where the virtual environment is located:
    ```
    $ cd homeassistant
    ```
 3. Activate the virtual environment:
    ```
    $ source bin/activate
    ```
 4. Upgrade Home Assistant:
    ```
    $ python3 -m pip install --upgrade homeassistant
    ```
 5. Start Home Assistant
 6. You can now reach the web interface on `http://ipaddress:8123/` - the first start may take up to 20 minutes before the web interface is available

### {% linkable_title Notes %}

- In the future, if you want to start Home Assistant manually again, follow step 2, 3 and 5.
- It's recommended to run Home Assistant as a dedicated user.

<p class='info'>
Looking for more advanced guides? Check our [Raspbian guide](/docs/installation/raspberry-pi/) or the [other installation guides](/docs/installation/).
</p>

### {% linkable_title After upgrading Python %}

If you've upgraded Python (for example, you were running 3.5.2 and now you've installed 3.5.4) then you'll need to build a new virtual environment. Simply rename your existing virtual environment directory:

```bash
$ mv homeassistant homeassistant.old
```
Then follow the [Install](/docs/installation/virtualenv/#install) steps again, being sure to use the newly installed version of Python.
