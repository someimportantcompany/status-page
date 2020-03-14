<div align="center">
  <h1><img height="22px" width="22px" src="/img/font-awesome-svg/solid/stream.svg"/> status-page</h1>
  <p>An open-source Status Page site for your projects, big or small!</p>
  <p>Check out the <a href="#">example site</a>!</p>
</div>

## Features

- **An open-source staticly-built status-page**, built from the designs of popular status pages you see around the web.
- **Generated entirely from [a config file](./_data/status.yml)**, so you can edit the file in git or on GitHub & have your favourite CI tool build your site for you!
- **Inspired by** products like [StatusPage.io](https://statuspage.io), [Sorry™](https://sorryapp.com) & other open-source tools like [slatedocs/slate](https://github.com/slatedocs/slate).

## Why a status page?

Most of the time you launch a status page up to communicate down-time & scheduled maintainence to your customers and/or users. Maybe your product is key to their workflow, and you want to let them know when it'll be unavailable and thus should plan accordingly. Perhaps you get a flurry of messages when your blog goes down & you just want a place to keep your readers informed. You could be [a startup bank](https://monzo.statuspage.io/), [a cloud infrastructure provider](https://status.digitalocean.com/), [a website monitoring service](https://status.pingdom.com/) or [a university](https://www.uodit.info/) - regardless, you want a dedicated channel to let your users know that you're aware of the problem & you're on it.

There are plenty of hosted status page solutions out there. One of the best is [Atlassian's StatusPage](https://statuspage.io), however (in my humble opinion) their pricing is far to high for a static status page, especially for open-source projects or products just launching. They [justify their pricing](https://www.statuspage.io/pricing) & have excellent features focused around incident management, team management, notifications, webhooks, API access & Single Sign-On. But if you just want a simple status page why isn't their a free alternative? If they offered a free plan with 1 user, no subscribing features, no metrics, basic customisation & incident management, this project would evaporate overnight.

## Getting Started

[Much like Slate](https://github.com/slatedocs/slate#getting-set-up), you should fork this repository to your own profile & start customising it to your own needs. Once forked, clone **your repository** (not this one!) to your machine & get to it!

You can run this site locally [using Docker 🐋](https://www.docker.com) to test changes before deploying:

```sh
$ git clone git@github.com:YOURUSERNAME/status-page.git status-page
$ cd status-page/
$ docker run --rm -v $PWD:/srv/jekyll -p 4000:4000 -it jekyll/minimal jekyll serve
```

- This will run a HTTP server at https://localhost:4000 for you to view your status-page. Any changes you make will automatically cause the process to rebuild the site. Happy status-paging!

## Configuration

The config file is stored at [`./_data/status.yml`](./_data/status.yml). Edit this file to brand the site to your liking, make announcements, & most importantly write up incidents!

### Branding

Control the look & feel of your status page.

```yml
icon: /img/font-awesome-svg/solid/stream.svg
title: Status Page

# Site description, shown on the homepage. Markdown supported.
description: >
  An example of an open-source statically-built
  [status-page](https://github.com/someimportantcompany/status-page).
```

### Levels

Set the relevant levels & colours for your status messages.

```yml
# Set as few or many levels as you like - the order matters here!
levels:
  success: # The first is also the default level
    color: '#28A745'
    label: Operational

  warning: # No label defaults to a capitalised key
    color: '#FFC107'
    # label: Warning

  error:
    color: '#DC3545'
```

### Status

Set the overall tone of your status page.

```yml
# Use a single line to push out a single message with the default level.
status: Everything looks OK from here!
# The above is a shortcut for this:
status:
  message: Everything looks OK from here!

# Optionally define a level to set the card's colour
status:
  level: warning
  message: >
    There appears to be a backlog of items building in the queue.
    We're looking into the cause, and will update you with more information
    when we have it.

# Manually set classes & styles
status:
  class: bg-dark text-white
  message: Happy halloween! 🎃

# Or, omit this entirely to not have a top-level status message.
```

### Components

Set top-level components of your product.

```yml
# The order matters for components

# Each component requires a name, optionally an icon
components:
  platform:
    name: Pied Piper
    icon: /img/font-awesome-svg/brands/pied-piper-square.svg

# Set a level color/label for each component
components:
  platform:
    name: Pied Piper
    icon: /img/font-awesome-svg/brands/pied-piper-square.svg
    level: error
    label: Offline
  platform:
    name: Pied Piper
    icon: /img/font-awesome-svg/brands/pied-piper-square.svg
    color: yellow
    label: No
```

- Order matter here!

### Groups

Build groups of components to better detail the status of your product or dependencies. All `components` in groups have the same properties as the components above.

```yml
# The order matters for groups & their components

groups:
  services:
    name: Decentralized Services
    icon: /img/font-awesome-svg/brands/pied-piper-pp.svg
    components:
      compression:
        name: Compression Engine
      encryption:
        name: Encryption Engine
      payments:
        name: Payments Processor
  aws:
    name: Amazon Web Services
    components:
      ecs:
        name: Elastic Container Service
      rds:
        name: Relational Database Service
      es:
        name: Elasticsearch Service
```

### Incidents

The big one! Write up incidents either after the fact or as-and-when they happen, entirely up to you.

```yml
incidents:
  # All incidents must have at minimum a timestamp to be shown
  - title: Initial release!
    timestamp: 2020-03-12

  - title: Payments from Nationwide may be delayed
    body: >
      We’ve noticed that FPS payments to and from Nationwide are taking a while to
      arrive due to a service disruption at Nationwide. Don’t worry, your payments should still
      arrive eventually. Unless your payment has been returned to your account, please don't try
      to send it again. We will continue to monitor.
    timestamp: 2020-02-28 19:09

  # Since incidents often have updates, the timestamp can be on the updates too
  - title: Event Processing Delays/Errors
    updates:
      - timestamp: 2020-01-31 17:54
        body: > # Markdown is supported here
          **Resolved** - Our engineering team has confirmed resolution of the issue affecting Droplet
          creates and event processing across all regions. All systems should be operating normally
          at this time. If you continue to experience any problems, then please open a ticket with
          our support team. We apologize for any inconvenience, and we appreciate your patience
          throughout this process.
      - timestamp: 2020-01-31 17:07
        body: >
          **Monitoring** - Our engineering team has identified the cause of issues affecting Droplet
          creates and event processing, and functionality should be fully restored at this time. Our
          team is now monitoring the situation for any further issues. We apologize for the
          inconvenience and will share an update once we have confirmed that the issue is resolved.
      - timestamp: 2020-01-31 16:54
        body: >
          **Investigating** - Our engineering team is investigating an issue affecting Droplet
          creates and event processing across all regions. During this time, users may experience
          intermittent errors or delays while working with resources, such as creating or destroying
          Droplets. We apologize for the inconvenience and will share an update once we have more
          information.
```

## Deployment Ideas

Being built upon [Jekyll](https://jekyllrb.com), this project is immediately designed to be deployed onto [GitHub Pages](https://pages.github.com). Having said that, the final build output is a static website, so you are free to deploy your status-page anywhere you like. The Jekyll documentation covers [manual deployments](https://jekyllrb.com/docs/deployment/manual/), [automated deployments](https://jekyllrb.com/docs/deployment/automated/) & [3rd party deployments](https://jekyllrb.com/docs/deployment/third-party/) including [Netlify](https://www.netlify.com/blog/2015/10/28/a-step-by-step-guide-jekyll-3.0-on-netlify/).

## Release Notes

- **1.0.0** Initial release 🎉

## Special Thanks

- [Jekyll](https://jekyllrb.com)
- [Font Awesome Icons](https://fontawesome.com)
- [AWS Architecture Icons](https://aws.amazon.com/architecture/icons/)
- [Google Cloud Icons](https://cloud.google.com/icons)
- [StatusPage.io](https://statuspage.io)
- [slatedocs/slate](https://github.com/slatedocs/slate)
