// APIから受け取るjsonデータ
export interface BookFeatchData {
  id: string;
  volumeInfo: {
    title: string;
    description: string;
    publishedDate: string;
		pageCount: number;
    imageLinks: {
      thumbnail: string;
    }
  }
}


// サーバーに送信する書籍情報
export interface Book {
		id: string;
		title: string;
		description: string;
		published_date: string;
		page_count: number;
		thumbnail: string;
}
