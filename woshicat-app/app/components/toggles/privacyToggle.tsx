'use client';

import { useMetaPixel } from "../MetaPixel/PixelContext";

const PrivacyToggleButton = () => {
    const { consent, setConsent } = useMetaPixel();
    
    function toggle() {
        console.log(consent);
        if (consent === 'grant') {
            setConsent('revoke');
            localStorage.setItem('consent', 'revoke');
        } else {
            setConsent('grant');
            localStorage.setItem('consent', 'grant');
        };
        console.log(consent);
    };

    return (
        <>
            <button className="relative inline-block w-10 h-5 flex justify-center items-center">
                <input id="switch-component-privacy" type="checkbox" className="peer appearance-none w-full h-full bg-stone-400 rounded-full checked:bg-red-900 cursor-pointer transition-colors duration-300" onChange={toggle} checked={consent === 'grant' ? true : false}/>
                <label  htmlFor="switch-component-privacy" className="absolute top-0 left-0 w-5 h-full bg-white rounded-full border border-stone-400  transition-transform duration-300 peer-checked:translate-x-5 peer-checked:border-[#6e08a] cursor-pointer">
                </label>
            </button>
        </>
    )
};

export default PrivacyToggleButton;