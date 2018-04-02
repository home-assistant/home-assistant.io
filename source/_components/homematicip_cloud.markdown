---
layout: page
title: "HomematicIP Cloud"
description: "Instructions for integrating HomematicIP into Home Assistant."
date: 2018-04-02 13:40
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Hub
ha_iot_class: "Cloud Polling"
ha_release: 0.66
featured: false
---

The [HomematicIP](http://www.homematicip.de) component platform is used as an interface to the cloud server.
For for communication [homematicip-rest-api](https://github.com/coreGreenberet/homematicip-rest-api) is used.

To set up the component:

- **generate the authentication token**:
```yaml
generate_auth_token.py
```

- **add the information to your `configuration.yaml` file**:

```yaml
homematicip_cloud:
  - name: NAME
    accesspoint: IDENTIFIER
    authtoken: AUTHTOKEN
```

Configuration variables (global):

- **name** (*Optional*): Name to identify your access point, this will be
  used to prefix your device names.
- **accesspoint** (*Required*): This is the access point id (SGTIN)
- **authtoken** (*Required*): Authentification token generated with
`generate_auth_token.py`.

