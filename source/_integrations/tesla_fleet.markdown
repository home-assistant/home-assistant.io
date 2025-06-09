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

## Setup overview

Setting up the Tesla Fleet integration involves three main steps:

1. **Generate encryption keys** - Create public and private keys for secure communication
2. **Set up Tesla Developer Application** - Register your application with Tesla
3. **Connect to Home Assistant** - Link your Tesla account to Home Assistant

The setup requires a web domain to host your public key file. Tesla uses this to verify your application's identity.

## Prerequisites

Before starting, ensure you have:

- A [Tesla](https://tesla.com) account with verified email
- Access to one of these hosting options for your public key:
  - Your Home Assistant installation with the [NGINX Home Assistant SSL proxy Add-on](https://github.com/home-assistant/addons/blob/master/nginx_proxy/DOCS.md) (recommended for most users)
  - A web domain and hosting service like:
    - [MyTeslamate.com](https://app.myteslamate.com/fleet)
    - [AWS S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html)
    - [Cloudflare Pages](https://pages.cloudflare.com/)
    - [Firebase Hosting](https://firebase.google.com/docs/hosting)

## Step 1: Generate encryption keys


{% include integrations/config_flow.md %}

Choose the method that matches your hosting setup:

{% details "Option A: Using NGINX Home Assistant SSL proxy Add-on (recommended)" %}

This method works if you have the [NGINX Home Assistant SSL proxy Add-on](https://github.com/home-assistant/addons/blob/master/nginx_proxy/DOCS.md) running for external access to Home Assistant.

### Generate the keys

1. **Open an SSH Terminal** using the [Terminal & SSH Add-on](https://www.home-assistant.io/common-tasks/os#installing-and-using-the-ssh-add-on).

2. **Create your private key**:

   ```shell
   openssl ecparam -name prime256v1 -genkey -noout -out tesla_fleet.key
   ```

3. **Create the public key**:

   ```shell
   openssl ec -in tesla_fleet.key -pubout -out public-key.pem
   ```

### Set up the keys for Home Assistant

4. **Copy the private key** to your Home Assistant configuration:

   ```shell
   cp tesla_fleet.key /config/tesla_fleet.key
   ```

5. **Create the directory** for the public key:

   ```shell
   mkdir -p /share/tesla/.well-known/appspecific/
   ```

6. **Copy the public key** to the web-accessible location:

   ```shell
   cp public-key.pem /share/tesla/.well-known/appspecific/com.tesla.3p.public-key.pem
   ```

### Configure NGINX

7. **Create the NGINX configuration**:

   ```shell
   echo 'location /.well-known/appspecific/com.tesla.3p.public-key.pem {
     root /share/tesla;
   }' > /share/nginx_proxy_default_tesla.conf
   ```

8. **Configure the NGINX Add-on**:
   - Go to **Settings** → **Add-ons** → **NGINX Home Assistant SSL proxy** → **Configuration**
   - Change `customize.active` from `false` to `true`
   - Leave `config.default` at its default value: `nginx_proxy_default*.conf`

9. **Restart the NGINX Add-on** and verify your public key is accessible at:
   `https://yourdomain.com/.well-known/appspecific/com.tesla.3p.public-key.pem`

10. **Backup your keys** in a safe location for future use.

{% enddetails %}

{% details "Option B: Using external web hosting" %}

Use this method if you have your own web hosting or prefer using a third-party service.

### Generate the keys

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
   cp tesla_fleet.key /path/to/homeassistant/config/tesla_fleet.key
   ```

7. **Backup both key files** in a safe location for future use.

{% enddetails %}

## Step 2: Create Tesla Developer Application

Now you'll create a Tesla Developer Application to connect Home Assistant with Tesla's API.

1. **Set up your Tesla Developer account** at [developer.tesla.com](https://developer.tesla.com/teslaaccount):
   - Verify your email address
   - Enable multi-factor authentication

2. **Create a new application**:
   - Go to the [Developer dashboard](https://developer.tesla.com/en_US/dashboard)
   - Select **Create New Application**

3. **Choose registration type**:
   - Select **Just for me** for personal use
   - Select **For my business** if this is for commercial use

4. **Enter application details**:
   - **Application name**: Use something memorable like `Home Assistant Integration`
   - Note this name - you'll need it when configuring the integration

5. **Configure client details**:
   - **OAuth Grant Type**: Select **Authorization Code and Machine-to-Machine**
   - **Allowed Origin URL**: Enter your domain (example: `https://yourdomain.com/`)
   - **Allowed Redirect URI**: Enter `https://my.home-assistant.io/redirect/oauth`

6. **Select API scopes**:

   {% important %}
   You must select at least **Vehicle Information** OR **Energy Product Information** for the integration to work.
   {% endimportant %}

   Recommended scopes for full functionality:
   - Vehicle Information
   - Energy Product Information
   - Vehicle Commands
   - Vehicle Charging Commands

   {% note %}
   You can change scopes later, but you'll need to reconfigure the entire integration.
   {% endnote %}

7. **Set up billing** (optional):
   - Tesla provides $10 monthly credit for personal use
   - Most personal usage stays within the free tier
   - You can add billing details later if needed

8. **Save your credentials**:
   - After creating the application, go to **View Details** → **Credentials & APIs**
   - Note your **Client ID** and **Client Secret** - you'll need these for Home Assistant

## Step 3: Register as Tesla Fleet API partner

Before you can use your application, you need to register it as an official Tesla Fleet API partner.

{% warning %}
The following steps involve sensitive credentials. Never share your Client Secret or access tokens.
{% endwarning %}

### Get an access token

1. **Prepare your credentials** from the Tesla Developer Dashboard:
   - **Client ID**
   - **Client Secret**

2. **Choose your region URL**:
   - **North America/Asia-Pacific**: `https://fleet-api.prd.na.vn.cloud.tesla.com`
   - **Europe/Middle East/Africa**: `https://fleet-api.prd.eu.vn.cloud.tesla.com`
   - **China**: `https://fleet-api.prd.cn.vn.cloud.tesla.cn`

3. **Get your access token** by running this command (replace the variables):

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

4. **Copy the access token** from the response:

   ```json
   {"access_token":"YOUR_ACCESS_TOKEN","expires_in":28800,"token_type":"Bearer"}
   ```

### Register as a partner

5. **Register your domain** with Tesla (replace YOUR_ACCESS_TOKEN and your domain):

   ```shell
   curl --location 'YOUR_REGION_URL/api/1/partner_accounts' \
   --header 'Content-Type: application/json' \
   --header 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
   --data '{
       "domain": "yourdomain.com"
   }'
   ```

6. **Verify success** - you should see a response with your application details and pricing information.

## Step 4: Connect to Home Assistant

Now you can add the Tesla Fleet integration to Home Assistant.

{% include integrations/config_flow.md %}

1. **Start the integration setup**:
   - In Home Assistant, go to **Settings** → **Devices & services** → **Integrations**
   - Select **Add Integration** and search for **Tesla Fleet**

2. **Enter your application details**:
   - **Application name**: Enter the name you used when creating your Tesla Developer Application
   - **Client ID**: From your Tesla Developer Dashboard
   - **Client Secret**: From your Tesla Developer Dashboard

3. **Authenticate with Tesla**:
   - You'll be redirected to Tesla's login page
   - Enter your Tesla account credentials
   - On the authorization page, select **Select All** and then **Allow**

4. **Complete the setup**:
   - Confirm you want to **Link account to Home Assistant**
   - The integration will automatically discover your Tesla vehicles and energy products

{% tip %}
If you encounter any issues during setup, check the troubleshooting section below for common solutions.
{% endtip %}

## Vehicle data polling interval

The integration is configured to {% term polling poll %} each vehicle every 10 minutes while it's awake.
This is long enough that a single vehicle can be polled 24/7 without exceeding the USD$10 credit Tesla provides.
It is expected that most vehicles are asleep over 50% of the day, so the defaults should also suit users with multiple vehicles or that want to run automated commands.

If the default polling interval does not suit your needs, you can [define a custom polling interval](https://www.home-assistant.io/common-tasks/general/#defining-a-custom-polling-interval).

## Scopes

When connecting your Tesla account to Home Assistant, you **must** select at least one of the `Vehicle Information` or `Energy Product Information` scopes. It is recommended you select all scopes for full functionality. The `Vehicle Location` scope was added in Home Assistant 2024.1, so any authorizations performed on previous releases that want this scope will need to be [modified](https://accounts.tesla.com/en_au/account-settings/security?tab=tpty-apps).

## Pay per use

Previously, Tesla restricted this integration to a very modest rate limit. However, from January 2025, accounts in eligible countries will be charged for every API call. Here's what you need to know:

- Tesla provides a USD$10 credit per developer account per calendar month
- Every vehicle coordinator refresh, vehicle command, and wake up has a cost
- This credit only allows for a maximum of 5000 coordinator refreshes
- Energy product APIs are free to use at this time
- To go beyond the free credit, you must provide payment details to Tesla

For more details, please see [developer.tesla.com](https://developer.tesla.com).

Note that Tesla does not support billing in all countries yet. **Developers in countries that do not yet support payments will not be able to review their billing or usage**. For countries that do support billing, the current billing usage can be viewed at any time by going to your [Developer Dashboard](https://developer.tesla.com/en_US/dashboard), select **View Details** under the app you set up for Home Assistant integration. Then, select the **Application Usage** tab.

## Command signing

Certain vehicles, including all vehicles manufactured since late 2023, require vehicle commands to be signed with a private key. All actions on vehicle entities will fail with an error if this is required and the key has not been setup correctly.

The integration expects your private key to be located at `config/tesla_fleet.key`. This should be the same private key file (`tesla_fleet.key`) that you created during the prerequisites setup, copied to this location as instructed in the setup steps above.

Your public key must be added to each of your vehicles by visiting https://tesla.com/_ak/YOUR.DOMAIN and following the instructions in the Tesla app.
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

Constant API polling will prevent most Model S and Model X vehicles manufactured before 2021 from sleeping, so the integration will stop polling these vehicles for 15 minutes, after 15 minutes of inactivity. You can call the `homeassistant.update_entity` service to force polling the API, which will reset the timer.

## Troubleshooting

### Before you start troubleshooting

1. **Check the Tesla app** - Confirm your vehicle or energy product works in the official Tesla app
2. **Check the logs** - Go to **Settings** → **System** → **Logs** and search for "tesla_fleet" errors
3. **Try a restart** - Restart Home Assistant after making any changes

### Setup and configuration issues

#### "Public key not found" or "condition has not been met"

**Symptoms**: Error during setup or integration shows these messages

**Solutions**:
1. **Verify public key accessibility**:
   - Test that your public key is accessible at: `https://yourdomain.com/.well-known/appspecific/com.tesla.3p.public-key.pem`
   - The URL should return the key file content, not an error page
   - Ensure there are no redirects - Tesla requires direct access

2. **Check Tesla Developer Application registration**:
   - Confirm you completed the "Register as Tesla Fleet API partner" step
   - Verify your domain matches between your public key hosting and Tesla registration

3. **For NGINX users**:
   - Ensure the NGINX Add-on is running and properly configured
   - Check that `customize.active` is set to `true` in NGINX configuration
   - Restart the NGINX Add-on after configuration changes

#### "Invalid client credentials" or authentication errors

**Symptoms**: Setup fails during authentication step

**Solutions**:
1. **Verify your credentials**:
   - Double-check your Client ID and Client Secret from the Tesla Developer Dashboard
   - Ensure you're using the correct Tesla Developer Application name

2. **Check redirect URI**:
   - Confirm `https://my.home-assistant.io/redirect/oauth` is listed in your Tesla app's allowed redirect URIs

3. **Verify scopes**:
   - Ensure you have at least "Vehicle Information" or "Energy Product Information" selected
   - Check that your selected scopes match what you're trying to access

### Vehicle command issues

#### Vehicle commands fail or show signing errors

**Symptoms**: Actions like locking/unlocking, climate control, or charging don't work

**Solutions**:
1. **Check private key location**:
   - Verify `tesla_fleet.key` exists in your Home Assistant `config` directory
   - The file should contain your private key from the setup process

2. **Add public key to vehicles** (required for newer vehicles):
   - Visit `https://tesla.com/_ak/YOURDOMAIN.COM` (replace with your actual domain)
   - Follow the instructions in the Tesla app to pair your key with each vehicle
   - This step is required for all vehicles manufactured since late 2023

3. **Key file permissions**:
   - Ensure Home Assistant can read the `tesla_fleet.key` file
   - If using Docker, make sure the file is in the correct config directory

### Integration management issues

#### Need to reconfigure the integration

**Symptoms**: Integration stopped working, needs to be set up again

**Solutions**:
1. **Use the reconfigure option**:
   - Go to **Settings** → **Devices & services** → **Tesla Fleet**
   - Select the three-dot menu and choose **Reconfigure**

2. **If reconfigure is not available**:
   - Go to **Settings** → **System** → **Application Credentials**
   - Remove any Tesla Fleet credentials
   - Restart Home Assistant
   - Reconfigure the integration

#### Integration shows as "unavailable" or entities are missing

**Symptoms**: Integration loads but devices/entities don't appear or show as unavailable

**Solutions**:
1. **Check API usage limits**:
   - Tesla has rate limits - wait a few minutes and try again
   - Consider reducing polling frequency if you hit limits often

2. **Wake up vehicles**:
   - Use the Tesla app to wake up your vehicle
   - Some data is only available when the vehicle is awake

3. **Verify account access**:
   - Ensure your Tesla account has access to the vehicles/energy products
   - Check that the vehicles are properly configured in your Tesla account

### API and billing issues

#### "Payment required" or billing errors

**Symptoms**: Integration stops working with payment-related error messages

**Solutions**:
1. **Check your Tesla Developer account billing**:
   - Tesla provides $10 monthly credit for personal use
   - Add billing information if you've exceeded the free tier
   - Monitor your usage in the Tesla Developer Dashboard

2. **Reduce API calls**:
   - Increase polling intervals to reduce costs
   - Consider which entities you actually need

### Getting additional help

If none of these solutions work:

1. **Check the Home Assistant Community Forum** - Search for Tesla Fleet integration discussions
2. **Review Home Assistant logs** - Look for specific error messages to share when asking for help
3. **Verify your setup** - Go through the setup steps again to ensure nothing was missed

{% note %}
Many issues are resolved by carefully following the setup steps in order and ensuring all prerequisites are met.
{% endnote %}
