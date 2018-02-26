---
layout: page
title: "Locks"
description: "Instructions how to setup your locks with Home Assistant."
date: 2015-11-21 08:10
sidebar: true
comments: false
sharing: true
footer: true
---

Keeps track which locks are in your environment, their state and allows you to control them.

 * Maintains a state per lock and a combined state `all_locks`.
 * Registers services `lock/lock` and `lock/unlock` to control locks.

### {% linkable_title Use the services %}

Go to the **Developer Tools**, then to **Call Service** in the frontend, and choose `lock/lock` or `lock/unlock` from the list of available services (**Available services:** on the left). Enter something like the sample below into the **Service Data** field and hit **CALL SERVICE**.

```json
{"entity_id":"lock.front_door"}
```

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            |      yes | Only act on specific lock. Else targets all.
