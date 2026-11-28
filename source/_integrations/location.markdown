---
description: Suggests integrations for services that are available in your country.
ha_release: 2027.1
ha_domain: location
related:
  - docs: /docs/configuration/basic/
    title: Basic settings
---

The **Location** {% term integration %} suggests integrations for services that are tied to where you live, such as public transport or local services.
If your Home Assistant is set to the Netherlands, for example, it can suggest Nederlandse Spoorwegen.

## How suggestions work

Suggestions are based on the country you set during onboarding.
Each integration that offers a service in a specific country lists the countries it serves.
When your country is one of them, the integration is suggested.

You find the suggestions when you add an integration.
Go to {% my integrations title="**Settings** > **Devices & services**" %}, select **Add integration**, and then select **For your location** under **Suggestions**.
A suggested integration is set up like any other integration.

- Nothing is set up automatically. An integration is only added when you choose to add it.
- Integrations you have already set up are not suggested again.
- The suggestions are worked out on your Home Assistant. Your location is not sent anywhere.
- If no country is set, there are no suggestions.

## Changing your country

The suggestions follow the country in your general settings.
If you've moved, or the suggestions don't match where you live, check that setting:

1. Go to {% my general title="**Settings** > **System** > **General**" %}.
2. Under **Country**, select the country you live in.
3. Select **Save**.

The next time you add an integration, the suggestions match the new country.

## Configuration

This integration is by default enabled, unless you've disabled or removed the [`default_config:`](/integrations/default_config/) line from your configuration.
If that is the case, the following example shows you how to enable this integration manually.

Add the following section to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
location:
```
