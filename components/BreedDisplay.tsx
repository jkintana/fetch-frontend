// Link that displays an image of the breed, the breed name, and links to the breed subpage.
// TODO: Mess around with styling and content.
export default function BreedButton(props: { name: string }) {
    return (
        <a href={`/breeds/${props.name}`}>{props.name}</a>
    )
}