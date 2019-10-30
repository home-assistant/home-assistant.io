---
title: "Mosquitto MQTT broker"
description: "Fast and reliable MQTT broker."
featured: true
---

### Featuring Home Assistant user management!

This add-on is attached to the Home Assistant user system, so mqtt clients can make convenient use of these credentials. Local users may also still be set independently within the configuration options for the add-on.  For the internal Hass.io ecosystem we register `homeassistant` and `addons`, so these may not be used as user names.

##### 1. Add a user with credentials the clients will use to authenticate. The username cannot be "homeassistant" or "addons".
<p class='img'>
<img src='source/images/screenshots/add_mqtt_user.png'>
Adding a user.
</p>

##### 2. Start the Mosquitto addon. No changes to the configuration are needed.

##### 3. Navigate to Configuration > Integrations
##### 4. Home Assistant should show the newly found broker at the top of the page for you to configure. Check the box for discovery if desired, and hit Submit.

### Home Assistant configuration

Once the broker is running, clients are authenticating in the addon logs, and you have set up the integration, devices which are able to be discovered should begin appearing within the integration. If you are not seeing devices don't panic. They may not show up immediately and not all devices are configured for discovery by default. (Tasmota devices require `SetOption19 1` to be entered in the Tasmota console, for example).

You may also still configure individual mqtt devices manually using yaml. Refer to the various [MQTT integrations](https://www.home-assistant.io/integrations#search/mqtt) for further information.

See [testing your setup](/docs/mqtt/testing/) to verify the steps above.

### Manually Configuring the broker.

For making use of more advanced settings, or configuring the broker to use anonymous (not recommended), configure 
your Mosquitto addon options:

```json
{
  "logins": [
    {"username": "local-user", "password": "mypw"}
  ],
  "anonymous": false,
  "customize": {
    "active": false,
    "folder": "mosquitto"
  },
  "certfile": "fullchain.pem",
  "keyfile": "privkey.pem"
}
```

<div class='warning note'>

Since version 4.1 of the addon, an explicit ACL definition is now required if using anonymous authentication. [See these instructions](https://www.home-assistant.io/addons/mosquitto/#access-control-lists-acls).

</div>

{% configuration %}
anonymous:
  description: Allow anonymous connections. If *logins* is set, the anonymous user can only read data.
  required: false
  default: false
  type: boolean
logins:
  description: A list of local users that will be created with *username* and *password*. You don't need use this because you can use Home Assistant users too without any configuration of this option.
  required: false
  type: list
customize:
  description: If you enable it, it reads additional configuration files (`*.conf`) from `/share/mosquitto`.
  required: false
  type: [boolean, string]
  default: false
{% endconfiguration %}

### Disable listening on insecure (1883) ports

Remove the ports from the add-on page network card (set them as blank) to disable them.

### Access Control Lists (ACLs)

It is possible to restrict access to topics based upon the user logged in to Mosquitto. In this scenario it is recommended to create individual users for each of your clients and create an appropriate ACL.

See the following links for more information:

* [Mosquitto topic restrictions](http://www.steves-internet-guide.com/topic-restriction-mosquitto-configuration/)
* [Mosquitto.conf man page](https://mosquitto.org/man/mosquitto-conf-5.html)

Add the following configuration to enable **unrestricted** access to all topics.

 1. Enable the customize flag
```json
  "customize": {
    "active": true,
    "folder": "mosquitto"
  },
```

2. Create `/share/mosquitto/acl.conf` with the contents:
```text
acl_file /share/mosquitto/accesscontrollist
```

3. Create `/share/mosquitto/accesscontrollist` with the contents:
```text
user [YOUR_MQTT_USER]
topic readwrite #
```

The `/share` folder can be accessed via SMB, or on the host filesystem under `/usr/share/hassio/share`.
