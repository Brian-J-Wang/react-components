import { useRef, useState } from "react";

export default function useLinearNavigation<T>(initialSurface: Array<T>) {
    const navigationSurface = useRef<Array<T>>(initialSurface);
    const [ activeNode, setActiveNode ] = useState<T | null>(null);

    const updateNavigationSurface = (newSurface: Array<T>) => {
        if (activeNode == null && newSurface.length >= 1) {
            setActiveNode(newSurface[0]);
            navigationSurface.current = newSurface;
            return;
        }

        let activeNodeIncluded = false;
        const newSurfaceWithActiveNode = navigationSurface.current.filter((node) => {
            if (newSurface.includes(node)) {
                if (node == activeNode) {
                    activeNodeIncluded = true;
                }
                return true;
            } else if (node == activeNode) {
                return true;
            } else {
                return false;
            }
        })

        //move the node to the nearest available node
        if (!activeNodeIncluded) {
            if (newSurfaceWithActiveNode.length == 1) {
                setActiveNode(null);
                return;
            }

            if (!activeNode) return;
            const activeNodeIndex = newSurfaceWithActiveNode.indexOf(activeNode);
            
            if (activeNodeIndex == 0) {
                setActiveNode(newSurfaceWithActiveNode[1]);
            } else {
                setActiveNode(newSurfaceWithActiveNode[activeNodeIndex - 1]);
            }
        }

        navigationSurface.current = newSurface;
    }

    //moves the cursor up or down to the next non-hidden attribute. Defaults to original cursor if none is found;
    const shiftActiveNode = (fn: (navigationSurface: Array<T>, currentNode: T) => T) => {
        if (activeNode != null) {
            const newNode = fn(navigationSurface.current, activeNode);
            setActiveNode(newNode);
        }
    }

    return {
        updateNavigationSurface,
        shiftActiveNode,
        activeNode
    }
}