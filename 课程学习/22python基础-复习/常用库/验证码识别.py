import io
import ddddocr
from PIL import Image

ocr = ddddocr.DdddOcr()
with open('1.png', 'rb') as f:
    img_bytes = f.read()
    image = Image.open(io.BytesIO(img_bytes))
    result = ocr.classification(image)
    print(result)