import styles from '@styles/Search.module.scss'

// Components
import PageBase from "@components/pageBase";
import { InputFieldNonManaged } from '@components/ui/inputField';

import { Subtitle } from '@components/header';
import { useState } from 'react';
import { DesktopOverlay, MobileOverlay } from '@components/overlayMenu';

import dynamic from 'next/dynamic'
import { AnimatePresence } from 'framer-motion';

const BookCard = dynamic(() => import("@components/cards/bookCard"))

const data = {
    title: "That Mysterious Transfer Student Molests People On The Train, Because My Imouto Is A Lovecraftian Horror!",
    image: "http://source.unsplash.com/200x300/?nature"
}

export default function Search() {
    const [filterMenu, setFilterMenu] = useState(false);

    return (
        <PageBase>
            <div className={`${styles.inputWrap} flex`}>
                <InputFieldNonManaged placeHolder="Search..." />
                <a onClick={() => setFilterMenu(prev => !prev)} className={"fontLarge"} ><i className='bx bx-filter' /></a>

                <AnimatePresence>
                    {filterMenu &&
                        <DesktopOverlay title="Filter Results" className={styles.filterOverlay}>
                            <InputFieldNonManaged title="Publishing Status" />
                            <InputFieldNonManaged title="Genre" />
                            <InputFieldNonManaged title="Year" />
                        </DesktopOverlay>
                    }
                </AnimatePresence>
            </div>
            <Subtitle text="Results" />
            <div className={`${styles.results} flex`}>
                <BookCard data={data} />
                <BookCard data={data} />
                <BookCard data={data} />
                <BookCard data={data} />
                <BookCard data={data} />
                <BookCard data={data} />
                <BookCard data={data} />
                <BookCard data={data} />
                <BookCard data={data} />
                <BookCard data={data} />
                <BookCard data={data} />
                <BookCard data={data} />
                <BookCard data={data} />
            </div>

            <AnimatePresence>
                {filterMenu &&
                    <MobileOverlay title={"Filter Results"} onOutSideClick={() => setFilterMenu(false)} >
                        <InputFieldNonManaged placeHolder="Publishing Status" />
                        <InputFieldNonManaged placeHolder="Genre" />
                        <InputFieldNonManaged placeHolder="Year" />
                    </MobileOverlay>
                }
            </AnimatePresence>

        </PageBase >
    )
}