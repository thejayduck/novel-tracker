import PageBase from "./pageBase";
import styles from '../styles/bookInfo.module.css'
import Button from "../components/ui/button";

export default function BookInfo({ book, onExit, onAddClicked, onOutsideClicked }) {
    return (
        <PageBase>
            <div
                style={{
                    minHeight: "100vh",
                    height: "100%",
                    width: "100%"
                }}
            >
                <div className={styles.bannerWrapper}>
                    <img src="https://s4.anilist.co/file/anilistcdn/media/manga/banner/110801-9imzKpqqcnyE.jpg" />
                </div>
                <div className={styles.infoWrapper}>
                    <div className={styles.coverWrapper}>
                        <img className={styles.cover} src="https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx110801-P0va1ehMlNcL.jpg" />
                        <Button title="Add Book" onClick={() => { window.alert("Add") }} />
                        <br />
                        <Button title="Edit Book" onClick={() => { window.alert("Edit") }} />
                        <br />
                        <Button title="Back to Library" href="/" />
                        <ul>
                            <li><a>Title (Romanized):<br /> Honzuki no Gekokujou: Shisho ni Naru Tame ni wa Shudan wo Erandeiraremasen Dai 3-bu - Ryoushu no Youjo</a></li><br />
                            <li><a>Title (Native):<br /> 本好きの下剋上~司書になるためには手段を選んでいられません~第三部「領主の養女」<hr /></a></li>
                            <li><a>Total Volumes: 10</a></li>
                            <li><a>Total Chapters: 10</a></li><br />
                            <li><a>Start Date: 2015</a></li>
                            <li><a>End Date: 2017</a></li>
                            <li><a>Release Status: Releasing<hr /></a></li>
                            <li><a>Author: John Doe</a></li>
                        </ul>
                    </div>
                    <div className={styles.info}>
                        <h1 title="Title Here" className={styles.title}> Ascendance of a Bookworm: Part 3 </h1>
                        <div className={styles.descriptionWrapper}>
                            <h2>Description</h2>
                            <p className={styles.description}>
                                Following a disastrous encounter with a noble, Myne finally resolves to say goodbye to her family and friends in the lower city, changing her name to “Rozemyne” and beginning her new life as the adopted daughter of Ehrenfest’s archduke. However, her days as an archnoble in noble society are brutal, as she is put through rigorous etiquette and magic training on top of her duties as High Bishop and forewoman. It all proves too much for a weak little seven-year-old girl... Or it would have, had the High Priest not offered her the keys to the temple’s book room as a reward. If she could get her hands on those, she’d be able to read all sorts of precious books! Her name may have changed, but Rozemyne’s passion for books remains the same as she charges into a whole new world! The detailed setting expands as the printing industry grows in size. Here begins Part 3 of this biblio-fantasy for book lovers everywhere!
                            </p>
                        </div>
                        <div className={styles.volumeWrapper}>
                            <h2>Volumes</h2>
                            <div className={styles.volumeList}>
                                <div>
                                    <h3>Volume [1]</h3>
                                    <a>Chapter Count: 100</a>
                                    <br />
                                    <a>Extra Chapters: 10000</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </PageBase>
    );
}