import os
import json

# Set the directory containing the images
image_dir = "albumart"  # Adjust this to your actual path
output_file = "images.json"

# Allowed image extensions
valid_extensions = (".jpg", ".jpeg", ".png", ".gif", ".webp")

# List all valid image files in the directory
images = [f for f in os.listdir(image_dir) if f.lower().endswith(valid_extensions)]

# Save the list to a JSON file
with open(output_file, "w") as json_file:
    json.dump(images, json_file, indent=4)

print(f"Generated {output_file} with {len(images)} images.")