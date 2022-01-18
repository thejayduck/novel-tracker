// @ts-nocheck
import styles from "styles/components/InputField.module.scss";

import { AnimatePresence, motion } from "framer-motion";
import Fuse from "fuse.js";

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

import { InputField } from "./inputField";

export interface CustomDropdownProps {
  title?: string,
  options: string[],
  placeHolder?: string,
  onSelect?: () => void,
  onClear?: () => void,
}

export const CustomDropdown = forwardRef(({ title, options, placeHolder, onSelect }: CustomDropdownProps, inRef) => {
  const [isEnabled, setIsEnabled] = useState(false);
  // const [dropdownInput, setDropdownInput] = useState<string | null>("");
  const [isSelected, setIsSelected] = useState(false);
  const [results, setResults] = useState(options);

  const ref = useRef<HTMLInputElement>(null);
  useImperativeHandle(inRef, () => ref.current, [ref]);

  useEffect(() => {
    const fuseOptions = { includeScore: true };

    const fuse = new Fuse(options, fuseOptions);
    const fuseResults = fuse.search(ref.current?.value);

    setResults(ref.current?.value ? fuseResults.map(result => result.item) : options);
  }, [ref.current?.value]);

  return (
    <div className={styles.customDropdown}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.dropdownInput} >

        <InputField
          placeHolder={placeHolder}
          onClick={() => setIsEnabled(true)}
          ref={ref}
        />

        <div 
          className={styles.dropdownButton}
        >
          <a  
            onClick={() => 
            {  
              if (isSelected) {
                ref.current.value = "";
                setIsSelected(false);
              }
              else {
                setIsEnabled(prev => !prev);                
              }
            }} 
            className={isSelected ? "bx bxs-x-circle" : "bx bxs-down-arrow"}
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
            {/* <AnimatePresence>
              {dropdownInput &&
                <li onClick={() => {
                  setIsEnabled(false);
                  ref.current.value = dropdownInput;
                }}>
                  <span>Add: {dropdownInput}</span>
                </li>
              }
            </AnimatePresence> */}
            {
              results?.map(q => (
                <li 
                  onClick={() => 
                  {
                    setIsEnabled(false);
                    ref.current.value = q;
                    setIsSelected(true);
                    onSelect();
                  }} 
                  key={q}
                >
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