import { PropsWithChildren, useEffect, useRef, createContext } from "react"
import useLinearNavigation from "./useLinearNavigation";


export const NavigableMenuContext = createContext<{ handleHover: (name: string) => void}>({ handleHover: () => {}});

type NavigableListProps = PropsWithChildren & {
    activeClass: string;
    active: boolean;
}

const NavigableMenu: React.FC<NavigableListProps> = (props) => {
    const content = useRef<HTMLDivElement>(null as unknown as HTMLDivElement);
    const navigationSurface = useLinearNavigation<string>([]);

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
                        content.current.querySelector(`[data-menuitem=${navigationSurface.activeNode}]`)?.classList.remove(props.activeClass)
                        return surface[index - 1];
                    }
                });
            } else if (ev.key === "ArrowDown") {
                navigationSurface.shiftActiveNode((surface, currentNode) => {
                    
                    const index = surface.indexOf(currentNode);
                    console.log(index, surface.length);
                    if (index == surface.length - 1) {
                        return currentNode;
                    } else {
                        content.current.querySelector(`[data-menuitem=${navigationSurface.activeNode}]`)?.classList.remove(props.activeClass)
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
    }, [navigationSurface, props.active, props.activeClass]);

    useEffect(() => {
        if (props.active) {
            content.current.querySelector(`[data-menuitem=${navigationSurface.activeNode}]`)?.classList.add(props.activeClass);
        } else {
            content.current.querySelector(`[data-menuitem=${navigationSurface.activeNode}]`)?.classList.remove(props.activeClass);
            navigationSurface.shiftActiveNode((surface) => {
                return surface[0];
            })
        }
    });

    const handleHover = (name: string) => {
        navigationSurface.shiftActiveNode(() => {
            content.current.querySelector(`[data-menuitem=${navigationSurface.activeNode}]`)?.classList.remove(props.activeClass)
            return name;
        })
    }

    return (
        <NavigableMenuContext.Provider value={{handleHover}}>
            <div tabIndex={-1} ref={content}>
                {
                    props.children
                }
            </div>
        </NavigableMenuContext.Provider>
    )
}

export default NavigableMenu;