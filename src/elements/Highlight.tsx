import styled from "styled-components";

interface HighlightProps{
    $bounds: HighlightBounds
    $cellSize: number
    $current: boolean
}

const Highlight = styled.div<HighlightProps>`
    position: absolute;
    box-sizing: border-box;

    ${({$cellSize, $current}) => {
        return `
            width: ${$cellSize}px;
            height: ${$cellSize}px;
            border: 2px solid ${$current ? 'red' : 'black'};
        `;
    }}
`;

export default Highlight;