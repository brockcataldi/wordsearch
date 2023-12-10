import { Direction } from "../constants";
import { getDirection } from "./getDirection";

export const getSelection = (bounds: HighlightBounds, grid: string[][]) => {

    switch(getDirection(bounds)){

        case Direction.HORIZONTAL:
        case Direction.HORIZONTAL_REVERSE:
        case Direction.VERTICAL:
        case Direction.VERTICAL_REVERSE:
        case Direction.BACKWARD:
        case Direction.BACKWARD_REVERSE:
        case Direction.FORWARD:
        case Direction.FORWARD_REVERSE:
        case Direction.POINT:
        default: 
            return grid[bounds.start.y][bounds.start.x]
    }

}