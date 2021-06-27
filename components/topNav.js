import styles from '../styles/components/TopNav.module.css';
import { InputField } from './ui/inputField';
import { FooterButton } from './ui/button';
import { useState } from 'react';
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';

export default function TopNav({ hasModButtons, onAddBook, onSubmitBook, onSearch, hasSearch, hasAddBook }) {
    const [isSearching, setIsSearching] = useState(false);

    return (
        <div className={`${styles.headerWrap}`}>
            <AnimateSharedLayout>
                <div className={styles.buttonWrap}>
                    {/* <FooterButton title="TheJayDuck's Profile" text="Profile" icon="fas fa-user" />
                    <FooterButton title="Enter Forum" text="Forum" icon="fas fa-comment" /> */}
                    {hasSearch &&
                        <>
                            <FooterButton icon="fas fa-search" onClick={() => setIsSearching(isSearching => !isSearching)} />
                            <AnimatePresence>
                                {isSearching &&
                                    <motion.div
                                        layout
                                        className={styles.inputWrap}
                                        initial={{ width: 0 }}
                                        animate={{ width: "auto" }}
                                        exit={{ width: 0, transition: { display: "none" } }}
                                    >
                                        <InputField placeHolder="Search Books" onChange={onSearch} />
                                    </motion.div>}
                            </AnimatePresence>
                        </>
                    }
                    {hasAddBook && <FooterButton icon="fas fa-plus" text="Add Book" onClick={onAddBook} />}
                    {hasModButtons && <FooterButton icon="fas fa-feather-alt" text="Submit Book" href={onSubmitBook} />}
                </div>
            </AnimateSharedLayout>
        </div>
    );

}