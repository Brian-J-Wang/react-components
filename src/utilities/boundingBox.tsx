import { RefObject, useEffect, useRef } from "react"
import { Position } from "./position";

type BoundingBoxProps = React.HTMLAttributes<HTMLDivElement> &{
    /** should the listeners fire? */
    isActive: boolean,
    /** fired when mouse clicks within the bounding box */
    onBound?: (evt: MouseEvent) => void,
    /** fired when the mouse clicks outside of the bounding box */
    onOutOfBound?: (evt: MouseEvent) => void,
}

export type OutofBoundsHandle = {
    setListen: (value: boolean) => void;
}

/** An HTML div element with attached listeners that fires when a mouse a mouse click occurs */
const BoundingBox: React.FC<BoundingBoxProps> = ({isActive, onBound, onOutOfBound, ...props}) => {
    const boundingDiv = useRef<HTMLDivElement>(null) as RefObject<HTMLDivElement>;

    useEffect(() => {
        document.addEventListener("click", handleMouseDown);

        return () => {
            document.removeEventListener("click", handleMouseDown);
        }
    }, []);

    function handleMouseDown(evt: MouseEvent) {
        if (!isActive || evt.button != 0) {
            return;
        }

        const clientRect = getBounds();

        if (clientRect && withinBounds(clientRect, {
            x: evt.clientX,
            y: evt.clientY
        })) {
            onBound && onBound(evt);
        } else {
            onOutOfBound && onOutOfBound(evt);
        }

        function getBounds() {
            const element = boundingDiv.current?.querySelector("[data-bounding-element]");
    
            if (element) {
                return element.getBoundingClientRect();
            } else {
                return boundingDiv.current?.getBoundingClientRect();
            }
        }
    
        function withinBounds(clientRect: DOMRect, position: Position) {
            if (position.x < clientRect.left || position.x > clientRect.right) {
                return false;
            }
    
            if (position.y < clientRect.top || position.y > clientRect.bottom) {
                return false;
            }
    
            return true;
        }
    }

    return (
        <div ref={boundingDiv} {...props}>
            { props.children }
        </div>
    )
}

export default BoundingBox;