const MainContainer = (props) => {
    return <div className={`grid grid-cols-12 lg:gap-8 m-auto ${props.width}`}>{props.children}</div>;
};

export default MainContainer;
