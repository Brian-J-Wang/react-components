import React from "react";
import requireContext from "../../../lib/utilities/requireContext";
import { Attribute, AttributeMenu, PrimaryInput, RenderAttributes, RichInput, RichInputContext, SecondaryInput, ShowOnFilter, Submit } from "../../../lib/RichInput";

import styles from "./richInput.module.css";


const HairLengthAttribute = () => {
    const { setAttributeValue } = requireContext(RichInputContext);

    const setValue = (value: string) => () => {
        setAttributeValue(value);
    }

    const filterDisplay = (isSelected: boolean) => {
        return <small className={isSelected ? styles.attributeSelected : styles.attribute}>Hair Length</small>
    }

    return (
        <Attribute name="hair length" filterDisplay={filterDisplay} data-testid="attribute-1">
            <h1>Hair Length</h1>
            <div className="flex justify-center ">
                <input type="button" value="short" onClick={setValue("short")} className="hover:bg-slate-200 cursor-pointer px-2"/>
                <input type="button" value="medium" onClick={setValue("medium")} className="hover:bg-slate-200 cursor-pointer px-2"/>
                <input type="button" value="long" onClick={setValue("long")} className="hover:bg-slate-200 cursor-pointer px-2"/>
            </div>
        </Attribute>
    )
}

const BreedAttribute = () => {
    const { setAttributeValue } = requireContext(RichInputContext);

    const handleClick = () => {
        setAttributeValue("Maine Coon");
    }

    return (
        <Attribute name="breed" filterDisplay={(isSelected) => {
            return <small className={isSelected ? styles.attributeSelected : styles.attribute}>Cat Breed</small>
        }} data-testid="attribute-2">
            <input type="button" value="Maine Coon" onClick={handleClick}/>
        </Attribute>
    )
}

const GenderAttribute = () => {
    const { setAttributeValue } = requireContext(RichInputContext);

    const handleClick = () => {
        setAttributeValue("Maine Coon");
    }

    return (
        <Attribute name="gender" filterDisplay={(isSelected) => {
            return <small className={isSelected ? styles.attributeSelected : styles.attribute}>Gender</small>
        }} data-testid="attribute-3">
            <input type="button" value="Male" onClick={handleClick}/>
        </Attribute>
    )
}

export const RichInputMinimalStyling = () => {
    return (
        <RichInput onSubmit={() => Promise.resolve()}>
            <AttributeMenu className={styles.attributeMenu} data-testid="attributeMenu">
                <ShowOnFilter>
                    <h3 className={styles.attributeMenuTitle}>Select Attribute:</h3>
                </ShowOnFilter>
                <HairLengthAttribute />
                <BreedAttribute />
                <GenderAttribute />
            </AttributeMenu>
            <div className={styles.inputBox}>
                <SecondaryInput className={styles.secondaryInput} data-testid="secondary-input"/>
                <PrimaryInput className={styles.primaryInput} placeholder="Enter name, or type '/' to filter by attributes" />
                <Submit className="px-2 bg-blue-200">
                    Submit
                </Submit>
            </div>
            <RenderAttributes render={(attribute, controller) => (
                <div className="sty">{attribute.key}:{attribute.value}</div>
            )}/>
        </RichInput>
    )
}


export default RichInputMinimalStyling;