---
title: Shark IQ
description: Instructions on how to integrate your Shark IQ vacuum robot with Home Assistant.
ha_category:
  - Vacuum
ha_iot_class: Cloud Polling
ha_release: 0.114
ha_config_flow: true
ha_codeowners:
  - '@amarks'
ha_domain: sharkiq
---

The `sharkiq` integration allows you to control your [Shark IQ](https://www.sharkclean.com/vacuums/robot-vacuums/) vacuum.

<p class='img'>
<img src='/images/screenshots/more-info-dialog-sharkiq.png' />
</p>

<div class='note'>
This platform has been tested and is confirmed to be working with the Shark IQ R101AE robot vacuum with self-empty base but should also work with the R100.
</div>

## Configuration

To add your Shark IQ vacuum to your installation, go to **Configuration** >> **Integrations** in the UI, click the button with + sign and from the list of integrations select Shark IQ.

To add your Shark IQ vacuum  vacuum to your installation manually, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sharkiq:
  - username: USERNAME
    password: PASSWORD
```

{% configuration %}
username:
  description: The username/email address used to log into the SharkClean app.
  required: true
  type: string  
password:
  description: The password used to log into the SharkClean app.
  required: true
  type: string
{% endconfiguration %}

### Services

Currently supported services are:

- `start`
- `pause`
- `stop`
- `return_to_base`
- `locate`
