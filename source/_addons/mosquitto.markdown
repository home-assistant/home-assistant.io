---
title: "Mosquitto MQTT broker"
description: "Fast and reliable MQTT broker."
featured: true
---

Set up [Mosquitto](https://mosquitto.org/) as MQTT broker.

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

Since version 4.1 of the addon, an explicit ACL definition is now required if you plan to use legacy logins and `"anonymous": true` [see these instructions](https://www.home-assistant.io/addons/mosquitto/#access-control-lists-acls).

</div>

{% configuration %}
anonymous:
  description: Allow anonymous connections. If *logins* is set, the anonymous user can only read data.
  required: false
  default: false
  type: boolean
logins:
  description: A list of local users that will be created with *username* and *password*. You don't need do this because you can use Home Assistant users too without any configuration.
  required: false
  type: list
customize:
  description: If you enable it, it reads additional configuration files (`*.conf`) from `/share/mosquitto`.
  required: false
  type: [boolean, string]
  default: false
cafile:
  description: Path to the CA certificate. If not set, will default to the *certfile* value.
  required: false
  default: certfile
  type: string
require_certificate:
  description: Restrict to users with a valid certificate only.
  required: false
  default: false
  type: boolean
{% endconfiguration %}

### Home Assistant user management

This add-on is attached to the Home Assistant user system, so mqtt clients can make use of these credentials. Local users may also still be set independently within the configuration options for the add-on.  For the internal Hass.io ecosystem we register `homeassistant` and `addons`, so these may not be used as user names.

### Home Assistant configuration

To use the Mosquitto as [broker](/docs/mqtt/broker/#run-your-own), go to the integration page and install the configuration with one click. If you have old MQTT settings available, remove this old integration and restart Home Assistant to see the new one.

#### Using Mosquitto with Hass.io

1. Install the [Mosquitto add-on](/addons/mosquitto/) with the default configuration via 'Hass.io > ADD-ON STORE'. (Don't forget to start the add-on & verify that 'Start on boot' is enabled.)

2. Create a new user for MQTT via the `Configuration > Users (manage users)`. (Note: This name cannot be "homeassistant" or "addon")

3. Once back on-line, return to `Configuration > Integrations` and select configure next to `MQTT`.

```text
  Broker: YOUR_HASSIO_IP_ADDRESS
  Port: 1883
  Username: MQTT_USERNAME
  Password: MQTT_PASSWORD
```

If you are using the ACL, remember to enter the newly created user and homeassistant in `/share/mosquitto/accesscontrollist` as follows:

```text
user [YOUR_MQTT_USER]
topic readwrite #
user homeassistant
topic readwrite #
```


Note: .yaml modifications are not required. 
See [testing your setup](/docs/mqtt/testing/) to verify the steps above.

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
