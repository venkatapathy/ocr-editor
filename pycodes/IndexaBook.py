'''This code can be used to select a book to document for indexing into the solr

'''
import sys

sys.path.append('../sandhiserver/mgodb')
from models import Book
import os
from mongoengine import connect
import glob
import json

connect('sandhi-books')
books = Book.objects()

#for book in books:
#    book.isIndexed = False
#    Book.objects(bookuuid=book.bookuuid).update_one(isIndexed=True)

#Book.objects(bookuuid='aa754b9bf95d4429a53e2cad0a346a5c').update_one(
#    category='general')

books = Book.objects(isIndexed=False)

if (len(books) == 0):
    print("No new books to Index")
    sys.exit(0)

for index, book in enumerate(books):
    print("{0}. {1}".format(index + 1, book.title))

selectedbookno = int(input("Select a book to index: "))
selectedbook = books[selectedbookno - 1]
print(
    "Indexing OCR files from {0}. Make sure you have added pagewise OCR/correct output to the folder 'output_files' within the given path"
    .format(selectedbook.fullpath.replace(".pdf", "")))

ocrTxtDir = selectedbook.fullpath.replace(".pdf", "") + "/output_files"

if not os.path.exists(ocrTxtDir):
    print("Text files do not exists as expected. Please check the path above")
    sys.exit(1)

ocrTxtFilesList = glob.glob(ocrTxtDir + "/*.txt")

if not len(ocrTxtFilesList) > 0:
    print("Text files do not exists as expected. Please check the path above")
    sys.exit(1)

indexDir = selectedbook.fullpath.replace(".pdf", "") + "/index_files"

#create images,text folder
if not os.path.exists(indexDir):
    os.mkdir(indexDir)

for txtFile in ocrTxtFilesList:
    pagejson = {}

    #print("bookuuid: {0}".format(selectedbook.bookuuid))
    pagejson["bookuuid"] = selectedbook.bookuuid.hex

    #print("author: {0}".format(selectedbook.author))
    pagejson["author"] = selectedbook.author

    #print("title: {0}".format(selectedbook.title))
    pagejson["title"] = selectedbook.title

    #print("id: {0}".format(
    #    selectedbook.bookuuid.hex + "_" +
    #    str(int(os.path.basename(txtFile).split(".")[0][-3:]))))
    pagejson["id"] = selectedbook.bookuuid.hex + "_" + str(
        int(os.path.basename(txtFile).split(".")[0][-3:]))

    # print("pageno: {0}".format(
    #    int(os.path.basename(txtFile).split(".")[0][-3:])))
    pagejson["pageno"] = int(os.path.basename(txtFile).split(".")[0][-3:])

    pagecontent = ""
    with open(txtFile) as tf:
        pagecontent = tf.read()

    #print("pagecontent: {0}" + pagecontent)
    pagejson["pagecontent"] = pagecontent

    jsonIndexFilePath = indexDir + "/" + os.path.basename(txtFile).split(
        ".")[0] + ".json"

    with open(jsonIndexFilePath, "w") as outfile:
        json.dump(pagejson, outfile)

Book.objects(bookuuid=selectedbook.bookuuid.hex).update_one(isIndexed=True)
