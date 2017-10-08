---
layout: page
title: "Add-On Communication"
description: "Describe internal communication Hass.io."
date: 2017-04-30 13:28
sidebar: true
comments: false
sharing: true
footer: true
redirect_from: /hassio/addon_config/
---

It exists diferent ways to communication between add-ons or home-assistant inside Home-Assistant.

## {% linkable_title Network %}

We use a internal network. That allow to speak with every add-on or from Home-Assistant to add-on by name or alias. Only the a add-on they run on Host network are a bit limited. They can speak with all internal add-ons over there name but all other add-on can't speak with the add-on name to this add-on, but alias work wheel. So use the name/alias to communicate inside Hass.io

i.e. use `hassio` to speak with internal API.

## {% linkable_title Home-Assistant %}

A Add-on can speak to [Home-Assistant API][hass-api] with our internal proxy. That make it very easy to speak to this API without you need know the password, port or any other information for the Home-Assistant instance. Use this url: `http://hassio/homeassistant/api` and they will internal redirected to the right place. As next add `homeassistant_api: true` to `config.json`.

It is also possible to speak direct to Home-Assistant instance with name `homeassistant` over our internal Network. But you need know the running config.

We have severals services for Hass.io inside Home-Assistant to execute some task. So you can also use `hassio.addon_stdin` to send data over STDIN to a add-on.

## {% linkable_title Hass.io API %}

To call to our [Hass.io API][hassio-api] add `hassio_api: true` to `config.json`. Now you can use the API over this url: `http://hassio/`.

[hass-api]: https://home-assistant.io/developers/rest_api/
[hassio-api]: https://github.com/home-assistant/hassio/blob/master/API.md
