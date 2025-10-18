import { PropsWithChildren, useEffect, useRef } from "react"
import useLinearNavigation from "./useLinearNavigation";
import { NavigableMenuContext } from "./NavigableMenuContext";

type NavigableListProps = PropsWithChildren & {
    activeClass: string;
    active: boolean;
    onMenuItemClick?: (name: string) => void
    onMenuItemShift?: (name: string) => void
}

const NavigableMenu: React.FC<NavigableListProps> = (props) => {
    const content = useRef<HTMLDivElement>(null as unknown as HTMLDivElement);
    const navigationSurface = useLinearNavigation<string>([]);
    const activeStyling = props.activeClass.split(" ").filter(Boolean);

    useEffect(() => {
        if (!content) return;

        const ids = Array.from(content.current.children).filter((element) => {
            return element.getAttribute("data-menuitem") != null;
        }).map((menuItem) => {
            return menuItem.getAttribute("data-menuitem") as string;
        });

        navigationSurface.updateNavigationSurface(ids);

    }, [navigationSurface, props.children]);

    useEffect(() => {
        const onKeyboardInput = (ev: KeyboardEvent) => {
            if (ev.key === "ArrowUp") {
                navigationSurface.shiftActiveNode((surface, currentNode) => {
                    const index = surface.indexOf(currentNode);
                    if (index == 0) {
                        return currentNode;
                    } else {
                        content.current.querySelector(`[data-menuitem=${navigationSurface.activeNode}]`)?.classList.remove(...activeStyling)
                        return surface[index - 1];
                    }
                });
            } else if (ev.key === "ArrowDown") {
                navigationSurface.shiftActiveNode((surface, currentNode) => {
                    const index = surface.indexOf(currentNode);
                    if (index == surface.length - 1) {
                        return currentNode;
                    } else {
                        content.current.querySelector(`[data-menuitem=${navigationSurface.activeNode}]`)?.classList.remove(...activeStyling)
                        return surface[index + 1]
                    }
                })
            }
        }

        document.removeEventListener("keydown", onKeyboardInput);
        if (props.active) {
            document.addEventListener("keydown", onKeyboardInput);
        }
        return () => {
            document.removeEventListener("keydown", onKeyboardInput);
        }
    }, [navigationSurface, props.active, activeStyling]);

    useEffect(() => {
        if (props.active) {
            content.current.querySelector(`[data-menuitem=${navigationSurface.activeNode}]`)?.classList.add(...activeStyling);
        } else {
            content.current.querySelector(`[data-menuitem=${navigationSurface.activeNode}]`)?.classList.remove(...activeStyling);
            navigationSurface.shiftActiveNode((surface) => {
                return surface[0];
            })
        }
    });

    const handleHover = (name: string) => {
        if (navigationSurface.activeNode == name) {
            return;
        }
        navigationSurface.shiftActiveNode(() => {
            content.current.querySelector(`[data-menuitem=${navigationSurface.activeNode}]`)?.classList.remove(...activeStyling)
            return name;
        })
    }

    const handleClick = (value: string) => {
        if (props.onMenuItemClick) props.onMenuItemClick(value);
    }

    return (
        <NavigableMenuContext.Provider value={{handleHover, handleClick, activeNode: navigationSurface.activeNode ?? ""}}>
            <div tabIndex={-1} ref={content}>
                {
                    props.children
                }
            </div>
        </NavigableMenuContext.Provider>
    )
}

export default NavigableMenu;
