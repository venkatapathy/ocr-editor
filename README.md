# OCR Editor
**Requirements:**
- Python 3
- Git
- Nodejs >10 - used for the project 10.24.1 with corresponding npm
- Mongodb- db version used 3.6.3
- Tesseract 4

*Please note down:*

*- address and port to connect to mongodb*

*- username and password, if any*

*- path to db*


*Once all the software is installed.*


` git clone ocr-editor repo `
` cd ocr-editor `


**( Run each point in different a terminal for development )**


### *1. Starting the server*

1. Create a python virtual environment(called as ocrvenv here)
   Activate the virtual environment:<br /> 
        Linux: `. ocrvenv/bin/activate`<br />
        Windows: 'python3 -m venv /path/to/ocrvenv'

2. Install the requirements:
        `pip install -r requirements.txt`<br />
**NOTE: Windows users may face an issue in this step- saying 'Failure in building**
**wheel and setup.py install failure issues'. <br />In case you are faced with this, there are two things you can try out:**<br />
  **a. pip install wheel- to check if there's an inherent issue there.**<br />
  **b. Manually download the .whl files and then install it. Here is a nice short tutorial to follow: https://www.youtube.com/watch?v=MzV4N4XUvYc.**

3. Change the directory to ther server folder:`cd server`

4. Open `config/appconfig.py` in any texteditor and:
**change the address of MongoDB to the one you are connecting to**
**change the path to input and output directories where the pdf and ocr files will be saved(should be exisiting. Please end the path with "/")**

5. Now start the app: **Using GitBash or any terminal**<br />
       Linux: `./startapp.sh`
       Windows: `flask run`
**Go to the server URL (localhost:5000/books), if "[]" is displayed, the server is now working successfully. Else, check the earlier steps**
 
 
 
### *2. Starting the client*
1. Change the directory:`cd frontend>client`

2. Run `npm install`

3. Add `REACT_APP_SERVER_URL=http://localhost:5000` to the system environment variables

4. Finally, `npm start`

**At this point, install the tesseract engine from the official documentation, and note its file location. We also require the py-tesseract library, which was already installed in our requirements.txt file.**

### *3. OCRING:*
1. Change the directory: `cd pycodes`

2. Edit `pdf_to_tesseract_ocr.py` File

**Change the path to input and output directories where the pdf and ocr files  as before**
**Also change tesseract and tessdata directories to where the required language data is present**

3. Run `python pdf_to_tesseract_ocr.py` and follow the program flow

### Possible Errors while running the tool:

1. If you have the error while running mongodb and the error says mongodb.config is not found then change the name of the file mongod.config to mongodb.config in the etc directory. This usually happens if you install mongodb via **sudo apt-get instal**. L
2. Now after installing mongodb successful, run mongo on terminal and note down the port number, for instance if the address is **mongodb://127.0.0.1:27017** the port number is 27017. By default this should be the port number on which mongodb is running but its okay if the port number is different. 
3. Now copy this port number and add to his address to “mongodb://localhost:[Port Number]/sandhi-books”, without the brackets. Now go to sandhiserver/config/appconfig.py and paste this address after ‘host’.
4. Change the path of input and output directories that you created in appconfig.py file. Don’t forget the / at the end. Note that the path to directories should be complete and not any relative path.
5. Now open another window/lab in terminal and after activating your venv go to pycodes directory and run pytesseract_txt_ocr file in your text editor and change the default input and output directories in that file. These should be the same as that in the appconfig.py file.
6. In your browser where the web app is running go to address localhost:5000/cli and add a book in your input directory. Confirm by CDing into your input directory and you’ll notice a randomly named pdf. If yes, then everything is fine.
7. If you get a weird html error in red while adding the book then mostly you have not added REACTAPP in your PATH. To add in your path run ‘export REACT_APP_SERVER_URL=http://localhost:5000’. Again start the server run this command and then run npm start. 
8. Now run the file in pycodes in your terminal by executing python3 pytesseract_pdf_to_txt.py.
9. Error- pytesseract.pytesseract.TesseractNotFoundError: tesseract is not installed or it's not in your PATH. See README file for more information.
Possible reason- Tesseract not working. 
Solution- Install tesseract and note down two paths after installing tesseract: path to tesseract exec file( ends with bin) and path to tessdata (folder having language models). and edit them in 
*pdf_to_text.py.
10. If after uploading book at client server localhost:3000/cli, error occurs having few lines. 
Possibly it is because mongodb not working. It might be in inactive state.
Solution- Run command "sudo systemctl status mongod" , if its output shows status as inactive, then run this command "sudo systemctl start mongod". 
11. Error- File "pdf_to_txt_tesseract_ocr.py", line 125, in <module>
    config=tessdata_dir_config)
  File "/home/sudarshan/sandhi/sandhivenv/lib/python3.6/site-packages/pytesseract/pytesseract.py", line 432, in image_to_pdf_or_hocr
    return run_and_get_output(*args)
  File "/home/sudarshan/sandhi/sandhivenv/lib/python3.6/site-packages/pytesseract/pytesseract.py", line 289, in run_and_get_output
    with open(filename, 'rb') as output_file:
FileNotFoundError: [Errno 2] No such file or directory: '/tmp/tess_fcf0552u.hocr'
Solution- Solution- follow this link - https://stackoverflow.com/questions/66633373/pytessaract-image-to-pdf-or-hocr-function-not-working-in-aws-lambda
        

## Link to video for code walk through
https://www.youtube.com/watch?v=foRF1fd4yAo&feature=youtu.be

