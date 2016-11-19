---
layout: page
title: "Website home-assistant.io"
description: "home-assistant.io web presence"
date: 2015-06-17 08:00
sidebar: true
comments: false
sharing: true
footer: true
---

The website you are reading now is the home of Home Assistant: [https://home-assistant.io](https://home-assistant.io). This is the place where we provide documentation and additional details about Home Assistant for end users and developers.

home-assistant.io is built using [Jekyll](http://github.com/mojombo/jekyll) and [these available dependencies](https://pages.github.com/versions/). The pages are written in [markdown](http://daringfireball.net/projects/markdown/). To add a page, you don't need to know about HTML.

You can use the "**Edit this page on GitHub**" link to edit pages without creating a fork. Keep in mind that you can't upload images while working this way.

For larger changes, we suggest that you clone the website repository. This way, you can review your changes locally. The process for working on the website is no different from working on Home Assistant itself. You work on your change and propose it via a pull request.

To test your changes locally, you need to install **Ruby** and its dependencies (gems):

- [Install Ruby](https://www.ruby-lang.org/en/documentation/installation/) if you don't have it already.
- Install `bundler`, a dependency manager for Ruby: `$ gem install bundler`
- In your home-assistant.github.io root directory, run `$ bundle` to install the gems you need.

Short cut for Fedora: `$ sudo dnf -y install gcc-c++ ruby ruby-devel rubygem-bundler && bundle`

Then you can work on the documentation:

- Fork home-assistant.io [git repository](https://github.com/home-assistant/home-assistant.github.io).
- Create/edit/update a page in the directory `source/_components/` for your platform/component.
- Test your changes to home-assistant.io locally: run `rake preview` and navigate to [http://127.0.0.1:4000](http://127.0.0.1:4000)
- Create a Pull Request (PR) against the **next** branch of home-assistant.github.io if your documentation is a new feature, platform, or component.
- Create a Pull Request (PR) against the **current** branch of home-assistant.github.io if you fix stuff, create Cookbook entries, or expand existing documentation.

<p class='note'>
It could be necessary that you run `rake generate` prior to `rake preview` for the very first preview.
</p>

### {% linkable_title Create a page %}

For a platform page, the fastest way is to make a copy of an existing page and edit it. The [Component overview](/components/) and the [Examples section](/cookbook/) are generated automatically, so there is no need to add a link to those pages.

If you start from scratch with a page, you need to add a header. Different sections of the documentation may need different headers.

```text
---
layout: page
title: "Website home-assistant.io"
description: "home-assistant.io web presence"
date: 2015-06-17 08:00
sidebar: true
comments: false
sharing: true
footer: true
---

Content...Written in markdown. 

{% raw %}### {% linkable_title Linkable Header %}{% endraw %}
...
```

There are [pre-definied variables](https://jekyllrb.com/docs/variables/) available but usually, it's not necessary to use them when writing documentation.

### {% linkable_title Embedding Code %}

You can use the default markdown syntax to generate syntax highlighted code. For inline code wrap your code in \`. For multi-line, syntax wrap your code as shown below.

```text
{% raw %} ```yaml
 sensor:
   platform: template
 ```{% endraw %}
```

Note that you can replace `yaml` next to \`\`\` with the language that is within the block.

When you're writing code that is to be executed on the terminal, prefix it with `$`.

### {% linkable_title Templates %}

For the [configuration templating](/topics/templating/) is [Jinja](http://jinja.pocoo.org/) used.

If you are using templates then those parts needs to be [escaped](http://stackoverflow.com/a/24102537). Otherwise they will be rendered and appear blank on the website.

### {% linkable_title HTML %}

The direct usage of HTML is supported but not recommended. The note boxes are an exception.

```html
<p class='note warning'>
  You need to enable telnet on your router. 
</p>
```

### {% linkable_title Images, icons, and logos %}

The images which are displayed on the pages are stored in various directories according to their purpose.

| Type         | Location                                      |
| :----------- |:----------------------------------------------|
| screenshots  | source/images/screenshots                     |
| logos        | source/images/supported_brands                |

Not everything (product, component, etc.) has a logo. To show something for internal parts of Home Assistant we are using the [Material Design Icons](https://materialdesignicons.com/).
