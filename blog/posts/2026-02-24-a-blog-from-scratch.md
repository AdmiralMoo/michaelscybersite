---
title: A Blog From Scratch
date: 2026-02-24
slug: 2026-02-24-a-blog-from-scratch
category: general
description: My experience creating this blog from scratch.
tags:
    - programming
    - site
---
Today, I finished writing what I believe will be the first public version of my blog on MichaelsCybersite.net. I never thought I’d be the kind of person who has a blog; I’ve always enjoyed writing, but I’ve never really had the urge show anything off to anyone, much less publish it on the web. Yet here we are—if you’re reading this, it means that the blog is live on the net. 

How did I even get here? 

###THE IDEA – THE COOKIE CONUNDRUM

Sometime in December of 2025, I was thinking of interesting projects I could work on for my site. I wanted to write some server-side Python to take a break from client-side JavaScript (that means the program runs on the backend of the web server instead of on your computer). 

There were all sorts of dumb trinkets and things I could cook up, but I felt like my site was depending too much on live computations every time the page loads. Imagine if, instead of putting your cookies in a jar, you had to bake a new batch of cookies every single time you wanted a single cookie? That’s what my website was—and to an extent, is still—doing. 

So, in short, by learning how to write programs that run once on the server side, I figured I could shift more elements of my site from the client side to the server side. That would make the site load faster, and it’d expand my knowledge of web hosting, HTML and Markdown.

###“DON’T BE AN IDIOT AND TRY TO DO IT FROM SCRATCH” 

When you search up “how to start a blog”, there are only one or two posts from brave individuals who asked how to write a blog on a public forum. For those who haven’t had to deal with programming sites such as Stack Overflow, or even some computer-adjacent Reddit communities, the “experts” aren’t exactly helpful. 

There are basically no guides on how to write a blog from scratch because everybody thinks it’s absolutely stupid to do so. Fair enough—blogs in their current form have been around for well over twenty-five years at this point since the rise and fall of sites such as “Blogger”. People have already done the work, whether it’s one of those DIY host-it-yourself sites or a WordPress plugin. But don’t they ever just do something because it’s fun? 

I, however, was not deterred by such accusations; an idea only looks stupid if it doesn’t work, it isn’t executed well or it plunges you into irrevocable financial debt—and I figured I could avoid all three. 

###A BLOG, FROM SCRATCH

I’ve been programming in Python for around eleven years now—I’m most comfortable in it above all other languages. I stared at the API for the Markdown and PyYAML libraries, and I wrote a skeleton of how it was going to work. 

The blog system would be made up of a couple components:

+ **Markdown Files**: The digital equivalent of a raw cookie ready to be put into the oven. Each markdown file contains the information for the blogpost, including the title, date, category, tags, images and the all-important body content. 
+ **Python Script**: The oven which bakes the cookies. Every time I update my site, this script will run and “bake” the Markdown files into real webpages. This way, I don’t have to do all the formatting myself. Would you want to hold each individual blob of proto-cookie over an open fire? No—you get an oven!
+ **HTML Files**: The baked cookies. My oven is a special, fancy, Bluetooth-connected one which makes a list of all the cookies it built so that they can be sorted, categorized and displayed automatically for your viewing pleasure. 

It sounds pretty simple, doesn’t it? In essence, it is—but I suppose you could say the same thing about a lot of other things… 

###THE IMPLEMENTATION

I wrote the Python script—the oven—in bits and pieces here and there. It took a while to flip back and forth to the documentation and understand all the Markdown notation and how it got converted into HTML; there were a lot of unexpected behaviours everywhere I looked.

Because a blog post is a concept and not a pile of yeast, flour and chocolate, I had to tell the computer what it would look like when the Markdown file got baked into an HTML file. The template is like a mould for the cookies—they’re all going to have the same shape, but what you put in the mould is unique to each individual cookie. 

After getting these steps down, it was just a matter of refining it all into something that looked nice. I got creative and added custom overrides and features to my Markdown-to-HTML converter and made it look pretty.

The great thing about this system is that the blogposts are regenerated—re-baked, if you’re still hungry—every time the website gets updated. This happens in the background when I publish a change; this way, I can make an update to the template and it’ll apply to every blogpost since the beginning of time—no persnickety finagling with HTML. 

###THE RESULT

Now, in February of 2026, I’ve got a blog. Pretty cool, huh? It’s always nice to see an idea through from beginning to end, and it’s even nicer when that idea can be iterated on indefinitely. 

I’ve developed a fun, expandable framework I can bolt stuff onto whenever I’ve got a cool idea, and I’ve got a platform on which I can publish some of my thoughts. 

There’s plenty of things to write about, from the adventures I go on, the music I listen to, my endless shenanigans and finagling with electronics and systems as well as some meta-commentary on the site itself. 

Stay tuned—soon enough, there’ll be more cookies (blogposts) than anybody could ever know what to do with!