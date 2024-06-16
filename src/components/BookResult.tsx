import React from "react";

import { Book, BookFeatchData } from "@/types/books";

// TODO:型定義ファイルに移行する
interface BookResultProps {
    book: BookFeatchData
    onBookClick: (book: Book) => void;
}

const BookResult: React.FC<BookResultProps> = ({ book, onBookClick }) => {
    const handleClick = () => {
        onBookClick({
            id: book.id, 
            title: book.volumeInfo.title, 
            description: book.volumeInfo.description,
            published_date: book.volumeInfo.publishedDate,
            page_count: book.volumeInfo.pageCount,
            thumbnail: book.volumeInfo.imageLinks.thumbnail
        });
    };

    return (
        <tr 
            onClick={handleClick}
            className="cursor-pointer hover:bg-gray-100"
        >
        <td>
            {book.volumeInfo.imageLinks?.thumbnail && (
            <img
                src={book.volumeInfo.imageLinks.thumbnail}
                alt={book.volumeInfo.title}
                className="mb-2 size-11/12"
            />
            )}
        </td>
        <td>{book.volumeInfo.title}</td>
        </tr>
    );
    };

export default BookResult
