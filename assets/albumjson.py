import os
import json

def BuildFile(image_dir, output_file):
    # Allowed image extensions
    valid_extensions = (".jpg", ".jpeg", ".png", ".gif", ".webp")

    # List all valid image files in the directory
    images = [f for f in os.listdir(image_dir) if f.lower().endswith(valid_extensions)]

    # Save the list to a JSON file
    with open(output_file, "w") as json_file:
        json.dump(images, json_file, indent=4)

    print(f"Generated {output_file} with {len(images)} images.")

print("A. Books\nB. CDs\nC. Games")
image_dir = "none"
uinput = input(">")
if "a" in uinput.lower():
    image_dir = "books"
elif "b" in uinput.lower():
    image_dir = "albumart"
elif "c" in uinput.lower():
    image_dir = "games"
else:
    print("bad input: " + uinput)

print("alright, " + image_dir)
output_file = "images.json"

if image_dir != "none":
    BuildFile(image_dir, output_file)