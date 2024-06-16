"use client"; 

import React, { useState } from "react";

import BookResult from "@/components/BookResult";
import { BookReview } from "@/types/book_reviews";
import { Book } from "@/types/books";

// 
export interface BookReviewRequest {
	book: Book;
	book_review: BookReview
}

const ReviewForm: React.FC = () => {
	const [inputTitle, setInputTitle] = useState("");
	const [contentValue, setContentValue] = useState("");
	const [books, setBooks] = useState([]);
	const [selectedBook, setSelectedBook] = useState<{ book: Book } | null>(null);


	const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputTitle(e.target.value);
	};

	const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setContentValue(e.target.value);
	};

	const handleButtonClick = async (inputTitle: string) => {
		try {
			const response = await fetch('http://localhost:8000/v1/books', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ title: inputTitle }),
			});
	
			const data = await response.json();
			console.log('Server response:', data);
			setBooks(data.items);
		} catch (error) {
			console.error('Error:', error);
		}
	};

	// 検索ボタン押下時の処理
	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		handleButtonClick(inputTitle);
	};

	// 表示された書籍押下時の処理
	const handleBookClick = (book: Book) => {
		setSelectedBook(book);
		setInputTitle(book.title);
		console.log(selectedBook);
	};

	// 書籍レビュー保存処理
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!selectedBook) {
			console.error("No book selected");
			return;
		}

		const formData: BookReviewRequest = {
			book: selectedBook,
			book_review: {
				content: contentValue,
				book_id: selectedBook.id,
			},
		};

		try {
			const response = await fetch("http://localhost:8000/book_reviews", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			if (!response.ok) {
				throw new Error("Network response was not ok");
			}

			const data = await response.json();
			console.log("Response:", data);
		} catch (error) {
			console.error("Error:", error);
		}
	};
	

return (
	<form onSubmit={handleSubmit} className="w-2/3 mx-auto space-y-12">
		<fieldset className="p-6 rounded-md shadow-sm bg-gray-50">
			<div className="flex items-center mb-10">
				<div className="w-full">
					<label htmlFor="book" className="text-sm">書籍名</label>
					<input
					id="book"
					type="text"
					placeholder="書籍名"
					value={inputTitle}
					className="w-full rounded-md focus:ring focus:ring-opacity-75 text-gray-900 focus:ring-violet-600 border-gray-300"
					onChange={handleTitleChange}
					/>
				</div>
				<button
					onClick={handleClick}
					type="button"
					className="size-1/4 ml-4 px-6 py-2 font-semibold rounded-full bg-gray-800 text-gray-100"
				>
				検索
				</button>
			</div>
			<div>
				<table className="table">
				<thead>
				<tr>
					<th>サムネ</th>
					<th>タイトル</th>
				</tr>
				</thead>
				<tbody>
				{books.map((book, index) => (
					<BookResult key={index} book={book} onBookClick={handleBookClick} />
				))}
				</tbody>
			</table>
			</div>
			<div className="overflow-x-auto">

			</div>
			<div className="col-span-full sm:col-span-3">
				<label htmlFor="content" className="text-sm">文章</label>
				<input
				id="content"
				type="text"
				placeholder="文章"
				className="w-full rounded-md focus:ring focus:ring-opacity-75 text-gray-900 focus:ring-violet-600 border-gray-300"
				onChange={handleContentChange}
				/>
			</div>
			<div className="flex justify-end">
				<button
					type="submit"
					className="px-6 py-2 font-semibold rounded-full bg-blue-600 text-white"
					>
					書籍情報を送信
				</button>
			</div>
		</fieldset>
	</form>
	);
};

export default ReviewForm;
