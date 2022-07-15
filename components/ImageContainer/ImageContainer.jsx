const ImageContainer = ({width, height, children, className}) => {
  return (
    <div className={className} style={{width: `${width}px`, height: `${height}px`, minWidth: `${width}px`, minHeight: `${height}px`, position: 'relative'}}>
        {children}
    </div>
  )
}

export default ImageContainer