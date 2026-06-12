from PIL import Image

def get_colors(image_path, num_colors=3):
    try:
        img = Image.open(image_path).convert('RGB')
        img = img.resize((100, 100))
        colors = img.getcolors(100 * 100)
        # Sort by frequency
        colors.sort(key=lambda x: x[0], reverse=True)
        
        print(f"Top {num_colors} colors:")
        for i in range(min(num_colors, len(colors))):
            count, rgb = colors[i]
            print(f"Color {i+1}: RGB{rgb} - Hex#{rgb[0]:02x}{rgb[1]:02x}{rgb[2]:02x}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    import sys
    if len(sys.argv) > 1:
        get_colors(sys.argv[1])
    else:
        print("Usage: python extract_colors.py <image_path>")
