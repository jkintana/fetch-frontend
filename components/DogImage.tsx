// TODO Make these images square and scaled.
export default function DogImage(props: { src: string, alt: string }) {
    return (
        <img src={props.src} alt={props.alt} />
    )
}