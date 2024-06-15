"use client"; 

import React, { useState } from "react";

const ReviewForm: React.FC = () => {
	const [inputValue, setInputValue] = useState("");

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};


	const handleButtonClick = async (inputValue: string) => {
		try {
			const response = await fetch('http://localhost:8000/v1/books', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ title: inputValue }),
			});
	
			const data = await response.json();
			console.log('Server response:', data);
		} catch (error) {
			console.error('Error:', error);
		}
	};

	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		handleButtonClick(inputValue);
	};

return (
	<form className="w-2/3 mx-auto space-y-12">
		<fieldset className="p-6 rounded-md shadow-sm bg-gray-50">
			<div className="flex items-center">
				<div>
					<label htmlFor="book" className="text-sm">書籍名</label>
					<input
					id="book"
					type="text"
					placeholder="書籍名"
					className="w-full rounded-md focus:ring focus:ring-opacity-75 text-gray-900 focus:ring-violet-600 border-gray-300"
					onChange={handleInputChange}
					/>
				</div>
				<div>
					<button
						onClick={handleClick}
						type="button"
						className="ml-4 px-6 py-2 font-semibold rounded-full bg-gray-800 text-gray-100"
					>
					検索
					</button>
				</div>
			</div>
			<div className="col-span-full sm:col-span-3">
				<label htmlFor="content" className="text-sm">文章</label>
				<input
				id="content"
				type="text"
				placeholder="文章"
				className="w-full rounded-md focus:ring focus:ring-opacity-75 text-gray-900 focus:ring-violet-600 border-gray-300"
				/>
			</div>
		</fieldset>
	</form>
	);
};

export default ReviewForm;
