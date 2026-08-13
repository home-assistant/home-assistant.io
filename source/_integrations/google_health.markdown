---
title: Google Health
description: Instructions on how to integrate Google Health within Home Assistant.
ha_release: 2026.7
ha_category:
  - Health
ha_iot_class: Cloud Polling
ha_domain: google_health
ha_codeowners:
  - '@allenporter'
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: service
ha_quality_scale: gold
related:
  - url: https://developers.google.com/health-api
    title: Google Health API
  - url: https://console.cloud.google.com/apis/library/health.googleapis.com
    title: Google Developers Console
---

The **Google Health** {% term integration %} allows you to expose health and fitness data from Google Health (including Fitbit, Pixel Watch, and other devices connected to your Google Account) to Home Assistant.

## Prerequisites

You need to configure developer credentials to allow Home Assistant to access your Google Account. These credentials are the same as the ones for [Google Photos](/integrations/google_photos), [Nest](/integrations/nest), [Google Tasks](/integrations/google_tasks), and [Google Mail](/integrations/google_mail).

If you have already set up the correct credentials, you can enable the API and then skip the consent screen and credential creation steps.

{% details "Generate client ID and client secret" %}

This section explains how to enable the API, configure the consent screen, and generate a client ID and client secret on the Google Developers Console.

