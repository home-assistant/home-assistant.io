---
layout: page
title: "Google Cast"
description: "Instructions on how to integrate Google Cast into Home Assistant."
date: 2015-03-23 19:59
sidebar: true
comments: false
sharing: true
footer: true
logo: google_cast.png
ha_category: Media Player
featured: true
ha_release: pre 0.7
ha_iot_class: "Local Polling"
redirect_from: /components/media_player.cast/
---


Google Cast devices like Android TVs and Chromecasts will be automatically discovered if you enable [the discovery component]({{site_root}}/components/discovery/). If you don't have the discovery component enabled, you can enable the Cast component by going to the Integrations page inside the config panel.

## {% linkable_title Advanced use %}

The Cast component has some extra configuration options available for advanced users. You will still need to create a config entry to initialize the Cast component.

For example, Cast devices can only be discovered if they are on the same subnet as Home Assistant. If this is not the case, you want to configure the IP address of the Cast device directly:


```yaml
# Example configuration.yaml entry
cast:
  media_player:
  - host: 192.168.1.10
    port: 8009
```

Configuration variables:

- **host** (*Optional*): Use only if you don't want to scan for devices.
- **port** (*Optional*): Specify chromecast port number - useful to manually define Chromecast Audio groups. Default: **8009**.
- **ignore_cec** (*Optional*) A list of Chromecasts that should ignore CEC data for determining the active input. [See the upstream documentation for more information.](https://github.com/balloob/pychromecast#ignoring-cec-data)

### {% linkable_title Chromecast Audio Groups and static configuration %}
Chromecasts and its Audio Groups are added automatically as long as [the discovery component]({{site_root}}/components/discovery/) is used to discover your Chromecast devices, Home Assistant is running in the same network as your Chromecast devices, and you don't have any Chromecast devices configured manually in your *configuration.yaml* file (the configuration includes only `cast:` and no static devices).

If for you wish to define your devices manually (i.e.: when running Home Assistant in another network), these groups can be manually added by specifying the group master's IP and the group's port.

**Caution:** The group is always "tracked" by a single master device. The master of a group could potentially change, after which a manual update of the configuration is required.

#### {% linkable_title Discovering Chromecasts and Audio Groups %}
The information to use in a static config could be found by e.g. by running a tool called **netdisco** manually in your local network.

##### {% linkable_title Native installation %}
On a system in your network with python and pip installed, the following commands can be run:
```
pip install netdisco
python -m netdisco
```
and look for the devices listed under `google_cast:`.

##### {% linkable_title Virtualenv installation %}
If your Home Assistant installation is running in a [virtualenv](https://www.home-assistant.io/docs/installation/virtualenv/), you'll need to activate the virtualenv before running the above commands, e.g.:

* Change to the user running Home Assistant, e.g.:
  ```
  sudo -u homeassistant -H -s
  ```
* Change directory to the virtual environment, e.g.:
    ```
    cd /srv/homeassistant
    ```
* Activate the virtual environment:
  ```
  source bin/activate
  ```
* Install netdisco and dependencies:
  ```
  pip install netdisco
  ```
  * If zeroconf is not installed or detected properly, you might get an error ``ImportError: No module named 'netifaces'``. Run the following command to solve it:
  ```
  pip install netifaces
  ```
* Run netdisco to get a view of devices discovered on your network:
  ```
  python -m netdisco
  ```
  and look for the devices listed under `google_cast:`.
