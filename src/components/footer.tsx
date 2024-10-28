export default function Footer() {
	return (
		<footer className="m-3 rounded-lg bg-custom-dark shadow md:m-4">
			<div className="mx-auto w-full max-w-screen-xl justify-center p-3 text-center md:flex md:items-center md:p-4">
				<span className="text-xs text-gray-400 md:text-sm">
					© 2023 Dracania Archives™, created by{" "}
					{/* <Link href="https://marcoantolini.com/" className="hover:underline"> */}
					Marco Antolini
					{/* </Link> */}. All Rights Reserved.
				</span>
			</div>
		</footer>
	);
}
