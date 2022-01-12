from .book import BooksApi, BookApi
from .bookresources import ImageApiHandler, HocrApiHandler, SearchQueryHandler


# pageview test
def initialize_routes(api):
    api.add_resource(BooksApi, '/books')
    api.add_resource(BookApi, '/books/<id>')
    api.add_resource(SearchQueryHandler, '/s/<string:query>')
    api.add_resource(ImageApiHandler, '/i/b/<string:bid>/p/<int:pid>/')
    api.add_resource(HocrApiHandler, '/h/b/<string:bid>/p/<int:pid>/')
