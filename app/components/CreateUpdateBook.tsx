import {BookRequest} from "@/app/services/books";
import Modal from "antd/es/modal/Modal";
import Input from "antd/es/input/Input";
import {useEffect, useState} from "react";
import TextArea from "antd/es/input/TextArea";

interface Props {
    mode: Mode;
    values: Book;
    isModalOpen: boolean;
    handleClose: () => void;
    handleCreate: (request: BookRequest) => void;
    handleUpdate: (id: string, request: BookRequest) => void;
}

export enum Mode {
    Create,
    Edit
}

export const CreateUpdateBook = ({
    mode,
    values,
    isModalOpen,
    handleClose,
    handleCreate,
    handleUpdate
}: Props) => {
    const [title, setTitle] = useState<string>("");
    const [price, setPrice] = useState<number>(1);
    const [description, setDescription] = useState<string>("");

    useEffect(() => {
        setTitle(values.title)
        setDescription(values.description)
        setPrice(values.price)
    }, [values])

    const handleOnOk = async () => {
        const bookRequest = {title, price, description};

        mode == Mode.Create
            ? handleCreate(bookRequest)
            : handleUpdate(values.id, bookRequest);
    }

    return(
        <Modal
            title={mode === Mode.Create ? "Добавить книгу" : "Редактировать книгу"}
            open={isModalOpen}
            cancelText={"Отмена"}
            onOk={handleOnOk}
            onCancel={handleClose}
        >
            <div className={"book_modal"}>
                <Input
                    value={title}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                    placeholder="Название"
                />
                <TextArea
                    value={description}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
                    autoSize={{ minRows: 3, maxRows: 3 }}
                    placeholder="Описание"
                />
                <Input
                    value={price}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrice(Number(e.target.value))}
                    placeholder="Цена"
                />
            </div>
        </Modal>
    )
}