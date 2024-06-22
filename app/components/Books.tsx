import Card from "antd/es/card/Card";
import React from "react";
import {CardTitle} from "@/app/components/CardTitle";
import Button from "antd/es/button/button";

interface Props {
    books: Book[];
}

export const Books = ({books}: Props) => {
    return (
        <div className="cards">
            {books.map((book : Book) =>  (
                <Card
                    key={book.id}
                    title={<CardTitle title={book.title} price={book.price}></CardTitle>}>
                    bordered={false}

                    <p>{book.description}</p>
                    <div className="card_buttons"></div>
                    <Button>
                        Edit
                    </Button>
                    <Button>
                        Delete
                    </Button>
                </Card>
            ))}
        </div>
    )
}