import os, markdown, yaml

dir_posts = "assets/data/concerts"
dir_output = "assets/pages/music/concerts"
postTempa = "pages/templates/blogpost.html"

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
    html_body = html_body.replace("{{ title }}", meta["name"])
    html_body = html_body.replace("{{ date }}", str(meta["date"]))
    html_body = html_body.replace("{{ content }}", markdown.markdown(crap_body))

    #VII. Concatenate more strings to create the output directory
    pathg = os.path.basename(path).split(".")[0];
    toilet = os.path.join(dir_output, f"{pathg}.html")

    #VIII. Write file to disk
    with open(toilet, "w", encoding='utf-8') as f:
        f.write(html_body);

    print(f"Built {toilet}")