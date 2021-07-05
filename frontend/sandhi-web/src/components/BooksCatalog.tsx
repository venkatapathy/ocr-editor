function BooksCatalog() {
	const booksList = [
		{
			_id: { $oid: "60e296f72d76503e10205133" },
			title: "Sukra Neeti Sara",
			author: "A Author",
			fullpath: "/path/to/book/pdf",
		},
		{
			_id: { $oid: "60e2cd9237ca51041bc241de" },
			title: "Sukra Neeti Sara",
			author: "A Author",
			fullpath: "/path/to/book/pdf",
		},
		{
			_id: { $oid: "60e2cf76b7873293bb9ba1ed" },
			title: "Vara 68",
			author: "A Author",
			fullpath: "/path/to/pdf",
		},
		{
			_id: { $oid: "60e2d0b5b7873293bb9ba1ee" },
			title: "Vara 68 and 86",
			author: "A Author",
			fullpath: "/path/to/pdf",
		},
	];

	const trItem = booksList.map((bookItem,index) => 
		<tr key={bookItem._id.$oid}>
			<th>{index}</th>
			<td>{bookItem.title}</td>
			<td>{bookItem.author}</td>
			<td>
				<a href={"/pageview?b="+bookItem._id.$oid}>
					View Book
				</a>
			</td>
		</tr>
	);
	return (
		<div className="container">
			<div className="row">
				<div className="col">
					<table class="table table-striped">
						<thead>
							<tr>
								<th scope="col">
									#
								</th>
								<th scope="col">
									Title
								</th>
								<th scope="col">
									Author
								</th>
								<th scope="col">
									Link to
									the Book
								</th>
							</tr>
						</thead>
						<tbody>{trItem}</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
export default BooksCatalog;
