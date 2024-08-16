export function BoardBackgroundSelector({template_images}:{template_images: string[]}){
    return (
        <div className="flex relative">
            {template_images.map(image=> (
                <img src={image}/>
            ))}
        </div>
    )
}