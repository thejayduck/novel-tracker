// @ts-nocheck
import styles from "styles/components/InputField.module.scss";

import { AnimatePresence, motion } from "framer-motion";
import Fuse from "fuse.js";

import { useEffect, useRef, useState } from "react";

import { InputField } from "./inputField";

export interface CustomDropdownProps {
  title?: string,
  options: string[],
  placeHolder?: string,
  onSelect?: (s: string) => void,
  onClear?: () => void,
}

export const CustomDropdown = ({ title, options, placeHolder, onSelect, onClear }: CustomDropdownProps) => {

  const [isEnabled, setIsEnabled] = useState(false);
  const [input, setInput] = useState<string | null>("");
  const [isSelected, setIsSelected] = useState(false);
  const [results, setResults] = useState(options);
  const inputFieldRef = useRef<HTMLInputElement>();

  useEffect(() => {
    const fuseOptions = { includeScore: true };

    const fuse = new Fuse(options, fuseOptions);
    const fuseResults = fuse.search(input);

    setResults(input ? fuseResults.map(result => result.item) : options);
  }, [input]);

  return (
    <div className={styles.customDropdown}>
      <h3 className={styles.title}>{title}</h3>
      <div className={`${styles.customSelect} mobile`}>
        <select onChange={e => onSelect(e.target.value)}>
          {
            options.map(q => (
              <option key={q} value={q}>{q}</option>
            ))
          }
        </select>
        <a onClick={() => onClear()} ><i className="bx bxs-x-circle" /></a>
      </div>

      {/* Desktop */}
      <div className={`${styles.dropdownInput} desktop`} >
        <InputField
          ref={inputFieldRef}
          placeHolder={placeHolder}
          onClick={() => setIsEnabled(true)}
          onChange={e => setInput(e.target.value)}
        />

        <div 
          className={styles.dropdownButton}
        >
          <a  
            onClick={() => 
            {  
              if (isSelected) {
                setIsSelected(false);
                inputFieldRef.current.value = null;
                setInput("");
                onClear();
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
            className={"unorderedList"}
          >
            {/* <AnimatePresence>
              {dropdownInput &&
                <li onClick={() => {
                  setIsEnabled(false);
                }}>
                  <span>Add: {dropdownInput}</span>
                </li>
              }
            </AnimatePresence> */}
            {
              results?.map(q => (
                <li
                  key={q}
                  onClick={() => 
                  {
                    onSelect(q);
                    setInput(q);
                    setIsEnabled(false);
                    setIsSelected(true);
                    inputFieldRef.current.value = q;
                  }} 
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
};

CustomDropdown.displayName = "CustomDropdown";