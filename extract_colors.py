from PIL import Image

def get_colors(image_path, num_colors=5):
    try:
        img = Image.open(image_path).convert('RGB')
        img = img.resize((200, 200))
        colors = img.getcolors(200 * 200)
        # Sort by frequency
        colors.sort(key=lambda x: x[0], reverse=True)
        
        print(f"Top {num_colors} colors (excluding white/near-white):")
        found = 0
        for count, rgb in colors:
            # Skip white/near-white
            if rgb[0] > 250 and rgb[1] > 250 and rgb[2] > 250:
                continue
            
            print(f"Color {found+1}: RGB{rgb} - Hex#{rgb[0]:02x}{rgb[1]:02x}{rgb[2]:02x} (count: {count})")
            found += 1
            if found >= num_colors:
                break
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    import sys
    if len(sys.argv) > 1:
        get_colors(sys.argv[1])
    else:
        print("Usage: python extract_colors.py <image_path>")
