import './BreedDisplay.css'

import { BreedDisplayProps } from "@/types"
import DogImage from "@/components/DogImage"

// Link that displays an image of the breed, the breed name, and links to the breed subpage.
// TODO: Mess around with styling and content.
export default function BreedDisplay(props: BreedDisplayProps) {
    return (
        <div className="item">
            <a href={`/breeds/${props.name}`}>
                <div>
                    <DogImage src={props.imageURL} alt={props.name} />
                </div>
                <div className="breed-name">
                    {props.name}
                </div>
            </a>
        </div>
    )
}