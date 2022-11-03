import styled, {css} from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const colores = {
    borde: '#0075ff',
    error: '#bb2929',
    error2: '#f66060',
    exito: '#1ed12d'
}

const Formulario = styled.form`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;

    @media (max-width: 800px) {
        grid-template-columns: 1fr;
    }
`;

const Label = styled.label`
    display: block;
    font-weight: 700;
    padding: 10px;
    min-height: 40px;
    cursor: pointer;

    ${props => props.valido === 'false' && css`
    color: ${colores.error} !important;
    `}
`;

const GrupoInput = styled.div `
    position: relative;
    z-index: 1;
`;

const InputCampo = styled.input`
    width: 100%;
    background-color: #fff;
    border-radius: 3px;
    height: 45px;
    line-height: 45px;
    padding: 0 40px 0 10px;
    border: 3px solid transparent;
    transition: 0.3s ease all;

    &:focus{
        border: 3px solid ${colores.borde};
        outline: none;
        box-shadow: 3px 0px 30px rgba(163,163,163,0.4);
    }

    /* ${props => props.valido === 'true' && css`
    border: 3px solid ${colores.exito} !important;
    `} */
    
    ${props => props.valido === 'false' && css`
    border: 3px solid ${colores.error} !important;
    `}
`;

const LeyendaError = styled.p`
    font-size: 12px;
    margin-top: 10px;
    color: ${colores.error};
    display: none;

    ${props => props.valido === 'true' && css`
        display: none;
    `}
    ${props => props.valido === 'false' && css`
        display: block;
    `}
`;


const IconoValidacion = styled(FontAwesomeIcon)`
    position: absolute;
    right: 10px;
    bottom: 14px;
    z-index: 5;
    font-size: 20px;
    opacity: 0;

    ${props => props.valido === 'true' && css`
        opacity: 1;
        color: ${colores.exito} !important;
    `}
    ${props => props.valido === 'false' && css`
        opacity: 1;
        color: ${colores.error} !important;
    `}
`;

const ContenedorTerminos = styled.div`
    grid-column: span 2;
    text-align: left;


    input {
        margin-right: 10px;
    }

    @media(max-width: 800px){
        grid-column: 1/2;
    }
`;

const ContenedorBotonCentrado = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    grid-column: 1/3;

    @media(max-width: 800px){
        grid-column: 1/2;
    }
`;

const Boton = styled.button`
    height: 45px;
    line-height: 45px;
    width: 30%;
    background-color: #fff;
    color: #000;
    font-weight: bold;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    transition: 0.1s ease all;
    margin-top: 1rem;

    &:hover{
        box-shadow: 3px 0 30px rgba(163, 163, 163, 1);
    }
`;

const MensajeExito = styled.p`
    font-size: 14px;
    color: ${colores.exito};
    margin-top: 10px;
    /* display: none; */
`;

const MensajeError = styled.div`
    height: 45px;
    line-height: 45px;
    background-color: ${colores.error2};
    padding: 0 15px;
    border-radius: 3px;
    grid-column: 1/3;

    p{
        margin: 0;
    }
    b{
        margin-left: 10px;
    }

    @media(max-width: 800px){
        grid-column: 1/2;
    }
`;

const ContainerDashboard = styled.div`
    display: grid;
    grid-template-columns: 1fr 3fr;
    padding: 0 5rem;

    @media(max-width: 800px){
        grid-template-columns: 1fr;
    }
`;

const ContainerNavBar= styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    height: 90vh;
    padding: 1rem 0;
    border-right: 1px solid white;

    @media(max-width: 800px){
        grid-template-columns: 1fr;
        border-right: 0px solid white;
        border-bottom: 1px solid white;
        height: auto;
    }
`;

const ContainerPanel = styled.div`
    padding: 1rem;
`;

const ContainerCreatePlaca = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    grid-column: 1/3;

    @media(max-width: 800px){
        grid-column: 1/2;
        flex-direction: column;
    }
`;

const ContainerFactura = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-top: 2rem;
`;

const ContainerRegistroItem = styled.div`
    display: grid;
    grid-template-columns: 1fr 0.5fr 1fr;
    align-items: center;
    gap: 0 1rem;

    @media(max-width: 870px){
        grid-template-columns: 1fr;
        width: 10rem;
    }
`;

const ContainerTodosLosRegistros = styled.div`
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: space-around;
`;



export {
    Formulario,
    Label,
    GrupoInput,
    InputCampo,
    LeyendaError,
    IconoValidacion,
    ContenedorTerminos,
    ContenedorBotonCentrado,
    Boton,
    MensajeExito,
    MensajeError,
    ContainerDashboard,
    ContainerNavBar,
    ContainerPanel,
    ContainerCreatePlaca,
    ContainerFactura,
    ContainerRegistroItem,
    ContainerTodosLosRegistros
}