---
title: Duwi
description: A document on how to configure Duwi integration in HomeAssistant.
ha_category:
  - Switch
ha_iot_class: Cloud Push
ha_release: 2024.10
ha_config_flow: true
ha_domain: duwi
ha_codeowners:
  - '@duwi2024'
ha_platforms:
  - switch
ha_integration_type: hub
---

### Prerequisite

To integrate with the Duwi Smart application, please follow these steps:

1. **Obtain Application Key**: You can apply to become a developer for Duwi Smart Home by logging into your account on
   the Duwi Smart app and navigating to the "Developer Authentication" section under personal settings. After submitting
   your application, you should receive the necessary App Key and App Secret within approximately 1-2 business days.
   These credentials will be required on the first page of the configuration flow.
2. **Install the Duwi Smart Application**:
    - Download and install the Duwi Smart app.
    - Create a new account.
    - Add at least one house to your account, making sure it is equipped with available devices.

<p class='img'>
  <img src='/images/integrations/duwi/image001.png' alt="Duwi Integration Setup Step 1"/>
  <img src='/images/integrations/duwi/image002.png' alt="Duwi Integration Setup Step 2"/>
</p>

{% include integrations/config_flow.md %}

### Obtaining the Login User Code

To synchronize device information from the Duwi Smart system to Home Assistant, obtain a login user code by:

1. Using the App Key and Secret with your phone number and password from the application during the login process.
2. Once logged in successfully, the application will display your house information and device details.
3. Synchronize this information to the Home Assistant system, allowing you to control devices in the Duwi Smart
   application directly through Home Assistant.

<p class='img'>
  <img src='/images/integrations/duwi/image003.png' alt="Duwi Integration Final Step"/>
</p>

Remember to follow security best practices by not storing or sharing your login information, including your api_key,
secret, phone, and password, in any insecure locations.

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