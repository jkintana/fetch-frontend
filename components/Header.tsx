import { FaDog } from "react-icons/fa";

// TODO add a way to navigate back home.
export default function Header() {
    return (
        <header>
            <h1>
                <FaDog />
                <a href="/">Dog Breed Explorer</a>
            </h1>
        </header>
    );
}