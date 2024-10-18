import Image from 'next/image'
import { DogImageProps } from "@/types";

const width = 200;
const height = 200;

// TODO Make these images square and scaled.
export default function DogImage(props: DogImageProps) {
    const width = 200;
    const src = props.src ? props.src : `https://placehold.co/${width}x${height}.png`;

    return (
        <div>
            <Image
                src={src}
                alt={props.alt}
                style={{ objectFit: 'cover' }} 
                width={width}
                height={height}
            />
        </div>
    )
}