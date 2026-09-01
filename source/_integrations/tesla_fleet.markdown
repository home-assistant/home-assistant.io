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
  - Update
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
  - update
ha_integration_type: hub
---

The **Tesla Fleet** {% term integration %} lets you control Tesla vehicles and energy sites using the [Tesla Fleet API](https://developer.tesla.com/).

## Prerequisites

You need to configure developer credentials and host a public key file to allow Home Assistant to communicate with your Tesla account.

- A [Tesla](https://tesla.com) account with verified email
- A web domain to host your public key file:
  - [NGINX Home Assistant SSL proxy app](https://github.com/home-assistant/addons/blob/master/nginx_proxy/DOCS.md) (recommended)
  - External hosting service, such as [FleetKey.net](https://fleetkey.net) or [MyTeslamate.com](https://app.myteslamate.com/fleet)

{% warning %}
The China region is currently not supported by this {% term integration %}.
{% endwarning %}

## Tesla Developer Application

Create a Tesla Developer Application to connect Home Assistant with the Tesla Fleet API.

1. Create a developer application:
   - Go to [developer.tesla.com/request](https://developer.tesla.com/request)
   - Select your Tesla account from the dropdown

2. Enter application details:
   - Application name: A name to identify the application
   - Description: Enter a brief description of your integration
   - Purpose of Usage: Explain how you'll use the API (e.g., "Home Assistant")

3. Configure client details:
   - OAuth Grant Type: Select **Authorization Code and Machine-to-Machine**
   - Allowed Origin URL(s): Enter your domain's URL, for example `https://yourdomain.com/`
   - Allowed Redirect URI: Enter one of the following:
     - The literal string `https://my.home-assistant.io/redirect/oauth` if the [`My Home Assistant`](/integrations/my/) integration is enabled (it is by default).
       - Home Assistant uses [this service](https://my.home-assistant.io/) by default to redirect requests towards your instance.
     - `<HOME_ASSISTANT_URL>/auth/external/callback` if you do not have the [`My Home Assistant`](/integrations/my/) integration enabled.
   - Allowed Returned URL(s): Leave this field empty (not required)

4. Select desired API scopes:
   - Vehicle Information (mandatory for vehicles)
   - Vehicle Location (recommended)
   - Vehicle Commands (recommended)
   - Energy Product Information (mandatory for energy products)
   - Energy Product Settings (recommended)

5. Set up billing (optional):
   - Tesla provides $10 monthly credit for personal use
   - You can add billing details later if needed

6. Save your credentials:
   - After creating the application, go to **View Details** > **Credentials & APIs**
   - Note your **Client ID** and **Client Secret** - you'll need these to configure Home Assistant.

{% include integrations/config_flow.md %}

1. Add application credentials
   - Enter your application Client ID and Client Secret from your Tesla Developer Application.
   - This step will be skipped if you already have exactly one Tesla Fleet [application credential](/integrations/application_credentials/) already configured.

2. Authenticate with Tesla:
   - You'll be redirected to Tesla's login page.
   - Enter your Tesla account credentials.
   - On the authorization page, select **Select All** and then **Allow** to allow all the scopes you previously selected.

3. Redirect to Home Assistant:
   - Confirm you want to **Link account to Home Assistant**.

4. Select region:
   - Home Assistant detects the region for your Tesla account and selects it for you, so most people can just select **Submit**.
   - If your vehicles or energy sites are registered in a different region, select the correct region from the list before continuing.
5. Enter domain:
   - Enter the domain name you intend to host your public key on.
   - This domain should be the same or a subdomain of your origin domain, and must use a valid SSL certificate.
6. Register public key:
   - Upload the public key shown to the domain you entered in step 5 at `.well-known/appspecific/com.tesla.3p.public-key.pem`.
7. Install virtual key:
   - Use your smartphone to scan the QR code or enter the address to install your public key on your vehicles with the Tesla app.
   - This process needs to be repeated for each vehicle, excluding Model S and Model X vehicles manufactured before 2021.

## Hosting with NGINX app (optional)

1. Create the NGINX configuration:

   ```shell
   echo 'location /.well-known/appspecific/com.tesla.3p.public-key.pem {
   root /share/tesla;
   }' > /share/nginx_proxy_default_tesla.conf
   ```

2. Copy the public key shown during setup to `/share/tesla`

3. Configure the NGINX app:
    - Go to **Settings** > **Apps** > **NGINX Home Assistant SSL proxy** > **Configuration**
    - Change `customize.active` from `false` to `true`
    - Leave `config.default` at its default value: `nginx_proxy_default*.conf`

4. Restart the NGINX app and verify your public key is accessible at:
 `https://yourdomain.com/.well-known/appspecific/com.tesla.3p.public-key.pem`

## Data updates

The {% term integration %} {% term polling polls %} each vehicle every 10 minutes while it's awake. This is designed to stay within Tesla's $10 monthly credit for most users, which you can monitor usage in the [Tesla Developer Dashboard](https://developer.tesla.com/en_US/dashboard). Energy product APIs are free to use.

If you need different polling intervals, you can [define a custom polling interval](/common-tasks/general/#defining-a-custom-polling-interval).

## Command signing

Certain vehicles, including all vehicles manufactured since late 2023, require vehicle commands to be signed with a private key. All {% term actions %} on vehicle {% term entities %} will fail with an error if this is required and the key has not been set up correctly.

Your public key must be added to each of these vehicles by visiting `https://tesla.com/_ak/YOUR_DOMAIN` and following the instructions in the Tesla app.
If you're using an iPhone, you may need to use Safari to open the webpage and finish the setup.

For more details see [Tesla Fleet API vehicle commands documentation](https://developer.tesla.com/docs/fleet-api/endpoints/vehicle-commands#key-pairing).

## Generating your own key pair

The {% term integration %} generates a private key automatically at `config/tesla_fleet.key`. You can replace it with your own key (such as one from another Home Assistant instance) before configuring the integration. You can generate your own key pair following [Tesla's documentation](https://developer.tesla.com/docs/fleet-api/getting-started/what-is-fleet-api#step-3-generate-a-public-private-key-pair).

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
| Sensor         | Destination                                | No      |
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
| Update         | Update                                     | Yes     |

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

## Actions

### Action: Time of use

The `tesla_fleet.time_of_use` {% term action %} configures the time-of-use tariff on a Tesla energy site (Powerwall), so the battery knows when energy is cheap or expensive and can charge and discharge accordingly. The Tesla application must have been granted the **Energy Product Settings** scope, otherwise the action fails with an error.

| Data attribute | Required | Description |
| -------------- | -------- | ----------- |
| `device_id` | yes | The energy site to apply the tariff to. |
| `name` | yes | Name of the tariff, for example `Agile Octopus`. |
| `utility` | yes | Name of the energy supplier, for example `Octopus Energy`. |
| `currency` | yes | Three-letter currency code for the rates, for example `GBP`. |
| `daily_charge` | no | Fixed standing charge applied each day, in the selected currency. |
| `seasons` | yes | The seasons that make up the tariff. |

#### Seasons

A tariff is made up of one or more seasons. A single season with no dates applies all year, which is the common case. If you use more than one season, every season needs all four date fields.

| Data attribute | Required | Description |
| -------------- | -------- | ----------- |
| `name` | yes | Name of the season, for example `Summer`. `ALL` is reserved by Tesla and cannot be used. |
| `start_month` | no | Month the season starts, between `1` and `12`. |
| `start_day` | no | Day of the start month the season begins on. |
| `end_month` | no | Month the season ends, between `1` and `12`. |
| `end_day` | no | Day of the end month the season runs until. |
| `periods` | yes | The rate periods in this season. |

A season may wrap the end of the year, for example October to March.

#### Periods

| Data attribute | Required | Description |
| -------------- | -------- | ----------- |
| `name` | yes | Name of the rate period, for example `On peak`. |
| `days` | no | Days of the week the period applies to. Leave empty for every day. |
| `start_time` | no | Time the period starts. |
| `end_time` | no | Time the period ends. |
| `buy_rate` | yes | Import price per kWh. Negative prices are supported. |
| `sell_rate` | no | Export price per kWh. Negative prices are supported. |

`start_time` and `end_time` must be given together. Leave both out for a period that runs from midnight to midnight.

If you set `sell_rate` on any period, you must set it on every period. Export rates use the same time boundaries as import rates.

Periods within a season must not overlap, and seasons must not cover the same dates. A period that runs past midnight continues into the following day.

You can reuse a period name within a season to describe a period that is split across the day, such as an off-peak rate that runs overnight and again in the afternoon. Every occurrence of the same name must use the same rates.

{% note %}
Period names are converted into Tesla time-of-use labels, so `Off peak` becomes `OFF_PEAK`. Any name works, but the Tesla mobile app only displays the labels `ON_PEAK`, `OFF_PEAK`, `PARTIAL_PEAK` and `SUPER_OFF_PEAK`.
{% endnote %}

#### Examples

A day and night tariff with a standing charge:

```yaml
action: tesla_fleet.time_of_use
data:
  device_id: 1a2b3c4d5e6f
  name: Economy 7
  utility: Example Energy
  currency: GBP
  daily_charge: 0.6
  seasons:
    - name: All year
      periods:
        - name: Off peak
          start_time: "00:30:00"
          end_time: "07:30:00"
          buy_rate: 0.09
        - name: On peak
          start_time: "07:30:00"
          end_time: "00:30:00"
          buy_rate: 0.27
```

A seasonal tariff with export rates, where the peak rate only applies on weekday evenings. The off-peak name is reused to cover the rest of the week, which is allowed as long as the rates match:

```yaml
action: tesla_fleet.time_of_use
data:
  device_id: 1a2b3c4d5e6f
  name: Seasonal saver
  utility: Example Energy
  currency: GBP
  seasons:
    - name: Summer
      start_month: 4
      start_day: 1
      end_month: 9
      end_day: 30
      periods:
        - name: On peak
          days:
            - monday
            - tuesday
            - wednesday
            - thursday
            - friday
          start_time: "16:00:00"
          end_time: "19:00:00"
          buy_rate: 0.30
          sell_rate: 0.15
        - name: Off peak
          days:
            - monday
            - tuesday
            - wednesday
            - thursday
            - friday
          start_time: "00:00:00"
          end_time: "16:00:00"
          buy_rate: 0.18
          sell_rate: 0.08
        - name: Off peak
          days:
            - monday
            - tuesday
            - wednesday
            - thursday
            - friday
          start_time: "19:00:00"
          end_time: "00:00:00"
          buy_rate: 0.18
          sell_rate: 0.08
        - name: Off peak
          days:
            - saturday
            - sunday
          buy_rate: 0.18
          sell_rate: 0.08
    - name: Winter
      start_month: 10
      start_day: 1
      end_month: 3
      end_day: 31
      periods:
        - name: On peak
          days:
            - monday
            - tuesday
            - wednesday
            - thursday
            - friday
          start_time: "16:00:00"
          end_time: "19:00:00"
          buy_rate: 0.42
          sell_rate: 0.15
        - name: Off peak
          days:
            - monday
            - tuesday
            - wednesday
            - thursday
            - friday
          start_time: "00:00:00"
          end_time: "16:00:00"
          buy_rate: 0.21
          sell_rate: 0.08
        - name: Off peak
          days:
            - monday
            - tuesday
            - wednesday
            - thursday
            - friday
          start_time: "19:00:00"
          end_time: "00:00:00"
          buy_rate: 0.21
          sell_rate: 0.08
        - name: Off peak
          days:
            - saturday
            - sunday
          buy_rate: 0.21
          sell_rate: 0.08
```

## Vehicle sleep

Constant API {% term polling %} will prevent most Model S and Model X vehicles manufactured before 2021 from sleeping. The {% term integration %} automatically stops {% term polling %} these vehicles for 15 minutes after inactivity. You can call the `homeassistant.update_entity` {% term action %} to force {% term polling %}, which will reset the timer.

{% note %} Vehicles manufactured outside of those mentioned above have no issues with prevented sleep. {% endnote %}

## Removing the integration

{% include integrations/remove_device_service.md %}

- Removing the {% term integration %} does not delete your Tesla Developer Application - you can remove it manually from the [Tesla Developer Dashboard](https://developer.tesla.com/dashboard) if no longer needed.

## Troubleshooting

- **Setup errors**: Verify your public key is accessible at the correct URL and you've completed all registration steps with Tesla
- **Command failures**: Ensure `tesla_fleet.key` exists in your Home Assistant config directory and add your public key to vehicles via `https://tesla.com/_ak/YOUR_DOMAIN`
- **{% term Integration %} stopped working**: Use the reconfigure option in {% my integrations title="**Settings** > **Devices & services**" %} > **Tesla Fleet**
- **Access to this resource is not authorized**: Check your [Tesla Developer Dashboard](https://developer.tesla.com/dashboard) to ensure you haven't exceeded your usage limits and add billing information if required. In certain countries, the *Fart* (remote boombox) command will also throw this error where its usage is illegal.

If you have an error with your credentials, you can delete them in the {% my application_credentials title="Application Credentials" %} user interface.
