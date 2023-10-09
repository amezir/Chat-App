import React from 'react';
import style from '../styles/mention.module.scss';
import { useEffect } from 'react';
import { useRef } from 'react';

import gsap from 'gsap';

const LegalMention = () => {

    const mention = useRef(null);

    const btn = useRef(null);

    useEffect(() => {
        gsap.from(mention.current, {
            duration: 1,
            y: 100,
            opacity: 0,
            ease: "back.out(1.7)"
        })

        gsap.from(btn.current, {
            duration: 1,
            y: 100,
            opacity: 0,
            ease: "back.out(1.7)",
            delay: 1
        })

    }, [])

    return (
        <div className={style.ctn}
        >
            <div className={style.ctnMention} ref={mention}
            >
                <p>© Copyrights </p>
                <p> developped by <a href="https://github.com/amezir" target="_blank"
                >@amezir</a></p>
                <p>server by <a href="" blank>@karljstn</a></p>
                <p>made with Socket.io & Next.js & Gsap & SASS</p>
            </div>
            <a href="/login" ref={btn}
            >Back to Home</a>
        </div >
    );
}

export default LegalMention;
