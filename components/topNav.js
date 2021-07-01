import styles from '../styles/components/TopNav.module.css';
import { InputField } from './ui/inputField';
import { FooterButton } from './ui/button';
import { useState } from 'react';
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';

export default function TopNav({ hasModButtons, hasAdminButtons, onAddBook, onSubmitBook, onSearch, hasSearch, hasAddBook }) {
    const [isSearching, setIsSearching] = useState(false);

    return (
        <div className={`${styles.headerWrap}`}>
            <AnimateSharedLayout>
                <div className={styles.buttonWrap}>
                    <FooterButton icon="fas fa-fw fa-home" text="Home" href="/" />
                    {hasSearch &&
                        <>
                            <FooterButton icon="fas fa-fw fa-search" onClick={() => setIsSearching(isSearching => !isSearching)} />
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
                    {hasAddBook && <FooterButton icon="fas fa-fw fa-plus" text="Add Book" onClick={onAddBook} />}
                    <FooterButton icon="fas fa-fw fa-feather-alt" text="Submit Book" href={"/submitBook"} />
                    {hasModButtons && <FooterButton icon="fas fa-fw fa-columns" text="Mod Panel" href={"/modPanel"} />}
                    {hasAdminButtons && <FooterButton icon="fas fa-fw fa-columns" text="Admin Panel" href={"/adminPanel"} />}
                </div>
            </AnimateSharedLayout>
        </div>
    );

}