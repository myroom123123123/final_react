import SignInModal from "./../screens/SignInModal/SignInModal";
import SignRegister from "../screens/RegisterModal/RegisterModal";
import React, { useState } from "react";

const Header = () => {
    const [open, setOpen] = useState(false);
    const [openRegister, setOpenRegister] = useState(false);
    return (
        <>
            <button
                onClick={() => setOpen(true)}
            >
                Log in /
            </button>
            <button
                onClick={() => setOpenRegister(true)}
            >
                Register
            </button>
            <SignRegister setOpenRegister={openRegister} onCloseRegist={() => setOpenRegister(false)} />
            <SignInModal isOpen={open} onClose={() => setOpen(false)} />
        </>
    );
}
export default Header;