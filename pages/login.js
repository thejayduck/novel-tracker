import styles from '@styles/Login.module.scss'

import PageBase from '@components/pageBase';
import { Subtitle } from '@components/header';

export default function Login() {
    return (
        <PageBase>
            <div className={styles.container}>
                <img width="150" height="150" className={styles.logo} src='../icon.svg' />
                <div>
                    <h1>Welcome to <span>Novel Tracker!</span></h1>
                    <div className={styles.about}>
                        <Subtitle text="Features" />
                        <div className={`flex  ${styles.features}`}>
                            <FeatureItem
                                title="Automatic Chapter-Volume Conversion"
                                icon="bx bx-calculator"
                            >
                                Keep track of your novels easier with automatic chapter-volume conversion.
                            </FeatureItem>
                            <FeatureItem
                                title="Mobile-App Capable"
                                icon="bx bx-mobile-alt"
                            >
                                Our website is mobile-app capable, offering you a smooth experience.
                            </FeatureItem>
                            <FeatureItem
                                title="Account Syncing"
                                icon="bx bx-sync"
                            >
                                Bring your novel progress everywhere you go.
                            </FeatureItem>
                            <FeatureItem
                                title="Socialize"
                                icon="bx bx-comment-detail"
                            >
                                Follow your friends progress.
                            </FeatureItem>
                            <FeatureItem
                                title="Community Managed"
                                icon="bx bx-group"
                            >
                                Our library grows with every members contribution in the community.
                            </FeatureItem>
                        </div>
                        <br />
                        <a className={`${styles.googleBtn}`}>
                            <i className="bx bxl-google bx-sm"> </i> Login with Google
                        </a>
                    </div>
                </div>
            </div>
        </PageBase >
    );
}

function FeatureItem({ title, children, icon }) {
    return (
        <div className={"flex flexColumn flexBetween"}>
            <h3><i className={`${icon}`} /> {title}</h3>
            <p> {children} </p>
        </div>
    );
}