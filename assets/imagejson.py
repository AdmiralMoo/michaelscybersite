import os
import json

def BuildFile(image_dir, output_file):
    # Allowed image extensions
    valid_extensions = (".jpg", ".jpeg", ".png", ".gif", ".webp")

    # List all valid image files in the directory
    images = [f for f in os.listdir(os.getcwd()+image_dir) if f.lower().endswith(valid_extensions)]

    # Save the list to a JSON file
    with open(output_file, "w") as json_file:
        json.dump(images, json_file, indent=4)

    print(f"Generated {output_file} with {len(images)} images.")

print("A. Books\nB. CDs\nC. Games\nD. Cassettes")
image_dir = "none"
uinput = input(">")
if "a" in uinput.lower():
    image_dir = r"\assets\books"
elif "b" in uinput.lower():
    image_dir = r"\assets\lbumart"
elif "c" in uinput.lower():
    image_dir = r"\assets\games"
elif "d" in uinput.lower(): 
    image_dir = r"\assets\cassettes"
else:
    print("bad input: " + uinput)

print("alright, " + image_dir)
output_file = os.getcwd() + image_dir + r"\images.json"

if image_dir != "none":
    BuildFile(image_dir, output_file)
