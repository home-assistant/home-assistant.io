---
layout: page
title: "Development 101"
description: "Introduction to the basics of Home Assistant."
date: 2017-05-13 05:40:00 +0000
sidebar: true
comments: false
sharing: true
footer: true
---

The goal of development 101 is to get you familiar with the basics of developing for Home Assistant. Before we start, please make sure you familiarize yourself with the [architecture].

To get our code running inside Home Assistant we're going to create a custom component. The first step is to locate your config folder. You can find the path to your config folder by opening the Home Assistant frontend, click on the <img src='/images/screenshots/developer-tool-about-icon.png' alt='service developer tool icon' class="no-shadow" height="38" />. It's the path after the text "Path to configuration.yaml".

Inside your configuration directory create a new folder called `custom_components`. It might be that one already exists, that's fine too. This is the folder that Home Assistant will look at when looking for custom code.

<p class='note'>
The Home Assistant API has two variants: a synchronous and an asynchronous version (asyncio). This development course will focus on the synchronous version.
</p>

To verify that everything is working correctly, let's create a small Hello World component. To do so, create a file called `hello_world.py` in your custom components folder. Copy paste the following content to it:

```python
# The domain of your component. Equal to the filename of your component.
DOMAIN = "hello_world"


def setup(hass, config):
    """Setup the hello_world component."""
    # States are in the format DOMAIN.OBJECT_ID.
    hass.states.set('hello_world.Hello_World', 'Works!')

    # Return boolean to indicate that initialization was successfully.
    return True
```

Last step is to add `hello_world:` entry at the end of your `configuration.yaml` file (please note colon after 'hello_world'). This way Home Assistant will notice to include and run our new component.
```yaml
# Hello World component
hello_world:
```

After running `hass`, we should see log entries stating that `hello_world` component was loaded. What is more, additional state card shall appear.
```log
2018-04-03 21:44:20 INFO (MainThread) [homeassistant.loader] Loaded hello_world from custom_components.hello_world
2018-04-03 21:44:20 INFO (MainThread) [homeassistant.setup] Setting up hello_world
```
<p class='img'>
<img src='/images/screenshots/hello-world-state-card.png' />
State card showing that Hello World component is working as intended.
</p>
[architecture]: /developers/architecture/
