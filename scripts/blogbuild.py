import os, markdown, yaml, json
from datetime import datetime

dir_posts = "blog/posts"
dir_output = "blog/generated"
postTempa = "pages/templates/blogpost.html"
blog_index = []

#open the timeline
postTempa = os.path.join(os.getcwd().replace("scripts",""), postTempa)
with open(postTempa) as f:
    template = f.read()

"""
Generate Posts
I. Iterate through all files in the posts directory
II. Concatenate all files with the directory to get a pathname
III. Read hte file 
IV. Cut the crap
V. Translate the markdown crap into paython containers
VI. Replace the placeholders with real stuff
VII. Concatenate more strings to create the output directory
VIII. Write file to disk
"""

#I. Iterate through all files in the posts directory
for filename in os.listdir(dir_posts):
    #II. Concatenate all files with the directory to get a pathname
    path = os.path.join(dir_posts, filename)

    #IIII. Read hte file 
    with open(path, encoding='utf-8') as f:
        raw = f.read()

    #IV. Cut the crap
    crap = raw.split('---', 2)

    crap_before = crap[0]
    crap_header = crap[1]
    crap_body = crap[2]

    #V. Translate the markdown crap into paython containers
    meta = yaml.safe_load(crap_header)

    #VI. Replace the placeholders with real stuff
    html_body = template
    html_body = html_body.replace("{{ title }}", meta["title"])
    html_body = html_body.replace("{{ date }}", str(meta["date"]))
    html_body = html_body.replace("{{ content }}", markdown.markdown(crap_body))

    tags = ''
    for tag in meta["tags"]:
        tags += '<span class="blog-tag">#'+tag+'</span>\n'

    html_body = html_body.replace("{{ tags }}", tags);

    if "category" in meta:
        if meta['category'] == 'music':
            html_body = html_body.replace("{{ theme }}", '<link rel="stylesheet" type="text/css" href="/assets/css/music.css"/>')
            html_body = html_body.replace("{{ icon }}", "icon_cd1.png")
        elif meta['category'] == 'movies':
            html_body = html_body.replace("{{ theme }}", '<link rel="stylesheet" type="text/css" href="/assets/css/movies.css"/>')
            html_body = html_body.replace("{{ icon }}", "icon_film.png")
        elif meta['category'] == 'photography':
            html_body = html_body.replace("{{ theme }}", '<link rel="stylesheet" type="text/css" href="/assets/css/photos.css"/>')
        elif meta['category'] == 'books':
            html_body = html_body.replace("{{ theme }}", '<link rel="stylesheet" type="text/css" href="/assets/css/books.css"/>')
        elif meta['category'] == 'general':
            html_body = html_body.replace("{{ theme }}", "")
            html_body = html_body.replace("{{ icon }}", "icon_home.png")
    else:
        html_body = html_body.replace("{{ theme }}", "")
        html_body = html_body.replace("{{ icon }}", "icon_home.png")

    #VI.I (ha!) Add to the master JSON
    blog_index.append(
    {
        "title":        meta["title"],
        "date":         str(meta["date"]),
        "slug":         meta["slug"],
        "category":     meta.get("category", ""),
        "tags":         meta.get("tags", [])
#        "description":  meta.get("description", "")
    })

    #VII. Concatenate more strings to create the output directory
    toilet = os.path.join(dir_output, f"{meta['slug']}.html")

    #VIII. Write file to disk
    with open(toilet, "w", encoding='utf-8') as f:
        f.write(html_body);

    print(f"Built {toilet}")

#Sort and save the JSON
blog_index.sort(
    key=lambda x: datetime.strptime(x["date"], "%Y-%m-%d"),
    reverse=True
)

with open("assets/json/blogIndex.json", "w", encoding="utf-8") as f:
    json.dump(blog_index, f, indent=2)

#Generate the index page
with open("pages/templates/blogindex.html", encoding="utf-8") as f:
    index_template = f.read()

#
recent_posts_html = ""
posts_html = ""

#for post in blog_index:
#    posts_html += f"""
#    <li>
#        <a href="/blog/generated/{post['slug']}.html">
#            {post['title']}
#        </a>
#        <span>— {post['date']}</span>
#    </li>
#    """

recent_posts_index = 0;
for post in blog_index:
    if (recent_posts_index >= 4):
        break;
    recent_posts_index += 1;
    recent_posts_html += f"""
    <div class="blogosphere-recent-box">
        <div class="blogosphere-recent-image" style="background-image: url('/blog/resources/{post['date']}_0.webp');"></div>
        <div class="blogosphere-genre-tag bg-{post['category']}">{post['category'].title()}</div>
        <a href="/blog/generated/{post['slug']}.html">
            <div class="blogosphere-recent-body body-fill outsideborder win-bluebutton" style="border-width: 5px;">
                <div class="blogosphere-recent-title">{post['title']}</div>
                <div class="blogosphere-recent-date">{post['date']}</div>
            </div>
        </a>
    </div>
    """
    

index_output = index_template.replace("{{ recent_posts }}", recent_posts_html)

with open("blog/index.html", "w", encoding="utf-8") as f:
    f.write(index_output)