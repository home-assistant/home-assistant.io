---
layout: page
title: "Monzo"
description: "Instructions how to integrate Monzo within Home Assistant."
date: 2017-12-24 09:40
sidebar: true-
comments: false
sharing: true
footer: true
logo: monzo.svg
ha_category: Finance
ha_release: 0.61
ha_iot_class: "Cloud Polling"
---

The Monzo sesnsor is used to show your current [Monzo](https://monzo.com/) account balance. To connect to Monzo, you will have to [sign up for a developer account](https://developers.monzo.com)) and get a `client_id` and `client_secret`.

### {% linkable_title Setting up developer account %}
1. Visit [Monzo Developers](https://developers.monzo.com), and sign in.
2. Click "[Clients](https://developers.monzo.com/apps/home)"
3. Click "[+ New OAuth Client](https://developers.monzo.com/apps/new)"
4. Fill in the details:
  - Enter a name, and a description
  - Logo URL can be left blank
  - Redirect URLs must be set to http://ip-of-hass:8123/api/monzo
  - Confidentiality *Must* be set to "Confidential"
5. Click on the newly created OAuth client
6. Copy the client id, and client secret into your configuration section. These will be used to populate the `client_id` and `client_secret` section. *NOTE* you should save this as a secret, and not directly in your configuration.
7. Once Home Assistant is started, a configurator will pop up asking you to log into your Monzo account. See the steps below for authenticating with Monzo

### {% linkable_title Configuration %}

```yaml
# Example configuration.yaml entry
sensor:
  - platform: monzo
    client_id: '***CLIENT ID***'
    client_secret: '***SECRET***'
    current_account: true # only if you the current account
```
{% configuration %}
client_id:
  description: Your Monzo developer client id
  required: true
  type: string
client_secret:
  description: Your Monzo developer secret
  required: true
  type: string
name:
  description: The name you would like to give to the sensor
  required: false
  type: string
cache_path:
  description: The location to store cache relating to the document (must be unique if multiple sensors are added for multiple accounts)
  required: false
  type: string
current_account:
  description: Add this and set it to true if you have upgraded to the current account.
  required: false
  type: string

{% endconfiguration %}

<p class='note'>
If you want to use the sensor with multiple accounts ensure you have added all the users to the "collaborators" in the OAuth client registration with monzo, and configure a differant location for the cache_path in hass.
</p>

### {% linkable_title Authenticating With Monzo %}

1. After you have signed up for a developers account, registered your oAuth client, and updated your configuration you should restart Home Assistant
2. You should see a button which says "Configure" next to Monzo Balance. Click the configure link
3. Click the "Link Monzo Account" button
4. You should be taken to the Monzo app and see the app name you entered when you created the oAuth client. Click the "Authorise app" button
5. Enter your account e-mail address, and click submit
6. Check your e-mail and click the "Log in to monzo" button
7. A file called monzo will be downloaded. This is not needed and can be deleted
8. If you switch back to Home Assistant you should see the configuration option has gone and your sensor has been created.