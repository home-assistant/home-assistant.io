---
layout: page
title: "Installation"
description: "AppDaemon Installation"
release_date: 2016-11-27 08:00:00 -0500
sidebar: true
comments: false
sharing: true
footer: true
regenerate: true
hide_github_edit: true
---

Installation is either by `pip3` or Docker.

## {% linkable_title Clone the Repository %}

For either method you will need to clone the **AppDaemon** repository to the current local directory on your machine.

``` bash
$ git clone https://github.com/acockburn/appdaemon.git
```

Change your working directory to the repository root. Moving forward, we will be working from this directory.

``` bash
$ cd appdaemon
```

## {% linkable_title Install using Docker %}

To build the Docker image run the following:

``` bash
$ docker build -t appdaemon .
```

(Note the period at the end of the above command)

## {% linkable_title Install using `pip3` %}

Before running `AppDaemon` you will need to install the package:

```bash
$ sudo pip3 install .
```
