import styles from '../styles/BookInfo.module.css'
import jikanjs from 'jikanjs'
import { useState, useEffect } from 'react'

export default function BookInfo() {
  return (
    <div>
      <div className={styles.main}>
        <div className={styles.container}>
          <div className={styles.cover}>
            <img src="https://i.ibb.co/2dcp1RR/CQO6-Nvu-Uc-AAz-Q1-Y.jpg"/>
            <div className={styles.textContainer}>
              <p className={styles.title}> Bishounen Series </p>
              <p className={styles.synopsis}>Mayumi Dojima, a second-year student at the exclusive Yubiwa Academy middle school, has lost something—a star she glimpsed just once, ten long years ago. But help is on the way, in the form of the uno</p>
            </div>
          </div>
          <div className={styles.status}>
            <div>
              <div className={styles.statusTitle}>Chapter</div>
              <input
                min="0"
                type="number"
              />
            </div>
            <div>
              <div className={styles.statusTitle}>Volume</div>
              <input
                min="0"
                type="number"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}