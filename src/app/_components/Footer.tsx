export default function Footer() {
	return (
		<footer className="rounded-lg shadow m-3 md:m-4 bg-[#383838a2]">
			<div className="w-full mx-auto max-w-screen-xl p-3 md:p-4 md:flex md:items-center justify-center text-center">
				<span className="text-xs md:text-sm text-gray-400">
					© 2023 Dracania Archives™, created by{" "}
					<a href="https://marcoantolini.com/" className="hover:underline">
						Marco Antolini
					</a>
					. All Rights Reserved.
				</span>
			</div>
		</footer>
	);
}
