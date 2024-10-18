import './Header.css'

import { FaDog } from "react-icons/fa";

export default function Header() {
    return (
        <header>
            <h1>
                <a href="/">
                    <FaDog />
                    <span> </span>
                    Dog Breed Explorer
                </a>
            </h1>
        </header>
    );
}