---
title: Google Smart Device Management
description: Setup for Google Smart Device Management API integration
ha_category:
  - Camera
  - Climate
  - Display
  - Doorbell
  - Sensor
ha_release: 0.117
ha_iot_class: Cloud Push
ha_config_flow: true
ha_domain: google_sdm
ha_codeowners:
  - '@USA-RedDragon'
---

The `google_sdm` integration acts as replacement for the [Nest](https://www.home-assistant.io/integrations/nest/) platform. This is because Google's [Smart Device Management API](https://console.nest.google.com/device-access) is the official method (see [Nest Device Access](https://developers.google.com/nest/device-access)) of programmatically accessing Nest devices.

With this service, Google requires a one-time $5 activation fee to start. Also required is your Home Assistant to have an external url, as the API works differently when `redirect_uri` references a private IP address.

Google only has support for Nest devices in this API, but it is generic enough for them to potentially add more partners in the future.

Currently the only device types supported by Google's SDM API are:

- Cameras
- Thermostats
- Displays
- Doorbells

Data updates within this integration is handled by [Google Cloud Pub/Sub](https://cloud.google.com/pubsub/docs/overview), and the current [free tier](https://cloud.google.com/free/) of GCP should more than suffice for single-person use, but please do your homework on the pricing for Pub/Sub.

## First time setup

This assumes you already have a Google Cloud project. If you don't or haven't, please create one in the [Google Cloud Console](https://console.cloud.google.com/projectcreate)

Also assumed is that you have registered for Google's [Smart Device Management API](https://console.nest.google.com/device-access), and are able to create a project.

### Creating an OAuth application

- In Google Cloud, under [API and Service Credentials](https://console.cloud.google.com/apis/credentials), click "Create Credentials" in the top bar, and choose "OAuth client ID".
- For application type, choose "Web application", and name it whatever you'd like.
- Under Authorized redirect URIs, enter `<EXTERNAL_HOME_ASSISTANT_URL>/auth/external/callback`
- Authorized Javascript origins doesn't need to be touched.
- Click save, and note your Client ID and Client Secret. You will need these later.

### Creating a project in SDM

- In Google's [SDM Console](https://console.nest.google.com/device-access/project-list), click "Create project".
- Name it whatever you'd like.
- For the OAuth client ID, use the one created earlier.
- Make sure to enable Events.
- The project should create, and bring you to a new page.
- On this new page, note the Project ID towards the top, you will need this later.

### Creating a Google Pub/Sub service account

Next, you need to create a Service Account key in the [Google Cloud API Console](https://console.cloud.google.com/apis/credentials/serviceaccountkey)

- Choose a new "New Service Account", give it a name and leave the key type as JSON
- Select the role: Pub/Sub Subscriber

This will download the Service Account JSON key to your machine. Do NOT share this with anyone. Place this file in your Home Assistant configuration folder.

## Configuration

Add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
google_sdm:
  client_id: YOUR_OAUTH_CLIENT_ID
  client_secret: YOUR_OAUTH_CLIENT_SECRET
  project_id: YOUR_SDM_PROJECT_ID
  service_account: !include SERVICE_ACCOUNT.JSON
```

Finish by adding this integration via Configuration -> Integrations in Home Assistant, and it will take you through the OAuth flow to authorize with Google. Note that it will show a bypassable "error" about your application not being published yet; this is safe to ignore.

{% configuration %}
client_id:
  description: The OAuth client ID from [Google Cloud APIs and Service Credentials](https://console.cloud.google.com/apis/credentials)
  required: true
  type: string
client_secret:
  description: The OAuth client secret from [Google Cloud APIs and Service Credentials](https://console.cloud.google.com/apis/credentials)
  required: true
  type: string
project_id:
  description: The project ID in the [Google Device Access Console](https://console.nest.google.com/device-access/project-list)
  required: true
  type: string
service_account:
  description: Service account information. You can use an include statement with your downloaded JSON file, enter data here directly or use secrets file to populate. Found in [Google Cloud IAM & Admin](https://console.cloud.google.com/iam-admin/serviceaccounts)
  required: true
  type: map
  keys:
    private_key:
      description: Private key in PEM format
      required: true
      type: string
    client_email:
      description: Service email address
      required: true
      type: string
subscription:

{% endconfiguration %}
