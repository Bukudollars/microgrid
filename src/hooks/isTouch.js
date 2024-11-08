import { useState, useEffect } from 'react';

function isTouch() {
    const [touch, setTouch] = useState(false);

    useEffect(() => {
        const touchSupported = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        setTouch(touchSupported);
    }, []);

    return touch;
} export default isTouch;