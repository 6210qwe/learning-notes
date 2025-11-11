# -*- coding: utf-8 -*-
import cv2
import numpy as np


def detect_gap_coordinates(image_path, output_image_path):
    # Load the image
    img = cv2.imread(image_path)
    if img is None:
        return "Error: Image not found or could not be loaded."

    # Convert the image from BGR to HSV color space
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)

    # Define color ranges for different possible gap colors
    # Green gap
    lower_green = np.array([40, 50, 50])
    upper_green = np.array([80, 255, 255])
    mask_green = cv2.inRange(hsv, lower_green, upper_green)

    # Cyan/Blue gap
    lower_cyan = np.array([85, 50, 50])
    upper_cyan = np.array([130, 255, 255])
    mask_cyan = cv2.inRange(hsv, lower_cyan, upper_cyan)

    # Magenta/Pink gap
    lower_magenta = np.array([140, 50, 50])
    upper_magenta = np.array([170, 255, 255])
    mask_magenta = cv2.inRange(hsv, lower_magenta, upper_magenta)

    # Combine all masks using bitwise OR
    mask = cv2.bitwise_or(mask_green, mask_cyan)
    mask = cv2.bitwise_or(mask, mask_magenta)

    # Find contours in the combined mask
    contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    if not contours:
        return "No gap found."

    # Find the largest contour (assuming it's the gap)
    largest_contour = max(contours, key=cv2.contourArea)

    # Get the bounding box of the largest contour
    x, y, w, h = cv2.boundingRect(largest_contour)

    # Calculate the center coordinates of the gap
    center_x = x + w // 2
    center_y = y + h // 2

    # Draw the bounding box on the original image
    cv2.rectangle(img, (x, y), (x + w, y + h), (0, 255, 0), 2)  # Green rectangle

    # Draw the center point on the original image
    cv2.circle(img, (center_x, center_y), 5, (0, 0, 255), -1)  # Red circle

    # Save the image with the marked gap
    cv2.imwrite(output_image_path, img)

    return {
        "bounding_box": {"x": x, "y": y, "width": w, "height": h},
        "center_coordinates": {"x": center_x, "y": center_y},
        "marked_image_path": output_image_path
    }

# if __name__ == '__main__':
#     # Test with img.png
#     image_path_1 = './img.png'
#     output_image_path_1 = 'marked_img_universal.png'
#     coordinates_1 = detect_gap_coordinates(image_path_1, output_image_path_1)
#     print(coordinates_1['center_coordinates'])
