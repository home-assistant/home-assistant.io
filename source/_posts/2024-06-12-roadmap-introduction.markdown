---
layout: post
title: "A roadmap for Home Assistant"
description: "Learn more about what we came up with the roadmap, what it entails, and how you can build upon it together!"
date: 2024-06-12 00:00:00
date_formatted: "June 12, 2024"
author: Madelena Mak
comments: true
categories: Announcements Roadmap
og_image: /images/blog/2024-06-roadmap-introduction/art.jpg
---

<p class="img no-shadow"><img src='/images/blog/2024-06-roadmap-introduction/art.jpg' alt='Artwork for the roadmap introduction'/><i>Art by Clelia Rella</i></p>

During our [State of the Open Home livestream](https://www.youtube.com/watch?v=oa__fLArsFk&t=7649s), we presented the future of the open home with the announcement of our first roadmap.

Over the past few years, we have begun the practice of giving a theme for the direction we wanted to take the Home Assistant project towards each year. Last year, we had the successful [Year of the Voice](/blog/2022/12/20/year-of-voice/), in which we built our voice assistant architecture from the ground up. And before that, we had “[Streamlining Experiences](/blog/2022/01/19/streamlining-experiences/)” where we took our first stab at improving the UX.

Having a good set of goals allows us to focus our community and resources to build new projects rapidly together. With the Year of the Voice, we have attracted new contributors who are experts in wake words and voice technologies, translators of many languages, and hobbyists in building impressive one-of-a-kind voice assistants. We want to continue this success by laying out the strategy and direction for the continuous development of the Home Assistant project, and a product roadmap is a perfect tool for such a purpose.

Our roadmap is an open call for contributions in the product areas we are focusing on. Unlike many public roadmaps of commercial products, this is not a marketing ploy to attract customers to buy into nebulous, unrealized future features. It is a tool for our contributors and us, the project maintainers, to plan ahead for our collective future.

For this blog post, I’d like to detail how we came up with the roadmap, what it entails, and how you can build upon it together.

~ Madelena

<!--more-->

## Where can I find the roadmap?

Our roadmaps will be published in our blog in the [Roadmap category](/blog/categories/roadmap/), this allows the community to provide feedback and discuss our direction in the forums easily.

Our first roadmap for midyear 2024, can be found [here](/blog/2024/06/12/roadmap-2024h1/).

## What is a roadmap?

### What it is

A roadmap provides the general direction of where we want to take our projects next, aka the “North Star” ⭐.

With existing products, it can be easy to operate on autopilot, especially when we are in a rhythm of building new features. Once in a while, it is important for us to understand the strategic context behind why we are doing what we are doing for our users, and figure out how we can get there in the long term.

A conversation about our roadmap with our community and users is an opportunity for us to verify our understanding of your needs before actually spending time and resources building them. Ideally, if we had done an excellent job in our user research, then the roadmap should merely confirm what you need, and there should be no surprises.

### What it is not

We want to emphasize that this is **_not_ a list of upcoming features**, nor does it indicate the exact timeframe of when features will be built. We will not know the exact features we need to build until we have a good grasp of the problem encountered through user research. Usually, the closer the priority is, the clearer the picture is, and the more likely we know what features to build.

## What is on our roadmap?

Our roadmap has three major elements: initiatives, themes, and timeframes.

### Initiatives

Our roadmap contains the list of initiatives (also known as “product opportunities” for all you PM nerds) that we intend to work on, such as “making automations easier to organize”. They indicate the overall outcome that we want to achieve. Sometimes, there would be obvious features that we all know we should be working on, such as the most requested “drag and drop” feature in order to “make dashboards easier and more intuitive to customize and use”. Sometimes the answers aren’t as obvious, which is when user research would help us a great deal in providing clarity and helping us brainstorm solutions.

### Themes

These initiatives are organized by themes, usually in the different product areas of the Home Assistant project, or by the common goal that these initiatives would achieve. To coordinate our efforts, each of these themes are usually led and driven by the same group of maintainers composed of developers, designers, and a product owner, who are passionate about the subject matter. For example, I love dashboards and that’s my current focus, while [@JLo](https://github.com/jlpouffier) loves Assist and is making great strides in those areas with our contributors.

### Timeframes

Our timeframes are divided roughly into what’s current, next, and later priorities. We decided against using exact dates because, on the one hand, guaranteeing a due date on features we might not even need to build puts unnecessary pressure on our maintainers. On the other hand, we cannot predict if or when our contributors will make contributions to our top initiatives. In general, a current priority is about three months, next is another three months after what’s current is done, and so on.

## How are roadmaps made?

We want to make sure that this is an open source, open development, and open design process. So we, as the core project maintainers, will keep the dialog open to feedback and changes from our contributors and our community.

For our first roadmap in midyear 2024, we worked hard for 7 months to build it from scratch in the following steps:

1. **Foundation**: We make sure that our [founder’s vision](/blog/2016/01/19/perfect-home-automation/) of what the best Home Assistant can be is reflected fully in the North Star of the roadmap. We also agree upon the purpose of the roadmap.

2. **Collective feedback**: After that, we met with the core project maintainers of various product areas, from frontend, voice, OS, documentation, open protocols, ESPHome, and more. We collected hundreds of problems that they know are the most concerning to our users and their ideas on how these problems can be solved. We also scoured and scanned through every top feature request on our forums and from previous Months of What the Heck. We collated them into one huge list of product issues we need to solve.

3. **Prioritization**: We organized and categorized these issues into various initiatives that we can pursue. Finally, we prioritized all these initiatives by the number of potential users who could benefit from them, how big an impact they can make, how certain we are in the issue, or if research is needed before proceeding. The final result is then organized into the roadmap that you see now.

A roadmap is a _living document_, and we intend to adjust our bearings and revisit it every half-year. For instance, when we improve initiatives to an adequate level or if the needs of our users and community change, we will move our resources to focus on the next important priorities.

Our next update on the roadmap will be around late October to early November, after collecting your feedback from our infamous Month of What the Heck.

## How to use our roadmap

As I mentioned before, our roadmap is not a list of future features, but an open call for contributions in the product areas we are focusing on.

If you would like to contribute to the Home Assistant project, I hope that our roadmap can provide you with ideas and guidance on what you can do. There are a number of ways you can support this journey. Let’s build the future of the Open Home together!

- **Develop**: If you are a developer, of course you can contribute your code!

  If you are an expert in the areas we are currently focused on in our roadmap, please feel free to reach out to us directly on [Discord](/join-chat). For example, if our current focus is to “improve voice assistant abilities out of the box” and if you were a wake word or LLM expert, that’s perfect! Please reach out and see where you can help.

  If you know what you want to build, awesome! Be sure to check out our developer docs and learn about our [review process](https://developers.home-assistant.io/docs/review-process).

  If you don’t have any ideas on what to code, please feel free to check out our [GitHub issues](https://github.com/home-assistant/core/issues) and our [top feature requests](https://community.home-assistant.io/c/feature-requests/13/l/latest?order=votes). You may also chat with other folks on Discord to find out what needs your help the most.

- **Design**: If you are a product person or a designer, we need you! Many of our features and contributions need great product goals, research, and design that solve real problems. Help us brainstorm ideas and solutions for the problems we want to solve on our roadmap, or report any new unforeseen problems that you notice in our community.

- **Participate in user research**: If you and your housemates or family are interested, we would love to have you as part of our user research pool. From time to time, we will send out surveys or invite users to user interviews. This allows us to get an objective understanding of our users and validate and test our assumptions. Sign up to be part of the [Home Assistant User Research Group](https://forms.clickup.com/2533032/f/2d9n8-12931/52N1KK00E9BXEW71TN).

- **Guide our direction**: As already mentioned, we use our [Feature Request](https://community.home-assistant.io/c/feature-requests/) and [Month of What The Heck?](https://community.home-assistant.io/c/what-the-heck/56) forums to guide the creation and prioritization of the roadmap. The number of votes and the amount of thoughtful discussions and creative ideas matter, so please participate in the threads and help guide the direction of our project.

And that’s all you need to know about our roadmaps! Thanks for reading! Looking forward to collaborating with you on the Home Assistant project soon!

~ Madelena

## FAQ

#### 1. I want feature X!

Sure thing, we hear you. If you really want feature X, can you tell us and everyone in our community more about it, such as, what problems will this feature solve? Better yet, is it a recurring problem you have noticed that will help many other people? Use cases, research, and various evidence help us all decide whether we will proceed with such a feature. Make some noise on our forums, submit it to our feature requests, and see if it resonates with others. Maybe a contributor can help you out if the need is strong enough

#### 2. I think the Home Assistant project should go in direction Y.

If you have a brilliant vision of what Home Assistant can become, please feel free to discuss them openly in the comments section of the roadmap, or post your thoughts on our forums. Our direction is determined by the collective needs of our users, guided by our Open Home values of privacy, choice, and sustainability. Any ideas that can benefit these areas may be considered to become part of our project vision.
