import React, { useState } from "react";

// TODO:型定義ファイルに移行する
interface BookResultProps {
    book: {
        volumeInfo: {
            title: string;
            description: string;
            imageLinks?: {
                smallThumbnail?: string;
            };
            publishedDate: string;
            pageCount: number;
        };
    };
    onBookClick: (title: string) => void;
}

const BookResult: React.FC<BookResultProps> = ({ book, onBookClick }) => {
    return (
        <tr 
            onClick={() => onBookClick({ id: book.id, title: book.volumeInfo.title, description: book.volumeInfo.description, published_date: book.volumeInfo.publishedDate, page_count: book.volumeInfo.pageCount })} 
            className="cursor-pointer hover:bg-gray-100"
        >
        <td>
            {book.volumeInfo.imageLinks?.smallThumbnail && (
            <img
                src={book.volumeInfo.imageLinks.smallThumbnail}
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
