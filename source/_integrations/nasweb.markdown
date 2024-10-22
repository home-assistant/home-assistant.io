---
title: NASweb
description: Integrate NASweb devices
ha_category:
  - Switch
ha_release: '2024.11'
ha_codeowners:
  - '@nasWebio'
ha_iot_class: Local Push
ha_domain: nasweb
featured: true
ha_config_flow: true
ha_platforms:
  - switch
ha_integration_type: hub
---

  ![](/images/integrations/nasweb/nasweb_scheme.png)

NASweb combines the functions of a control panel and the ability to manage building automation. The device monitors the flow of information from sensors and programmable switches and stores settings, definitions and configured actions.\
[MORE INFO](https://www.chomtech.pl/produkt/naswebio-multisystemowy-sterownik-automatyki-budynkowej/)

## NASweb device configuration for Home Assistant

Log into device `NASweb` page:

`https://` + `Device IP` + `/nasweb` (for example: `https://192.168.117.230/nasweb`)

Click on your user in top-right corner and select `Administrators` on pop-up user panel:

  ![](/images/integrations/nasweb/dashboard.png)

Find user which will be used by Home Assistant to access NASweb API and click `EDIT` button:

<div class='note warning'>

User `admin` cannot be used for this purpose, select user with different username

</div>

  ![](/images/integrations/nasweb/users.png)

In `Modules` left-hand column lists available modules for this user, find `API` module and click it to move it into right-hand column (`1`), which lists modules enabled for this user, then press `APPLY` (`2`) to save changes:

  ![](/images/integrations/nasweb/modules.png)

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: NASweb device address

User:
  description: Login of user with enabled `API` module

Password:
  description: Password of user with enabled `API` module

{% endconfiguration_basic %}
