'use client';

import { CardWithForm } from '@/components/ComponentsUI/CardComponent';
import { Pagination } from '@/components/ComponentsUI/Pagination';
import { useEffect, useState } from "react";
import Modal from '@/components/ComponentsUI/Modal';
import Image from 'next/image';
import { Pokemon } from '../interface/InterfacePokemonProperties';
import loadingImage from '@/assets/spinner.gif';
import MetaLayout from '../layout/MetaLayout';
import { Input } from '@/components/ui/input';
import { useGetPokemon } from '../services /hooks/useGetPokemon';
import { useRouter } from 'next/navigation';


export default function DashboardPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [hoveredPokemon, setHoveredPokemon] = useState<Pokemon>();
    const router=useRouter()
    const [isModalOpen, setModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isPaginationLoading, setPaginationLoading] = useState(false);
    const ITEMS_PER_PAGE = 20;
    const { dataPokemon, loading, error, dataPokemonDetails, searchPokemon } = useGetPokemon(currentPage, ITEMS_PER_PAGE);
    const totalPages = dataPokemon ? Math.ceil(dataPokemon.count / ITEMS_PER_PAGE) : 0;


    useEffect(()=>{
        const {localStorage} =window
        const item=localStorage.getItem('token')
        if(!item){
            router.push('/login')
        }
    },[])

    useEffect(() => {
        if (error) {
            alert(error);
        }
    }, [error]);

    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages) return;

        setPaginationLoading(true);
        setCurrentPage(page);
    };

    useEffect(() => {
        if (!loading) {
            setPaginationLoading(false);
        }
    }, [loading]);

    const handleMouseEnter = (pokemon: any) => {
        setHoveredPokemon(pokemon);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    if (loading || isPaginationLoading) return (
        <div className='flex h-screen w-full items-center justify-center'>
            <Image
                src={loadingImage}
                alt="Loading..."
                width={48}
                height={48}
            />
        </div>
    );

    return (
        <MetaLayout title='Pokemon World'>
            <div className='flex flex-col w-full items-center justify-between'>
                <div className='flex flex-col w-[350px] lg:max-w-[350px] items-end justify-end p-4'> {/* Added padding */}
                    <Input
                        value={searchTerm}
                        placeholder='Encuentra el pokemon de tu preferencia'
                        className='mb-4' // Adds margin-bottom to separate from other elements
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setSearchTerm(e.target.value);
                            searchPokemon(e.target.value);
                        }}
                    />
                </div>

                <div className="flex flex-row w-full items-center justify-around flex-wrap pt-4 my-2 space-y-4">
                    {dataPokemon && dataPokemon.results.map((s, t) => {
                        const actualIndex = t;
                        const pokemonDetails = dataPokemonDetails[actualIndex];

                        return (
                            <div key={s.name}>
                                <CardWithForm>
                                    <div className='flex flex-col lg:flex-row cursor-pointer items-center justify-center'>
                                        {pokemonDetails && (
                                            <img
                                                src={pokemonDetails.sprites.other?.home.front_default}
                                                alt={s.name}
                                                className='w-24 h-24 object-cover'
                                            />
                                        )}
                                        <div className='flex flex-col items-center justify-between' onMouseEnter={() => handleMouseEnter(pokemonDetails)}>
                                            <p>{s.name}</p>
                                            {pokemonDetails && (
                                                <p>{pokemonDetails.types[0].type.name}</p>
                                            )}
                                        </div>
                                    </div>
                                </CardWithForm>
                            </div>
                        );
                    })}
                </div>

                <div className='flex items-center w-[350px] justify-center'>
                    <Modal
                        isOpen={isModalOpen}
                        onClose={handleCloseModal}
                        pokemon={hoveredPokemon}
                    />
                </div>

                <div className='flex w-full items-center justify-end pr-2'>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </MetaLayout>
    );
}