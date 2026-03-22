import os, markdown, yaml, json
from datetime import datetime

def dateconvert(in_date):
    out_date = str(in_date).replace("-","/")
    return out_date

def daterevert(in_date):
    out_date = str(in_date).replace("/","-")
    return out_date

dir_posts = "blog/posts"
dir_output = "blog/generated"
postTempa = "pages/templates/blogpost.html"
blog_index = []
blogPostCategories = {
    "general": [],
    "books": [],
    "movies": [],
    "games": [],
    "photography": [],
    "music": []
}

#get featured posts
with open("blog/featured-posts.cfg", 'r') as f:
    lines = f.readlines()
    featured_post_1_slug = lines[0].split(':')[1].replace("\n","")
    featured_post_2_slug = lines[1].split(':')[1].replace("\n","")

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
    html_body = html_body.replace("{{ pubdate }}", dateconvert(meta["date"]))
    html_body = html_body.replace("{{ year }}", str(meta["date"]).split("-")[0])
    html_body = html_body.replace("{{ content }}", markdown.markdown(crap_body))

    tags = ''
    for tag in meta["tags"]:
        tags += '<span class="blog-tag">#'+tag+'</span>\n'

    html_body = html_body.replace("{{ tags }}", tags);

    postData = {
        "title":        meta["title"],
        "date":         str(meta["date"]),
        "slug":         meta["slug"],
        "category":     meta.get("category", ""),
        "tags":         meta.get("tags", []),
        "description":  meta.get("description", "")
    }

    #VI.I (ha!) Add to the master JSON
    blog_index.append(postData);

    if "category" in meta:
        if meta['category'] == 'music':
            html_body = html_body.replace("{{ theme }}", '<link rel="stylesheet" type="text/css" href="/assets/css/music.css"/>')
            html_body = html_body.replace("{{ icon }}", "icon_cd1.png")
            blogPostCategories['music'].append(postData)
        elif meta['category'] == 'movies':
            html_body = html_body.replace("{{ theme }}", '<link rel="stylesheet" type="text/css" href="/assets/css/movies.css"/>')
            html_body = html_body.replace("{{ icon }}", "icon_film.png")
            blogPostCategories['movies'].append(postData)
        elif meta['category'] == 'photography':
            html_body = html_body.replace("{{ theme }}", '<link rel="stylesheet" type="text/css" href="/assets/css/photos.css"/>')
            html_body = html_body.replace("{{ icon }}", "icon_camera_older.png")
            blogPostCategories['photography'].append(postData)
        elif meta['category'] == 'books':
            html_body = html_body.replace("{{ theme }}", '<link rel="stylesheet" type="text/css" href="/assets/css/books.css"/>')
            html_body = html_body.replace("{{ icon }}", "icon_book_virginian.png")
            blogPostCategories['books'].append(postData)
        elif meta['category'] == 'games':
            html_body = html_body.replace("{{ theme }}", '<link rel="stylesheet" type="text/css" href="/assets/css/games.css"/>')
            html_body = html_body.replace("{{ icon }}", "icon_games.png")
            blogPostCategories['games'].append(postData)
        elif meta['category'] == 'general':
            html_body = html_body.replace("{{ theme }}", "")
            html_body = html_body.replace("{{ icon }}", "icon_home.png")
            blogPostCategories['general'].append(postData)
    else:
        html_body = html_body.replace("{{ theme }}", "")
        html_body = html_body.replace("{{ icon }}", "icon_home.png")
        blogPostCategories['general'].append(postData)

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

recent_posts_html = ""
index_allposts_html = ""
posts_html = ""

allposts_index = 0;

