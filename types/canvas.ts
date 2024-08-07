export type Color = {
	r: number;
	g: number;
	b: number;
};

export type Camera = {
	x: number;
	y: number;
};

export enum LayerType {
	Rectangle,
	Ellipse,
	Path,
	Text,
	Note,
}

export type RectangleLayer = {
	type: LayerType.Rectangle;
	x: number;
	y: number;
	width: number;
	height: number;
	fill: Color;
	value?: string;
};

export type EllipseLayer = {
	type: LayerType.Ellipse;
	x: number;
	y: number;
	width: number;
	height: number;
	fill: Color;
	value?: string;
};

export type PathLayer = {
	type: LayerType.Path;
	x: number;
	y: number;
	fill: Color;
	value?: string;
	height: number;
	width: number;
	points: number[][];
};
export type TextLayer = {
	type: LayerType.Text;
	x: number;
	y: number;
	fill: Color;
	value?: string;
	height: number;
	width: number;
};
export type NoteLayer = {
	type: LayerType.Note;
	x: number;
	y: number;
	fill: Color;
	value?: string;
	height: number;
	width: number;
};

export type Point = {
	x: number;
	y: number;
};

export type XYWH = {
	x: number;
	y: number;
	width: number;
	height: number;
};

export enum Side {
	Top = 1,
	Bottom = 2,
	Left = 4,
	Right = 8,
}

export type CanvasState =
	| {
			mode: CanvasMode.None;
	  }
	| {
			mode: CanvasMode.SelectionNet;
			origin: Point;
			current?: Point;
	  }
	| {
			mode: CanvasMode.Translating;
			current: Point;
	  }
	| {
			mode: CanvasMode.Resizing;
			initialBounds: XYWH;
			corner: Side;
	  }
	| {
			mode: CanvasMode.Pencil;
	  }
	| {
			mode: CanvasMode.Inserting;
			layerType:
				| LayerType.Ellipse
				| LayerType.Rectangle
				| LayerType.Text
				| LayerType.Note;
	  }
	| {
			origin: Point;
			mode: CanvasMode.Pressing;
	  };

export enum CanvasMode {
	None,
	SelectionNet,
	Translating,
	Resizing,
	Pencil,
	Inserting,
	Pressing,
}

export type Layer =
	| RectangleLayer
	| EllipseLayer
	| TextLayer
	| NoteLayer
	| PathLayer;
