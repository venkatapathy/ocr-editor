try:
    from PIL import Image
except ImportError:
    import Image
import cv2
import pytesseract
import os
from pdf2image import convert_from_path
import cv2
import sys
from pdfreader import SimplePDFViewer
import tempfile

OCR_EDITOR_LIB_INPUT_DIR = '/home/venkat/Projects/workbook/ocr-editor/lib/input_books/'
OCR_EDITOR_LIB_OUTPUT_DIR = '/home/venkat/Projects/workbook/ocr-editor/lib/output_books/'


sys.path.append('../server/mgodb')
from models import Book
from mongoengine import connect

relevant_path = input(
    "Give path to the folder where pdfs. Enter for default option: [/home/venkat/Projects/workbook/ocr-editor/lib/input_books]"
) or OCR_EDITOR_LIB_INPUT_DIR
included_extensions = ['pdf']
file_names = [
    fn for fn in os.listdir(relevant_path) if any(
        fn.endswith(ext) for ext in included_extensions)
]
print("Select a file from the given list.\nInput the corresponding number")

connect('ocr-books')

counttmp = 0
for f in file_names:
    counttmp += 1
    book = Book.objects(bookuuid=f.replace('.pdf', ''))[0]
    print(str(counttmp) + ". " + book.title)

chosenFileNameWithExt = ""
try:
    chosenFileNum = int(
        input(
            "\nSelect a number from above based on the File you wanted to OCR:\n"
        )) - 1
    chosenFileNameWithExt = file_names[chosenFileNum]
    if (chosenFileNameWithExt.find(" ") != -1):
        raise NameError("File name contains spaces")
except Exception as err:
    print("Error: {0}".format(err))
    sys.exit(1)
"""Now that we have the pdf which need to be ocred. do the following:
1. Create appropriate output directories
2. convert pdf to images
3. ocr images
"""

try:
    if chosenFileNameWithExt == "" or relevant_path == "":
        print("Chosen file empty! Exiting Program")
        sys.exit(1)
except Exception as err:
    print("Error: {0}".format(err))
    sys.exit(1)

chosenFileNameWithNoExt = chosenFileNameWithExt.replace(".pdf", "")

outputDirIn = input(
    "Enter the path to the output directory base. Press enter for default option: [~/Documents/ocr/sandhi/output_books]"
) or OCR_EDITOR_LIB_OUTPUT_DIR

outputDirectory = outputDirIn + chosenFileNameWithNoExt

#create images,text folder
if not os.path.exists(outputDirectory):
    os.mkdir(outputDirectory)

if not os.path.exists(outputDirectory + "/page_images"):
    os.mkdir(outputDirectory + "/page_images")

imagesFolder = outputDirectory + "/page_images"

if not os.path.exists(outputDirectory + "/text_files"):
    os.mkdir(outputDirectory + "/text_files")

print("Generating image")

with tempfile.TemporaryDirectory() as path:
    pages= convert_from_path(
    relevant_path + '/' + chosenFileNameWithExt,
    output_folder=path,
    fmt='jpg',
    output_file="O",
    use_pdftocairo=True,
    thread_count=1,
)
    for i in range(1,len(pages)+1):
        page=pages[i-1]
        page.save(os.path.join(imagesFolder,'P_{0:03d}.jpg'.format(i)),'JPEG')

imagesFolder = outputDirectory + "/page_images"
tessdata_dir_config = r'--tessdata-dir "/usr/share/tesseract-ocr/4.00/tessdata"'
languages = pytesseract.get_languages(config=tessdata_dir_config)
lcount = 0
tesslanglist = {}
for l in languages:
    if not (l == 'osd'):
        tesslanglist[lcount] = l
        lcount += 1
        print(str(lcount) + '. ' + l)

linput = input("Choose the lang model for OCR from the above list: ")

if not (int(linput) - 1) in tesslanglist:
    print("Not a correct option! Exiting program")
    sys.exit(1)

print("Selected language model " + tesslanglist[int(linput) - 1])

if not os.path.exists(outputDirectory + "/output_files"):
    os.mkdir(outputDirectory + "/output_files")

individualOutputDir = outputDirectory + "/output_files"

for imfile in os.listdir(imagesFolder):
    print(imagesFolder + "/" + imfile)
    hocr = pytesseract.image_to_pdf_or_hocr(imagesFolder + "/" + imfile,
                                            lang=tesslanglist[int(linput) - 1],
                                            extension='hocr',
                                            config=tessdata_dir_config)
    txt = pytesseract.image_to_string(imagesFolder + "/" + imfile,
                                      lang=tesslanglist[int(linput) - 1],
                                      config=tessdata_dir_config)

    with open(individualOutputDir + '/' + imfile[:-3] + 'txt', 'w') as f:
        f.write(txt)

    with open(individualOutputDir + '/' + imfile[:-3] + 'hocr', 'w+b') as f:
        f.write(hocr)

print('Done')
