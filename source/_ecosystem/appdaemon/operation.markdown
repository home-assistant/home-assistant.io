---
layout: page
title: "Operation"
description: "Operation"
release_date: 2016-11-27 08:00:00 -0500
sidebar: true
comments: false
sharing: true
footer: true
regenerate: true
hide_github_edit: true
---

Since `AppDaemon` under the covers uses the exact same APIs as the frontend UI, you typically see it react at about the same time to a given event. Calling back to Home Assistant is also pretty fast especially if they are running on the same machine. In action, observed latency above the built in automation component is usually sub-second.
