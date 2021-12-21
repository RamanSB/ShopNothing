const CollectionHeader = (props: any) => {
    const headerContainerStyle = {
        background: "#011627",
        color: "white",
        fontFamily: "Oooh Baby",
        fontSize: "3em",
        padding: "32px",
        alignSelf: "flex-start",
        margin: "0 0 0 5%"
    }
    return (
        <div style={headerContainerStyle}>
            <p>{props.children}</p>
        </div>)
}

export default CollectionHeader;