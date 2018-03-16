---
layout: page
title: "Matrix"
description: "Instructions how to add Matrix notifications to Home Assistant."
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

To enable Matrix notifications in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
notify:
  - name: NOTIFIER_NAME
    platform: matrix
    homeserver: HOMESERVER
    username: USERNAME
    password: PASSWORD
    default_room: ROOM_ID_OR_ALIAS
```

Configuration variables:

- **name** (*Optional*): Setting the optional parameter `name` allows multiple notifiers to be created. The default value is `notify`. The notifier will bind to the service `notify.NOTIFIER_NAME`.
- **homeserver** (*Required*): The base URL of the homeserver, where the notifier account is registered (e.g., `https://matrix.org`).
- **username** (*Required*): The username of the notifying Matrix account.
- **password** (*Required*): The password for the given Matrix account.
- **default_room** (*Required*): The room all messages will be sent to, when no other target is given.
- **verify_ssl** (*Optional*): Verify the homeservers certificate. Defaults to `true`.

The target room has to be precreated, the room id can be obtained from the rooms settings dialog. Rooms by default have a canonical id of the form `"!<randomid>:homeserver.tld"`, but can also be allocated aliases like `"#roomname:homeserver.tld"`. Make sure to use quotes around the room id or alias to escape special characters (`!`, and `#`) in YAML. The notifying account may need to be invited to the room, depending on the individual rooms policies.

To use notifications, please see the [getting started with automation page](/getting-started/automation/).
