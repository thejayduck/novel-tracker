// @ts-nocheck
import styles from "styles/components/InputField.module.scss";

import { motion } from "framer-motion";
import Fuse from "fuse.js";

import { forwardRef, useEffect, useRef, useState } from "react";

import { InputField } from "./inputField";

export interface CustomDropdownProps {
  title?: string,
  options: string[],
  onChange: any, // TODO
  placeHolder?: string,
}

export const CustomDropdown = forwardRef(({ title, options, onChange, placeHolder }: CustomDropdownProps, ref) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const inputFieldRef = useRef<HTMLInputElement>();
  const [dropdownInput, setDropdownInput] = useState<string | null>(null);

  
  useEffect(() => {
    setDropdownInput(inputFieldRef.current?.value);
  }, [inputFieldRef.current?.value]);
  

  const fuseOptions = {
    includeScore: true
  };

  const fuse = new Fuse(options, fuseOptions);
  const fuseResults = fuse.search(dropdownInput);
  const results = dropdownInput ? fuseResults.map(result => result.item) : options;

  return (
    <div className={styles.customDropdown}>
      <div className={styles.dropdownWrap} >
        {/* <NavigationButton text="Hey" onClick={() => setIsEnabled(prev => !prev)} /> */}
        <InputField 
          placeHolder={placeHolder}
          onClick={() => setIsEnabled(prev => !prev)} 
          ref={inputFieldRef} 
          onChange={() => {
            setDropdownInput(inputFieldRef.current.value);
          }}
        />

        <i className={"bx bxs-down-arrow"} />
      </div>

      {isEnabled && 
      <ul>
        {dropdownInput && 
          <li>
            <span>Add: {dropdownInput}</span>
          </li>
        }
        {
          results?.map(q => (
            <li key={q}>
              <span>{q}</span>
            </li>
          ))
        }
      </ul>
      }

    </div>

  );
});

CustomDropdown.displayName = "CustomDropdown";