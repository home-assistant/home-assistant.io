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

- A [Tesla](https://tesla.com) account
- A [Developer Application](https://developer.tesla.com/en_US/dashboard)
- A web domain and host that you can serve your public key file from. Either locally (see [NGINX Home Assistant SSL proxy Add-on](https://github.com/home-assistant/addons/blob/master/nginx_proxy/DOCS.md) instructions below), or alternatively, with some free web-options (ordered from easier to more complex):
  - [FleetKey.cc](https://fleetkey.cc)
  - [MyTeslamate.com](https://app.myteslamate.com/fleet)
  - [AWS S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html)
  - [Cloudflare Pages](https://pages.cloudflare.com/)
  - [Firebase Hosting](https://firebase.google.com/docs/hosting)


{% include integrations/config_flow.md %}

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

{% details "Hosting a Public/Private Key Pair with the NGINX Home Assistant SSL proxy Add-on" %}

With this method, it is assumed that the [NGINX Home Assistant SSL proxy Add-on](https://github.com/home-assistant/addons/blob/master/nginx_proxy/DOCS.md) is running as a reverse proxy for external access to your Home Assistant installation.

1. **Open an SSH Terminal** on your Home Assistant installation using the [Terminal & SSH Add-on](https://www.home-assistant.io/common-tasks/os#installing-and-using-the-ssh-add-on).
2. During the integration setup, you will be provided your public key. Copy this content to a file at `/share/tesla/.well-known/appspecific/com.tesla.3p.public-key.pem`.
3. Create a **NGINX configuration file** `nginx_proxy_default_tesla.conf` in `/share` with: `echo 'location /.well-known/appspecific/com.tesla.3p.public-key.pem {\n  root /share/tesla;\n}' > /share/nginx_proxy_default_tesla.conf`
4. Close the Terminal and go to **Settings** >**Add-Ons** > **NGINX Home Assistant SSL proxy** > Configuration page. Change the `customize.active` option from the default `false` to `true`. Leave the `config.default` option at its default value: `nginx_proxy_default*.conf`.
5. **Restart the NGINX Home Assistant SSL proxy Add-on** on the **Settings** > **Add-Ons** > **NGINX Home Assistant SSL proxy** > **Info** page and test if the public key file is accessible at `https://my.domain.com/.well-known/appspecific/com.tesla.3p.public-key.pem`

{% enddetails %}

{% details "Hosting a Public/Private Key Pair" %}

While the [Tesla Fleet API documentation Step 3](https://developer.tesla.com/docs/fleet-api/getting-started/what-is-fleet-api#step-3-generate-a-public-private-key-pair) mentions this as a later step, it is recommended that you do this first to ensure key reachability before the rest of the integration.

1. During the integration setup, you will be provided your public key. Save this as `com.tesla.3p.public-key.pem`
2. Host this file on your domain at the path `/.well-known/appspecific/com.tesla.3p.public-key.pem`. Do not use redirection logic to handle this, or the Tesla API will not recognize your app later in the process.

{% enddetails %}

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
