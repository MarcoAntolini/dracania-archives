export default function Footer() {
	return (
		// add an inner rounded border
		<footer className="bg-custom-background/80 p-3 shadow md:p-4 ">
			<div className="mx-auto w-full max-w-screen-xl justify-center rounded-lg bg-sidebar p-3 text-center md:flex md:items-center md:p-4">
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
