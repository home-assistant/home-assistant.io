---
title: Duwi
description: The Duwi Integration allows users to easily connect and manage their Duwi Smart devices directly from Home Assistant. Control, monitor, and automate your Duwi Smart-enabled devices like lights, switches, and covers. Simplify your home automation tasks with the Duwi Integration.
ha_category:
- Cover
- Light
- Switch
ha_iot_class: Cloud Push
ha_release: 2024.5.4
ha_config_flow: true
ha_domain: duwi
ha_codeowners:
- '@duwi2024'
- '@Ledgerbiggg'
ha_platforms:
- cover
- light
- switch
ha_dhcp: false
ha_integration_type: hub
---

### Prerequisite

To integrate with the Duwi Smart application, please follow these steps:

1. **Obtain the Application Key**: Request a free App Key and Secret by sending an email to [lujunquan@duwi.com.cn](mailto:lujunquan@duwi.com.cn). These credentials are necessary for the authentication process.
2. **Install the Duwi Smart Application**:
   - Download and install the Duwi Smart application.
   - Create a new account.
   - Add at least one house to your account, ensuring it is equipped with available devices.


### Obtaining the Login User Code

To synchronize device information from the Duwi Smart system to Home Assistant, obtain a login user code by:

1. Using the App Key and Secret with your phone number and password from the application during the login process.
2. Once logged in successfully, the application will display your house information and device details.
3. Synchronize this information to the Home Assistant system, allowing you to control devices in the Duwi Smart application directly through Home Assistant.

Remember to follow security best practices by not storing or sharing your login information, including your phone number, password, App Key, and Secret, in any insecure locations.

{% configuration %}
api_key:
  description: "Your Duwi Application Key."
  required: true
  type: string
secret:
  description: "Your Application Secret provided by Duwi."
  required: true
  type: string
phone:
  description: "Your phone number used for the Duwi Smart application."
  required: true
  type: string
password:
  description: "Your Duwi Smart application password."
  required: true
  type: string
{% endconfiguration %}