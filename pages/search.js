import styles from '../styles/Search.module.scss'

import PageBase from "../components/pageBase";
import { InputFieldNonManaged } from "../components/ui/inputField";
import BookCard from '../components/cards/bookCard';
import { Subtitle } from '../components/header';

const data = [
    {
        title: "Light Nove Title",
        image: "https://m.media-amazon.com/images/I/41gr3r3FSWL.jpg"
    },

]

export default function Search() {
    return (
        <PageBase>
            <div className={`${styles.inputWrap} flex`}>
                <InputFieldNonManaged placeHolder="Search..." />
                <a href="#" className={"fontLarge"} ><i className='bx bx-filter' /></a>
            </div>
            <Subtitle text="Results" />
            <div className={`${styles.results} flex`}>
                <BookCard data={data[0]} />
                <BookCard data={data[0]} />
                <BookCard data={data[0]} />
                <BookCard data={data[0]} />
                <BookCard data={data[0]} />
                <BookCard data={data[0]} />
                <BookCard data={data[0]} />
                <BookCard data={data[0]} />
                <BookCard data={data[0]} />
                <BookCard data={data[0]} />
                <BookCard data={data[0]} />
                <BookCard data={data[0]} />
                <BookCard data={data[0]} />
                <BookCard data={data[0]} />
            </div>
        </PageBase>
    )
}