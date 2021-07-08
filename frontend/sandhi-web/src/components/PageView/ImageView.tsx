import React, { Component } from "react";
import { render } from "react-dom";
import { Stage, Layer, Image } from "react-konva";
import useImage from "use-image";
import PageImageInfo from "../types";

// custom component that will handle loading image from url
// you may add more logic here to handle "loading" state
// or if loading is failed
// VERY IMPORTANT NOTES:
// at first we will set image state to null
// and then we will set it to native image instance when it is loaded


export interface Props {
	pageImage: PageImage | null;

}

/* interface State {
	image: null;
} */

class ImageView extends React.Component<Props, State> {
	/* state: State = {
		image: null,
	}; */
	image = null;

	componentDidUpdate(oldProps) {
		if (
			oldProps.pageImage?.urlObject !==
			this.props.pageImage?.urlObject
		) {
			this.loadImage();
		}
	}

	componentWillUnmount() {
		this.image?.removeEventListener("load", this.handleLoad);
	}

	loadImage() {
		// save to "this" to remove "load" handler on unmount
		this.image = new window.Image();
		this.image.src = this.props.pageImage?.urlObject;
	}

	/* handleLoad = () => {
		// after setState react-konva will update canvas and redraw the layer
		// because "image" property is changed
		this.setState({
			image: this.image,
		});
		// if you keep same image object during source updates
		// you will have to update layer manually:
		// this.imageNode.getLayer().batchDraw();
	}; */
	
	render() {
		return (
			<Image
				image={this.image}
				ref={(node) => {
					this.imageNode = node;
				}}
				width={this.props.pageImage?.curWidth}
				height={this.props.pageImage?.curHeight}
			/>
		);
	}
}

export default ImageView;