for post in blog_index:
    if (allposts_index >= 20):
        break;
    
    postTags = str(post['tags'])[1:-1]
    
    allposts_index += 1;
    index_allposts_html += f"""
    <div class="blogosphere-allpost-post">
        <a href="/blog/generated/{post['slug']}.html" style="width:100%" class="noformat blogosphere-allpost-post">
            <div class="blogosphere-allpost-image" style="background-image:url('/blog/resources/{daterevert(post['date'])}_0.webp')"></div>
            <div class="blogosphere-allpost-body body-fill outsideborder win-bluebutton">
                <h4>{post['title']}</h4>
                <span class="blogosphere-allpost-date">{dateconvert(post["date"])}</span>
                <span class="blogosphere-allpost-description">{post["description"]}</span>
            </div>
            <div class="blogosphere-allpost-category blogosphere-genre-tag bg-{post['category']}">{post['category'].title()}</div>
        </a>
    </div>
    """

    #Featured posts
    if post['slug'] == featured_post_1_slug:
        index_template = index_template.replace("{{ featured_post_1 }}", f"""
        <div class="blogosphere-recent-box">
            <div class="blogosphere-recent-image" style="background-image: url('/blog/resources/{daterevert(post['date'])}_0.webp');"></div>
            <div class="blogosphere-genre-tag bg-{post['category']}">{post['category'].title()}</div>
            <a href="/blog/generated/{post['slug']}.html" class="noformat">
                <div class="blogosphere-featured-body body-fill outsideborder win-bluebutton" style="border-width: 5px;">
                        <div class="blogosphere-recent-title" style="font-size: 1.1em">{post['title']}</div>
                        <div class="blogosphere-recent-date">{dateconvert(post['date'])}</div>
                        <span class="blogosphere-featured-description">{post["description"]}</span>
                </div>
            </a>
        </div>
        """)
    if post['slug'] == featured_post_2_slug:
        index_template = index_template.replace("{{ featured_post_2 }}", f"""
        <div class="blogosphere-recent-box">
            <div class="blogosphere-recent-image" style="background-image: url('/blog/resources/{daterevert(post['date'])}_0.webp');"></div>
            <div class="blogosphere-genre-tag bg-{post['category']}">{post['category'].title()}</div>
            <a href="/blog/generated/{post['slug']}.html" class="noformat">
                <div class="blogosphere-featured-body body-fill outsideborder win-bluebutton" style="border-width: 5px;">
                        <div class="blogosphere-recent-title" style="font-size: 1.1em">{post['title']}</div>
                        <div class="blogosphere-recent-date">{dateconvert(post['date'])}</div>
                        <span class="blogosphere-featured-description">{post["description"]}</span>
                </div>
            </a>
        </div>
        """)

"""tags for posts
<div style="padding-top: 4px; font-size: 0.7em; font-style:italic;">
{postTags}
</div>
"""

recent_posts_index = 0;
for post in blog_index:
    if (recent_posts_index >= 4):
        break;

    recent_posts_index += 1;
    recent_posts_html += f"""
    <div class="blogosphere-recent-box">
        <div class="blogosphere-recent-image" style="background-image: url('/blog/resources/{daterevert(post['date'])}_0.webp');"></div>
        <div class="blogosphere-genre-tag bg-{post['category']}">{post['category'].title()}</div>
        <a href="/blog/generated/{post['slug']}.html" class="noformat">
            <div class="blogosphere-recent-body body-fill outsideborder win-bluebutton" style="border-width: 5px;">
                <div class="blogosphere-recent-title">{post['title']}</div>
                <div class="blogosphere-recent-date">{dateconvert(post['date'])}</div>
            </div>
        </a>
    </div>
    """
    

index_output = index_template.replace("{{ recent_posts }}", recent_posts_html)
index_output = index_output.replace("{{ all_posts }}", index_allposts_html)


with open("blog/index.html", "w", encoding="utf-8") as f:
    f.write(index_output)

#Generate categories
#1. iterate through each category, then through each post in each category
for category in blogPostCategories.items():
    category_html = "";

    with open("pages/templates/blogindex-category.html", encoding="utf-8") as f:
        category_template = f.read()

    for post in category[1]:
        category_html += f"""
            <div class="blogosphere-post-rect">
                <div class="blogosphere-post-image" style="background-image: url('/blog/resources/{daterevert(post['date'])}_0.webp');"></div>
                <a href="/blog/generated/{post['slug']}.html">
                    <div class="blogosphere-post-body body-fill outsideborder win-bluebutton" style="border-width: 5px;">
                        <div class="blogosphere-recent-title">{post['title']}</div>
                        <div class="blogosphere-recent-date">{dateconvert(post['date'])}</div>
                    </div>
                </a>
            </div>
            """
        
    category_template = category_template.replace("{{ category }}", category[0].capitalize())

    if (category_html == ""):
        category_html = "<i><b>Nada!</i></b>"

    category_template = category_template.replace("{{ posts }}", category_html)

    if post['category'] == 'music':
        category_template = category_template.replace("{{ icon }}", "icon_cd1.png")
    elif post['category'] == 'movies':
        category_template = category_template.replace("{{ icon }}", "icon_film.png")
    elif post['category'] == 'photography':
        category_template = category_template.replace("{{ icon }}", "icon_camera_older.png")
    elif post['category'] == 'books':
        category_template = category_template.replace("{{ icon }}", "icon_book_virginian.png")
    elif post['category'] == 'games':
        category_template = category_template.replace("{{ icon }}", "icon_games.png")
    elif post['category'] == 'general':
        category_template = category_template.replace("{{ icon }}", "icon_home.png")

    with open(f"blog/index-{category[0]}.html", "w", encoding="utf-8") as f:
        f.write(category_template)