---
title: Microsoft Speech (STT and TTS)
description: Instructions on how to set up Microsoft Speech integration with Home Assistant.
ha_category:
  - Speech-to-text
  - Text-to-speech
ha_iot_class: Cloud Push
ha_release: 2024.11
ha_domain: microsoft_speech
ha_platforms:
  - stt
  - tts
ha_codeowners:
  - '@lukcz'
ha_config_flow: true
ha_integration_type: integration
---

The **Microsoft Speech** {% term integration %} uses the [Microsoft Azure Cognitive Services Speech API](https://learn.microsoft.com/azure/cognitive-services/speech-service/overview) to provide both Speech-to-text (STT) and Text-to-speech (TTS) functionalities within Home Assistant. This integration requires an API key, which you can obtain by using your [Azure subscription](https://azure.microsoft.com) to create an [Azure Speech resource](https://portal.azure.com/#create/Microsoft.CognitiveServicesSpeechServices).

## Configuration

To enable Microsoft Speech integration with Home Assistant, follow these steps:

1. **Create Azure Speech Resource:**

   - **Sign in to Azure Portal:**
     - Go to the [Azure Portal](https://portal.azure.com/) and sign in with your Azure account.

   - **Navigate to Create Speech Resource:**
     - Follow [this link](https://portal.azure.com/#create/Microsoft.CognitiveServicesSpeechServices) to setup a Speech resource.

   - **Fill in the Required Details:**
     - **Subscription:** Choose your Azure subscription.
     - **Resource Group:** Select an existing resource group or create a new one.
     - **Region:** Choose the region where you want the resource to be hosted (e.g., `eastus`, `westus2`).
     - **Name:** Provide a unique name for your Speech resource.
     - **Pricing Tier:** Select the appropriate pricing tier based on your needs.
   - **Review and Create:**
     - After filling in all the details, click **"Review + create"**, then **"Create"** to provision the resource.

2. **View and Manage the Speech Resource:**

   - **Access the Resource:**
     - After creation, navigate to **"All resources"** in the Azure Portal.
     - Locate and select your newly created Speech resource to view its details.

3. **Obtain API Key:**

   - **Get Access Keys:**
     - In your Speech resource's overview page, find the **"Keys and Endpoint"** section.
     - Here, you'll find two API keys (`Key1` and `Key2`) and the region endpoint.
     - **Copy the API Key:** Click the copy icon next to one of the keys to copy it for later use in Home Assistant.

{% include integrations/config_flow.md %}

## Pricing

The Microsoft Speech services are priced based ond usage. For detailed pricing information, visit the [Azure Cognitive Services Speech Pricing](https://azure.microsoft.com/pl-pl/pricing/details/cognitive-services/speech-services/).

- **Free Tier:**
  - **Speech-to-text (STT):** 5 hours per month.
  - **Text-to-speech (TTS):** 0.5 million characters per month.

- **Paid Tier:**
  - Pricing varies based on the region and the specific services used. Refer to the [Azure Speech Services Pricing](https://azure.microsoft.com/pl-pl/pricing/details/cognitive-services/speech-services/) page for comprehensive details.

{% note %}
A free pool is available each month for both STT and TTS services, allowing you to test and utilize the integration without incurring costs initially.
{% endnote %}
