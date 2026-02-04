import './styles.css';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {

    return (
        <footer className='footer'>

            <div className="rede-sociais">
                <FaFacebookF size={24} color='#fafafa' />
                <FaInstagram size={24} color='#fafafa' />
                <FaTwitter size={24} color='#fafafa' />
                <FaYoutube size={24} color='#fafafa' />

            </div>

            <div className='blabla'>
                <div>
                    <span>Audiodescrição</span>
                    <span>Relações com investidores</span>
                    <span>Avisos legais</span>
                </div>
                <div>
                    <span>Central de Ajuda</span>
                    <span>Carreiras</span>
                    <span>Preferências de cookies</span>
                </div>
                <div>
                    <span>Cartão pré-pago</span>
                    <span>Termos de uso</span>
                    <span>Informações corporativas</span>
                </div>
                <div>
                    <span>Imprensa</span>
                    <span>Privacidade</span>
                    <span>Entre em contato</span>
                </div>
            </div>

            <div className='copy'>
                <span>&copy; 1997-2026 Netflix, Inc.</span>
            </div>

        </footer>
    )
}

export default Footer;