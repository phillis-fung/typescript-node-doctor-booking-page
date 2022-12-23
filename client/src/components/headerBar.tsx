import styled from "styled-components"

const HeaderTitle = styled.h3`
    color: white;
    text-align: center;
    flex: 1
`;

const HeaderWrapper = styled.div`
    background-color: #ff408e;
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: 1vh;
`;

export interface headerBarInterface {
    title: string | undefined
}

const HeaderBar: React.FC<headerBarInterface> = ({title}: headerBarInterface) => {
    return (
        <HeaderWrapper>
            <HeaderTitle>{title}</HeaderTitle>
        </HeaderWrapper>
    );
}


export default HeaderBar;