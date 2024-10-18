import { BreedDisplayProps } from "@/types"
import DogImage from "@/components/DogImage"

// Link that displays an image of the breed, the breed name, and links to the breed subpage.
// TODO: Mess around with styling and content.
export default function BreedDisplay(props: BreedDisplayProps) {
    return (
        <div>
            <a href={`/breeds/${props.name}`}>
                {props.name}
                <DogImage src={props.imageURL} alt={props.name} />
            </a>
        </div>
    )
}