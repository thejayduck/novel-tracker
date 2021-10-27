// @ts-nocheck
import styles from "styles/components/InputField.module.scss";

import { motion } from "framer-motion";

import { forwardRef, useState } from "react";

import { NavigationButton } from "./button";
import { InputFieldNonManaged } from "./inputFieldNonManaged";

export interface CustomDropdownProps {
  title: string,
  options: string[],
  onChange: any, // TODO
}

export const CustomDropdown = forwardRef(({ title, options, onChange }: CustomDropdownProps, ref) => {
  const [isEnabled, setIsEnabled] = useState(false);


  return (
    <div className={styles.customDropdown}>
      <div className={styles.dropdownWrap} >
        {/* <NavigationButton text="Hey" onClick={() => setIsEnabled(prev => !prev)} /> */}
        <InputFieldNonManaged onClick={() => setIsEnabled(prev => !prev)}/>
        <i className={"bx bxs-down-arrow"} />
      </div>
      {isEnabled && 
      <ul>
        <li>
          <span>Lorem</span>
        </li>
      </ul>
      }

    </div>

  );
});

CustomDropdown.displayName = "CustomDropdown";