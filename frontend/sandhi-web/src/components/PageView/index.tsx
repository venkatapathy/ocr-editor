import ToolBar from "./ToolBar";

function PageViewer() {
	return (
		<>
			<ToolBar />
			<div className="container-fluid pv-container pt-2 pb-4 px-2">
				<div className="row vh-100 gx-2">
					<div className="col-md-6">
						<div className="p-3 border pv-pane">
							Custom column padding
						</div>
					</div>
					<div className="col-md-6">
						<div className="p-3 border pv-pane">
							Custom column padding
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default PageViewer;
