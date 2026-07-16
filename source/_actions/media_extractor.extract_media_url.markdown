---
title: "Get media URL"
action: media_extractor.extract_media_url
domain: media_extractor
description: "Extracts a media URL and returns it in the action response."
---

Use this action to extract a playable stream URL from a supported media page and use the URL in later automation or script steps.

{% include actions/ui_header.md %}

To extract a media URL from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Media extractor: Get media URL**.
6. Enter the URL to extract.
7. In the **Response variable** field, enter a name to store the result in, such as `extracted_media`.
8. Select **Save**.

### Options in the UI

{% options_ui %}
URL:
  description: The URL of the media to extract.
Format query:
  description: The query used to select the right media format.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `media_extractor.extract_media_url`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: media_extractor.extract_media_url
  data:
    url: "https://example.com/video"
    format_query: best
  response_variable: extracted_media
{% endexample %}

This extracts a media URL and stores the response in `extracted_media`.

### Options in YAML

{% options_yaml %}
url:
  description: The URL of the media to extract.
  required: true
  type: string
format_query:
  description: The query used to select the right media format.
  required: false
  type: string
{% endoptions_yaml %}

This action does not support targets.

## Response data

The action returns the extracted media URL in the action response.

## Good to know

- Common format queries include `bestvideo`, `best`, `bestaudio[ext=m4a]`, and `worst`.
- For more details, see the [youtube-dl format selection documentation](https://github.com/ytdl-org/youtube-dl#format-selection).

{% include actions/stuck.md %}

{% include actions/related.md %}
