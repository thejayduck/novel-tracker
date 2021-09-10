import PageBase from "components/pageBase"
import styles from 'styles/Book.module.scss'
import { Subtitle } from "../../components/header"
import dynamic from 'next/dynamic'

const BookCard = dynamic(() => import("components/cards/bookCard"))

export default function Book() {
    return (
        <PageBase>
            <section className={`${styles.headerWrap} flex flexColumn`}>
                <img className={`${styles.background} skeleton`} src="http://source.unsplash.com/200x300/?nature" />
                <div>
                    <img className="skeleton" src="https://dummyimage.com/200x300/0c92eb/fff" />
                </div>
                <h1>Ascendance of a Bookworm ~I'll do anything to become a librarian~ Part 1 Daughter of a Soldier</h1>
                <span className="fontSmall">Honzuki no Gekokujou: Shisho ni Naru Tame ni wa Shudan wo Erandeiraremasen Dai 1-bu - Heishi no Musume</span>
                <span className="fontSmall">本好きの下剋上 ~司書になるためには手段を選んでいられません~ 第一部「兵士の娘」</span>
            </section>
            <section className={`${styles.detailsWrap}`}>
                <Subtitle text="About" />
                <div className={`${styles.details} flex`}>
                    <DetailItem title="Author" value="Miya Kazuki" />
                    <DetailItem title="Volumes" value="3" />
                    <DetailItem title="Chapters" value="85" />
                    <DetailItem title="Status" value="Finished" />
                    <DetailItem title="Start Date" value="Jan 25, 2015" />
                    <DetailItem title="End Date" value="Jun 25, 2015" />
                </div>
                {/* <Subtitle text="Description" /> */}
                <p>
                    When a sickly young girl suddenly becomes obsessed with inventing new things,
                    her family and friends are all puzzled.
                    "What has gotten into Myne?" they wondered,
                    never dreaming that the answer is not a "What" but a "Who": Urano Motosu,
                    a book-loving apprentice librarian who died in an earthquake in Tokyo who somehow found herself in Myne's body!
                    And since Myne's world is still in a medieval stage,
                    where books can only be owned by the elite,
                    the new Myne intends to do everything she can to bring her beloved books to the masses in the time she has left.
                </p>
                <Subtitle text={`Volumes (3)`} />
                <div className={`${styles.volumeList} flex`}>
                    <BookCard />
                    <BookCard />
                    <BookCard />
                </div>
            </section>
        </PageBase>
    )
}

function DetailItem({ title, value }) {
    return (
        <div className={`${styles.detailItem}`}>
            <h3>{value}</h3>
            <span>{title}</span>
        </div>
    )
}