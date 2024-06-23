import Card from "antd/es/card/Card";
import React from "react";
import {CardTitle} from "@/app/components/CardTitle";
import Button from "antd/es/button/button";

interface Props {
    books: Book[];
    handleDelete: (id: string) => void;
    handleOpen: (book: Book) => void;
}

export const Books = ({books, handleOpen, handleDelete}: Props) => {
    return (
        <div className="cards">
            {books.map((book : Book) =>  (
                <Card
                    key={book.id}
                    title={<CardTitle title={book.title} price={book.price}></CardTitle>}>
                    bordered={false}

                    <p>{book.description}</p>
                    <div className="card_buttons">
                        <Button
                            onClick={() => handleOpen(book)}
                            style={{flex: 1}}
                        >
                            Редактировать
                        </Button>
                        <Button
                            onClick={() => handleDelete(book.id)}
                            style={{flex: 1}}
                            danger
                        >
                            Удалить
                        </Button>
                    </div>
                </Card>
            ))}
        </div>
    )
}