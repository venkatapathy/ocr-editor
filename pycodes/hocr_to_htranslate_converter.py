from bs4 import BeautifulSoup
import re
import os
import sys

#this function is used to merge two bbox boundaries into one
#given x00, y00, x01,y01, x10,y10, x11, y11 through title1 and title2
#return leftmost and topmost x0, y0, and rightmost, bottommost x1, y1
#TODO convert this function to return a polygon shape
def mergebbox(title1, title2):
  
  match1=re.search("^bbox ([0-9]+) ([0-9]+) ([0-9]+) ([0-9]+)",title1.replace(";",""))
  match2=re.search("^bbox ([0-9]+) ([0-9]+) ([0-9]+) ([0-9]+)",title2.replace(";",""))

  if(not match1 or not match2):
    print("No bbox? Returning empty title for bbox spec")
    return ''

  bboxret="bbox "
  if(int(match1.group(1))<int(match2.group(1))):
    bboxret+=match1.group(1)+" "
  else:
    bboxret+=match2.group(1)+" "

  if(int(match1.group(2))<int(match2.group(2))):
    bboxret+=match1.group(2)+" "
  else:
    bboxret+=match2.group(2)+" "

  if(int(match1.group(3))>int(match2.group(3))):
    bboxret+=match1.group(3)+" "
  else:
    bboxret+=match2.group(3)+" "

  if(int(match1.group(4).replace(";",""))>int(match2.group(2).replace(";",""))):
    bboxret+=match1.group(4)+";"
  else:
    bboxret+=match2.group(4)+";"
  
  return bboxret

htrans_doc_templatestr=input("Enter the path to htranslate template. Enter for default option:'home/ruralivrs/book-ocr/output_books/htranslatetemplate.htranslate'") or "/home/ruralivrs/book-ocr/output_books/htranslatetemplate.htranslate"



def hocr2htranslate(hocr_doc_str,htranslateDirStr):
    hocr_doc=open(hocr_doc_str,'r')
  
    soup = BeautifulSoup(hocr_doc, 'html.parser')

    htrans_doc_template=open(htrans_doc_templatestr)
    newsoup=BeautifulSoup(htrans_doc_template,'html.parser')

    #print(soup.prettify())
    #print(newsoup.prettify())

    #copy the head tags as is
    newsoup.head=soup.head

    #assuming only one page, copy its name and properties to the new soup
    newpagediv=newsoup.new_tag("div")
    newpagediv['class']=soup.body.div['class']
    newpagediv['id']=soup.body.div['id']
    newpagediv['title']=soup.body.div['title']


    #find all careas
    oldpage=soup.body.div
    careas=oldpage.find_all("div",attrs={"class": "ocr_carea"})
    #print("There are "+str(len(careas))+" careas in this hocr document\n")

    for carea in careas:
        paras=carea.find_all("p",attrs={"class": "ocr_par"})
        #print in console when there are more than one paras in a carea as this is unusall and needs
        #to be looked into
        #if(len(paras)>1):
            #print("There are "+str(len(paras))+" cparas in this hocr document\n")

        for para in paras:
            lines=para.find_all("span",attrs={"class": "ocr_line"})

            if(not lines):
                lines=para.find_all("span",attrs={"class": "ocr_header"})

            if(not lines):
                lines=para.find_all("span",attrs={"class": "ocr_caption"})

            if(not lines):
                lines=para.find_all("span",attrs={"class": "ocr_textfloat"})


            if(not lines):
                print("No lines in paragraph? Unusual! need to check: "+para['id'])
                continue

            newpara=newsoup.new_tag("p")
            newpara['class']=para['class']
            newpara['id']=para['id']
            newpara['title']=para['title']
            newpara['lang']=para['lang']

            #a sent can be made of one or more lines, seperated by a word with '.'
            newsentence=None
            isnewsentence=True
            hascompleted=False

            for line in lines:
                words=line.find_all("span",attrs={"class":"ocrx_word"})

                for word in words:
                    if not word.string:
                        continue

                    hascompleted=False

                    if(isnewsentence):
                        newsentence=newsoup.new_tag("span")
                        newsentence.string=""
                        newsentence['title']=word['title']
                        newsentence['class']="ocr_sent"
                        isnewsentence=False
                
                    #for now '.' signifies end of sentence
                    if('.' in word.string):
                        newsentence.string+=word.string
                        newsentence['title']=mergebbox(newsentence['title'],word['title'])
                        #print("entering sentence")
                        newpara.append(newsentence)
                        isnewsentence=True
                        hascompleted=True
                        continue

                    newsentence.string=newsentence.string+word.string+" "
                    newsentence['title']=mergebbox(newsentence['title'],word['title'])
            
                if(not hascompleted):
                    #print("entering finalsent")
                    newpara.append(newsentence)
              
                
                #print("entering para")
                newpagediv.append(newpara)


    #print("entering body")
    newsoup.body.append(newpagediv)        
    htrans_doc=open(htranslateDirStr+"/"+os.path.basename(hocr_doc_str).replace('.hocr','.htranslate'),'w')
    htrans_doc.write(newsoup.prettify())
    htrans_doc.close()
    htrans_doc_template.close() 
    print("Successfully converted: "+htranslateDirStr+"/"+os.path.basename(hocr_doc_str).replace('.hocr','.htranslate'))
    #print(newsoup.prettify())

InputDirIn=input("Enter the path to the output_books directory base. Press enter for default option: [/home/ruralivrs/book-ocr/output_books]") or "/home/ruralivrs/book-ocr/output_books"

book_names = [fn for fn in os.listdir(InputDirIn)]
print("Select bookname for which htranslate need to be created.\nInput the corresponding number")

counttmp=0

for f in book_names:
    counttmp+=1
    if(os.path.isdir(InputDirIn+"/"+f)):
        print(str(counttmp)+". "+f)

hocrfile_names=[]
chosendir= int(input("\nSelect a number from above based on the book you wanted to OCR:\n"))-1

try:
    print("converting hocr to htranslte from: "+InputDirIn+"/"+book_names[chosendir]+"/output_files")
    if not os.path.exists(InputDirIn+"/"+book_names[chosendir]+"/output_files"):
        raise NameError("outputfiles directory is not present. Have you ocred?")

    #check hocr files are present
    included_extensions = ['hocr']

    hocrfile_names = [fn for fn in os.listdir(InputDirIn+"/"+book_names[chosendir]+"/output_files") if any(fn.endswith(ext) for ext in included_extensions)]

    if(len(hocrfile_names)==0):
        raise NameError("No hocr files are present. Have you ocred?")

    if not os.path.exists(InputDirIn+"/"+book_names[chosendir]+"/htranslate_files"):
        os.mkdir(InputDirIn+"/"+book_names[chosendir]+"/htranslate_files")

    for hocrfilename in hocrfile_names:
        hocr2htranslate(InputDirIn+"/"+book_names[chosendir]+"/output_files/"+hocrfilename,InputDirIn+"/"+book_names[chosendir]+"/htranslate_files")

except Exception as err:
    print("Error: {0}".format(err))
    sys.exit(1)

