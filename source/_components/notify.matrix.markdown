---
layout: page
title: "Matrix"
description: "Instructions on how to add Matrix notifications to Home Assistant."
date: 2016-10-11 23:51
sidebar: true
comments: false
sharing: true
footer: true
logo: matrix.png
ha_category: Notifications
ha_release: 0.32
---


The `matrix` platform allows you to deliver notifications from Home Assistant to a [Matrix](http://matrix.org) room. Rooms can be both direct as well as group chats.

## {% linkable_title Configuration %}

To enable Matrix notifications in your installation, you first need to configure
the [Matrix component](/components/matrix/). Then, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
notify:
  - name: NOTIFIER_NAME
    platform: matrix
    default_room: ROOM_ID_OR_ALIAS
```

Configuration variables:

- **name** (*Optional*): Setting the optional parameter `name` allows multiple notifiers to be created. The default value is `notify`. The notifier will bind to the service `notify.NOTIFIER_NAME`.
- **default_room** (*Required*): The room all messages will be sent to, when no other target is given.

The target room has to be precreated, the room id can be obtained from the rooms settings dialog. Rooms by default have a canonical id of the form `"!<randomid>:homeserver.tld"`, but can also be allocated aliases like `"#roomname:homeserver.tld"`. Make sure to use quotes around the room id or alias to escape special characters (`!`, and `#`) in YAML. The notifying account may need to be invited to the room, depending on the individual rooms policies.

To use notifications, please see the [getting started with automation page](/getting-started/automation/).
