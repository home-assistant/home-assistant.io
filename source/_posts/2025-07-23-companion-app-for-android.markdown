---
layout: post
title: "Companion app for Android: It’s been a while"
description: "The app will now have a dedicated developer. We recap the two years of development and the future of the app."
date: 2025-07-23 00:00:01
date_formatted: "July 23, 2025"
author: Timothy Nibeaudeau
comments: true
categories: Android
og_image: /images/blog/2025-07-android-companion/art.png
---

<img src='/images/blog/2025-07-android-companion/art.png' style='border: 0;box-shadow: none;' alt="Companion app for Android: It’s been a while">

The Home Assistant companion app for Android just keeps getting better with every release, and recently, it gained some dedicated support to help accelerate its development. Several months ago, I (Timothy Nibeaudeau, also known as [@TimoPtr](https://github.com/TimoPtr)) joined the Open Home Foundation as our dedicated Android developer 🎉.

It’s been [over two years](/blog/2023/03/30/android-20233/), and hundreds of thousands of installs, since we’ve published a dedicated update for our community on the development of the app, and I’d like to give you a quick update on recent improvements and what’s coming next.<!--more-->

## Behind the Screens

In the beginning, all of Home Assistant’s official [companion apps](https://companion.home-assistant.io/) were developed by the community in their spare time, with many still being part-time projects. It’s incredible the work they put into building these apps. This gives you not just the ability to view your Home Assistant instance on the go (or around the house) and takes advantage of many of the sensors available on the device while providing rich notifications to users.

<p class="img"><img src='/images/blog/2025-07-android-companion/download-growth.png' alt="Screenshot of Android installation growth over time"/>Very impressive growth in installs over the years!</p>

The Android app alone has seen over [2,700](https://github.com/home-assistant/android) contributions! It's a lot of work keeping up with Android versions, new capabilities of Home Assistant, and bug fixes. This app doesn’t just support Android phones and tablets but also devices they connect to, specifically Android Auto, Android Automotive, and Wear OS.

### Progress in the millions

They did all this work while reaching nearly **1.5 million installs**, with over 6 million total installs over the years. There are 400,000 daily active users and 1 million monthly active users. The phone app also has a very nice **4.3-star rating** on the [Play Store](https://play.google.com/store/apps/details?id=io.homeassistant.companion.android) and **2,800 stars** on [GitHub](https://github.com/home-assistant/android) 🤩. This feedback really helps us improve.

It's been over a year and a half since the Apple companion apps gained a full-time developer with the addition of the amazing [Bruno Pantaleão](/blog/2023/12/27/companion-app-for-ios-202312-lets-go/) 😎. Around the same time as Bruno was hired, we began looking for an Android developer, and let's say that took a little longer.

My name is Timothy Nibeaudeau, and as mentioned at the start, I’m your new dedicated Android engineer. As someone who has been using Home Assistant since 2018, I’m passionate about open source and smart home technology. I’ve been working in software development for nearly a decade, developing apps for all sorts of projects from medical-grade IoT products to smart toothbrushes 🪥.

I am committed to bringing my talents to the project, but I cannot do it alone. The community is what makes Home Assistant special, and together, we can achieve even more. Specifically, I’d like to thank [@dshokouhi](https://github.com/dshokouhi), [@jpelgrom](https://github.com/jpelgrom), and [@JBassett](https://github.com/JBassett) for their years of work making this app what it is today!

I’d also like to thank you! Your support (by subscribing to [Home Assistant Cloud](/cloud/) and buying [official hardware](https://www.nabucasa.com/#:~:text=the%20first%20boot.-,Official%20Home%20Assistant%20hardware,-Get%20the%20best)) allows the [Open Home Foundation](https://www.openhomefoundation.org/) to hire dedicated developers. Dedicated developers keep development focused, helping the community to work together in delivering the feature they're passionate about.

## Since our last blog

<img src='/images/blog/2025-07-android-companion/playstore-cards.jpg' class="no-shadow" alt="Google Play Store screenshot cards for Home Assistant"/>

Like I said at the top, it's been a long time (over two years 🫢) since we’ve published a blog highlighting the improvements made to the Android app. You’ve probably been enjoying these new features for some time, but in case you missed it, here are some of the biggest improvements made by the community over that time.

- Health Connect sensors linked to your Android phone have been added, including heart rate, fitness data, and glucose levels (as always, you have complete control over what you share with your Home Assistant instance, and that data stays local).

- By working with Android [natively](/blog/2023/07/20/year-of-the-voice-chapter-3/#native-assist-on-android), Assist can now replace your phone’s (or Wear OS devices') assistant.

- You can now set the Home Assistant app as your device's default launcher, which is great for wall panel setups.

- We’ve updated our widgets to support some of the new features, like To-do lists.

- Wear OS has had its Tile capabilities improved and a new thermostat tile was added.

- There are now more Android Auto sensors, like speed and remaining range.

- A simpler way to connect Wi-Fi compatible devices to your home network (such as the Home Assistant Voice Preview Edition) using [Improv Wi-Fi](https://www.improv-wifi.com/) over Bluetooth (an open standard for connecting devices to Wi-Fi using Bluetooth, built by the Open Home Foundation).

- The Z-Wave device onboarding experience has been improved with the addition of a QR code scanner.

- We’ve also improved the speed and stability of the app.

- It’s now easier than ever for new contributors to jump in and start helping with the app (much more on that below 👇).

For a full list of the app's capabilities, check out our [breakdown of the companion apps from the companion documentation](https://companion.home-assistant.io/docs/core/).

## What’s next for our Android app

In our latest update of the Android app [2025.7.1](https://github.com/home-assistant/android/releases/tag/2025.7.1), we’ve added a couple of useful features. Including a new basic invite flow, which will be shared between Android and iOS, adding a good layer of consistency between our most-used companion apps. The idea is to make it much more seamless to add new users or set up new devices (no need to type the URL in your Android Automotive device!).

We’ve also made [My Links](https://my.home-assistant.io/) work better. If you’re unfamiliar with My Links, they’re those cool links ([that anyone can make](https://my.home-assistant.io/create-link/)) that bring you right to an integration, blueprint, add-on, or settings page. They have always worked great on desktop, but up until recently, they were a bit clunky to use on mobile. Now you can get to the link's destination with a single click.

Android has many different screen sizes and layouts, and we’re working to better leverage them with edge-to-edge support. Our recent update has edge-to-edge working on Android native UI elements like the settings page, and we’re looking to implement them elsewhere in future updates so we can make the most of your screen real estate.

## Important changes for Android users

<p class="img"><img src='/images/blog/2025-07-android-companion/android-distribution.png' alt="Pie chart of installations over different Android versions from the Play Store"/>A huge percentage of our users are on pretty new versions of Android, but we want to support as many older devices as possible.</p>

One significant change on the horizon is ending support for Android 5.0 and 5.1 (also known as Android Lollipop, released in 2014… it had a good run 🫡). [Google has announced](https://developer.android.com/jetpack/androidx/versions/all-channel#:~:text=Note%3A%20Starting%20in%20June%202025%2C%20new%20releases%20of%20many%20AndroidX%20libraries%20previously%20targeting%20minSdk%2021%20will%20be%20updated%20to%20require%20minSdk%2023.%20Some%20libraries%20won%27t%20be%20re%2Dreleased%20and%20will%20therefore%20continue%20to%20support%20minSdk%2021.) that starting in June 2025, many AndroidX libraries will require a minimum of Android 6.0 (API 23). Google has already updated [Firebase Cloud Messaging](https://firebase.google.com/support/release-notes/android#messaging_v25-0-0) to require this as well. This means we will need to stop supporting Android 5.0 and 5.1 (API 21 and 22) to keep up with new features and security updates. Less than 0.3% of installs are on Android versions below API 23 (Android 6.0), and we always work to keep older devices working, but sometimes our hand is forced. If you are using an older device, the app will not be removed, but you will not receive new updates once we make this change. We plan to make one final release for these older versions before support ends. This release is expected before the end of the summer, so you will have the latest updates available for your device before we move on.

## Let’s work together

We want to make it easier for you to contribute, whether you are a seasoned developer or just getting started. This includes making the contribution journey smoother and giving people an easy place to start. We’ve even compiled a list of [“first issues” to tackle for prospective developers](https://github.com/home-assistant/android/contribute) looking to help out. We’ve started work on dedicated [Android developer documentation](https://developers.home-assistant.io/docs/android), which will give in-depth information about the inner workings of this app.

We’ve made many behind-the-scenes changes to improve the developer experience (defining best practices, linters for faster/automated feedback, and continuous integration for quicker feedback on PRs). Our focus is always on improving stability, reducing crash rates, and catching issues early. One example of this is our new fail-fast [approach](https://developers.home-assistant.io/docs/android/best_practices/?_highlight=failfa#fail-fast), which has already helped us catch and fix issues early.

We want more Android native/exclusive features while also balancing the need to keep parity between the Android and iOS companion apps (the iOS app is excellent, and each app’s community is learning so much from each other).

### How you can help

The companion app for Android is a community effort, and your help makes a real difference. Here is how you can get involved:

- [Join the beta program](https://play.google.com/apps/testing/io.homeassistant.companion.android) to test new features.

- [Suggest a feature](https://community.home-assistant.io/c/feature-requests/13) and share your ideas.

- Help triage issues on [GitHub](https://github.com/home-assistant/android/issues), [Discord](https://discord.com/channels/330944238910963714/1284965926336335993), or the [Home Assistant forum](https://community.home-assistant.io/tag/android).

- Join the Android Project [thread](https://discord.com/channels/330944238910963714/1346948551892009101) on Discord. (Head to _Channels & Roles_ and select “I want to contribute developer skills!” to assign yourself the Developer role if you can’t see the thread.)

- [Submit issues](https://github.com/home-assistant/android/issues), review pull requests, [start your first pull request](https://github.com/home-assistant/android/issues?q=is%3Aissue+state%3Aopen+label%3A%22good+first+issue%22), and ask questions — your feedback is valuable.

- Help us [translate the app](https://developers.home-assistant.io/docs/translations).

Thanks again for [making all this possible](/cloud/). I look forward to your help making this app even more amazing!
