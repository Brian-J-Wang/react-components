import React, { isValidElement } from "react"

type ElementFilterProps = React.PropsWithChildren & {
    filter: string
}

/** When rendered, it loops through the children and filters it based on data-name. Elements without data-name can be
 * filtered through filterNamelessElement prop. non-element nodes are ignored.
  */
const FilterableList: React.FC<ElementFilterProps> = (props) => {
    console.log(React.Children.toArray(props.children));
    return React.Children.toArray(props.children).filter((child) => {
        if (!isValidElement<{ "data-filterable": string,"data-name"?: string }>(child)) {
            return true;
        }

        if (!child.props["data-filterable"]) {
            return true;
        }

        console.log((child.props["data-filterable"]).substring(0, props.filter.length), props.filter);

        if ((child.props["data-filterable"]).substring(0, props.filter.length) == props.filter) {
            return true;
        } else {
            return false;
        }
    })
}

export default FilterableList
