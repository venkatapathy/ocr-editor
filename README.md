# sandhi- A Digital 
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

` git clone sandhi repo `
` cd sandhi `

**(all references below are from sandhi folder. Run each points in different terminal for development)**

### *1. starting the server*

`. sandhivenv/bin/activate`

`pip install -r requirements.txt`

`cd sandhiserver`

open `config/appconfig.py` in any texteditor and:

**change the address of MongoDB to one you are connecting to**
**change the path to input and output directories where the pdf and ocr files will be saved(should be exisiting. Please end the path with "/")**

`./startapp.sh`
 
### *2. starting the client*

`npm install`

`add REACT_APP_SERVER_URL=http://localhost:5000 to environment variable`

`npm start`

### *3. OCRING:*
`cd pycodes`

`edit pdf_to_tesseract_ocr.py`

**change the path to input and output directories where the pdf and ocr files  as before**

`python pdf_to_tesseract_ocr.py` and follow the program flow
