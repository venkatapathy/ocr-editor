from werkzeug.datastructures import FileStorage
from werkzeug.utils import secure_filename
from flask import current_app


def addDoctoDirectory(filename: str, uploaded_file: FileStorage):
    """
    - This code lets copy a file to the sandhi library directory and return the path to its future output_files such as OCR images, hocr, text files, etc
    - This is the second step in the adding the documents to sandhi digital library. First step being add the metada of the book to the database.
    - The filename used for storing the pdf file into the library is the primary key 'id' of the book in the database

    Parameters:
    ----------
    filename - 'bookid'.pdf
    uploaded_file - file to be added to the library,
    app- Flask instance object. (need to check if we need this)
    """

    filepath = current_app.config['SANDHI_LIB_INPUT_DIR'] + "/" + str(
        filename) + ".pdf"

    #save the file and send its output_files folder

    outfilepath = current_app.config['SANDHI_LIB_OUTPUT_DIR'] + "/" + str(
        filename) + ".pdf"
    uploaded_file.save(filepath)
    return outfilepath
