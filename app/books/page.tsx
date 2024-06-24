"use client"
import React, {useEffect, useState} from 'react';
import Button from "antd/es/button/button";
import {Books} from "@/app/components/Books";
import {BookRequest, createBook, deleteBook, getAllBooks, updateBook} from "@/app/services/books";
import Title from "antd/es/skeleton/Title";
import {CreateUpdateBook, Mode} from "@/app/components/CreateUpdateBook";


export default function BooksPage() {
    const defaultValues = {
        title: "",
        description: "",
        price: 0,
    } as Book;
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [mode, setMode] = useState(Mode.Create);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [values, setValues] = useState<Book>(defaultValues);

    useEffect(()=>{
        const getBooks = async ()=>{
            const books = await getAllBooks();
            setLoading(false);
            setBooks(books);
        };

        getBooks();
    },[])

    const handleCreateBook = async (request: BookRequest) => {
        await createBook(request);
        closeModal();

        const books = await getAllBooks();
        setBooks(books);
    }

    const handleUpdateBook = async (id: string, request: BookRequest) => {
        await updateBook(id, request);
        closeModal();

        const books = await getAllBooks();
        setBooks(books);
    }

    const handleDeleteBook = async (id: string) => {
        await deleteBook(id);
        closeModal();

        const books = await getAllBooks();
        setBooks(books);
    }

    const openModal = () => {
        setMode(Mode.Create)
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setValues(defaultValues)
        setIsModalOpen(false);
    }

    const openEditModal = (book: Book) => {
        setMode(Mode.Edit)
        setValues(book)
        setIsModalOpen(true)
    }

    return (
        <div>
            <Button onClick={openModal}>Добавить книгу</Button>

            <CreateUpdateBook
                mode={mode}
                values={values}
                isModalOpen={isModalOpen}
                handleClose={closeModal}
                handleCreate={handleCreateBook}
                handleUpdate={handleUpdateBook}
            />

            {loading ? (
                <Title>Loading...</Title>
                ) : (
                    <Books
                        books={books}
                        handleOpen={openEditModal}
                        handleDelete={handleDeleteBook}
                    />
                )}
        </div>
    )
}