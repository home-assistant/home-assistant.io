---
layout: page
title: "Updating HADashboard"
description: "Updating HADashboard"
release_date: 2016-11-13 15:00:00 -0500
sidebar: true
comments: false
sharing: true
footer: true
---

To update the dashboard after new code has been released, just run the following command to update your copy:

```bash
$ git pull origin
```

For some releases you may also need to rerun the bundle command:

``` bash
$ bundle
```

For docker users, you will also need to rerun the docker build process.
