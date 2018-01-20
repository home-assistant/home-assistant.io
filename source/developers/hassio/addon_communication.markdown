---
layout: page
title: "Add-On Communication"
description: "Description of the internal communication of Hass.io."
date: 2017-04-30 13:28
sidebar: true
comments: false
sharing: true
footer: true
redirect_from: /hassio/addon_config/
---

There are different ways to communication between add-ons inside Home Assistant.

## {% linkable_title Network %}

We use a internal network. That allow to speak with every add-on or from Home Assistant to add-on by name or alias. Only the add-ons which runs on the host network are a bit limited. They can speak with all internal add-ons over their name but all other add-on can't address the add-on in question with its name. But using an alias work well. Thus the name/alias is used to communicate inside Hass.io. The name have the following format `{REPO}-{SLUG}`, e.g. `local-xy` or `3283fh-myaddon`.

Use `hassio` to speak with the internal API.

## {% linkable_title Home Assistant %}

An add-on can speak to the [Home Assistant API][hass-api] with our internal proxy. That makes it very easy to communicate with the API without knowing the password, port or any other information of the Home Assistant instance. Use this URL: `http://hassio/homeassistant/api` and internal communication is redirected to the right place. The next stept is to add `homeassistant_api: true` to `config.json` and read the environment variable `HASSIO_TOKEN` and use this as Home-Assistant password.

We have also a proxy for [Websocket Home Assistant API][hass-websocket]. It work like the API proxy above and use `HASSIO_TOKEN` as password. Use this URL: `http://hassio/homeassistant/websocket`.

It is also possible to speak direct to the Home Assistant instance which is named `homeassistant` over our internal network. But you need to know the configuration that is used by the running instance.

We have severals services for Hass.io inside Home Assistant to execute tasks. To send data over STDIN to an add-on use the simply `hassio.addon_stdin` service.

## {% linkable_title Hass.io API %}

To enables calls to the [Hass.io API][hassio-api], add `hassio_api: true` to `config.json` and read the environment variable `HASSIO_TOKEN`. Now you can use the API over the URL: `http://hassio/`. Use the `HASSIO_TOKEN` with header `X-HASSIO-KEY`.

[hass-api]: https://home-assistant.io/developers/rest_api/
[hass-websocket]: https://home-assistant.io/developers/websocket_api/
[hassio-api]: https://github.com/home-assistant/hassio/blob/master/API.md
