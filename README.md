# OCR Editor
**Requirements:**
- Python 3
- Git
- Nodejs >10 - used for the project 10.24.1 with corresponding npm
- Mongodb- db version used 3.6.3

*Please note down:*

*- address and port to connect to mongodb*

*- username and password, if any*

*- path to db*


*Once all the software is installed.*

` git clone OCR Editor repo `
` cd servesandhivenv `

**(all references below are from server folder. Run each points in different terminal for development)**

### *1. starting the server*

`. sandhivenv/bin/activate`

`pip install -r requirements.txt`
**For Windows Users: Download Visual Studio and install all C++ builds. If issue is faced regarding bitarray or any whl files, Manually download the .whl files and then install it. Here is a nice short tutorial to follow: https://www.youtube.com/watch?v=MzV4N4XUvYc.**
`cd server`
open `config/appconfig.py` in any texteditor and:

**change the address of MongoDB to the one you are connecting to**
**change the path to input and output directories where the pdf and ocr files will be saved(should be exisiting. Please end the path with "/")**
**Now using GitBash or any terminal**
`./startapp.sh`
**Go to the server URL and add /books, if "[]" is displayed, the server is now working successfully. Else, check the earlier steps**
 
### *2. starting the client*
`cd frontend>client`

`npm install`

`add REACT_APP_SERVER_URL=http://localhost:5000 to environment variable`
**Your server and client should work on similar URL, like localhost or any other IP address**
`npm start`
**To your URL, add "/cli" to open the client. The client is now working successfully. Else, check the earlier steps**
### *3. OCRING:*
`cd pycodes`

`edit pdf_to_tesseract_ocr.py`

**change the path to input and output directories where the pdf and ocr files  as before**

`python pdf_to_tesseract_ocr.py` and follow the program flow


### Possible Errors while running the tool:

1. If you have the error while running mongodb and the error says mongodb.config is not found then change the name of the file mongod.config to mongodb.config in the etc directory. This usually happens if you install mongodb via **sudo apt-get instal**. L
2. Now after installing mongodb successful, run mongo on terminal and note down the port number, for instance if the address is **mongodb://127.0.0.1:27017** the port number is 27017. By default this should be the port number on which mongodb is running but its okay if the port number is different. 
3. Now copy this port number and add to his address to “mongodb://localhost:[Port Number]/sandhi-books”, without the brackets. Now go to sandhiserver/config/appconfig.py and paste this address after ‘host’.
4. Change the path of input and output directories that you created in appconfig.py file. Don’t forget the / at the end. Note that the path to directories should be complete and not any relative path.
5. Now open another window/lab in terminal and after activating your venv go to pycodes directory and run pytesseract_txt_ocr file in your text editor and change the default input and output directories in that file. These should be the same as that in the appconfig.py file.
6. In your browser where the web app is running go to address localhost:5000/cli and add a book in your input directory. Confirm by CDing into your input directory and you’ll notice a randomly named pdf. If yes, then everything is fine.
7. If you get a weird html error in red while adding the book then mostly you have not added REACTAPP in your PATH. To add in your path run ‘export REACT_APP_SERVER_URL=http://localhost:5000’. Again start the server run this command and then run npm start. 
8. Now run the file in pycodes in your terminal by executing python3 pytesseract_pdf_to_txt.py.

