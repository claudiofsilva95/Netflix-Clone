import Header from "../../components/Header";
import "./styles.css";
import { useState, useEffect } from "react";
import { FaChevronDown, FaPlus } from "react-icons/fa";
import { SlLike } from "react-icons/sl";
import { FaPlay } from "react-icons/fa6";
import Footer from "../../components/Footer";
import api from "../../services/api";

const API_KEY = "28fc232cc001c31e8a031f419d0a14ca";

const Home = () => {
    const [continueWatching, setContinueWatching] = useState([]);
    const [myList, setMyList] = useState([]);
    const [trending, setTrending] = useState([]);

    const [selectedMovie, setSelectedMovie] = useState(null);
    const [selectList, setSelectList] = useState(null);

    const [genresMap, setGenresMap] = useState({});

    useEffect(() => {
        async function loadFilmes() {
            const genresResponse = await api.get("genre/movie/list", {
                params: {
                    api_key: API_KEY,
                    language: "pt-BR",
                },
            });

            const map = {};
            genresResponse.data.genres.forEach((g) => {
                map[g.id] = g.name;
            });

            setGenresMap(map);
            const response = await api.get("movie/now_playing", {
                params: {
                    api_key: API_KEY,
                    language: "pt-BR",
                    page: 1,
                },
            });

            const filmes = response.data.results;

            // Função para buscar faixa etária
            const enrichWithFaixaEtaria = async (lista, map) => {
                return Promise.all(
                    lista.map(async (filme) => {
                        const faixaResponse = await api.get(
                            `movie/${filme.id}/release_dates`,
                            { params: { api_key: API_KEY } }
                        );

                        const br = faixaResponse.data.results?.find(
                            (r) => r.iso_3166_1 === "BR"
                        );

                        const faixaEtaria =
                            br?.release_dates?.find(
                                (r) => r.certification && r.type === 3
                            )?.certification || "NR";

                        return {
                            ...filme,
                            faixaEtaria,
                            generos: filme.genre_ids
                                .map((id) => map[id])
                                .filter(Boolean),
                        };
                    })
                );
            };

            // 🔹 Separando os slices
            const continueSlice = filmes.slice(0, 6);
            const myListSlice = filmes.slice(7, 11);
            const trendingSlice = filmes.slice(12, 18);

            // 🔹 Buscando faixa etária para cada lista
            setContinueWatching(
                await enrichWithFaixaEtaria(continueSlice, map)
            );

            setMyList(
                await enrichWithFaixaEtaria(myListSlice, map)
            );

            setTrending(
                await enrichWithFaixaEtaria(trendingSlice, map)
            );
        }

        loadFilmes();
    }, []);

    const handleMovieSelected = (id, list) => {
        setSelectedMovie(id);
        setSelectList(list);
    };

    const renderSection = (title, movies, listKey) => (
        <div className="container-filmes">
            <h2 className="list-name">{title}</h2>

            <div className="filmes">
                {movies.map((filme) => (
                    <div
                        key={filme.id}
                        className={`filme ${selectedMovie === filme.id &&
                            selectList === listKey &&
                            "filme-selecionado"
                            }`}
                        onMouseEnter={() => handleMovieSelected(filme.id, listKey)}
                        onMouseLeave={() => {
                            setSelectedMovie(null);
                            setSelectList(null);
                        }}
                    >
                        <img
                            src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`}
                            alt={filme.title}
                        />

                        <div
                            className="player-container"
                            hidden={selectedMovie !== filme.id}
                        >
                            <div className="player">
                                <div>
                                    <div>
                                        <FaPlay color="black" size={18} />
                                    </div>
                                    <div>
                                        <FaPlus />
                                    </div>
                                    <div>
                                        <SlLike />
                                    </div>
                                </div>
                                <span>
                                    <FaChevronDown />
                                </span>
                            </div>

                            <div className="temporadas">
                                {filme.faixaEtaria !== "NR" && (
                                    <span
                                        className={`classificacao class-${filme.faixaEtaria}`}
                                    >
                                        {filme.faixaEtaria === "L"
                                            ? "Livre"
                                            : `${filme.faixaEtaria}+`}
                                    </span>
                                )}
                            </div>

                            <div className="estilo">
                                <span>
                                    {filme.generos.slice(0, 3).join(" • ")}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <>
            <Header />
            <main className="main">
                {renderSection(
                    "Continuar Assistindo",
                    continueWatching,
                    "continue"
                )}

                {renderSection("Minha Lista", myList, "myList")}

                {renderSection("Em Alta", trending, "trending")}
            </main>
            <Footer />
        </>
    );
};

export default Home;