---
title: Free Mobile
description: Instructions on how to add user notifications to Home Assistant.
ha_category:
  - Notifications
ha_release: 0.11
ha_iot_class: Cloud Push
ha_domain: free_mobile
ha_platforms:
  - notify
---

The `free_mobile` platform is using the French mobile operator [Free Mobile](http://mobile.free.fr/) to send SMS to your own cell phone. 

Before doing anything, you have to activate the SMS API option in your Free Mobile account (In "Gérer mon compte -> Mes Options"). Activating this option will automatically generate a token which is required in your configuration.

<p class='img'>
<img src='/images/integrations/free_mobile/token.png' />
</p>

This API only send classic SMS and only on the cell phone of the account owner. So you only have to provide a text message in your payload.

<div class='note warning'>
If you disable and re-enable the SMS API option, please be sure to update your token in your configuration.
</div>

To enable SMS notifications in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
notify:
  - name: NOTIFIER_NAME
    platform: free_mobile
    username: YOUR_ACCOUNT_ID
    access_token: TOKEN
```

{% configuration %}
name:
  description: "The optional parameter name allows multiple notifiers to be created. The notifier will bind to the service notify.NOTIFIER_NAME."
  required: false
  type: string
  default: notify
username:
  description: This is the id given by FreeMobile to access to your online account.
  required: true
  type: string
access_token:
  description: You can get this token by activating the SMS API in your online account.
  required: true
  type: string
{% endconfiguration %}