1. First, go to the Google Developers Console to enable the [Google Health API](https://console.cloud.google.com/apis/library/health.googleapis.com).
2. Select a project and select **Continue**. Verify that the API is enabled.
3. Go to the [Branding page](https://console.cloud.google.com/auth/branding) in the Google Auth Platform Console.
4. If prompted to configure OAuth, select **Get started** and follow the setup wizard. When the wizard asks for the user type, select **External**, and continue once the OAuth consent configuration is created.
5. Select **Branding** in the left sidebar. Fill in the required fields:
   - **App name**: Enter a name (like *Home Assistant*). This is shown during the OAuth login flow.
   - **User support email**: Select your Google Account email.
   - **Developer contact email**: Enter your email address.
   Leave all other fields empty to avoid triggering Google's verification process. Select **Save**.
6. Select **Audience** in the left sidebar.
   - Under **User type**, confirm it shows **External**.
   - Under **Test users**, select **+ Add users** and add your Google Account email address. Select **Save**.
7. Under **Publishing status**, select **Publish app** to set the status to **In production**. Make sure the status is not **Testing**, or your authentication token will expire every 7 days.
8. Select **Credentials** in the left sidebar.
9. Select **Create Credentials** at the top of the page, then select **OAuth client ID**.
10. Set the Application type to **Web application** and give these credentials a name (like *Home Assistant Credentials*).
11. Under **Authorized redirect URIs**, enter `https://my.home-assistant.io/redirect/oauth` and select **Create**. This is not a placeholder and is the URI that must be used.
12. Copy the **Client ID** and **Client Secret** from the pop-up, or select the pencil icon next to your client ID to view them later.

{% enddetails %}

{% include integrations/config_flow.md %}

The integration setup will next give you instructions to enter the [Application Credentials](/integrations/application_credentials/) (OAuth Client ID and Client Secret) and authorize Home Assistant to access your Google Health data.

{% details "OAuth and authorization steps" %}

1. Continue through the steps of selecting the Google Account you want to authorize.
2. You will be asked to grant access to specific data in your Google Health account. The integration will dynamically adjust based on the permissions you grant:
    - **Profile** (required): Allows Home Assistant to verify your account identity.
    - **Activity and fitness** (optional): Granting this scope creates sensors for steps, distance, active calories, total calories, and floors.
    - **Health metrics and measurements** (optional): Granting this scope creates sensors for weight, resting heart rate, and body fat.
    - **Sleep data** (optional): Granting this scope creates sensors for time asleep, time awake, time in bed, time to fall asleep, and time after wake-up.
    - **Nutrition and hydration** (optional): Granting this scope creates sensors for hydration and calories consumed.
    - **Paired devices** (optional): Granting this scope creates diagnostic sensors for battery level and last sync time for your paired wearables or devices.
3. You may get a message telling you that the app has not been verified. Acknowledge this to proceed.
4. You can now see the details of what you are authorizing Home Assistant to access with options at the bottom. Select **Continue**.
5. The page will now display **Link account to Home Assistant?**, noting **Your instance URL**. If this is not correct, refer to [My Home Assistant](/integrations/my). If everything looks good, select **Link Account**.
6. You may close the window and return to Home Assistant, where you should see a **Success!** message.

{% enddetails %}

## Supported functionality

The **Google Health** integration provides the following entities:

### Sensors

**Activity sensors**

*Available for accounts that grant the Activity and fitness scope.*

- **Active calories**: Daily active energy burned.
- **Distance**: Daily distance.
- **Floors**: Daily floors climbed.
- **Steps**: Daily step count.
- **Total calories**: Daily total calories burned.

**Body sensors**

*Available for accounts that grant the Health metrics and measurements scope.*

- **Body fat**: Body fat percentage.
- **Resting heart rate**: Daily resting heart rate.
- **Weight**: Body weight.

**Sleep sensors**

*Available for accounts that grant the Sleep data scope.*

- **Time asleep**: Duration spent asleep during the sleep period.
- **Time awake**: Duration spent awake during the sleep period.
- **Time in bed**: Total duration spent in bed during the sleep period.
- **Time to fall asleep**: Duration taken to fall asleep.
- **Time after wake-up**: Duration spent in bed after waking up.

**Nutrition sensors**

*Available for accounts that grant the Nutrition and hydration scope.*

- **Calories consumed**: Daily energy consumed.
- **Hydration**: Daily volume of liquids consumed.

**Paired device sensors**

*Available for accounts that grant the Paired devices scope.*

- **Battery level** *(Diagnostic)*: Battery percentage of paired fitness trackers or smartwatches.
- **Last sync time** *(Diagnostic)*: Timestamp when the paired fitness tracker or smartwatch last synced data to Google Health.

## Google Health automation examples

The real power of this integration is automating your home environment or notifications based on your health metrics. Here are a few ideas to get you started.

{% include docs/paste_yaml_tip.md %}

### Automation: Step goal reminder

Send a notification in the evening if you have not met your daily step goal.

- **Trigger**: Time: 20:00 (8:00 PM)
- **Condition**: Numeric state: steps sensor is below your goal (for example, 10,000 steps)
- **Action**: Send a notification to your mobile phone

{% details "YAML example for step goal reminder" %}

{% example %}
automation: |
  alias: "Reminder to meet daily step goal"
  triggers:
    - trigger: time
      at: "20:00:00"
  conditions:
    - condition: numeric_state
      entity_id: sensor.google_health_steps
      below: 10000
  actions:
    - action: notify.mobile_app_your_phone
      data:
        message: >
          You have only completed
          {{ states('sensor.google_health_steps') }} steps today.
          Time for a short walk!
{% endexample %}

{% enddetails %}

### Automation: Resting heart rate alert

Notify you if your daily resting heart rate goes above a certain threshold (for example, 80 bpm), which could indicate fatigue or stress.

- **Trigger**: State: resting heart rate sensor state changes
- **Condition**: Numeric state: resting heart rate is above 80 bpm
- **Action**: Send a notification

{% details "YAML example for resting heart rate alert" %}

{% example %}
automation: |
  alias: "Alert on high resting heart rate"
  triggers:
    - trigger: state
      entity_id: sensor.google_health_resting_heart_rate
  conditions:
    - condition: numeric_state
      entity_id: sensor.google_health_resting_heart_rate
      above: 80
  actions:
    - action: notify.mobile_app_your_phone
      data:
        message: >
          Your resting heart rate is higher than usual at
          {{ states('sensor.google_health_resting_heart_rate') }}
          bpm. Make sure to rest!
{% endexample %}

{% enddetails %}

## Data updates

The integration updates sensors on different intervals based on the data type:

- Activity sensors (Steps, Distance, Active calories, Total calories, Floors) are updated every 15 minutes.
- Sleep sensors (Time asleep, Time awake, Time in bed, Time to fall asleep, Time after wake-up) are updated every 15 minutes.
- Nutrition sensors (Hydration, Calories consumed) are updated every 15 minutes.
- Body sensors (Weight, Resting heart rate, Body fat) are updated every hour.
- Paired device sensors (Battery level, Last sync time) are updated every hour.

## Known limitations

- **Polling frequency**: Data is fetched from the Google Health API periodically (every 15 minutes for activity, sleep, and nutrition data; every hour for body measurements and paired devices). Real-time event streaming is not supported.
- **Device sync latency**: Data displayed in Home Assistant depends on when your fitness tracker, smartwatch, or mobile app syncs its data to Google Health cloud servers.
- **Scope-dependent entities**: Entities are created dynamically based on the permission scopes granted during the initial OAuth authorization. If a specific scope is unselected, entities for that category will not be created.
- **Daily rollups**: Activity and sleep sensors reflect cumulative daily totals or aggregate summary metrics for the current calendar day.

## Troubleshooting

### Resetting a broken or incorrect configuration

If the Google Health integration was initially configured incorrectly, you can delete the credentials in the [Application Credentials](/integrations/application_credentials/) user interface and start the setup again.

### Connection failed after authorization

If authorization appears to succeed but Home Assistant returns a connection error, verify that you granted the required **Profile** permission. Home Assistant requires the profile scope to verify your account identity and setup the integration.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
