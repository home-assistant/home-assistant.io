---
title: Jenkins
description: Instructions on how to integrate Jenkins with Home Assistant.
ha_category:
  - Sensor
ha_release: 0.109
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - 'jadlers' 
  - 'Callet91'
ha_domain: jenkins
---

Jenkins is a tool for setting up pipelines that manages continuous integration and deployment.  The `jenkins` integration is a sensor for listening on your Jenkins server and send you updates when jobs are executed to Home Assistant.  

## Configuration via the frontend

Menu: **Configuration** -> **Integrations**.

Click on the `+` sign to add an integration and click on **Jenkins** to start the configuration.

- First, specify the url to your Jenkins server and your login credentials. If you have enabled "anonymously read" in Jenkins under **Manage Jenkins** -> **Configure Global Security** -> **Authorization** you don't have to specify your login credentials. 
- Second, select the job you like to monitor. 

After completing the configuration flow, the Jenkins integration will be available.

## Sensor

This integration provides a sensor with the following information from Jenkins:

- Job name.
- Job status [SUCCESS/FAILURE].
- Build Number.
- Build Time.
- Build Duration. 
- Jenkins build URL. 
- Repository URL. 
