import { Menu, InputWithMenu, PrimaryInput, Submit, MenuInput, MenuSlot } from "../../../lib/InputWithMenu";

import styles from "./inputWithMenu.module.css";
import { MenuItem } from "../../../lib/InputWithMenu/Contexts/menuContext";


const HairLengthAttribute = () => {
    return (
        <>
            <h1>Hair Length</h1>
            <div className="flex justify-center ">
                <input type="button" value="short" className="hover:bg-slate-200 cursor-pointer px-2"/>
                <input type="button" value="medium" className="hover:bg-slate-200 cursor-pointer px-2"/>
                <input type="button" value="long" className="hover:bg-slate-200 cursor-pointer px-2"/>
            </div>
        </>
    )
}

const BreedAttribute = () => {
    return (
        <input type="button" value="Maine Coon"/>
    )
}

const GenderAttribute = () => {
    return (
        <input type="button" value="Male" />
    )
}

const items: MenuItem[] = [
    {
        name: "Hair Length",
        id: "hairLength",
        content: <HairLengthAttribute/>
    },
    {
        name: "Breed",
        id: "breed",
        content: <BreedAttribute/>
    },
    {
        name: "Gender",
        id: "gender",
        content: <GenderAttribute/>
    },
    {
        name: "GenAder",
        id: "genadar",
        content: <GenderAttribute/>
    },
    {
        name: "GeBnBder",
        id: "gebnbder",
        content: <GenderAttribute/>
    },
    {
        name: "Gender",
        id: "gendere",
        content: <GenderAttribute/>
    }
]

export const InputWithMenuBasic = () => {
    return (
        <InputWithMenu  onSubmit={() => new Promise<boolean>(() => true)} menuItems={items}>
            <Menu className={styles.menu}>
                <MenuSlot render={(item, isActive) => (
                    <div className={`${styles.menuItem} ${isActive && styles.menuItemActive}`}>{item.name}</div>
                )}/>
                <MenuInput className={styles.menuInput}/>
            </Menu>
            <div className={styles.inputBox}>
                <PrimaryInput className={styles.primaryInput} placeholder="Enter name, or type '/' to filter by attributes" />
                <Submit className="px-2 bg-blue-200">
                    Submit
                </Submit>
            </div>
        </InputWithMenu>
    )
}


export default InputWithMenuBasic;