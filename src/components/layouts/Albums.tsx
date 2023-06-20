function Albums(props: {images: string[]}) {
    const {images} = props

    return <ul className="grid grid-flow-row grid-cols-4 gap-2">
        {images.map((image, index) => <li key={index} className="">
            <img src={image} alt="" className="w-full object-cover rounded-md max-h-36" />
        </li>)}
    </ul>
}

export default Albums;