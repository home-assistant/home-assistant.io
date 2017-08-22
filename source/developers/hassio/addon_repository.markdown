---
layout: page
title: "Create an add-on repository"
description: "Add-ons repositories."
date: 2017-04-30 13:28
sidebar: true
comments: false
sharing: true
footer: true
redirect_from: /hassio/addon_repository/
---

Add-ons repository can contain one or more add-ons. Each add-on is stored in it's own unique folder. For it to be indentified as a repository, a repository contains a configuration file.

[Example add-on repository](https://github.com/home-assistant/hassio-addons-example).

## Installing a repository

A user can add a repository by going to the Hass.io panel in Home Assistant, clicking on the store icon in the top right, copy/paste the URL of your repostory into the repository textarea and click on "Save".

## Repository configuration

Each repository is required to contain `repository.json` at the root of the Git repository.

```json
{
  "name": "Name of repository",
  "url": "http://www.example/addons",
  "maintainer": "HomeAssistant Team <info@home-assistant.io>"
}
```

| Key | Required | Description |
| --- | -------- | ----------- |
| name | yes | Name of the repository
| url | no | Homepage of the repository. Here you can explain the various add-ons.
| maintainer | no | Contact info of the maintainer.
