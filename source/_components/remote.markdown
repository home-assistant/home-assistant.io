---
layout: page
title: "Remotes"
description: "Instructions how to setup your remotes with Home Assistant."
date: 2016-11-05 19:39
sidebar: true
comments: false
sharing: true
footer: true
ha_release: "0.34"
---

Keeps track which remotes are in your environment, their state and allows you to control them.

 * Maintains a state per remote and a combined state `all_remotes`.
 * Registers services `remote/turn_on`, `remote/turn_off`,`remote/sync`, and `remote/send_command` to control remotes.

### {% linkable_title Use the services %}

Go the the **Developer Tools**, then to **Call Service** in the frontend, and choose `remote/turn_on` or `remote/turn_off` from the list of available services (**Available services:** on the left). Enter something like the sample below into the **Service Data** field and hit **Call Service**.

```json
{"entity_id":"remote.family_room"}
```

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            |      yes | Only act on specific remote. Else targets all.

