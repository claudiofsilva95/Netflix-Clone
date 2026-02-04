import './styles.css';
import LogoNetflix from '../../static/imgs/logo-netflix.png';
import { IoMdSearch } from "react-icons/io";
import { FaRegBell, FaCaretDown } from "react-icons/fa";
import perfilNetflixImage from '../../static/imgs/perfil-netflix.png';
import { useState } from 'react';


const Header = () => {

    const [selectedCategory, setSelectedCategory] = useState('inicio');

    const list = [
        { name: 'Início', selected: 'inicio' },
        { name: 'Séries', selected: 'series' },
        { name: 'Filmes', selected: 'filmes' },
        { name: 'Jogos', selected: 'jogos' },
        { name: 'Bombando', selected: 'bombando' },
        { name: 'Minha Lista', selected: 'minhalista' },
        { name: 'Navegar por Idiomas', selected: 'idiomas' },
    ];


    const handleChangeCategory = (category) => {
        setSelectedCategory(category);
    }

    return (
        <header className='header'>
            <img src={LogoNetflix} alt="logo-netflix" />
            <ul className='nav-ul'>
                {
                    list.map((item) => {
                        return <li key={item} className={item.selected === selectedCategory && 'selected'}>
                            <button onClick={() => handleChangeCategory(item.selected)}>{item.name}</button>
                        </li>
                    })
                }
            </ul>

            <ul className='menu-header'>
                <li>
                    <IoMdSearch color='#fff' size={32} />
                </li>
                <li>
                    <p>Infantil</p>
                </li>
                <li>
                    <FaRegBell color='#fff' size={28} />
                </li>

                <li>
                    <div className='perfil-foto'>
                        <img src={perfilNetflixImage} alt="foto-de-perfil" />

                        <FaCaretDown color='#fff' size={18} />
                    </div>
                </li>
            </ul>
        </header>
    )
}

export default Header;