import styles from '../styles/Search.module.scss'

// Components
import PageBase from "../components/pageBase";
import { InputFieldNonManaged } from "../components/ui/inputField";
import { Subtitle } from '../components/header';
import { useState } from 'react';
import { MobileOverlay } from '../components/mobileOverlay';

import dynamic from 'next/dynamic'

const BookCard = dynamic(() => import("../components/cards/bookCard"))

const data = [
    {
        title: "That Mysterious Transfer Student Molests People On The Train, Because My Imouto Is A Lovecraftian Horror!",
        image: "http://source.unsplash.com/200x300/?nature"
    },
]

export default function Search() {
    const [filterMenu, setFilterMenu] = useState(false);

    return (
        <PageBase>
            <div className={`${styles.inputWrap} flex`}>
                <InputFieldNonManaged placeHolder="Search..." />
                <a onClick={() => setFilterMenu(prev => !prev)} className={"fontLarge"} ><i className='bx bx-filter' /></a>

                {filterMenu &&
                    <div className={`floatingMenu desktop ${styles.filterOverlay}`} >
                        <span>Filter Results</span>
                        <div className={`${styles.children} flex`}>
                            <InputFieldNonManaged title="Publishing Status" />
                            <InputFieldNonManaged title="Genre" />
                            <InputFieldNonManaged title="Year" />
                        </div>
                    </div>
                }
            </div>
            <Subtitle text="Results" />
            <div className={`${styles.results} flex`}>
                <BookCard data={data[0]} />
            </div>

            {filterMenu &&
                <MobileOverlay title={"Filter Results"} onOutSideClick={() => setFilterMenu(false)} >
                    <InputFieldNonManaged placeHolder="Publishing Status" />
                    <InputFieldNonManaged placeHolder="Genre" />
                    <InputFieldNonManaged placeHolder="Year" />
                </MobileOverlay>
            }
        </PageBase >
    )
}