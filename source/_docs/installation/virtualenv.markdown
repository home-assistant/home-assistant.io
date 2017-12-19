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

If you already have Python 3.5 or later installed, you can easily give Home Assistant a spin.

It's recommended when installing Python packages that you use a virtual environment. This will make sure that your Python installation and Home Assistant installation won't impact one another.

_(If you're on a Debian based system, you will need to install Python virtual environment support using `apt-get install python3-pip python3-venv`.)_

 1. Create a virtual environment:
    ```
    $ python3 -m venv homeassistant
    ```
 2. Open virtual environment:
    ```
    $ cd homeassistant
    ```
 3. Activate virtual environment:
    ```
    $ source bin/activate
    ```
 4. Install Home Assistant:
    ```
    $ python3 -m pip install --upgrade homeassistant
    ```
 5. Run Home Assistant:
    ```
    $ hass --open-ui
    ```

### {% linkable_title Notes %}

- In the future, if you want to start Home Assistant again, follow step 2, 3 and 5.
- If you want to upgrade Home Assistant, follow step 2, 3 and 4.

<p class='info'>
Looking for more advanced guides? Check our the [Rasbian guide](/docs/installation/raspberry-pi/) or the [available installation guides](/docs/installation/]. For details about autostarting, refer to the [autostart section](/docs/autostart/) in the documentation.
</p>
