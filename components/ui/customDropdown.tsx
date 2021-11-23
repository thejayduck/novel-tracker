// @ts-nocheck
import styles from "styles/components/InputField.module.scss";

import { AnimatePresence, motion } from "framer-motion";
import Fuse from "fuse.js";

import { forwardRef, useEffect, useRef, useState } from "react";

import { InputField } from "./inputField";

export interface CustomDropdownProps {
  title?: string,
  options: string[],
  onChange: any, // TODO
  placeHolder?: string,
}

export const CustomDropdown = forwardRef(({ title, options, placeHolder }: CustomDropdownProps, ref) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const inputFieldRef = useRef<HTMLInputElement>();
  const [dropdownInput, setDropdownInput] = useState<string | null>("");


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
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.dropdownInput} >
        <InputField
          placeHolder={placeHolder}
          onClick={() => setIsEnabled(prev => !prev)}
          ref={inputFieldRef}
          onChange={() => {
            setDropdownInput(inputFieldRef.current.value);
          }}
        />

        <div className={styles.dropdownButton}>
          <i
            className={"bx bxs-down-arrow"}
          />
        </div>
      </div>

      <AnimatePresence>
        {isEnabled &&
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          >
            <AnimatePresence>
              {dropdownInput &&
                <li>
                  <span>Add: {dropdownInput}</span>
                </li>
              }
            </AnimatePresence>
            {
              results?.map(q => (
                <li key={q}>
                  <span>{q}</span>
                </li>
              ))
            }
          </motion.ul>
        }
      </AnimatePresence>
    </div>

  );
});

CustomDropdown.displayName = "CustomDropdown";