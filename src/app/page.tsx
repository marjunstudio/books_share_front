import Link from "next/link";

export default function Home() {
	return (
		<>
			<h1>LPページ</h1>
			<Link href="/review">
			<button type="button" className="px-8 py-3 font-semibold rounded-full bg-gray-800 text-gray-100">検索フォームへ</button>
			</Link>
		</>
	);
}
