import { useEffect, useState } from "react"
import CustomHead from "./components/Head"
import Link from "next/link"
import { useRouter } from "next/router"

export default function Home({results}) {
    const router = useRouter();
    const onClick = (id, title) => {
        router.push({
            pathname: `/movies/${id}`,
            query: {
                title: title
            }
        }, `/movies/${id}`);
    }

    return (
        <div className="container">
            <CustomHead title="Home"/>

            {results?.map(param => (
                <div onClick={() => onClick(param.id, param.original_title)} className="movie" key={param.id}>
                    <img src={`https://image.tmdb.org/t/p/w500${param.poster_path}`} />
                    <h4>
                        <Link 
                            href={{
                                pathname: `/movies/${param.id}`,
                                query: {
                                    title: param.original_title
                                }
                            }} 
                            as={`/movies/${param.id}`}
                            legacyBehavior>
                                <a>{param.original_title}</a>
                        </Link>
                    </h4>
                </div>
            ))}

            <style jsx>{`
                .container {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    padding: 20px;
                    gap: 20px;
                }

                .movie {
                    cursor: pointer;
                }

                .movie img {
                    max-width: 100%;
                    border-radius: 12px;
                    transition: transform 0.2s ease-in-out;
                    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
                }

                .movie:hover img {
                    transform: scale(1.05) translateY(-10px);
                }

                .movie h4 {
                    font-size: 18px;
                    text-align: center;
                }
            `}</style>
        </div>
    ) 
} 

export async function getServerSideProps() {
    const { results } = await (await fetch(`http://localhost:3000/api/movies`)).json();
    return {
        props: {
            results,
        }
    }
}