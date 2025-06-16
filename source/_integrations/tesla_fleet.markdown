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

The **Tesla Fleet** {% term integration %} lets you control Tesla vehicles and energy sites using the [Tesla Fleet API](https://developer.tesla.com/).

## Prerequisites

You need to configure developer credentials and host a public key file to allow Home Assistant to communicate with your Tesla account.

- A [Tesla](https://tesla.com) account with verified email
- A web domain to host your public key file:
  - [NGINX Home Assistant SSL proxy Add-on](https://github.com/home-assistant/addons/blob/master/nginx_proxy/DOCS.md) (recommended)
  - External hosting service ([FleetKey.cc](https://fleetkey.cc), [MyTeslamate.com](https://app.myteslamate.com/fleet), etc.)

{% note %}
The setup process involves creating encryption keys, registering a Tesla Developer Application, and connecting your Tesla account to Home Assistant. Tesla requires a publicly accessible domain with a valid certificate to verify your application's identity.
{% endnote %}
{% warning %}
The China region is currently not supported by this {% term integration %}.
{% endwarning %}

## Configuration


To set up the Tesla Fleet integration, you need to first generate encryption keys and create a Tesla Developer Application.

### Step 1: Generate encryption keys

Choose the method that matches your hosting setup:

{% details "Using NGINX Home Assistant SSL proxy Add-on (recommended)" %}

This method works if you have the [NGINX Home Assistant SSL proxy Add-on](https://github.com/home-assistant/addons/blob/master/nginx_proxy/DOCS.md) running for external access to Home Assistant.

1. Open an SSH Terminal using the [Terminal & SSH Add-on](https://www.home-assistant.io/common-tasks/os#installing-and-using-the-ssh-add-on).

2. Create your private key:

   ```shell
   openssl ecparam -name prime256v1 -genkey -noout -out tesla_fleet.key

   ```shell
   openssl ec -in tesla_fleet.key -pubout -out public-key.pem
   ```

### Set up the keys for Home Assistant

1. Copy the private key to your Home Assistant configuration:

   ```shell
   cp tesla_fleet.key /config/tesla_fleet.key
   ```

2. Create the directory for the public key:

   ```shell
   mkdir -p /share/tesla/.well-known/appspecific/
   ```

3. Copy the public key to the web-accessible location:

   ```shell
   cp public-key.pem /share/tesla/.well-known/appspecific/com.tesla.3p.public-key.pem
   ```

### Configure NGINX

1. Create the NGINX configuration:

   ```shell
   echo 'location /.well-known/appspecific/com.tesla.3p.public-key.pem {
     root /share/tesla;
   }' > /share/nginx_proxy_default_tesla.conf
   ```

2. Configure the NGINX Add-on:
   - Go to **Settings** > **Add-ons** > **NGINX Home Assistant SSL proxy** > **Configuration**
   - Change `customize.active` from `false` to `true`
   - Leave `config.default` at its default value: `nginx_proxy_default*.conf`

3. Restart the NGINX Add-on and verify your public key is accessible at:
   `https://yourdomain.com/.well-known/appspecific/com.tesla.3p.public-key.pem`

4. Backup your keys in a safe location for future use.

{% enddetails %}

{% details "Using external web hosting" %}

Use this method if you have your own web hosting or prefer using a third-party service.

1. **Open a terminal** on your computer.

2. **Create your private key**:

   ```shell
   openssl ecparam -name prime256v1 -genkey -noout -out tesla_fleet.key
   ```

3. **Create the public key**:

   ```shell
   openssl ec -in tesla_fleet.key -pubout -out public-key.pem
   ```

4. **Rename the public key** file:

   ```shell
   mv public-key.pem com.tesla.3p.public-key.pem
   ```

### Set up hosting

5. **Upload the public key** to your web hosting at the exact path:
   `/.well-known/appspecific/com.tesla.3p.public-key.pem`

   {% important %}
   The file must be accessible at `https://yourdomain.com/.well-known/appspecific/com.tesla.3p.public-key.pem` with no redirects.
   {% endimportant %}

6. **Copy the private key** to your Home Assistant configuration directory:

   ```shell
   cp tesla_fleet.key /config/tesla_fleet.key
   ```

7. **Backup both key files** in a safe location for future use.

{% enddetails %}

### Step 2: Create Tesla Developer Application

Now you'll create a Tesla Developer Application to connect Home Assistant with Tesla's API.

1. Set up your Tesla Developer account at [developer.tesla.com](https://developer.tesla.com/teslaaccount):
   - Verify your email address
   - Enable multi-factor authentication (optional)

2. Create a new application:
   - Go to [developer.tesla.com/request](https://developer.tesla.com/request)
   - Start the application request process

3. Complete registration:
   - Select your account: Choose your Tesla account from the dropdown

4. Enter application details:
   - Application name: A name to identify the application
   - Description: Enter a brief description of your integration
   - Purpose of Usage: Explain how you'll use the API (e.g., "Home automation integration")

5. Configure client details:
   - OAuth Grant Type: Select **Authorization Code and Machine-to-Machine**
   - Allowed Origin URL(s): Enter your domain (example: `https://yourdomain.com/`)
   - Allowed Redirect URI: Enter `https://my.home-assistant.io/redirect/oauth`
   - Allowed Returned URL(s): Leave this field empty (not required)

6. Select API scopes:

   {% important %}
   You must select at least **Vehicle Information** OR **Energy Product Information** for the {% term integration %} to work.
   {% endimportant %}

   Recommended scopes for full functionality:
   - Vehicle Information
   - Vehicle Location
   - Vehicle Commands
   - Energy Product Information
   - Energy Product Settings

   {% note %}
   You can change scopes later, but you'll need to reconfigure the entire integration.
   {% endnote %}

7. Set up billing (optional):
   - Tesla provides $10 monthly credit for personal use
   - Most personal usage stays within the free tier
   - You can add billing details later if needed

8. Save your credentials:
   - After creating the application, go to **View Details** > **Credentials & APIs**
   - Note your **Client ID** and **Client Secret** - you'll need these for Home Assistant

### Step 3: Register as Tesla Fleet API partner

Before you can use your application, you need to register it as an official Tesla Fleet API partner.

{% warning %}
The following steps involve sensitive credentials. Never share your Client Secret or access tokens.
{% endwarning %}

### Get an access token

1. Prepare your credentials from the Tesla Developer Dashboard:
   - Client ID
   - Client Secret

2. Choose your region URL:
   - North America/Asia-Pacific: `https://fleet-api.prd.na.vn.cloud.tesla.com`
   - Europe/Middle East/Africa: `https://fleet-api.prd.eu.vn.cloud.tesla.com`


3. Get your access token by running this command (replace the variables):

   ```shell
   curl --request POST \
     --header 'Content-Type: application/x-www-form-urlencoded' \
     --data-urlencode 'grant_type=client_credentials' \
     --data-urlencode 'client_id=YOUR_CLIENT_ID' \
     --data-urlencode 'client_secret=YOUR_CLIENT_SECRET' \
     --data-urlencode 'scope=openid vehicle_device_data vehicle_cmds vehicle_charging_cmds' \
     --data-urlencode 'audience=YOUR_REGION_URL' \
     'https://fleet-auth.prd.vn.cloud.tesla.com/oauth2/v3/token'
   ```

   {% note %}
   If your Client Secret contains `!` or `$` characters, you may need to escape them depending on your terminal.
   {% endnote %}

4. Copy the access token from the response:

   ```json
   {"access_token":"YOUR_ACCESS_TOKEN","expires_in":28800,"token_type":"Bearer"}
   ```

### Register as a partner

5. Register your domain with Tesla (replace YOUR_ACCESS_TOKEN and your domain):

   ```shell
   curl --location 'YOUR_REGION_URL/api/1/partner_accounts' \
   --header 'Content-Type: application/json' \
   --header 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
   --data '{
       "domain": "yourdomain.com"
   }'
   ```

6. Verify success - you should see a response with your application details and pricing information.

### Step 4: Connect to Home Assistant

{% include integrations/config_flow.md %}

1. Start the integration setup:
   - In Home Assistant, go to {% my integrations title="**Settings** > **Devices & services**" %}
   - Select **Add Integration** and search for **Tesla Fleet**

2. Enter your application details:
   - **Application name**: Enter the name you used when creating your Tesla Developer Application
   - **Client ID: From** your Tesla Developer Dashboard
   - **Client Secret**: From your Tesla Developer Dashboard

3. Authenticate with Tesla:
   - You'll be redirected to Tesla's login page
   - Enter your Tesla account credentials
   - On the authorization page, select **Select All** and then **Allow**

4. Complete the setup:
   - Confirm you want to **Link account to Home Assistant**
   - The {% term integration %} will automatically discover your Tesla vehicles and energy products

{% tip %}
If you encounter any issues during setup, check the troubleshooting section below for common solutions.
{% endtip %}

## Data updates

The {% term integration %} {% term polling polls %} each vehicle every 10 minutes while it's awake. This is designed to stay within Tesla's $10 monthly credit for most users. Energy product APIs are free to use.

{% note %}
Tesla charges for API calls starting January 2025. The default polling interval is optimized to stay within the free tier for typical usage.
{% endnote %}

If you need different polling intervals, you can [define a custom polling interval](https://www.home-assistant.io/common-tasks/general/#defining-a-custom-polling-interval).

## Scopes and billing

When connecting your Tesla account, you **must** select at least one of **Vehicle Information** or **Energy Product Information**. All scopes are recommended for full functionality.

Tesla provides a $10 monthly credit for personal API usage. You can monitor usage in your [Tesla Developer Dashboard](https://developer.tesla.com/en_US/dashboard).

## Command signing

Certain vehicles, including all vehicles manufactured since late 2023, require vehicle commands to be signed with a private key. All {% term actions %} on vehicle {% term entities %} will fail with an error if this is required and the key has not been setup correctly.

The {% term integration %} expects your private key to be located at `config/tesla_fleet.key`. This should be the same private key file (`tesla_fleet.key`) that you created during the prerequisites setup, copied to this location as instructed in the setup steps above.

Your public key must be added to each of your vehicles by visiting `https://tesla.com/_ak/YOUR_DOMAIN` and following the instructions in the Tesla app.
If you're using an iPhone, you may need to use Safari to open the webpage and finish the setup.

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

Constant API {% term polling %} will prevent most Model S and Model X vehicles manufactured before 2021 from sleeping. The {% term integration %} automatically stops {% term polling %} these vehicles for 15 minutes after inactivity. You can call the `homeassistant.update_entity` {% term action %} to force {% term polling %}, which will reset the timer.

## Removing the integration

{% include integrations/remove_device_service.md %}

- Removing the {% term integration %} does not delete your Tesla Developer Application - you can remove it manually from the [Tesla Developer Dashboard](https://developer.tesla.com/en_US/dashboard) if no longer needed.

## Troubleshooting

- **Setup errors**: Verify your public key is accessible at the correct URL and you've completed all registration steps with Tesla
- **Command failures**: Ensure `tesla_fleet.key` exists in your Home Assistant config directory and add your public key to vehicles via `https://tesla.com/_ak/YOUR_DOMAIN`
- **{% term Integration %} stopped working**: Use the reconfigure option in {% my integrations title="**Settings** > **Devices & services**" %} > **Tesla Fleet**
- **Billing errors**: Check your Tesla Developer Dashboard for usage limits and add billing information if needed

If you have an error with your credentials, you can delete them in the {% my application_credentials title="Application Credentials" %} user interface.
