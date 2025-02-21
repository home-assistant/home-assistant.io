---
title: Tesla Fleet
description: Instructions on how to integrate the Tesla Fleet API within Home Assistant.
ha_category:
  - Binary sensor
  - Button
  - Car
  - Climate
  - Cover
  - Device tracker
  - Lock
  - Media player
  - Number
  - Select
  - Sensor
  - Switch
ha_release: 2024.8
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@Bre77'
ha_domain: tesla_fleet
ha_platforms:
  - binary_sensor
  - button
  - climate
  - cover
  - device_tracker
  - diagnostics
  - lock
  - media_player
  - number
  - select
  - sensor
  - switch
ha_integration_type: integration
---

The Tesla Fleet API {% term integration %} exposes various sensors from Tesla vehicles and energy sites using the [Tesla Fleet API](https://developer.tesla.com/).

## Prerequisites

You must have:

- A [Tesla](https://tesla.com) account
- A [Developer Application](https://developer.tesla.com/en_US/dashboard)
- A web domain and host that you can serve your public key file from. Some free options include:
  - [FleetKey.cc](https://fleetkey.cc)
  - [AWS S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html)
  - [Cloudflare Pages](https://pages.cloudflare.com/)
  - [Firebase Hosting](https://firebase.google.com/docs/hosting)
  

{% include integrations/config_flow.md %}

{% details "Hosting a Public/Private Key Pair" %}

While the [Tesla Fleet API documentation Step 3](https://developer.tesla.com/docs/fleet-api/getting-started/what-is-fleet-api#step-3-generate-a-public-private-key-pair) mentions this as a later step, it is recommended that you do this first to ensure key reachability before the rest of the integration.

1. Open a new terminal on your computer.
2. Run this command to create a private key: `openssl ecparam -name prime256v1 -genkey -noout -out private-key.pem`
3. Run this command to create and associate a public key with it: `openssl ec -in private-key.pem -pubout -out public-key.pem`
4. Rename the public key file to `com.tesla.3p.public-key.pem`. This needs to be exactly this for Tesla's API to partner with your account correctly.
5. Backup both these files somewhere safe and private for access later.
6. Upload the public key file to your domain at the path `/.well-known/appspecific/com.tesla.3p.public-key.pem`. For example, if your domain is `https://my.domain.com`, the public key file must be accessible at `https://my.domain.com/.well-known/appspecific/com.tesla.3p.public-key.pem`. Do not use redirection logic to handle this, or the Tesla API will not recognize your app later in the process.

{% enddetails %}

{% details "Setting up the Developer Application" %}

These steps are also summarized in the [Tesla Fleet API documentation Step 2](https://developer.tesla.com/docs/fleet-api/getting-started/what-is-fleet-api#step-2-create-an-application), but it is recommended to follow the steps below to cover specific details.

1. If you have not already set up your [Tesla Developer account](https://developer.tesla.com/teslaaccount): Confirm that you have a verified email and multi-factor authentication set up.
2. Navigate to the [Developer dashboard](https://developer.tesla.com/en_US/dashboard). Change your locale if needed to wherever your account is based, using the globe icon at the top-right corner.
3. Select **Create New Application**. This should launch a new page with the header **Create Fleet API Application**.
4. For simple integrations, under **Registration Type**, select **Just for me**. If you're confident about your situation being a business setup instead, select **For my business**. Select **Next**.
5. At the **Application Details** step, use a name that is easy to refer to later, such as `ha-integration`. This will be needed later while configuring the integration. Select **Next**.
6. At the **Client Details** step, under **Oauth Grant Type**, select **Authorization Code and Machine-to-Machine**.
   - Under **Allowed Origin URL(s)**, enter your domain where you hosted your public key earlier. Using the example above, this would be `https://my.domain.com/`.
   - Under **Allowed Redirect URI(s)**, enter `https://my.home-assistant.io/redirect/oauth`.
   - Select **Next**.
7. At the **API & Scopes** step, select the configurations you'd like to access.
   - At least one of `Vehicle Information` or `Energy Product Information` **must** be selected for the integration to function. It is recommended you select all scopes for full functionality.
   - If you're unsure, you can select only one of these two required scopes for now and update the scopes later from the Developer Dashboard. However, note that if the scopes are updated, you will need to reconfigure the integration fully (refer to the **Integration is broken and needs to be reconfigured** troubleshooting steps below).
   - Select **Next**.
8. At the **Billing Details (Optional)** step, enter your billing details if needed, then select **Submit**. Tesla does not support billing in all countries yet. **Developers in countries that do not yet support payments will not see this step**.
   - Tesla provides a $10 monthly credit for personal API usage, so your level of usage may be covered for free. Detailed pricing info for commands, data polling, and wake signals can be found at [developer.tesla.com](https://developer.tesla.com). Use these details to calculate your usage estimate if you rely heavily on this integration.
   - If unsure, you can select **Skip & Submit** for now and add the billing details later when your usage is close to the free threshold.
9. Your developer application is ready for use!

{% enddetails %}

{% details "Register your application as a Fleet API partner" %}

These steps are also summarized in the [Tesla Fleet API documentation Step 4](https://developer.tesla.com/docs/fleet-api/getting-started/what-is-fleet-api#step-4-call-the-register-endpoint), but the steps below provide easier copy-pasteable code and additional checks.

{% warning %}
The following steps involve sensitive credentials. Never share your `Client Secret` or access token with anyone directly, and ensure you're working in a secure environment.
{% endwarning %}

1. Get your OAuth details by going to your [Developer dashboard](https://developer.tesla.com/en_US/dashboard). Under the app you set up for Home Assistant integration select **View Details**. Then, select the **Credentials & APIs** tab. Note the `Client ID` and `Client Secret` strings.

2. Run this CURL request, replacing the variable values as specified in the notes below:
  
   ```shell
   CLIENT_ID=REPLACE_THIS_WITH_YOUR_CLIENT_ID
   CLIENT_SECRET=REPLACE_THIS_WITH_YOUR_CLIENT_SECRET
   AUDIENCE="https://fleet-api.prd.na.vn.cloud.tesla.com"
   curl --request POST \
     --header 'Content-Type: application/x-www-form-urlencoded' \
     --data-urlencode 'grant_type=client_credentials' \
     --data-urlencode "client_id=$CLIENT_ID" \
     --data-urlencode "client_secret=$CLIENT_SECRET" \
     --data-urlencode 'scope=openid vehicle_device_data vehicle_cmds vehicle_charging_cmds' \
     --data-urlencode "audience=$AUDIENCE" \
     'https://fleet-auth.prd.vn.cloud.tesla.com/oauth2/v3/token'
   ```
  
   Notes about the variable values:
   - For the `CLIENT_SECRET` value, depending on your terminal environment, you may need to escape any `!` and `$` characters in the string, or the curl request will fail.
   - Replace the `AUDIENCE` value with your region-specific URL. The URL in the example is for users in North America and Asia-Pacific (excluding China). Refer to the [Base URLs documentation](https://developer.tesla.com/docs/fleet-api/getting-started/base-urls) for the URLs for other regions.
   - For the `scope=...` line, replace the values with a space-delimited list of [the official scope keywords](https://developer.tesla.com/docs/fleet-api/authentication/overview#scopes), as you defined them earlier in your app.
3. The CURL request should return a response that looks something like:
  
   ```json
   {"access_token":"JSON_WEB_TOKEN","expires_in":28800,"token_type":"Bearer"}
   ```
  
   This is your access token. Copy everything between the double-quotes to be used next.
4. Run this CURL request, replacing the variable values as specified in the notes below:
  
   ```shell
   curl --location 'https://fleet-api.prd.na.vn.cloud.tesla.com/api/1/partner_accounts' \
   --header 'Content-Type: application/json' \
   --header 'Authorization: Bearer JSON_WEB_TOKEN' \
   --data '{
       "domain": "my.domain.com"
   }'
   ```
  
   - If you had to change the `AUDIENCE` URL for your region in step 2, update the main domain of the `--location` arg.
   - Replace `LONG_GIBBERISH_ACCESS_TOKEN_STRING` with the access token that you copied in the previous step.
   - In the `domain:` line, enter your domain without the leading `https://` and the trailing `/`.
5. You should see a response that contains information about your Tesla Fleet developer app, pricing info, and such. This confirms that the Tesla Fleet API has successfully registered your developer application as a partner. The hard part is over.

{% enddetails %}

{% details "Linking the Developer Application with Home Assistant" %}

1. Get your OAuth details by going to your [Developer dashboard](https://developer.tesla.com/en_US/dashboard). Select **View Details** under the app you set up for Home Assistant integration. Then, select the **Credentials & APIs** tab. Note the `Client ID` and `Client Secret` strings, these will be needed later.
2. In Home Assistant, the integration wizard should walk you through the default steps. If not already started, scroll above and select the **ADD INTEGRATION TO MY** button to start the integration wizard. The integration will ask you for all of the necessary integration configurations.
3. In the **Add credentials** step in the wizard, enter your Tesla Fleet developer application name (from step 5 in the **Setting up the Developer Application** section above), and the Oauth Client ID and Client Secret (from step 1 above). Select **Submit**.
4. At this step, you should be taken to the Tesla authentication page. You will need to re-enter your Tesla account login credentials.
5. At the confirmation page with the header **Allow ha-integration access to your Tesla Account** (the specific application name will be whatever you set earlier), select the **Select All** button. This list of scopes is already limited to the specific scopes you chose for the application information earlier, so it is not necessary to review them again. Select **Allow**.
6. You should now see a Home Assistant page asking if you would like to **Link account to Home Assistant?**. Select **Link account**.
7. You're all set! The integration should fetch your device details into Home Assistant.

{% enddetails %}

## Scopes

When connecting your Tesla account to Home Assistant, you **must** select at least one of the `Vehicle Information` or `Energy Product Information` scopes. It is recommended you select all scopes for full functionality. The `Vehicle Location` scope was added in Home Assistant 2024.1, so any authorizations performed on previous releases that want this scope will need to be [modified](https://accounts.tesla.com/en_au/account-settings/security?tab=tpty-apps).

## Pay per use

Previously, Tesla restricted this integration to a very modest rate limit. However, from January 2025, accounts in eligible countries will be charged for every API call. Here's what you need to know:

- Tesla provides a $10 credit per developer account per calendar month
- Every vehicle coordinator refresh, vehicle command, and wake up has a cost
- This credit only allows for a maximum of 5000 coordinator refreshes
- Energy product APIs are free to use at this time
- To go beyond the free credit, you must provide payment details to Tesla

For more details, please see [developer.tesla.com](https://developer.tesla.com).

Note that Tesla does not support billing in all countries yet. **Developers in countries that do not yet support payments will not be able to review their billing or usage**. For countries that do support billing, the current billing usage can be viewed at any time by going to your [Developer Dashboard](https://developer.tesla.com/en_US/dashboard), select **View Details** under the app you set up for Home Assistant integration. Then, select the **Application Usage** tab.

## Command signing

Certain vehicles, including all vehicles manufactured since late 2023, require vehicle commands to be signed with a private key. All actions on vehicle entities will fail with an error if this is required and the key has not been setup correctly.

The integration expects your private key to be located at `config/tesla_fleet.key`.

Your public key must be added to each of your vehicles by visiting https://tesla.com/_ak/YOUR.DOMAIN and following the instructions in the Tesla app.

For more details see [Tesla Fleet API vehicle commands documentation](https://developer.tesla.com/docs/fleet-api/endpoints/vehicle-commands#key-pairing).

## Entities

These are the entities available in the Tesla Fleet integration. Not all entities are enabled by default, and not all values are always available.

### Vehicles

| Domain         | Name                                       | Enabled |
| -------------- | ------------------------------------------ | ------- |
| Binary sensor  | Battery heater                             | No      |
| Binary sensor  | Cabin overheat protection actively cooling | No      |
| Binary sensor  | Charge cable                               | Yes     |
| Binary sensor  | Charger has multiple phases                | No      |
| Binary sensor  | Dashcam                                    | No      |
| Binary sensor  | Front driver door                          | Yes     |
| Binary sensor  | Front driver window                        | Yes     |
| Binary sensor  | Front passenger door                       | Yes     |
| Binary sensor  | Front passenger window                     | Yes     |
| Binary sensor  | Preconditioning enabled                    | No      |
| Binary sensor  | Preconditioning                            | No      |
| Binary sensor  | Rear driver door                           | Yes     |
| Binary sensor  | Rear driver window                         | Yes     |
| Binary sensor  | Rear passenger door                        | Yes     |
| Binary sensor  | Rear passenger window                      | Yes     |
| Binary sensor  | Scheduled charging pending                 | No      |
| Binary sensor  | Status                                     | Yes     |
| Binary sensor  | Tire pressure warning front left           | No      |
| Binary sensor  | Tire pressure warning front right          | No      |
| Binary sensor  | Tire pressure warning rear left            | No      |
| Binary sensor  | Tire pressure warning rear right           | No      |
| Binary sensor  | Trip charging                              | No      |
| Binary sensor  | User present                               | Yes     |
| Button         | Flash lights                               | Yes     |
| Button         | HomeLink                                   | Yes     |
| Button         | Honk horn                                  | Yes     |
| Button         | Keyless driving                            | Yes     |
| Button         | Play fart                                  | Yes     |
| Button         | Wake                                       | Yes     |
| Climate        | Cabin overheat protection                  | No      |
| Climate        | Climate                                    | Yes     |
| Cover          | Charge port door                           | Yes     |
| Cover          | Frunk                                      | Yes     |
| Cover          | Sunroof                                    | No      |
| Cover          | Trunk                                      | Yes     |
| Cover          | Vent windows                               | Yes     |
| Device tracker | Location                                   | Yes     |
| Device tracker | Route                                      | Yes     |
| Lock           | Charge cable lock                          | Yes     |
| Lock           | Lock                                       | Yes     |
| Media player   | Media player                               | Yes     |
| Number         | Charge current                             | Yes     |
| Number         | Charge limit                               | Yes     |
| Select         | Seat heater front left                     | Yes     |
| Select         | Seat heater front right                    | Yes     |
| Select         | Seat heater rear center                    | No      |
| Select         | Seat heater rear left                      | No      |
| Select         | Seat heater rear right                     | No      |
| Select         | Seat heater third row left                 | No      |
| Select         | Seat heater third row right                | No      |
| Select         | Steering wheel heater                      | Yes     |
| Sensor         | Battery level                              | Yes     |
| Sensor         | Battery range                              | Yes     |
| Sensor         | Charge cable                               | No      |
| Sensor         | Charge energy added                        | Yes     |
| Sensor         | Charge rate                                | Yes     |
| Sensor         | Charger current                            | Yes     |
| Sensor         | Charger power                              | Yes     |
| Sensor         | Charger voltage                            | Yes     |
| Sensor         | Charging                                   | Yes     |
| Sensor         | Distance to arrival                        | Yes     |
| Sensor         | Driver temperature setting                 | No      |
| Sensor         | Estimate battery range                     | No      |
| Sensor         | Fast charger type                          | No      |
| Sensor         | Ideal battery range                        | No      |
| Sensor         | Inside temperature                         | Yes     |
| Sensor         | Odometer                                   | No      |
| Sensor         | Outside temperature                        | Yes     |
| Sensor         | Passenger temperature setting              | No      |
| Sensor         | Power                                      | No      |
| Sensor         | Shift state                                | No      |
| Sensor         | Speed                                      | No      |
| Sensor         | State of charge at arrival                 | No      |
| Sensor         | Time to arrival                            | Yes     |
| Sensor         | Time to full charge                        | Yes     |
| Sensor         | Tire pressure front left                   | No      |
| Sensor         | Tire pressure front right                  | No      |
| Sensor         | Tire pressure rear left                    | No      |
| Sensor         | Tire pressure rear right                   | No      |
| Sensor         | Traffic delay                              | No      |
| Sensor         | Usable battery level                       | No      |
| Switch         | Auto seat climate left                     | Yes     |
| Switch         | Auto seat climate right                    | Yes     |
| Switch         | Auto steering wheel heater                 | Yes     |
| Switch         | Charge                                     | Yes     |
| Switch         | Defrost                                    | Yes     |
| Switch         | Sentry mode                                | Yes     |

### Energy sites

| Domain        | Name                           | Enabled |
|--------------|--------------------------------|---------|
| Binary sensor | Backup capable                 | Yes     |
| Binary sensor | Grid services active           | Yes     |
| Binary sensor | Grid services enabled          | Yes     |
| Binary sensor | Storm watch active             | Yes     |
| Number        | Backup reserve                 | Yes     |
| Number        | Off grid reserve               | Yes     |
| Select        | Allow export                   | Yes     |
| Select        | Operation mode                 | Yes     |
| Sensor        | Battery power                  | Yes     |
| Sensor        | Consumer imported from battery | No      |
| Sensor        | Consumer imported from generator| No      |
| Sensor        | Consumer imported from grid    | No      |
| Sensor        | Consumer imported from solar   | No      |
| Sensor        | Energy left                    | Yes     |
| Sensor        | Generator exported             | Yes     |
| Sensor        | Generator power                | No      |
| Sensor        | Grid exported                  | Yes     |
| Sensor        | Grid exported from battery     | No      |
| Sensor        | Grid exported from generator   | No      |
| Sensor        | Grid exported from solar       | No      |
| Sensor        | Grid imported                  | No      |
| Sensor        | Grid power                     | Yes     |
| Sensor        | Grid services exported         | No      |
| Sensor        | Grid services imported         | No      |
| Sensor        | Grid services power            | Yes     |
| Sensor        | Home usage                     | Yes     |
| Sensor        | Island status                  | Yes     |
| Sensor        | Load power                     | Yes     |
| Sensor        | Percentage charged             | Yes     |
| Sensor        | Solar exported                 | No      |
| Sensor        | Solar generated                | Yes     |
| Sensor        | Solar power                    | Yes     |
| Sensor        | Total pack energy              | No      |
| Sensor        | Version                        | Yes     |
| Sensor        | VPP backup reserve             | Yes     |
| Switch        | Allow charging from grid       | Yes     |
| Switch        | Storm watch                    | Yes     |

### Wall connector

| Domain | Name        | Enabled |
| ------ | ----------- | ------- |
| Sensor | Fault state | No      |
| Sensor | Power       | Yes     |
| Sensor | State       | Yes     |
| Sensor | Vehicle     | Yes     |

## Vehicle sleep

Constant API polling will prevent most Model S and Model X vehicles manufactured before 2021 from sleeping, so the integration will stop polling these vehicles for 15 minutes, after 15 minutes of inactivity. You can call the `homeassistant.update_entity` service to force polling the API, which will reset the timer.

## Energy dashboard

The Tesla Fleet API only provides power data for Powerwall and Solar products. This means they cannot be used on the energy dashboard directly.

Energy flows can be calculated from `Battery power` and `Grid power` sensors using a [Template Sensor](/integrations/template/) to separate the positive and negative values into positive import and export values.
The `Load power`, `Solar power`, and the templated sensors can then use a [Riemann Sum](/integrations/integration/) to convert their instant power (kW) values into cumulative energy values (kWh),
which then can be used within the energy dashboard.

## Troubleshooting

- **General troubleshooting steps**
  1. Confirm that your vehicle or energy product can be accessed and updates within the official Tesla app. This rules out any issues that are outside the control of Home Assistant or this integration.
  2. For some errors in the integration, waking the vehicle or energy product through the official app, then restarting Home Assistant will sometimes help re-authenticate the connection with Tesla's API. You may be asked to re-authenticate through the Tesla website.

- **Integration is broken or needs to be reconfigured**
  1. Ensure that you have a Tesla developer application ready for usage (refer to the instructions in the **Setting up the Developer Application** section above).
  2. Go to your Tesla Fleet integration page in Home Assistant, then select the **Reconfigure** button to bring the integration wizard up.
     - If the **Reconfigure** button is not visible, clear any Application Credentials related to Tesla Fleet from your Application Credentials page (can be found at `http://homeassistant.local:PORT/config/application_credentials`), then restart Home Assistant. After the restart, navigate to the Tesla Fleet integration page, and the **Reconfigure ** button should be visible.
  3. Follow the steps in the **Linking the Developer Application with Home Assistant** section above.

- **Integration no longer works after the January 2025 API pricing updates**
  1. Refer to the **Integration is broken** troubleshooting steps above.

- **Integration shows `a condition has not been met to process the request`**
  1. Confirm that you've run all the steps from both the **Hosting a Public/Private Key Pair** and **Register your application as a Fleet API partner** sections above.
