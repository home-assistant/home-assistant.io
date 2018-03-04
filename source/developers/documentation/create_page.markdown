---
layout: page
title: "Create a new page"
description: "Create a new page for the documentation"
date: 2015-06-17 08:00
sidebar: true
comments: false
sharing: true
footer: true
---

For a platform or component page, the fastest way is to make a copy of an existing page and edit it. The [Component overview](/components/) and the [Examples section](/cookbook/) are generated automatically, so there is no need to add a link to those pages.

Please honor the [Standards](/developers/documentation/standards/) we have for the documentation.

If you start from scratch with a page, you need to add a header. Different sections of the documentation may need different headers.

```text
---
layout: page
title: "Awesome Sensor"
description: "home-assistant.io web presence"
date: 2015-06-17 08:00
sidebar: true
comments: false
sharing: true
footer: true
ha_release: "0.38"
ha_category: Sensor
---

Content...Written in markdown. 

{% raw %}### {% linkable_title Linkable Header %}{% endraw %}
...
```

There are [pre-definied variables](https://jekyllrb.com/docs/variables/) available but usually, it's not necessary to use them when writing documentation.

A couple of points to remember:

- Document the needed steps to retrieve API keys or access token for the third party service or device if needed.
- If you're adding a new component, for the `ha_release` part of the header, just increment of the current release. If the current release is 0.37, make `ha_release` 0.38. If it's 0.30 or 0.40 please quote it with `" "`.
- `ha_category:` is needed to list the platform or component in the appropriate category on the website.

### {% linkable_title Configuration %}

Every platform page should contain a configuration sample. This sample must contain only the **required** variables to make it easy to copy and paste it for users into their `configuration.yaml` file.

The **Configuration Variables** section must use the {% raw %}`{% configuration %} ... {% endconfiguration %}`{% endraw %} tag.

{% raw %}
```text
{% configuration %}
api_key:
  description: The API key to access the service.
  required: true
  type: string
name:
  description: Name to use in the frontend.
  required: false
  default: The default name to use in the frontend.
  type: string
monitored_conditions:
  description: Conditions to display in the frontend.
  required: true
  type: list
  keys:
    weather:
      description: A human-readable text summary.
    temperature:
      description: The current temperature.
{% endconfiguration %}

```
{% endraw %}

Available keys:

- **`description:`**: That the variable is about.
- **`required:`**: If the variable is required.
```text
required: true            #=> Required
required: false           #=> Optional
required: inclusive       #=> Inclusive
required: exclusive       #=> Exclusive
required: any string here #=> Any string here
```
- **`type:`**: The type of the variable. Allowed entries: `string`, `int`, `time`, `template` or `map`. For multiple possibilities use `[string, int]`. If you use `map` then you need to define `keys:` (see the [`template` sensor](/components/sensor.template/) for an example).
- **`default:`**: The default value for the variable.

### {% linkable_title Embedding Code %}

You can use the [default markdown syntax](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet#code) to generate syntax highlighted code. For inline code wrap your code in {% raw %}`{% endraw %}. 

When you're writing code that is to be executed on the terminal, prefix it with `$`.

### {% linkable_title Templates %}

For the [configuration templating](/topics/templating/) is [Jinja](http://jinja.pocoo.org/) used. Check the [Documentation Standards](/developers/documentation/standards/) for further details.

If you are don't escape templates then they will be rendered and appear blank on the website.

### {% linkable_title HTML %}

The direct usage of HTML is supported but not recommended. The note boxes are an exception.

```html
<p class='note warning'>
  You need to enable telnet on your router. 
</p>
```

### {% linkable_title Images, icons, and logos %}

The images which are displayed on the pages are stored in various directories according to their purpose. If you want to use a logo and placed `logo:` in the file header then this image should be stored in `source/images/supported_brands`. The background must be transparent.

| Type         | Location                                      |
| :----------- |:----------------------------------------------|
| logos        | source/images/supported_brands                |
| blog         | source/images/blog                            |
| screenshots  | source/images/components                      |

Not everything (product, component, etc.) should have a logo. To show something for internal parts of Home Assistant we are using the [Material Design Icons](https://materialdesignicons.com/).

### {% linkable_title Linking From The Sidebar %}
If you are adding a new page that requires linking from the sidebar you need to edit the `docs_navigation.html` file in `home-assistant.github.io/source/_includes/asides/docs_navigation.html`.
