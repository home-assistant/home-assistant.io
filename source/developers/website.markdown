---
layout: page
title: "Website home-assistant.io"
description: "home-assistant.io web presence"
date: 2015-06-17 08:00
sidebar: false
comments: false
sharing: true
footer: true
---

The website you're reading now is the home of Home Assistant: [https://home-assistant.io](https://home-assistant.io). This is the place where we provide documentation and additional details about Home Assistant for end users and developers. 

home-assistant.io uses the [Octopress](http://octopress.org/) framework for [Jekyll](http://github.com/mojombo/jekyll). To get more details, please checkout the [Octopress documentation](http://octopress.org/docs/).  
That means that creating a new page is simple. The pages are written in [markdown](http://daringfireball.net/projects/markdown/); you don't need to care about HTML or the like.

The process for working on the website is no different from working on Home Assistant itself.

To test your changes locally, you need to install the **Ruby** dependencies (gems):  

- [Install Ruby](https://www.ruby-lang.org/en/documentation/installation/) if you don't have it already.
- Install `bundler`, which is a dependency manager for Ruby: `gem install bundler`
- In your home-assistant.io root directory, run `bundle` to install the gems you need.

Then you can work on the documentation:

- Fork home-assistant.io [git repository](https://github.com/home-assistant/home-assistant.io).
- Create/edit/update a page in the directory `source/_components/` for your platform/component. 
- Test your changes to home-assistant.io locally: run ``rake preview`` and navigate to [http://127.0.0.1:4000](http://127.0.0.1:4000)
- Create a Pull Request (PR) against the **next** branch of home-assistant.io if your documentation is for a new feature, platform, or component.
- Create a Pull Request (PR) against the **master** branch of home-assistant.io if you fix stuff, create Cookbook entries, or expand existing documentation.

For a platform page, the fastest way is to make a copy of an existing page and edit it. The [component overview](/components/) is generated automatically, so there is no need to add a link to your page.

### {% linkable_title Code %}
To take advantage of the built-in features of Octopress to display code snippets, just use the default markdown syntax. Please use `$` and `#` if it's a command and to differ from output.

```bash
Here goes the code...
```

If you want to display line numbers, add the following snippet somewhere on your page. 

```
{::options coderay_line_numbers="table" /}
```

### {% linkable_title Images, icons, and logos %}
The images which are displayed on the pages are stored in various directories according to their purpose. 

| Type         | Location                                      |
| :----------- |:----------------------------------------------|
| screen shots | source/images/screenshots                     |
| logos        | source/images/supported_brands                |

Not everything (product, component, etc.) has a logo. To show something for internal parts of Home Assistant we are using the [Material Design Icons](https://materialdesignicons.com/). 

