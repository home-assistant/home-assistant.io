title: Duwi Smart Hub
description: Duwi Smart Hub Integration allows users to easily connect and manage their Duwi Smart devices directly from Home Assistant. You can control, monitor, and automate your Duwi Smart enabled devices like lights, switches, and covers. Simplify your home automation tasks with Duwi Smart Hub Integration.
ha_category:
- Cover
- Light
- Switch
  ha_iot_class: Cloud Push
  ha_release: 0.74
  ha_config_flow: true
  ha_domain: duwi
  ha_codeowners:
- '@duwi2024'
  ha_platforms:
- cover
- light
- switch
  ha_dhcp: false
  ha_integration_type: hub

------

### Prerequisite



To integrate with the Duwi Smart application, please follow the steps below:



1.  **Obtain the Application Key**: Request a free App Key and Secret by sending an email to [lujunquan@duwi.com.cn](mailto:lujunquan@duwi.com.cn). These credentials are necessary for the authentication process that follows. 
2.  **Install the Duwi Smart Application**: 

- - Download and install the Duwi Smart application.
  - Create a new account.
  - Add at least one house to your account, ensuring that the house is equipped with available devices.



### Obtaining the Login User Code



To synchronize the device information from the Duwi Smart system to Home Assistant, you need to obtain a login user code by following these steps:



1.  During the login process, use the previously obtained App Key and Secret in conjunction with your phone number and password from the application. 
2.  Once logged in successfully, the application will display your house information, floor information, and device details. 
3.  Synchronize this information to the Home Assistant system. This step allows you to control the devices in the Duwi Smart application directly through Home Assistant. 



Ensure you follow security best practices by not storing or sharing your login information, including your phone number, password, App Key, and Secret, in any insecure locations.