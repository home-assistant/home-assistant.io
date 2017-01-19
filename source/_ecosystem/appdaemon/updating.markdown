---
layout: page
title: "Updating AppDaemon"
description: "Updating AppDaemon"
release_date: 2016-11-27 08:00:00 -0500
sidebar: true
comments: false
sharing: true
footer: true
regenerate: true
hide_github_edit: true
---

To update AppDaemon after I have released new code, just run the following command to update your copy:

```bash
$ git pull origin
```

If you are using pip3 for the install do this:

```bash
$ sudo pip3 uninstall appdaemon
$ sudo pip3 install .
```

If you are using docker, rerun the steps to create a new docker image.
