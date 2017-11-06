---
layout: post
title: "Which installation should I do"
description: "Should you use hass.io or VirtualEnv or hassbian?"
date: 2017-11-07 10:00:00 +0000
date_formatted: "November 07, 2017"
author: Ryan McLean
author_twitter: ryanm101
comments: true
categories: How-To
---

# Decisions, Decisions, Decisions...

Ok you've made it this far you're interested in automating your home, but Home-assistant has you stuck there are 3 main ways to install it.. Which should you choose?

*   Hass.io
*   Python Virtual Environment
*   Hassbian

This brief article will hopefully give you a starting point to make your decision as all 3 are perfectly viable options. These are not prescriptive and hass.io for example can be installed on any linux server but if you are looking to do that, you don't need this article to tell you the options.

<!--more-->

## I want the quick answer with no Fluff.

Simply choose where you fall into:

*   I don't care I just want an autonomous home using my RPi / NUC -> Hass.io
*   I don't want to fully dedicate my Pi and I want a simple install -> Hassbian
*   I'm a developer -> Python Virtual Env

## Considerations

The primary consideration in my opinion is *how* do you want to use Home-assistant?

In my case I want a simple stable install for my "production" instance and I have a few spare Raspberry Pis, So I use Hass.io for that "production" instance.

On my Linux Laptop I use the Python Virtual Environment install so I can test different configs and I also have multiple Virtual Environments on the laptop allowing me to develop components using different versions of the libraries.

## Install Options
### Option 1: [Hass.io](https://home-assistant.io/hassio/)

This is the simplest option, it hides all that nasty code from you so can only edit the config files and all you have to do is click update in the UI and hey presto you have an updated install.

This is the best option for beginners or people that want that appliance "just works feel".

For those that like to get into the nitty gritty and tinker, it's the worst option.

### Option 2: [Hassbian](https://home-assistant.io/docs/hassbian/installation/)

You have a raspberry Pi, you want to be able to see and edit the internals but you want a simple install and you want to use your RPi for multiple things.

Simply download the image and install on the SD card, you can now edit the configs and also tweak code etc as needed.

This option is basically Option3 for lazy people :)

### Option 3: [Virtual Environments](https://home-assistant.io/docs/installation/python/)

This is the most "complex" / flexible install (and I use complex in the loosest possible sense of the word). This is for when you don't want to dedicate your system to only home-assistant, you want to tweak the code and contribute back, or perhaps you want to install multiple versions with different configs.
Or perhaps you dont have a raspberry Pi or you want to install on other hardware / operating systems.

## Alternatives

All [Alternatives](https://home-assistant.io/docs/installation/) are listed here, except for the next two they are just vendor specific ways of doing the Option 3.

### [Docker](https://home-assistant.io/docs/installation/docker/)

Unless you've been hiding under a rock (or you're just not a techie) you will have heard of Docker, Linux containers made easy.

This is basically Hass.io but you have more control over the image and how it is mounted, you can also manage your container as you normally do. This is a great way to run Home-assistant if you have a docker swarm and want to have high availability.

### [Vagrant](https://home-assistant.io/docs/installation/vagrant/)

Before docker came along this would be a great way to host Home-assistant in a dedicated VM, providing an easy way to update and manage the system. Now unless you have a real aversion to Docker I would recommend it over this method.
